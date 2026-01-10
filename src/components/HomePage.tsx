import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Sparkles, Heart, ShoppingBag, TrendingUp, MapPin, Shirt, Gem, Watch, Home, Footprints, Package } from 'lucide-react';
import { products, categories } from '../lib/mockData';

export function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full text-emerald-700 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wide uppercase">Women-Led Businesses</span>
            </div>
            <h1 className="mb-6 leading-tight text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-emerald-700">Bombay's Favorite</span>
              <br />
              <span className="text-stone-900">Market, Now in</span>
              <br />
              <span className="text-stone-900 italic">Your Pocket.</span>
            </h1>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed">
              Discover handpicked treasures from local women-led shops. From Hill Road to Colaba
              Causeway, shop the best of Bombay's street fashion online.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800 shadow-lg shadow-emerald-700/20 rounded-full px-8 py-6 text-base">
                  Start Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/vendor/onboard">
                <Button size="lg" variant="outline" className="border-stone-300 hover:bg-stone-50 rounded-full px-8 py-6 text-base">
                  View Collections
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 mt-10">
              <div>
                <p className="text-stone-900 text-2xl font-semibold">247</p>
                <p className="text-stone-600 text-sm">Active Vendors</p>
              </div>
              <div>
                <p className="text-stone-900 text-2xl font-semibold">3.2k</p>
                <p className="text-stone-600 text-sm">Orders This Month</p>
              </div>
              <div>
                <p className="text-stone-900 text-2xl font-semibold">4.8★</p>
                <p className="text-stone-600 text-sm">Avg Rating</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/10 gradient-grain">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1677431647033-5dc05838ba54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Bombay street fashion collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 mb-16">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-stone-900 mb-2">Women-Led</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Supporting local women entrepreneurs
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-stone-900 mb-2">Authentic Products</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Handpicked from Bombay's best markets
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-stone-900 mb-2">Local Markets</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Hill Road, Colaba, Linking Road & more
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-stone-900 mb-2">Fair Pricing</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Direct from vendors, transparent costs
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="mb-12">
          <h2 className="text-stone-900 mb-3">Shop by Category</h2>
          <p className="text-stone-600">From traditional wear to modern accessories</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.filter(cat => cat !== 'All').map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="bg-white rounded-xl p-5 hover:shadow-lg transition-all border border-stone-200 hover:border-emerald-200 group"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
                {getCategoryIconComponent(category)}
              </div>
              <p className="text-stone-900 text-sm font-medium">{category}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-stone-900 mb-2">
              Pick Our Top <span className="text-emerald-700">Selling Products</span>
            </h2>
            <p className="text-stone-600">Curated favorites from the streets of Bombay.</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="border-stone-300 hover:bg-stone-50 rounded-full">
              View All Products
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:border-stone-300 transition-all group"
            >
              <div className="aspect-square overflow-hidden bg-stone-50">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="text-stone-500 text-xs font-medium mb-1 uppercase tracking-wide">{product.vendorName}</p>
                <h3 className="text-stone-900 mb-3 font-medium">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-stone-900 font-semibold">₹{product.price}</p>
                  {product.originalPrice && (
                    <p className="text-stone-400 line-through text-sm">
                      ₹{product.originalPrice}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 mb-12">
        <div className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 rounded-3xl p-12 text-center text-white gradient-grain relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-white mb-4">Own a Shop? Join SheMarket!</h2>
            <p className="text-stone-300 mb-8 text-lg leading-relaxed">
              Expand your reach beyond foot traffic. List your products and connect with customers
              across Mumbai.
            </p>
            <Link to="/vendor/onboard">
              <Button size="lg" className="bg-white text-stone-900 hover:bg-stone-100">
                Register as Vendor <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function getCategoryIconComponent(category: string) {
  const icons: Record<string, JSX.Element> = {
    Clothing: <Shirt className="w-6 h-6 text-stone-700" />,
    Jewelry: <Gem className="w-6 h-6 text-stone-700" />,
    Accessories: <Package className="w-6 h-6 text-stone-700" />,
    'Home Decor': <Home className="w-6 h-6 text-stone-700" />,
    Footwear: <Footprints className="w-6 h-6 text-stone-700" />,
    Bags: <ShoppingBag className="w-6 h-6 text-stone-700" />,
  };
  return icons[category] || <ShoppingBag className="w-6 h-6 text-stone-700" />;
}