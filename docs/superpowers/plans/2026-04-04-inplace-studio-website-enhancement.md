# Inplace Studio Website Enhancement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the existing inplacestudio.com WordPress + Elementor site with 9 SEO location landing pages, a blog with 4 initial posts, full SEO optimization across all pages, analytics/tracking stack, AI chat widget, performance optimization, and a CCPA-compliant privacy policy — targeting #1 rankings in San Diego, Los Angeles, and Orange County.

**Architecture:** Additions to the existing WordPress + Elementor Pro site. No redesign — keep current warm neutral palette (cream/beige/bronze), Cormorant Garamond + Jost typography, and all existing pages. Add new pages using existing Elementor templates and design patterns.

**Tech Stack:** Existing WordPress + Elementor Pro, add RankMath Pro, WP Rocket, ShortPixel, Cloudflare, Google Tag Manager, GoHighLevel chat widget

---

## Phase 1: Plugin & Infrastructure Setup

### Task 1: Install Enhancement Plugins

- [ ] **Step 1: Take a full backup** of the current site before making any changes.
  - If UpdraftPlus is already installed, run a full backup (database + files)
  - If not, install UpdraftPlus (free), configure backup destination (Google Drive or Dropbox), run full backup
  - Download a local copy of the backup

- [ ] **Step 2: Check which plugins are already installed.**
  Go to Plugins > Installed Plugins. Check for:
  - Elementor Pro (should already be there)
  - Any SEO plugin (Yoast, RankMath, All in One SEO)
  - Any caching plugin
  - Any image optimization plugin

- [ ] **Step 3: Install missing plugins** (skip any already installed):
  - **RankMath Pro** — if Yoast or another SEO plugin is active, migrate using RankMath's built-in migration wizard before deactivating the old one
  - **WP Rocket** (license required) — caching and performance
  - **ShortPixel** (API key required) — image compression
  - **Wordfence** (free) — security, if not already present

- [ ] **Step 4: Configure RankMath Pro:**
  - Run setup wizard: site type = "Local Business", business type = "Kitchen Designer"
  - Enable modules: SEO Analysis, Sitemap, Schema (Local Business), Redirections, Analytics
  - Connect Google Search Console and Google Analytics 4
  - Set default schema to LocalBusiness with:
    - Business name: Inplace Studio
    - Addresses: La Jolla showroom, Laguna Beach showroom
    - Phone: (858) 454-7397 (SD) / (949) 494-3341 (OC)
    - Service areas: San Diego County, Los Angeles County, Orange County
  - Enable Open Graph and Twitter Card defaults
  - Import existing SEO data if migrating from another SEO plugin

- [ ] **Step 5: Configure WP Rocket:**
  - Enable page caching, browser caching, GZIP compression
  - Enable lazy load for images and iframes
  - Minify CSS and JS (test carefully — verify site looks correct after enabling)
  - Enable "Remove Unused CSS" (test per page)
  - Preload cache and sitemap-based preloading (use RankMath sitemap URL)
  - **Important:** Clear cache after every major change

- [ ] **Step 6: Configure ShortPixel:**
  - Set compression to "Lossy" (best balance of quality and file size)
  - Enable WebP conversion
  - Enable automatic optimization of new uploads
  - Run bulk optimization on all existing media library images

- [ ] **Step 7: Configure Cloudflare** (if not already set up):
  - Point DNS to Cloudflare
  - Enable CDN, SSL (Full Strict), Auto Minify
  - Set Browser Cache TTL to 1 month
  - Enable Brotli compression
  - Page rules: bypass cache for `/wp-admin/*` and `/wp-login.php`

- [ ] **Step 8: Verify** — visit site, confirm everything still works, no visual changes, no broken pages. Clear all caches and test.

---

### Task 2: Google Tag Manager & Analytics Setup

- [ ] **Step 1: Check existing analytics.**
  The site already has Google Analytics/Tag Manager integration. Verify:
  - Is GTM installed? Check for GTM container ID in page source
  - Is GA4 active? Check for G-XXXXXXXXXX measurement ID
  - If already configured, skip to Step 4

