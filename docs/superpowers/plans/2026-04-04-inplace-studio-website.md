# Inplace Studio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, SEO-optimized WordPress + Elementor website for Inplace Studio that showcases kitchen design portfolio and generates consultation leads across San Diego, LA, and Orange County.

**Architecture:** WordPress + Elementor Pro site with custom CSS for the hybrid dark/light aesthetic, RankMath Pro for SEO, GHL form embeds for lead capture, and 9 location-specific landing pages for local SEO dominance. Global elements (nav, footer, CTA banners) built as Elementor templates for reuse.

**Tech Stack:** WordPress 6.x, Elementor Pro, RankMath Pro, WP Rocket, ShortPixel, Cloudflare, Google Tag Manager, GoHighLevel (embeds)

---

## Phase 1: WordPress Foundation & Global Setup

### Task 1: WordPress Installation & Core Plugin Setup

- [ ] **Step 1: Install WordPress** on inplacestudio.com hosting (or staging subdomain like staging.inplacestudio.com). Ensure PHP 8.1+, MySQL 8.0+, SSL certificate active.

- [ ] **Step 2: Install and activate core plugins:**
  - Elementor Pro (license required)
  - RankMath Pro (license required)
  - WP Rocket (license required)
  - ShortPixel (API key required)
  - Wordfence (free tier to start)
  - UpdraftPlus (free tier, configure daily backups to Google Drive or Dropbox)
  - Smash Balloon Instagram Feed (license required)

- [ ] **Step 3: Configure WordPress settings:**
  - Settings > General: Site Title = `Inplace Studio`, Tagline = `Luxury Kitchen Design & Custom Cabinetry`
  - Settings > Permalinks: Post name (`/%postname%/`)
  - Settings > Reading: Static front page (set after homepage is built)
  - Settings > Discussion: Disable comments sitewide (not needed)
  - Remove default posts, pages, and sample content

- [ ] **Step 4: Configure RankMath Pro:**
  - Run setup wizard: set site type = "Local Business", business type = "Kitchen Designer"
  - Enable modules: SEO Analysis, Sitemap, Schema (Local Business), Redirections, Analytics
  - Connect Google Search Console and Google Analytics 4
  - Set default schema to LocalBusiness with:
    - Business name: Inplace Studio
    - Address: [showroom address]
    - Phone: [business phone]
    - Service areas: San Diego County, Los Angeles County, Orange County
  - Enable Open Graph and Twitter Card defaults

- [ ] **Step 5: Configure WP Rocket:**
  - Enable page caching, browser caching, GZIP compression
  - Enable lazy load for images and iframes
  - Minify CSS and JS (test carefully with Elementor)
  - Enable "Remove Unused CSS" (test per page)
  - Preload cache and sitemap-based preloading (use RankMath sitemap URL)

- [ ] **Step 6: Configure Cloudflare:**
  - Point DNS to Cloudflare
  - Enable CDN, SSL (Full Strict), Auto Minify (HTML, CSS, JS)
  - Set Browser Cache TTL to 1 month
  - Enable Brotli compression
  - Add page rules: bypass cache for `/wp-admin/*` and `/wp-login.php`

- [ ] **Step 7: Verify setup** — visit site, confirm SSL, confirm plugins active, confirm RankMath sitemap at `/sitemap_index.xml`

---

### Task 2: Elementor Global Design System

- [ ] **Step 1: Set Elementor Global Colors:**
  Go to Elementor > Site Settings > Global Colors. Add:

  | Name | Hex |
  |------|-----|
  | Primary Dark | `#0A0A0A` |
  | Secondary Dark | `#1A1A1A` |
  | Warm White | `#FAF8F5` |
  | Pure White | `#FFFFFF` |
  | Accent Gold | `#C9A96E` |
  | Accent Gold Hover | `#B8944F` |
  | Warm Gray | `#6B6560` |
  | Light Gray | `#E8E4DF` |

- [ ] **Step 2: Set Elementor Global Fonts:**
  Go to Elementor > Site Settings > Global Fonts. Add:

  | Name | Font | Weight |
  |------|------|--------|
  | Hero Heading | Playfair Display | 700 |
  | Section Heading | Playfair Display | 600 |
  | Subtitle | Montserrat | 500 |
  | Body Text | Montserrat | 400 |
  | Button Text | Montserrat | 600 |
  | Nav Text | Montserrat | 500 |

- [ ] **Step 3: Set Elementor Typography defaults:**
  Go to Elementor > Site Settings > Typography:
  - H1: Playfair Display, 700, 64px (desktop), 42px (mobile)
  - H2: Playfair Display, 600, 48px (desktop), 32px (mobile)
  - H3: Montserrat, 500, 28px (desktop), 22px (mobile)
  - Body: Montserrat, 400, 17px, line-height 1.7, color `#6B6560`
  - Links: color `#C9A96E`, hover `#B8944F`

- [ ] **Step 4: Create global button styles** via Elementor > Site Settings > Buttons:
  - Background: `#C9A96E`
  - Text: `#0A0A0A`
  - Font: Montserrat, 600, 14px, uppercase, letter-spacing 2px
  - Padding: 15px 40px
  - Border radius: 0px (sharp luxury feel)
  - Hover: background `#B8944F`

- [ ] **Step 5: Add Custom CSS** via Elementor > Site Settings > Custom CSS (or Appearance > Customize > Additional CSS):

  ```css
  /* Secondary CTA - gold outline */
  .btn-secondary {
    background: transparent !important;
    border: 2px solid #C9A96E !important;
    color: #C9A96E !important;
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    text-transform: uppercase !important;
    letter-spacing: 2px !important;
    padding: 13px 40px !important;
    transition: all 0.3s ease !important;
  }
  .btn-secondary:hover {
    background: #C9A96E !important;
    color: #0A0A0A !important;
  }

  /* White outline CTA for dark sections */
  .btn-dark-section {
    background: transparent !important;
    border: 2px solid #FFFFFF !important;
    color: #FFFFFF !important;
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    text-transform: uppercase !important;
    letter-spacing: 2px !important;
    padding: 13px 40px !important;
    transition: all 0.3s ease !important;
  }
  .btn-dark-section:hover {
    background: #FFFFFF !important;
    color: #0A0A0A !important;
  }

  /* Portfolio hover zoom */
  .portfolio-grid .elementor-image img {
    transition: transform 0.5s ease !important;
  }
  .portfolio-grid .elementor-image:hover img {
    transform: scale(1.05) !important;
  }

  /* Portfolio hover overlay */
  .portfolio-item {
    position: relative;
    overflow: hidden;
  }
  .portfolio-item .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(10,10,10,0.85));
    padding: 30px;
    transform: translateY(100%);
    transition: transform 0.4s ease;
  }
  .portfolio-item:hover .overlay {
    transform: translateY(0);
  }

  /* Smooth section transitions - angled divider */
  .section-divider-dark-to-light {
    position: relative;
  }
  .section-divider-dark-to-light::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    width: 100%;
    height: 100px;
    background: #FAF8F5;
    clip-path: polygon(0 50%, 100% 0, 100% 100%, 0 100%);
    z-index: 1;
  }

  /* Scroll down chevron animation */
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-15px) translateX(-50%); }
    60% { transform: translateY(-7px) translateX(-50%); }
  }
  .scroll-chevron {
    animation: bounce 2s infinite;
  }

  /* Team member hover bio */
  .team-member {
    position: relative;
    overflow: hidden;
  }
  .team-member .bio-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(10,10,10,0.9);
    padding: 20px;
    transform: translateY(100%);
    transition: transform 0.4s ease;
  }
  .team-member:hover .bio-overlay {
    transform: translateY(0);
  }

  /* Sticky nav background on scroll */
  .elementor-sticky--effects {
    background: #0A0A0A !important;
    box-shadow: 0 2px 20px rgba(0,0,0,0.3) !important;
  }
  ```

