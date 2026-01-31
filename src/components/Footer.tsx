import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-16 gradient-grain">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <h3 className="text-emerald-400 font-semibold text-lg">HawkerBazaar</h3>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Bringing Bombay's vibrant street markets to your fingertips. Empowering local women entrepreneurs one sale at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-stone-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-stone-400 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/vendor/onboard" className="text-stone-400 hover:text-white transition-colors">
                  Become a Vendor
                </Link>
              </li>
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Our Markets</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>Hill Road, Bandra</li>
              <li>Colaba Causeway</li>
              <li>Linking Road, Bandra</li>
              <li>Fashion Street</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Get In Touch</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-stone-400">
                <Mail className="w-4 h-4" />
                support@hawkerbazaar.com
              </li>
              <li className="flex items-center gap-2 text-stone-400">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-stone-400">
                <MapPin className="w-4 h-4" />
                Mumbai, Maharashtra
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 text-center text-stone-500 text-sm">
          <p>© 2025 HawkerBazaar. Empowering women entrepreneurs across Bombay.</p>
        </div>
      </div>
    </footer>
  );
}