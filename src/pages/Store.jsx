import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import ProductCard3D from '../components/store/ProductCard3D';
import Cart from '../components/customer/Cart';
import StoreSidebar from '../components/store/StoreSidebar';
import { Link } from "react-router-dom";
import { useCartStore } from '../store/useCartStore';
import { useHeaderStore } from '../store/useHeaderStore';
import { useProductStore } from '../store/useProductStore';

import api from '../services/api';

const fetchProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

const StoreSearchBar = () => {
  const { searchQuery, setSearchQuery } = useProductStore();

  return (
    <div className="relative hidden md:block w-64 lg:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-secondary/50 border border-border rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
    </div>
  );
};

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New Filter States
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [activeGender, setActiveGender] = useState(null);
  const [activeAgeGroup, setActiveAgeGroup] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Header Search Injection
  const { setCustomContent } = useHeaderStore();
  const { searchQuery, setSearchQuery } = useProductStore();

  useEffect(() => {
    // Reset search on mount
    setSearchQuery("");
    // Inject search bar
    setCustomContent(<StoreSearchBar />);

    // Cleanup on unmount
    return () => {
      setCustomContent(null);
      setSearchQuery("");
    };
  }, [setCustomContent, setSearchQuery]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { items, setIsOpen } = useCartStore();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesColor = !activeColor || (product.colors && product.colors.includes(activeColor));
      const matchesSize = !activeSize || (product.sizes && product.sizes.includes(activeSize));
      const matchesGender = !activeGender || product.gender === activeGender || product.gender === "Unisex";
      const matchesAge = !activeAgeGroup || product.ageGroup === activeAgeGroup;
      const matchesStock = !inStockOnly || product.inStock;

      return matchesCategory && matchesPrice && matchesSearch &&
        matchesColor && matchesSize && matchesGender && matchesAge && matchesStock;
    });
  }, [products, activeCategory, priceRange, searchQuery, activeColor, activeSize, activeGender, activeAgeGroup, inStockOnly]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">

      <div className="pb-12 px-2 lg:px-4 max-w-[1800px] mx-auto flex gap-6">
        {/* Sidebar */}
        <StoreSidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
          activeSize={activeSize}
          setActiveSize={setActiveSize}
          activeGender={activeGender}
          setActiveGender={setActiveGender}
          activeAgeGroup={activeAgeGroup}
          setActiveAgeGroup={setActiveAgeGroup}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {/* Mobile Search (visible only on small screens) */}
          <div className="md:hidden mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-3xl bg-neutral-900 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-xl">No artifacts found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                      setPriceRange([0, 5000]);
                      setActiveColor(null);
                      setActiveSize(null);
                      setActiveGender(null);
                      setActiveAgeGroup(null);
                      setInStockOnly(false);
                    }}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-4 gap-x-4">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      layout
                    >
                      <ProductCard3D {...product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div >
  );
}
