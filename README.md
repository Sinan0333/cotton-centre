# The Cotton Centre - Fashion E-commerce

A mobile-first, light-mode only, full-stack fashion e-commerce application built with Next.js App Router, Tailwind CSS, Shadcn UI, and MongoDB.

## Features

- **Mobile First Design**: Prioritizes touch-friendly navigation, generous spacing, and compact grid layouts specifically aimed at the 95% mobile user base.
- **Product Catalog & Filters**: Browse products by category, size, color, or keyword using a mobile-friendly Slide-Up Drawer.
- **WhatsApp Integration**: High-visibility sticky CTA on product pages to directly contact via WhatsApp with pre-filled product details.
- **Admin Dashboard**: Minimalist, secure back-office for creating, reading, updating, and deleting (CRUD) products.
- **Image URL Strategy**: By default supports simple Image URL placeholders. Production integration with Cloudinary would utilize the same string arrays.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4, Shadcn/ui (Radix Primitives)
- **Database**: MongoDB with Mongoose
- **Icons**: Lucide React
- **Auth (Admin)**: Simple JWT cookie + Edge Middleware protection

## Getting Started

### 1. Environment Variables

Create a `.env.local` or `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net/cotton-center?retryWrites=true&w=majority

# Admin Authentication
ADMIN_PASSWORD=your_secure_password

# Authentication Secret (Used for signing JWT cookies)
JWT_SECRET=any_long_random_string

# Cloudinary (Optional - For future direct uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Database Seeding

To quickly populate the store with demo products (Men, Women, Kids), visit the following endpoint in your browser while the server is running:

`http://localhost:3000/api/seed`

*(Note: This deletes any existing products in the DB and restocks it with the defaults.)*

### 5. Access Admin Panel

Navigate to `http://localhost:3000/admin`. You will be redirected to `/admin/login`.
Enter the password matching the `ADMIN_PASSWORD` in your environment (default: `admin` if unset). 

## Architecture & Code Structure

- **/src/app/(shop)** - Public storefront pages (Home, Shop, Product Detail)
- **/src/app/admin** - Protected admin area
- **/src/app/api** - RESTful endpoints for CRUD and seeder
- **/src/components** - Reusable UI elements strictly styled for light theme
- **/src/lib** - Singleton MongoDB connection
- **/src/models** - Mongoose schemas
