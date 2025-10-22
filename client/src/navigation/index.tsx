import React from 'react';
import { Stack } from 'expo-router';

export default function Navigation() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" />
    </Stack>
  );
}
