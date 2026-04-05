# Inplace Studio Full Business Automation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an end-to-end automation system for Inplace Studio (kitchen design + cabinet sales/installation) that captures leads from all channels, automates follow-up, generates quotes, manages contracts, tracks projects through installation, and reports on marketing ROI.

**Architecture:** GoHighLevel is the CRM hub (pipeline, contacts, comms, invoicing). Pebble Connect is the automation engine wiring everything together. Vapi handles AI voice. The only custom-built piece is a Quote Builder web app (Next.js + PostgreSQL). All other work is configuration and automation workflow setup.

**Tech Stack:**
- Quote Builder: Next.js 14 (App Router), TypeScript, PostgreSQL, Prisma ORM, React PDF, Tailwind CSS
- Integrations: GoHighLevel API, Pebble Connect webhooks, Vapi API, RingCentral API, BoloForms API, Meta Lead Ads, Google Ads
- Deployment: Vercel (Quote Builder), managed PostgreSQL (Supabase or Neon)

**Spec:** `docs/superpowers/specs/2026-04-04-inplace-studio-automation-design.md`

---

## Phase 1: GHL Pipeline & CRM Foundation

**Goal:** Set up the 12-stage pipeline, custom fields, contact properties, and team accounts in GoHighLevel so all subsequent phases have a foundation to build on.

### Task 1.1: Create GHL Pipeline with 12 Stages

**Where:** GoHighLevel > Settings > Pipelines

- [ ] **Step 1: Create new pipeline called "Kitchen Projects"**

Navigate to GHL > Pipelines > Create Pipeline. Name: "Kitchen Projects"

- [ ] **Step 2: Add all 12 stages in order**

Create these stages in exact order:
1. New Lead
2. Consultation Booked
3. Site Measurement
4. Design Phase
5. Proposal / Quote Presented
6. Contract Signed
7. Order Placed with Supplier
8. Manufacturing / Lead Time
9. Delivery
10. Installation
11. Punch List / Final Walkthrough
12. Payment Collection / Closed

- [ ] **Step 3: Verify pipeline displays correctly**

Open the pipeline board view and confirm all 12 stages appear left-to-right in order.

### Task 1.2: Create GHL Custom Fields for Contacts

**Where:** GoHighLevel > Settings > Custom Fields

- [ ] **Step 1: Create lead source tracking fields**

| Field Name | Type | Options |
|------------|------|---------|
| Lead Source | Dropdown | Phone Call, Walk-In, Google Ads, Meta (FB/IG), Website Chat, Google Business Profile, Referral |
| UTM Source | Text | — |
| UTM Medium | Text | — |
| UTM Campaign | Text | — |
| UTM Term | Text | — |
| Lead Score | Number | — |

- [ ] **Step 2: Create project detail fields**

| Field Name | Type | Options |
|------------|------|---------|
| Kitchen Type | Dropdown | New Build, Renovation, Remodel |
| Budget Range | Dropdown | Under $25K, $25K-$50K, $50K-$100K, $100K-$200K, $200K+, Not Disclosed |
| Timeline | Dropdown | ASAP, 1-3 Months, 3-6 Months, 6-12 Months, 12+ Months |
| Kitchen Size | Text | — |
| Style Preference | Dropdown | Modern, Traditional, Transitional, Contemporary, Other |
| Design Software File | Text | — (AutoCAD file reference) |

- [ ] **Step 3: Create supplier & order fields**

| Field Name | Type | Options |
|------------|------|---------|
| Cabinet Supplier | Dropdown | SieMatic, Woodmode, Renzo Restelli, Signature Custom Cabinetry, Local Custom |
| Purchase Order Number | Text | — |
| Estimated Delivery Date | Date | — |
| Actual Delivery Date | Date | — |
| Installation Start Date | Date | — |
| Installation End Date | Date | — |
| Installer Name | Text | — |

- [ ] **Step 4: Create financial fields**

| Field Name | Type | Options |
|------------|------|---------|
| Quote Amount | Number | — |
| Contract Amount | Number | — |
| Deposit Amount | Number | — |
| Deposit Paid | Checkbox | — |
| Mid-Payment Amount | Number | — |
| Mid-Payment Paid | Checkbox | — |
| Final Payment Amount | Number | — |
| Final Payment Paid | Checkbox | — |

- [ ] **Step 5: Verify all custom fields appear on a test contact**

Create a test contact and confirm every custom field is visible and editable.

### Task 1.3: Set Up Team User Accounts in GHL

**Where:** GoHighLevel > Settings > Team

- [ ] **Step 1: Create/verify team accounts**

| User | Email | Role |
|------|-------|------|
| Nikita | (her email) | Admin |
| Sarjit | (his email) | Admin |
| Celeste | (her email) | User |
| Fernando | (his email) | User |

- [ ] **Step 2: Set up GHL calendars**

Create two calendars:
- "Consultation Calendar" — assigned to Celeste and Sarjit
- "Site Measurement Calendar" — assigned to Fernando

Configure business hours, appointment duration (consultations: 60 min, measurements: 90 min), buffer time (15 min).

- [ ] **Step 3: Verify calendar booking links work**

Test both booking links. Confirm confirmation emails are sent.

### Task 1.4: Create GHL Forms

**Where:** GoHighLevel > Sites > Forms

- [ ] **Step 1: Create "Walk-In Lead Capture" form**

Fields:
- First Name (required)
- Last Name (required)
- Phone (required)
- Email (required)
- Kitchen Type (dropdown: New Build, Renovation, Remodel)
- Budget Range (dropdown)
- Timeline (dropdown)
- Style Preference (dropdown)
- Notes (textarea)

Form action: Create contact, add to "Kitchen Projects" pipeline Stage 1 "New Lead", assign Lead Source = "Walk-In"

- [ ] **Step 2: Create "Google Ads Landing Page" funnel**

GHL Funnel with:
- Hero section: headline + portfolio image
- Lead capture form (same fields as walk-in form minus Style Preference)
- Hidden fields for UTM parameters (auto-populated from URL)
- Thank you page with consultation booking calendar embed

Form action: Create contact, Pipeline Stage 1, Lead Source = "Google Ads", populate UTM fields

- [ ] **Step 3: Create "Meta Lead" form**

Similar to Google Ads form but optimized for Meta Lead Ads format. Include UTM hidden fields.

- [ ] **Step 4: Test all forms**

Submit test entries through each form. Verify contacts appear in GHL with correct pipeline stage, lead source, and custom fields populated.

---

## Phase 2: Lead Capture & Follow-Up Automations

**Goal:** Wire up all lead sources to GHL via Pebble Connect and build the speed-to-lead follow-up sequences.

### Task 2.1: Create GHL Email & SMS Templates

**Where:** GoHighLevel > Marketing > Templates

- [ ] **Step 1: Create SMS templates**

| Template Name | Content |
|---------------|---------|
| Instant Lead Response | "Hi {{contact.first_name}}, thanks for reaching out to Inplace Studio! We'd love to learn about your kitchen project. Book your free consultation here: {{calendars.consultation_link}}" |
| Missed Call Text-Back | "Thanks for calling Inplace Studio! We missed your call but want to help. Reply with your name and project details, or book a consultation: {{calendars.consultation_link}}" |
| 5-Min No-Reply | "Hi {{contact.first_name}}, this is Inplace Studio following up. We have consultation times available this week — would you like to book one? {{calendars.consultation_link}}" |
| 24hr Follow-Up | "Hi {{contact.first_name}}, just checking in from Inplace Studio. We'd love to help with your kitchen project. Any questions we can answer? Reply here or book a time: {{calendars.consultation_link}}" |
| 3-Day Follow-Up | "Hi {{contact.first_name}}, we saved a consultation spot for you at Inplace Studio. Ready when you are: {{calendars.consultation_link}}" |
| High-Score Lead Alert (to Sarjit) | "HOT LEAD: {{contact.first_name}} {{contact.last_name}} — {{contact.lead_source}} — Budget: {{contact.budget_range}} — Timeline: {{contact.timeline}}. Call: {{contact.phone}}" |

- [ ] **Step 2: Create email templates**

| Template Name | Subject | Content Summary |
|---------------|---------|-----------------|
| Welcome Email | "Welcome to Inplace Studio" | Thank you, portfolio highlights, what to expect, consultation booking link |
| 1hr Portfolio Email | "Kitchen Inspiration for You" | Curated portfolio images based on style preference (modern/traditional/etc.), designer intro, booking CTA |
| Nurture Entry | "Thinking About Your Kitchen?" | Recent project showcase, design tips, soft CTA to book consultation |

- [ ] **Step 3: Test each template with merge fields**

Send test SMS and emails to a test contact. Verify all merge fields populate correctly.

### Task 2.2: Build Speed-to-Lead GHL Workflow

**Where:** GoHighLevel > Automation > Workflows

- [ ] **Step 1: Create workflow "Speed-to-Lead Sequence"**

Trigger: Contact enters Pipeline Stage 1 "New Lead"

- [ ] **Step 2: Add workflow steps**

