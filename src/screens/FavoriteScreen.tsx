import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BusinessCard } from '../components/BusinessCard';
import { storageService } from '../services/storage';
import { mockBusinesses } from '../data/mockData';
import { styles } from './FavoriteScreen.style';

export const FavoriteScreen: React.FC<any> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const savedIds = await storageService.getFavorites();
    setFavorites(savedIds);
  };

  const favoriteBusinesses = mockBusinesses.filter(b => favorites.includes(b.id));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Favoritos ❤️</Text>
      </View>
      
      {favoriteBusinesses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você ainda não tem favoritos.</Text>
          <Text style={styles.emptySubtext}>Toque no coração para salvar um comerciante!</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteBusinesses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <BusinessCard 
              business={item} 
              onPress={() => navigation.navigate('Details', { businessId: item.id })}
              isFavorite={true}
              onToggleFavorite={loadFavorites}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

