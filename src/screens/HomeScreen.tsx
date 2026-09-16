import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { BusinessCard } from '../components/BusinessCard';
import { CategoryChip } from '../components/CategoryChip';
import { colors } from '../theme/colors';
import { mockBusinesses, categories } from '../data/mockData';
import { Category, Business } from '../types';
import { apiService } from '../services/api';
import { storageService } from '../services/storage';
import { styles } from './HomeScreen.styles';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // --- ESTADOS ---
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  
  // Estados da API e Offline-First
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado dos Favoritos
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // --- EFEITOS (Carregamento Inicial) ---
  useEffect(() => {
    loadData();
    loadFavorites();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. Tenta buscar da API
      const remoteData = await apiService.fetchBusinesses();
      setBusinesses(remoteData);
      
      // 2. Se der certo, salva no cache para a próxima vez
      await storageService.saveCache(remoteData);
    } catch (err) {
      // 3. Se falhar (sem internet), avisa o usuário
      setError('Você está offline. Mostrando dados salvos.');
      
      // 4. Carrega o que tiver no cache
      const cachedData = await storageService.getCache();
      if (cachedData.length > 0) {
        setBusinesses(cachedData);
      } else {
        // Fallback para o mock se não houver cache e a API falhar
        setBusinesses(mockBusinesses); 
      }
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    const ids = await storageService.getFavorites();
    setFavoriteIds(ids);
  };

  // --- LÓGICA DE FILTRAGEM (useMemo para performance) ---
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch = business.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || business.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [businesses, search, selectedCategory]);

  // --- HANDLERS ---
  //const handleToggleFavorite = async (id: string) => {
    //const newIds = await storageService.toggleFavorite(id);
    //setFavoriteIds(newIds);
  //};
  const handleToggleFavorite = async (id: string) => {
  try {
    const newIds = await storageService.toggleFavorite(id);
    setFavoriteIds(newIds); // <--- Isso força o coração a mudar de cor
  } catch (error) {
    console.error("Erro ao salvar favorito:", error);
  }
};

  // --- RENDERIZAÇÃO ---
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header searchValue={search} onSearchChange={setSearch} />
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['Todos', ...categories]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CategoryChip
              label={item as Category | 'Todos'}
              selected={selectedCategory === item}
              onPress={() => setSelectedCategory(item as Category | 'Todos')}
            />
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Indicador de Loading */}
      {loading && (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      )}

      {/* Banner de Erro Offline */}
      {error && !loading && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <TouchableOpacity onPress={loadData}>
            <Text style={styles.retryText}>Tentar de novo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Lista de Comerciantes */}
      {!loading && (
        <FlatList
          data={filteredBusinesses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <BusinessCard
              business={item}
              onPress={() => navigation.navigate('Details', { businessId: item.id })}
              isFavorite={favoriteIds.includes(item.id)}
              onToggleFavorite={() => handleToggleFavorite(item.id)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum comerciante encontrado </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

