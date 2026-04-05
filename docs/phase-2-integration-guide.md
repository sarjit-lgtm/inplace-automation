# Phase 2: Lead Capture & Automation Integration Guide

This guide explains how to connect all lead sources to the automation engine via Pebble Connect, and how to deploy the automation engine.

## Architecture

```
Lead Sources → Pebble Connect → Automation Engine → GHL (contacts, SMS, email)
```

Every lead source sends data to Pebble Connect, which reformats it and POSTs to the automation engine's `/api/webhooks/new-lead` endpoint. The engine then:
1. Creates/updates the contact in GHL
2. Calculates lead score
3. Sends high-score alerts to Sarjit
4. Starts the speed-to-lead SMS/email sequence

---

## Step 1: Deploy the Automation Engine

### Option A: Vercel (Recommended)

1. Push the repo to GitHub
2. Go to vercel.com → New Project → Import `INPLACE_AUTOMATION`
3. Set the root directory to `automation-engine`
4. Add environment variables:
   - `GHL_API_KEY` = `pit-bd6f9117-7ab3-4f56-91af-e5fd463ba37e`
   - `GHL_LOCATION_ID` = `CKMSnDJvmt43fbfCMQwz`
   - `BOOKING_LINK` = (your GHL consultation calendar link)
   - `VAPI_WEBHOOK_URL` = (set later when Vapi is configured)
   - `PEBBLE_CONNECT_WEBHOOK_URL` = (set later)
5. Deploy

Your automation engine URL will be: `https://your-app.vercel.app`

### Option B: Other hosting

Any Node.js hosting that supports Next.js (Railway, Render, DigitalOcean App Platform).

---

## Step 2: Set Up Cron Job for Sequence Processing

The speed-to-lead sequence needs a cron job to advance follow-up steps.

### Using cron-job.org (free):

1. Go to cron-job.org → Create free account
2. Create new cron job:
   - URL: `https://your-app.vercel.app/api/webhooks/process-sequences`
   - Method: GET
   - Schedule: Every 1 minute (`*/1 * * * *`)
3. Enable it

This will check every minute for leads that need their next follow-up step.

### Using Pebble Connect:

Create a scheduled automation that runs every 1 minute and makes a GET request to the process-sequences endpoint.

---

## Step 3: Wire Lead Sources in Pebble Connect

### 3A: Meta Lead Ads (Facebook / Instagram)

1. In Pebble Connect, create a new automation
2. **Trigger**: Meta Lead Ads → New Lead
3. **Action**: HTTP Request → POST
4. **URL**: `https://your-app.vercel.app/api/webhooks/new-lead`
5. **Headers**: `Content-Type: application/json`
6. **Body** (map Meta fields):

```json
{
  "firstName": "{{meta.first_name}}",
  "lastName": "{{meta.last_name}}",
  "email": "{{meta.email}}",
  "phone": "{{meta.phone}}",
  "source": "Meta (FB/IG)",
  "utmSource": "facebook",
  "utmMedium": "paid_social",
  "utmCampaign": "{{meta.campaign_name}}",
  "utmTerm": ""
}
```

7. Save and activate

### 3B: Google Business Profile

1. In Pebble Connect, create a new automation
2. **Trigger**: Google Business Profile → New Message OR New Form Submission
3. **Action**: HTTP Request → POST
4. **URL**: `https://your-app.vercel.app/api/webhooks/new-lead`
5. **Body**:

```json
{
  "firstName": "{{gbp.name}}",
  "lastName": "",
  "email": "{{gbp.email}}",
  "phone": "{{gbp.phone}}",
  "source": "Google Business Profile"
}
```

### 3C: Google Ads (via GHL Funnel)

Google Ads traffic goes to your GHL landing page/funnel. When someone submits the form:

1. In Pebble Connect, create a new automation
2. **Trigger**: GoHighLevel → Form Submitted (select the Google Ads landing page form)
3. **Action**: HTTP Request → POST
4. **URL**: `https://your-app.vercel.app/api/webhooks/new-lead`
5. **Body**:

```json
{
  "firstName": "{{ghl.first_name}}",
  "lastName": "{{ghl.last_name}}",
  "email": "{{ghl.email}}",
  "phone": "{{ghl.phone}}",
  "source": "Google Ads",
  "budgetRange": "{{ghl.budget_range}}",
  "timeline": "{{ghl.timeline}}",
  "kitchenType": "{{ghl.kitchen_type}}",
  "utmSource": "{{ghl.utm_source}}",
  "utmMedium": "{{ghl.utm_medium}}",
  "utmCampaign": "{{ghl.utm_campaign}}",
  "utmTerm": "{{ghl.utm_term}}"
}
```

### 3D: Walk-In Form (GHL Tablet Form)

1. In Pebble Connect, create a new automation
2. **Trigger**: GoHighLevel → Form Submitted (select the Walk-In Lead Capture form)
3. **Action**: HTTP Request → POST
4. **URL**: `https://your-app.vercel.app/api/webhooks/new-lead`
5. **Body**:

