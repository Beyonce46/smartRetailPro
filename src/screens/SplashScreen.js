import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Smart Retail{'\n'}Pro</Text>
      <Text style={styles.subtitle}>Inventory & Sales Management</Text>
      <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: 10,
  },
  subtitle: {
    color: '#ffffff',
    opacity: 0.8,
    fontSize: 16,
    fontWeight: '500',
  },
});