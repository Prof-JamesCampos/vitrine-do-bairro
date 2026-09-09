import { Business } from '../types';

// DTO: Data Transfer Object (Define o formato que a API retorna)
export interface BusinessDTO {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  distance: number;
}

// Simulação de API REST (Substitua por uma URL real como jsonplaceholder se desejar)
const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users'; 

export const apiService = {
  async fetchBusinesses(): Promise<Business[]> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simula falha aleatória (10% de chance) para testar tratamento de erro
    if (Math.random() < 0.1) {
      throw new Error('Falha na conexão com o servidor');
    }

    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Mapeia o DTO da API para o Model do nosso app
      return data.map((item: any, index: number) => ({
        id: item.id.toString(),
        name: item.name,
        category: 'Parceiro',
        description: item.email,
        rating: 4.5 + (index % 5) * 0.1,
        distance: 0.5 + index * 0.2,
        openingHours: '08:00 - 18:00',
        products: [],
      }));
    } catch (error) {
      throw new Error('Não foi possível buscar os comerciantes. Verifique sua conexão.');
    }
  }
};