```
Trigger: Pipeline Stage = "New Lead"
├── [Immediate] Send SMS: "Instant Lead Response"
├── [Immediate] Send Email: "Welcome Email"
├── [Wait 5 min] IF no reply → Trigger Vapi outbound call (via webhook to Pebble Connect)
├── [Wait 1 hr] IF no reply → Send Email: "1hr Portfolio Email"
├── [Wait 24 hrs] IF no reply → Send SMS: "24hr Follow-Up"
├── [Wait 3 days] IF no reply → Send SMS: "3-Day Follow-Up"
└── [Wait 7 days] IF no reply → Remove from workflow, add Tag "Nurture"
```

- [ ] **Step 3: Add lead scoring branch**

Add parallel branch at trigger:
```
├── IF Lead Score > 70 → Send SMS to Sarjit: "High-Score Lead Alert"
```

- [ ] **Step 4: Test the complete workflow**

Create a test contact, move to Stage 1. Verify:
- Instant SMS and email arrive within 60 seconds
- Subsequent steps fire at correct intervals (use GHL workflow test mode to skip waits)

### Task 2.3: Consultation & Measurement Workflows (Stages 2-3)

**Where:** GHL Workflows

- [ ] **Step 1: Create GHL workflow — Consultation Booked (Stage 2)**

```
Trigger: Contact moves to Pipeline Stage 2 "Consultation Booked"
├── [Immediate] Send SMS: Confirmation with showroom address, what to bring (photos, measurements, inspiration), what to expect
├── [Immediate] Send Email: Detailed confirmation with showroom photos, parking info, designer intro
├── [24hr before appointment] Send SMS: Reminder + reschedule link
├── [2hr before appointment] Send SMS: "See you soon!" reminder
├── [IF no-show] Immediate SMS: "We missed you! Rebook here: [link]"
├── [IF no-show + 48hr] Trigger Vapi AI call to reschedule
└── [After consultation] Send SMS + Email: Thank-you + designer contact info + style survey link
```

- [ ] **Step 2: Create GHL workflow — Site Measurement (Stage 3)**

```
Trigger: Contact moves to Pipeline Stage 3 "Site Measurement"
├── [Immediate] Send SMS to client with scheduling link for site measurement
├── [Measurement confirmed] Send SMS: Prep checklist — "Clear countertops, ensure kitchen access"
├── [1 day before] Send SMS reminder to client
└── [Measurement completed → moved to Stage 4] Trigger Design Phase workflow
```

- [ ] **Step 3: Create Pebble Connect automation — Subcontractor Measurement Assignment**

```
Trigger: Measurement appointment booked + assigned to subcontractor
Actions:
  1. Send subcontractor SMS + Email: Client name, address, phone, appointment date/time
  2. Send subcontractor calendar invite
```

- [ ] **Step 4: Create GHL workflow — Design Phase (Stage 4)**

```
Trigger: Contact moves to Pipeline Stage 4 "Design Phase"
├── [Immediate] Send client SMS: "Great news! Our design team has started working on your kitchen."
├── [7 days in Stage 4] Send SMS: "Your design is progressing! We'll be in touch soon."
├── [14 days in Stage 4] Internal alert to Celeste: "Design for [Client] has been in progress 14 days — status check"
└── [Design ready — moved to Stage 5] Send Email: "Your design is ready! Book a time to review it in our showroom." + calendar link
```

- [ ] **Step 5: Create SMS/Email templates for Stages 2-4**

| Template | Content |
|----------|---------|
| Consultation Confirmation SMS | "Hi {{contact.first_name}}, your consultation at Inplace Studio is confirmed for {{appointment.date}} at {{appointment.time}}. Address: [showroom address]. Bring any photos or inspiration!" |
| Consultation Reminder SMS | "Reminder: Your Inplace Studio consultation is tomorrow at {{appointment.time}}. See you there! Need to reschedule? {{reschedule_link}}" |
| No-Show SMS | "Hi {{contact.first_name}}, we missed you today at Inplace Studio! No worries — rebook your consultation here: {{calendars.consultation_link}}" |
| Post-Consultation SMS | "Thanks for visiting Inplace Studio today, {{contact.first_name}}! Your designer {{assigned_to.name}} will be in touch about next steps." |
| Measurement Prep SMS | "Hi {{contact.first_name}}, your site measurement is confirmed for {{appointment.date}}. Please clear countertops and ensure easy access to the kitchen." |
| Design Started SMS | "Great news, {{contact.first_name}}! Our design team has started working on your kitchen project." |
| Design Ready Email | Subject: "Your Kitchen Design is Ready!" — portfolio-style email with booking link to review in showroom |

- [ ] **Step 6: Test all Stage 2-4 workflows**

Move a test contact through Stages 2→3→4→5. Verify all SMS/emails fire at correct triggers.

### Task 2.4: Wire Meta Lead Ads via Pebble Connect

**Where:** Pebble Connect

- [ ] **Step 1: Create Pebble Connect automation**

```
Trigger: Meta Lead Ads — New Lead
Actions:
  1. Map fields: first_name, last_name, email, phone, utm_source, utm_medium, utm_campaign
  2. POST to GHL API: Create/Update Contact
     - Set Lead Source = "Meta (FB/IG)"
     - Set UTM fields from mapped data
  3. POST to GHL API: Add to Pipeline "Kitchen Projects" Stage "New Lead"
```

- [ ] **Step 2: Test with a Meta test lead**

Submit a test lead through Meta Lead Ads. Verify it appears in GHL with correct source and UTM data, and the Speed-to-Lead workflow fires.

### Task 2.5: Wire Google Business Profile via Pebble Connect

**Where:** Pebble Connect

- [ ] **Step 1: Create Pebble Connect automation**

```
Trigger: Google Business Profile — New Message / Form Submission
Actions:
  1. Map fields: name, phone, email, message
  2. POST to GHL API: Create/Update Contact
     - Set Lead Source = "Google Business Profile"
  3. POST to GHL API: Add to Pipeline "Kitchen Projects" Stage "New Lead"
```

- [ ] **Step 2: Test with a GBP test submission**

### Task 2.6: Set Up Website Chat Widget

**Where:** GHL > Sites > Chat Widget OR Tidio

- [ ] **Step 1: Configure chat widget**

- Set up GHL chat widget (or Tidio if preferred)
- Configure AI auto-responses for common questions: hours, location, what suppliers you carry, booking a consultation
- Set fallback: if AI can't answer, offer to connect with team or book consultation

- [ ] **Step 2: Add chat widget to inplacestudio.com**

Install the chat widget script tag on the website.

- [ ] **Step 3: Create Pebble Connect automation for chat leads**

```
Trigger: GHL Chat Widget — New Conversation with contact info captured
Actions:
  1. Set Lead Source = "Website Chat"
  2. Add to Pipeline Stage 1 if not already in pipeline
```

- [ ] **Step 4: Test chat widget end-to-end**

Visit the website, start a chat, provide contact info. Verify contact created in GHL with correct source.

### Task 2.7: Wire Walk-In Form to Pipeline

**Where:** GoHighLevel

- [ ] **Step 1: Verify form submission workflow**

The form from Task 1.4 Step 1 should already create a contact and add to pipeline. Verify the Speed-to-Lead workflow triggers (it should, since the contact enters Stage 1).

- [ ] **Step 2: Set up showroom tablet**

Load the walk-in form URL on the showroom tablet/iPad. Bookmark it for easy access.

---

## Phase 3: AI Voice Agent (Vapi + RingCentral)

**Goal:** Set up Vapi AI voice agent to answer calls, qualify leads, and book consultations. Integrate with RingCentral for call routing and missed call handling.

### Task 3.1: Set Up Vapi AI Voice Agent

**Where:** Vapi Dashboard

- [ ] **Step 1: Create Vapi account and assistant**

Create a new Vapi assistant named "Inplace Studio Receptionist"

- [ ] **Step 2: Write the voice agent script**

System prompt for the Vapi assistant:

```
You are the AI receptionist for Inplace Studio, a premium kitchen design studio. You are warm, professional, and knowledgeable.

About Inplace Studio:
- We design and install luxury kitchens
- We work with premium cabinet suppliers: SieMatic, Woodmode, Renzo Restelli, Signature Custom Cabinetry, and locally produced full custom cabinets
- All cabinets are made-to-order — custom designed for each client
- Our process: consultation → site measurement → design → proposal → installation
- Location: [INSERT SHOWROOM ADDRESS]
- Hours: [INSERT BUSINESS HOURS]

Your goals on every call:
1. Greet the caller warmly
2. Determine if they are a new or existing client
3. For new clients, collect:
   - Full name
   - Phone number (confirm the one they're calling from)
   - Email address
   - Type of project (new build, renovation, remodel)
   - Approximate budget range (gently ask: "To help us prepare the best options for you, do you have a budget range in mind?")
   - Timeline (when they'd like to start/complete)
   - Kitchen size (approximate)
4. Offer to book a free showroom consultation
5. If the caller wants to speak to someone immediately, attempt to transfer to Sarjit or Celeste

Transfer rules:
- During business hours: attempt transfer to Sarjit first, then Celeste
- After hours: take message, book consultation, assure callback next business day

Always be helpful, never pushy. If someone doesn't want to share budget, that's fine — note "Not Disclosed."
```

- [ ] **Step 3: Configure Vapi function calls**

Set up Vapi tool/function calls:
- `create_lead`: POST to Pebble Connect webhook with lead data (name, phone, email, project type, budget, timeline)
- `book_consultation`: POST to GHL calendar API to create appointment
- `transfer_call`: Forward call to Sarjit's number, fallback to Celeste

