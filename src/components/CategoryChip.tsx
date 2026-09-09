import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../theme/colors';
import { Category } from '../types';

interface CategoryChipProps {
  label: Category | 'Todos';
  selected: boolean;
  onPress: () => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: { color: colors.text, fontSize: 14, fontWeight: '500' },
  labelSelected: { color: colors.white, fontWeight: '600' },
});