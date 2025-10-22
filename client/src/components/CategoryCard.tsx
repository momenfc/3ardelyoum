import React from 'react';
import { ImageBackground, Pressable, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSettingsStore } from '@/src/stores/settingsStore';

export interface CategoryCardProps {
  name: string;
  imageUrl?: string;
  selected?: boolean;
  onPress?: () => void;
}

export default function CategoryCard({ name, imageUrl, selected = false, onPress }: CategoryCardProps) {
  const primary = useSettingsStore(s => s.settings?.primary_color || '#FFA500');

  return (
    <Pressable onPress={onPress} style={[styles.container, selected && { borderColor: primary, borderWidth: 2 }]} android_ripple={{ color: '#ffffff22' }}>
      {imageUrl ? (
        <ImageBackground source={{ uri: imageUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" blurRadius={8} />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: '#e9ecef' }]} />
      )}
      <View style={styles.overlay} />
      <Text variant="titleSmall" style={styles.text} numberOfLines={1}>
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 70,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#ddd',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  text: {
    color: '#fff',
    fontFamily: 'Cairo_700Bold',
  },
});