- [ ] **Step 2: Create GTM container** (if not existing) at tagmanager.google.com. Get container ID (GTM-XXXXXXX).

- [ ] **Step 3: Install GTM on WordPress** (if not existing):
  - Use "Insert Headers and Footers" plugin — paste GTM `<head>` snippet in header, `<body>` snippet in body
  - Or add via Elementor > Site Settings > Custom Code

- [ ] **Step 4: Configure/verify GA4 in GTM:**
  - Ensure GA4 Configuration tag exists with correct Measurement ID
  - Trigger: All Pages
  - Publish container

- [ ] **Step 5: Set up conversion events in GTM:**
  - **Form submission:** Create trigger for GHL form/booking submission → fire GA4 event `generate_lead`
  - **Click-to-call:** Create trigger for clicks on `tel:` links → fire GA4 event `click_to_call`
  - **Book consultation clicks:** Create trigger for book consultation button clicks → fire GA4 event `book_consultation_click`

- [ ] **Step 6: Install Meta Pixel via GTM:**
  - Create Custom HTML tag with Meta Pixel base code
  - Trigger: All Pages
  - Add PageView event on all pages
  - Add Lead event on form submission trigger

- [ ] **Step 7: Install Microsoft Clarity:**
  - Create Clarity project at clarity.microsoft.com
  - Add Clarity tracking code as Custom HTML tag in GTM
  - Trigger: All Pages

- [ ] **Step 8: Verify** — use GTM Preview mode, visit site, confirm all tags fire correctly. Use Meta Pixel Helper Chrome extension to verify pixel.

---

## Phase 2: Location Landing Pages

### Task 3: Create Location Page Template

- [ ] **Step 1: Study existing page design patterns.**
  Open 2-3 existing pages in Elementor to understand:
  - Header/hero style used (background image, overlay, heading style)
  - Section padding and spacing
  - CTA section style
  - Color values and font settings
  - How the existing "Book a Consultation" CTA is styled

- [ ] **Step 2: Create the first location page as the template.**
  Pages > Add New:
  - Title: "Kitchen Design San Diego"
  - Slug: `/kitchen-design-san-diego/`
  - Template: same as existing pages (likely Elementor Full Width or Elementor Canvas)

- [ ] **Step 3: Build the page layout** matching the existing site's design language:

  **Hero Section** (match existing hero style):
  - Background image: a San Diego kitchen project photo from the media library
  - Overlay matching existing hero treatment
  - H1: `Luxury Kitchen Design in San Diego`
  - Subtext: `Serving La Jolla, Del Mar, Rancho Santa Fe, Coronado & beyond`
  - CTA button: `Book a Consultation` (matching existing button style)

  **Main Content Section:**
  - Copy the content from `/content/location-pages/san-diego.md` — Page 1 (Kitchen Design San Diego)
  - Use the existing site's heading and paragraph styles
  - H2s, paragraphs, bullet points — match existing typography

  **Local Projects Section:**
  - 3-4 portfolio items from San Diego area
  - Use same grid/card style as existing portfolio/collections section

  **Local Testimonials Section:**
  - 2-3 testimonials from San Diego clients
  - Match existing testimonial card style

  **FAQ Section:**
  - Elementor Accordion widget with 5 FAQs from the content file
  - Style to match existing FAQ section on the site
  - Enable FAQ schema via RankMath for this section

  **Service Area Map:**
  - Google Maps embed centered on San Diego County

  **Neighborhood List:**
  - 3-column text list: La Jolla, Del Mar, Rancho Santa Fe, Coronado, Encinitas, Carlsbad, Solana Beach, Carmel Valley, Scripps Ranch, Point Loma, Mission Hills, Hillcrest, North Park

  **CTA Section:**
  - Match existing CTA banner style (bronze/warm background)
  - `Book Your Free Consultation` button → link to booking page

