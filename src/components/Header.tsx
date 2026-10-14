import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors, borderRadius, spacing } from '../theme/colors';
import { styles } from './Header.style';

// interface HeaderProps {
//   searchValue: string;
//   onSearchChange: (value: string) => void;
// }

export const Header: React.FC<{searchValue: string; onSearchChange: (value: string) => void
  }> = ({ searchValue, onSearchChange }) => (
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

