import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

export default function SplashScreen() {
  useEffect(() => {
    // TODO: check auth state and route
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator />
      <Text style={{ marginTop: 12 }}>جارٍ التحميل...</Text>
    </View>
  );
}
