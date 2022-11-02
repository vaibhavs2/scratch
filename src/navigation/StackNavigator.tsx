import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeSceen';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false}} />
      </Stack.Navigator>
  );
}