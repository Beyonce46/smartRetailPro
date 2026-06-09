import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';

const LOW_STOCK_THRESHOLD = 10;

export default function DashboardScreen() {
  const { inventory, sales } = useApp();

  const lowStockItems = inventory.filter(i => i.stock <= LOW_STOCK_THRESHOLD);
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const recentSales = sales.slice(-3).reverse();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {lowStockItems.length > 0 && (
        <View style={styles.alert}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Low Stock Alert!</Text>
            <Text style={styles.alertMessage}>{lowStockItems.length} item(s) need restocking.</Text>
          </View>
        </View>
      )}

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>TOTAL PRODUCTS</Text>
          <Text style={styles.statValue}>{inventory.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>LOW STOCK</Text>
          <Text style={[styles.statValue, styles.danger]}>{lowStockItems.length}</Text>
        </View>
        <View style={[styles.statCard, styles.fullWidth]}>
          <Text style={styles.statLabel}>TOTAL REVENUE</Text>
          <Text style={[styles.statValue, styles.success]}>${totalRevenue.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Sales</Text>
      {recentSales.length === 0 ? (
        <Text style={styles.emptyText}>No sales recorded yet.</Text>
      ) : (
        recentSales.map(sale => (
          <View key={sale.id} style={styles.saleItem}>
            <View>
              <Text style={styles.saleName}>{sale.productName}</Text>
              <Text style={styles.saleMeta}>Qty: {sale.quantity} • {sale.date}</Text>
            </View>
            <Text style={styles.saleAmount}>+${sale.total.toFixed(2)}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingBottom: 40 },
  alert: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertIcon: { fontSize: 20, marginRight: 12 },
  alertTitle: { fontWeight: '700', color: '#991b1b', fontSize: 15 },
  alertMessage: { color: '#991b1b', fontSize: 13, marginTop: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '48%',
  },
  fullWidth: { width: '100%' },
  statLabel: { fontSize: 11, color: '#64748b', fontWeight: '600', letterSpacing: 0.5, marginBottom: 8 },
  statValue: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  danger: { color: '#ef4444' },
  success: { color: '#10b981' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  emptyText: { color: '#64748b', textAlign: 'center', padding: 32 },
  saleItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saleName: { fontWeight: '600', fontSize: 15, color: '#0f172a' },
  saleMeta: { fontSize: 13, color: '#64748b', marginTop: 4 },
  saleAmount: { fontWeight: '700', color: '#10b981', fontSize: 16 },
});