# DroneSoccer API

Backend REST API for the DroneSoccer platform — courses, lessons, applications, shop.

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js 5
- **Auth:** JWT (jsonwebtoken + bcryptjs)
- **Docs:** Swagger (OpenAPI 3.0)
- **Email:** Nodemailer (Gmail SMTP)
- **Payments:** Stripe (test mode)

## Quick Start

```bash
npm install
cp .env.example .env.local  # fill in your values
npm run dev                  # http://localhost:4000
```

## API Docs

Swagger UI: `http://localhost:4000/api/docs`

OpenAPI JSON: `http://localhost:4000/api/docs.json`

## Auth

```bash
# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dronesoccer.com","password":"admin123"}'

# Use token
curl http://localhost:4000/api/courses \
  -H "Authorization: Bearer <token>"
```

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | Public | Login, get JWT |
| GET | `/api/auth/session` | Bearer | Current user |
| GET | `/api/auth/verify-email` | Public | Email verification |
| GET/POST/PUT/DELETE | `/api/courses` | Public/Admin | Course CRUD |
| GET/POST/PUT/DELETE | `/api/lessons` | Public/Admin | Lesson CRUD |
| GET/POST/PUT/DELETE | `/api/products` | Public/Admin | Product CRUD |
| GET | `/api/purchases` | Bearer | User purchases |
| GET/PATCH | `/api/notifications` | Bearer | Notifications |
| POST | `/api/apply` | Public | Student application (multipart) |
| GET/POST/DELETE | `/api/admin/students` | Admin | Student management |
| GET | `/api/admin/stats` | Admin | Dashboard stats |
| GET/PUT | `/api/admin/intro-video` | Admin | Intro video config |

## Scripts

```bash
npm run dev    # Development (tsx watch)
npm run build  # Compile TypeScript
npm start      # Production (node dist/)
```
