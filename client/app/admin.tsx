import React from 'react';
import AdminDashboard from '../src/screens/AdminDashboard';
import { useUserStore } from '../src/stores/userStore';
import { View, Text } from 'react-native';

export default function AdminScreen() {
  const isAdmin = useUserStore(state => state.isAdmin);

  if (!isAdmin) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>You do not have access to this page.</Text>
      </View>
    );
  }

  return <AdminDashboard />;
}