- [ ] **Step 6: Verify** — create a test page, add heading + button + section with dark background. Confirm colors, fonts, button styles render correctly.

---

### Task 3: Header (Navigation) Template

- [ ] **Step 1: Create Header template:**
  Go to Elementor > Theme Builder > Header > Add New.
  Name: `Site Header`
  Condition: Entire Site

- [ ] **Step 2: Build header layout:**
  - Full-width section, background transparent (will become `#0A0A0A` on scroll via sticky)
  - Enable Elementor Sticky: sticky on top, effects offset 100px
  - Three columns: Left (20%) | Center (50%) | Right (30%)
  - **Left column:** Site logo (image widget), max height 45px, link to homepage
  - **Center column:** Nav Menu widget
    - Menu items: Home, About, Portfolio, Services, Suppliers, Process, Contact
    - Services has dropdown submenu: Custom Cabinetry, Kitchen Design, Kitchen Remodeling
    - Typography: Montserrat, 500, 14px, uppercase, letter-spacing 1.5px
    - Text color: `#FFFFFF`, hover: `#C9A96E`
    - Pointer: underline, color `#C9A96E`
    - Dropdown background: `#1A1A1A`, text `#FFFFFF`, hover text `#C9A96E`
  - **Right column:** Two elements stacked horizontally
    - Phone number (text or icon list): click-to-call `tel:+1XXXXXXXXXX`, color white, Montserrat 400 13px
    - Button: `BOOK CONSULTATION`, gold primary CTA style, link to `/book-consultation/`

- [ ] **Step 3: Configure mobile responsive:**
  - Breakpoint 1024px: hide phone number, keep logo + hamburger + book button
  - Breakpoint 768px: hamburger menu, full-screen overlay background `#0A0A0A`
  - Mobile menu: full viewport height, centered nav items, Playfair Display 28px
  - Close icon: white, top right

- [ ] **Step 4: Publish** with condition "Entire Site". Test on desktop and mobile viewports.

---

### Task 4: Footer Template

- [ ] **Step 1: Create Footer template:**
  Go to Elementor > Theme Builder > Footer > Add New.
  Name: `Site Footer`
  Condition: Entire Site

- [ ] **Step 2: Build footer layout:**
  - Full-width section, background `#1A1A1A`, padding 80px top, 40px bottom
  - Top row: 4 equal columns

  **Column 1 — Navigation:**
  - Heading: `Inplace Studio` (Playfair Display, 24px, white)
  - Logo image below heading
  - Brief tagline: "Luxury kitchen design & custom cabinetry for Southern California" (Montserrat, 14px, `#6B6560`)

  **Column 2 — Services:**
  - Heading: `SERVICES` (Montserrat, 600, 13px, uppercase, `#C9A96E`, letter-spacing 2px)
  - Links list: Custom Cabinetry, Kitchen Design, Kitchen Remodeling
  - Link style: Montserrat, 400, 15px, color `#FFFFFF`, hover `#C9A96E`

  **Column 3 — Service Areas:**
  - Heading: `SERVICE AREAS` (same style as above)
  - Links: Kitchen Design San Diego, Kitchen Design Los Angeles, Kitchen Design Orange County
  - Plus: Custom Cabinetry San Diego, Custom Cabinetry Los Angeles, Custom Cabinetry Orange County
  - Each links to corresponding location page

  **Column 4 — Contact:**
  - Heading: `CONTACT` (same style)
  - Address (icon + text)
  - Phone (icon + click-to-call link)
  - Email (icon + mailto link)
  - Business hours

- [ ] **Step 3: Add social icons row below columns:**
  - Centered social icons: Instagram, Houzz, Pinterest, Facebook
  - Icon color: `#FFFFFF`, hover: `#C9A96E`, size 18px, spacing 15px

- [ ] **Step 4: Add bottom bar:**
  - Divider line: `#333333`, 1px
  - Two columns: left = `© 2026 Inplace Studio. All Rights Reserved.` | right = `Privacy Policy` link
  - Text: Montserrat, 400, 13px, color `#6B6560`

- [ ] **Step 5: Publish** with condition "Entire Site". Verify on desktop and mobile.

---

### Task 5: Reusable CTA Banner Template

- [ ] **Step 1: Create CTA Section template:**
  Go to Elementor > Templates > Saved Templates > Add New > Section.
  Name: `CTA Banner - Book Consultation`

- [ ] **Step 2: Build CTA banner:**
  - Full-width section, background: gradient from `#C9A96E` to `#B8944F` (left to right)
  - Padding: 60px top/bottom
  - Center-aligned content:
    - H2: `Ready to Transform Your Kitchen?` (Playfair Display, 600, 38px, color `#0A0A0A`)
    - Spacer: 10px
    - Subtext: `Book your free consultation and let's bring your vision to life.` (Montserrat, 400, 17px, `#1A1A1A`)
    - Spacer: 25px
    - Button: `BOOK YOUR FREE CONSULTATION` (background `#0A0A0A`, text `#FFFFFF`, hover: background `#1A1A1A`)
    - Below button: Phone number as click-to-call text link

- [ ] **Step 3: Save template.** This will be inserted on every page before the footer.

---

### Task 6: Google Tag Manager & Analytics Setup

- [ ] **Step 1: Create GTM container** at tagmanager.google.com. Get container ID (GTM-XXXXXXX).

- [ ] **Step 2: Install GTM on WordPress:**
  - Option A: Use "Insert Headers and Footers" plugin — paste GTM `<head>` snippet in header, `<body>` snippet in body
  - Option B: Add via functions.php in child theme (if using child theme)

- [ ] **Step 3: Configure GA4 in GTM:**
  - Create GA4 Configuration tag with Measurement ID (G-XXXXXXXXXX)
  - Trigger: All Pages
  - Publish container

- [ ] **Step 4: Set up conversion events in GTM:**
  - **Form submission:** Create trigger for GHL form submission (typically fires a custom event or redirect — configure based on GHL embed behavior)
  - **Click-to-call:** Create trigger for clicks on `tel:` links → fire GA4 event `click_to_call`
  - **Book consultation button clicks:** Create trigger for clicks on book consultation CTAs → fire GA4 event `book_consultation_click`

