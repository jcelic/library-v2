# Library

A personal library app for keeping track of the books you own, the ones you
want to read, your favorites and your own shelves.

**Live demo:** [library-v2-jc22.vercel.app](https://library-v2-jc22.vercel.app)
— create an account to try it out. Any email works, no verification needed.

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
- Rate limiting for login and sign up with Upstash Redis
- Adding books in a modal form, with duplicate detection and toast
  notifications

## Planned

- Books: list, edit, delete, search, filters, favorites and reading status
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
- Upstash Redis
- Zod
- React Hook Form
- argon2
- zxcvbn-ts

## Project structure

```text
src/
├── app/
│   ├── (app)/
│   │   ├── books/
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
│   ├── books/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── auth/
│   ├── validations/
│   ├── db.ts
│   ├── env.ts
│   ├── format.ts
│   ├── navigation.ts
│   ├── password-strength.ts
│   ├── rate-limit.ts
│   └── request.ts
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
strings. Then create a free [Upstash](https://upstash.com) Redis database and
copy its REST URL and token.

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` – the pooled connection string, used by the app
- `DIRECT_URL` – the direct connection string, used by migrations
- `UPSTASH_REDIS_REST_URL` – the Redis REST URL, used for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` – the Redis REST token

Create the database tables:

```bash
npm run db:migrate
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000/signup` and create an account.
