import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { User as UserType } from '../App';
import { useState } from 'react';

interface HeaderProps {
  cartItemCount: number;
  user: UserType | null;
  onAuthClick: () => void;
  onLogout: () => void;
}

export function Header({ cartItemCount, user, onAuthClick, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <h1 className="text-xl font-semibold text-emerald-700 tracking-tight">HawkerBazaar</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium">
              Shop
            </Link>
            {user?.role === 'vendor' && (
              <Link to="/vendor" className="text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium">
                Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/orders">
                  <Button variant="ghost" size="sm">My Orders</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onAuthClick} className="bg-emerald-700 hover:bg-emerald-800">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-stone-600 hover:text-stone-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-stone-600 hover:text-stone-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/cart"
                className="text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
              {user?.role === 'vendor' && (
                <Link
                  to="/vendor"
                  className="text-stone-600 hover:text-stone-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vendor Dashboard
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-stone-600 hover:text-stone-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {user ? (
                <>
                  <Link
                    to="/orders"
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onAuthClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-stone-900 font-medium"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}