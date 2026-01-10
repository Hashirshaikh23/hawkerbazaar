import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart, Filter, X } from 'lucide-react';
import { products, categories, markets } from '../lib/mockData';
import { CartItem } from '../App';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';

interface ProductListPageProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

export function ProductListPage({ addToCart }: ProductListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMarket, setSelectedMarket] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const marketMatch = selectedMarket === 'All' || product.market === selectedMarket;

      let priceMatch = true;
      if (priceRange === 'under500') {
        priceMatch = product.price < 500;
      } else if (priceRange === '500-1000') {
        priceMatch = product.price >= 500 && product.price <= 1000;
      } else if (priceRange === 'over1000') {
        priceMatch = product.price > 1000;
      }

      return categoryMatch && marketMatch && priceMatch;
    });
  }, [selectedCategory, selectedMarket, priceRange]);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      vendorName: product.vendorName,
    });
    toast.success('Added to cart!');
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedMarket('All');
    setPriceRange('All');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedMarket !== 'All' || priceRange !== 'All';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-stone-900 mb-2">Shop All Products</h1>
        <p className="text-stone-600">
          Discover {filteredProducts.length} handpicked products from local women-led shops
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 sticky top-24 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-stone-900">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-stone-600 text-sm hover:text-stone-900 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-stone-900 mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      selectedCategory === category
                        ? 'bg-emerald-700 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Market Filter */}
            <div className="mb-6">
              <h4 className="text-stone-900 mb-3">Market</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedMarket('All')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                    selectedMarket === 'All'
                      ? 'bg-emerald-700 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  All Markets
                </button>
                {markets.map((market) => (
                  <button
                    key={market}
                    onClick={() => setSelectedMarket(market)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-xs ${
                      selectedMarket === market
                        ? 'bg-emerald-700 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {market}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="text-stone-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                {[
                  { value: 'All', label: 'All Prices' },
                  { value: 'under500', label: 'Under ₹500' },
                  { value: '500-1000', label: '₹500 - ₹1000' },
                  { value: 'over1000', label: 'Over ₹1000' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPriceRange(option.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      priceRange === option.value
                        ? 'bg-emerald-700 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Filters */}
        <div className="lg:hidden fixed bottom-4 right-4 z-40">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-emerald-700 hover:bg-emerald-800 rounded-full shadow-lg"
            size="lg"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowFilters(false)}>
            <div
              className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Filter Content - Same as Desktop */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-gray-900 mb-3">Category</h4>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="text-gray-900 mb-3">Market</h4>
                  <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Markets</SelectItem>
                      {markets.map((market) => (
                        <SelectItem key={market} value={market}>
                          {market}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="text-gray-900 mb-3">Price Range</h4>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Prices</SelectItem>
                      <SelectItem value="under500">Under ₹500</SelectItem>
                      <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                      <SelectItem value="over1000">Over ₹1000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="outline" className="w-full">
                    Clear All Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl">
              <p className="text-gray-600 mb-4">No products found matching your filters</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:border-stone-300 transition-all group"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="aspect-square overflow-hidden bg-stone-50">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-stone-500 text-xs font-medium mb-1 uppercase tracking-wide">{product.vendorName}</p>
                    <p className="text-stone-400 text-[10px] mb-2 uppercase tracking-wide">{product.market}</p>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-stone-900 mb-3 font-medium hover:text-stone-700">{product.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-stone-900 font-semibold">₹{product.price}</p>
                        {product.originalPrice && (
                          <p className="text-stone-400 line-through text-sm">
                            ₹{product.originalPrice}
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="bg-emerald-700 hover:bg-emerald-800"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}