import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, User as UserIcon } from 'lucide-react';
import { User } from '../App';
import { toast } from 'sonner';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    // Mock OTP sending
    toast.success('OTP sent to ' + phone);
    setStep('otp');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      toast.error('Please enter valid OTP');
      return;
    }
    // Mock OTP verification
    const user: User = {
      id: '1',
      name: 'Guest User',
      phone: phone,
      role: 'customer',
    };
    onSuccess(user);
    toast.success('Login successful!');
  };

  const handleGuestCheckout = () => {
    const user: User = {
      id: 'guest',
      name: 'Guest',
      phone: '',
      role: 'customer',
    };
    onSuccess(user);
    toast.success('Continuing as guest');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative border border-stone-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-stone-700 to-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-4 gradient-grain">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-stone-900 mb-2 font-semibold">
            {step === 'phone' ? 'Welcome to HawkerBazaar' : 'Verify OTP'}
          </h2>
          <p className="text-stone-600 text-sm">
            {step === 'phone'
              ? 'Enter your phone number to continue'
              : `Enter the OTP sent to ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 h-11 shadow-lg shadow-stone-900/10"
            >
              Send OTP
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-stone-500">OR</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-stone-300 hover:bg-stone-50"
              onClick={handleGuestCheckout}
            >
              Continue as Guest
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center tracking-widest text-lg"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 h-11 shadow-lg shadow-stone-900/10"
            >
              Verify & Login
            </Button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-stone-700 hover:text-stone-900 text-sm font-medium"
            >
              Change phone number
            </button>

            <button
              type="button"
              onClick={() => toast.success('OTP resent!')}
              className="w-full text-center text-stone-600 hover:text-stone-800 text-sm"
            >
              Resend OTP
            </button>
          </form>
        )}

        <p className="text-stone-500 text-xs text-center mt-6 leading-relaxed">
          By continuing, you agree to HawkerBazaar's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}