```json
{
  "firstName": "{{ghl.first_name}}",
  "lastName": "{{ghl.last_name}}",
  "email": "{{ghl.email}}",
  "phone": "{{ghl.phone}}",
  "source": "Walk-In",
  "budgetRange": "{{ghl.budget_range}}",
  "timeline": "{{ghl.timeline}}",
  "kitchenType": "{{ghl.kitchen_type}}",
  "stylePref": "{{ghl.style_preference}}"
}
```

### 3E: Website Chat (GHL Chat Widget)

1. Install GHL chat widget on inplacestudio.com (Settings > Chat Widget > Get Code)
2. In Pebble Connect, create a new automation
3. **Trigger**: GoHighLevel → Chat Widget → Contact Captured
4. **Action**: HTTP Request → POST
5. **URL**: `https://your-app.vercel.app/api/webhooks/new-lead`
6. **Body**:

```json
{
  "firstName": "{{ghl.first_name}}",
  "lastName": "{{ghl.last_name}}",
  "email": "{{ghl.email}}",
  "phone": "{{ghl.phone}}",
  "source": "Website Chat"
}
```

### 3F: RingCentral Missed Calls

1. In Pebble Connect, create a new automation
2. **Trigger**: RingCentral → Missed Call
3. **Action**: HTTP Request → POST
4. **URL**: `https://your-app.vercel.app/api/webhooks/missed-call`
5. **Body**:

```json
{
  "phone": "{{ringcentral.caller_number}}",
  "callerName": "{{ringcentral.caller_name}}"
}
```

### 3G: RingCentral Call Completed (logging)

1. In Pebble Connect, create a new automation
2. **Trigger**: RingCentral → Call Completed (answered calls)
3. **Action**: HTTP Request → POST
4. **URL**: `https://your-app.vercel.app/api/webhooks/new-lead`
5. **Condition**: Only if contact is NEW (check if contact exists in GHL first)
6. **Body**:

```json
{
  "firstName": "{{ringcentral.caller_name}}",
  "lastName": "",
  "phone": "{{ringcentral.caller_number}}",
  "source": "Phone Call"
}
```

---

## Step 4: Wire Stage Change Notifications

When your team moves a contact to a new pipeline stage in GHL, Pebble Connect should notify the automation engine:

1. In Pebble Connect, create a new automation
2. **Trigger**: GoHighLevel → Pipeline Stage Changed
3. **Action**: HTTP Request → POST
4. **URL**: `https://your-app.vercel.app/api/webhooks/stage-change`
5. **Body**:

```json
{
  "contactId": "{{ghl.contact_id}}",
  "newStage": "{{ghl.new_stage_name}}",
  "oldStage": "{{ghl.old_stage_name}}"
}
```

This triggers automatic SMS/email notifications for:
- **Consultation Booked** (Stage 2): Confirmation SMS + email sent to client
- **Site Measurement** (Stage 3): Scheduling SMS + prep checklist
- **Design Phase** (Stage 4): "Design started" notification
- **Proposal Presented** (Stage 5): Proposal notification

---

## Step 5: Wire Reply Detection

When a lead replies to an SMS or email, stop the follow-up sequence:

1. In Pebble Connect, create a new automation
2. **Trigger**: GoHighLevel → Inbound Message (SMS reply)
3. **Condition**: Contact has tag "Speed-to-Lead Active"
4. **Action**: HTTP Request → POST
5. **URL**: `https://your-app.vercel.app/api/webhooks/reply-received`
6. **Body**:

```json
{
  "contactId": "{{ghl.contact_id}}"
}
```

---

## Step 6: Install GHL Chat Widget on Website

1. In GHL, go to **Settings > Chat Widget**
2. Customize the widget:
   - Name: "Inplace Studio"
   - Greeting: "Welcome to Inplace Studio! How can we help with your kitchen project?"
   - Required fields: Name, Phone, Email
3. Copy the embed code
4. Add the script tag to `inplacestudio.com` — paste it before `</body>` on every page

---

## Testing Checklist

After everything is wired up, test each flow:

- [ ] Submit a test lead through the Meta Lead Ads test tool → verify contact appears in GHL with correct fields, score, and tags → verify SMS/email received
- [ ] Call the main number and don't answer → verify missed call text-back SMS arrives
- [ ] Submit a walk-in form from the showroom tablet → verify speed-to-lead fires
- [ ] Submit through the Google Ads landing page → verify UTM fields populate
- [ ] Send a message through the website chat → verify lead captured
- [ ] Wait 5 minutes → verify step 1 follow-up fires (or Vapi callback)
- [ ] Reply to a sequence SMS → verify sequence stops
- [ ] Move a contact to "Consultation Booked" in GHL → verify confirmation SMS/email
- [ ] Move a contact to "Design Phase" → verify notification
- [ ] Check `/api/health` endpoint → verify it returns OK with sequence stats

## Webhook Endpoints Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/webhooks/new-lead` | POST | All new leads (any source) |
| `/api/webhooks/missed-call` | POST | RingCentral missed calls |
| `/api/webhooks/reply-received` | POST | Stop sequence when lead replies |
| `/api/webhooks/stage-change` | POST | Pipeline stage change notifications |
| `/api/webhooks/process-sequences` | GET | Cron — advance follow-up steps |
| `/api/health` | GET | Health check + stats |
