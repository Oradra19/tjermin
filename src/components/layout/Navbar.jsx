"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen } from "@/features/cart/cartSlice";
import { Container } from "./Container";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
  const dispatch = useDispatch();

  const count = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

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

            <a href="/#catalog" className="transition hover:text-navy">
              Inventory
            </a>

            <a href="/#about" className="transition hover:text-navy">
              Financing
            </a>

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
              aria-label="Open menu"
              className="rounded-full p-2 transition hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </Container>
      </header>

      <CartDrawer />
    </>
  );
}
