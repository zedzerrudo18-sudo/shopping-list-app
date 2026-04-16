import { createContext, useContext, useState, useCallback } from 'react';

// Create Product Context
const ProductContext = createContext();

// Product Context Provider Component
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // 📝 Add new product
  const addProduct = useCallback((product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
  }, []);

  // ✏️ Update product
  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  // 🗑️ Delete product
  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // 🔍 Get product by ID
  const getProductById = useCallback(
    (id) => products.find((p) => p.id === id),
    [products]
  );

  // 🔄 Bulk update products (for sorting/filtering operations)
  const setAllProducts = useCallback((newProducts) => {
    setProducts(newProducts);
  }, []);

  // 📊 Get statistics
  const getStats = useCallback(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce(
      (sum, p) => sum + (p.price * p.quantity),
      0
    );
    const pendingCount = products.filter((p) => p.status === 'Pending').length;
    const boughtCount = products.filter((p) => p.status === 'Bought').length;

    return { totalProducts, totalValue, pendingCount, boughtCount };
  }, [products]);

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    setAllProducts,
    getStats,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
}
