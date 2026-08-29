# StayNest 🏡✨ — Full-Stack Property Rental & Booking Platform

[![Live Application](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://frontend-ten-steel-42.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2d3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

**StayNest** is a commercial-grade, multi-vendor full-stack rental platform designed for property discovery, real-time date availability verification, host revenue analytics, and platform administration.

---

## 🚀 Live Demo & Repository
- 🌐 **Live Web Application**: [https://frontend-ten-steel-42.vercel.app](https://frontend-ten-steel-42.vercel.app/)
- 💻 **GitHub Repository**: [https://github.com/karandeepstack-droid/staynest-fullstack](https://github.com/karandeepstack-droid/staynest-fullstack)

---

## 🔑 Demo Credentials
To easily explore all perspectives of the platform without registering:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **👤 Guest** | `amit@example.com` | `password123` | Search properties, book stays, wishlist, write reviews |
| **🏡 Host** | `rahul@staynest.com` | `password123` | Host earnings analytics, monthly revenue charts, list property |
| **🛡️ Admin** | `admin@staynest.com` | `admin123` | Platform metrics, user & host accounts, 1-click user suspension |

*Note: You can also switch roles instantly using the top navigation bar switcher.*

---

## ✨ Features Overview

### 1. 👥 Role-Based Access Control (RBAC)
- **Guest Portal**: Search properties, filter by category (`Villas`, `Cabins`, `Luxury`, `Beach`, `Countryside`), real-time search query filtering, view photo galleries, reserve stays, track upcoming trips, and manage saved stays (❤️).
- **Host Platform**: View total host revenue, total reservations count, guest count metrics, interactive monthly revenue charts, and launch new properties via a 6-step builder wizard.
- **Admin Control Center**: Monitor platform growth metrics (total users, hosts, listings, bookings, and revenue) and enforce user moderation with 1-click account suspension/reactivation.

### 2. 🔐 Authentication & Session Persistence
- **Password Hashing**: User passwords hashed using `bcrypt` (10 rounds).
- **Signed JWT Tokens**: Secure JWT token generation (`expiresIn: 7d`) containing user identity and role claims.
- **Client Persistence**: Automatic token and user session restoration across page reloads via `localStorage`.

### 3. 📅 Database-Backed Booking Engine
- **Date Range Overlap Prevention**: Checks existing reservations in Prisma DB to block double-bookings (`checkIn < requestedEnd` AND `checkOut > requestedStart`). Returns error status `❌ These dates are unavailable`.
- **Dynamic Price Engine**: Dynamic calculation formula:
  $$\text{Total Price} = (\text{Price Per Night} \times \text{Nights}) + \text{Cleaning Fee} + \text{Service Fee}$$
- **Capacity Enforcement**: Ensures requested guest count does not exceed property max capacity (`maxGuests`).

### 4. ❤️ Wishlists & Star Rating Reviews
- **Wishlists**: Toggle properties to user wishlist with instant state updates.
- **Reviews & Ratings**: Submit guest reviews with star ratings, updating the property's average star rating in real time.

---

## 🛠️ Tech Stack & Architecture

### **Frontend Framework**
- **Next.js 14** (App Router & Serverless Functions)
- **React 18** (Client components, hooks & state management)
- **TypeScript 5** (Strict type safety across API contracts)
- **Tailwind CSS 3** (Custom design system with responsive layouts)
- **Lucide Icons** (UI iconography)

### **Backend & Database**
- **Node.js & Express** (RESTful API architecture)
- **Prisma ORM** (Database queries, migrations, and relationship management)
- **SQLite / PostgreSQL** (Relational data storage for Users, Properties, Bookings, Reviews, Wishlists)
- **JWT & bcryptjs** (Secure authentication and password security)

---

## 🏗️ Architecture & Project Structure

```
staynest/
├── frontend/                     # Next.js 14 App Router
│   ├── src/
│   │   ├── app/                  # App Router routes (/search, /property/[id], /guest, /host, /admin)
│   │   │   └── api/              # Serverless API route handlers
│   │   ├── components/           # Navbar, PropertyCard, CategoryFilter, AuthModal
│   │   └── context/              # AuthContext (JWT & state management)
│   └── package.json
└── backend/                      # Express & Prisma REST API
    ├── prisma/
    │   ├── schema.prisma         # Data models (User, Property, Booking, Review, Wishlist)
    │   └── seed.ts               # Database seed script
    ├── src/
    │   ├── lib/                  # Prisma singleton client
    │   ├── middleware/           # JWT authentication & role authorization
    │   ├── routes/               # REST API endpoints (Auth, Listings, Bookings, Host, Admin)
    │   └── services/             # Database service engine
    └── package.json
```

---

## 🔧 Environment Variables Setup

Create a `.env` file in the `frontend` and `backend` directories:

### **Frontend Environment Variables (`frontend/.env.local`)**
```env
NEXT_PUBLIC_API_URL=https://frontend-ten-steel-42.vercel.app
```

### **Backend Environment Variables (`backend/.env`)**
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="staynest-production-secret-key-2026"
PORT=5001
```

---

## 🚀 Local Installation & Setup Guide

### **Prerequisites**
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### **Step-by-Step Setup**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/karandeepstack-droid/staynest-fullstack.git
   cd staynest-fullstack
   ```

2. **Install Frontend & Backend Dependencies**:
   ```bash
   npm run install:all
   ```

3. **Database Migration & Seed**:
   ```bash
   cd backend
   npx prisma db push
   npx prisma db seed
   cd ..
   ```

4. **Run Local Development Servers**:
   ```bash
   npm run dev
   ```
   - **Frontend UI**: `http://localhost:3000`
   - **Backend API**: `http://localhost:5001`

---

## 📡 REST API Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account with role selection (`Guest` / `Host`) | Public |
| `POST` | `/api/auth/login` | Authenticate user credentials & return signed JWT token | Public |
| `GET` | `/api/auth/me` | Fetch active user profile from JWT token | Authenticated |
| `GET` | `/api/listings` | Fetch properties (supports `?category=` and `?search=`) | Public |
| `GET` | `/api/listings/:id` | Fetch detailed property specs, amenities & photo gallery | Public |
| `POST` | `/api/bookings` | Create new reservation with date availability verification | Authenticated |
| `GET` | `/api/bookings` | Fetch user's confirmed upcoming trips | Authenticated |
| `POST` | `/api/wishlist/toggle` | Save or remove property from user wishlist (❤️) | Authenticated |
| `POST` | `/api/reviews` | Submit guest review & recalculate property rating | Authenticated |
| `GET` | `/api/host/analytics` | Fetch host earnings metrics, monthly charts & reservations | Host / Admin |
| `GET` | `/api/admin/stats` | Fetch admin platform user, listing & revenue statistics | Admin |
| `POST` | `/api/admin/users/:id/suspend` | Suspend or reactivate user/host account | Admin |

---

## 🔮 Future Improvements Roadmap
- [ ] **Stripe / Razorpay Payment Gateway Integration**: Production credit card & UPI checkout processing.
- [ ] **Interactive Map Search**: Mapbox integration for geographic pin clustering.
- [ ] **Host Calendar Date Blocking**: Custom host calendar for blocking personal maintenance dates.
- [ ] **In-App Real-Time Chat**: Socket.io real-time messaging between guests and hosts.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.