- [ ] **Step 5: Install Meta Pixel via GTM:**
  - Create Custom HTML tag with Meta Pixel base code
  - Trigger: All Pages
  - Add PageView event
  - Add Lead event on form submission trigger

- [ ] **Step 6: Install Microsoft Clarity:**
  - Create Clarity project at clarity.microsoft.com
  - Add Clarity tracking code as Custom HTML tag in GTM
  - Trigger: All Pages

- [ ] **Step 7: Verify** — use GTM Preview mode, visit site, confirm GA4 tag fires, confirm Clarity recording starts, confirm Meta Pixel fires (use Meta Pixel Helper Chrome extension).

---

## Phase 2: Core Pages

### Task 7: Homepage

- [ ] **Step 1: Create page** — Pages > Add New, title "Home", template "Elementor Full Width"

- [ ] **Step 2: Build Hero Section (Dark):**
  - Section: 100vh height, background video (upload muted .mp4 kitchen reveal video), fallback image
  - Background overlay: `#0A0A0A` at 40% opacity
  - Content (centered, vertical align middle):
    - Text widget: `LUXURY KITCHEN DESIGN & CUSTOM CABINETRY` (Montserrat, 500, 14px, uppercase, letter-spacing 3px, color `#C9A96E`)
    - Heading H1: `Where Vision Meets Craftsmanship` (Playfair Display, 700, 72px desktop / 40px mobile, color `#FFFFFF`)
    - Text widget: `Serving San Diego, Los Angeles & Orange County` (Montserrat, 400, 18px, color `#E8E4DF`)
    - Spacer: 30px
    - Two buttons inline:
      - `BOOK A CONSULTATION` → `/book-consultation/` (gold primary CTA)
      - `VIEW OUR WORK` → `/portfolio/` (white outline, class `btn-dark-section`)
    - Icon widget at bottom: chevron-down, color white, size 30px, class `scroll-chevron`, position absolute bottom 40px
  - Entrance animation: Fade In, 0.6s delay

- [ ] **Step 3: Build Intro Strip (Warm White):**
  - Section: background `#FAF8F5`, padding 80px top/bottom
  - Inner section (boxed 1140px):
    - Text widget: 2-3 sentence intro about Inplace Studio (Montserrat, 400, 18px, centered, color `#6B6560`)
    - Spacer: 40px
    - 4-column row with Counter widgets:
      - `[X]+` Years Experience | `[X]+` Kitchens Completed | `3` Counties Served | `5` Premium Suppliers
      - Counter: number = Playfair Display 600 42px `#0A0A0A`, suffix text = Montserrat 400 15px `#6B6560`
  - Entrance animation: Fade In Up, staggered 0.2s

- [ ] **Step 4: Build Portfolio Preview (Dark):**
  - Section: background `#0A0A0A`, padding 100px top/bottom
  - Add class `section-divider-dark-to-light` for angled transition
  - H2: `Our Recent Projects` (centered, Playfair Display, `#FFFFFF`)
  - Subtext: `Crafting extraordinary kitchens across Southern California` (Montserrat, `#6B6560`)
  - Spacer: 50px
  - 3-column grid (2 rows = 6 items):
    - Each: Image widget with project photo, class `portfolio-item`
    - HTML widget overlay div with project name + location (use CSS from Task 2)
    - Each image links to project page
  - CTA below: `EXPLORE FULL PORTFOLIO` → `/portfolio/` (class `btn-dark-section`)
  - Entrance animation: Fade In Up, staggered

- [ ] **Step 5: Build Services Overview (Warm White):**
  - Section: background `#FAF8F5`, padding 100px top/bottom
  - H2: `What We Do` (centered)
  - 3-column row with Icon Box widgets:
    - **Custom Cabinetry:** icon (cabinet/door icon from Elementor icons or upload SVG), title, 2-sentence description, link to `/services/custom-cabinetry/`
    - **Kitchen Design:** icon (pencil-ruler or compass), title, description, link to `/services/kitchen-design/`
    - **Kitchen Remodeling:** icon (hammer/wrench), title, description, link to `/services/kitchen-remodeling/`
  - Icon Box styling: icon color `#C9A96E` 50px, title Montserrat 600 22px `#0A0A0A`, description Montserrat 400 16px `#6B6560`
  - Entrance animation: Fade In Up

- [ ] **Step 6: Build Supplier Logos (Dark):**
  - Section: background `#0A0A0A`, padding 60px top/bottom
  - H2: `Our Partners` (centered, `#FFFFFF`)
  - Image Carousel or 5-column row:
    - Upload white/light versions of logos: SieMatic, Woodmode, Renzo Restelli, Signature Custom Cabinetry, [Local Custom]
    - Each logo: max-height 60px, grayscale filter, hover: no filter + scale(1.05)
    - Link each logo to `/suppliers/`
  - Text below: `We work exclusively with the world's finest cabinetry manufacturers` (centered, Montserrat, `#6B6560`, italic)

- [ ] **Step 7: Build Process Preview (Warm White):**
  - Section: background `#FAF8F5`, padding 100px top/bottom
  - H2: `How We Work` (centered)
  - 5-column row (Icon Box or custom layout):
    - Each step: number (Playfair Display 38px `#C9A96E`), title (Montserrat 600 18px), description (Montserrat 400 14px)
    - Steps: 1. Consultation → 2. Design → 3. Proposal → 4. Build → 5. Installation
    - Connecting line between steps (use border-bottom on a divider or SVG line)
  - CTA: `LEARN MORE ABOUT OUR PROCESS` → `/process/` (class `btn-secondary`)
  - Entrance animation: Fade In Up, staggered

- [ ] **Step 8: Build Testimonial Slider (Dark):**
  - Section: background `#0A0A0A`, padding 100px top/bottom
  - Testimonials Carousel widget (Elementor Pro):
    - 3 testimonials with: quote text, client name, location (e.g., "La Jolla, San Diego"), project type
    - Quote text: Playfair Display, 400 italic, 26px, `#FFFFFF`
    - Client name: Montserrat, 600, 16px, `#C9A96E`
    - Star rating: icon list with 5 gold stars above quote
    - Navigation: dots, color `#C9A96E`
    - Autoplay: yes, 5000ms interval

- [ ] **Step 9: Insert CTA Banner template** (created in Task 5) before footer.

- [ ] **Step 10: Configure SEO via RankMath:**
  - Title: `Luxury Kitchen Design & Custom Cabinetry | Inplace Studio`
  - Meta description: `Inplace Studio crafts luxury custom kitchens with SieMatic, Woodmode & more. Serving San Diego, Los Angeles & Orange County. Book your free consultation today.`
  - Schema: LocalBusiness (auto from RankMath global settings)
  - Open Graph image: hero image or studio logo

