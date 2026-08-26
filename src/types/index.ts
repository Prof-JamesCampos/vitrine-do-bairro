export type Category = 'Padaria' | 'Salão' | 'Oficina' | 'Mercado' | 'Farmácia';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  description: string;
  rating: number;
  distance: number; 
  openingHours: string;
  products: Product[];
}

export type RootStackParamList = {
  Home: undefined;
  Details: { businessId: string };
};