# AGENT.md

## Project

Build a modern shopping catalog application using Next.js App Router based on the provided UI design.

Reference API

https://fakestoreapi.com/docs#tag/Products

The application consists of two pages:

- Product Catalog
- Product Detail

The implementation should closely match the provided design while maintaining clean architecture and reusable components.

---

# Tech Stack

Required

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Redux Toolkit
- Redux Persist
- Axios

Optional

- clsx
- lucide-react
- framer-motion
- react-hook-form

---

# Architecture

Use Feature Based Structure.

src/
    app/
    components/
    features/
        products/
        cart/
    services/
    hooks/
    store/
    lib/
    types/
    utils/

Do not place everything inside components.

---

# API Rules

Use Fake Store API.

Catalog

GET /products

Detail

GET /products/:id

Never fetch directly inside components.

Always use

services/product.service.ts

---

# Data Fetching

Always use TanStack Query.

Catalog

useQuery

Product Detail

useQuery

Do not use useEffect for fetching.

---

# State Management

Redux Toolkit is only used for:

- Cart
- Wishlist (optional)
- UI State

Persist cart using Redux Persist.

Cart must survive page refresh.

---

# Component Rules

Every UI must be reusable.

Examples

Button

Input

Navbar

Footer

Hero

ProductCard

ProductGrid

ProductImageGallery

FilterSidebar

ProductInfo

Badge

Price

Rating

LoadingSkeleton

Newsletter

Do not create duplicated components.

---

# Styling Rules

Use Tailwind CSS.

Never use inline CSS.

Never use CSS modules.

Use utility classes.

Spacing must follow an 8px system.

---

# Responsive

Support

Desktop

Tablet

Mobile

Breakpoints

sm

md

lg

xl

Sidebar becomes Drawer on mobile.

Product Grid changes

Desktop

3 columns

Tablet

2 columns

Mobile

1 column

---

# Animations

Use Framer Motion.

Required

Fade In

Card Hover

Button Hover

Page Transition

Loading Skeleton

Image Fade

Do not over animate.

Animations should feel subtle.

---

# Product Card

Must include

Image

Category

Title

Rating

Price

View Button

Hover Animation

Shadow

Rounded Corner

---

# Product Detail

Must include

Image Gallery

Product Name

Description

Price

Category

Rating

Quantity Selector

Wishlist Button

Add To Cart Button

Additional Information

Suggested Products

---

# Loading State

Every API request must have skeleton loading.

Never show blank page.

---

# Error State

Provide proper error UI.

Retry button.

---

# Performance

Use Next Image.

Lazy load images.

Memoize heavy components.

Avoid unnecessary rerenders.

---

# Accessibility

Buttons have aria-label.

Images have alt.

Keyboard accessible.

Proper heading hierarchy.

---

# Code Style

Use functional components.

Avoid any.

Use interfaces.

Keep components under 200 lines.

Extract reusable logic into hooks.

---

# Naming Convention

PascalCase

ProductCard.tsx

camelCase

getProducts

kebab-case

product-card

---

# Git Commit

feat:

fix:

refactor:

style:

docs:

---

# Definition of Done

✔ Responsive

✔ API Connected

✔ Skeleton Loading

✔ Persistent Cart

✔ Reusable Components

✔ Pixel Close to Design

✔ Clean Architecture

✔ Production Ready