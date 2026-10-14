import { Business } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const apiService = {
  async fetchBusinesses(): Promise<Business[]> {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay
    if (Math.random() < 0.1) throw new Error('Falha na conexão'); // Simula erro

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.map((item: any, index: number) => ({
        id: item.id.toString(), name: item.name, category: 'Parceiro',
        description: item.email, rating: 4.5, distance: 0.5 + index * 0.2,
        openingHours: '08:00 - 18:00', products: [],
      }));
    } catch (error) { throw new Error('Não foi possível buscar os comerciantes.'); }
  }
};