import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Wireless Mouse', category: 'Electronics', stock: 45, price: 25.99 },
    { id: 2, name: 'USB-C Cable', category: 'Accessories', stock: 8, price: 12.50 },
    { id: 3, name: 'Mechanical Keyboard', category: 'Electronics', stock: 15, price: 89.99 },
    { id: 4, name: 'Notebook Pack', category: 'Stationery', stock: 5, price: 8.99 },
    { id: 5, name: 'Desk Lamp', category: 'Furniture', stock: 22, price: 34.50 },
  ]);

  const [sales, setSales] = useState([
    { id: 1, productName: 'Wireless Mouse', quantity: 2, total: 51.98, date: '2026-06-02' },
    { id: 2, productName: 'Desk Lamp', quantity: 1, total: 34.50, date: '2026-06-03' },
  ]);

  const [toast, setToast] = useState({ visible: false, message: '', type: 'success', showUndo: false });
  const [deletedProduct, setDeletedProduct] = useState(null);

  const showToast = (message, type = 'success', showUndo = false) => {
    setToast({ visible: true, message, type, showUndo });
    setTimeout(() => setToast({ ...toast, visible: false }), showUndo ? 5000 : 2500);
  };

  const addProduct = (product) => {
    setInventory([...inventory, { ...product, id: Date.now() }]);
    showToast('Product added!', 'success');
  };

  const deleteProduct = (id) => {
    const product = inventory.find(i => i.id === id);
    setDeletedProduct(product);
    setInventory(inventory.filter(i => i.id !== id));
    showToast('Product deleted', 'error', true);
  };

  const undoDelete = () => {
    if (deletedProduct) {
      setInventory([...inventory, deletedProduct]);
      setDeletedProduct(null);
      showToast('Restored!', 'success');
    }
  };

  const recordSale = (productId, quantity) => {
    const product = inventory.find(i => i.id === productId);
    if (!product || quantity > product.stock) return false;

    setInventory(inventory.map(i => 
      i.id === productId ? { ...i, stock: i.stock - quantity } : i
    ));

    setSales([...sales, {
      id: Date.now(),
      productName: product.name,
      quantity,
      total: quantity * product.price,
      date: new Date().toISOString().split('T')[0],
    }]);

    showToast(`Sale recorded: $${(quantity * product.price).toFixed(2)}`, 'success');
    return true;
  };

  return (
    <AppContext.Provider value={{
      inventory, sales, toast, deletedProduct,
      addProduct, deleteProduct, undoDelete, recordSale, showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);