- [ ] **Step 11: Set as homepage** — Settings > Reading > Static page > Homepage = "Home"

- [ ] **Step 12: Test** — preview on desktop, tablet, mobile. Check all animations fire, all links work, video plays muted, CTA buttons link correctly.

---

### Task 8: About Page

- [ ] **Step 1: Create page** — title "About", slug `/about/`, template "Elementor Full Width"

- [ ] **Step 2: Build Hero (Dark):**
  - Section: min-height 60vh, background image (showroom or team photo), overlay `#0A0A0A` 50%
  - Centered content: H1 `The Inplace Studio Story` (Playfair Display, `#FFFFFF`)
  - Entrance animation: Fade In

- [ ] **Step 3: Build Story Section (Warm White):**
  - Section: background `#FAF8F5`, padding 100px top/bottom
  - 2-column row (55% text / 45% image):
    - Left: H2 `Our Philosophy`, then 3-4 paragraphs about founding story, design approach, made-to-order commitment, what sets Inplace apart
    - Right: Image widget — showroom interior or owners photo, border-radius 0, box-shadow subtle
  - Entrance animation: Fade In Up

- [ ] **Step 4: Build Team Section (Warm White):**
  - Section: background `#FFFFFF`, padding 80px top/bottom
  - H2: `Meet the Team` (centered)
  - 4-column row:
    - Each column: Image (team member photo) with class `team-member`, below: Name (Montserrat 600 20px), Role (Montserrat 400 15px `#6B6560`)
    - HTML overlay div with brief bio text (uses CSS from Task 2)
    - Members: Nikita (Owner/Estimating), Sarjit (Owner/Sales), Celeste (Designer), Fernando (Project Manager)

- [ ] **Step 5: Build Values Section (Dark):**
  - Section: background `#0A0A0A`, padding 80px top/bottom
  - 3-column row with Icon Box widgets:
    - Craftsmanship | Collaboration | Excellence
    - Icon: relevant icon, color `#C9A96E`, 50px
    - Title: Montserrat 600 22px `#FFFFFF`
    - Description: Montserrat 400 16px `#6B6560`

- [ ] **Step 6: Insert CTA Banner template.**

- [ ] **Step 7: Configure RankMath SEO:**
  - Title: `About Inplace Studio | Luxury Kitchen Design Team`
  - Meta description: `Meet the team behind Inplace Studio. We design and build luxury custom kitchens with premium suppliers for homeowners across Southern California.`

- [ ] **Step 8: Test** on all viewports.

---

### Task 9: Portfolio Page & Project Template

- [ ] **Step 1: Create Portfolio hub page** — title "Portfolio", slug `/portfolio/`, template "Elementor Full Width"

- [ ] **Step 2: Build Hero (Dark):**
  - Section: min-height 50vh, background `#0A0A0A`
  - H1: `Our Work` (centered, `#FFFFFF`)
  - Subtext: `Explore our collection of custom kitchen designs` (`#6B6560`)

- [ ] **Step 3: Build Portfolio Grid (Warm White):**
  - Section: background `#FAF8F5`, padding 80px top/bottom
  - **Option A (simple):** Use Elementor Gallery widget in masonry layout, 3 columns, link each image to the project page manually
  - **Option B (filterable):** Use Elementor Posts widget with custom post type "Portfolio" (requires setup — see Step 4)
  - Each item: image, hover overlay with project name + location (CSS from Task 2)

- [ ] **Step 4: Create Portfolio custom post type** (if using filterable approach):
  - Install "Custom Post Type UI" plugin (free)
  - Create post type: `portfolio`, slug `portfolio`, supports: title, editor, thumbnail, custom fields
  - Create taxonomies: `project_style` (Modern, Traditional, Transitional), `project_supplier` (SieMatic, Woodmode, etc.), `project_county` (San Diego, Los Angeles, Orange County)
  - Build filter bar using Elementor's Posts widget taxonomy filters or a third-party filterable gallery plugin

- [ ] **Step 5: Create Individual Project page template:**
  Go to Elementor > Theme Builder > Single Post > Add New
  Condition: Portfolio (custom post type)

  Layout:
  - Hero: Full-width featured image, min-height 60vh, overlay `#0A0A0A` 30%
  - Project details bar (Warm White, padding 40px):
    - 4-column row: Location | Style | Supplier | Scope (use custom fields or ACF)
    - Each: label (Montserrat 600 13px uppercase `#C9A96E`) + value (Montserrat 400 17px `#0A0A0A`)
  - Description section: post content area
  - Image gallery: Elementor Gallery widget in masonry layout, lightbox enabled
  - Before/After section (optional): use "BEA - Before After Image Slider" plugin or Elementor Image Comparison widget
  - Navigation: Previous/Next post links
  - CTA: `Love this design? Book a consultation` → `/book-consultation/` (gold CTA)

- [ ] **Step 6: Add 6+ portfolio projects** as portfolio posts with:
  - Title, featured image, project photos gallery, description
  - Tagged with style, supplier, county taxonomies
  - SEO per project: `[Project Name] Kitchen Design in [Location] | Inplace Studio`

- [ ] **Step 7: Configure RankMath for portfolio hub:**
  - Title: `Kitchen Design Portfolio | Inplace Studio`
  - Meta description: `Browse our portfolio of luxury custom kitchens. From modern to traditional, see how Inplace Studio transforms homes across Southern California.`

- [ ] **Step 8: Test** — grid displays, filters work, project pages load, lightbox opens, navigation between projects works.

---

### Task 10: Service Pages (3 Pages)

- [ ] **Step 1: Create 3 pages:**
  - "Custom Cabinetry" — slug `/services/custom-cabinetry/`
  - "Kitchen Design" — slug `/services/kitchen-design/`
  - "Kitchen Remodeling" — slug `/services/kitchen-remodeling/`
  - All template "Elementor Full Width"
  - Note: Create a parent page "Services" with slug `/services/` first, set each as child page

- [ ] **Step 2: Build shared layout for each (repeat per page with unique content):**

  **Hero (Dark):**
  - Min-height 60vh, background image specific to service, overlay `#0A0A0A` 50%
  - H1: service name (e.g., `Custom Cabinetry`) — Playfair Display, `#FFFFFF`
  - Subtext: brief tagline (e.g., `Handcrafted to your exact specifications`)

  **Content (Warm White):**
  - Section: background `#FAF8F5`, padding 100px top/bottom
  - 2-column layout (60% text / 40% image):
    - H2: `What We Offer` or service-specific heading
    - 3-4 paragraphs explaining the service, what's included, Inplace Studio's approach
    - Bullet points or icon list of key features
    - Right: image gallery (2-3 stacked images)

  **FAQ Section (Warm White):**
  - Section: background `#FFFFFF`, padding 80px top/bottom
  - H2: `Frequently Asked Questions`
  - Elementor Accordion widget: 5-6 FAQs per service
  - Style: title Montserrat 600 17px, content Montserrat 400 16px `#6B6560`, active title color `#C9A96E`
  - RankMath: enable FAQ schema for this section (add via RankMath content editor)

  **Related Projects (Dark):**
  - Section: background `#0A0A0A`, padding 80px top/bottom
  - H2: `Related Projects` (`#FFFFFF`)
  - 3-column grid: 3 portfolio items filtered to this service category
  - Use Elementor Posts widget filtered by taxonomy, or manually place images linking to project pages

  **CTA Banner** (insert template from Task 5)

