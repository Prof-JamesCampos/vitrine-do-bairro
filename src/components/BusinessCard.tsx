import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Business } from '../types';
import { styles } from './BusinessCard.styles';

// 1. Atualizamos a interface para aceitar as novas props (com '?' para torná-las opcionais)
interface BusinessCardProps {
  business: Business;
  onPress: () => void;
  isFavorite?: boolean; 
  onToggleFavorite?: () => void; 
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ 
  business, 
  onPress, 
  isFavorite = false, 
  onToggleFavorite 
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        
        {/* Cabeçalho com Nome e Botão de Favorito */}
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{business.name}</Text>
            <Text style={styles.category}>{business.category}</Text>
          </View>
          
          {/* Só renderiza o coração se a função de toggle for passada */}
          {onToggleFavorite && (
            <TouchableOpacity 
              onPress={onToggleFavorite} 
              style={styles.heartButton}
              activeOpacity={0.6}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Text style={styles.heartIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.rating}>⭐ {business.rating.toFixed(1)}</Text>
          <Text style={styles.distance}>• {business.distance} km</Text>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {business.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

