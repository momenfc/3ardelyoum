import React from 'react';
import { Image, View } from 'react-native';
import { Card, Text, Button, Badge, ActivityIndicator, IconButton } from 'react-native-paper';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { router } from 'expo-router';

export interface OfferCardProps {
  id: string;
  title: string;
  image?: string;
  discount: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onPress?: (id: string) => void;
  onDetails?: (id: string) => void;
}

export default function OfferCard({ id, title, image, discount, isFavorite, onToggleFavorite, onPress, onDetails }: OfferCardProps) {
  const [loading, setLoading] = React.useState(true);
  const primary = useSettingsStore(s => s.settings?.primary_color || '#FFA500');

  return (
    <Card onPress={() => onPress?.(id)} style={{ marginVertical: 8, borderRadius: 12, overflow: 'hidden' }}>
      <View style={{ position: 'absolute', top: 12, start: 12, zIndex: 2, flexDirection: 'row-reverse', alignItems: 'center', gap: 4 }}>
        <Badge size={28} style={{ backgroundColor: primary }}>{`${discount}%`}</Badge>
        <IconButton
          icon={isFavorite ? 'heart' : 'heart-outline'}
          iconColor={isFavorite ? '#e53935' : '#888'}
          size={24}
          onPress={e => {
            e.stopPropagation?.();
            onToggleFavorite?.(id);
          }}
          accessibilityLabel={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        />
      </View>
      {image ? (
        <Image
          source={{ uri: image }}
          onLoadEnd={() => setLoading(false)}
          style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: '#f2f2f2' }}
          resizeMode="cover"
        />
      ) : (
        <View style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: '#f2f2f2', alignItems: 'center', justifyContent: 'center' }}>
          <Text>لا توجد صورة</Text>
        </View>
      )}
      {loading && (
        <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
      <Card.Content style={{ gap: 8 }}>
        <Text variant="titleMedium" style={{ fontFamily: 'Cairo_700Bold', textAlign: 'right', color: '#333333' }}>
          {title}
        </Text>
        <Button
          mode="contained"
          buttonColor={primary}
          textColor="#fff"
          onPress={() => {
            if (onDetails) onDetails(id);
            else router.push(`/offer/${id}`);
          }}>
          عرض التفاصيل
        </Button>
      </Card.Content>
    </Card>
  );
}