- [ ] **Step 3: Configure RankMath SEO per page:**
  - Custom Cabinetry: `Custom Cabinetry Southern California | Inplace Studio` / meta: `Handcrafted custom cabinets from SieMatic, Woodmode & more. Made-to-order for your kitchen. Serving San Diego, LA & Orange County.`
  - Kitchen Design: `Luxury Kitchen Design | Inplace Studio` / meta: `Full-service luxury kitchen design from concept to installation. Premium suppliers, expert designers. Book your consultation today.`
  - Kitchen Remodeling: `Kitchen Remodeling San Diego, LA & Orange County | Inplace Studio` / meta: `Complete kitchen remodeling with custom cabinetry and premium materials. Transform your kitchen with Inplace Studio.`

- [ ] **Step 4: Test** all 3 pages on all viewports. Verify FAQ accordion works, schema shows in RankMath preview.

---

### Task 11: Suppliers Page

- [ ] **Step 1: Create page** — title "Suppliers", slug `/suppliers/`, template "Elementor Full Width"

- [ ] **Step 2: Build Hero (Dark):**
  - Min-height 50vh, background `#0A0A0A`
  - H1: `Our Partners` (centered, `#FFFFFF`)
  - Subtext: `We work exclusively with the world's finest cabinetry manufacturers` (`#6B6560`)

- [ ] **Step 3: Build Supplier Sections (Warm White, alternating):**
  For each of the 5 suppliers, create a section:

  - Section: background alternating `#FAF8F5` and `#FFFFFF`, padding 80px top/bottom
  - 2-column row (alternating image left/right per supplier):
    - **Column 1:** Supplier logo (max-height 50px) + H3 supplier name + 2-3 sentence description + product highlights (door styles, finishes, materials)
    - **Column 2:** 2-3 project photos using that supplier (Gallery widget or image grid)

  Suppliers:
  1. SieMatic (image left)
  2. Woodmode (image right)
  3. Renzo Restelli (image left)
  4. Signature Custom Cabinetry (image right)
  5. Locally Produced Custom (image left)

  Entrance animation: Fade In Up per section

- [ ] **Step 4: Insert CTA Banner template.**

- [ ] **Step 5: Configure RankMath:**
  - Title: `Premium Cabinet Suppliers | SieMatic, Woodmode & More | Inplace Studio`
  - Meta description: `Inplace Studio partners with SieMatic, Woodmode, Renzo Restelli & Signature Custom Cabinetry to deliver the finest custom kitchens in Southern California.`

- [ ] **Step 6: Test** on all viewports.

---

### Task 12: Process Page

- [ ] **Step 1: Create page** — title "Process", slug `/process/`, template "Elementor Full Width"

- [ ] **Step 2: Build Hero (Dark):**
  - Min-height 50vh, background image (team at work or design rendering), overlay `#0A0A0A` 50%
  - H1: `From Vision to Reality` (`#FFFFFF`)
  - Subtext: `Our proven process ensures every detail is perfect`

- [ ] **Step 3: Build Timeline (Alternating Dark/Light):**
  6 sections, alternating backgrounds (`#0A0A0A` and `#FAF8F5`):

  Each section: padding 80px top/bottom, 2-column row (alternating left/right):

  **Step 1 — Free Consultation (Dark):**
  - Left: Step number `01` (Playfair Display, 80px, `#C9A96E`), H3 `Free Consultation`, description paragraph: "Visit our showroom to share your vision. We'll discuss your style preferences, budget, timeline, and how we can bring your dream kitchen to life."
  - Right: Relevant photo (showroom meeting)
  - Text colors: `#FFFFFF` for heading, `#6B6560` for body

  **Step 2 — Site Measurement (Light):**
  - Left: Photo (measuring tape, site visit)
  - Right: `02`, H3 `Site Measurement`, description: "Our team visits your home for precise measurements. Every inch matters when crafting custom cabinetry that fits perfectly."
  - Text colors: `#0A0A0A` for heading, `#6B6560` for body

  **Step 3 — Design & Selection (Dark):**
  - Left: `03`, H3 `Design & Selection`, description: "Our designers create detailed 3D renderings of your kitchen. Select materials, finishes, hardware, and door styles from our premium suppliers."
  - Right: Photo (3D rendering or material samples)

  **Step 4 — Proposal & Contract (Light):**
  - Left: Photo (proposal document or handshake)
  - Right: `04`, H3 `Proposal & Contract`, description: "Receive a detailed proposal with transparent pricing. Once approved, we finalize the contract and begin your project."

  **Step 5 — Manufacturing & Delivery (Dark):**
  - Left: `05`, H3 `Manufacturing & Delivery`, description: "Your cabinets are handcrafted to order by our premium suppliers. We coordinate delivery and keep you updated throughout the process."
  - Right: Photo (factory or delivery)

  **Step 6 — Installation & Walkthrough (Light):**
  - Left: Photo (installation in progress or finished kitchen)
  - Right: `06`, H3 `Installation & Walkthrough`, description: "Expert installers bring it all together. We conduct a final walkthrough to ensure every detail meets your expectations."

  Each section: Entrance animation Fade In Up, 0.4s

- [ ] **Step 4: Insert CTA Banner template.**

- [ ] **Step 5: Configure RankMath:**
  - Title: `Our Kitchen Design Process | Inplace Studio`
  - Meta description: `From consultation to installation — learn how Inplace Studio transforms your kitchen vision into reality in 6 simple steps.`

- [ ] **Step 6: Test** on all viewports. Check alternating layout reads well on mobile (stacks vertically).

---

### Task 13: Testimonials Page

- [ ] **Step 1: Create page** — title "Testimonials", slug `/testimonials/`, template "Elementor Full Width"

- [ ] **Step 2: Build Hero (Dark):**
  - Min-height 50vh, background `#0A0A0A`
  - H1: `What Our Clients Say` (centered, `#FFFFFF`)

- [ ] **Step 3: Build Testimonials Grid (Warm White):**
  - Section: background `#FAF8F5`, padding 80px top/bottom
  - 2-column or 3-column grid of testimonial cards:
    - Each card: background `#FFFFFF`, padding 40px, box-shadow `0 2px 15px rgba(0,0,0,0.05)`
    - Star rating: 5 gold star icons (Icon List widget, color `#C9A96E`)
    - Quote: Montserrat 400 16px italic `#6B6560`
    - Divider: 40px wide, 2px, color `#C9A96E`
    - Client name: Montserrat 600 16px `#0A0A0A`
    - Location: Montserrat 400 14px `#6B6560` (e.g., "La Jolla, San Diego")
    - Project photo thumbnail (small, optional)
  - Add 6-12 testimonials

