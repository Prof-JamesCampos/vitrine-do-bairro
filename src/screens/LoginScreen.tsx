import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { authService } from '../services/authService';
import { styles } from './LoginScreen.styles';


export const LoginScreen: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const handleLogin = async () => {
    try {
      await authService.signIn(email, password);
      navigation.replace('Home'); // Redireciona para a Home após login
    } catch (error: any) {
      // Traduzindo erros comuns do Firebase
      let message = 'Erro ao fazer login.';
      if (error.code === 'auth/user-not-found') message = 'Usuário não encontrado.';
      if (error.code === 'auth/wrong-password') message = 'Senha incorreta.';
      if (error.code === 'auth/invalid-email') message = 'Email inválido.';
      Alert.alert('Erro', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acessar Vitrine</Text>
      <TextInput style={styles.input} placeholder=
        "Email" value={email} onChangeText={setEmail} keyboardType=
        "email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder=
        "Senha" value={password} onChangeText={setPassword} secureTextEntry />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};