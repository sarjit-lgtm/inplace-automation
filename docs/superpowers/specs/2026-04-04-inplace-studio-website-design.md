# Inplace Studio Website Design Spec

## Overview

A premium, high-converting website for Inplace Studio (inplacestudio.com) — a luxury kitchen design studio and custom cabinetry provider serving San Diego, Los Angeles, and Orange County. The site combines a cinematic portfolio showcase with aggressive lead generation, all optimized for #1 local SEO rankings across three Southern California markets.

**Platform:** WordPress + Elementor Pro
**Aesthetic:** Hybrid — dark cinematic hero/transition sections + warm light content sections
**Inspiration:** PeachWeb.io (dark, animated, premium feel) adapted for luxury kitchen design
**Primary Goals:** Portfolio showcase + lead generation (book consultations via GHL integration)

---

## Site Architecture

```
inplacestudio.com/
├── / (Home)
├── /about/
├── /portfolio/
│   └── /portfolio/[project-name]/ (individual project pages)
├── /services/
│   ├── /services/custom-cabinetry/
│   ├── /services/kitchen-design/
│   └── /services/kitchen-remodeling/
├── /suppliers/
│   ├── /suppliers/siematic/
│   ├── /suppliers/woodmode/
│   ├── /suppliers/renzo-restelli/
│   └── /suppliers/signature-custom-cabinetry/
├── /process/
├── /testimonials/
├── /contact/
├── /book-consultation/
│
├── ## Location Landing Pages (SEO)
├── /kitchen-design-san-diego/
├── /kitchen-design-los-angeles/
├── /kitchen-design-orange-county/
├── /custom-cabinetry-san-diego/
├── /custom-cabinetry-los-angeles/
├── /custom-cabinetry-orange-county/
├── /kitchen-remodeling-san-diego/
├── /kitchen-remodeling-los-angeles/
├── /kitchen-remodeling-orange-county/
│
├── ## Blog
├── /blog/
│   └── /blog/[post-slug]/
│
├── /privacy-policy/
└── /sitemap.xml
```

**Total pages at launch:** ~30+ (Home, About, Portfolio hub, 6+ project pages, 3 service pages, 4 supplier pages, Process, Testimonials, Contact, Book Consultation, 9 location pages, Privacy Policy, initial blog posts)

---

## Visual Design System

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary Dark | `#0A0A0A` | Hero sections, dark transitions, nav background |
| Secondary Dark | `#1A1A1A` | Dark card backgrounds, footer |
| Warm White | `#FAF8F5` | Content section backgrounds |
| Pure White | `#FFFFFF` | Text on dark, card backgrounds |
| Accent Gold | `#C9A96E` | CTAs, highlights, hover states, luxury accent |
| Warm Gray | `#6B6560` | Body text on light sections |
| Light Gray | `#E8E4DF` | Borders, dividers, subtle backgrounds |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 (Hero) | Playfair Display | 700 | 64-80px |
| H2 (Section titles) | Playfair Display | 600 | 42-52px |
| H3 (Subtitles) | Montserrat | 500 | 24-32px |
| Body | Montserrat | 400 | 16-18px |
| CTA Buttons | Montserrat | 600 | 14px uppercase, letter-spacing 2px |
| Nav Links | Montserrat | 500 | 14px uppercase |

Both fonts available via Google Fonts in Elementor.

### Animation System

| Effect | Where | Implementation |
|--------|-------|----------------|
| Fade-up on scroll | All section entries | Elementor entrance animations, 0.4s ease |
| Parallax | Hero background, portfolio images | Elementor parallax settings |
| Smooth reveal | Text blocks, headings | Staggered fade-up, 0.2s delay between elements |
| Hover zoom | Portfolio grid items | CSS scale(1.05) on hover, 0.5s transition |
| Dark-to-light transitions | Between hero/dark and content/light sections | Angled or curved SVG dividers |
| Counter animation | Stats (years, projects completed) | Elementor counter widget |
| Video autoplay | Hero section | Muted, looping background video |

### Button Styles

| Type | Style |
|------|-------|
| Primary CTA | Gold `#C9A96E` background, black text, uppercase, 50px height, hover: darken to `#B8944F` |
| Secondary CTA | Transparent, gold border, gold text, hover: gold fill with black text |
| On dark sections | White border, white text, hover: white fill with black text |