- [ ] **Step 4: Configure RankMath SEO:**
  - Title: `Kitchen Design San Diego | Luxury Custom Kitchens | Inplace Studio` (55 chars)
  - Meta: `Inplace Studio designs luxury custom kitchens in San Diego. SieMatic, Woodmode & more. Serving La Jolla, Del Mar, Rancho Santa Fe. Book your free consultation.` (under 155 chars)
  - Focus keyword: `kitchen design san diego`
  - Schema: LocalBusiness + FAQ

- [ ] **Step 5: Test** on desktop, tablet, mobile. Verify design matches existing site feel.

- [ ] **Step 6: Save page layout as Elementor template** for reuse on remaining 8 pages.

---

### Task 4: Create Remaining 8 Location Pages

- [ ] **Step 1: Create all 8 pages** using the saved template, with content from the location content files:

  **San Diego (from `san-diego.md`):**
  | Page | Slug | Content Source |
  |------|------|---------------|
  | Custom Cabinetry San Diego | `/custom-cabinetry-san-diego/` | san-diego.md — Page 2 |
  | Kitchen Remodeling San Diego | `/kitchen-remodeling-san-diego/` | san-diego.md — Page 3 |

  **Los Angeles (from `los-angeles.md`):**
  | Page | Slug | Content Source |
  |------|------|---------------|
  | Kitchen Design Los Angeles | `/kitchen-design-los-angeles/` | los-angeles.md — Page 1 |
  | Custom Cabinetry Los Angeles | `/custom-cabinetry-los-angeles/` | los-angeles.md — Page 2 |
  | Kitchen Remodeling Los Angeles | `/kitchen-remodeling-los-angeles/` | los-angeles.md — Page 3 |

  **Orange County (from `orange-county.md`):**
  | Page | Slug | Content Source |
  |------|------|---------------|
  | Kitchen Design Orange County | `/kitchen-design-orange-county/` | orange-county.md — Page 1 |
  | Custom Cabinetry Orange County | `/custom-cabinetry-orange-county/` | orange-county.md — Page 2 |
  | Kitchen Remodeling Orange County | `/kitchen-remodeling-orange-county/` | orange-county.md — Page 3 |

- [ ] **Step 2: For EACH page, customize:**
  - Hero image: use a project photo relevant to that county (or a different kitchen image for variety)
  - H1: unique per page (from content files)
  - All body content: unique per page (from content files)
  - FAQ: unique questions per page (from content files)
  - Google Map: centered on the correct county
  - Neighborhood list: correct neighborhoods for that county
  - Local testimonials: from that county's clients

- [ ] **Step 3: Configure RankMath SEO for all 8 pages.**
  Use metadata from `/content/seo/metadata.md` — each page has unique title tag, meta description, and focus keyword already prepared.

- [ ] **Step 4: Add internal links** on each location page to:
  - Related service pages on the existing site
  - Other location pages in the same county (cross-link: kitchen design ↔ cabinetry ↔ remodeling)
  - Portfolio / Collections page
  - Book Consultation page

- [ ] **Step 5: Add location pages to the site navigation.**
  Options:
  - Add "Service Areas" or "Locations" dropdown to main nav with 3 county sub-items
  - Or add location pages to footer only (less intrusive — recommended since the site already has Showrooms in nav)
  - Add all 9 location pages to the footer under "Service Areas" column

- [ ] **Step 6: Test all 9 location pages** on desktop, tablet, mobile. Verify:
  - Unique content on each (spot-check 3-4 pages)
  - FAQs expand/collapse correctly
  - Maps load
  - CTAs link to booking page
  - Schema validates (test with Google Rich Results Test on 2-3 pages)

---

## Phase 3: Blog Setup

### Task 5: Blog Configuration

- [ ] **Step 1: Check if blog already exists.**
  Look for an existing blog page or posts section. If it exists, skip to Step 3.

- [ ] **Step 2: Create blog page** (if needed):
  - Pages > Add New, title "Blog", slug `/blog/`
  - Settings > Reading > Posts page = "Blog"

- [ ] **Step 3: Create blog categories:**
  Posts > Categories:
  - Design Trends
  - Kitchen Inspiration
  - Supplier Spotlights
  - Remodeling Tips
  - Local Projects

