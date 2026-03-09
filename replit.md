# Cahit Contracting Website

## Overview
Corporate website for Cahit Trading & Contracting LLC, a marine & coastal construction company based in Oman. Built with React + Express + PostgreSQL.

## Architecture
- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js with session-based auth (express-session + memorystore)
- **Database**: PostgreSQL via Drizzle ORM + Neon serverless driver
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks + TanStack Query
- **AI Integration**: OpenAI via Replit AI Integrations (env: AI_INTEGRATIONS_OPENAI_BASE_URL, AI_INTEGRATIONS_OPENAI_API_KEY)
- **File Uploads**: Multer, saved to /uploads/ directory, served as static files

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
- Full CRM admin dashboard at /admin

## Admin Dashboard (CRM)
- **Dashboard**: 6 stat cards (Blog Posts, Total Leads, Unread Leads, Chat Conversations, Contacts from Chat, Content Sections) + Recent Leads + Recent Blog Posts
- **Site Content**: EN/AR language toggle, expandable accordion sections (Hero, Expertise, Projects, Testimonials, CTA, Footer), form fields with file upload, live preview iframe
- **Blog Posts**: CRUD with search/filter, bilingual (EN/AR), AI assistant panel with: Generate Article, Optimize SEO, Translate, Generate Excerpt, Improve Content, Suggest Titles
- **Lead Submissions**: Card view with mark-as-read functionality
- **Chat History**: Expandable session view with user/bot messages
- Professional sidebar: Navy (#0A3D6B) with Cahit logo, nav items, sign-out

## Admin System
- First registered admin is auto-approved
- Subsequent admins require approval from existing admin
- Session-based authentication via express-session + memorystore
- Dashboard at /admin route with sidebar navigation

## API Routes
### Public
- POST /api/leads - Submit lead form
- POST /api/chat - Send chat message
- GET /api/blog-posts - Published blog posts
- GET /api/blog-posts/:slug - Single blog post by slug

### Admin (requires session auth)
- POST /api/admin/register, /api/admin/login, /api/admin/logout
- GET /api/admin/me - Current admin user
- GET /api/admin/stats - Dashboard statistics
- POST /api/admin/upload - File upload (multer)
- GET/POST/PATCH/DELETE /api/admin/blog-posts - Blog CRUD
- GET/PUT /api/admin/site-content/:sectionKey - Site content management
- GET /api/admin/leads, POST /api/admin/leads/:id/read
- GET /api/admin/chats, GET /api/admin/chats/:sessionId
- POST /api/admin/ai/generate-article, generate-excerpt, improve-content, translate, optimize-seo, suggest-titles

## Database Tables
- `admin_users` - Admin accounts (email, username, password, isApproved, isFirstAdmin)
- `chat_messages` - Chat bot conversations (sessionId, role, content)
- `leads` - Lead qualification form submissions (serviceType, projectScope, name, email, phone, message)
- `blog_posts` - Blog posts (titleEn, titleAr, slug, category, excerptEn/Ar, contentEn/Ar, status, featuredImage)
- `site_content` - Editable site sections (sectionKey, language, contentJson)

## Project Structure
- `client/src/pages/Home.tsx` - Main landing page with all sections
- `client/src/pages/AdminDashboard.tsx` - Full CRM admin dashboard
- `client/src/components/ChatBotWidget.tsx` - Floating chatbot widget
- `client/src/components/Footer.tsx` - Footer with admin login modal
- `client/src/components/LeadQualificationFunnel.tsx` - Multi-step lead capture form
- `client/src/lib/logos.ts` - Client logo data (11 logos)
- `client/src/App.tsx` - App router and providers
- `server/routes.ts` - All API routes (admin, blog, leads, chat, AI, uploads)
- `server/storage.ts` - Database storage implementation (IStorage interface)
- `server/db.ts` - Drizzle/Neon database connection
- `shared/schema.ts` - Database schema, insert schemas, and types
- `server/replit_integrations/` - OpenAI integration files

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
- multer (file uploads)
- openai (AI integrations)
- @neondatabase/serverless + ws (database connection)
- drizzle-orm + drizzle-zod (ORM + validation)
