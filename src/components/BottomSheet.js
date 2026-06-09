import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import { useApp } from '../context/AppContext';

export default function BottomSheet({ visible, onClose, product }) {
  const [quantity, setQuantity] = useState('1');
  const { recordSale, showToast } = useApp();
  const slideAnim = React.useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 15,
      }).start();
    } else {
      slideAnim.setValue(500);
    }
  }, [visible]);

  const handleConfirm = () => {
    const qty = parseInt(quantity);
    if (!qty || qty > product.stock) {
      showToast('Invalid quantity!', 'error');
      return;
    }
    if (recordSale(product.id, qty)) {
      onClose();
      setQuantity('1');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <Animated.View 
          style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.handle} />
          <Text style={styles.title}>Record Sale</Text>
          <Text style={styles.subtitle}>{product?.name} • Available: {product?.stock}</Text>

          <Text style={styles.label}>Quantity to Sell</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="number-pad"
          />

          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm Sale</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  handle: { width: 40, height: 4, backgroundColor: '#e2e8f0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  subtitle: { color: '#64748b', fontSize: 15, marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: '#64748b', marginBottom: 8 },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});