import React from 'react';
import { FlatList, RefreshControl, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator, Snackbar, Searchbar, Chip } from 'react-native-paper';
import OfferCard from '@/src/components/OfferCard';
import { useUserStore } from '@/src/stores/userStore';
import { useOffersStore } from '@/src/stores/offersStore';
import CategoryCard from '@/src/components/CategoryCard';
import { useCategoriesStore } from '@/src/stores/categoriesStore';
import { useSyncFavorites } from '@/src/hooks/useSyncFavorites';
import { db } from '@/src/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchCategories } from '@/src/services/categoriesService';
import { useSettingsStore } from '@/src/stores/settingsStore';

export default function HomeScreen() {
  const offers = useOffersStore(state => state.offers);
  const setOffers = useOffersStore(state => state.setOffers);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string>('');
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const favorites = useUserStore(state => state.favorites);
  const addFavorite = useUserStore(state => state.addFavorite);
  const removeFavorite = useUserStore(state => state.removeFavorite);
  const { syncToFirestore } = useSyncFavorites();
  const categories = useCategoriesStore(s => s.categories);
  const setCategories = useCategoriesStore(s => s.setCategories);
  const primary = useSettingsStore(s => s.settings?.primary_color || '#FFA500');
  const filteredOffers = React.useMemo(
    () => offers.filter(o => (search ? (o.title || '').toLowerCase().includes(search.toLowerCase()) : true)),
    [offers, search]
  );

  const fetchOffers = async () => {
    setLoading(true);
    setError('');
    try {
      const base = collection(db, 'offers');
      const conds = [where('is_active', '==', true)];
      if (activeCategory) conds.push(where('category', '==', activeCategory));
      const q = query(base, ...conds);
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setOffers(data);
    } catch (err) {
      setError('حدث خطأ أثناء تحميل العروض. يرجى المحاولة مرة أخرى.');
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // load categories once
    fetchCategories()
      .then(setCategories)
      .catch(() => {});
  }, [setCategories]);

  React.useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchOffers().finally(() => setRefreshing(false));
  }, []);

  const handleToggleFavorite = (id: string) => {
    const isAdding = !favorites.includes(id);
    if (isAdding) {
      addFavorite(id);
    } else {
      removeFavorite(id);
    }
    syncToFirestore(id, isAdding);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text variant="headlineSmall" style={{ fontFamily: 'Cairo_700Bold', textAlign: 'right', marginBottom: 12, color: '#333' }}>
        عروض اليوم
      </Text>
      <Searchbar value={search} onChangeText={setSearch} placeholder="ابحث عن عرض..." style={{ marginBottom: 12 }} inputStyle={{ textAlign: 'right' }} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 4, gap: 8, marginBottom: 8 }}>
        <CategoryCard name="الكل" selected={!activeCategory} onPress={() => setActiveCategory(null)} />
        {categories.map(c => (
          <CategoryCard key={c.id} name={c.name} imageUrl={c.image_url} selected={activeCategory === c.name} onPress={() => setActiveCategory(c.name)} />
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={filteredOffers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <OfferCard
              id={item.id}
              title={item.title}
              image={item.image}
              discount={item.discount}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>لا توجد عروض متاحة حالياً</Text>}
        />
      )}
      <Snackbar
        visible={!!error}
        // pass valid_until for optional countdown enhancement later
        onDismiss={() => setError('')}
        duration={4000}
        action={{
          label: 'حسناً',
          onPress: () => setError(''),
        }}>
        {error}
      </Snackbar>
    </SafeAreaView>
  );
}
