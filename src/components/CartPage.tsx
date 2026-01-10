import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Minus, Plus, Trash2, ShoppingBag, Package, Truck } from 'lucide-react';
import { CartItem, User } from '../App';

interface CartPageProps {
  cart: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  user: User | null;
  onAuthRequired: () => void;
}

export function CartPage({ cart, updateQuantity, user, onAuthRequired }: CartPageProps) {
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      onAuthRequired();
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6 gradient-grain">
            <ShoppingBag className="w-12 h-12 text-stone-700" />
          </div>
          <h2 className="text-stone-900 mb-4">Your cart is empty</h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products">
            <Button className="bg-emerald-700 hover:bg-emerald-800 shadow-lg shadow-emerald-700/20" size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-stone-900 mb-2">Shopping Cart</h1>
        <p className="text-stone-600">{cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 border border-stone-200">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 py-6 border-b border-stone-200 last:border-b-0"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="text-stone-900 mb-1 hover:text-stone-700 font-medium">{item.name}</h3>
                  </Link>
                  <p className="text-stone-500 text-sm mb-3">{item.vendorName}</p>
                  <p className="text-stone-900 font-semibold">₹{item.price}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => updateQuantity(item.id, 0)}
                    className="text-stone-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2 bg-stone-50 rounded-lg p-1 border border-stone-200">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium text-stone-900">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl p-6 sticky top-24 border border-stone-200">
            <h2 className="text-stone-900 mb-6 font-semibold">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Shipping
                </span>
                <span className="font-medium">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="text-emerald-700 text-sm flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Add ₹{1000 - subtotal} more for free shipping!
                  </p>
                </div>
              )}
              <div className="border-t border-stone-200 pt-4 flex justify-between text-stone-900">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg">₹{total}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-emerald-700 hover:bg-emerald-800 mb-3 h-12 shadow-lg shadow-emerald-700/20"
            >
              Proceed to Checkout
            </Button>

            <Link to="/products">
              <Button variant="outline" className="w-full border-stone-300 hover:bg-stone-50">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}