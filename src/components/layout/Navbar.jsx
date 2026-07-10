"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Menu, User, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen } from "@/features/cart/cartSlice";
import { Container } from "./Container";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const count = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <Container className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-navy"
          >
            TJERMIN
          </Link>

          {/* Navigation */}
          <nav className="hidden gap-8 text-sm font-medium text-slate-500 lg:flex">
            <Link className="transition hover:text-navy" href="/">
              Home
            </Link>

            <Link href="/#catalog" className="transition hover:text-navy">
              Inventory
            </Link>

            <Link href="/#about" className="transition hover:text-navy">
              Financing
            </Link>

            <a href="#footer" className="transition hover:text-navy">
              Contact
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Profile */}
            <button
              aria-label="Profile"
              className="rounded-full p-2 text-navy transition hover:bg-slate-100"
            >
              <User size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={() => dispatch(setCartOpen(true))}
              aria-label="Open cart"
              className="relative rounded-full p-2 text-navy transition hover:bg-slate-100"
            >
              <ShoppingCart size={21} />

              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              className="rounded-full p-2 transition hover:bg-slate-100 lg:hidden"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-x-0 bottom-0 top-20 z-30 bg-slate-900/30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          >
            <motion.nav
              aria-label="Mobile navigation"
              className="border-b border-slate-200 bg-white px-6 py-6 shadow-lg"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2">
                <Link className="rounded-lg px-4 py-3 font-medium text-navy hover:bg-slate-100" href="/" onClick={closeMobileMenu}>
                  Home
                </Link>
                <Link className="rounded-lg px-4 py-3 font-medium text-navy hover:bg-slate-100" href="/#catalog" onClick={closeMobileMenu}>
                  Inventory
                </Link>
                <Link className="rounded-lg px-4 py-3 font-medium text-navy hover:bg-slate-100" href="/#about" onClick={closeMobileMenu}>
                  Financing
                </Link>
                <a className="rounded-lg px-4 py-3 font-medium text-navy hover:bg-slate-100" href="#footer" onClick={closeMobileMenu}>
                  Contact
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
