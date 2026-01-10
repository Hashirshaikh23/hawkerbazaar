import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductListPage } from './components/ProductListPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { OrdersPage } from './components/OrdersPage';
import { VendorDashboard } from './components/VendorDashboard';
import { VendorOnboarding } from './components/VendorOnboarding';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  vendorName: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'customer' | 'vendor' | 'admin';
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-stone-50">
        <Header
          cartItemCount={cartItemCount}
          user={user}
          onAuthClick={() => setShowAuthModal(true)}
          onLogout={() => setUser(null)}
        />
        <main className="min-h-[calc(100vh-200px)]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={<ProductListPage addToCart={addToCart} />}
            />
            <Route
              path="/products/:id"
              element={<ProductDetailPage addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  updateQuantity={updateCartItemQuantity}
                  user={user}
                  onAuthRequired={() => setShowAuthModal(true)}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cart={cart}
                  user={user}
                  clearCart={clearCart}
                  onAuthRequired={() => setShowAuthModal(true)}
                />
              }
            />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/orders" element={<OrdersPage user={user} />} />
            <Route path="/vendor" element={<VendorDashboard user={user} />} />
            <Route path="/vendor/onboard" element={<VendorOnboarding />} />
            <Route path="/admin" element={<AdminDashboard user={user} />} />
            {/* Catch-all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onSuccess={(user) => {
              setUser(user);
              setShowAuthModal(false);
            }}
          />
        )}
      </div>
    </Router>
  );
}