- [ ] **Step 4: Style the blog archive and single post templates** to match the existing site.
  Elementor > Theme Builder:

  **Blog Archive template:**
  - Hero: match existing page hero style, H1: "Kitchen Design Insights"
  - Post grid: 2 or 3 columns, showing featured image, title, excerpt, category, date
  - Pagination

  **Single Post template:**
  - Hero: featured image with overlay, post title
  - Content area: max-width ~800px centered
  - Sidebar (optional): CTA widget with "Book Consultation" button, recent posts, categories
  - Below content: related posts (3-column grid)
  - CTA section matching existing site style

- [ ] **Step 5: Add "Blog" or "Insights" to site navigation.**
  Add to main menu or footer — wherever it fits the existing nav structure.

---

### Task 6: Publish 4 Initial Blog Posts

- [ ] **Step 1: Create Post 1** — "Kitchen Design Trends for 2026: What Southern California Homeowners Want"
  - Copy content from `/content/blog-posts/initial-blog-posts.md` — Post 1
  - Category: Design Trends
  - Add a featured image (kitchen trend photo from media library or stock)
  - Replace `[LINK: /slug/]` placeholders with actual internal links to existing pages
  - RankMath: Title `Kitchen Design Trends 2026 | Inplace Studio`, focus keyword `kitchen design trends 2026`

- [ ] **Step 2: Create Post 2** — "How Much Does a Custom Kitchen Cost in San Diego?"
  - Copy content from blog-posts file — Post 2
  - Category: Remodeling Tips
  - Featured image, replace link placeholders
  - RankMath: Title `Custom Kitchen Cost San Diego | Inplace Studio`, focus keyword `custom kitchen cost san diego`

- [ ] **Step 3: Create Post 3** — "SieMatic vs. Woodmode: Choosing the Right Premium Cabinet Brand"
  - Copy content from blog-posts file — Post 3
  - Category: Supplier Spotlights
  - Featured image, replace link placeholders
  - RankMath: Title `SieMatic vs Woodmode Comparison | Inplace Studio`, focus keyword `siematic vs woodmode`

- [ ] **Step 4: Create Post 4** — "5 Stunning Modern Kitchens We Designed in Orange County"
  - Copy content from blog-posts file — Post 4
  - Category: Kitchen Inspiration
  - **Important:** Replace the fictional project descriptions with real Inplace Studio projects and photos. If real projects aren't ready, hold this post as draft.
  - RankMath: Title `Modern Kitchen Design Orange County | Inplace Studio`, focus keyword `modern kitchen design orange county`

- [ ] **Step 5: Test** — verify blog archive page displays all posts, single posts render correctly, related posts show, sidebar CTA works, mobile layout is clean.

---

## Phase 4: SEO Optimization

### Task 7: Optimize All Existing Pages

- [ ] **Step 1: Audit all existing pages for SEO.**
  Go through every page on the site and configure RankMath:
  - Use metadata from `/content/seo/metadata.md` for new pages
  - For existing pages, create appropriate title tags (under 60 chars) and meta descriptions (under 155 chars)
  - Set a focus keyword for each page
  - Ensure each page has exactly one H1 tag

- [ ] **Step 2: Add alt text to all images.**
  Go to Media Library, sort by unoptimized:
  - Add descriptive alt text to every image
  - Include keywords naturally (e.g., "custom SieMatic kitchen cabinetry in La Jolla home" not "kitchen")
  - Prioritize hero images and portfolio photos

- [ ] **Step 3: Add internal links across the site.**
  For each major page, ensure it links to at least 2-3 other relevant pages:
  - Service pages → related portfolio items, location pages
  - Location pages → service pages, portfolio, other same-county location pages
  - Blog posts → service pages, portfolio, consultation booking
  - Portfolio/Collections → service pages, booking

- [ ] **Step 4: Configure RankMath sitemap:**
  - RankMath > Sitemap Settings
  - Include: Pages, Posts
  - Exclude: attachment pages, author archives
  - Verify sitemap at `inplacestudio.com/sitemap_index.xml`

