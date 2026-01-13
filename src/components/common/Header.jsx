import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import LoginModal from "../auth/LoginModal";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <header className="pointer-events-auto w-[95%] max-w-7xl rounded-full border border-border bg-background shadow-lg dark:bg-background/70 dark:backdrop-blur-md">
          <div className="px-6 h-14 flex items-center justify-between">
            <Link to="/" className="font-bold text-xl flex items-center gap-2">
              <img
                src="/zentra-logo.png"
                alt="Zentra Logo"
                className="h-10 w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
              />
            </Link>

            <nav className="flex items-center gap-6">
              <Link to="/store" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden md:block transition-colors">
                Store
              </Link>
              <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden md:block transition-colors">
                Dashboard
              </Link>
              <ThemeToggle />
              <Button size="sm" onClick={() => setShowLogin(true)} className="rounded-full">Login</Button>
            </nav>
          </div>
        </header>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
