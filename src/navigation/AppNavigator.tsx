import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // <--- NOVO IMPORT
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { MapScreen } from '../screens/MapScreen';
import { RegisterBusinessScreen } from '../screens/RegisterBusinessScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{ 
          title: 'Detalhes',
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterBusinessScreen}
        options={{ 
          title: 'Novo Comércio',
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
}

export const AppNavigator: React.FC = () => {
  const insets = useSafeAreaInsets(); // <--- CAPTURA A ÁREA SEGURA

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textLight,
          tabBarStyle: { 
            backgroundColor: colors.white, 
            borderTopColor: colors.border, 
            paddingTop: 8, 
            paddingBottom: insets.bottom, // <--- APLICA O ESPAÇAMENTO DINÂMICO
            minHeight: 60, 
            elevation: 10, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.white,
        }}
      >
        <Tab.Screen name="Início" component={HomeStack} options={{ tabBarLabel: 'Início' }} />
        <Tab.Screen name="Mapa" component={MapScreen} options={{ tabBarLabel: 'Mapa' }} />
        <Tab.Screen name="Favoritos" component={MapScreen} options={{ tabBarLabel: 'Favoritos' }} />
        <Tab.Screen name="Perfil" component={MapScreen} options={{ tabBarLabel: 'Perfil' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};