- [ ] **Step 4: Test the voice agent**

Call the Vapi test number. Walk through:
- New lead scenario (provide all info, book consultation)
- Transfer request scenario
- After-hours scenario
- Caller who doesn't want to share budget

Verify lead data arrives in GHL correctly after each test call.

### Task 3.2: Integrate RingCentral with Vapi

**Where:** RingCentral Admin + Pebble Connect

- [ ] **Step 1: Configure RingCentral call routing**

Set up call flow in RingCentral:
```
Incoming call to main business number
├── Ring Sarjit + Celeste simultaneously (15 seconds)
├── If no answer → Forward to Vapi AI agent number
└── Vapi handles the call
```

- [ ] **Step 2: Create Pebble Connect automation for call logging**

```
Trigger: RingCentral — Call Completed
Actions:
  1. Look up contact in GHL by phone number
  2. IF contact exists → Add note with call duration, recording link
  3. IF contact does not exist → Create contact with phone number, Lead Source = "Phone Call"
  4. Add to Pipeline Stage 1 if new contact
```

- [ ] **Step 3: Test inbound call flow**

Call the main business number. Let it ring (don't answer). Verify:
- Call forwards to Vapi after 15 seconds
- Vapi answers and qualifies
- Lead appears in GHL
- Call log/recording attached to contact

### Task 3.3: Set Up Missed Call Text-Back

**Where:** Pebble Connect

- [ ] **Step 1: Create Pebble Connect automation**

```
Trigger: RingCentral — Missed Call (no answer from team AND Vapi didn't pick up)
Actions:
  1. Look up or create contact in GHL by caller phone number
  2. Send SMS via GHL: "Missed Call Text-Back" template
  3. Set Lead Source = "Phone Call" if new contact
  4. Add to Pipeline Stage 1 if new contact
```

- [ ] **Step 2: Test missed call flow**

Call the main number after hours (or when routing is set to go straight to voicemail). Verify SMS is sent within 60 seconds of the missed call.

### Task 3.4: Set Up Vapi Outbound Callback (for Speed-to-Lead)

**Where:** Pebble Connect + Vapi

- [ ] **Step 1: Create Pebble Connect webhook endpoint**

This is the webhook that the GHL Speed-to-Lead workflow calls at the 5-minute mark:

```
Trigger: Webhook from GHL workflow (5-min no-reply callback)
Payload: { contact_id, phone, first_name }
Actions:
  1. Trigger Vapi outbound call to the lead's phone number
  2. Vapi script: "Hi {{first_name}}, this is Inplace Studio following up on your inquiry. We'd love to help with your kitchen project. Do you have a few minutes to chat, or would you prefer to book a consultation for another time?"
```

- [ ] **Step 2: Test outbound callback**

Create a test lead in GHL, trigger the workflow. Verify outbound call fires at 5-minute mark.

---

## Phase 4: Quote Builder (Custom Web App)

**Goal:** Build a web application where Nikita can input cabinet specs, calculate pricing with supplier-specific markup, and generate professional PDF proposals.

### Task 4.1: Project Scaffolding

**Files:**
- Create: `quote-builder/package.json`
- Create: `quote-builder/tsconfig.json`
- Create: `quote-builder/next.config.ts`
- Create: `quote-builder/tailwind.config.ts`
- Create: `quote-builder/.env.example`
- Create: `quote-builder/prisma/schema.prisma`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/sarjitshah/Documents/Software/INPLACE_AUTOMATION
npx create-next-app@latest quote-builder --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

- [ ] **Step 2: Install dependencies**

```bash
cd quote-builder
npm install prisma @prisma/client
npm install @react-pdf/renderer
npm install next-auth
npm install zod
npm install lucide-react
npm install --save-dev @types/node
```

- [ ] **Step 3: Create Prisma schema**

Create `quote-builder/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Supplier {
  id          String   @id @default(cuid())
  name        String   @unique
  markupPct   Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  catalogItems CatalogItem[]
  quotes       Quote[]
}

model CatalogItem {
  id          String   @id @default(cuid())
  supplierId  String
  supplier    Supplier @relation(fields: [supplierId], references: [id], onDelete: Cascade)
  name        String
  category    String
  basePriceUsd Float
  unit        String   @default("each")
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  quoteLines  QuoteLine[]

  @@index([supplierId])
}

model Quote {
  id              String   @id @default(cuid())
  clientName      String
  clientEmail     String?
  clientPhone     String?
  projectAddress  String
  supplierId      String
  supplier        Supplier @relation(fields: [supplierId], references: [id])
  installationCost Float   @default(0)
  timelineEstimate String?
  termsAndConditions String?
  notes           String?
  status          String   @default("draft")
  ghlContactId    String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  lines           QuoteLine[]

  @@index([supplierId])
  @@index([status])
}

model QuoteLine {
  id            String   @id @default(cuid())
  quoteId       String
  quote         Quote    @relation(fields: [quoteId], references: [id], onDelete: Cascade)
  catalogItemId String?
  catalogItem   CatalogItem? @relation(fields: [catalogItemId], references: [id])
  description   String
  dimensions    String?
  doorStyle     String?
  finish        String?
  hardware      String?
  quantity      Int      @default(1)
  unitCost      Float
  markupPct     Float
  lineTotal     Float
  sortOrder     Int      @default(0)

  @@index([quoteId])
}
```

- [ ] **Step 4: Create .env.example**

Create `quote-builder/.env.example`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/inplace_quotes"
NEXTAUTH_SECRET="generate-a-secret-here"
NEXTAUTH_URL="http://localhost:3000"
GHL_API_KEY=""
GHL_LOCATION_ID=""
PEBBLE_CONNECT_WEBHOOK_URL=""
```

- [ ] **Step 5: Initialize database**

```bash
cp .env.example .env
# Edit .env with actual database URL
npx prisma db push
npx prisma generate
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold quote builder with Next.js, Prisma schema for suppliers, catalog, quotes"
```

### Task 4.2: Database Seed & Prisma Client

**Files:**
- Create: `quote-builder/prisma/seed.ts`
- Create: `quote-builder/src/lib/db.ts`

- [ ] **Step 1: Create Prisma client singleton**

Create `quote-builder/src/lib/db.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

- [ ] **Step 2: Create seed file with suppliers**

Create `quote-builder/prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const suppliers = [
    { name: "SieMatic", markupPct: 30 },
    { name: "Woodmode", markupPct: 25 },
    { name: "Renzo Restelli", markupPct: 35 },
    { name: "Signature Custom Cabinetry", markupPct: 28 },
    { name: "Local Custom", markupPct: 20 },
  ];

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { name: supplier.name },
      update: { markupPct: supplier.markupPct },
      create: supplier,
    });
  }

  console.log("Seeded suppliers:", suppliers.map((s) => s.name).join(", "));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 3: Add seed script to package.json**

Add to `quote-builder/package.json` under `"prisma"`:

```json
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}
```

- [ ] **Step 4: Run seed**

```bash
npm install --save-dev tsx
npx prisma db seed
```

Expected: "Seeded suppliers: SieMatic, Woodmode, Renzo Restelli, Signature Custom Cabinetry, Local Custom"

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Prisma client singleton and supplier seed data"
```

### Task 4.3: Supplier Management API

**Files:**
- Create: `quote-builder/src/app/api/suppliers/route.ts`
- Create: `quote-builder/src/app/api/suppliers/[id]/route.ts`

- [ ] **Step 1: Create GET/POST suppliers route**

Create `quote-builder/src/app/api/suppliers/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET() {
  const suppliers = await db.supplier.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { catalogItems: true } } },
  });
  return NextResponse.json(suppliers);
}

const createSchema = z.object({
  name: z.string().min(1),
  markupPct: z.number().min(0).max(100),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const supplier = await db.supplier.create({ data: parsed.data });
  return NextResponse.json(supplier, { status: 201 });
}
```

- [ ] **Step 2: Create GET/PUT/DELETE supplier by ID route**

Create `quote-builder/src/app/api/suppliers/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supplier = await db.supplier.findUnique({
    where: { id },
    include: { catalogItems: { orderBy: { name: "asc" } } },
  });
  if (!supplier) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(supplier);
}

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  markupPct: z.number().min(0).max(100).optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const supplier = await db.supplier.update({
    where: { id },
    data: parsed.data,
  });
  return NextResponse.json(supplier);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.supplier.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Test API endpoints**

```bash
# Start dev server
npm run dev

# Test GET suppliers
curl http://localhost:3000/api/suppliers

# Test POST new supplier
curl -X POST http://localhost:3000/api/suppliers \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Supplier", "markupPct": 25}'

# Test PUT update
curl -X PUT http://localhost:3000/api/suppliers/<ID> \
  -H "Content-Type: application/json" \
  -d '{"markupPct": 30}'

# Test DELETE
curl -X DELETE http://localhost:3000/api/suppliers/<ID>
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add supplier CRUD API routes"
```

### Task 4.4: Catalog Item Management API

**Files:**
- Create: `quote-builder/src/app/api/catalog/route.ts`
- Create: `quote-builder/src/app/api/catalog/[id]/route.ts`

- [ ] **Step 1: Create GET/POST catalog route**

Create `quote-builder/src/app/api/catalog/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const supplierId = req.nextUrl.searchParams.get("supplierId");
  const where = supplierId ? { supplierId } : {};
  const items = await db.catalogItem.findMany({
    where,
    orderBy: [{ category: "asc" }, { name: "asc" }],
    include: { supplier: { select: { name: true } } },
  });
  return NextResponse.json(items);
}

