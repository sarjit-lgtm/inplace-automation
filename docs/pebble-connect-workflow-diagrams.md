# Pebble Connect Workflow Diagrams — Inplace Studio

## Overview: How Pebble Connect Fits In

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE BIG PICTURE                               │
│                                                                  │
│   LEAD SOURCES          PEBBLE CONNECT         YOUR SYSTEMS      │
│   (where leads          (the middle man)        (where work       │
│    come from)           connects everything)     happens)         │
│                                                                  │
│   ┌──────────┐          ┌──────────────┐        ┌─────────────┐ │
│   │ Someone  │  event   │  Pebble      │  POST  │ Automation  │ │
│   │ calls,   │────────▶ │  catches it, │──────▶ │ Engine      │ │
│   │ fills a  │          │  reformats,  │        │ scores lead,│ │
│   │ form,    │          │  sends to    │        │ sends SMS,  │ │
│   │ clicks   │          │  your engine │        │ creates     │ │
│   │ an ad    │          │              │        │ GHL contact │ │
│   └──────────┘          └──────────────┘        └─────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## What is a Pebble Connect Workflow?

A workflow has 3 parts:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   TRIGGER    │────▶│  CONDITION   │────▶│   ACTION     │
│              │     │  (optional)  │     │              │
│ "When THIS   │     │ "Only IF     │     │ "Then DO     │
│  happens..." │     │  this is     │     │  this..."    │
│              │     │  true..."    │     │              │
│ Examples:    │     │              │     │ Examples:    │
│ • Form filled│     │ Examples:    │     │ • Send HTTP  │
│ • Call missed│     │ • Has tag X  │     │   request    │
│ • Ad clicked │     │ • Is new     │     │ • Create     │
│ • Stage moved│     │   contact    │     │   record     │
│ • SMS received│    │              │     │ • Send data  │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## Workflow 1: Walk-In Lead

**What happens:** Someone walks into the La Jolla showroom. Your team enters their info on the tablet form. The automation kicks in instantly.

```
SHOWROOM TABLET                PEBBLE CONNECT              AUTOMATION ENGINE
                                                           (your server)
┌─────────────────┐                                        
│ Team fills out  │                                        
│ "Walk-In Lead   │                                        
│  Capture" form  │                                        
│                 │                                        
│ • John Smith    │                                        
│ • 858-555-1234  │                                        
│ • john@mail.com │                                        
│ • Renovation    │                                        
│ • $100K-$200K   │                                        
│ • 3-6 Months    │                                        
│ • Modern        │                                        
└────────┬────────┘                                        
         │                                                 
         │ Form submitted                                  
         ▼                                                 
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────────┐
│  GoHighLevel    │     │  Pebble Connect  │     │  Automation Engine   │
│  fires event:   │────▶│  catches event,  │────▶│                      │
│  "Form          │     │  sends POST to:  │     │  1. Creates contact  │
│   Submitted"    │     │  /api/webhooks/  │     │     in GHL           │
│                 │     │  new-lead        │     │                      │
│                 │     │                  │     │  2. Scores lead      │
│                 │     │  with body:      │     │     Walk-In=30 +     │
│                 │     │  {               │     │     $100K=20 +       │
│                 │     │   firstName:     │     │     3-6mo=15 +       │
│                 │     │    "John",       │     │     Renovation=10    │
│                 │     │   source:        │     │     = 75 (HIGH!)     │
│                 │     │    "Walk-In",    │     │                      │
│                 │     │   budget:        │     │  3. HIGH SCORE!      │
│                 │     │    "$100K-$200K" │     │     Alert SMS to     │
│                 │     │   ...            │     │     Sarjit: "HOT     │
│                 │     │  }               │     │     LEAD: John Smith │
│                 │     │                  │     │     Walk-In $100K+"  │
│                 │     │                  │     │                      │
│                 │     │                  │     │  4. Speed-to-Lead    │
│                 │     │                  │     │     starts:          │
└─────────────────┘     └──────────────────┘     └──────────┬───────────┘
                                                            │
                            WHAT JOHN RECEIVES:             │
                                                            ▼
                        ┌─────────────────────────────────────────────┐
                        │  IMMEDIATELY (0 seconds)                     │
                        │  SMS: "Hi John, thanks for reaching out     │
                        │  to Inplace Studio! Book your consultation: │
                        │  [link]"                                     │
                        │  + Welcome Email with portfolio              │
                        ├─────────────────────────────────────────────┤
                        │  5 MINUTES (if no reply)                     │
                        │  AI Voice Call via Vapi: "Hi John, this is  │
                        │  Inplace Studio following up..."             │
                        ├─────────────────────────────────────────────┤
                        │  1 HOUR (if no reply)                        │
                        │  Email: Portfolio images matching "Modern"   │
                        ├─────────────────────────────────────────────┤
                        │  24 HOURS (if no reply)                      │
                        │  SMS: "Just checking in..."                  │
                        ├─────────────────────────────────────────────┤
                        │  3 DAYS (if no reply)                        │
                        │  SMS: "We saved a consultation spot..."      │
                        ├─────────────────────────────────────────────┤
                        │  7 DAYS (if no reply)                        │
                        │  Added to "Nurture" → monthly newsletters   │
                        └─────────────────────────────────────────────┘
                        
                        ⚡ IF JOHN REPLIES AT ANY POINT:
                           → Sequence stops immediately
                           → Team takes over conversation
```

