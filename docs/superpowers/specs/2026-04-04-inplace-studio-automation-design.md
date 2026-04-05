# Inplace Studio - Full Business Automation Design

## Overview

End-to-end business automation for Inplace Studio (inplacestudio.com), a kitchen design studio that provides cabinets from premium suppliers (SieMatic, Woodmode, Renzo Restelli, Signature Custom Cabinetry, and locally produced full custom) and manages installation via subcontractors. All cabinets are made-to-order after signed contract — no inventory.

## Team

| Person | Role | System Usage |
|--------|------|-------------|
| Nikita | Owner | Admin, workflow management, estimating/quoting |
| Sarjit | Owner | Sales, marketing, development |
| Celeste | Designer/Sales | Design projects, client consultations |
| Fernando | Project Manager | Installation scheduling, job tracking, subcontractor coordination |
| Subcontractors | Installation | Receive automated job assignments |

## Tech Stack

| Tool | Role |
|------|------|
| GoHighLevel (GHL) | CRM, pipeline, email/SMS, funnels, calendar, invoicing, dashboards |
| Pebble Connect | Automation engine — connects all tools, triggers workflows, routes data |
| RingCentral | Phone system, call tracking, call recording |
| Vapi | AI voice agent for answering/making calls |
| BoloForms | Contract generation & e-signatures |
| Quote Builder (custom) | Custom web app for supplier pricing, markup calculation, PDF proposals |
| Google Ads / Meta | Ad platforms with UTM tracking |

## Pipeline Stages

1. New Lead (Stage 1)
2. Consultation Booked (Stage 2)
3. Site Measurement (Stage 3)
4. Design Phase (Stage 4)
5. Proposal / Quote Presented (Stage 5)
6. Contract Signed (Stage 6)
7. Order Placed with Supplier (Stage 7)
8. Manufacturing / Lead Time (Stage 8)
9. Delivery (Stage 9)
10. Installation (Stage 10)
11. Punch List / Final Walkthrough (Stage 11)
12. Payment Collection / Closed (Stage 12)

---

## Section 1: Lead Capture & Intake

### Lead Sources

| Source | Flow |
|--------|------|
| Phone Calls | RingCentral → Pebble Connect → Vapi AI voice agent answers, captures name/phone/project type/timeline/budget → creates GHL contact → Pipeline Stage 1 |
| Missed Calls | RingCentral missed call event → Pebble Connect → GHL sends SMS: "Thanks for calling Inplace Studio! We'll call you back shortly. Reply with your name and project details to get started faster." |
| Google Ads | GHL landing page/funnel with form → lead auto-created in GHL → Pipeline Stage 1 |
| Meta (FB/IG) | Meta Lead Ads → Pebble Connect captures lead → GHL contact → Pipeline Stage 1 |
| Walk-ins | Team uses GHL form on showroom tablet → Pipeline Stage 1 |
| Website Chat | 24/7 AI chatbot on inplacestudio.com → captures lead info → GHL contact → Pipeline Stage 1 |
| Google Business Profile | GBP messages/form submissions → Pebble Connect → GHL contact → Pipeline Stage 1 |

### AI Voice Agent (Vapi)

- Answers incoming calls when team is unavailable
- Qualifies leads by asking: budget range, kitchen size, timeline, new build vs renovation
- Books consultations directly into GHL calendar
- Transfers hot leads to Sarjit/Celeste live if available
- Logs full call transcript to GHL contact record

### Speed-to-Lead Follow-Up Sequence

| Timing | Action |
|--------|--------|
| Under 60 seconds | SMS + email fires immediately |
| 5 minutes | If no reply, Vapi AI calls them back |
| 1 hour | Personalized email with relevant portfolio images (based on style preferences captured) |
| 24 hours | SMS follow-up |
| 3 days | Final follow-up SMS: "We saved a consultation spot for you" |
| 7 days | Move to long-term nurture sequence |

### Lead Scoring (GHL)

- Auto-score based on: budget mentioned, timeline urgency, lead source (Google Ads = higher intent than IG)
- High-score leads flagged to Sarjit immediately via SMS
- Low-score leads go into nurture sequence

### UTM Tracking

- All ad campaigns tagged with UTM parameters
- Pebble Connect passes source/campaign/keyword data into GHL contact record
- Enables tracking from ad click → signed contract for ROI reporting

---

## Section 2: Consultation & Site Measurement

### Consultation (Stage 2)

| Trigger | Automation |
|---------|-----------|
| Appointment booked | GHL sends confirmation SMS + email: showroom address, what to bring (photos, measurements, inspiration), what to expect |
| 24hr before | Reminder SMS + email with reschedule link |
| 2hr before | Final reminder SMS |
| No-show | Immediate SMS: "We missed you! Rebook here: [link]" → if no rebook in 48hrs → Vapi AI calls to reschedule |
| After consultation | Thank-you SMS + email: designer's contact info + brief style survey |

