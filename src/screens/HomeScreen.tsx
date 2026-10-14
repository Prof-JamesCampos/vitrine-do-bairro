import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { BusinessCard } from '../components/BusinessCard';
import { CategoryChip } from '../components/CategoryChip';
import { colors } from '../theme/colors';
import { mockBusinesses, categories } from '../data/mockData';
import { Category, Business } from '../types';
//import { apiService } from '../services/api';
import { storageService } from '../services/storage';
import { styles } from './HomeScreen.styles';
import { firestoreService } from '../services/firestoreService';
//import { Alert, Button } from 'react-native'; // Adicione Button aos imports do react-native

// interface HomeScreenProps {
//   navigation: any;
// }

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  // --- ESTADOS ---
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  
  // Estados da API e Offline-First
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado dos Favoritos
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    const seedDatabase = async () => {
    Alert.alert('Aguarde', 'Populando o banco de dados...');
    try {
      let count = 0;
      for (const business of mockBusinesses) {
        // Removemos o 'id' do mock para o Firestore gerar um novo ID único
        const { id, ...dataToSave } = business; 
        
        await firestoreService.add(dataToSave);
        count++;
      }
      Alert.alert('Sucesso!', `${count} comerciantes adicionados ao Firestore.`);
      
      // Recarrega a lista para mostrar os novos dados
      await loadData(); 
    } catch (error: any) {
      console.error('Erro ao popular banco:', error);
      Alert.alert('Erro', `Falha ao salvar: ${error.message}`);
    }
  };

  // --- EFEITOS (Carregamento Inicial) ---
  useEffect(() => {
    loadData();
    loadFavorites();
  }, []);

  const loadData = async () => {
  setLoading(true);
  try {
    // Busca do Firestore
    const data = await firestoreService.getAll();
    setBusinesses(data);
    await storageService.saveCache(data);
  } catch (error) {
    setError('Erro ao buscar dados');
    const cached = await storageService.getCache();
    setBusinesses(cached);
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
      {/* 👇 BOTÃO TEMPORÁRIO PARA TESTE 👇 */}
      <View style={{ padding: 16, backgroundColor: '#E3F2FD' }}>
        <Button 
          title="🗃️ Popular Banco com Dados de Teste" 
          onPress={seedDatabase} 
        />
      </View>
      {/* 👆 FIM DO BOTÃO TEMPORÁRIO 👆 */}

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


