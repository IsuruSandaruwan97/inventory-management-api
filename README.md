# 📦 Inventory Management System — API

A production-ready REST API built with **NestJS**, **TypeScript**, and **PostgreSQL** for managing product inventory across multiple operational stages — from stock intake to delivery and returns. Features role-based access control, full audit trails, and a clean modular architecture.

> 🔗 **Frontend Dashboard**: [inventory-management-dashboard](https://github.com/IsuruSandaruwan97/inventory-management-dashboard)

---

## ✨ Features

- **Multi-stage inventory tracking** — stock → store → delivery → returns
- **Role-based access control (RBAC)** — admin, manager, and staff roles with granular permissions
- **Product & category management** — full CRUD with stock level monitoring
- **Real-time stock updates** — track quantities across all warehouse stages
- **Audit logging** — complete history of every inventory movement
- **Secure authentication** — JWT-based auth with refresh tokens
- **Database migrations** — fully managed via Prisma ORM
- **API documentation** — Swagger UI available at `/api/docs`

---

## 🛠 Tech Stack

| Layer      | Technology       |
| ---------- | ---------------- |
| Framework  | NestJS (Node.js) |
| Language   | TypeScript       |
| Database   | PostgreSQL       |
| ORM        | Prisma           |
| Auth       | JWT + bcrypt     |
| Validation | class-validator  |
| Testing    | Jest             |
| CI/CD      | GitHub Actions   |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL 14+
- Yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/IsuruSandaruwan97/inventory-management-api.git
cd inventory-management-api

# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/inventory_db"
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev

# Seed initial data (optional)
npx prisma db seed
```

### Running the App

```bash
# Development mode (with hot reload)
yarn start:dev

# Production mode
yarn start:prod
```

### Running Tests

```bash
# Unit tests
yarn test

# End-to-end tests
yarn test:e2e

# Test coverage report
yarn test:cov
```

---

## 📁 Project Structure

```
src/
├── auth/               # Authentication & JWT guards
├── users/              # User management & roles
├── products/           # Product CRUD & categories
├── inventory/          # Stock tracking & movements
├── store/              # Store-level inventory
├── delivery/           # Delivery management
├── returns/            # Return processing
├── prisma/             # Prisma service & schema
└── common/             # Shared decorators, guards, filters
```

---

## 🔐 API Endpoints (Key Routes)

```
POST   /auth/login              # Login & receive JWT
POST   /auth/refresh            # Refresh access token

GET    /products                # List all products
POST   /products                # Create product (admin/manager)
PATCH  /products/:id            # Update product
DELETE /products/:id            # Delete product (admin only)

GET    /inventory               # Current stock levels
POST   /inventory/transfer      # Move stock between stages
GET    /inventory/movements     # Audit log of all movements

GET    /users                   # List users (admin only)
POST   /users                   # Create user with role
```

Full API documentation available via Swagger at `http://localhost:3000/api/docs`

---

## 👤 User Roles

| Role        | Permissions                                       |
| ----------- | ------------------------------------------------- |
| **Admin**   | Full access — users, products, inventory, reports |
| **Manager** | Products, inventory transfers, view reports       |
| **Staff**   | View inventory, process deliveries and returns    |

---

## 🧪 Test Coverage

```bash
yarn test:cov
```

---

## 🤝 Related Repository

- **Dashboard UI**: [inventory-management-dashboard](https://github.com/IsuruSandaruwan97/inventory-management-dashboard) — React + TypeScript frontend for this API

---

## 📄 License

MIT License — feel free to use this as a reference or starting point for your own projects.
