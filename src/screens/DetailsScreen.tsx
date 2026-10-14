import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { firestoreService } from '../services/firestoreService';
import { Business } from '../types';
import { styles } from './DetailsScreen.styles';

interface DetailsScreenProps {
  navigation: any;
  route: any;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBusinessDetails = async () => {
      setLoading(true);
      try {
        // ✅ Busca diretamente no Firestore pelo ID passado na navegação
        const data = await firestoreService.getById(route.params.businessId);
        setBusiness(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBusinessDetails();
  }, [route.params.businessId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando detalhes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!business) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Comerciante não encontrado.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroPlaceholder}>
          <Text style={styles.heroText}>📷 Foto do Local</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{business.name}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{business.category}</Text>
            </View>
            <Text style={styles.rating}>⭐ {business.rating.toFixed(1)}</Text>
          </View>

          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.description}>{business.description}</Text>

          {business.openingHours && (
            <>
              <Text style={styles.sectionTitle}>🕐 Horário</Text>
              <Text style={styles.info}>{business.openingHours}</Text>
            </>
          )}

          {business.whatsapp && (
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={() => {
                // Futuro: Linking.openURL(`https://wa.me/${business.whatsapp}`)
                alert(`Abrir WhatsApp: ${business.whatsapp}`);
              }}
              accessibilityRole="button"
              accessibilityLabel={`Chamar no WhatsApp ${business.whatsapp}`}
            >
              <Text style={styles.whatsappText}>💬 Chamar no WhatsApp</Text>
            </TouchableOpacity>
          )}

          {business.products && business.products.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>📦 Produtos em destaque</Text>
              {business.products.map((product) => (
                <View key={product.id} style={styles.productRow}>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

