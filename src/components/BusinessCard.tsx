import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
  onPress: () => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.category}>{business.category}</Text>
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
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: { 
    flex: 1 
  },
  name: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: colors.text 
  },
  category: { 
    fontSize: 12, 
    color: colors.primary, 
    fontWeight: '600', 
    marginTop: 4 
  },
  infoRow: { 
    flexDirection: 'row', 
    marginTop: spacing.sm, 
    marginBottom: spacing.xs 
  },
  rating: { 
    fontSize: 14, 
    color: colors.text, 
    fontWeight: '500' 
  },
  distance: { 
    fontSize: 14, 
    color: colors.textLight, 
    marginLeft: spacing.xs 
  },
  description: { 
    fontSize: 14, 
    color: colors.textLight, 
    lineHeight: 20 
  },
});