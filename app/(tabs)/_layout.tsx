import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors, Colors1 } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={({ navigation, route }) => ({
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={20}
              color={focused ? 'black' : Colors1.lightGrey}
            />
          ),
          headerTitleStyle: {
            color: Colors1.lightGrey  
          }, 
          tabBarActiveTintColor: 'black',  
          tabBarInactiveTintColor: Colors1.lightGrey, 
        })}
      />
      <Tabs.Screen
        name="explore"
        // options={{
        //   title: 'Explore',
        //   tabBarIcon: ({ }) => <Ionicons name='send' size={20} color={Colors1.lightGrey} />,
        // }}
        options={({ navigation, route }) => ({
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='send'
              size={20}
              color={focused ? 'black' : Colors1.lightGrey}
            />
          ),
          headerTitleStyle: {
            color: Colors1.lightGrey  
          }, 
          tabBarActiveTintColor: 'black',  
          tabBarInactiveTintColor: Colors1.lightGrey, 
        })}
      />
    </Tabs>
  );
}
