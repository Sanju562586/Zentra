import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import ProductCard3D from '../components/store/ProductCard3D';
import Cart from '../components/customer/Cart';
import { Link } from "react-router-dom";
import { useCartStore } from '../store/useCartStore';

// Mock API if backend is missing
const fetchProducts = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  const baseProducts = [
    {
      id: 1,
      title: "Neon Cyber-Decks",
      price: 299,
      description: "Holographic interface with mechanical feedback.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 2,
      title: "Quantum Processor",
      price: 899,
      description: "Next-gen computing power for AI workloads.",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 3,
      title: "Neural Interface",
      price: 599,
      description: "Direct brain-computer connection kit.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 4,
      title: "Bot Assistant",
      price: 1200,
      description: "Autonomous helper droid for daily tasks.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  // Generate more products to fill grid
  const moreProducts = [
    { id: 5, title: "Holo-Visor", price: 150, description: "Augmented reality heads-up display.", image: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?auto=format&fit=crop&q=80&w=1000" },
    { id: 6, title: "Gravity Boots", price: 450, description: "Magnetic levitation footwear.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" },
    { id: 7, title: "Plasma Cutter", price: 700, description: "Industrial grade energy tool.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" },
    { id: 8, title: "Fusion Battery", price: 120, description: "Infinite power source.", image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&q=80&w=1000" },
    { id: 9, title: "Cyber-Pet", price: 2000, description: "Loyal robotic companion.", image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&q=80&w=1000" },
    { id: 10, title: "Neural Link", price: 5000, description: "Direct mind-to-cloud upload.", image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1000" },
  ];
  return [...baseProducts, ...moreProducts];
};

export default function Store() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { items, setIsOpen } = useCartStore();

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Header / Cart Trigger */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-background/90 to-transparent pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img
            src="/zentra-logo.png"
            alt="Zentra Store"
            className="h-10 w-auto mix-blend-multiply dark:invert dark:mix-blend-screen"
          />
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto relative p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all group"
        >
          <ShoppingBag className="w-6 h-6 text-white" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-xs flex items-center justify-center rounded-full font-bold">
              {items.length}
            </span>
          )}
        </button>
      </div>

      <Cart />

      <div className="container mx-auto px-4 py-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 rounded-3xl bg-neutral-900 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard3D {...product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}
