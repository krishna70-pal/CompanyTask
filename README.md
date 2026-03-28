# FlipMini — Mini E-Commerce Product Management App

A clean, modern e-commerce product management application inspired by Flipkart's UI. Built with **React + TypeScript + Vite** as a technical assignment.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)

---

## ✨ Features

- **Product Listing** — Responsive grid of products fetched from API
- **Product Details** — Full product info with image, price, and description
- **CRUD Operations** — Add, Edit, and Delete products (managed in local state)
- **Shopping Cart** — Add/remove items, view total price
- **Dark / Light Mode** — Toggle theme with preference persistence
- **Image Lazy Loading** — IntersectionObserver-based loading with shimmer placeholder
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Loading & Error States** — Skeleton loaders and error handling
- **Accessibility** — Semantic HTML, ARIA labels, proper alt text
- **Unit Tests** — 3 key tests using Vitest + Testing Library

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite 8 | Build Tool / Dev Server |
| React Router DOM | Client-side Routing |
| Vitest | Unit Testing |
| @testing-library/react | Component Testing |
| CSS3 | Styling (No frameworks) |

---

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar with cart badge & theme toggle
│   ├── ProductCard.tsx # Product grid card
│   ├── ProductForm.tsx # Reusable add/edit form
│   └── LazyImage.tsx   # Lazy loaded image with placeholder
├── context/            # React Context providers
│   ├── ProductContext.tsx  # Product state & CRUD
│   ├── CartContext.tsx     # Cart state
│   └── ThemeContext.tsx    # Dark/light theme
├── pages/              # Route pages
│   ├── ProductList.tsx    # Home — product grid
│   ├── ProductDetail.tsx  # Single product view
│   ├── AddProduct.tsx     # Add new product form
│   ├── EditProduct.tsx    # Edit existing product form
│   └── CartPage.tsx       # Shopping cart
├── services/
│   └── api.ts          # API calls to dummyjson.com
├── test/               # Test files
│   ├── setup.ts
│   ├── ProductList.test.tsx
│   ├── AddToCart.test.tsx
│   └── DeleteProduct.test.tsx
├── types/
│   └── index.ts        # TypeScript interfaces
├── App.tsx             # Root component with routing
├── main.tsx            # Entry point
└── index.css           # Global styles & design system
```

---

## 🚀 Setup & Run

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd flipkart-mini-ecommerce

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Other Commands

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 API Used

**[DummyJSON Products API](https://dummyjson.com/products)**

| API Field | Mapped To |
|---|---|
| `id` | `id` |
| `title` | `name` |
| `price` | `price` |
| `description` | `description` |
| `thumbnail` | `image` |

> **Note:** The API is read-only. All CRUD operations (Add, Edit, Delete) are managed entirely in local React state and won't persist across page refreshes.

---

## 📱 Routes

| Path | Page |
|---|---|
| `/` | Product List (Home) |
| `/product/:id` | Product Detail |
| `/add` | Add New Product |
| `/edit/:id` | Edit Product |
| `/cart` | Shopping Cart |

---

## ⚠️ Limitations

1. **No Backend Persistence** — CRUD operations use local state only (API is read-only). Data resets on page refresh.
2. **No Authentication** — No user login/signup implemented.
3. **No Payment Gateway** — "Checkout" button is a placeholder.
4. **No Search/Filter** — Products are displayed as-is from the API.
5. **Limited Product Images** — Only uses `thumbnail` from the API, not the full gallery.

---

## 🧪 Tests

Three tests are included:

1. **Product List Renders** — Verifies products load and display correctly
2. **Add to Cart Works** — Tests clicking "Add to Cart" increases cart count
3. **Delete Product Works** — Tests the confirmation dialog and deletion flow

Run with: `npm test`

---

## 📄 License

This project is for educational/assignment purposes only.
