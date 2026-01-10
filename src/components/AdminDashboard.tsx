import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Users,
  Package,
  IndianRupee,
  TrendingUp,
  CheckCircle,
  X,
  Edit,
  Search,
} from 'lucide-react';
import { User } from '../App';
import { vendors, products, orders } from '../lib/mockData';
import { toast } from 'sonner';

interface AdminDashboardProps {
  user: User | null;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-gray-900 mb-4">Admin Access Required</h2>
          <p className="text-gray-600">This page is only accessible to administrators.</p>
        </div>
      </div>
    );
  }

  const totalRevenue = 258000;
  const totalVendors = vendors.length;
  const pendingApprovals = vendors.filter(v => !v.approved).length;
  const totalProducts = products.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage vendors, products, and platform settings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Revenue</p>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-900">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-green-600 text-sm mt-1">+18% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Active Vendors</p>
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-pink-600" />
            </div>
          </div>
          <p className="text-gray-900">{totalVendors}</p>
          <p className="text-orange-600 text-sm mt-1">{pendingApprovals} pending</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Products</p>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-900">{totalProducts}</p>
          <p className="text-gray-600 text-sm mt-1">Across all vendors</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Orders</p>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-900">{orders.length}</p>
          <p className="text-green-600 text-sm mt-1">+24% this week</p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="vendors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-900">Vendor Management</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-gray-600">Vendor</th>
                    <th className="text-left p-4 text-gray-600">Market</th>
                    <th className="text-left p-4 text-gray-600">Products</th>
                    <th className="text-left p-4 text-gray-600">Total Sales</th>
                    <th className="text-left p-4 text-gray-600">Commission</th>
                    <th className="text-left p-4 text-gray-600">Status</th>
                    <th className="text-left p-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="border-b last:border-b-0">
                      <td className="p-4">
                        <div>
                          <p className="text-gray-900">{vendor.name}</p>
                          <p className="text-gray-600 text-sm">{vendor.ownerName}</p>
                          <p className="text-gray-500 text-xs">{vendor.phone}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{vendor.market}</td>
                      <td className="p-4 text-gray-900">{vendor.productsCount}</td>
                      <td className="p-4 text-gray-900">₹{vendor.totalSales.toLocaleString()}</td>
                      <td className="p-4 text-gray-900">{vendor.commissionRate}%</td>
                      <td className="p-4">
                        {vendor.approved ? (
                          <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            Approved
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {!vendor.approved && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => toast.success(`${vendor.name} approved!`)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toast.success('Edit functionality coming soon')}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-900">All Products</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-64"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-gray-600">Product</th>
                    <th className="text-left p-4 text-gray-600">Vendor</th>
                    <th className="text-left p-4 text-gray-600">Category</th>
                    <th className="text-left p-4 text-gray-600">Price</th>
                    <th className="text-left p-4 text-gray-600">Status</th>
                    <th className="text-left p-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 10).map((product) => (
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
                          <p className="text-gray-900">{product.name}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{product.vendorName}</td>
                      <td className="p-4 text-gray-600">{product.category}</td>
                      <td className="p-4 text-gray-900">₹{product.price}</td>
                      <td className="p-4">
                        <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Active
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
                            onClick={() => toast.success('Remove functionality coming soon')}
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-gray-900">All Orders</h2>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-6">
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Order ID</p>
                    <p className="text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Date</p>
                    <p className="text-gray-900">{new Date(order.date).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Amount</p>
                    <p className="text-gray-900">₹{order.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Status</p>
                    <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm">{item.name}</p>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-gray-900">Platform Settings</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Commission Rates */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-gray-900 mb-4">Commission Rates</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Clothing</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">15%</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Jewelry</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">12%</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Home Decor</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">10%</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Settings */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-gray-900 mb-4">Featured Listings</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm mb-2">Featured vendor slots</p>
                  <Input type="number" defaultValue="5" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-2">Featured product slots</p>
                  <Input type="number" defaultValue="8" />
                </div>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 mt-4">
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Platform Stats */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-gray-900 mb-4">Platform Analytics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Users</span>
                  <span className="text-gray-900">1,254</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Order Value</span>
                  <span className="text-gray-900">₹1,098</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="text-gray-900">3.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Retention</span>
                  <span className="text-gray-900">68%</span>
                </div>
              </div>
            </div>

            {/* Export Data */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-gray-900 mb-4">Data Export</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Export Vendor Data (CSV)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Export Order Data (CSV)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Export Revenue Report (CSV)
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
