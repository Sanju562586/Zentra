import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/common/Header";
import PageWrapper from "./components/common/PageWrapper";

// Lazy Load Pages
const Landing = lazy(() => import("./pages/Landing"));
const Store = lazy(() => import("./pages/Store"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const OrderStatus = lazy(() => import("./pages/OrderStatus"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyOrders = lazy(() => import("./pages/MyOrders"));

// Loading Component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-neutral-950 text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-neutral-400 text-sm animate-pulse">Loading Zentra...</p>
    </div>
  </div>
);

import { ThemeProvider } from "./components/common/ThemeProvider";
import Cart from "./components/customer/Cart";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Header />
        <Cart />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
            <Route path="/store" element={<PageWrapper><Store /></PageWrapper>} />
            <Route path="/store/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
            <Route path="/orders/:id" element={<PageWrapper><OrderStatus /></PageWrapper>} />
            <Route path="/my-orders" element={<PageWrapper><MyOrders /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><Dashboard /></PageWrapper>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