---

## Workflow 2: Google Ads Lead

**What happens:** Someone searches "kitchen designer La Jolla", clicks your Google Ad, fills out the landing page form.

```
GOOGLE                    GHL LANDING PAGE          PEBBLE CONNECT
                                                    
┌──────────────┐         ┌──────────────┐          
│ Person       │         │ Landing page │          
│ searches     │         │ with form:   │          
│ "kitchen     │────────▶│              │          
│ designer     │ clicks  │ • Name       │          
│ La Jolla"    │  ad     │ • Phone      │          
│              │         │ • Email      │          
└──────────────┘         │ • Budget     │          
                         │ • Timeline   │          
                         │              │          
                         │ Hidden UTM   │          
                         │ fields auto- │          
                         │ captured:    │          
                         │ • source=    │          
                         │   google     │          
                         │ • medium=cpc │          
                         │ • campaign=  │          
                         │   kitchen_sd │          
                         │ • term=      │          
                         │   kitchen    │          
                         │   designer   │          
                         └──────┬───────┘          
                                │                  
                                │ Form submitted   
                                ▼                  
                         ┌──────────────┐     ┌──────────────────────┐
                         │Pebble Connect│────▶│  Automation Engine   │
                         │sends POST to │     │                      │
                         │/new-lead     │     │  Same flow as above  │
                         │              │     │  BUT with UTM data   │
                         │source:       │     │  tracked so you can  │
                         │"Google Ads"  │     │  see which keyword   │
                         │utmTerm:      │     │  and campaign        │
                         │"kitchen      │     │  generated this lead │
                         │ designer"    │     │  and eventually      │
                         │              │     │  which ones produce  │
                         │              │     │  signed contracts    │
                         └──────────────┘     └──────────────────────┘
```

---

## Workflow 3: Meta (Facebook/Instagram) Lead

```
FACEBOOK / INSTAGRAM                PEBBLE CONNECT         AUTOMATION ENGINE

┌────────────────────┐                                     
│ Person sees your   │                                     
│ ad on Instagram:   │                                     
│ "Dream Kitchen     │                                     
│  by Inplace Studio"│                                     
│                    │                                     
│ Clicks "Learn More"│                                     
│                    │                                     
│ Meta Lead Form     │                                     
│ pops up (pre-      │                                     
│ filled from their  │                                     
│ FB profile):       │                                     
│ • Name ✓           │                                     
│ • Email ✓          │                                     
│ • Phone ✓          │                                     
│                    │                                     
│ Clicks "Submit"    │                                     
└────────┬───────────┘                                     
         │                                                 
         │ Lead submitted                                  
         ▼                                                 
┌──────────────────┐     ┌──────────────────────┐          
│  Pebble Connect  │────▶│  Automation Engine   │          
│                  │     │                      │          
│  Trigger: Meta   │     │  Score: Meta=15      │          
│  Lead Ads →      │     │  (lower intent than  │          
│  New Lead        │     │   Google/Walk-In)    │          
│                  │     │                      │          
│  source:         │     │  Still gets full     │          
│  "Meta (FB/IG)"  │     │  speed-to-lead       │          
│  utmSource:      │     │  sequence            │          
│  "facebook"      │     │                      │          
└──────────────────┘     └──────────────────────┘          
```

---

## Workflow 6: Missed Call → Text-Back

**What happens:** Someone calls Inplace Studio, nobody answers, they get an instant text.

