export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  vendorName: string;
  vendorId: string;
  market: string;
  inStock: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'placed' | 'accepted' | 'packed' | 'shipped' | 'delivered';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
}

export interface Vendor {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  market: string;
  approved: boolean;
  commissionRate: number;
  totalSales: number;
  productsCount: number;
}

export const categories = [
  'All',
  'Clothing',
  'Jewelry',
  'Accessories',
  'Home Decor',
  'Footwear',
  'Bags',
];

export const markets = [
  'Hill Road, Bandra',
  'Colaba Causeway',
  'Linking Road, Bandra',
  'Fashion Street',
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Embroidered Cotton Kurti',
    price: 899,
    originalPrice: 1499,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1620505803018-0cfa73c18e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    images: [
      'https://images.unsplash.com/photo-1620505803018-0cfa73c18e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
    description: 'Beautiful hand-embroidered cotton kurti perfect for casual wear. Features intricate floral patterns and comfortable fit.',
    vendorName: "Priya's Boutique",
    vendorId: 'v1',
    market: 'Hill Road, Bandra',
    inStock: true,
  },
  {
    id: '2',
    name: 'Traditional Jhumka Earrings',
    price: 449,
    originalPrice: 699,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1760786933663-327c858d5434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    images: [
      'https://images.unsplash.com/photo-1760786933663-327c858d5434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
    description: 'Elegant oxidized silver jhumka earrings with traditional design. Perfect for ethnic outfits and special occasions.',
    vendorName: 'Meera Jewels',
    vendorId: 'v2',
    market: 'Colaba Causeway',
    inStock: true,
  },
  {
    id: '3',
    name: 'Colorful Bandhani Dupatta',
    price: 599,
    originalPrice: 999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1648396004864-f74eb58e8d90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    images: [
      'https://images.unsplash.com/photo-1648396004864-f74eb58e8d90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
    description: 'Vibrant bandhani dupatta with traditional tie-dye patterns. Made from pure cotton, perfect for adding color to any outfit.',
    vendorName: 'Saree Palace',
    vendorId: 'v3',
    market: 'Linking Road, Bandra',
    inStock: true,
  },
  {
    id: '4',
    name: 'Brass Wall Hanging',
    price: 1299,
    originalPrice: 1999,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1760192159044-881ce9629623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    images: [
      'https://images.unsplash.com/photo-1760192159044-881ce9629623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
    description: 'Handcrafted brass wall hanging featuring traditional Indian motifs. Adds an ethnic touch to your home decor.',
    vendorName: 'Craftswomen Collective',
    vendorId: 'v4',
    market: 'Colaba Causeway',
    inStock: true,
  },
  {
    id: '5',
    name: 'Embellished Potli Bag',
    price: 399,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1564422170194-896b89110ef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Beautiful embellished potli bag perfect for weddings and parties. Features intricate beadwork and drawstring closure.',
    vendorName: "Anjali's Creations",
    vendorId: 'v5',
    market: 'Hill Road, Bandra',
    inStock: true,
  },
  {
    id: '6',
    name: 'Block Print Cotton Saree',
    price: 1799,
    originalPrice: 2999,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Elegant block print cotton saree with traditional designs. Comfortable for all-day wear with beautiful drape.',
    vendorName: 'Saree Palace',
    vendorId: 'v3',
    market: 'Linking Road, Bandra',
    inStock: true,
  },
  {
    id: '7',
    name: 'Oxidized Silver Necklace',
    price: 799,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Statement oxidized silver necklace with traditional pendant. Perfect for ethnic and fusion wear.',
    vendorName: 'Meera Jewels',
    vendorId: 'v2',
    market: 'Colaba Causeway',
    inStock: true,
  },
  {
    id: '8',
    name: 'Embroidered Juttis',
    price: 699,
    originalPrice: 1199,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Comfortable embroidered juttis with traditional Indian designs. Perfect for ethnic wear and special occasions.',
    vendorName: 'Footwear Hub',
    vendorId: 'v6',
    market: 'Fashion Street',
    inStock: true,
  },
  {
    id: '9',
    name: 'Mandala Wall Art',
    price: 899,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Hand-painted mandala wall art on canvas. Adds a spiritual and artistic touch to any room.',
    vendorName: 'Craftswomen Collective',
    vendorId: 'v4',
    market: 'Colaba Causeway',
    inStock: true,
  },
  {
    id: '10',
    name: 'Beaded Clutch Purse',
    price: 549,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Elegant beaded clutch purse perfect for evening events. Features intricate beadwork and secure closure.',
    vendorName: "Anjali's Creations",
    vendorId: 'v5',
    market: 'Hill Road, Bandra',
    inStock: true,
  },
  {
    id: '11',
    name: 'Silk Palazzo Set',
    price: 1499,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1583391265902-e6d7e1365d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Comfortable silk palazzo set with matching kurta. Perfect for summer parties and festive occasions.',
    vendorName: "Priya's Boutique",
    vendorId: 'v1',
    market: 'Hill Road, Bandra',
    inStock: true,
  },
  {
    id: '12',
    name: 'Temple Jewelry Set',
    price: 1299,
    originalPrice: 1999,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Traditional temple jewelry set including necklace, earrings, and tikka. Perfect for weddings and special occasions.',
    vendorName: 'Meera Jewels',
    vendorId: 'v2',
    market: 'Colaba Causeway',
    inStock: true,
  },
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    date: '2025-11-15',
    total: 2197,
    status: 'delivered',
    items: [
      {
        id: '1',
        name: 'Embroidered Cotton Kurti',
        quantity: 1,
        price: 899,
        image: 'https://images.unsplash.com/photo-1620505803018-0cfa73c18e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      },
      {
        id: '4',
        name: 'Brass Wall Hanging',
        quantity: 1,
        price: 1299,
        image: 'https://images.unsplash.com/photo-1760192159044-881ce9629623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      },
    ],
    shippingAddress: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      address: 'Flat 302, Shanti Apartments, Carter Road',
      city: 'Mumbai',
      pincode: '400050',
    },
  },
  {
    id: 'ORD002',
    date: '2025-11-14',
    total: 1048,
    status: 'shipped',
    items: [
      {
        id: '2',
        name: 'Traditional Jhumka Earrings',
        quantity: 1,
        price: 449,
        image: 'https://images.unsplash.com/photo-1760786933663-327c858d5434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      },
      {
        id: '3',
        name: 'Colorful Bandhani Dupatta',
        quantity: 1,
        price: 599,
        image: 'https://images.unsplash.com/photo-1648396004864-f74eb58e8d90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      },
    ],
    shippingAddress: {
      name: 'Anjali Desai',
      phone: '+91 98765 43211',
      address: '15, Sea View Apartments, Marine Drive',
      city: 'Mumbai',
      pincode: '400002',
    },
  },
];

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: "Priya's Boutique",
    ownerName: 'Priya Shah',
    phone: '+91 98765 00001',
    market: 'Hill Road, Bandra',
    approved: true,
    commissionRate: 15,
    totalSales: 45000,
    productsCount: 23,
  },
  {
    id: 'v2',
    name: 'Meera Jewels',
    ownerName: 'Meera Kapoor',
    phone: '+91 98765 00002',
    market: 'Colaba Causeway',
    approved: true,
    commissionRate: 12,
    totalSales: 67000,
    productsCount: 45,
  },
  {
    id: 'v3',
    name: 'Saree Palace',
    ownerName: 'Sunita Desai',
    phone: '+91 98765 00003',
    market: 'Linking Road, Bandra',
    approved: true,
    commissionRate: 15,
    totalSales: 89000,
    productsCount: 56,
  },
  {
    id: 'v4',
    name: 'Craftswomen Collective',
    ownerName: 'Anjali Reddy',
    phone: '+91 98765 00004',
    market: 'Colaba Causeway',
    approved: true,
    commissionRate: 10,
    totalSales: 34000,
    productsCount: 18,
  },
  {
    id: 'v5',
    name: "Anjali's Creations",
    ownerName: 'Anjali Mehta',
    phone: '+91 98765 00005',
    market: 'Hill Road, Bandra',
    approved: true,
    commissionRate: 15,
    totalSales: 23000,
    productsCount: 12,
  },
  {
    id: 'v6',
    name: 'Footwear Hub',
    ownerName: 'Kavita Singh',
    phone: '+91 98765 00006',
    market: 'Fashion Street',
    approved: false,
    commissionRate: 15,
    totalSales: 0,
    productsCount: 8,
  },
];
