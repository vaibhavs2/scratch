import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './StackNavigator';

export function NavigatorContainer() {
  return (
    <NavigationContainer>
        <StackNavigator/>

    </NavigationContainer>
  );
}