```
CALLER                 RINGCENTRAL            PEBBLE CONNECT         AUTOMATION ENGINE

┌──────────┐          ┌──────────────┐                               
│ Person   │          │              │                               
│ calls    │─────────▶│ Ring ring... │                               
│ (858)    │          │              │                               
│ 454-7397 │          │ Sarjit busy  │                               
│          │          │ Celeste busy │                               
│          │          │              │                               
│ Hangs up │◀─────────│ No answer    │                               
│ :(       │          │ after 15 sec │                               
└──────────┘          └──────┬───────┘                               
                             │                                       
                             │ Missed Call event                     
                             ▼                                       
                      ┌──────────────┐     ┌──────────────────────┐ 
                      │Pebble Connect│────▶│  Automation Engine   │ 
                      │              │     │                      │ 
                      │Trigger:      │     │  1. Look up phone    │ 
                      │RingCentral → │     │     in GHL           │ 
                      │Missed Call   │     │                      │ 
                      │              │     │  2. If new → create  │ 
                      │sends POST to │     │     contact          │ 
                      │/missed-call  │     │                      │ 
                      │              │     │  3. Send SMS:        │ 
                      │{phone:       │     │     "Thanks for      │ 
                      │ "8585551234"}│     │      calling Inplace │ 
                      │              │     │      Studio! Reply   │ 
                      │              │     │      with your name  │ 
                      │              │     │      and project     │ 
                      │              │     │      details..."     │ 
                      │              │     │                      │ 
                      │              │     │  4. Start speed-to-  │ 
                      │              │     │     lead sequence    │ 
                      └──────────────┘     └──────────────────────┘ 
                                                                     
                      CALLER RECEIVES (within 30 seconds):           
                      ┌──────────────────────────────────────┐       
                      │ SMS: "Thanks for calling Inplace     │       
                      │ Studio! We missed your call but want │       
                      │ to help. Reply with your name and    │       
                      │ project details, or book a           │       
                      │ consultation: [booking link]"        │       
                      └──────────────────────────────────────┘       
```

---

## Workflow 8: Pipeline Stage Change → Auto Notifications

**What happens:** When your team moves a contact to a new stage in GHL, the client gets notified automatically.

```
GHL PIPELINE BOARD                    PEBBLE CONNECT         AUTOMATION ENGINE

┌─────────────────────────────────┐                          
│ Celeste drags "John Smith"      │                          
│ from "New Lead" to              │                          
│ "Consultation Booked"           │                          
│                                 │                          
│ ┌─────────┐    ┌─────────────┐ │                          
│ │New Lead  │──▶│Consultation │ │                          
│ │          │    │Booked       │ │                          
│ │          │    │             │ │                          
│ │          │    │ John Smith ★│ │                          
│ └─────────┘    └──────┬──────┘ │                          
│                       │        │                          
└───────────────────────┼────────┘                          
                        │                                    
                        │ Stage changed event                
                        ▼                                    
                 ┌──────────────┐     ┌──────────────────────────────┐
                 │Pebble Connect│────▶│  Automation Engine           │
                 │              │     │                              │
                 │sends POST to │     │  Detects: "Consultation      │
                 │/stage-change │     │  Booked" (Stage 2)           │
                 │              │     │                              │
                 │{contactId:   │     │  Sends to John:              │
                 │ "abc123",   │     │                              │
                 │ newStage:    │     │  SMS: "Your consultation at  │
                 │ "Consultation│     │  Inplace Studio is confirmed!│
                 │  Booked"}   │     │  We look forward to meeting  │
                 │              │     │  you."                       │
                 │              │     │                              │
                 │              │     │  Email: Detailed confirmation│
                 │              │     │  with showroom address,      │
                 │              │     │  what to bring, parking info │
                 │              │     │                              │
                 │              │     │  Tag added: "Consultation    │
                 │              │     │  Booked"                     │
                 └──────────────┘     └──────────────────────────────┘

                 SAME PATTERN FOR ALL STAGES:

                 ┌──────────────────────────────────────────────────┐
                 │ Stage 2 → "Consultation confirmed!" + email     │
                 │ Stage 3 → "Measurement scheduled!" + prep tips  │
                 │ Stage 4 → "Design team started your kitchen!"   │
                 │ Stage 5 → "Your proposal is ready!"             │
                 └──────────────────────────────────────────────────┘
```

---

## Workflow 9: Lead Replies → Stop Sequence