- [ ] **Step 5: Configure robots.txt:**
  RankMath > General Settings > Edit robots.txt:
  ```
  User-agent: *
  Allow: /
  Disallow: /wp-admin/
  Disallow: /wp-login.php
  Sitemap: https://inplacestudio.com/sitemap_index.xml
  ```

- [ ] **Step 6: Submit sitemap to Google Search Console.**
  - Verify domain ownership (if not already done)
  - Submit sitemap URL
  - Request indexing for homepage + all 9 new location pages

- [ ] **Step 7: Add FAQ schema to existing FAQ section.**
  If the current site has an FAQ section, add FAQ schema via RankMath's content editor.

---

### Task 8: Google Business Profile Optimization

- [ ] **Step 1: Audit existing Google Business Profiles.**
  The site has showrooms in La Jolla and Laguna Beach (Beverly Hills coming). Check:
  - Are GBP listings claimed and verified for each location?
  - Is NAP (Name, Address, Phone) consistent with the website?

- [ ] **Step 2: Optimize each GBP listing:**
  - Business name: "Inplace Studio" (consistent everywhere)
  - Categories: Primary = "Kitchen Designer", Additional = "Cabinet Store", "Kitchen Remodeler", "Interior Designer"
  - Description: keyword-rich description of services
  - Photos: upload 20+ high-quality showroom and project photos per listing
  - Business hours: match website
  - Services: list all services (Kitchen Design, Custom Cabinetry, Kitchen Remodeling, Closet & Wardrobe)
  - Website link: link to the appropriate location page (La Jolla → `/kitchen-design-san-diego/`, Laguna Beach → `/kitchen-design-orange-county/`)

- [ ] **Step 3: Set up weekly GBP posts.**
  Create a posting schedule:
  - Week 1: Project showcase photo + brief description
  - Week 2: Design tip or trend
  - Week 3: Testimonial highlight
  - Week 4: Seasonal promotion or event
  - Repeat for each listing

- [ ] **Step 4: Set up review generation.**
  After each completed project:
  - Send automated review request via GHL (7 days post-completion)
  - Include direct links to Google review for the nearest showroom location
  - Include Houzz review link as secondary option

---

## Phase 5: Chat Widget & Privacy Policy

### Task 9: AI Chat Widget Setup

- [ ] **Step 1: Get GHL chat widget embed code** from GoHighLevel account.

- [ ] **Step 2: Install on WordPress:**
  - Add to site via Elementor > Site Settings > Custom Code > Body End
  - Or via "Insert Headers and Footers" plugin in footer section
  - Widget should appear bottom-right on all pages

- [ ] **Step 3: Style the chat widget** to match the existing site:
  - If GHL allows customization: use warm tones matching the site (bronze accent, cream background)
  - Set welcome message: "Welcome to Inplace Studio. How can we help with your kitchen project?"
  - Lead capture fields: name, phone, email, project type

- [ ] **Step 4: Verify GHL integration:**
  - Submit test lead via chat widget
  - Confirm it creates a contact in GHL Pipeline Stage 1
  - Confirm speed-to-lead automations trigger

- [ ] **Step 5: Test** on desktop and mobile — widget doesn't overlap content, opens/closes smoothly, doesn't block the existing "Book Consultation" button.

---

### Task 10: Privacy Policy

- [ ] **Step 1: Check if privacy policy page already exists.**
  The site footer links to "Privacy Policy" — check if it has content.

- [ ] **Step 2: Update or create privacy policy.**
  - If existing: review and update with the content from `/content/pages/privacy-policy.md` — add missing sections (CCPA compliance, all third-party services, cookie policy)
  - If minimal/placeholder: replace with the full privacy policy from the content file
  - Fill in all placeholders: `[DATE]`, `[BUSINESS ADDRESS]` (both showroom addresses), `[EMAIL]`, `[PHONE]`

- [ ] **Step 3: Verify** the footer Privacy Policy link points to the correct page.

---

## Phase 6: Performance & Launch

### Task 11: Performance Optimization

