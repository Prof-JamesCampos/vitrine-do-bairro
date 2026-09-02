import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../theme/colors';
import { useFormValidation } from '../hooks/useFormValidation';

export const RegisterBusinessScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const rules = {
    name: { required: true, minLength: 3 },
    phone: { required: true, pattern: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, patternMessage: 'Ex: (11) 99999-9999' },
    description: { required: true, minLength: 10 },
  };

  const { errors, validate, clearErrors } = useFormValidation(rules);

  const handleSubmit = () => {
    clearErrors();
    const isValid = validate({ name, phone, description });

    if (isValid) {
      Alert.alert('Sucesso!', 'Comerciante cadastrado (simulação).');
      setName('');
      setPhone('');
      setDescription('');
    } else {
      // Acessibilidade: anunciar erro para o leitor de tela
      Alert.alert('Erro no formulário', 'Por favor, corrija os campos destacados.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Cadastrar Comércio</Text>
        <Text style={styles.subtitle}>Preencha os dados para entrar na vitrine</Text>

        {/* Campo Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Estabelecimento *</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={name}
            onChangeText={(text) => { setName(text); clearErrors(); }}
            placeholder="Ex: Padaria do João"
            placeholderTextColor={colors.textLight}
            accessibilityLabel={`Campo nome do estabelecimento. ${errors.name ? `Erro: ${errors.name}` : ''}`}
            //accessibilityState={{ invalid: !!errors.name }}
          />
          {errors.name && <Text style={styles.errorText} accessibilityRole="alert">⚠️ {errors.name}</Text>}
        </View>

        {/* Campo Telefone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone/WhatsApp *</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={phone}
            onChangeText={(text) => { setPhone(text); clearErrors(); }}
            placeholder="(11) 99999-9999"
            placeholderTextColor={colors.textLight}
            keyboardType="phone-pad"
            accessibilityLabel={`Campo telefone. ${errors.phone ? `Erro: ${errors.phone}` : ''}`}
            //accessibilityState={{ invalid: !!errors.phone }}
          />
          {errors.phone && <Text style={styles.errorText} accessibilityRole="alert">⚠️ {errors.phone}</Text>}
        </View>

        {/* Campo Descrição */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição *</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.description && styles.inputError]}
            value={description}
            onChangeText={(text) => { setDescription(text); clearErrors(); }}
            placeholder="Conte um pouco sobre seu negócio..."
            placeholderTextColor={colors.textLight}
            multiline
            numberOfLines={4}
            accessibilityLabel={`Campo descrição. ${errors.description ? `Erro: ${errors.description}` : ''}`}
            //accessibilityState={{ invalid: !!errors.description }}
          />
          {errors.description && <Text style={styles.errorText} accessibilityRole="alert">⚠️ {errors.description}</Text>}
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityLabel="Botão para enviar cadastro do comerciante"
        >
          <Text style={styles.buttonText}>Cadastrar Comércio</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { fontSize: 24, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 16, color: colors.textLight, marginBottom: spacing.lg },
  inputGroup: { marginBottom: spacing.md },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    minHeight: 48, // Alvo de toque acessível
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: 'red', borderWidth: 2 },
  errorText: { color: 'red', fontSize: 12, marginTop: 4, fontWeight: '500' },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});