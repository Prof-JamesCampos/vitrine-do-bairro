import AsyncStorage from '@react-native-async-storage/async-storage';
import { Business } from '../types';

const FAVORITES_KEY = '@vitrine:favorites';
const CACHE_KEY = '@vitrine:cache_businesses';

export const storageService = {
  // --- FAVORITOS ---
  async getFavorites(): Promise<string[]> {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  },

  async saveFavorites(ids: string[]): Promise<void> {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  },

  async toggleFavorite(id: string): Promise<string[]> {
    const favorites = await storageService.getFavorites();
    const exists = favorites.includes(id);
    
    const newFavorites = exists 
      ? favorites.filter(favId => favId !== id) 
      : [...favorites, id];
      
    await storageService.saveFavorites(newFavorites);
    return newFavorites;
  },

  // --- CACHE OFFLINE-FIRST (Adicione isso!) ---
  async getCache(): Promise<Business[]> {
    const json = await AsyncStorage.getItem(CACHE_KEY);
    return json ? JSON.parse(json) : [];
  },

  async saveCache(data: Business[]): Promise<void> {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  }
};