### Site Measurement (Stage 3)

| Trigger | Automation |
|---------|-----------|
| Moved to Stage 3 | Pebble Connect triggers SMS to client with scheduling link for site measurement |
| Measurement confirmed | Client receives prep checklist: "Clear countertops, ensure kitchen access" |
| Subcontractor measurement | Pebble Connect sends automated assignment to subcontractor: client address, contact info, appointment time |
| Measurement completed | Team updates GHL → moves to Stage 4 |

---

## Section 3: Design & Quoting

### Design Phase (Stage 4)

| Trigger | Automation |
|---------|-----------|
| Enters Stage 4 | Client SMS: "Great news! Our design team has started working on your kitchen." |
| 7+ days in Stage 4 | Auto SMS: "Your design is progressing! We'll be in touch soon." |
| Design ready | Team marks complete → Pebble Connect triggers email to client with appointment link to review design in showroom |

### Quote Builder (Custom Web App — Stage 5)

The only custom software to build. A web application for Nikita to generate professional proposals.

**Features:**

- Supplier catalog pricing database for: SieMatic, Woodmode, Renzo Restelli, Signature Custom Cabinetry, locally produced custom
- Input: cabinet specs from AutoCAD design (dimensions, door style, finish, hardware, quantity)
- Configurable markup percentage per supplier
- Calculates: supplier cost → subtotal → markup → total
- Generates professional PDF proposal containing:
  - Client name, project address
  - Itemized cabinet list with descriptions (client price only — no cost breakdown)
  - Installation cost
  - Timeline estimate
  - Terms & conditions
  - Total investment
- Sends proposal via GHL email to client
- Pebble Connect monitors proposal email open → if unopened after 48hrs → triggers follow-up SMS

**Pricing database management:**

- Nikita can update supplier pricing as catalogs change
- Per-supplier markup percentages configurable
- Installation cost rates configurable

---

## Section 4: Contract & Ordering

### Contract Signing (Stage 6)

| Trigger | Automation |
|---------|-----------|
| Quote approved by client | Pebble Connect generates contract in BoloForms pre-filled with: client info, project scope, pricing, payment schedule, timeline |
| Contract sent | Client SMS + email: "Your contract is ready for review and signature" + BoloForms link |
| Unsigned after 48hrs | Auto SMS reminder |
| Unsigned after 5 days | Sarjit gets notified to follow up personally |
| Contract signed | Pebble Connect detects BoloForms completion → moves GHL pipeline to Stage 7 → triggers ordering workflow |

### Payment Collection

- Payment schedule defined in contract (e.g., 50% deposit, 40% before install, 10% on completion)
- Contract signed → Pebble Connect triggers GHL invoice for deposit
- Payment received → auto thank-you SMS + receipt email
- Upcoming payments → automated reminders 7 days and 3 days before due date

### Supplier Ordering (Stage 7)

| Trigger | Automation |
|---------|-----------|
| Deposit received | Nikita gets task notification: "Deposit received for [Client] — ready to place order" |
| Order placed | Nikita logs order details in GHL custom fields: supplier, PO#, estimated delivery date |
| Order confirmed | Client SMS: "Your cabinets have been ordered! Estimated delivery: [date]." |
| 2 weeks before delivery | SMS to client with delivery/install prep instructions |
| Supplier delay | Nikita updates delivery date → Pebble Connect auto-notifies client with new timeline |

---

## Section 5: Delivery, Installation & Completion

### Delivery (Stage 8-9)

| Trigger | Automation |
|---------|-----------|
| Delivery scheduled | Client SMS + email: "Your cabinets are arriving on [date]! Please ensure [prep instructions]" |
| 1 day before delivery | Reminder SMS to client + notification to Fernando |
| Delivery confirmed | Fernando marks delivered in GHL → moves to Stage 10 → triggers install scheduling |

### Installation (Stage 10)

| Trigger | Automation |
|---------|-----------|
| Ready for install | Pebble Connect sends subcontractor automated assignment: client address, scope of work, contact info, schedule link |
| Install scheduled | Client SMS: "Installation is booked for [date]. Your installer is [name]. Expected duration: [X] days." |
| Day before install | Reminder SMS to client + subcontractor |
| Install in progress | Fernando updates daily → client gets automated SMS: "Day [X] update — installation is on track" |
| Install complete | Fernando marks complete → moves to Stage 11 |

### Punch List & Final Walkthrough (Stage 11)

| Trigger | Automation |
|---------|-----------|
| Install complete | Client SMS: "Installation is complete! Let's schedule your final walkthrough." + scheduling link |
| Walkthrough scheduled | Confirmation SMS to client + Fernando |
| Punch list items found | Fernando logs items in GHL → subcontractor gets notified with task list |
| Punch list resolved | Client SMS: "All items addressed! Your kitchen is ready." → moves to Stage 12 |

