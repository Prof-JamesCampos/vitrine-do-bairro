import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../theme/colors';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchValue, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vitrine do Bairro</Text>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar no bairro..."
          placeholderTextColor={colors.textLight}
          value={searchValue}
          onChangeText={onSearchChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingTop: 50,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchIcon: { fontSize: 18, marginRight: spacing.sm },
  searchInput: { flex: 1, fontSize: 16, color: colors.text },
});