- [ ] **Step 4: Build Trust Signals section:**
  - Section: background `#FFFFFF`, padding 40px top/bottom, centered
  - Badges/widgets: Google Reviews badge, Houzz badge (use embed code from each platform)
  - Text: `Rated 5 stars on Google and Houzz` (Montserrat, `#6B6560`)

- [ ] **Step 5: Insert CTA Banner template.**

- [ ] **Step 6: Configure RankMath:**
  - Title: `Client Testimonials | Inplace Studio`
  - Meta description: `See what our clients say about their luxury kitchen transformations. Rated 5 stars across San Diego, Los Angeles & Orange County.`
  - Schema: add Review schema for each testimonial (RankMath > Schema > Review)

- [ ] **Step 7: Test** on all viewports.

---

### Task 14: Contact / Book Consultation Page

- [ ] **Step 1: Create page** — title "Book Consultation", slug `/book-consultation/`, template "Elementor Full Width"
  - Also create a redirect: `/contact/` → `/book-consultation/` (via RankMath Redirections)

- [ ] **Step 2: Build Hero (Dark):**
  - Min-height 40vh, background `#0A0A0A`
  - H1: `Let's Build Your Dream Kitchen` (centered, `#FFFFFF`)
  - Subtext: `Book your free consultation and take the first step` (`#6B6560`)

- [ ] **Step 3: Build Two-Column Layout (Warm White):**
  - Section: background `#FAF8F5`, padding 80px top/bottom
  - 2-column row (55% / 45%):

  **Left column — Form:**
  - H3: `Book Your Free Consultation`
  - Embed GHL booking form using HTML widget:
    ```html
    <iframe src="https://app.gohighlevel.com/widget/booking/[YOUR-CALENDAR-ID]"
      style="width:100%;height:700px;border:none;overflow:hidden;"
      scrolling="no">
    </iframe>
    ```
  - Or use GHL form embed (depending on GHL setup — form fields: name, email, phone, project type dropdown, county dropdown, budget range dropdown, message textarea)

  **Right column — Contact Info:**
  - H3: `Visit Our Showroom`
  - Icon List widget:
    - Map pin icon: [Full showroom address]
    - Phone icon: [Phone number] (click-to-call link)
    - Email icon: [Email address] (mailto link)
    - Clock icon: Business hours (Mon-Fri 9am-6pm, Sat 10am-4pm, Sun by appointment)
  - Spacer: 30px
  - Google Maps embed (HTML widget):
    ```html
    <iframe src="https://www.google.com/maps/embed?pb=[YOUR-EMBED-CODE]"
      width="100%" height="300" style="border:0;" allowfullscreen loading="lazy">
    </iframe>
    ```

- [ ] **Step 4: Build Showroom Gallery:**
  - Section: background `#FFFFFF`, padding 60px top/bottom
  - 3-column image row: 3 showroom photos, rounded corners 0, box-shadow subtle

- [ ] **Step 5: Configure RankMath:**
  - Title: `Book a Free Kitchen Design Consultation | Inplace Studio`
  - Meta description: `Schedule your free consultation with Inplace Studio. Visit our showroom or book online. Serving San Diego, Los Angeles & Orange County.`

- [ ] **Step 6: Test** — form loads, map renders, phone link works on mobile, form submission reaches GHL pipeline.

---

## Phase 3: SEO Location Pages

### Task 15: Location Page Template & 9 Pages

- [ ] **Step 1: Create the first location page as the master template:**
  Page: "Kitchen Design San Diego", slug `/kitchen-design-san-diego/`, template "Elementor Full Width"

- [ ] **Step 2: Build location page layout:**

  **Hero (Dark):**
  - Min-height 50vh, background: local kitchen project photo from San Diego, overlay `#0A0A0A` 50%
  - H1: `Luxury Kitchen Design in San Diego` (Playfair Display, `#FFFFFF`)
  - Subtext: `Serving La Jolla, Del Mar, Rancho Santa Fe, Coronado & beyond`

  **Content (Warm White):**
  - Section: background `#FAF8F5`, padding 80px top/bottom
  - H2: `San Diego's Premier Kitchen Design Studio`
  - 800+ words unique content covering:
    - Why San Diego homeowners choose Inplace Studio
    - Local neighborhoods served (La Jolla, Del Mar, Rancho Santa Fe, Coronado, Encinitas, Carlsbad)
    - Types of projects done in the area
    - References to local architecture styles, local building codes/permits if relevant
    - Natural keyword usage: "kitchen design san diego", "custom cabinets san diego", "luxury kitchen san diego"

  **Local Projects (Dark):**
  - Section: background `#0A0A0A`, padding 80px top/bottom
  - H2: `Our San Diego Projects` (`#FFFFFF`)
  - 3-4 portfolio items from San Diego (image grid linking to project pages)

  **Local Testimonials (Warm White):**
  - Section: background `#FFFFFF`, padding 60px top/bottom
  - 2-3 testimonial cards from San Diego clients (same card style as Task 13)

  **FAQ Section (Warm White):**
  - Section: background `#FAF8F5`, padding 60px top/bottom
  - H2: `Kitchen Design FAQs — San Diego`
  - Accordion with 5-6 local FAQs:
    - "How much does a custom kitchen cost in San Diego?"
    - "Do you serve La Jolla and Rancho Santa Fe?"
    - "How long does a kitchen remodel take in San Diego?"
    - "Do I need a permit for kitchen remodeling in San Diego?"
    - "Can I visit your showroom for a consultation?"
  - Enable FAQ schema via RankMath

  **Service Area Map:**
  - Google Maps embed centered on San Diego County with service area highlighted

  **Neighborhood List:**
  - 3-column list of neighborhoods served (text, no links needed)

  **CTA Banner** (insert template from Task 5)

  **Consultation Form:**
  - Embed GHL booking form (same as Task 14) below CTA or as part of CTA section

- [ ] **Step 3: Configure RankMath:**
  - Title: `Kitchen Design San Diego | Luxury Custom Kitchens | Inplace Studio`
  - Meta description: `Inplace Studio designs luxury custom kitchens in San Diego. SieMatic, Woodmode & more. Serving La Jolla, Del Mar, Rancho Santa Fe. Book your free consultation.`
  - Schema: LocalBusiness + FAQ

- [ ] **Step 4: Save as Elementor template** for reuse.