---

## Page-by-Page Design

### Homepage

**Hero (Dark — Full Viewport 100vh)**
- Background: autoplay muted video loop of a stunning kitchen reveal (camera slowly panning across cabinetry)
- Dark overlay at 40% opacity
- Center-aligned text:
  - Subtitle: `LUXURY KITCHEN DESIGN & CUSTOM CABINETRY`
  - H1: `Where Vision Meets Craftsmanship`
  - Subtext: `Serving San Diego, Los Angeles & Orange County`
  - Two CTAs: `BOOK A CONSULTATION` (gold) + `VIEW OUR WORK` (white outline)
- Animated scroll-down chevron at bottom

**Intro Strip (Warm White)**
- Brief 2-3 sentence studio introduction
- Animated counter stats: `[X]+ Years Experience` | `[X]+ Kitchens Completed` | `3 Counties Served` | `5 Premium Suppliers` *(replace [X] with actual numbers)*

**Portfolio Preview (Dark)**
- H2: `Our Recent Projects`
- 3-column grid showing 6 best projects — hover zoom + project name overlay
- Each links to full project page
- CTA: `EXPLORE FULL PORTFOLIO`

**Services Overview (Warm White)**
- H2: `What We Do`
- 3 cards with icon + title + short description:
  - Custom Cabinetry
  - Kitchen Design
  - Kitchen Remodeling
- Each links to dedicated service page

**Supplier Logos (Dark)**
- H2: `Our Partners`
- Horizontal row of 5 supplier logos (white/light versions on dark background)
- Subtle hover: logo brightens, slight scale up
- Text: `We work exclusively with the world's finest cabinetry manufacturers`

**Process Preview (Warm White)**
- H2: `How We Work`
- Horizontal timeline or numbered steps (simplified 5-step version):
  1. Consultation → 2. Design → 3. Proposal → 4. Build → 5. Installation
- Each step: icon + brief description
- CTA: `LEARN MORE ABOUT OUR PROCESS`

**Testimonial Slider (Dark)**
- Large quote in Playfair Display italic
- Client name, location, project type
- Auto-rotating carousel, 3 testimonials
- Star ratings

**CTA Banner (Gold accent background)**
- `Ready to Transform Your Kitchen?`
- `BOOK YOUR FREE CONSULTATION` button
- Phone number click-to-call

