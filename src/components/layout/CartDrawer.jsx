"use client";
import { Minus, Plus, X, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setCartOpen, updateQuantity } from "@/features/cart/cartSlice";
export function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/30"
      onClick={() => dispatch(setCartOpen(false))}
    >
      <aside
        className="ml-auto flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Your bag</h2>
          <button
            aria-label="Close cart"
            onClick={() => dispatch(setCartOpen(false))}
          >
            <X />
          </button>
        </div>
        <div className="mt-8 flex-1 space-y-5 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-muted">
              Your bag is waiting for something special.
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-xl bg-surface p-2">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold">
                    {item.title}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
  <div className="flex items-center rounded-lg border border-slate-200">
    <button aria-label={`Decrease ${item.title} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))} className="p-1.5 text-slate-500 hover:text-navy"><Minus size={14} /></button>
    <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
    <button aria-label={`Increase ${item.title} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))} className="p-1.5 text-slate-500 hover:text-navy"><Plus size={14} /></button>
  </div>
  <p className="text-sm font-semibold text-navy">${(item.price * item.quantity).toFixed(2)}</p>
</div>
                </div>
                <button
                  aria-label="Remove item"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="h-fit text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-slate-200 pt-5">
          <div className="mb-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full rounded-xl bg-navy py-3 font-medium text-white transition hover:bg-[#1D355D]">
            Checkout securely
          </button>
        </div>
      </aside>
    </div>
  );
}