- [ ] **Step 5: Create remaining 8 location pages** using the template, with UNIQUE content for each:

  | Page | Slug | H1 | Key Neighborhoods |
  |------|------|----|-------------------|
  | Kitchen Design LA | `/kitchen-design-los-angeles/` | `Luxury Kitchen Design in Los Angeles` | Beverly Hills, Santa Monica, Malibu, Pacific Palisades, Brentwood, Pasadena |
  | Kitchen Design OC | `/kitchen-design-orange-county/` | `Luxury Kitchen Design in Orange County` | Newport Beach, Laguna Beach, Irvine, Dana Point, Huntington Beach, Yorba Linda |
  | Custom Cabinetry SD | `/custom-cabinetry-san-diego/` | `Custom Cabinetry in San Diego` | Same SD neighborhoods |
  | Custom Cabinetry LA | `/custom-cabinetry-los-angeles/` | `Custom Cabinetry in Los Angeles` | Same LA neighborhoods |
  | Custom Cabinetry OC | `/custom-cabinetry-orange-county/` | `Custom Cabinetry in Orange County` | Same OC neighborhoods |
  | Kitchen Remodeling SD | `/kitchen-remodeling-san-diego/` | `Kitchen Remodeling in San Diego` | Same SD neighborhoods |
  | Kitchen Remodeling LA | `/kitchen-remodeling-los-angeles/` | `Kitchen Remodeling in Los Angeles` | Same LA neighborhoods |
  | Kitchen Remodeling OC | `/kitchen-remodeling-orange-county/` | `Kitchen Remodeling in Orange County` | Same OC neighborhoods |

  **Each page MUST have:**
  - Unique 800+ word copy (not duplicated — Google penalizes duplicate content)
  - Local project photos from that area
  - Local testimonials
  - Area-specific FAQ questions
  - Correct map embed for that county
  - Unique title tag and meta description

- [ ] **Step 6: Configure RankMath for all 9 pages** with unique title/meta per page.

- [ ] **Step 7: Add internal links** from each location page to:
  - Related service pages
  - Portfolio hub
  - Book consultation
  - Other location pages in same county (cross-link cabinetry ↔ design ↔ remodeling)

- [ ] **Step 8: Test** all 9 pages on all viewports. Verify unique content, maps load, forms work, schema validates (use Google Rich Results Test).

---

## Phase 4: Blog & Content

### Task 16: Blog Setup & Initial Posts

- [ ] **Step 1: Create blog page** — Pages > Add New, title "Blog", slug `/blog/`
  - Settings > Reading > Posts page = "Blog"

- [ ] **Step 2: Create blog categories:**
  - Posts > Categories:
    - Design Trends
    - Kitchen Inspiration
    - Supplier Spotlights
    - Remodeling Tips
    - Local Projects

- [ ] **Step 3: Create blog single post template:**
  Elementor > Theme Builder > Single Post > Add New
  Condition: Posts

  Layout:
  - Hero: Featured image full width, overlay `#0A0A0A` 30%, H1 post title white
  - Content area: max-width 800px centered, Montserrat 400 17px, `#6B6560`
  - Sidebar (right, 30%): Author bio, categories, CTA widget (`BOOK CONSULTATION` gold button), recent posts
  - Below content: Related posts (3-column grid)
  - CTA Banner template

- [ ] **Step 4: Create blog archive template:**
  Elementor > Theme Builder > Archive > Add New
  Condition: Posts Archive

  Layout:
  - Hero: background `#0A0A0A`, H1 `Kitchen Design Insights` (`#FFFFFF`)
  - Grid: 2-column or 3-column post grid with featured image, title, excerpt, category tag, read more link
  - Pagination at bottom

- [ ] **Step 5: Write and publish 4 initial blog posts** (one per category except Local Projects, which requires completed project content):

  **Post 1 — Design Trends:**
  - Title: `Kitchen Design Trends for 2026: What Southern California Homeowners Want`
  - 1200+ words, optimized for: "kitchen design trends 2026", "modern kitchen ideas"
  - Include: 3-5 images of trending kitchens, internal links to services pages

  **Post 2 — Remodeling Tips:**
  - Title: `How Much Does a Custom Kitchen Cost in San Diego?`
  - 1500+ words, optimized for: "custom kitchen cost san diego", "kitchen remodel cost"
  - Include: price ranges by tier, what affects cost, internal links to services + consultation

  **Post 3 — Supplier Spotlights:**
  - Title: `SieMatic vs Woodmode: Choosing the Right Premium Cabinet Brand`
  - 1200+ words, optimized for: "siematic vs woodmode", "best luxury cabinet brands"
  - Include: comparison table, pros/cons, internal links to suppliers page

  **Post 4 — Kitchen Inspiration:**
  - Title: `5 Stunning Modern Kitchens We Designed in Orange County`
  - 1000+ words, optimized for: "modern kitchen design orange county"
  - Include: project photos, brief descriptions, links to portfolio

- [ ] **Step 6: Configure RankMath per post** — unique title, meta description, focus keyword, internal links.

- [ ] **Step 7: Test** blog archive, single posts, sidebar CTA, related posts, mobile layout.

---

## Phase 5: Privacy, Integrations & Final SEO

### Task 17: Privacy Policy Page

- [ ] **Step 1: Create page** — title "Privacy Policy", slug `/privacy-policy/`, template "Default" (no Elementor needed)

- [ ] **Step 2: Write privacy policy** covering:
  - What data is collected (forms, cookies, analytics)
  - How data is used (lead follow-up, marketing)
  - Third-party services (Google Analytics, Meta Pixel, GoHighLevel, Clarity)
  - Cookie policy
  - User rights (CCPA compliance for California)
  - Contact information for privacy inquiries

- [ ] **Step 3: Publish.** Verify it's linked in the footer.

---

### Task 18: AI Chat Widget & GHL Integration

- [ ] **Step 1: Install AI chat widget:**
  - From GHL: get the chat widget embed code
  - Add to WordPress via Elementor > Site Settings > Custom Code > Body End, or via "Insert Headers and Footers" plugin in footer section
  - Widget should appear bottom-right on all pages

- [ ] **Step 2: Configure chat widget:**
  - Styling: match site aesthetic (dark background `#1A1A1A`, gold accent `#C9A96E`, white text)
  - Welcome message: "Hi! Welcome to Inplace Studio. How can we help you with your kitchen project?"
  - Lead capture fields: name, phone, email, project type

- [ ] **Step 3: Verify GHL pipeline integration:**
  - Submit test lead via chat widget
  - Submit test lead via booking form on `/book-consultation/`
  - Confirm both create contacts in GHL Pipeline Stage 1
  - Confirm speed-to-lead automations trigger (SMS + email within 60 seconds)

- [ ] **Step 4: Test chat widget** on desktop and mobile — doesn't overlap with content, opens/closes smoothly.

---

### Task 19: Smash Balloon Instagram Feed

- [ ] **Step 1: Configure Smash Balloon:**
  - Connect Inplace Studio Instagram account
  - Create feed: grid layout, 3x2 (6 photos), no header, no "load more" button
  - Styling: hover overlay with gold tint, match site aesthetic

- [ ] **Step 2: Add Instagram feed to homepage** (optional — between testimonials and CTA banner):
  - Section: background `#FAF8F5`, padding 60px
  - H2: `Follow Our Work` (centered)
  - Instagram feed shortcode below
  - Link to Instagram profile

