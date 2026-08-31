# AetherSync Clerk Authentication for Vercel

This is the lightweight web authentication template for deploying to **Vercel** with **Clerk Auth**.

## 1. Quick Deploy Steps

1. Create a free account at [clerk.com](https://clerk.com) and create an application.
2. In Clerk Dashboard -> **API Keys**, copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
3. In Clerk Dashboard -> **User & Authentication** -> **Social Connections**, enable Google, GitHub, etc.
4. Deploy this folder to [Vercel](https://vercel.com) and add the environment variables from step 2.

## 2. Authentication Handoff

When a user logs in on `https://your-domain.vercel.app/login`, the page automatically extracts the Clerk JWT session token and redirects back into AetherSync Desktop via both:
- **Localhost Loopback Server**: `http://127.0.0.1:<PORT>/callback?token=...&userId=...&email=...`
- **Custom Deep Link**: `aethersync://auth/callback?token=...&userId=...&email=...`
