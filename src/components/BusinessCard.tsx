import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import { Business } from '../types';

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
              <Text style={styles.heartIcon}>{isFavorite ? '❤️' : ''}</Text>
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: { flex: 1 },
  // Novos estilos para o cabeçalho e coração
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  titleContainer: { flex: 1, paddingRight: spacing.sm },
  name: { fontSize: 18, fontWeight: '700', color: colors.text },
  category: { fontSize: 12, color: colors.primary, fontWeight: '600', marginTop: 2 },
  heartButton: {
    padding: 8, // Aumenta a área de toque para acessibilidade
  },
  heartIcon: {
    fontSize: 24,
  },
  // Estilos originais
  infoRow: { flexDirection: 'row', marginTop: spacing.sm, marginBottom: spacing.xs },
  rating: { fontSize: 14, color: colors.text, fontWeight: '500' },
  distance: { fontSize: 14, color: colors.textLight, marginLeft: spacing.xs },
  description: { fontSize: 14, color: colors.textLight, lineHeight: 20 },
});