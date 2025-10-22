import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Text, ActivityIndicator, Snackbar } from 'react-native-paper';
import OfferCard from '@/src/components/OfferCard';
import { useUserStore } from '@/src/stores/userStore';
import { useOffersStore } from '@/src/stores/offersStore';
import { useSyncFavorites } from '@/src/hooks/useSyncFavorites';
import { db } from '@/src/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const favorites = useUserStore(state => state.favorites);
  const addFavorite = useUserStore(state => state.addFavorite);
  const removeFavorite = useUserStore(state => state.removeFavorite);
  const { syncToFirestore } = useSyncFavorites();
  const [offers, setOffers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  const fetchOffers = async () => {
    setLoading(true);
    setError('');
    try {
      if (!favorites.length) {
        setOffers([]);
        return;
      }
      const q = query(collection(db, 'offers'), where('__name__', 'in', favorites.slice(0, 10)));
      const snapshot = await getDocs(q);
      setOffers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      setError('حدث خطأ أثناء تحميل العروض. يرجى المحاولة مرة أخرى.');
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchOffers().finally(() => setRefreshing(false));
  }, [favorites]);

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
        المفضلة
      </Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={offers}
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
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>لا توجد عروض مفضلة حالياً</Text>}
        />
      )}
      <Snackbar
        visible={!!error}
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
