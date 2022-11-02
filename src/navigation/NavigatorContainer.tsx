import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './StackNavigator';
import {ErrorBoundary} from '../ErrorBoundary';

export function NavigatorContainer() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ErrorBoundary>
  );
}
