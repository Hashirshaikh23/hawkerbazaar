import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Store, Upload } from 'lucide-react';
import { markets } from '../lib/mockData';
import { toast } from 'sonner';

export function VendorOnboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    phone: '',
    email: '',
    market: '',
    shopAddress: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',
    description: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    toast.success('Application submitted successfully! We will review and contact you soon.');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-stone-700 to-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-4 gradient-grain">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-stone-900 mb-4">Become a Vendor</h1>
          <p className="text-stone-600 leading-relaxed max-w-xl mx-auto">
            Join SheMarket and expand your business beyond foot traffic. Reach customers across Mumbai!
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-200">
            <p className="text-4xl mb-3">🎯</p>
            <h3 className="text-stone-900 mb-2 font-semibold">Wider Reach</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Connect with customers beyond your physical location
            </p>
          </div>
          <div className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-200">
            <p className="text-4xl mb-3">💰</p>
            <h3 className="text-stone-900 mb-2 font-semibold">Easy Payouts</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Weekly settlements directly to your bank account
            </p>
          </div>
          <div className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-200">
            <p className="text-4xl mb-3">📱</p>
            <h3 className="text-stone-900 mb-2 font-semibold">Simple Dashboard</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Manage products and orders with ease
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-8 border border-stone-200">
          {/* Shop Details */}
          <div>
            <h2 className="text-stone-900 mb-6 font-semibold">Shop Details</h2>
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shopName">Shop Name *</Label>
                  <Input
                    id="shopName"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleInputChange}
                    placeholder="Your Shop Name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ownerName">Owner Name *</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    placeholder="Your Full Name"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="market">Market Location *</Label>
                  <Select
                    value={formData.market}
                    onValueChange={(value) => setFormData({ ...formData, market: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      {markets.map((market) => (
                        <SelectItem key={market} value={market}>
                          {market}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="shopAddress">Shop Address *</Label>
                  <Input
                    id="shopAddress"
                    name="shopAddress"
                    value={formData.shopAddress}
                    onChange={handleInputChange}
                    placeholder="Shop number, Street"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">About Your Shop</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your products and what makes your shop special..."
                  rows={4}
                />
              </div>

              <div>
                <Label>Shop Photos</Label>
                <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-stone-400 cursor-pointer transition-colors bg-stone-50">
                  <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-stone-600 text-sm mb-1 font-medium">Click to upload shop photos</p>
                  <p className="text-stone-400 text-xs">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h2 className="text-stone-900 mb-6 font-semibold">Payment Details</h2>
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    placeholder="Your Bank Name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Account Number"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ifsc">IFSC Code *</Label>
                  <Input
                    id="ifsc"
                    name="ifsc"
                    value={formData.ifsc}
                    onChange={handleInputChange}
                    placeholder="IFSC Code"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="upiId">UPI ID (Optional)</Label>
                  <Input
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="yourname@upi"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h3 className="text-stone-900 mb-4 font-semibold">Terms & Conditions</h3>
            <ul className="space-y-3 text-stone-600 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-stone-700 mt-0.5 font-semibold">•</span>
                <span>Commission: 10-15% per transaction based on product category</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-700 mt-0.5 font-semibold">•</span>
                <span>Weekly payment settlements to your account</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-700 mt-0.5 font-semibold">•</span>
                <span>You are responsible for product quality and timely fulfillment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-700 mt-0.5 font-semibold">•</span>
                <span>All products must comply with local regulations</span>
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 h-12 shadow-lg shadow-stone-900/10"
          >
            Submit Application
          </Button>

          <p className="text-stone-500 text-sm text-center leading-relaxed">
            By submitting this application, you agree to our vendor terms and conditions
          </p>
        </form>
      </div>
    </div>
  );
}