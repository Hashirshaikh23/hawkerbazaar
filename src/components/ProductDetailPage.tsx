import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart, Store, ArrowLeft, Minus, Plus, MapPin, ShieldCheck } from 'lucide-react';
import { products } from '../lib/mockData';
import { CartItem } from '../App';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

export function ProductDetailPage({ addToCart }: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-stone-900 mb-4">Product not found</h2>
        <Link to="/products">
          <Button className="bg-emerald-700 hover:bg-emerald-800">Browse Products</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        vendorName: product.vendorName,
      });
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-lg shadow-stone-900/5">
            <ImageWithFallback
              src={product.images?.[0] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Vendor Info */}
          <div className="bg-stone-50 rounded-xl p-4 mb-6 border border-stone-200">
            <div className="flex items-center gap-2 text-stone-900 mb-1">
              <Store className="w-4 h-4" />
              <span className="font-medium">{product.vendorName}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{product.market}</span>
            </div>
          </div>

          <h1 className="text-stone-900 mb-6 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <p className="text-stone-900 font-semibold text-3xl">₹{product.price}</p>
            {product.originalPrice && (
              <>
                <p className="text-stone-400 line-through text-xl">₹{product.originalPrice}</p>
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium border border-emerald-200">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  OFF
                </span>
              </>
            )}
          </div>

          <div className="mb-8">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                product.inStock
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="mb-8">
            <h3 className="text-stone-900 mb-3 font-semibold">About This Product</h3>
            <p className="text-stone-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-sm font-medium border border-stone-200">
              {product.category}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <h3 className="text-stone-900 mb-3 font-semibold">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border-stone-300 hover:bg-stone-100 h-11 w-11"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-stone-900 font-semibold w-16 text-center text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="border-stone-300 hover:bg-stone-100 h-11 w-11"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="flex-1 h-12 border-stone-300 hover:bg-stone-50"
              disabled={!product.inStock}
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 h-12 shadow-lg shadow-emerald-700/20"
              disabled={!product.inStock}
              size="lg"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="mb-8">
            <h2 className="text-stone-900 mb-2">Similar Products</h2>
            <p className="text-stone-600">More items from the {product.category} collection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/products/${relatedProduct.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:border-stone-300 transition-all group"
              >
                <div className="aspect-square overflow-hidden bg-stone-50">
                  <ImageWithFallback
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-stone-500 text-xs font-medium mb-1 uppercase tracking-wide">{relatedProduct.vendorName}</p>
                  <h3 className="text-stone-900 mb-3 font-medium">{relatedProduct.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-stone-900 font-semibold">₹{relatedProduct.price}</p>
                    {relatedProduct.originalPrice && (
                      <p className="text-stone-400 line-through text-sm">
                        ₹{relatedProduct.originalPrice}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}