import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CreditCard, Smartphone, Wallet, ShieldCheck, Lock } from 'lucide-react';
import { CartItem, User } from '../App';
import { toast } from 'sonner';

interface CheckoutPageProps {
  cart: CartItem[];
  user: User | null;
  clearCart: () => void;
  onAuthRequired: () => void;
}

export function CheckoutPage({ cart, user, clearCart, onAuthRequired }: CheckoutPageProps) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    pincode: '',
  });

  useEffect(() => {
    if (!user) {
      onAuthRequired();
      navigate('/cart');
    }
  }, [user, onAuthRequired, navigate]);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Generate order ID
    const orderId = 'ORD' + Date.now().toString().slice(-6);

    // Clear cart and redirect to confirmation
    clearCart();
    toast.success('Order placed successfully!');
    navigate(`/order-confirmation/${orderId}`);
  };

  if (!user || cart.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-stone-900 mb-2">Checkout</h1>
        <p className="text-stone-600">Complete your order securely</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <h2 className="text-stone-900 mb-6 font-semibold">Shipping Address</h2>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-stone-700">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-1.5 border-stone-300 focus:border-stone-500 bg-stone-50"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-stone-700">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="mt-1.5 border-stone-300 focus:border-stone-500 bg-stone-50"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-stone-700">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Flat/House no., Building name, Street"
                    className="mt-1.5 border-stone-300 focus:border-stone-500 bg-stone-50"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-stone-700">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1.5 border-stone-300 focus:border-stone-500 bg-stone-50"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-stone-700">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="mt-1.5 border-stone-300 focus:border-stone-500 bg-stone-50"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-stone-900 font-semibold">Payment Method</h2>
                <div className="flex items-center gap-1.5 text-stone-500 text-sm">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure</span>
                </div>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 border border-stone-200 rounded-xl p-4 hover:bg-stone-50 cursor-pointer transition-colors">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                      <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-stone-700" />
                      </div>
                      <div>
                        <p className="text-stone-900 font-medium">UPI</p>
                        <p className="text-stone-500 text-sm">Google Pay, PhonePe, Paytm</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border border-stone-200 rounded-xl p-4 hover:bg-stone-50 cursor-pointer transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                      <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-stone-700" />
                      </div>
                      <div>
                        <p className="text-stone-900 font-medium">Credit / Debit Card</p>
                        <p className="text-stone-500 text-sm">Visa, Mastercard, Rupay</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border border-stone-200 rounded-xl p-4 hover:bg-stone-50 cursor-pointer transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                      <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-stone-700" />
                      </div>
                      <div>
                        <p className="text-stone-900 font-medium">Cash on Delivery</p>
                        <p className="text-stone-500 text-sm">Pay when you receive</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 sticky top-24 border border-stone-200">
              <h2 className="text-stone-900 mb-6 font-semibold">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-stone-900 text-sm font-medium truncate">{item.name}</p>
                      <p className="text-stone-500 text-xs mb-1">Qty: {item.quantity}</p>
                      <p className="text-stone-900 text-sm font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-stone-200 pt-4 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-stone-900 pt-3 border-t border-stone-200">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">₹{total}</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-stone-900 hover:bg-stone-800 h-12 shadow-lg shadow-stone-900/10 mb-4"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Place Order ₹{total}
              </Button>

              <p className="text-stone-500 text-xs text-center leading-relaxed">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
