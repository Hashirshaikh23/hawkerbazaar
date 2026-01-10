import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { orders } from '../lib/mockData';
import { User } from '../App';

interface OrdersPageProps {
  user: User | null;
}

export function OrdersPage({ user }: OrdersPageProps) {
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-stone-900 mb-4">Please login to view orders</h2>
          <Link to="/">
            <Button className="bg-stone-900 hover:bg-stone-800">Go to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6 gradient-grain">
            <Package className="w-12 h-12 text-stone-700" />
          </div>
          <h2 className="text-stone-900 mb-4">No orders yet</h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            You haven't placed any orders. Start shopping to see your orders here!
          </p>
          <Link to="/products">
            <Button className="bg-stone-900 hover:bg-stone-800 shadow-lg shadow-stone-900/10" size="lg">
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
        <h1 className="text-stone-900 mb-2">My Orders</h1>
        <p className="text-stone-600">Track and manage your orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl overflow-hidden border border-stone-200">
            {/* Order Header */}
            <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-6 border-b border-stone-200 gradient-grain">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <p className="text-stone-500 text-sm mb-1 font-medium">Order ID</p>
                  <p className="text-stone-900 font-semibold">{order.id}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1 font-medium">Order Date</p>
                  <p className="text-stone-900 font-semibold">{new Date(order.date).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1 font-medium">Total Amount</p>
                  <p className="text-stone-900 font-semibold">₹{order.total}</p>
                </div>
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-stone-100 last:border-b-0 last:pb-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Link to={`/products/${item.id}`}>
                        <h3 className="text-stone-900 font-medium hover:text-stone-700 mb-1">{item.name}</h3>
                      </Link>
                      <p className="text-stone-500 text-sm mb-2">Quantity: {item.quantity}</p>
                      <p className="text-stone-900 font-semibold">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              <div className="bg-stone-50 rounded-xl p-5 mb-6 border border-stone-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-stone-200">
                    <MapPin className="w-5 h-5 text-stone-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-stone-900 font-semibold mb-2">Shipping Address</h4>
                    <p className="text-stone-600 text-sm mb-1">{order.shippingAddress.name}</p>
                    <p className="text-stone-600 text-sm flex items-center gap-1.5 mb-1">
                      <Phone className="w-3.5 h-3.5" />
                      {order.shippingAddress.phone}
                    </p>
                    <p className="text-stone-600 text-sm">
                      {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="mb-6">
                <p className="text-stone-900 font-semibold mb-4">Order Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.status !== 'placed' ? 'bg-emerald-100' : 'bg-stone-100'}`}>
                    <CheckCircle className={`w-5 h-5 ${order.status !== 'placed' ? 'text-emerald-600' : 'text-stone-700'}`} />
                  </div>
                  <div className={`h-1 flex-1 rounded-full ${['accepted', 'packed', 'shipped', 'delivered'].includes(order.status) ? 'bg-emerald-200' : 'bg-stone-200'}`}></div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${['packed', 'shipped', 'delivered'].includes(order.status) ? 'bg-emerald-100' : 'bg-stone-100'}`}>
                    <Package className={`w-5 h-5 ${['packed', 'shipped', 'delivered'].includes(order.status) ? 'text-emerald-600' : 'text-stone-400'}`} />
                  </div>
                  <div className={`h-1 flex-1 rounded-full ${['shipped', 'delivered'].includes(order.status) ? 'bg-emerald-200' : 'bg-stone-200'}`}></div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.status === 'delivered' ? 'bg-emerald-100' : 'bg-stone-100'}`}>
                    <Truck className={`w-5 h-5 ${order.status === 'delivered' ? 'text-emerald-600' : 'text-stone-400'}`} />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {order.status === 'delivered' && (
                  <Button variant="outline" className="flex-1 border-stone-300 hover:bg-stone-50">
                    Write a Review
                  </Button>
                )}
                {order.status !== 'delivered' && (
                  <Button className="flex-1 bg-stone-900 hover:bg-stone-800">
                    Track Order
                  </Button>
                )}
                <Button variant="outline" className="flex-1 border-stone-300 hover:bg-stone-50">
                  Need Help?
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'placed':
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'accepted':
    case 'packed':
      return 'bg-amber-100 text-amber-700 border border-amber-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-700 border border-purple-200';
    case 'delivered':
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    default:
      return 'bg-stone-100 text-stone-700 border border-stone-200';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'placed':
      return <Clock className="w-4 h-4" />;
    case 'accepted':
    case 'packed':
      return <Package className="w-4 h-4" />;
    case 'shipped':
      return <Truck className="w-4 h-4" />;
    case 'delivered':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
}
