import { Business } from '../types';

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Padaria Pão Quente',
    category: 'Padaria',
    description: 'Pão francês quentinho todo dia às 6h.',
    rating: 4.7,
    distance: 0.3,
    openingHours: 'Seg-Sáb: 6h às 20h',
    products: [
      { id: 'p1', name: 'Pão Francês', price: 0.75 },
      { id: 'p2', name: 'Bolo de Chocolate', price: 45.00 },
    ],
  },
  {
    id: '2',
    name: 'Barbearia do Zé',
    category: 'Salão',
    description: 'Corte clássico e moderno. Cerveja gelada.',
    rating: 4.9,
    distance: 0.8,
    openingHours: 'Ter-Sáb: 9h às 20h',
    products: [
      { id: 'p3', name: 'Corte Masculino', price: 35.00 },
    ],
  },
];

export const categories: string[] = ['Padaria', 'Salão', 'Oficina', 'Mercado', 'Farmácia'];