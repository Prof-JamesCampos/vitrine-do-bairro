import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme/colors';
import { mockBusinesses } from '../data/mockData';

export const DetailsScreen: React.FC<any> = ({ route }) => {
  const { businessId } = route.params;
  const business = mockBusinesses.find(b => b.id === businessId);

  if (!business) return <View><Text>Não encontrado</Text></View>;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.desc}>{business.description}</Text>
        {/* O resto da tela será construído no Bloco 4 da aula! */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: spacing.md },
  name: { fontSize: 24, fontWeight: '700', color: colors.text },
  desc: { fontSize: 16, color: colors.textLight, marginTop: spacing.sm },
});