- [ ] **Step 1: Run ShortPixel bulk optimization** on all media library images.
  - Verify WebP conversion is enabled
  - Check that no image exceeds 200KB after compression

- [ ] **Step 2: Elementor optimization:**
  Elementor > Settings > Performance:
  - Enable "Improved Asset Loading"
  - Enable "Improved CSS Loading"
  - Disable unused Elementor widgets to reduce CSS/JS

- [ ] **Step 3: Font optimization:**
  - Verify Cormorant Garamond and Jost are loading efficiently
  - Check for `font-display: swap` 
  - Preload critical fonts if not already done

- [ ] **Step 4: Run Google PageSpeed Insights** on:
  - Homepage
  - 1 existing service/collections page
  - 1 new location page
  - 1 blog post

  Target scores:
  - Mobile: 85+ (Elementor sites are harder to get 90+ but aim high)
  - Desktop: 90+
  - LCP: under 2.5s
  - CLS: under 0.1

- [ ] **Step 5: Fix any issues** identified by PageSpeed:
  - Serve images in WebP (ShortPixel handles this)
  - Defer non-critical JS (WP Rocket)
  - Remove unused CSS (WP Rocket)
  - Preconnect to required origins

- [ ] **Step 6: Test on real devices** — iPhone, Android, iPad:
  - All new location pages load correctly
  - Blog posts render properly
  - Chat widget works
  - Click-to-call works
  - No horizontal scroll issues

---

### Task 12: Final Checklist & Go Live

- [ ] **Step 1: Content verification:**
  - All 9 location pages published with unique content
  - All 4 blog posts published (or Post 4 saved as draft if waiting for real photos)
  - Privacy policy updated
  - All placeholder text replaced with real info
  - All links work

- [ ] **Step 2: SEO verification:**
  - All new pages have unique title + meta description in RankMath
  - All new images have alt text
  - FAQ schema validates on location pages (test 2-3 at search.google.com/test/rich-results)
  - Sitemap includes all new pages
  - No noindex tags on pages that should be indexed

- [ ] **Step 3: Analytics verification:**
  - GTM Preview mode: all tags fire on new pages
  - GA4 receiving data
  - Meta Pixel firing
  - Clarity recording sessions
  - GHL chat widget capturing leads

- [ ] **Step 4: Navigation verification:**
  - Location pages accessible from footer (or nav dropdown)
  - Blog accessible from nav
  - All internal links work

- [ ] **Step 5: Submit new pages to Google:**
  - Google Search Console > URL Inspection
  - Submit each of the 9 location pages for indexing
  - Submit blog posts for indexing
  - Submit updated sitemap

- [ ] **Step 6: Post-launch monitoring (first 2 weeks):**
  - Check GSC daily for crawl errors
  - Monitor GA4 for traffic to new pages
  - Check Clarity for UX issues on new pages
  - Monitor GHL for chat widget leads
  - Check PageSpeed scores weekly
  - Begin weekly GBP posts

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | Tasks 1-2 | Plugin setup, analytics/tracking stack |
| 2 | Tasks 3-4 | 9 location landing pages with unique SEO content |
| 3 | Tasks 5-6 | Blog setup + 4 initial posts |
| 4 | Tasks 7-8 | SEO optimization for all pages + Google Business Profiles |
| 5 | Tasks 9-10 | AI chat widget + privacy policy |
| 6 | Tasks 11-12 | Performance optimization + final checklist |

## Content Files Reference

| Content | File Path |
|---------|-----------|
| San Diego pages (3) | `content/location-pages/san-diego.md` |
| Los Angeles pages (3) | `content/location-pages/los-angeles.md` |
| Orange County pages (3) | `content/location-pages/orange-county.md` |
| Blog posts (4) | `content/blog-posts/initial-blog-posts.md` |
| SEO metadata (all pages) | `content/seo/metadata.md` |
| Privacy policy | `content/pages/privacy-policy.md` |
| FAQ content (services) | `content/pages/services.md` |
| Testimonials (12 extras) | `content/pages/suppliers-process-testimonials.md` |
