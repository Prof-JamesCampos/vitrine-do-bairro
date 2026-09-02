import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // <--- 1. Importe o Provider
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    // 2. Envolva toda a sua aplicação com o SafeAreaProvider
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.secondary} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}