**What happens:** When a lead replies to any automated SMS, the follow-up sequence stops so your team can have a real conversation.

```
LEAD                   GHL                    PEBBLE CONNECT         AUTOMATION ENGINE

┌──────────┐                                                        
│ John gets│                                                        
│ the 24hr │                                                        
│ follow-up│                                                        
│ SMS      │                                                        
│          │                                                        
│ Replies: │                                                        
│ "Yes I'd │          ┌──────────────┐                              
│ like to  │─────────▶│ GHL receives │                              
│ schedule │          │ inbound SMS  │                              
│ a visit" │          └──────┬───────┘                              
└──────────┘                 │                                      
                             │ Inbound message event                
                             ▼                                      
                      ┌──────────────┐     ┌──────────────────────┐ 
                      │Pebble Connect│────▶│  Automation Engine   │ 
                      │              │     │                      │ 
                      │Condition:    │     │  1. Marks John as    │ 
                      │Contact has   │     │     "replied"        │ 
                      │tag "Speed-to-│     │                      │ 
                      │Lead Active"  │     │  2. STOPS all future │ 
                      │              │     │     automated SMS/   │ 
                      │sends POST to │     │     email/calls      │ 
                      │/reply-       │     │                      │ 
                      │received      │     │  3. Adds "Replied"   │ 
                      │              │     │     tag in GHL       │ 
                      │              │     │                      │ 
                      │              │     │  4. Removes "Speed-  │ 
                      │              │     │     to-Lead Active"  │ 
                      │              │     │     tag              │ 
                      └──────────────┘     └──────────────────────┘ 
                                                                     
                      NOW: Sarjit or Celeste sees John's reply       
                      in GHL conversations and responds personally   
```

---

## Complete System Map — All 9 Workflows

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║                         PEBBLE CONNECT                               ║
║                     (9 Workflows Running)                            ║
║                                                                      ║
║  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 ║
║  │ 1. Walk-In  │  │ 2. Google   │  │ 3. Meta     │                 ║
║  │    Form     │  │    Ads Form │  │    Lead Ads │                 ║
║  │    ↓        │  │    ↓        │  │    ↓        │                 ║
║  │  /new-lead  │  │  /new-lead  │  │  /new-lead  │                 ║
║  └─────────────┘  └─────────────┘  └─────────────┘                 ║
║                                                                      ║
║  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 ║
║  │ 4. Google   │  │ 5. Website  │  │ 6. Missed   │                 ║
║  │    Business │  │    Chat     │  │    Call      │                 ║
║  │    Profile  │  │    Widget   │  │    ↓         │                 ║
║  │    ↓        │  │    ↓        │  │ /missed-call │                 ║
║  │  /new-lead  │  │  /new-lead  │  │              │                 ║
║  └─────────────┘  └─────────────┘  └─────────────┘                 ║
║                                                                      ║
║  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 ║
║  │ 7. New      │  │ 8. Stage    │  │ 9. Lead     │                 ║
║  │    Caller   │  │    Change   │  │    Replies   │                 ║
║  │    ↓        │  │    ↓        │  │    ↓         │                 ║
║  │  /new-lead  │  │ /stage-     │  │ /reply-      │                 ║
║  │             │  │  change     │  │  received    │                 ║
║  └─────────────┘  └─────────────┘  └─────────────┘                 ║
║                                                                      ║
║         ALL arrows point to ──▶  AUTOMATION ENGINE                   ║
║                                  inplace-automation-engine           ║
║                                  .vercel.app                         ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## How to Create Each Workflow in Pebble Connect

### General Steps (same for every workflow):

```
Step 1: Click "Create New Workflow" (or "New Automation")

Step 2: TRIGGER
        → Select the app (GoHighLevel, RingCentral, or Meta)
        → Select the event (Form Submitted, Missed Call, etc.)
        → Connect your account if not already connected

Step 3: CONDITION (optional)
        → Add a filter if needed (e.g., "only if tag = X")

Step 4: ACTION
        → Select "HTTP Request" (or "Webhook")
        → Method: POST
        → URL: https://inplace-automation-engine.vercel.app/api/webhooks/...
        → Headers: Content-Type = application/json
        → Body: paste the JSON from the workflow details above

Step 5: TEST
        → Use "Send Test" to verify it works
        → Check /api/health to see if a sequence was created

Step 6: ACTIVATE
        → Turn the workflow ON
```
