# Cahit Contracting Website

## Overview
Corporate website for Cahit Trading & Contracting LLC, a marine & coastal construction company based in Oman. Built as a WordPress theme with a Node.js preview server for Replit.

## Architecture
- **WordPress Theme**: Located at `wp-theme/cahit-theme/`
- **Preview Server**: `preview-server.cjs` (Node.js/Express) renders PHP templates as HTML for preview
- **Database**: PostgreSQL available (used by original React app, not the WP theme preview)
- **AI Integration**: OpenAI via Replit AI Integrations

## WordPress Theme Structure
- `wp-theme/cahit-theme/header.php` - Navbar, contact popup, quote modal
- `wp-theme/cahit-theme/footer.php` - Footer with company info, links
- `wp-theme/cahit-theme/front-page.php` - Home page (10 sections)
- `wp-theme/cahit-theme/page-about.php` - About Us page
- `wp-theme/cahit-theme/page-services.php` - Services page
- `wp-theme/cahit-theme/page-projects.php` - Projects page
- `wp-theme/cahit-theme/page-clients.php` - Clients page
- `wp-theme/cahit-theme/page-blog.php` - Blog page
- `wp-theme/cahit-theme/page-careers.php` - Careers page
- `wp-theme/cahit-theme/index.php` - Required WP fallback template
- `wp-theme/cahit-theme/functions.php` - Theme setup, enqueuing, custom post types, AJAX handlers
- `wp-theme/cahit-theme/style.css` - WP theme metadata
- `wp-theme/cahit-theme/assets/css/theme.css` - All styling
- `wp-theme/cahit-theme/assets/js/theme.js` - Main JS (menu, counters, videos, modals, lang toggle)
- `wp-theme/cahit-theme/assets/js/chatbot.js` - Floating chat widget
- `wp-theme/cahit-theme/assets/videos/tahir.mp4` - Leadership video
- `wp-theme/cahit-theme/assets/videos/pasha.mp4` - Leadership video

## Navigation
Home, About Us, Services, Projects, Clients, Blog, Careers, Contact

## Language Support
- EN/AR toggle in navbar
- Arabic RTL support via CSS `html[dir="rtl"]` rules
- Client-side translation via `switchLang('ar')` / `switchLang('en')`
- Arabic text stored in `arTranslations` map in theme.js
- Noto Sans Arabic font loaded from Google Fonts
- Language preference saved in localStorage

## Preview Server
- `preview-server.cjs` (CommonJS, port 5000)
- Reads PHP templates, strips/replaces PHP tags with actual content
- Routes: `/`, `/about`, `/services`, `/projects`, `/clients`, `/blog`, `/careers`
- Serves static assets from theme directory
- Handles AJAX for chatbot and quote form (multipart + JSON)

## Key Features
- Hero section with video background and animated counters (home)
- Image hero banner for About page, video heroes for Services/Projects
- Client logos carousel with auto-scroll
- 5 service cards (Marine, Infrastructure, Earthworks, Dewatering, MEP)
- 6 project cards with category badges
- Leadership section with hover-to-play video bios
- Marine specialists capabilities pills
- Quote request form via modal (FormData to WP admin-ajax)
- Floating chatbot widget
- Contact popup with phone, email, WhatsApp, address
- Blog page with article cards
- Careers page with value proposition cards
- Full Arabic RTL support

## Media CDN
All images served from: `https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/`

## Contact Info
- Phone: +968 2411 2406 Ext 101
- Mobile/WhatsApp: +968 9096 6562
- Email: ctc@cahitcontracting.com
- Address: Khaleej Tower, 6th Floor No. 603, Ghala, Muscat, Sultanate of Oman

## Design
- Colors: Sky-500 (#0ea5e9), Sky-600 (#0284c7), Navy (#0A3D6B), Slate-900 (#0f172a)
- Fonts: Sora + Inter (EN), Noto Sans Arabic (AR)
- Light theme, corporate/professional look
- Ocean-blue accents reflecting marine expertise

## WP AJAX Actions
- `cahit_submit_lead` - Lead form submission
- `cahit_submit_quote` - Quote request (FormData with nonce)
- `cahit_chat` - Chatbot messages
