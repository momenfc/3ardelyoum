import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Badge } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useNotificationsStore } from '@/src/stores/notificationsStore';

function TabBarIcon({ name, color, badgeCount = 0 }: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; badgeCount?: number }) {
  return (
    <View style={{ position: 'relative' }}>
      <FontAwesome size={26} style={{ marginBottom: -3 }} name={name} color={color} />
      {badgeCount > 0 && (
        <Badge
          size={16}
          style={{
            position: 'absolute',
            top: -3,
            right: -8,
            backgroundColor: color,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          {badgeCount > 9 ? '9+' : badgeCount}
        </Badge>
      )}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const unreadCount = useNotificationsStore(state => state.unreadCount());
  const settings = useSettingsStore(s => s.settings);
  const primary = settings?.primary_color || '#FFA500';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Cairo_600SemiBold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'المفضلة',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'الإشعارات',
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} badgeCount={unreadCount} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'حسابي',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
