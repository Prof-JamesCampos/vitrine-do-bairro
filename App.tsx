import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.secondary} />
      <AppNavigator />
    </>
  );
}