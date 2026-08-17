import React from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { CartProvider } from '@/lib/CartContext';

export default function Layout() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-cream">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}