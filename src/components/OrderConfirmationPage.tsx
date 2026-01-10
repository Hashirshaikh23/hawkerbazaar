import { Link, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

export function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-200">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-stone-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-stone-600 mb-2">Thank you for shopping with SheMarket</p>
          <p className="text-stone-900 font-medium">Order ID: <span className="text-stone-700">{orderId}</span></p>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-stone-200">
          <h2 className="text-stone-900 mb-6 font-semibold">Order Status</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-200">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-stone-900 font-medium">Order Placed</p>
                <p className="text-stone-500 text-sm">Your order has been confirmed</p>
              </div>
            </div>

            <div className="flex gap-4 opacity-50">
              <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-stone-200">
                <Package className="w-6 h-6 text-stone-400" />
              </div>
              <div className="flex-1">
                <p className="text-stone-900 font-medium">Accepted & Packed</p>
                <p className="text-stone-500 text-sm">Vendor will prepare your items</p>
              </div>
            </div>

            <div className="flex gap-4 opacity-50">
              <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-stone-200">
                <Truck className="w-6 h-6 text-stone-400" />
              </div>
              <div className="flex-1">
                <p className="text-stone-900 font-medium">Shipped</p>
                <p className="text-stone-500 text-sm">Your order is on the way</p>
              </div>
            </div>

            <div className="flex gap-4 opacity-50">
              <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-stone-200">
                <Home className="w-6 h-6 text-stone-400" />
              </div>
              <div className="flex-1">
                <p className="text-stone-900 font-medium">Delivered</p>
                <p className="text-stone-500 text-sm">Package delivered to you</p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-stone-50 rounded-2xl p-6 mb-8 border border-stone-200">
          <h3 className="text-stone-900 mb-4 font-semibold">What happens next?</h3>
          <ul className="space-y-3 text-stone-600">
            <li className="flex items-start gap-3">
              <span className="text-stone-700 mt-0.5 font-semibold">•</span>
              <span>You will receive a confirmation message on your registered phone number</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-stone-700 mt-0.5 font-semibold">•</span>
              <span>The vendor will accept and pack your order within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-stone-700 mt-0.5 font-semibold">•</span>
              <span>You can track your order status in the "My Orders" section</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-stone-700 mt-0.5 font-semibold">•</span>
              <span>Estimated delivery: 3-5 business days</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/orders" className="flex-1">
            <Button variant="outline" className="w-full border-stone-300 hover:bg-stone-50">
              Track Order
            </Button>
          </Link>
          <Link to="/products" className="flex-1">
            <Button className="w-full bg-stone-900 hover:bg-stone-800 shadow-lg shadow-stone-900/10">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}