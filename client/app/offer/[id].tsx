import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { View, Image, ScrollView, Share } from 'react-native';
import { Text, Badge, ActivityIndicator, Button, IconButton } from 'react-native-paper';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { db } from '@/src/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useUserStore } from '@/src/stores/userStore';
import { useSyncFavorites } from '@/src/hooks/useSyncFavorites';

export default function OfferDetailsScreen() {
  const primary = useSettingsStore(s => s.settings?.primary_color || '#FFA500');
  const { id } = useLocalSearchParams<{ id: string }>();
  const [offer, setOffer] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const favorites = useUserStore(state => state.favorites);
  const addFavorite = useUserStore(state => state.addFavorite);
  const removeFavorite = useUserStore(state => state.removeFavorite);
  const { syncToFirestore } = useSyncFavorites();

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    getDoc(doc(db, 'offers', id as string))
      .then(snapshot => {
        if (snapshot.exists()) setOffer({ id: snapshot.id, ...snapshot.data() });
        else setOffer(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!offer) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <Text>العرض غير موجود</Text>
        <Button onPress={() => router.back()}>رجوع</Button>
      </View>
    );
  }

  const isFavorite = favorites.includes(offer.id);

  const onToggleFavorite = () => {
    if (!offer?.id) return;
    const adding = !isFavorite;
    if (adding) addFavorite(offer.id);
    else removeFavorite(offer.id);
    syncToFirestore(offer.id, adding);
  };

  const onShare = async () => {
    try {
      const message = `${offer.title}\nخصم ${offer.discount}%\nالسعر بعد الخصم: ${offer.price_after} ج.م`;
      await Share.share({ message });
    } catch (e) {
      // noop
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16 }}>
      <Button icon="arrow-right" onPress={() => router.back()} style={{ alignSelf: 'flex-end', marginBottom: 8 }}>
        رجوع
      </Button>
      <View style={{ position: 'relative', marginBottom: 16 }}>
        <Image source={{ uri: offer.image }} style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: 12, backgroundColor: '#f2f2f2' }} resizeMode="cover" />
        <IconButton
          icon={isFavorite ? 'heart' : 'heart-outline'}
          mode="contained-tonal"
          size={24}
          onPress={onToggleFavorite}
          style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#ffffffcc' }}
          iconColor={isFavorite ? '#e53935' : '#333'}
          accessibilityLabel={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        />
        <IconButton
          icon="share-variant"
          mode="contained-tonal"
          size={24}
          onPress={onShare}
          style={{ position: 'absolute', top: 10, left: 10, backgroundColor: '#ffffffcc' }}
          iconColor={'#333'}
          accessibilityLabel={'مشاركة العرض'}
        />
      </View>
      <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 }}>
        <Text variant="titleLarge" style={{ fontFamily: 'Cairo_700Bold', color: '#333', flex: 1, textAlign: 'right' }}>
          {offer.title}
        </Text>
        <Badge size={32} style={{ backgroundColor: primary, marginStart: 8 }}>{`${offer.discount}%`}</Badge>
      </View>
      <Text style={{ color: '#666', fontSize: 16, textAlign: 'right', marginBottom: 12 }}>{offer.description}</Text>
      <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 12, gap: 12 }}>
        <Text style={{ color: '#333', fontSize: 18, fontFamily: 'Cairo_700Bold' }}>السعر بعد الخصم: {offer.price_after} ج.م</Text>
        <Text style={{ color: '#888', fontSize: 16, textDecorationLine: 'line-through' }}>قبل: {offer.price_before} ج.م</Text>
      </View>
      <Text style={{ color: primary, fontSize: 15, marginBottom: 8, textAlign: 'right' }}>الفئة: {offer.category}</Text>
      <Text style={{ color: '#888', fontSize: 14, textAlign: 'right' }}>
        {(() => {
          let date: Date | null = null;
          if (offer.valid_until) {
            if (typeof offer.valid_until === 'object' && offer.valid_until.seconds) {
              // Firestore Timestamp object
              date = new Date(offer.valid_until.seconds * 1000);
            } else if (typeof offer.valid_until === 'string' || typeof offer.valid_until === 'number') {
              date = new Date(offer.valid_until);
            }
          }
          return `صالح حتى: ${date ? date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}`;
        })()}
      </Text>

      <View style={{ flexDirection: 'row-reverse', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
        <Button mode="contained" buttonColor={primary} textColor="#fff" onPress={onToggleFavorite}>
          {isFavorite ? 'إزالة من المفضلة' : 'أضف إلى المفضلة'}
        </Button>
        <Button mode="outlined" onPress={onShare}>
          مشاركة
        </Button>
        <Button mode="outlined" disabled>
          إشعار بعروض مشابهة قريباً
        </Button>
      </View>
    </ScrollView>
  );
}
