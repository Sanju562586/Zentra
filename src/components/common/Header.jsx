import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import LoginModal from "../auth/LoginModal";

import { useAuthStore } from "@/store/useAuthStore";
import { useHeaderStore } from "@/store/useHeaderStore";
import { useCartStore } from "@/store/useCartStore";
import { User, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { customContent } = useHeaderStore();
  const { user, logout } = useAuthStore();
  const { items, setIsOpen } = useCartStore();

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <header className="pointer-events-auto w-[95%] max-w-7xl rounded-full border border-border bg-background shadow-lg dark:bg-background/70 dark:backdrop-blur-md transition-all duration-300">
          <div className="px-6 h-14 flex items-center justify-between gap-4">
            <Link to="/" className="font-bold text-xl flex items-center gap-2 shrink-0">
              <img
                src="/zentra-logo.png"
                alt="Zentra Logo"
                className="h-10 w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
              />
            </Link>

            {/* Spacer to keep nav right-aligned */}
            <div className="flex-1" />

            <nav className="flex items-center gap-4 shrink-0">
              {/* Dynamic Content (e.g. Search Bar) */}
              {customContent}

              <Link to="/store" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden md:block transition-colors">
                Store
              </Link>
              <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden md:block transition-colors">
                Dashboard
              </Link>

              {/* Cart Trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5 text-foreground" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
                    {items.length}
                  </span>
                )}
              </button>

              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {user ? (
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                        <User className="w-5 h-5 text-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem asChild>
                        <Link to="/my-orders" className="cursor-pointer">My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden md:block">
                  <Button size="sm" onClick={() => setShowLogin(true)} className="rounded-full">Login</Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </nav>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link
                to="/store"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-4 border-b hover:text-primary transition-colors"
              >
                Store
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-4 border-b hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <div className="p-4 border-b flex items-center justify-between">
                <span>Theme</span>
                <ThemeToggle />
              </div>
              {user && (
                <Link
                  to="/my-orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-4 border-b hover:text-primary transition-colors"
                >
                  My Orders
                </Link>
              )}
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-4 text-left text-red-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-4 text-left hover:text-primary transition-colors"
                >
                  Login
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
