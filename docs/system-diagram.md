# Inplace Studio — Full System Architecture

## How Everything Connects

```
╔══════════════════════════════════════════════════════════════════════════════════╗
║                            LEAD SOURCES                                         ║
╠══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                  ║
║   Phone Call     Walk-In      Google Ads    Meta (FB/IG)    Website     Google   ║
║   (RingCentral)  (Tablet)     (Landing      (Lead Ads)      Chat       Business ║
║       │            │           Page)            │             │        Profile   ║
║       │            │             │              │             │           │      ║
╚═══════╪════════════╪═════════════╪══════════════╪═════════════╪═══════════╪══════╝
        │            │             │              │             │           │
        ▼            ▼             ▼              ▼             ▼           ▼
╔══════════════════════════════════════════════════════════════════════════════════╗
║                         PEBBLE CONNECT                                          ║
║                    (Automation Router)                                           ║
║                                                                                  ║
║  Listens for events from all sources, reformats data, and sends to the          ║
║  Automation Engine via webhooks                                                  ║
║                                                                                  ║
║  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐     ║
║  │ Meta Lead   │  │ GBP Message  │  │ RingCentral  │  │ GHL Form Submit  │     ║
║  │ → /new-lead │  │ → /new-lead  │  │ → /missed-   │  │ → /new-lead      │     ║
║  │             │  │              │  │    call       │  │                  │     ║
║  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘     ║
║         │                │                 │                   │               ║
╚═════════╪════════════════╪═════════════════╪═══════════════════╪═══════════════╝
          │                │                 │                   │
          ▼                ▼                 ▼                   ▼
╔══════════════════════════════════════════════════════════════════════════════════╗
║                    AUTOMATION ENGINE                                            ║
║            inplace-automation-engine.vercel.app                                 ║
║                                                                                  ║
║  ┌──────────────────────────────────────────────────────────────────────────┐   ║
║  │                        WEBHOOK ENDPOINTS                                │   ║
║  │                                                                         │   ║
║  │  POST /api/webhooks/new-lead          ← All new leads from any source  │   ║
║  │  POST /api/webhooks/missed-call       ← RingCentral missed calls       │   ║
║  │  POST /api/webhooks/reply-received    ← Lead replies (stops sequence)  │   ║
║  │  POST /api/webhooks/stage-change      ← Pipeline stage notifications   │   ║
║  │  GET  /api/webhooks/process-sequences ← Cron (every 1 min)            │   ║
║  └──────────────────────────────────────────────────────────────────────────┘   ║
║                              │                                                  ║
║                              ▼                                                  ║
║  ┌──────────────────────────────────────────────────────────────────────────┐   ║
║  │                      PROCESSING PIPELINE                                │   ║
║  │                                                                         │   ║
║  │  1. LEAD SCORING (0-100 pts)                                           │   ║
║  │     Source: Google Ads=30, Walk-In=30, Referral=35, Meta=15            │   ║
║  │     Budget: $200K+=25, $100-200K=20, $50-100K=15                       │   ║
║  │     Timeline: ASAP=25, 1-3mo=20, 3-6mo=15                             │   ║
║  │     Score > 70 → HIGH (alert Sarjit immediately)                       │   ║
║  │     Score > 50 → MEDIUM                                                │   ║
║  │     Score ≤ 50 → LOW (nurture)                                         │   ║
║  │                                                                         │   ║
║  │  2. SPEED-TO-LEAD SEQUENCE                                              │   ║
║  │     ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  │   ║
║  │     │ Step 0  │→ │ Step 1  │→ │ Step 2  │→ │ Step 3  │→ │ Step 4  │  │   ║
║  │     │ 0 sec   │  │ 5 min   │  │ 1 hour  │  │ 24 hrs  │  │ 3 days  │  │   ║
║  │     │ SMS +   │  │ Vapi AI │  │ Portfolio│  │ SMS     │  │ SMS     │  │   ║
║  │     │ Email   │  │ callback│  │ Email   │  │ follow  │  │ "saved  │  │   ║
║  │     │         │  │         │  │         │  │ up      │  │ a spot" │  │   ║
║  │     └─────────┘  └─────────┘  └─────────┘  └─────────┘  └────┬────┘  │   ║
║  │                                                               │       │   ║
║  │     If lead replies at ANY step → sequence stops              │       │   ║
║  │     If no reply after Step 4 → Step 5 (7 days) → "Nurture"   │       │   ║
║  │     tag added, move to nurture campaigns                      │       │   ║
║  │                                                                         │   ║
║  │  3. STAGE-BASED NOTIFICATIONS                                           │   ║
║  │     Stage 2 (Consultation)  → Confirmation SMS + Email                 │   ║
║  │     Stage 3 (Measurement)   → Scheduling SMS + Prep checklist          │   ║
║  │     Stage 4 (Design)        → "Design started" SMS                     │   ║
║  │     Stage 5 (Proposal)      → Proposal notification                    │   ║
║  └──────────────────────────────────────────────────────────────────────────┘   ║
║                              │                                                  ║
╚══════════════════════════════╪══════════════════════════════════════════════════╝
                               │
                               ▼
╔══════════════════════════════════════════════════════════════════════════════════╗
║                        GOHIGHLEVEL CRM                                         ║
║                                                                                  ║
║  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────────────────┐     ║
║  │   CONTACTS       │  │   PIPELINE        │  │   COMMUNICATIONS          │     ║
║  │                  │  │                   │  │                           │     ║
║  │ • Name, Phone   │  │ Kitchen Projects  │  │ • SMS (automated)        │     ║
║  │ • Email         │  │                   │  │ • Email (automated)      │     ║
║  │ • Lead Source   │  │ 1.  New Lead      │  │ • Call recordings        │     ║
║  │ • Lead Score    │  │ 2.  Consultation  │  │                           │     ║
║  │ • Budget Range  │  │ 3.  Measurement   │  │                           │     ║
║  │ • Timeline      │  │ 4.  Design        │  └────────────────────────────┘     ║
║  │ • Kitchen Type  │  │ 5.  Proposal      │                                     ║
║  │ • Style Pref    │  │ 6.  Contract      │  ┌────────────────────────────┐     ║
║  │ • UTM Data      │  │ 7.  Order Placed  │  │   INVOICING               │     ║
║  │ • Cabinet Supplier│ │ 8.  Manufacturing │  │                           │     ║
║  │ • PO Number     │  │ 9.  Delivery      │  │ • Deposit (50%)          │     ║
║  │ • Delivery Date │  │ 10. Installation  │  │ • Mid-payment (40%)      │     ║
║  │ • Install Dates │  │ 11. Punch List    │  │ • Final (10%)            │     ║
║  │ • Payment Status│  │ 12. Closed        │  │                           │     ║
║  └─────────────────┘  └──────────────────┘  └────────────────────────────┘     ║
║                                                                                  ║
╚══════════════════════════════════════════════════════════════════════════════════╝

                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼

╔═══════════════════╗  ╔═══════════════════╗  ╔═══════════════════╗
║   QUOTE BUILDER    ║  ║   VAPI AI VOICE    ║  ║   BOLOFORMS       ║
║                    ║  ║                    ║  ║                    ║
║ inplace-quote-     ║  ║ (Phase 3 - Next)   ║  ║ Contracts &       ║
║ builder.vercel.app ║  ║                    ║  ║ E-signatures      ║
║                    ║  ║ • Answers calls    ║  ║                    ║
║ • Supplier catalog ║  ║ • Qualifies leads  ║  ║ • Auto-generated  ║
║ • Cabinet pricing  ║  ║ • Books consults   ║  ║ • Pre-filled      ║
║ • Markup engine    ║  ║ • Transfers calls  ║  ║ • Signing link    ║
║ • PDF proposals    ║  ║ • 5-min callback   ║  ║ • Payment trigger ║
║ • GHL integration  ║  ║                    ║  ║                    ║
╚═══════════════════╝  ╚═══════════════════╝  ╚═══════════════════╝


══════════════════════════════════════════════════════════════════════════════════
                        COMPLETE LEAD JOURNEY
══════════════════════════════════════════════════════════════════════════════════

    ┌─────────┐     ┌─────────────┐     ┌────────────┐     ┌──────────────┐
    │ LEAD    │     │ SPEED-TO-   │     │ CONSULT    │     │ SITE         │
    │ ARRIVES │────▶│ LEAD        │────▶│ BOOKED     │────▶│ MEASUREMENT  │
    │         │     │ (auto SMS/  │     │ (auto      │     │ (auto prep   │
    │ Score:  │     │  email/call)│     │  confirm)  │     │  checklist)  │
    │ 0-100   │     │             │     │            │     │              │
    └─────────┘     └─────────────┘     └────────────┘     └──────┬───────┘
                                                                   │
    ┌─────────────────────────────────────────────────────────────┘
    │
    ▼
    ┌────────────┐     ┌──────────────┐     ┌────────────┐     ┌──────────────┐
    │ DESIGN     │     │ PROPOSAL     │     │ CONTRACT   │     │ ORDER        │
    │ PHASE      │────▶│ SENT         │────▶│ SIGNED     │────▶│ PLACED       │
    │ (auto      │     │ (Quote       │     │ (BoloForms │     │ (auto notify │
    │  update    │     │  Builder PDF)│     │  auto-gen) │     │  client)     │
    │  to client)│     │              │     │            │     │              │
    └────────────┘     └──────────────┘     └────────────┘     └──────┬───────┘
                                                                      │
    ┌─────────────────────────────────────────────────────────────────┘
    │
    ▼
    ┌────────────┐     ┌──────────────┐     ┌────────────┐     ┌──────────────┐
    │ MANUFAC-   │     │ DELIVERY     │     │ INSTALL    │     │ PUNCH LIST   │
    │ TURING     │────▶│              │────▶│            │────▶│ & WALKTHRU   │
    │ (auto 2-wk │     │ (auto remind │     │ (auto      │     │ (auto        │
    │  reminder) │     │  + prep)     │     │  daily     │     │  schedule)   │
    │            │     │              │     │  updates)  │     │              │
    └────────────┘     └──────────────┘     └────────────┘     └──────┬───────┘
                                                                      │
                                                                      ▼
                                                           ┌──────────────────┐
                                                           │ CLOSED           │
                                                           │                  │
                                                           │ • Final payment  │
                                                           │ • Thank you      │
                                                           │ • Review request │
                                                           │   (7 days)       │
                                                           │ • Referral ask   │
                                                           │   (30 days)      │
                                                           │ • Check-in       │
                                                           │   (6 months)     │
                                                           │ • Anniversary    │
                                                           │   (1 year)       │
                                                           └──────────────────┘


══════════════════════════════════════════════════════════════════════════════════
                           TEAM ROLES
══════════════════════════════════════════════════════════════════════════════════

    SARJIT (Owner - Sales/Marketing)
    ├── Receives high-score lead alerts (SMS)
    ├── Monitors ad ROI dashboard
    ├── Handles consultations
    └── Approves review responses

    NIKITA (Owner - Admin/Estimating)
    ├── Creates quotes in Quote Builder
    ├── Manages supplier pricing/catalog
    ├── Places supplier orders
    └── Tracks payments

    CELESTE (Designer/Sales)
    ├── Handles consultations
    ├── Manages design phase
    └── Presents proposals

    FERNANDO (Project Manager)
    ├── Schedules installations
    ├── Coordinates subcontractors
    ├── Manages punch lists
    └── Handles delivery/walkthrough

    SUBCONTRACTORS
    ├── Receive automated job assignments
    ├── Get schedule reminders
    └── Receive punch list notifications
```
