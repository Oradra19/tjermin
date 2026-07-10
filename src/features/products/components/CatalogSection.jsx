"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Filter, Grid2X2, List, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProductCard, ProductSkeleton } from "./ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { EmptyState } from "@/components/ui/EmptyState";

const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];
const PAGE_SIZE = 9;

export function CatalogSection() {
  const { data: products, isLoading, isError, refetch } = useProducts();
  const [category, setCategory] = useState("All");
  const [priceLimit, setPriceLimit] = useState(1000);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedSearch]);

  const filteredProducts = useMemo(() => {
    const matches = (products ?? []).filter((product) => {
      const searchableText = `${product.title} ${product.category}`.toLowerCase();
      return (category === "All" || product.category === category) && product.price <= priceLimit && searchableText.includes(debouncedSearch.toLowerCase());
    });
    return matches.sort((first, second) => {
      if (sort === "price-low") return first.price - second.price;
      if (sort === "price-high") return second.price - first.price;
      if (sort === "name-asc") return first.title.localeCompare(second.title);
      if (sort === "name-desc") return second.title.localeCompare(first.title);
      return 0;
    });
  }, [products, category, priceLimit, debouncedSearch, sort]);

  const resetVisibleProducts = () => setVisibleCount(PAGE_SIZE);
  const resetFilters = () => {
    setCategory("All");
    setPriceLimit(1000);
    setSearch("");
    resetVisibleProducts();
  };
  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const filters = (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Filters</h2>
        <button onClick={resetFilters} className="text-xs text-navy"><RotateCcw size={14} className="mr-1 inline" />Reset</button>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-bold">Category</h3>
        <div className="space-y-3">
          {["All", ...categories].map((name) => (
            <label key={name} className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
              <input type="radio" checked={category === name} onChange={() => { setCategory(name); resetVisibleProducts(); }} className="accent-navy" />
              <span className="capitalize">{name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-4 flex justify-between text-sm font-bold"><span>Price range</span><span className="text-navy">Up to ${priceLimit === 1000 ? "Any" : priceLimit}</span></div>
        <input aria-label="Maximum price" type="range" min="10" max="1000" step="10" value={priceLimit} onChange={(event) => { setPriceLimit(Number(event.target.value)); resetVisibleProducts(); }} className="w-full accent-navy" />
      </div>
    </div>
  );

  return (
    <section id="catalog" className="py-16">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div><p className="text-sm font-semibold uppercase tracking-widest text-navy">The collection</p><h2 className="mt-2 text-3xl font-bold">Find your next favorite.</h2></div>
          <button onClick={() => setFilterOpen(true)} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium lg:hidden"><SlidersHorizontal size={17} />Filter</button>
        </div>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden rounded-2xl border border-slate-200 p-6 lg:block">{filters}</aside>
          <div>
            <div className="mb-5 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
              <label className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-navy" />
              </label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)} className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm outline-none focus:border-navy">
                    <option value="featured">Sort by: Featured</option>
                    <option value="price-low">Price: Low to high</option>
                    <option value="price-high">Price: High to low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
                <div className="flex rounded-xl border border-slate-200 p-1">
                  <button aria-label="Card view" onClick={() => setView("grid")} className={`rounded-lg p-1.5 ${view === "grid" ? "bg-navy text-white" : "text-slate-500"}`}><Grid2X2 size={17} /></button>
                  <button aria-label="List view" onClick={() => setView("list")} className={`rounded-lg p-1.5 ${view === "list" ? "bg-navy text-white" : "text-slate-500"}`}><List size={17} /></button>
                </div>
              </div>
            </div>
            <p className="mb-5 text-right text-sm text-muted">{isLoading ? "Loading items..." : `${filteredProducts.length} pieces available`}</p>
            {isError ? <div className="rounded-2xl bg-surface p-10 text-center"><p className="font-semibold">We could not load the collection.</p><button onClick={() => refetch()} className="mt-4 rounded-xl bg-navy px-5 py-2 text-sm text-white">Try again</button></div> : <>
              {isLoading ? <div className={`gap-6 ${view === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3" : "flex flex-col"}`}>{Array.from({ length: PAGE_SIZE }, (_, index) => <ProductSkeleton key={index} />)}</div> : displayedProducts.length === 0 ? <EmptyState onReset={resetFilters} /> : <div className={`gap-6 ${view === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3" : "flex flex-col"}`}>{displayedProducts.map((product) => <ProductCard key={product.id} product={product} variant={view} />)}</div>}
              {!isLoading && visibleCount < filteredProducts.length && <div className="mt-10 text-center"><button onClick={() => setVisibleCount((current) => current + PAGE_SIZE)} className="rounded-xl border border-navy px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white">See more products</button></div>}
            </>}
          </div>
        </div>
      </Container>
      {isFilterOpen && <div className="fixed inset-0 z-50 bg-slate-900/30 lg:hidden" onClick={() => setFilterOpen(false)}><aside className="h-full w-[86%] max-w-sm bg-white p-6" onClick={(event) => event.stopPropagation()}><div className="mb-8 flex justify-between"><span className="flex items-center gap-2 font-bold"><Filter size={18} />Filters</span><button aria-label="Close filters" onClick={() => setFilterOpen(false)}><X /></button></div>{filters}</aside></div>}
    </section>
  );
}
