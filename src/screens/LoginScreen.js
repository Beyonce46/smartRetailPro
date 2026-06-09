import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useApp } from '../context/AppContext';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const { showToast } = useApp();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      onLogin();
      showToast('Welcome back!', 'success');
    } else {
      showToast('Invalid credentials', 'error');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.logo}>Smart Retail Pro</Text>
        <Text style={styles.subtitle}>Sign in to manage your store</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="admin"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••"
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>Demo credentials: admin / admin</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { flex: 1, justifyContent: 'center', padding: 32 },
  logo: { fontSize: 32, fontWeight: '800', color: '#4f46e5', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#64748b', textAlign: 'center', marginBottom: 40, fontWeight: '500' },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: '600', color: '#64748b', marginBottom: 8, marginTop: 16 },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  hint: { textAlign: 'center', marginTop: 20, color: '#64748b', fontSize: 13 },
});