### Close-Out (Stage 12)

| Trigger | Automation |
|---------|-----------|
| Final walkthrough approved | Pebble Connect triggers final invoice via GHL |
| Final payment received | Thank-you SMS + email: warranty info, care instructions, designer's direct contact |
| 7 days post-completion | SMS: "How are you enjoying your new kitchen?" + Google Review link |
| 30 days post-completion | Email: referral program — "Refer a friend and receive [incentive]" |
| 6 months post-completion | Check-in email: "How's everything holding up?" |
| 1 year post-completion | Anniversary email with maintenance tips |

---

## Section 6: Marketing Automation & Reporting

### Nurture Campaigns

| Campaign | Details |
|----------|---------|
| Monthly newsletter | Design trends, completed project showcases, seasonal promotions via GHL email |
| Re-engagement (30+ days inactive) | "Still thinking about your kitchen? Here's a recent project we completed" with photos |
| Seasonal promos | Pebble Connect triggers campaigns tied to slow seasons or supplier promotions |
| Past client referrals | Quarterly email to completed clients: portfolio update + referral incentive reminder |

### Ad ROI Tracking

| Feature | Details |
|---------|---------|
| Google Ads → GHL | UTM tracking on all campaigns, source/campaign/keyword data on every contact |
| Meta Ads → GHL | Same UTM tracking, lead form submissions via Pebble Connect |
| Cost-per-signed-contract | Track each lead from ad click → signed contract |
| Monthly report | Pebble Connect auto-generates monthly summary emailed to Sarjit: new leads by source, conversion rate, pipeline value, revenue closed |

### Reputation Management

| Feature | Details |
|---------|---------|
| Review requests | Automated at 7 days post-completion (Google + Houzz + Yelp links) |
| Negative review alert | Review under 4 stars → immediate SMS to Sarjit + Nikita |
| Review response | AI drafts professional response for Sarjit to approve and post |

### Team Dashboards (GHL)

| Person | Dashboard Shows |
|--------|----------------|
| Sarjit | Lead volume, ad ROI, revenue pipeline, conversion rates |
| Nikita | Open quotes, pending orders, upcoming payments |
| Celeste | Active design projects, upcoming consultations |
| Fernando | Install schedule, active jobs, punch list items |

---

## System Architecture

```
                    ┌──────────────────────────────────┐
                    │          LEAD SOURCES             │
                    │  Phone │ Walk-in │ Google │ Meta  │
                    │        │  GBP    │  Chat Widget   │
                    └────────────┬─────────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────────────┐
                    │        PEBBLE CONNECT             │
                    │     (Automation Engine)           │
                    │  Routes, triggers, orchestrates   │
                    └────────────┬─────────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐
   │   GOHIGHLEVEL    │ │   RINGCENTRAL    │ │    VAPI      │
   │  CRM, Pipeline,  │ │  Phone system,   │ │  AI Voice    │
   │  Email, SMS,     │ │  Call tracking,  │ │  Agent       │
   │  Funnels, Forms, │ │  Call recording  │ │              │
   │  Calendar,       │ │                  │ │              │
   │  Invoicing       │ │                  │ │              │
   └──────────────────┘ └──────────────────┘ └──────────────┘
              │
              ├──────────────────┐
              ▼                  ▼
   ┌──────────────────┐ ┌──────────────────┐
   │   BOLOFORMS      │ │  QUOTE BUILDER   │
   │  Contracts &     │ │  (Custom App)    │
   │  E-signatures    │ │  Supplier pricing│
   │                  │ │  Markup engine   │
   │                  │ │  PDF proposals   │
   └──────────────────┘ └──────────────────┘
```

## Custom Development Required

The **Quote Builder** is the only piece that needs to be built from scratch. Everything else is configuration and automation wiring between existing tools.

### Quote Builder Scope

- Web application (accessible by Nikita and team)
- Supplier pricing database with CRUD operations
- Per-supplier configurable markup percentages
- Cabinet specification input (from AutoCAD designs)
- Price calculation engine
- Professional PDF proposal generation
- Integration with GHL for sending proposals and tracking opens
- Integration with Pebble Connect for automation triggers

### Everything Else = Configuration

- GHL: Pipeline setup, custom fields, funnels, forms, email/SMS templates, calendar, invoicing, dashboards
- Pebble Connect: Automation workflows connecting all tools
- Vapi: AI voice agent training with Inplace Studio scripts and qualification questions
- RingCentral: Call routing rules, integration with Pebble Connect
- BoloForms: Contract templates with merge fields
- Google Ads / Meta: Campaign setup with UTM tracking
- Website: Chat widget installation
