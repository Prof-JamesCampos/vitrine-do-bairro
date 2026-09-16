import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors } from '../theme/colors';
import { styles } from './Header.style';

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

