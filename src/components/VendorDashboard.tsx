import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Package,
  Plus,
  TrendingUp,
  IndianRupee,
  Edit,
  Trash2,
  CheckCircle,
  X,
} from 'lucide-react';
import { User } from '../App';
import { products, orders, categories } from '../lib/mockData';
import { toast } from 'sonner';

interface VendorDashboardProps {
  user: User | null;
}

export function VendorDashboard({ user }: VendorDashboardProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  if (!user || user.role !== 'vendor') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-gray-900 mb-4">Vendor Access Required</h2>
          <p className="text-gray-600 mb-6">
            This page is only accessible to registered vendors.
          </p>
          <Button onClick={() => window.location.href = '/vendor/onboard'}>
            Become a Vendor
          </Button>
        </div>
      </div>
    );
  }

  // Mock vendor data - filter products for this vendor
  const vendorProducts = products.filter(p => p.vendorId === 'v1').slice(0, 5);
  const vendorOrders = orders.slice(0, 3);
  const totalSales = 45000;
  const pendingOrders = 3;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Vendor Dashboard</h1>
        <p className="text-gray-600">Welcome back, Priya's Boutique!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Sales</p>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-900">₹{totalSales.toLocaleString()}</p>
          <p className="text-green-600 text-sm mt-1">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Products</p>
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-pink-600" />
            </div>
          </div>
          <p className="text-gray-900">{vendorProducts.length}</p>
          <p className="text-gray-600 text-sm mt-1">Active listings</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Pending Orders</p>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-900">{pendingOrders}</p>
          <p className="text-gray-600 text-sm mt-1">Needs action</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Commission Rate</p>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">%</span>
            </div>
          </div>
          <p className="text-gray-900">15%</p>
          <p className="text-gray-600 text-sm mt-1">Per transaction</p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-900">Your Products</h2>
            <Button
              onClick={() => setShowAddProduct(true)}
              className="bg-gradient-to-r from-pink-500 to-orange-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>

          <div className="bg-white rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-gray-600">Product</th>
                    <th className="text-left p-4 text-gray-600">Category</th>
                    <th className="text-left p-4 text-gray-600">Price</th>
                    <th className="text-left p-4 text-gray-600">Status</th>
                    <th className="text-left p-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorProducts.map((product) => (
                    <tr key={product.id} className="border-b last:border-b-0">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-gray-900">{product.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{product.category}</td>
                      <td className="p-4 text-gray-900">₹{product.price}</td>
                      <td className="p-4">
                        <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          In Stock
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toast.success('Edit functionality coming soon')}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toast.success('Delete functionality coming soon')}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Product Modal */}
          {showAddProduct && (
            <AddProductModal onClose={() => setShowAddProduct(false)} />
          )}
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-gray-900">Recent Orders</h2>

          <div className="space-y-4">
            {vendorOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-900 mb-1">Order #{order.id}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{item.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        <p className="text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  {order.status === 'placed' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => toast.success('Order accepted!')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept Order
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.error('Order rejected')}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  {order.status === 'accepted' && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-500 to-orange-500"
                      onClick={() => toast.success('Order marked as packed!')}
                    >
                      Mark as Packed
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Payouts Tab */}
        <TabsContent value="payouts" className="space-y-6">
          <h2 className="text-gray-900">Payout History</h2>

          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600 mb-1">Available Balance</p>
                <p className="text-gray-900">₹12,450</p>
              </div>
              <Button className="bg-gradient-to-r from-pink-500 to-orange-500">
                Request Payout
              </Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-gray-900 mb-4">Recent Payouts</h3>
              <div className="space-y-3">
                {[
                  { date: '2025-11-10', amount: 15000, status: 'Completed' },
                  { date: '2025-11-03', amount: 18500, status: 'Completed' },
                  { date: '2025-10-27', amount: 11500, status: 'Completed' },
                ].map((payout, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <div>
                      <p className="text-gray-900">₹{payout.amount.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm">{new Date(payout.date).toLocaleDateString('en-IN')}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {payout.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AddProductModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Product added successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900">Add New Product</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(c => c !== 'All').map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div>
            <Label>Product Images *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Click to upload images</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