- [ ] **Step 3: Test** — feed loads, images display, links to Instagram posts.

---

### Task 20: Final SEO Configuration & Submission

- [ ] **Step 1: Verify all pages have RankMath SEO configured:**
  Go through every page and confirm:
  - Unique title tag (under 60 chars)
  - Unique meta description (under 155 chars)
  - Focus keyword set
  - H1 present and contains primary keyword
  - Internal links to at least 2-3 other pages
  - Alt text on every image
  - Open Graph image set

- [ ] **Step 2: Configure RankMath sitemap:**
  - RankMath > Sitemap Settings
  - Include: Pages, Posts, Portfolio (custom post type)
  - Exclude: attachment pages, author archives
  - Verify sitemap at `inplacestudio.com/sitemap_index.xml`

- [ ] **Step 3: Submit to Google Search Console:**
  - Verify domain ownership in GSC
  - Submit sitemap URL
  - Request indexing for homepage + key pages

- [ ] **Step 4: Configure robots.txt:**
  Edit via RankMath > General Settings > Edit robots.txt:
  ```
  User-agent: *
  Allow: /
  Disallow: /wp-admin/
  Disallow: /wp-login.php
  Disallow: /cart/
  Disallow: /checkout/
  Sitemap: https://inplacestudio.com/sitemap_index.xml
  ```

- [ ] **Step 5: Set up Google Business Profiles:**
  - Verify/optimize GBP for each service area (San Diego, LA, Orange County)
  - Consistent NAP across all profiles
  - Add photos, business hours, service categories (Kitchen Designer, Cabinet Store, Kitchen Remodeler)
  - Link each profile to corresponding location pages
  - Schedule first week of Google Business posts

- [ ] **Step 6: Create RankMath redirections** for any old URLs (if migrating from existing site):
  - RankMath > Redirections
  - 301 redirect any old URLs to new equivalents
  - Set up 404 monitor to catch broken links

- [ ] **Step 7: Run final SEO audit:**
  - RankMath SEO Analysis on every page — aim for 80+ score
  - Google PageSpeed Insights: test homepage, 1 service page, 1 location page
  - Target: Mobile 90+, Desktop 95+
  - Fix any issues: optimize images, reduce unused CSS, defer JS

- [ ] **Step 8: Submit location pages to Google for indexing** via GSC URL Inspection tool.

---

## Phase 6: Performance & Launch

### Task 21: Performance Optimization

- [ ] **Step 1: Image optimization:**
  - Run ShortPixel bulk optimization on all uploaded images
  - Verify WebP conversion is enabled
  - Check no image exceeds 200KB after compression
  - Confirm lazy loading is active (WP Rocket)

- [ ] **Step 2: Elementor optimization:**
  - Elementor > Settings > Performance:
    - Enable "Improved Asset Loading"
    - Enable "Improved CSS Loading"
    - Disable unused Elementor widgets (reduces CSS/JS)
  - Review each page: remove any unused sections or hidden widgets

- [ ] **Step 3: Font optimization:**
  - Preload Playfair Display and Montserrat via WP Rocket or custom `<link rel="preload">`
  - Use `font-display: swap` (Elementor does this by default with Google Fonts)

- [ ] **Step 4: Run Google PageSpeed Insights** on:
  - Homepage
  - 1 Service page
  - 1 Location page
  - 1 Portfolio project page
  - 1 Blog post
  
  Target scores:
  - Mobile: 90+
  - Desktop: 95+
  - LCP: under 2.5s
  - CLS: under 0.1

- [ ] **Step 5: Fix any performance issues** identified by PageSpeed. Common fixes:
  - Serve images in next-gen formats (ShortPixel WebP)
  - Eliminate render-blocking resources (WP Rocket defer JS)
  - Reduce unused CSS (WP Rocket remove unused CSS)
  - Preconnect to required origins (Google Fonts, GTM)

- [ ] **Step 6: Test on real devices** — iPhone, Android, iPad. Check:
  - Video hero plays/loads smoothly
  - Navigation hamburger works
  - Forms are usable on mobile
  - No horizontal scroll
  - Click-to-call works

---

### Task 22: Pre-Launch Checklist & Go Live

- [ ] **Step 1: Content review:**
  - All placeholder text replaced with real content
  - Counter stats updated with real numbers
  - All images are real project/team photos (no stock placeholders remaining)
  - All links work (run Broken Link Checker plugin or use Screaming Frog)
  - Phone numbers and email addresses correct
  - Showroom address correct

- [ ] **Step 2: Functionality check:**
  - GHL forms submit correctly and create pipeline contacts
  - Chat widget works and captures leads
  - Click-to-call links work on mobile
  - Google Maps embeds load
  - Instagram feed loads
  - Portfolio filters work
  - Lightbox gallery opens
  - All navigation links work including mobile menu
  - Footer links all work

- [ ] **Step 3: SEO final check:**
  - All pages have unique title + meta description
  - All images have alt text
  - Sitemap is valid and includes all pages
  - robots.txt is correct
  - Schema markup validates (test 3-4 pages at search.google.com/test/rich-results)
  - No noindex tags on pages that should be indexed
  - Canonical URLs are correct

- [ ] **Step 4: Security check:**
  - Wordfence scan passes
  - SSL active on all pages (no mixed content warnings)
  - WP admin uses strong password + 2FA
  - File permissions correct
  - XML-RPC disabled (Wordfence setting)
  - Login URL changed or protected (optional: WPS Hide Login plugin)

- [ ] **Step 5: Backup:**
  - UpdraftPlus: run full backup (database + files)
  - Download backup copy locally
  - Verify backup can be restored

- [ ] **Step 6: Go live:**
  - If on staging: point inplacestudio.com DNS to live server
  - Update WordPress Site URL and Home URL to `https://inplacestudio.com`
  - Clear all caches (WP Rocket, Cloudflare, browser)
  - Verify site loads on `https://inplacestudio.com`
  - Verify SSL, no mixed content
  - Submit updated sitemap to GSC
  - Request indexing for key pages

- [ ] **Step 7: Post-launch monitoring (first 48 hours):**
  - Check GSC for crawl errors
  - Check GA4 for traffic data flowing
  - Check Clarity for session recordings working
  - Check GHL for test lead submission
  - Monitor PageSpeed scores
  - Check all 3 Google Business Profiles link to correct pages

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | Tasks 1-6 | WordPress foundation, global design system, header/footer, GTM/analytics |
| 2 | Tasks 7-14 | All core pages: Home, About, Portfolio, Services (3), Suppliers, Process, Testimonials, Contact |
| 3 | Task 15 | 9 location landing pages with unique content |
| 4 | Task 16 | Blog setup + 4 initial posts |
| 5 | Tasks 17-20 | Privacy policy, chat widget, Instagram feed, final SEO config |
| 6 | Tasks 21-22 | Performance optimization, pre-launch checklist, go live |
