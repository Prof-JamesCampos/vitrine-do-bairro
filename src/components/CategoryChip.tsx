import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Category } from '../types';
import { styles } from './CategoryChip.styles';

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

