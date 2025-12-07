This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Geist, a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- Next.js Documentation – learn about Next.js features and API.
- Learn Next.js – an interactive Next.js tutorial.

You can check out the Next.js GitHub repository – your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the Next.js deployment documentation for more details.

## Features Added Today

### ✔ Unit Testing Setup (Jest + React Testing Library + Bun)

- Added mocks for Next.js `Image` component
- Fixed issues with label/input accessibility
- Ensured consistent test environment when using Bun (`bun test`)
- Added full test coverage for:

  - ProductList component
  - PaymentModal component (input updates, purchase flow, change display)

### ✔ Improved Type Safety

- Fixed `ProductWithStock` type issues by ensuring `image_url` is always `string | undefined` (no `null`)
- Adjusted test mocks to satisfy strict TypeScript definitions

### ✔ Docker & Deployment

- Added an optimized `.dockerignore` for Next.js
- Cleaned up build context to reduce image size
- Prepared project structure for deployment using Docker Desktop or Kubernetes

### ✔ Development Workflow

- Supports multiple package managers (`npm`, `yarn`, `pnpm`, `bun`)
- Bun-friendly test & dev workflow

## Running Tests

```bash
bun test
# or
yarn test
```

Tests cover:

- Component rendering
- User interactions
- API mock handling
- UI updates after purchase

## Docker

Build image:

```bash
docker build -t my-next-app .
```

Run container:

```bash
docker run -p 3000:3000 my-next-app
```

Make sure you have a proper `.dockerignore` to reduce build size.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Bun / Yarn
- Jest + React Testing Library
- TailwindCSS

Feel free to extend this README as the project grows!
