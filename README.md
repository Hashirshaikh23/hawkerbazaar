# SheMarket - Bombay's Favorite Markets Online

A marketplace platform connecting local women-led shops from Bombay's iconic markets (Hill Road, Colaba Causeway, Linking Road) with customers online.

## Features

### For Shoppers
- Browse products by category and market location
- Product search and filtering
- Shopping cart and checkout
- Multiple payment options (UPI, Card, COD)
- Order tracking
- Phone OTP authentication

### For Vendors
- Vendor onboarding and signup
- Product management dashboard
- Order processing
- Payout reporting

### For Admins
- Vendor approval system
- Order oversight
- Analytics dashboard
- Commission management

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
shemarket/
├── src/
│   ├── components/       # React components
│   │   ├── figma/       # Figma-specific components
│   │   └── ui/          # Reusable UI components
│   ├── lib/             # Utilities and mock data
│   ├── styles/          # Global styles
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── index.html           # HTML template
```

## Design System

- **Color Palette**: Stone (neutral) + Emerald (accent)
- **Typography**: System font stack with refined hierarchy
- **Border Radius**: Rounded corners (rounded-2xl, rounded-xl)
- **Shadows**: Subtle, layered shadows
- **Textures**: Grainy gradients for depth

## Current Status

This is a fully functional frontend prototype with:
- ✅ Complete UI for all user types (Shopper, Vendor, Admin)
- ✅ Mock data for demonstration
- ✅ Responsive design
- ⏳ Backend integration (not implemented)

## Future Enhancements

- Backend API integration
- Real authentication system
- Payment gateway integration
- Database persistence
- Image upload functionality
- Real-time order updates

## License

This project is private and proprietary.
