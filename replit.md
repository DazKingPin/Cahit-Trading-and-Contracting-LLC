# Cahit Contracting Website

## Overview
Corporate website for Cahit Contracting, a marine & coastal construction company based in Oman. This is a single-page application built with React + Express.

## Architecture
- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js (serves static files and API routes)
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks + TanStack Query

## Key Features
- Hero section with video background and animated counters
- Navigation with smooth scrolling and mobile responsive menu
- Client logos carousel with auto-scroll
- Services/Expertise section with filter buttons
- Featured Projects showcase
- Video testimonials with hover-to-play
- Progressive lead qualification funnel (multi-step form)
- Contact popup modal with phone, email, WhatsApp
- About modal with company video
- Call-to-action section
- Professional footer with links

## Project Structure
- `client/src/pages/Home.tsx` - Main landing page with all sections
- `client/src/components/LeadQualificationFunnel.tsx` - Multi-step lead capture form
- `client/src/lib/logos.ts` - Client logo data
- `client/src/App.tsx` - App router and providers
- `server/routes.ts` - API routes
- `shared/schema.ts` - Database schema

## Design
- Color scheme: Sky blue (#0ea5e9) primary, slate grays for text
- Font: Sora + Inter
- Light theme optimized for corporate/professional look
- Ocean-blue accents reflecting marine expertise