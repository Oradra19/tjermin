# Tjermin Product Catalog

A modern product catalog application built with Next.js App Router. It fetches product data from Fake Store API and includes filtering, search, product detail pages, and a shopping cart that remains available after a browser refresh.

## Technologies Used

- Next.js 16 with App Router
- React 19
- JavaScript and Tailwind CSS
- TanStack Query for API data fetching and caching
- Axios as the HTTP client
- Redux Toolkit for cart state management
- Redux Persist for browser cart persistence
- Framer Motion for micro-interactions and toast feedback
- Lucide React for icons
- Fake Store API as the product data source

## Features

- Responsive product catalog with grid and list views.
- Product search with a 300 ms debounce.
- Category and price filters.
- Product sorting by price and alphabetically.
- Client-side pagination: initially displays 9 products, with a *See more products* button.
- Empty state for searches or filters with no results.
- Product detail page with a quantity selector, wishlist UI, and related products.
- Cart drawer with quantity controls, item removal, and live total calculation.
- Persistent cart state after browser refresh.
- Toast feedback when an item is added to the cart.

## Installation

Make sure Node.js 18.18 or newer is installed.

```bash
git clone https://github.com/Oradra19/tjermin.git
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create and run a production build:

```bash
npm run build
npm run start
```

## Hero Image

The Hero component reads its image from the `public` directory. Place your preferred image at:

```text
public/hero.webp
```

## API

Product data is provided by [Fake Store API](https://fakestoreapi.com/).

```text
GET https://fakestoreapi.com/products
GET https://fakestoreapi.com/products/:id
```

All API requests are defined in `src/services/product.service.js` and consumed through TanStack Query hooks rather than being fetched directly in UI components.

## Main Project Structure

```text
src/
├── app/                 # App Router routes
├── components/
│   ├── layout/           # Navbar, Footer, CartDrawer, Container
│   ├── sections/         # Hero and Newsletter
│   └── ui/               # EmptyState, Rating, QuantitySelector
├── features/
│   ├── cart/             # Redux cart slice
│   └── products/         # Catalog, product card, and product detail
├── hooks/                # useDebounce
├── services/             # Axios client and product service
└── store/                # Redux store and providers
```

## Cart Persistence and Next.js Hydration

Redux Persist stores the cart in `localStorage`, but `localStorage` is only available in the browser. Because Next.js can render the initial page on the server, accessing persisted state too early could cause the server HTML to differ from the browser HTML, resulting in a hydration mismatch.

This project prevents that issue as follows:

1. The Redux, TanStack Query, and Redux Persist providers are placed in `src/store/Providers.jsx`, which uses the `"use client"` directive.
2. The store uses `redux-persist/lib/storage`, which is only accessed on the client through that provider.
3. `PersistGate` delays rendering UI that relies on persisted state until rehydration from `localStorage` has finished.

This approach prevents browser-persisted cart data from being rendered before React reaches the client, keeping the cart persistent without hydration warnings or server-client markup differences.