**Footer (Dark #1A1A1A)**
- 4 columns: Navigation | Services | Service Areas | Contact Info
- Social media icons (Instagram, Houzz, Pinterest, Facebook)
- Google Business links for each county
- Copyright + Privacy Policy link

---

### About Page

**Hero (Dark)** — Full-width showroom/team image, H1: `The Inplace Studio Story`

**Story Section (Warm White)**
- Two-column: left = text (founding story, design philosophy, differentiators), right = image of owners/showroom
- Emphasis on: made-to-order, no inventory, every kitchen unique

**Team Section (Warm White)**
- Grid of team photos: Nikita (Owner/Estimating), Sarjit (Owner/Sales), Celeste (Designer), Fernando (Project Manager)
- Hover: brief bio overlay

**Values (Dark)** — 3 columns with icons: `Craftsmanship` | `Collaboration` | `Excellence`

**CTA Banner → Book Consultation**

---

### Portfolio Page

**Hero (Dark)** — H1: `Our Work`, subtitle: `Explore our collection of custom kitchen designs`

**Filter Bar (Warm White)** — Filter by: Style (Modern, Traditional, Transitional) | Supplier | County

**Masonry Grid** — each tile:
- Project hero image
- Hover overlay: project name, location, supplier
- Click → individual project page

**Individual Project Page Template:**
- Full-width hero image
- Project details sidebar: Location, Style, Supplier, Scope
- Full image gallery (lightbox enabled)
- Before/after slider (if applicable)
- Brief project description
- `NEXT PROJECT` / `PREVIOUS PROJECT` navigation
- CTA: `Love this design? Book a consultation`

---

### Service Pages (3 pages — shared template)

**Hero (Dark)** — service-specific image + H1 (e.g., `Custom Cabinetry`)

**Content (Warm White)** — what this service includes, why Inplace Studio, image gallery

**FAQ (Warm White)** — accordion style, schema-marked for SEO

**Related Projects (Dark)** — 3-column grid filtered to this service

**CTA Banner → Book Consultation**

---

### Supplier Pages (4 pages — shared template)

**Hero (Dark)** — supplier logo prominent + tagline

**Content (Warm White)** — about the supplier, why Inplace partners with them, product range (door styles, finishes, materials), project gallery using this supplier

**CTA: `Design with [Supplier Name]` → Book Consultation**

---

### Process Page

**Hero (Dark)** — H1: `From Vision to Reality`

**Timeline (Alternating Dark/Light)** — 6 steps, vertical layout, alternating left/right:
1. **Free Consultation** — meet at showroom, discuss vision
2. **Site Measurement** — precise measurements at your home
3. **Design & Selection** — 3D renderings, material selection
4. **Proposal & Contract** — transparent pricing, clear timeline
5. **Manufacturing & Delivery** — made-to-order by suppliers
6. **Installation & Walkthrough** — expert install, final inspection

Each step: icon, title, description, relevant photo. Scroll-triggered entrance animations.

**CTA Banner → Book Consultation**

---

### Testimonials Page

**Hero (Dark)** — H1: `What Our Clients Say`

**Grid (Warm White)** — cards: quote, client name, location, star rating, project photo thumbnail. Filterable by county.

**Trust Signals** — Google/Houzz review badges embedded

**CTA Banner → Book Consultation**

---

### Contact / Book Consultation Page

**Hero (Dark)** — H1: `Let's Build Your Dream Kitchen`

**Two-Column (Warm White)**
- Left: GHL booking form (name, email, phone, project type, county, budget range, message)
- Right: showroom address + Google Map embed, phone (click-to-call), email, business hours

**Showroom Photos** — 3-image gallery

---

### Location Landing Pages (9 pages — shared template, unique content)

**Hero (Dark)** — H1: `Luxury Kitchen Design in [County]`, subtitle with neighborhood mentions

**Content (Warm White)** — 800+ words unique copy per page:
- Local references, neighborhoods served, local projects completed
- "Why [County] Homeowners Choose Inplace Studio"
- Local project showcase: 3-4 portfolio items from that area
- Local testimonials from that county
- FAQ with local keywords (schema markup)
- Embedded Google Map centered on service area
- Neighborhood list (e.g., San Diego: La Jolla, Del Mar, Rancho Santa Fe, Coronado, Encinitas, Carlsbad)

**CTA → Book Consultation**

---

### Blog

- Standard WordPress blog layout
- Categories: Design Trends, Kitchen Inspiration, Supplier Spotlights, Remodeling Tips, Local Projects
- Each post optimized for long-tail SEO keywords
- Related posts widget, CTA in sidebar
- Frequency: 2-4 posts/month

---

## SEO Strategy

### Technical SEO

| Element | Implementation |
|---------|---------------|
| Plugin | RankMath Pro |
| Site speed | WP Rocket caching, ShortPixel image compression, Cloudflare CDN |
| Core Web Vitals | Lazy load images, preload critical CSS/fonts, minimize Elementor bloat |
| Schema markup | LocalBusiness on every page, FAQ on service/location pages, Review on testimonials |
| XML Sitemap | Auto-generated via RankMath, submitted to Google Search Console |
| Robots.txt | Proper crawl directives, block admin/staging |
| SSL | HTTPS enforced sitewide |
| Mobile | Fully responsive, mobile-first on all pages |
| URL structure | Clean slugs, no dates, logical hierarchy |

### Local SEO — Per County

**Google Business Profiles:** Optimized listing per county with weekly posts, photos, and consistent NAP (Name, Address, Phone).

**Citations:** Houzz, Yelp, BBB, Angi, HomeAdvisor, local directories — consistent across all three markets.

**Neighborhoods Targeted:**

| San Diego | Los Angeles | Orange County |
|-----------|-------------|---------------|
| La Jolla | Beverly Hills | Newport Beach |
| Del Mar | Santa Monica | Laguna Beach |
| Rancho Santa Fe | Malibu | Irvine |
| Coronado | Pacific Palisades | Dana Point |
| Encinitas | Brentwood | Huntington Beach |
| Carlsbad | Pasadena | Yorba Linda |

### Keyword Strategy

**Primary (high intent):**
- `luxury kitchen design [county]`
- `custom cabinetry [county]`
- `kitchen remodeling [county]`
- `custom kitchen cabinets [county]`
- `high end kitchen design [county]`

**Secondary (service + brand):**
- `siematic dealer [county]`
- `woodmode cabinets [county]`
- `kitchen design showroom near me`
- `made to order kitchen cabinets southern california`

**Long-tail (blog):**
- `how much does a custom kitchen cost in san diego`
- `best kitchen cabinet brands 2026`
- `modern vs traditional kitchen design`
- `kitchen remodel timeline what to expect`
- `siematic vs woodmode comparison`

### Content Strategy

| Type | Frequency | Purpose |
|------|-----------|---------|
| Blog posts | 2-4/month | Long-tail rankings, topical authority |
| Project case studies | Per completed project | Portfolio SEO, location keywords, image search |
| Supplier spotlights | 1/quarter per supplier | Brand keyword rankings |
| Neighborhood guides | 1/month | "[Neighborhood] kitchen design" rankings |
| Google Business posts | Weekly per profile | Local ranking signals |

### On-Page SEO Template (every page)

- Title tag: `Primary Keyword | Inplace Studio` (under 60 chars)
- Meta description with keyword + CTA (under 155 chars)
- H1 with primary keyword (one per page)
- H2s with secondary keywords naturally
- Internal links to related services, portfolio, location pages
- Alt text on every image (descriptive + keyword)
- Open Graph + Twitter Card meta for social sharing

### Link Building Targets

- Houzz profile + project uploads
- Local home design magazines and blogs
- Supplier websites (dealer listing links from SieMatic, Woodmode, etc.)
- Chamber of commerce in each county
- Home show / trade event listings
- Guest posts on interior design blogs

---

## Integrations

| System | Integration |
|--------|------------|
| GoHighLevel | Booking form embeds on Contact/Book Consultation pages, location pages. Forms feed directly into GHL pipeline Stage 1. |
| AI Chat Widget | 24/7 chatbot on all pages (bottom-right). Captures lead info → GHL contact → Pipeline Stage 1. |
| Google Analytics 4 | Sitewide tracking, conversion events for form submissions and click-to-call. |
| Google Search Console | Sitemap submission, indexing monitoring, search performance tracking. |
| Google Tag Manager | Centralized tag management for GA4, Google Ads, Meta Pixel. |
| Google Ads | Conversion tracking pixels, remarketing audiences. UTM parameters on all campaign landing pages. |
| Meta Pixel | Facebook/Instagram conversion tracking, remarketing audiences. |
| Hotjar or Microsoft Clarity | Heatmaps and session recordings for UX optimization. |

---

## WordPress Plugin Stack

| Plugin | Purpose |
|--------|---------|
| Elementor Pro | Page builder, animations, templates |
| RankMath Pro | SEO, schema markup, sitemaps |
| WP Rocket | Caching, performance optimization |
| ShortPixel | Image compression |
| Cloudflare (DNS-level) | CDN, security, DDoS protection |
| Wordfence | WordPress security |
| UpdraftPlus | Automated backups |
| WP Forms or GHL embed | Contact/booking forms |
| Smash Balloon | Instagram feed embed (portfolio social proof) |
| Schema Pro (if RankMath insufficient) | Advanced schema markup |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Google PageSpeed (Mobile) | 90+ |
| Google PageSpeed (Desktop) | 95+ |
| Largest Contentful Paint | Under 2.5s |
| First Input Delay | Under 100ms |
| Cumulative Layout Shift | Under 0.1 |
| Time to Interactive | Under 3.5s |

---

## Global Elements (every page)

### Navigation (Fixed/Sticky)
- Dark transparent on hero sections, solid dark on scroll
- Logo left, nav links center, `BOOK CONSULTATION` gold CTA button right
- Mobile: hamburger menu with full-screen overlay
- Links: Home, About, Portfolio, Services (dropdown), Suppliers (dropdown), Process, Contact
- Phone number visible on desktop nav

### Footer (Dark #1A1A1A — every page)
- 4 columns: Navigation | Services | Service Areas | Contact Info
- Service Areas list all 3 counties with links to location pages
- Social icons: Instagram, Houzz, Pinterest, Facebook
- Google Business links
- Copyright + Privacy Policy

### AI Chat Widget
- Bottom-right on all pages
- 24/7 AI chatbot for lead capture
- Feeds into GHL pipeline
