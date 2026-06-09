import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import BottomSheet from '../components/BottomSheet.js';

const LOW_STOCK_THRESHOLD = 10;

export default function InventoryScreen() {
  const { inventory, deleteProduct } = useApp();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openSellSheet = (product) => {
    if (product.stock <= 0) {
      // Toast will handle this
      return;
    }
    setSelectedProduct(product);
    setSheetVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Current Inventory</Text>
          <Text style={styles.count}>{inventory.length} items</Text>
        </View>

        {inventory.map(item => {
          const isLow = item.stock <= LOW_STOCK_THRESHOLD;
          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.productName}>{item.name}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                </View>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.cardFooter}>
                <View style={[styles.stockBadge, isLow ? styles.low : styles.ok]}>
                  <Text style={[styles.stockText, isLow ? styles.lowText : styles.okText]}>
                    In Stock: {item.stock}{isLow ? ' (Low)' : ''}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity 
                    style={styles.sellBtn} 
                    onPress={() => openSellSheet(item)}
                  >
                    <Text style={styles.sellBtnText}>Sell</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteBtn} 
                    onPress={() => deleteProduct(item.id)}
                  >
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <BottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        product={selectedProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  count: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  productName: { fontWeight: '700', fontSize: 16, color: '#0f172a' },
  categoryBadge: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  categoryText: { color: '#4f46e5', fontSize: 12, fontWeight: '600' },
  price: { fontWeight: '800', fontSize: 17, color: '#0f172a' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  stockBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  low: { backgroundColor: '#fef2f2' },
  ok: { backgroundColor: '#ecfdf5' },
  stockText: { fontSize: 13, fontWeight: '600' },
  lowText: { color: '#ef4444' },
  okText: { color: '#10b981' },
  actions: { flexDirection: 'row', gap: 8 },
  sellBtn: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sellBtnText: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  deleteBtn: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  deleteBtnText: { color: '#ef4444', fontSize: 13, fontWeight: '600' },
});