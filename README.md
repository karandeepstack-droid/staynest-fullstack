# StayNest 🏡✨ — Full-Stack Property Rental & Booking Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-14.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2d3748?logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**StayNest** is a commercial-grade, multi-vendor property rental platform designed to handle the complete discovery, booking, host property management, and platform administration lifecycle.

---

## 🌟 Key Features & Highlights

### 1. 👥 Multi-Role Support (Role-Based Access Control)
- **👤 Guest Portal**: Search properties, filter by category/price/amenities, view photo gallery, check real-time date availability, reserve stays, view upcoming trips, and manage wishlist items (❤️).
- **🏡 Host Platform**: Analytics dashboard with host earnings metric cards, monthly revenue bar charts, property management table, guest reservation approval workflow, and a 6-step property listing creation wizard.
- **🛡️ Admin Control Center**: Platform metrics, user & host accounts management, and instant 1-click user suspension/activation controls.
- **🎭 Freelancer Demo Switcher**: Instant top banner allowing potential clients inspecting the live demo to switch between Guest, Host, and Admin perspectives in 1 click.

### 2. 🧮 Business Logic & Calculation Engines
- **Dynamic Price Engine**: Real-time breakdown calculations:
  $$\text{Total Price} = (\text{Price Per Night} \times \text{Nights}) + \text{Cleaning Fee} + \text{Service Fee}$$
- **Date Range Overlap Prevention**: REST API checks date availability (`/api/bookings`) to prevent double-bookings.
- **Rating Computation**: Real-time average star rating calculation from guest reviews.

---

## 🏗️ Architecture & Monorepo Structure

```
staynest/
├── frontend/               # Next.js 14 App Router (React, TypeScript, Tailwind CSS)
│   ├── src/
│   │   ├── app/            # App Router pages (Home, Search, Property Details, Booking, Guest, Host, Admin)
│   │   ├── components/     # Navbar (Role Switcher), Hero, CategoryFilter, PropertyCard, AuthModal
│   │   └── context/        # AuthContext & State Management
│   └── package.json
└── backend/                # Node.js REST API (Express, TypeScript, Prisma ORM, JWT, bcryptjs)
    ├── prisma/
    │   └── schema.prisma   # Data models (User, Property, PropertyImage, Amenity, Booking, Review, Wishlist)
    ├── src/
    │   ├── index.ts        # Express REST API Server
    │   ├── middleware/     # JWT Token & Role verification middleware (authenticateToken, requireRole)
    │   └── routes/         # Auth, Properties, Bookings, Host, Reviews, Wishlist, Admin routes
    └── package.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Running Dev Servers

1. **Clone Repository**:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/staynest-fullstack.git
   cd staynest-fullstack
   ```

2. **Install All Dependencies**:
   ```bash
   npm run install:all
   ```

3. **Start Development Servers**:
   ```bash
   npm run dev
   ```
   - **Frontend Application**: `http://localhost:3000`
   - **Backend REST API**: `http://localhost:5001`

---

## 📡 Backend API Endpoints Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account with role selection (`Guest` / `Host`) | Public |
| `POST` | `/api/auth/login` | Authenticate user & return signed JWT token | Public |
| `GET` | `/api/auth/me` | Fetch active user profile from JWT token | Authenticated |
| `GET` | `/api/listings` | Fetch property listings (supports `?category=` & `?search=`) | Public |
| `GET` | `/api/listings/:id` | Fetch detailed property specs & photo gallery | Public |
| `POST` | `/api/bookings` | Create new reservation with date availability verification | Authenticated |
| `GET` | `/api/host/analytics` | Fetch host statistics, monthly revenue data & reservations | Host / Admin |
| `POST` | `/api/reviews` | Submit guest review & recalculate property rating | Authenticated |
| `GET` | `/api/admin/stats` | Fetch admin platform stats & revenue metrics | Admin |
| `POST` | `/api/admin/users/:id/suspend` | Suspend or reactivate user/host account | Admin |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