const createSchema = z.object({
  supplierId: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  basePriceUsd: z.number().min(0),
  unit: z.string().default("each"),
  description: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const item = await db.catalogItem.create({ data: parsed.data });
  return NextResponse.json(item, { status: 201 });
}
```

- [ ] **Step 2: Create GET/PUT/DELETE catalog item by ID route**

Create `quote-builder/src/app/api/catalog/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await db.catalogItem.findUnique({
    where: { id },
    include: { supplier: { select: { name: true, markupPct: true } } },
  });
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  basePriceUsd: z.number().min(0).optional(),
  unit: z.string().optional(),
  description: z.string().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const item = await db.catalogItem.update({ where: { id }, data: parsed.data });
  return NextResponse.json(item);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.catalogItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Test catalog API**

```bash
# Get a supplier ID first
curl http://localhost:3000/api/suppliers

# Create a catalog item
curl -X POST http://localhost:3000/api/catalog \
  -H "Content-Type: application/json" \
  -d '{"supplierId": "<SUPPLIER_ID>", "name": "Base Cabinet 24in", "category": "Base Cabinets", "basePriceUsd": 850, "unit": "each"}'

# List catalog items
curl http://localhost:3000/api/catalog

# Filter by supplier
curl "http://localhost:3000/api/catalog?supplierId=<SUPPLIER_ID>"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add catalog item CRUD API routes"
```

### Task 4.5: Quote Management API

**Files:**
- Create: `quote-builder/src/app/api/quotes/route.ts`
- Create: `quote-builder/src/app/api/quotes/[id]/route.ts`
- Create: `quote-builder/src/app/api/quotes/[id]/lines/route.ts`
- Create: `quote-builder/src/lib/pricing.ts`

- [ ] **Step 1: Create pricing calculation helper**

Create `quote-builder/src/lib/pricing.ts`:

```typescript
export function calculateLineTotal(
  unitCost: number,
  quantity: number,
  markupPct: number
): number {
  const subtotal = unitCost * quantity;
  const markup = subtotal * (markupPct / 100);
  return Math.round((subtotal + markup) * 100) / 100;
}

export function calculateQuoteTotal(
  lines: { lineTotal: number }[],
  installationCost: number
): number {
  const linesTotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  return Math.round((linesTotal + installationCost) * 100) / 100;
}
```

- [ ] **Step 2: Create GET/POST quotes route**

Create `quote-builder/src/app/api/quotes/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  const where = status ? { status } : {};
  const quotes = await db.quote.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      supplier: { select: { name: true } },
      lines: { orderBy: { sortOrder: "asc" } },
    },
  });
  return NextResponse.json(quotes);
}

const createSchema = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),
  projectAddress: z.string().min(1),
  supplierId: z.string().min(1),
  installationCost: z.number().min(0).default(0),
  timelineEstimate: z.string().optional(),
  termsAndConditions: z.string().optional(),
  notes: z.string().optional(),
  ghlContactId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const quote = await db.quote.create({ data: parsed.data });
  return NextResponse.json(quote, { status: 201 });
}
```

- [ ] **Step 3: Create GET/PUT/DELETE quote by ID route**

Create `quote-builder/src/app/api/quotes/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quote = await db.quote.findUnique({
    where: { id },
    include: {
      supplier: true,
      lines: { orderBy: { sortOrder: "asc" } },
    },
  });
  if (!quote) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(quote);
}

const updateSchema = z.object({
  clientName: z.string().min(1).optional(),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),
  projectAddress: z.string().min(1).optional(),
  supplierId: z.string().min(1).optional(),
  installationCost: z.number().min(0).optional(),
  timelineEstimate: z.string().optional(),
  termsAndConditions: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["draft", "sent", "approved", "rejected"]).optional(),
  ghlContactId: z.string().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const quote = await db.quote.update({ where: { id }, data: parsed.data });
  return NextResponse.json(quote);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.quote.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 4: Create quote lines route**

Create `quote-builder/src/app/api/quotes/[id]/lines/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { calculateLineTotal } from "@/lib/pricing";

const lineSchema = z.object({
  catalogItemId: z.string().optional(),
  description: z.string().min(1),
  dimensions: z.string().optional(),
  doorStyle: z.string().optional(),
  finish: z.string().optional(),
  hardware: z.string().optional(),
  quantity: z.number().int().min(1).default(1),
  unitCost: z.number().min(0),
  markupPct: z.number().min(0).max(100),
  sortOrder: z.number().int().default(0),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: quoteId } = await params;
  const body = await req.json();
  const parsed = lineSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const lineTotal = calculateLineTotal(
    parsed.data.unitCost,
    parsed.data.quantity,
    parsed.data.markupPct
  );

  const line = await db.quoteLine.create({
    data: { ...parsed.data, quoteId, lineTotal },
  });

  return NextResponse.json(line, { status: 201 });
}

const bulkSchema = z.array(lineSchema);

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: quoteId } = await params;
  const body = await req.json();
  const parsed = bulkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await db.quoteLine.deleteMany({ where: { quoteId } });

  const lines = await Promise.all(
    parsed.data.map((line, index) => {
      const lineTotal = calculateLineTotal(line.unitCost, line.quantity, line.markupPct);
      return db.quoteLine.create({
        data: { ...line, quoteId, lineTotal, sortOrder: index },
      });
    })
  );

  return NextResponse.json(lines);
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add quote and quote line CRUD API with pricing calculations"
```

### Task 4.6: Supplier Management UI

**Files:**
- Create: `quote-builder/src/app/suppliers/page.tsx`
- Create: `quote-builder/src/components/supplier-form.tsx`

- [ ] **Step 1: Create supplier list page**

Create `quote-builder/src/app/suppliers/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { SupplierForm } from "@/components/supplier-form";
import { Pencil, Trash2, Plus } from "lucide-react";

