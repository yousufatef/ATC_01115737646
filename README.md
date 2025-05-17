# 🎟️ Event Booking System

A full-stack event booking platform that allows users to browse and book events, manage their bookings, and includes an integrated admin panel for event management. Built with the support of AI tools like ChatGPT and GitHub Copilot.

---

## 🛠 Tech Stack

### 🔧 Framework & Runtime
- **Next.js** `15.3.1` (App Router + TurboPack)
- **React** `19.0.0`
- **TypeScript** `^5`
- **Node.js** (for server runtime)

### 🎨 Styling & UI
- **Tailwind CSS** `^4`
- **tw-animate-css** – Animation utilities for Tailwind
- **next-themes** – Dark mode & light mode support
- **clsx** & **class-variance-authority** – Utility class merging
- **framer-motion** – Component animations
- **lucide-react** – Icon set
- **Radix UI** components:
  - `@radix-ui/react-dialog`, `popover`, `tooltip`, `select`, `slider`, etc.
- **Lottie** – For smooth, scalable animations to enhance user experience

### 📑 Forms & Validation
- **react-hook-form** – React form state manager
- **@hookform/resolvers** – Connects form validation with Zod
- **zod** – Schema validation

### 🔐 Authentication
- **@clerk/nextjs** – Authentication and user session management
- **@clerk/themes** – Customizable Clerk UI

### 📆 Date & Time
- **date-fns** – Date/time manipulation
- **react-datepicker** – Date picker UI

### 📤 Uploads & Files
- **uploadthing** & **@uploadthing/react** – File upload API + UI integration

### 🗃️ Database & Backend
- **mongoose** – ODM for MongoDB
- **svix** – Webhooks engine (Clerk integration)

### 🧰 Dev & Tooling
- **ESLint** `^9` – Linting and code style
- **@tailwindcss/postcss** – Tailwind/PostCSS integration
- **@types/** – TypeScript definitions for Node & React

---

## 📌 Features

### 👤 User Features
- Register & log in via Clerk
- View personal bookings
- View a detailed **User Profile**
- Book events with a single click
- View "Congratulations" screen after booking with engaging **Lottie animations**
- Search for events on the **Home Page**
- Grid/list view for event listings
- Dark mode and light mode toggle

### 🏠 Home Page
- Grid view of events with responsive layout
- Events with show details button
- Event details page if already booked by user display **"Booked"** label else **"Book Now"** button
- Search bar to filter events by name or category

### 🧾 Admin Panel (Role: Admin)
- Admin can:
  - **Manage Events** (Create, Read, Update, Delete)
  - **View All Users**
  - **View All Bookings**
- Admin panel is integrated within the same app
- Role-based route protection (User vs Admin)

### 🔁 API
- RESTful API with routes for:
  - Authentication
  - Event management
  - Booking management (replaces order management terminology)
  - User management (admin only)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm / yarn
- MongoDB (Atlas or local)

### Backend Setup

```bash
cd server
npm install
# .env configuration (example):
# MONGO_URI=your_mongo_url
# JWT_SECRET=your_jwt_secret
npm run dev
#
