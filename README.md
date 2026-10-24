# Library

A personal library app for keeping track of the books you own, the ones you
want to read, your favorites and your own shelves.

This is a rewrite of my earlier [library-app](https://github.com/jcelic/library-app).
The first version used a demo user and a separate Express backend; this one is
a full-stack Next.js app with real accounts and custom authentication.

## Implemented

- Sign up with validation on the client and the server
- Login with a generic error message that doesn't reveal which accounts exist
- Password hashing with Argon2id
- Password strength meter and rejection of weak passwords
- Database sessions with an HTTP-only cookie
- Responsive login and sign up pages
- Logout and protected pages
- App layout with a sidebar on desktop, and a header with a user menu and
  bottom navigation on mobile
- CI with GitHub Actions: lint, type check, formatting and build

## Planned

- Rate limiting for login and sign up
- Books: add, edit, delete, search, filters, favorites and reading status
- Wishlist and custom shelves
- Email verification and password reset
- Tests

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Neon (serverless Postgres)
- Prisma 7
- Zod
- React Hook Form
- argon2
- zxcvbn-ts

## Project structure

```text
src/
├── app/
│   ├── (app)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── globals.css
│   ├── icon.svg
│   └── layout.tsx
├── components/
│   ├── auth/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── auth/
│   ├── validations/
│   ├── db.ts
│   ├── env.ts
│   ├── format.ts
│   ├── navigation.ts
│   └── password-strength.ts
└── proxy.ts
prisma/
├── migrations/
└── schema.prisma
```

## Development

Install dependencies:

```bash
npm install
```

Create a free [Neon](https://neon.tech) project and copy its connection
strings.

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` – the pooled connection string, used by the app
- `DIRECT_URL` – the direct connection string, used by migrations

Create the database tables:

```bash
npm run db:migrate
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000/signup` and create an account.