type Supplier = {
  id: string;
  name: string;
  markupPct: number;
  _count: { catalogItems: number };
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const res = await fetch("/api/suppliers");
    setSuppliers(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this supplier and all its catalog items?")) return;
    await fetch(`/api/suppliers/${id}`, { method: "DELETE" });
    load();
  };

  const handleSave = async (data: { name: string; markupPct: number }) => {
    if (editing) {
      await fetch(`/api/suppliers/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setEditing(null);
    setShowForm(false);
    load();
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={16} /> Add Supplier
        </button>
      </div>

      {showForm && (
        <SupplierForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setShowForm(false); }}
        />
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Markup %</th>
            <th className="py-3 px-4">Catalog Items</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{s.name}</td>
              <td className="py-3 px-4">{s.markupPct}%</td>
              <td className="py-3 px-4">{s._count.catalogItems}</td>
              <td className="py-3 px-4 flex gap-2">
                <button
                  onClick={() => { setEditing(s); setShowForm(true); }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Create supplier form component**

Create `quote-builder/src/components/supplier-form.tsx`:

```tsx
"use client";

import { useState } from "react";

type Props = {
  initial: { name: string; markupPct: number } | null;
  onSave: (data: { name: string; markupPct: number }) => void;
  onCancel: () => void;
};

export function SupplierForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [markupPct, setMarkupPct] = useState(initial?.markupPct ?? 25);

  return (
    <div className="bg-gray-50 border rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {initial ? "Edit Supplier" : "Add Supplier"}
      </h2>
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Supplier Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., SieMatic"
          />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium mb-1">Markup %</label>
          <input
            type="number"
            value={markupPct}
            onChange={(e) => setMarkupPct(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={0}
            max={100}
          />
        </div>
        <button
          onClick={() => onSave({ name, markupPct })}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Test supplier management UI**

Open `http://localhost:3000/suppliers`. Test add, edit, and delete suppliers.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add supplier management UI page"
```

### Task 4.7: Catalog Management UI

**Files:**
- Create: `quote-builder/src/app/catalog/page.tsx`
- Create: `quote-builder/src/components/catalog-item-form.tsx`

- [ ] **Step 1: Create catalog list page**

Create `quote-builder/src/app/catalog/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { CatalogItemForm } from "@/components/catalog-item-form";
import { Pencil, Trash2, Plus } from "lucide-react";

type Supplier = { id: string; name: string };
type CatalogItem = {
  id: string;
  name: string;
  category: string;
  basePriceUsd: number;
  unit: string;
  description: string | null;
  supplierId: string;
  supplier: { name: string };
};

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filterSupplier, setFilterSupplier] = useState("");
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadItems = async () => {
    const url = filterSupplier
      ? `/api/catalog?supplierId=${filterSupplier}`
      : "/api/catalog";
    const res = await fetch(url);
    setItems(await res.json());
  };

  const loadSuppliers = async () => {
    const res = await fetch("/api/suppliers");
    setSuppliers(await res.json());
  };

  useEffect(() => { loadSuppliers(); }, []);
  useEffect(() => { loadItems(); }, [filterSupplier]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this catalog item?")) return;
    await fetch(`/api/catalog/${id}`, { method: "DELETE" });
    loadItems();
  };

  const handleSave = async (data: Record<string, unknown>) => {
    if (editing) {
      await fetch(`/api/catalog/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setEditing(null);
    setShowForm(false);
    loadItems();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Catalog</h1>
        <div className="flex gap-4">
          <select
            value={filterSupplier}
            onChange={(e) => setFilterSupplier(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Suppliers</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>

      {showForm && (
        <CatalogItemForm
          initial={editing}
          suppliers={suppliers}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setShowForm(false); }}
        />
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Supplier</th>
            <th className="py-3 px-4">Base Price</th>
            <th className="py-3 px-4">Unit</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{item.name}</td>
              <td className="py-3 px-4">{item.category}</td>
              <td className="py-3 px-4">{item.supplier.name}</td>
              <td className="py-3 px-4">${item.basePriceUsd.toLocaleString()}</td>
              <td className="py-3 px-4">{item.unit}</td>
              <td className="py-3 px-4 flex gap-2">
                <button
                  onClick={() => { setEditing(item); setShowForm(true); }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Create catalog item form component**

Create `quote-builder/src/components/catalog-item-form.tsx`:

```tsx
"use client";

import { useState } from "react";

type Supplier = { id: string; name: string };

type Props = {
  initial: {
    name: string;
    category: string;
    basePriceUsd: number;
    unit: string;
    description: string | null;
    supplierId: string;
  } | null;
  suppliers: Supplier[];
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
};

export function CatalogItemForm({ initial, suppliers, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [basePriceUsd, setBasePriceUsd] = useState(initial?.basePriceUsd ?? 0);
  const [unit, setUnit] = useState(initial?.unit ?? "each");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [supplierId, setSupplierId] = useState(initial?.supplierId ?? suppliers[0]?.id ?? "");

  const categories = [
    "Base Cabinets", "Wall Cabinets", "Tall Cabinets", "Corner Cabinets",
    "Drawer Units", "Islands", "Pantry", "Hardware", "Accessories", "Other"
  ];

  return (
    <div className="bg-gray-50 border rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {initial ? "Edit Catalog Item" : "Add Catalog Item"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Supplier</label>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Base Cabinet 24in"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Base Price (USD)</label>
          <input
            type="number"
            value={basePriceUsd}
            onChange={(e) => setBasePriceUsd(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={0}
            step={0.01}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="each">Each</option>
            <option value="linear_ft">Linear Foot</option>
            <option value="sq_ft">Square Foot</option>
            <option value="set">Set</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Optional description"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onSave({ name, category, basePriceUsd, unit, description, supplierId })}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Test catalog management UI**

Open `http://localhost:3000/catalog`. Test add, edit, delete, and filter by supplier.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add catalog management UI page"
```

### Task 4.8: Quote Builder UI

**Files:**
- Create: `quote-builder/src/app/quotes/page.tsx`
- Create: `quote-builder/src/app/quotes/new/page.tsx`
- Create: `quote-builder/src/app/quotes/[id]/page.tsx`
- Create: `quote-builder/src/components/quote-line-editor.tsx`

- [ ] **Step 1: Create quotes list page**

Create `quote-builder/src/app/quotes/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Eye } from "lucide-react";
import { calculateQuoteTotal } from "@/lib/pricing";

type Quote = {
  id: string;
  clientName: string;
  projectAddress: string;
  supplier: { name: string };
  status: string;
  installationCost: number;
  createdAt: string;
  lines: { lineTotal: number }[];
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetch("/api/quotes").then((r) => r.json()).then(setQuotes);
  }, []);

  const statusColors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    sent: "bg-blue-100 text-blue-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quotes</h1>
        <Link
          href="/quotes/new"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={16} /> New Quote
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3 px-4">Client</th>
            <th className="py-3 px-4">Address</th>
            <th className="py-3 px-4">Supplier</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{q.clientName}</td>
              <td className="py-3 px-4">{q.projectAddress}</td>
              <td className="py-3 px-4">{q.supplier.name}</td>
              <td className="py-3 px-4">
                ${calculateQuoteTotal(q.lines, q.installationCost).toLocaleString()}
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded text-sm ${statusColors[q.status] ?? ""}`}>
                  {q.status}
                </span>
              </td>
              <td className="py-3 px-4">
                {new Date(q.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <Link href={`/quotes/${q.id}`} className="text-blue-600 hover:text-blue-800">
                  <Eye size={16} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Create new quote page**

Create `quote-builder/src/app/quotes/new/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Supplier = { id: string; name: string; markupPct: number };

export default function NewQuotePage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    projectAddress: "",
    supplierId: "",
    installationCost: 0,
    timelineEstimate: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/suppliers").then((r) => r.json()).then((data: Supplier[]) => {
      setSuppliers(data);
      if (data.length > 0) setForm((f) => ({ ...f, supplierId: data[0].id }));
    });
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const quote = await res.json();
    router.push(`/quotes/${quote.id}`);
  };

  const update = (field: string, value: string | number) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">New Quote</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Client Name</label>
          <input
            type="text"
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.clientEmail}
              onChange={(e) => update("clientEmail", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={form.clientPhone}
              onChange={(e) => update("clientPhone", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Project Address</label>
          <input
            type="text"
            value={form.projectAddress}
            onChange={(e) => update("projectAddress", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Supplier</label>
          <select
            value={form.supplierId}
            onChange={(e) => update("supplierId", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.markupPct}% markup)</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Installation Cost ($)</label>
            <input
              type="number"
              value={form.installationCost}
              onChange={(e) => update("installationCost", Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Timeline Estimate</label>
            <input
              type="text"
              value={form.timelineEstimate}
              onChange={(e) => update("timelineEstimate", e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., 8-12 weeks"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Create Quote & Add Line Items
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create quote detail/edit page**

Create `quote-builder/src/app/quotes/[id]/page.tsx`:

```tsx
"use client";

import { useEffect, useState, use } from "react";
import { QuoteLineEditor } from "@/components/quote-line-editor";
import { calculateQuoteTotal } from "@/lib/pricing";

type Supplier = { id: string; name: string; markupPct: number };
type QuoteLine = {
  id: string;
  description: string;
  dimensions: string | null;
  doorStyle: string | null;
  finish: string | null;
  hardware: string | null;
  quantity: number;
  unitCost: number;
  markupPct: number;
  lineTotal: number;
  catalogItemId: string | null;
};
type Quote = {
  id: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  projectAddress: string;
  supplier: Supplier;
  supplierId: string;
  installationCost: number;
  timelineEstimate: string | null;
  notes: string | null;
  status: string;
  lines: QuoteLine[];
};
type CatalogItem = {
  id: string;
  name: string;
  category: string;
  basePriceUsd: number;
  unit: string;
};

export default function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);

  const load = async () => {
    const res = await fetch(`/api/quotes/${id}`);
    const q = await res.json();
    setQuote(q);
    const catRes = await fetch(`/api/catalog?supplierId=${q.supplierId}`);
    setCatalog(await catRes.json());
  };

  useEffect(() => { load(); }, [id]);

  if (!quote) return <div className="p-8">Loading...</div>;

  const total = calculateQuoteTotal(quote.lines, quote.installationCost);

  const handleSendProposal = async () => {
    await fetch(`/api/quotes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "sent" }),
    });
    load();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{quote.clientName}</h1>
          <p className="text-gray-600">{quote.projectAddress}</p>
          <p className="text-gray-600">Supplier: {quote.supplier.name} ({quote.supplier.markupPct}% markup)</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/api/quotes/${id}/pdf`}
            target="_blank"
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Download PDF
          </a>
          {quote.status === "draft" && (
            <button
              onClick={handleSendProposal}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Send Proposal
            </button>
          )}
        </div>
      </div>

      <QuoteLineEditor
        quoteId={id}
        lines={quote.lines}
        catalog={catalog}
        defaultMarkupPct={quote.supplier.markupPct}
        onUpdate={load}
      />

      <div className="mt-6 border-t pt-4 text-right space-y-1">
        <p className="text-gray-600">
          Cabinets Subtotal: $
          {quote.lines.reduce((s, l) => s + l.lineTotal, 0).toLocaleString()}
        </p>
        <p className="text-gray-600">
          Installation: ${quote.installationCost.toLocaleString()}
        </p>
        <p className="text-xl font-bold">
          Total Investment: ${total.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create quote line editor component**

Create `quote-builder/src/components/quote-line-editor.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { calculateLineTotal } from "@/lib/pricing";

type CatalogItem = {
  id: string;
  name: string;
  category: string;
  basePriceUsd: number;
  unit: string;
};

type LineData = {
  catalogItemId?: string;
  description: string;
  dimensions: string;
  doorStyle: string;
  finish: string;
  hardware: string;
  quantity: number;
  unitCost: number;
  markupPct: number;
};

type Props = {
  quoteId: string;
  lines: LineData[];
  catalog: CatalogItem[];
  defaultMarkupPct: number;
  onUpdate: () => void;
};

const emptyLine = (markupPct: number): LineData => ({
  description: "",
  dimensions: "",
  doorStyle: "",
  finish: "",
  hardware: "",
  quantity: 1,
  unitCost: 0,
  markupPct,
});

export function QuoteLineEditor({ quoteId, lines: initialLines, catalog, defaultMarkupPct, onUpdate }: Props) {
  const [lines, setLines] = useState<LineData[]>(
    initialLines.length > 0 ? initialLines.map((l) => ({
      catalogItemId: (l as Record<string, unknown>).catalogItemId as string | undefined,
      description: l.description,
      dimensions: (l as Record<string, unknown>).dimensions as string ?? "",
      doorStyle: (l as Record<string, unknown>).doorStyle as string ?? "",
      finish: (l as Record<string, unknown>).finish as string ?? "",
      hardware: (l as Record<string, unknown>).hardware as string ?? "",
      quantity: l.quantity,
      unitCost: l.unitCost,
      markupPct: l.markupPct,
    })) : [emptyLine(defaultMarkupPct)]
  );

  const updateLine = (index: number, field: string, value: string | number) => {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  };

  const addFromCatalog = (item: CatalogItem) => {
    setLines((prev) => [
      ...prev,
      {
        catalogItemId: item.id,
        description: item.name,
        dimensions: "",
        doorStyle: "",
        finish: "",
        hardware: "",
        quantity: 1,
        unitCost: item.basePriceUsd,
        markupPct: defaultMarkupPct,
      },
    ]);
  };

  const removeLine = (index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const saveAll = async () => {
    await fetch(`/api/quotes/${quoteId}/lines`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lines),
    });
    onUpdate();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Line Items</h2>
        <div className="flex gap-2">
          <select
            onChange={(e) => {
              const item = catalog.find((c) => c.id === e.target.value);
              if (item) addFromCatalog(item);
              e.target.value = "";
            }}
            className="border rounded px-3 py-2"
            defaultValue=""
          >
            <option value="" disabled>Add from catalog...</option>
            {catalog.map((item) => (
              <option key={item.id} value={item.id}>
                {item.category} — {item.name} (${item.basePriceUsd})
              </option>
            ))}
          </select>
          <button
            onClick={() => setLines((prev) => [...prev, emptyLine(defaultMarkupPct)])}
            className="flex items-center gap-1 border px-3 py-2 rounded hover:bg-gray-100"
          >
            <Plus size={16} /> Custom Line
          </button>
        </div>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 px-2">Description</th>
            <th className="py-2 px-2">Dimensions</th>
            <th className="py-2 px-2">Door Style</th>
            <th className="py-2 px-2">Finish</th>
            <th className="py-2 px-2">Hardware</th>
            <th className="py-2 px-2 w-16">Qty</th>
            <th className="py-2 px-2 w-24">Unit Cost</th>
            <th className="py-2 px-2 w-20">Markup%</th>
            <th className="py-2 px-2 w-24">Line Total</th>
            <th className="py-2 px-2 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, i) => (
            <tr key={i} className="border-b">
              <td className="py-2 px-2">
                <input
                  type="text"
                  value={line.description}
                  onChange={(e) => updateLine(i, "description", e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="py-2 px-2">
                <input
                  type="text"
                  value={line.dimensions}
                  onChange={(e) => updateLine(i, "dimensions", e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  placeholder="24x34.5x24"
                />
              </td>
              <td className="py-2 px-2">
                <input
                  type="text"
                  value={line.doorStyle}
                  onChange={(e) => updateLine(i, "doorStyle", e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="py-2 px-2">
                <input
                  type="text"
                  value={line.finish}
                  onChange={(e) => updateLine(i, "finish", e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="py-2 px-2">
                <input
                  type="text"
                  value={line.hardware}
                  onChange={(e) => updateLine(i, "hardware", e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="py-2 px-2">
                <input
                  type="number"
                  value={line.quantity}
                  onChange={(e) => updateLine(i, "quantity", Number(e.target.value))}
                  className="w-full border rounded px-2 py-1"
                  min={1}
                />
              </td>
              <td className="py-2 px-2">
                <input
                  type="number"
                  value={line.unitCost}
                  onChange={(e) => updateLine(i, "unitCost", Number(e.target.value))}
                  className="w-full border rounded px-2 py-1"
                  min={0}
                  step={0.01}
                />
              </td>
              <td className="py-2 px-2">
                <input
                  type="number"
                  value={line.markupPct}
                  onChange={(e) => updateLine(i, "markupPct", Number(e.target.value))}
                  className="w-full border rounded px-2 py-1"
                  min={0}
                  max={100}
                />
              </td>
              <td className="py-2 px-2 font-medium">
                ${calculateLineTotal(line.unitCost, line.quantity, line.markupPct).toLocaleString()}
              </td>
              <td className="py-2 px-2">
                <button
                  onClick={() => removeLine(i)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={saveAll}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Save Line Items
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Test the full quote builder flow**

1. Open `http://localhost:3000/quotes/new`
2. Fill in client info, select supplier
3. Click "Create Quote & Add Line Items"
4. Add items from catalog dropdown and custom lines
5. Verify line totals calculate correctly with markup
6. Save line items
7. Verify total shows correctly

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add quote builder UI with line item editor"
```

### Task 4.9: PDF Proposal Generation

**Files:**
- Create: `quote-builder/src/app/api/quotes/[id]/pdf/route.ts`
- Create: `quote-builder/src/lib/proposal-pdf.tsx`

- [ ] **Step 1: Create PDF template component**

Create `quote-builder/src/lib/proposal-pdf.tsx`:

```tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 10 },
  header: { marginBottom: 30 },
  title: { fontSize: 24, fontFamily: "Helvetica-Bold", marginBottom: 5 },
  subtitle: { fontSize: 12, color: "#666", marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontFamily: "Helvetica-Bold", marginBottom: 10, marginTop: 20 },
  clientInfo: { marginBottom: 20 },
  clientRow: { flexDirection: "row", marginBottom: 3 },
  clientLabel: { width: 80, fontFamily: "Helvetica-Bold" },
  clientValue: { flex: 1 },
  table: { marginTop: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#1a1a1a", color: "#fff", padding: 8 },
  tableRow: { flexDirection: "row", padding: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  colDescription: { flex: 3 },
  colDetails: { flex: 2 },
  colQty: { width: 40, textAlign: "center" },
  colPrice: { width: 80, textAlign: "right" },
  totalSection: { marginTop: 20, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", marginBottom: 5 },
  totalLabel: { width: 150, textAlign: "right", paddingRight: 10 },
  totalValue: { width: 80, textAlign: "right" },
  grandTotal: { fontFamily: "Helvetica-Bold", fontSize: 14, marginTop: 5 },
  footer: { position: "absolute", bottom: 40, left: 50, right: 50 },
  footerText: { fontSize: 8, color: "#999", textAlign: "center" },
  terms: { marginTop: 30, fontSize: 8, color: "#666", lineHeight: 1.5 },
});

type Line = {
  description: string;
  dimensions: string | null;
  doorStyle: string | null;
  finish: string | null;
  hardware: string | null;
  quantity: number;
  lineTotal: number;
};

type ProposalData = {
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  projectAddress: string;
  supplierName: string;
  lines: Line[];
  installationCost: number;
  timelineEstimate: string | null;
  termsAndConditions: string | null;
  total: number;
  createdAt: string;
};

export function ProposalDocument({ data }: { data: ProposalData }) {
  const cabinetsSubtotal = data.lines.reduce((s, l) => s + l.lineTotal, 0);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INPLACE STUDIO</Text>
          <Text style={styles.subtitle}>Kitchen Design Proposal</Text>
        </View>

        <View style={styles.clientInfo}>
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Prepared for:</Text>
            <Text style={styles.clientValue}>{data.clientName}</Text>
          </View>
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Address:</Text>
            <Text style={styles.clientValue}>{data.projectAddress}</Text>
          </View>
          {data.clientEmail && (
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Email:</Text>
              <Text style={styles.clientValue}>{data.clientEmail}</Text>
            </View>
          )}
          {data.clientPhone && (
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Phone:</Text>
              <Text style={styles.clientValue}>{data.clientPhone}</Text>
            </View>
          )}
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Date:</Text>
            <Text style={styles.clientValue}>
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </Text>
          </View>
          {data.timelineEstimate && (
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Timeline:</Text>
              <Text style={styles.clientValue}>{data.timelineEstimate}</Text>
            </View>
          )}
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Cabinetry:</Text>
            <Text style={styles.clientValue}>{data.supplierName}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Cabinetry & Specifications</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDescription}>Description</Text>
            <Text style={styles.colDetails}>Details</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colPrice}>Price</Text>
          </View>
          {data.lines.map((line, i) => {
            const details = [line.dimensions, line.doorStyle, line.finish, line.hardware]
              .filter(Boolean)
              .join(" | ");
            return (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.colDescription}>{line.description}</Text>
                <Text style={styles.colDetails}>{details}</Text>
                <Text style={styles.colQty}>{line.quantity}</Text>
                <Text style={styles.colPrice}>${line.lineTotal.toLocaleString()}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Cabinetry Subtotal:</Text>
            <Text style={styles.totalValue}>${cabinetsSubtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Installation:</Text>
            <Text style={styles.totalValue}>${data.installationCost.toLocaleString()}</Text>
          </View>
          <View style={[styles.totalRow, { borderTopWidth: 2, borderTopColor: "#000", paddingTop: 5 }]}>
            <Text style={[styles.totalLabel, styles.grandTotal]}>Total Investment:</Text>
            <Text style={[styles.totalValue, styles.grandTotal]}>${data.total.toLocaleString()}</Text>
          </View>
        </View>

        {data.termsAndConditions && (
          <View>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
            <Text style={styles.terms}>{data.termsAndConditions}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Inplace Studio | inplacestudio.com | This proposal is valid for 30 days from the date above.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
```

- [ ] **Step 2: Create PDF API route**

Create `quote-builder/src/app/api/quotes/[id]/pdf/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "@/lib/db";
import { calculateQuoteTotal } from "@/lib/pricing";
import { ProposalDocument } from "@/lib/proposal-pdf";
import React from "react";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quote = await db.quote.findUnique({
    where: { id },
    include: {
      supplier: true,
      lines: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!quote) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const total = calculateQuoteTotal(quote.lines, quote.installationCost);

  const buffer = await renderToBuffer(
    React.createElement(ProposalDocument, {
      data: {
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        clientPhone: quote.clientPhone,
        projectAddress: quote.projectAddress,
        supplierName: quote.supplier.name,
        lines: quote.lines,
        installationCost: quote.installationCost,
        timelineEstimate: quote.timelineEstimate,
        termsAndConditions: quote.termsAndConditions,
        total,
        createdAt: quote.createdAt.toISOString(),
      },
    })
  );

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="Inplace-Studio-Proposal-${quote.clientName.replace(/\s+/g, "-")}.pdf"`,
    },
  });
}
```

- [ ] **Step 3: Test PDF generation**

Create a quote with line items, then visit `http://localhost:3000/api/quotes/<QUOTE_ID>/pdf`. Verify:
- PDF renders with Inplace Studio branding
- Client info is correct
- Line items show descriptions, details, quantities, and client prices (no cost breakdown)
- Totals are correct
- Footer shows

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add PDF proposal generation for quotes"
```

### Task 4.10: App Navigation & Layout

**Files:**
- Modify: `quote-builder/src/app/layout.tsx`
- Create: `quote-builder/src/components/nav.tsx`
- Modify: `quote-builder/src/app/page.tsx`

- [ ] **Step 1: Create navigation component**

Create `quote-builder/src/components/nav.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/quotes", label: "Quotes" },
  { href: "/catalog", label: "Catalog" },
  { href: "/suppliers", label: "Suppliers" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white px-8 py-4">
      <div className="max-w-6xl mx-auto flex items-center gap-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          INPLACE STUDIO
        </Link>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-gray-300 ${
                pathname === link.href ? "text-white font-medium" : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Update root layout**

Modify `quote-builder/src/app/layout.tsx` to include the Nav component in the body.

- [ ] **Step 3: Create dashboard home page**

Replace `quote-builder/src/app/page.tsx` with a simple dashboard showing:
- Count of quotes by status (draft, sent, approved)
- Recent quotes list
- Quick links to create new quote, manage catalog

- [ ] **Step 4: Test navigation**

Navigate between all pages. Verify nav highlighting works, all pages load.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add app navigation, layout, and dashboard page"
```

### Task 4.11: GHL Integration — Send Proposal

**Files:**
- Create: `quote-builder/src/lib/ghl.ts`
- Modify: `quote-builder/src/app/api/quotes/[id]/route.ts`

- [ ] **Step 1: Create GHL API client**

Create `quote-builder/src/lib/ghl.ts`:

```typescript
const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_BASE_URL = "https://services.leadconnectorhq.com";

async function ghlFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${GHL_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
      ...options.headers,
    },
  });
  return res.json();
}

export async function sendEmail(
  contactId: string,
  subject: string,
  htmlBody: string
) {
  return ghlFetch(`/conversations/messages`, {
    method: "POST",
    body: JSON.stringify({
      type: "Email",
      contactId,
      subject,
      html: htmlBody,
      locationId: GHL_LOCATION_ID,
    }),
  });
}

export async function updateContactCustomField(
  contactId: string,
  customFields: Record<string, string | number>
) {
  return ghlFetch(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify({ customFields }),
  });
}

export async function moveContactPipelineStage(
  contactId: string,
  pipelineId: string,
  stageId: string
) {
  return ghlFetch(`/opportunities/`, {
    method: "POST",
    body: JSON.stringify({
      contactId,
      pipelineId,
      pipelineStageId: stageId,
      locationId: GHL_LOCATION_ID,
    }),
  });
}
```

- [ ] **Step 2: Add "send proposal" logic to quote update**

When quote status changes to "sent", trigger GHL email with proposal PDF link and update the contact's Quote Amount field.

Add to the PUT handler in `quote-builder/src/app/api/quotes/[id]/route.ts`:

```typescript
// After the quote is updated, if status changed to "sent":
if (parsed.data.status === "sent") {
  const fullQuote = await db.quote.findUnique({
    where: { id },
    include: { supplier: true, lines: true },
  });
  if (fullQuote?.ghlContactId) {
    const { sendEmail, updateContactCustomField } = await import("@/lib/ghl");
    const total = calculateQuoteTotal(fullQuote.lines, fullQuote.installationCost);

    await updateContactCustomField(fullQuote.ghlContactId, {
      quote_amount: total,
    });

    const proposalUrl = `${process.env.NEXTAUTH_URL}/api/quotes/${id}/pdf`;
    await sendEmail(
      fullQuote.ghlContactId,
      `Your Kitchen Design Proposal from Inplace Studio`,
      `<p>Hi ${fullQuote.clientName},</p>
       <p>Thank you for choosing Inplace Studio! Please find your kitchen design proposal below:</p>
       <p><a href="${proposalUrl}" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;">View Your Proposal</a></p>
       <p>If you have any questions, don't hesitate to reach out.</p>
       <p>Warm regards,<br>The Inplace Studio Team</p>`
    );
  }
}
```

- [ ] **Step 3: Test GHL integration**

Create a quote with a GHL contact ID. Change status to "sent". Verify:
- Email sent to the contact in GHL
- Quote Amount custom field updated on the contact

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add GHL integration for sending proposals via email"
```

---

## Phase 5: Contract, Ordering & Project Lifecycle Automations

**Goal:** Build the Pebble Connect and GHL automations for stages 6-12 (contract through close-out).

### Task 5.1: Contract Signing Workflow

**Where:** Pebble Connect + GHL + BoloForms

- [ ] **Step 1: Create BoloForms contract template**

Create a contract template in BoloForms with merge fields:
- `{{client_name}}`
- `{{client_email}}`
- `{{project_address}}`
- `{{cabinet_supplier}}`
- `{{total_investment}}`
- `{{deposit_amount}}` (50% of total)
- `{{mid_payment_amount}}` (40% of total)
- `{{final_payment_amount}}` (10% of total)
- `{{timeline_estimate}}`
- `{{scope_of_work}}` (line items summary)
- `{{date}}`

- [ ] **Step 2: Create Pebble Connect automation — Generate Contract**

```
Trigger: GHL Pipeline Stage Change → "Contract Signed" stage (Stage 6)
         OR: Webhook from Quote Builder when quote status = "approved"
Actions:
  1. Fetch quote data from Quote Builder API
  2. Calculate payment schedule (50/40/10 split)
  3. Create BoloForms document from template with merged data
  4. Send BoloForms signing link to client via GHL SMS + Email
```

- [ ] **Step 3: Create GHL SMS/Email templates for contract**

| Template | Content |
|----------|---------|
| Contract Ready SMS | "Hi {{contact.first_name}}, your kitchen project contract is ready for review and signature. Please check your email for the signing link." |
| Contract Ready Email | Subject: "Your Inplace Studio Contract" — body with BoloForms signing link, payment schedule summary, timeline |
| Contract Reminder SMS (48hr) | "Hi {{contact.first_name}}, friendly reminder — your Inplace Studio contract is waiting for your signature. Questions? Reply here." |
| Contract Signed SMS | "Thank you, {{contact.first_name}}! Your contract is signed. We'll send your deposit invoice shortly. Your dream kitchen is on its way!" |

- [ ] **Step 4: Create Pebble Connect automation — Contract Signed**

```
Trigger: BoloForms — Document Signed
Actions:
  1. Update GHL contact: move to Pipeline Stage 7 "Order Placed with Supplier"
  2. Update GHL custom fields: Contract Amount, Deposit Amount, payment schedule
  3. Send SMS: "Contract Signed" template
  4. Trigger GHL invoice for deposit amount
  5. Notify Nikita via SMS: "Contract signed for [Client]. Deposit invoice sent. Ready to place order once deposit received."
```

- [ ] **Step 5: Create GHL workflow — Contract Reminder**

```
Trigger: Contact in Stage 6 for 48 hours AND contract not signed
Actions:
  1. Send SMS: "Contract Reminder" template
  2. Wait 3 more days
  3. IF still not signed → Notify Sarjit: "Contract unsigned for 5 days — [Client] [Phone]"
```

- [ ] **Step 6: Test contract flow end-to-end**

### Task 5.2: Payment Collection Automations

**Where:** GHL Workflows

- [ ] **Step 1: Create GHL workflow — Deposit Payment**

```
Trigger: GHL Invoice Paid (deposit)
Actions:
  1. Update custom field: Deposit Paid = true
  2. Send SMS: "Thank you for your deposit, {{contact.first_name}}! We're placing your cabinet order now."
  3. Send Email: Receipt + next steps
  4. Notify Nikita: "Deposit received for [Client] — ready to place order"
```

- [ ] **Step 2: Create GHL workflow — Mid-Payment Reminder**

```
Trigger: 7 days before Installation Start Date
Actions:
  1. Send GHL invoice for mid-payment (40%)
  2. Send SMS: "Hi {{contact.first_name}}, your installation is coming up on {{contact.installation_start_date}}! Your pre-installation payment of {{contact.mid_payment_amount}} is due. Invoice link: [link]"
  3. Wait 4 days → IF unpaid → reminder SMS
```

- [ ] **Step 3: Create GHL workflow — Final Payment**

```
Trigger: Contact moves to Stage 12 "Payment Collection / Closed"
Actions:
  1. Send GHL invoice for final payment (10%)
  2. Send SMS: "Your kitchen is complete! Final invoice for {{contact.final_payment_amount}} has been sent to your email."
  3. Wait 7 days → IF unpaid → reminder SMS + notify Sarjit
```

- [ ] **Step 4: Test payment flows**

### Task 5.3: Supplier Ordering Workflow

**Where:** Pebble Connect + GHL

- [ ] **Step 1: Create Pebble Connect automation — Order Placed**

```
Trigger: Nikita updates GHL custom fields (PO Number + Estimated Delivery Date populated)
Actions:
  1. Send client SMS: "Your cabinets have been ordered! Estimated delivery: {{contact.estimated_delivery_date}}. We'll keep you updated."
  2. Send client Email: Order confirmation with timeline, what to expect next
  3. Create GHL task for Fernando: "Prepare for delivery/installation — [Client] — ETA [date]"
```

- [ ] **Step 2: Create Pebble Connect automation — Delivery Reminder**

```
Trigger: 14 days before Estimated Delivery Date
Actions:
  1. Send client SMS: "Your cabinets are arriving in about 2 weeks! Prep instructions: [link/details]"
  2. Notify Fernando: "Delivery in 2 weeks for [Client] — start scheduling installation"
```

- [ ] **Step 3: Create Pebble Connect automation — Delivery Date Change**

```
Trigger: GHL Custom Field "Estimated Delivery Date" updated
Actions:
  1. Send client SMS: "Update on your kitchen project — your new estimated delivery date is {{contact.estimated_delivery_date}}. We'll keep you posted."
  2. Update Fernando's task with new date
```

- [ ] **Step 4: Test ordering workflows**

### Task 5.4: Installation & Completion Workflows

**Where:** Pebble Connect + GHL

- [ ] **Step 1: Create Pebble Connect automation — Installation Scheduling**

```
Trigger: Contact moves to Stage 10 "Installation"
Actions:
  1. Send subcontractor automated assignment email/SMS:
     - Client name, address, phone
     - Scope of work (from quote line items)
     - Preferred dates
     - Link to confirm schedule
  2. Once subcontractor confirms → Send client SMS: "Installation is booked for {{contact.installation_start_date}}. Your installer is {{contact.installer_name}}. Expected duration: [X] days."
```

- [ ] **Step 2: Create GHL workflow — Installation Reminders**

```
Trigger: 1 day before Installation Start Date
Actions:
  1. Send client SMS: "Reminder — your kitchen installation starts tomorrow! Please ensure the kitchen area is accessible."
  2. Send subcontractor SMS: "Reminder — Installation tomorrow for [Client] at [Address]. Contact: [Phone]."
```

- [ ] **Step 3: Create GHL workflow — Post-Installation**

```
Trigger: Contact moves to Stage 11 "Punch List / Final Walkthrough"
Actions:
  1. Send client SMS: "Installation is complete! Let's schedule your final walkthrough."
  2. Send Email with walkthrough scheduling link (Fernando's calendar)
```

- [ ] **Step 4: Create GHL workflow — Close-Out Sequence**

```
Trigger: Contact moves to Stage 12 AND Final Payment Paid = true
Actions:
  1. [Immediate] Send thank-you SMS + email (warranty info, care instructions, designer contact)
  2. [7 days] Send SMS: "How are you enjoying your new kitchen? We'd love a review!" + Google Review link + Houzz link + Yelp link
  3. [30 days] Send Email: Referral program — "Refer a friend and receive [incentive]"
  4. [6 months] Send Email: "How's everything holding up? We're here if you need anything."
  5. [1 year] Send Email: Anniversary + maintenance tips
```

- [ ] **Step 5: Test installation and close-out flows**

---

## Phase 6: Marketing Automation, Reporting & Dashboards

**Goal:** Set up nurture campaigns, ad ROI tracking, reputation management, and team dashboards.

### Task 6.1: Nurture Campaign Workflows

**Where:** GHL Workflows

- [ ] **Step 1: Create GHL workflow — Lead Nurture Sequence**

```
Trigger: Contact tagged "Nurture" (from Speed-to-Lead timeout)
Actions:
  1. [Immediate] Add to GHL email campaign "Monthly Newsletter"
  2. [30 days] Send Email: "Still thinking about your kitchen? Here's a recent project we completed" + project photos
  3. [60 days] Send Email: Design trends + seasonal promo if applicable
  4. [90 days] Send SMS: "Hi {{contact.first_name}}, Inplace Studio here. Still dreaming of a new kitchen? We'd love to help — reply to chat or book a time: [link]"
  5. [After 90 days] Move to "Cold" tag, reduce frequency to quarterly
```

- [ ] **Step 2: Create GHL email campaign — Monthly Newsletter**

Set up recurring monthly email:
- Design trends and inspiration
- Recently completed project showcase (rotate monthly)
- Seasonal promotions
- CTA to book consultation

- [ ] **Step 3: Create GHL workflow — Past Client Referral Campaign**

```
Trigger: Contact in Stage 12 AND Final Payment Paid = true AND 90+ days since close
Frequency: Quarterly
Actions:
  1. Send Email: Portfolio update + "Know someone who needs a kitchen? Refer them and receive [incentive]"
```

- [ ] **Step 4: Test nurture and referral flows**

### Task 6.2: Ad ROI Tracking Setup

**Where:** Google Ads + Meta Ads + GHL + Pebble Connect

- [ ] **Step 1: Configure Google Ads UTM parameters**

Set up auto-tagging and UTM template for all Google Ads campaigns:
```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}
```

- [ ] **Step 2: Configure Meta Ads UTM parameters**

Set up UTM template for all Meta ad sets:
```
utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```

- [ ] **Step 3: Verify UTM data flows into GHL contacts**

Create test leads through each ad platform. Confirm UTM Source, UTM Medium, UTM Campaign, UTM Term fields are populated on the GHL contact.

- [ ] **Step 4: Create Pebble Connect automation — Monthly ROI Report**

```
Trigger: Cron — 1st of each month at 8am
Actions:
  1. Query GHL API for contacts created last month, grouped by Lead Source
  2. Query GHL API for opportunities closed last month with amounts
  3. Calculate: leads per source, conversion rate, revenue per source
  4. Format report as HTML email
  5. Send to Sarjit's email
```

- [ ] **Step 5: Test monthly report**

### Task 6.3: Reputation Management

**Where:** GHL + Pebble Connect

- [ ] **Step 1: Create GHL workflow — Review Request**

This is already part of the Close-Out sequence (Task 5.4, Step 4, item 2). Verify it includes:
- Google Review link
- Houzz review link
- Yelp review link

- [ ] **Step 2: Set up review monitoring (Pebble Connect)**

```
Trigger: Google Business Profile — New Review
Actions:
  1. IF rating < 4 stars → Send SMS to Sarjit + Nikita: "New [X]-star review on Google: '[review text preview]'. Respond ASAP."
  2. IF rating >= 4 stars → Send SMS to Sarjit: "New [X]-star review on Google! '[review text preview]'"
```

- [ ] **Step 3: Test review monitoring**

### Task 6.4: Team Dashboards

**Where:** GHL Dashboards

- [ ] **Step 1: Create Sarjit's dashboard**

GHL Dashboard with widgets:
- New leads this month (count + chart by source)
- Pipeline value by stage
- Conversion rate (leads → signed contracts)
- Revenue closed this month
- Ad spend vs revenue (if Google/Meta spend data available)

- [ ] **Step 2: Create Nikita's dashboard**

GHL Dashboard with widgets:
- Quotes in "draft" status (action needed)
- Quotes in "sent" status (awaiting response)
- Pending supplier orders
- Upcoming payment due dates
- Overdue payments

- [ ] **Step 3: Create Celeste's dashboard**

GHL Dashboard with widgets:
- Upcoming consultations this week
- Active design projects (Stage 4)
- Proposals awaiting response (Stage 5)

- [ ] **Step 4: Create Fernando's dashboard**

GHL Dashboard with widgets:
- Upcoming deliveries
- Active installations
- Punch list items
- Completed this month

- [ ] **Step 5: Test all dashboards**

Verify each team member can access their dashboard and data displays correctly.

---

## Implementation Order

Execute phases in this order:

1. **Phase 1** (GHL Foundation) — must be first, everything depends on it
2. **Phase 4** (Quote Builder) — can start in parallel with Phase 2, longest build time
3. **Phase 2** (Lead Capture) — depends on Phase 1
4. **Phase 3** (AI Voice) — depends on Phases 1 & 2
5. **Phase 5** (Contract & Lifecycle) — depends on Phases 1 & 4
6. **Phase 6** (Marketing & Dashboards) — depends on Phases 1 & 2

Phases 2 and 4 can run in parallel. Phase 3 can start once Phase 2 is complete. Phases 5 and 6 can run in parallel once their dependencies are met.
