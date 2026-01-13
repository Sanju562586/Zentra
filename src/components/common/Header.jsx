import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import LoginModal from "../auth/LoginModal";

import { useAuthStore } from "@/store/useAuthStore";
import { useHeaderStore } from "@/store/useHeaderStore";
import { useCartStore } from "@/store/useCartStore";
import { User, ShoppingBag } from "lucide-react";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
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

              <ThemeToggle />

              {user ? (
                <button onClick={logout} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors" title="Logout">
                  <User className="w-5 h-5 text-foreground" />
                </button>
              ) : (
                <Button size="sm" onClick={() => setShowLogin(true)} className="rounded-full">Login</Button>
              )}
            </nav>
          </div>
        </header>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
