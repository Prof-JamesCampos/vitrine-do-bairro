import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './MapScreen.styles';

export const MapScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🗺️</Text>
        </View>
        
        <Text style={styles.title}>Mapa do Bairro</Text>
        <Text style={styles.subtitle}>
          Em breve você poderá ver todos os comerciantes cadastrados diretamente no mapa!
        </Text>
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}> Implementado na Aula 14 (Extensão)</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

