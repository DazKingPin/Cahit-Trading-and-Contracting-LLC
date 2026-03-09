# Cahit Contracting Website

## Overview
Corporate website for Cahit Trading & Contracting LLC, a marine & coastal construction company based in Oman. Built with React + Express + PostgreSQL.

## Architecture
- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js with session-based auth (express-session + memorystore)
- **Database**: PostgreSQL via Drizzle ORM + Neon serverless driver
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks + TanStack Query

## Key Features
- Hero section with video background and animated counters
- Navigation with smooth scrolling and mobile responsive menu
- Client logos carousel (11 logos, auto-scroll)
- Services section (5 services, no filter tabs)
- Featured Projects showcase
- Leadership section with hover-to-play video bios (Tahir Senyurt, Pasha Huseyin Ari)
- Marine specialists capabilities grid
- Progressive lead qualification funnel (3-step form)
- ChatBot widget (floating navy bubble, keyword-based replies via /api/chat)
- Contact popup modal with phone, email, WhatsApp
- Admin login link in footer (small text) → popup modal
- Admin dashboard with leads management, chat logs, admin user approval

## Admin System
- First registered admin is auto-approved
- Subsequent admins require approval from existing admin
- Session-based authentication via express-session + memorystore
- Dashboard at /admin route with sidebar navigation

## Database Tables
- `admin_users` - Admin accounts (email, username, password, isApproved, isFirstAdmin)
- `chat_messages` - Chat bot conversations (sessionId, role, content)
- `leads` - Lead qualification form submissions (serviceType, projectScope, name, email, phone, message)

## Project Structure
- `client/src/pages/Home.tsx` - Main landing page with all sections
- `client/src/pages/AdminDashboard.tsx` - Admin dashboard with leads/chats/users tabs
- `client/src/components/ChatBotWidget.tsx` - Floating chatbot widget
- `client/src/components/Footer.tsx` - Footer with admin login modal
- `client/src/components/LeadQualificationFunnel.tsx` - Multi-step lead capture form
- `client/src/lib/logos.ts` - Client logo data (11 logos)
- `client/src/App.tsx` - App router and providers
- `server/routes.ts` - API routes (admin auth, leads, chat)
- `server/storage.ts` - Database storage implementation
- `server/db.ts` - Drizzle/Neon database connection
- `shared/schema.ts` - Database schema and Zod validation

## Contact Info
- Phone: +968 2411 2406 Ext 101
- Mobile/WhatsApp: +968 9096 6562
- Email: ctc@cahitcontracting.com
- Address: Khaleej Tower, 6th Floor No. 603, Ghala, Muscat, Sultanate of Oman

## Design
- Color scheme: Sky blue primary, navy (#0A3D6B) accent, slate grays for text
- Font: Sora + Inter
- Light theme optimized for corporate/professional look
- Ocean-blue accents reflecting marine expertise

## Dependencies
- bcrypt (password hashing)
- memorystore (session store)
- @neondatabase/serverless + ws (database connection)
- drizzle-orm + drizzle-zod (ORM + validation)
