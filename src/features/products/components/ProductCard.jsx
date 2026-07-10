"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { Rating } from "@/components/ui/Rating";
export function ProductCard({ product, variant = "grid" }) {
  const dispatch = useDispatch();
  const isList = variant === "list";
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ product }));
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className={`group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl ${isList ? "flex flex-col sm:flex-row" : ""}`}
    >
      <Link href={`/products/${product.id}`} className={isList ? "flex min-w-0 flex-1 flex-col sm:flex-row" : "block"}>
        <div className={`relative overflow-hidden bg-surface p-8 ${isList ? "h-56 shrink-0 sm:h-auto sm:w-56" : "h-72"}`}>
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy shadow-sm">
            Premium
          </span>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain transition duration-500 group-hover:scale-110"
          />
        </div>
        <div className={`min-w-0 p-5 ${isList ? "flex flex-1 flex-col" : ""}`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-navy">
            {product.category}
          </p>
          <h3 className="mt-2 line-clamp-1 font-bold">{product.title}</h3>
          <p className={`mt-2 text-sm leading-6 text-muted ${isList ? "line-clamp-3" : "line-clamp-2"}`}>
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-ink">
              ${product.price.toFixed(2)}
            </span>
            <Rating value={product.rating.rate} />
          </div>
        </div>
      </Link>
      <div className={`flex gap-3 px-5 pb-5 ${isList ? "sm:items-center sm:pr-5 sm:pt-5" : ""}`}>
        <Link
          href={`/products/${product.id}`}
          className="flex-1 rounded-xl border border-navy py-2.5 text-center text-sm font-medium text-navy transition hover:bg-navy hover:text-white"
        >
          View product
        </Link>
        <motion.button
          type="button"
          aria-label={`Add ${product.title} to cart`}
          onClick={handleAddToCart}
          animate={isAdded ? { scale: [1, 1.16, 1], rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.45 }}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition ${isAdded ? "bg-emerald-500" : "bg-navy hover:bg-[#1D355D]"}`}
        >
          {isAdded ? <Check size={18} /> : <ShoppingCart size={16} />}
        </motion.button>
      </div>
      <AnimatePresence>
        {isAdded && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
          >
            <Check size={17} className="text-emerald-400" />
            Added to cart
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
export function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-100">
      <div className="h-72 bg-slate-100" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 rounded bg-slate-100" />
        <div className="h-5 rounded bg-slate-100" />
        <div className="h-3 w-5/6 rounded bg-slate-100" />
        <div className="h-10 rounded bg-slate-100" />
      </div>
    </div>
  );
}
