import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BusinessCard } from '../components/BusinessCard';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockBusinesses } from '../data/mockData';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filtered = mockBusinesses.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Vitrine do Bairro</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Buscar no bairro..."
          placeholderTextColor={colors.textLight}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: colors.primary, padding: 12, borderRadius: 8, margin: 16, alignItems: 'center' }}
        onPress={() => navigation.navigate('Register')}
        accessibilityRole="button"
        accessibilityLabel="Botão para cadastrar novo comerciante"
      >
        <Text style={{ color: colors.white, fontWeight: 'bold' }}>Cadastrar meu Comércio</Text>
      </TouchableOpacity>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <BusinessCard
            business={item}
            onPress={() => navigation.navigate('Details', { businessId: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum comerciante encontrado 😕</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.secondary, padding: spacing.md, paddingTop: spacing.lg },
  title: { fontSize: 24, fontWeight: '700', color: colors.white, marginBottom: spacing.md },
  searchInput: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  list: { padding: spacing.md },
  emptyText: { textAlign: 'center', marginTop: 40, color: colors.textLight, fontSize: 16 },
});