# Phase 1: GoHighLevel (GHL) Setup Guide
## InPlace Cabinetry & Design — CRM Configuration

**Prepared for:** Sarjit & Nikita  
**Date:** April 4, 2026  
**GHL Location:** Your sub-account dashboard (not the agency view)

---

## Before You Begin

- Log in to GoHighLevel at `app.gohighlevel.com`
- Make sure you are inside the **InPlace** sub-account (check the sub-account name in the top-left corner)
- All settings changes in this guide are made from the **Settings** menu (gear icon in the left sidebar)
- Work through each task in order — some later tasks depend on earlier ones being complete

---

## Task 1.1: Create the "Kitchen Projects" Pipeline with 12 Stages

**Where:** GHL > Settings > Pipelines

**What this does:** Creates a visual sales pipeline that tracks every lead from first contact through payment collection. This is the backbone of your CRM.

---

### Step-by-Step Instructions

**Step 1 — Open Pipeline Settings**

1. In the left sidebar, click the **Settings** gear icon (bottom of the sidebar)
2. In the Settings menu, find and click **Pipelines**
3. You will see a list of any existing pipelines (there may be a default one)

**Step 2 — Create a New Pipeline**

1. Click the **+ Add Pipeline** button (top right of the Pipelines page)
2. A dialog box will appear asking for a pipeline name
3. Type exactly: `Kitchen Projects`
4. Click **Create** or **Save**

**Step 3 — Add the 12 Pipeline Stages**

You will now add stages one by one. After creating the pipeline, you should see an empty stage view with an **+ Add Stage** button.

Add each stage in the following order by clicking **+ Add Stage**, typing the name, and clicking Save/Add before moving to the next:

| # | Stage Name |
|---|------------|
| 1 | New Lead |
| 2 | Consultation Booked |
| 3 | Site Measurement |
| 4 | Design Phase |
| 5 | Proposal / Quote Presented |
| 6 | Contract Signed |
| 7 | Order Placed with Supplier |
| 8 | Manufacturing / Lead Time |
| 9 | Delivery |
| 10 | Installation |
| 11 | Punch List / Final Walkthrough |
| 12 | Payment Collection / Closed |

> **Tip:** GHL stages are listed left to right visually. Make sure the order matches the table above. If you need to reorder, most GHL versions allow drag-and-drop reordering of stages.

**Step 4 — Save the Pipeline**

1. After adding all 12 stages, click **Save** (top right of the pipeline editor)
2. You should see "Kitchen Projects" now listed on the Pipelines page

---

### Verification Checkpoint — Task 1.1

Before moving on, confirm the following:

- [ ] A pipeline named "Kitchen Projects" appears in the Pipelines list
- [ ] Clicking into the pipeline shows exactly 12 stages
- [ ] Stages are in the correct order (New Lead first, Payment Collection / Closed last)
- [ ] No typos in stage names (compare against the table above)

**How to double-check:** Go to Contacts > Opportunities (or use the Pipeline/Board view) and try manually adding a test opportunity. The "Pipeline" dropdown should show "Kitchen Projects" and the stage dropdown should show all 12 stages.

---

## Task 1.2: Create Custom Fields for Contacts

**Where:** GHL > Settings > Custom Fields

**What this does:** Adds specialized data fields to every contact record so you can track kitchen-specific details, lead sources, financials, and project milestones — all in one place.

---

### Before You Start

1. Go to **Settings** > **Custom Fields**
2. Make sure you are on the **Contacts** tab (not Opportunities or other objects)
3. You will be creating fields in 4 groups. It helps to create them in this order so related fields stay together.

> **How to create each field:**
> 1. Click **+ Add Field** (or **+ New Field**)
> 2. Set the **Field Label** (the name shown on the contact record)
> 3. Set the **Field Type** (Dropdown, Text, Number, Date, Checkbox)
> 4. For Dropdown fields, add each option listed — one per line or one per entry
> 5. Click **Save**
> 6. Repeat for the next field

---

### Group 1: Lead Source Tracking Fields

These fields track where each lead came from and support UTM-based ad attribution.

---

**Field 1 of 6 — Lead Source**

- Field Label: `Lead Source`
- Field Type: `Dropdown`
- Dropdown Options (add each one):
  - Phone Call
  - Walk-In
  - Google Ads
  - Meta (FB/IG)
  - Website Chat
  - Google Business Profile
  - Referral

---

**Field 2 of 6 — UTM Source**

- Field Label: `UTM Source`
- Field Type: `Text`
- No options needed

---

**Field 3 of 6 — UTM Medium**

- Field Label: `UTM Medium`
- Field Type: `Text`
- No options needed

---

**Field 4 of 6 — UTM Campaign**

- Field Label: `UTM Campaign`
- Field Type: `Text`
- No options needed

---

**Field 5 of 6 — UTM Term**

- Field Label: `UTM Term`
- Field Type: `Text`
- No options needed

---

**Field 6 of 6 — Lead Score**

- Field Label: `Lead Score`
- Field Type: `Number`
- No options needed

---

### Group 2: Project Detail Fields

These fields capture the specifics of each kitchen project.

---

**Field 1 of 7 — Kitchen Type**

- Field Label: `Kitchen Type`
- Field Type: `Dropdown`
- Dropdown Options:
  - New Build
  - Renovation
  - Remodel

---

**Field 2 of 7 — Budget Range**

- Field Label: `Budget Range`
- Field Type: `Dropdown`
- Dropdown Options:
  - Under $25K
  - $25K-$50K
  - $50K-$100K
  - $100K-$200K
  - $200K+
  - Not Disclosed

---

**Field 3 of 7 — Timeline**

- Field Label: `Timeline`
- Field Type: `Dropdown`
- Dropdown Options:
  - ASAP
  - 1-3 Months
  - 3-6 Months
  - 6-12 Months
  - 12+ Months

---

**Field 4 of 7 — Kitchen Size**

- Field Label: `Kitchen Size`
- Field Type: `Text`
- No options needed
- (Used to enter dimensions, e.g., "12x14 ft" or "168 sq ft")

---

**Field 5 of 7 — Style Preference**

- Field Label: `Style Preference`
- Field Type: `Dropdown`
- Dropdown Options:
  - Modern
  - Traditional
  - Transitional
  - Contemporary
  - Other

---

**Field 6 of 7 — Design Software File**

- Field Label: `Design Software File`
- Field Type: `Text`
- No options needed
- (Used to store a file path or link to the design file, e.g., a Google Drive URL)

---

**Field 7 of 7 — Notes**

> Note: GHL contacts have a standard "Notes" section built in. If you want a dedicated project-notes custom field, create it here. If the standard notes section is sufficient, skip this field.

- Field Label: `Project Notes`
- Field Type: `Text`
- No options needed

---

### Group 3: Supplier & Order Fields

These fields track the supply chain and installation scheduling for each project.

---

**Field 1 of 8 — Cabinet Supplier**

- Field Label: `Cabinet Supplier`
- Field Type: `Dropdown`
- Dropdown Options:
  - SieMatic
  - Woodmode
  - Renzo Restelli
  - Signature Custom Cabinetry
  - Local Custom

---

**Field 2 of 8 — Purchase Order Number**

- Field Label: `Purchase Order Number`
- Field Type: `Text`
- No options needed

---

**Field 3 of 8 — Estimated Delivery Date**

- Field Label: `Estimated Delivery Date`
- Field Type: `Date`
- No options needed

---

**Field 4 of 8 — Actual Delivery Date**

- Field Label: `Actual Delivery Date`
- Field Type: `Date`
- No options needed

---

**Field 5 of 8 — Installation Start Date**

- Field Label: `Installation Start Date`
- Field Type: `Date`
- No options needed

---

**Field 6 of 8 — Installation End Date**

- Field Label: `Installation End Date`
- Field Type: `Date`
- No options needed

---

**Field 7 of 8 — Installer Name**

- Field Label: `Installer Name`
- Field Type: `Text`
- No options needed

---

**Field 8 of 8 — Cabinet Supplier (already created above as Field 1)**

> All 8 supplier & order fields are now complete. Continue to Group 4.

---

### Group 4: Financial Fields

These fields track quotes, contracts, and payment milestones for each project.

---

**Field 1 of 8 — Quote Amount**

- Field Label: `Quote Amount`
- Field Type: `Number`
- No options needed

---

**Field 2 of 8 — Contract Amount**

- Field Label: `Contract Amount`
- Field Type: `Number`
- No options needed

---

**Field 3 of 8 — Deposit Amount**

- Field Label: `Deposit Amount`
- Field Type: `Number`
- No options needed

---

**Field 4 of 8 — Deposit Paid**

- Field Label: `Deposit Paid`
- Field Type: `Checkbox`
- No options needed
- (Checked = yes, deposit has been received)

---

**Field 5 of 8 — Mid-Payment Amount**

- Field Label: `Mid-Payment Amount`
- Field Type: `Number`
- No options needed

---

**Field 6 of 8 — Mid-Payment Paid**

- Field Label: `Mid-Payment Paid`
- Field Type: `Checkbox`
- No options needed

---

**Field 7 of 8 — Final Payment Amount**

- Field Label: `Final Payment Amount`
- Field Type: `Number`
- No options needed

---

**Field 8 of 8 — Final Payment Paid**

- Field Label: `Final Payment Paid`
- Field Type: `Checkbox`
- No options needed

---

### Total Custom Fields Summary

| Group | Fields |
|-------|--------|
| Lead Source Tracking | 6 fields |
| Project Details | 7 fields |
| Supplier & Order | 7 fields |
| Financial | 8 fields |
| **Total** | **28 fields** |

---

### Verification Checkpoint — Task 1.2

Before moving on, confirm the following:

- [ ] Navigate to **Settings > Custom Fields** and count all custom fields — you should have 28 total
- [ ] Open any existing contact record (or create a test contact) and scroll to the custom fields section — you should see all fields organized in groups
- [ ] Click the dropdown for "Lead Source" — verify all 7 options appear
- [ ] Click the dropdown for "Budget Range" — verify all 6 options appear
- [ ] Click the dropdown for "Cabinet Supplier" — verify all 5 options appear
- [ ] Verify date fields show a date picker
- [ ] Verify checkbox fields show a checkbox toggle
- [ ] Verify number fields (Quote Amount, Contract Amount, etc.) do not accept text input

> **Tip:** If any field is missing, go back to Settings > Custom Fields, click **+ Add Field**, and create the missing one. Fields can be added at any time.

---

## Task 1.3: Set Up Team Accounts & Calendars

**Where (Team Accounts):** GHL > Settings > Team Management (or "My Staff")  
**Where (Calendars):** GHL > Settings > Calendars

**What this does:** Creates user accounts for each team member with the correct permission level, then sets up appointment calendars that clients can use to book consultations and site measurements.

---

### Part A: Create Team Member Accounts

**Step 1 — Open Team Management**

1. Go to **Settings** (gear icon in the left sidebar)
2. Click **Team Management** or **My Staff** (the label varies by GHL version)
3. You will see a list of current users — likely just yourself

---

**Step 2 — Add Nikita**

1. Click **+ Add Employee** or **+ Invite User**
2. Fill in the following:
   - **First Name:** Nikita
   - **Last Name:** (enter last name)
   - **Email:** (enter Nikita's email address)
   - **Role:** Admin
3. Click **Send Invite** or **Save**
4. Nikita will receive an email to set up her password and access the account

> **Admin role** means Nikita will have full access to all settings, contacts, workflows, and reports — same as the account owner.

---

**Step 3 — Add Sarjit**

1. Click **+ Add Employee** or **+ Invite User**
2. Fill in the following:
   - **First Name:** Sarjit
   - **Last Name:** (enter last name)
   - **Email:** (enter Sarjit's email address)
   - **Role:** Admin
3. Click **Send Invite** or **Save**

---

**Step 4 — Add Celeste**

1. Click **+ Add Employee** or **+ Invite User**
2. Fill in the following:
   - **First Name:** Celeste
   - **Last Name:** (enter last name)
   - **Email:** (enter Celeste's email address)
   - **Role:** User
3. Click **Send Invite** or **Save**

> **User role** means Celeste can manage contacts, appointments, and conversations assigned to her, but cannot change account settings or billing.

---

**Step 5 — Add Fernando**

1. Click **+ Add Employee** or **+ Invite User**
2. Fill in the following:
   - **First Name:** Fernando
   - **Last Name:** (enter last name)
   - **Email:** (enter Fernando's email address)
   - **Role:** User
3. Click **Send Invite** or **Save**

> **Important:** Each team member must accept their email invitation before they can log in. Follow up to make sure all 4 invites are accepted before creating the calendars.

---

### Part B: Create the Consultation Calendar

**Step 1 — Open Calendar Settings**

1. Go to **Settings** > **Calendars**
2. Click **+ Create Calendar** or **+ New Calendar**

**Step 2 — Configure the Calendar**

Fill in each setting as follows:

- **Calendar Name:** `Consultation Calendar`
- **Calendar Type:** Round Robin (if you want appointments distributed between Celeste and Sarjit) OR Event Calendar (if you want clients to choose who they book with)
  - **Recommended:** Round Robin — appointments automatically go to the next available person
- **Team Members / Assigned Users:**
  - Add **Celeste**
  - Add **Sarjit**
- **Appointment Duration:** 60 minutes
- **Buffer Time (Before or After):** 15 minutes after each appointment
- **Availability:** Set the days and hours the calendar should be bookable (e.g., Monday–Friday, 9 AM–5 PM)
- **Appointment Title / Name:** `Kitchen Consultation`
- **Confirmation Message:** (optional) "Thank you for booking your kitchen consultation! We'll see you soon."

**Step 3 — Configure Notifications**

- Enable **Email Confirmation** to the client
- Enable **Email Reminder** (set to 24 hours before appointment)
- Enable **notifications to team members** so Celeste and Sarjit get alerted when a booking is made

**Step 4 — Save the Calendar**

1. Review all settings
2. Click **Save** or **Create Calendar**
3. GHL will generate a shareable calendar link — copy and save this link somewhere (Notepad, Google Doc) for use in forms and funnels later

---

### Part C: Create the Site Measurement Calendar

**Step 1 — Create New Calendar**

1. From **Settings > Calendars**, click **+ Create Calendar** again

**Step 2 — Configure the Calendar**

- **Calendar Name:** `Site Measurement Calendar`
- **Calendar Type:** Event Calendar (single user, assigned to Fernando)
- **Team Members / Assigned Users:**
  - Add **Fernando**
- **Appointment Duration:** 90 minutes
- **Buffer Time:** 15 minutes after each appointment
- **Availability:** Set days and hours Fernando is available for site visits (discuss with Fernando)
- **Appointment Title / Name:** `Site Measurement`
- **Confirmation Message:** (optional) "Your site measurement is confirmed. Fernando will arrive at the scheduled time."

**Step 3 — Configure Notifications**

- Enable **Email Confirmation** to the client
- Enable **Email Reminder** (24 hours before)
- Enable notifications to Fernando when a booking is made

**Step 4 — Save the Calendar**

1. Click **Save** or **Create Calendar**
2. Copy and save the calendar link for use in forms and workflows

---

### Verification Checkpoint — Task 1.3

Before moving on, confirm the following:

**Team Accounts:**
- [ ] Go to Settings > Team Management — you should see 4 team members listed: Nikita, Sarjit, Celeste, Fernando
- [ ] Nikita and Sarjit show "Admin" role
- [ ] Celeste and Fernando show "User" role
- [ ] All 4 team members have accepted their email invites (Status shows "Active" not "Pending")

**Calendars:**
- [ ] Go to Settings > Calendars — you should see 2 calendars: "Consultation Calendar" and "Site Measurement Calendar"
- [ ] Click into "Consultation Calendar" — confirm it shows 60-minute duration and has Celeste and Sarjit assigned
- [ ] Click into "Site Measurement Calendar" — confirm it shows 90-minute duration and has Fernando assigned
- [ ] Test each calendar by opening its booking link in a private browser window — the booking page should load and show available time slots
- [ ] Make a test booking on each calendar — confirm you receive a confirmation email

---

## Task 1.4: Create Lead Capture Forms

**Where:** GHL > Sites > Forms (or Funnels > Forms)

**What this does:** Creates digital forms that capture lead information and automatically create contact records in GHL. Three forms are needed, each optimized for a different lead channel.

---

### Form 1: Walk-In Lead Capture Form

**Purpose:** Used at the front desk or on a tablet/laptop in the showroom. When a walk-in customer arrives, staff fill this out to create the lead instantly.

---

**Step 1 — Open Forms Builder**

1. In the left sidebar, click **Sites** (or **Funnels** depending on your GHL version)
2. Click **Forms**
3. Click **+ Create Form** or **+ New Form**

**Step 2 — Name the Form**

- Form Name: `Walk-In Lead Capture`
- Click **Start Building** or **Create**

**Step 3 — Add Form Fields**

In the form builder, add the following fields in this order. For each field, click **+ Add Field**, find the field type, and configure it:

| # | Field | Field Type | Required? |
|---|-------|-----------|-----------|
| 1 | First Name | Standard — First Name | Yes |
| 2 | Last Name | Standard — Last Name | Yes |
| 3 | Phone | Standard — Phone | Yes |
| 4 | Email | Standard — Email | Yes |
| 5 | Kitchen Type | Custom Field — Kitchen Type (dropdown) | Yes |
| 6 | Budget Range | Custom Field — Budget Range (dropdown) | No |
| 7 | Timeline | Custom Field — Timeline (dropdown) | No |
| 8 | Style Preference | Custom Field — Style Preference (dropdown) | No |
| 9 | Notes | Custom Field — Project Notes (text area) | No |

> **Note:** For fields 5–9, when adding them to the form, look for the option to map to a **Custom Field**. Select the corresponding custom field you created in Task 1.2.

**Step 4 — Configure Form Settings / Actions**

After adding all fields, configure what happens when the form is submitted:

1. Click **Settings** or **On Submit** (location varies by GHL version)
2. Set the following actions:
   - **Create/Update Contact:** Enabled (this should be on by default)
   - **Pipeline Stage:** Set to "Kitchen Projects" pipeline, Stage 1 "New Lead"
   - **Lead Source:** Set the custom field "Lead Source" to automatically populate with `Walk-In`
3. **Redirect after submit:** Choose either:
   - Show a success message: "Thank you! Your information has been saved."
   - Or redirect to a thank-you page (you can create a simple one in Sites > Pages)

**Step 5 — Style the Form (Optional)**

- Choose a clean, simple layout
- Set a background color that matches your brand (white or light grey works well for an in-showroom form)
- Make the **Submit** button text say: `Save Lead`

**Step 6 — Save and Publish**

1. Click **Save**
2. Click **Publish**
3. Copy the form's shareable link or embed code
4. This link can be bookmarked on a showroom tablet or added to your website's "Contact Us" page

---

### Form 2: Google Ads Landing Page Funnel

**Purpose:** This is a full funnel (landing page + lead form + thank-you page) designed to convert visitors from Google Ads. UTM parameters are captured automatically to track which ad drove the lead.

---

**Step 1 — Create the Funnel**

1. Go to **Sites** > **Funnels** (or just **Funnels** in the sidebar)
2. Click **+ Create Funnel**
3. Name it: `Google Ads — Kitchen Leads`
4. Click **Create**

**Step 2 — Add Page 1: The Landing Page**

1. In the funnel editor, click **+ Add Step** or you will see a default first page
2. Name this step/page: `Landing Page`
3. Click the **Edit** pencil icon to open the page builder

**Landing Page Content to Include:**

- **Headline:** Something like "Transform Your Kitchen with Custom Cabinetry" (adjust to your preferred message)
- **Subheadline:** A brief value statement, e.g., "Free consultation — we come to you"
- **Hero image:** A beautiful kitchen photo
- **Bullet points (3–5 benefits):**
  - Custom designs to match your vision
  - Premium cabinet lines including SieMatic and Woodmode
  - Expert installation from start to finish
  - Serving [your city/area]
- **Clear Call-to-Action (CTA) button:** "Book Your Free Consultation" — this button should scroll down to the lead form or link directly to the form section

**Lead Form on the Landing Page:**

Add a **Form element** to the landing page. Create a new form within the funnel with these fields:

| # | Field | Field Type | Required? |
|---|-------|-----------|-----------|
| 1 | First Name | Standard — First Name | Yes |
| 2 | Last Name | Standard — Last Name | Yes |
| 3 | Phone | Standard — Phone | Yes |
| 4 | Email | Standard — Email | Yes |
| 5 | Kitchen Type | Custom Field — Kitchen Type | Yes |
| 6 | Budget Range | Custom Field — Budget Range | No |
| 7 | Timeline | Custom Field — Timeline | No |

**Add Hidden UTM Fields:**

These are invisible to the visitor but automatically capture UTM data from the URL:

1. Add a **Hidden Field** for each of the following:
   - Hidden Field → mapped to custom field `UTM Source` → set to auto-populate from URL parameter `utm_source`
   - Hidden Field → mapped to custom field `UTM Medium` → set to auto-populate from URL parameter `utm_medium`
   - Hidden Field → mapped to custom field `UTM Campaign` → set to auto-populate from URL parameter `utm_campaign`
   - Hidden Field → mapped to custom field `UTM Term` → set to auto-populate from URL parameter `utm_term`

> **How to add hidden fields in GHL:**
> In the form builder, look for **Hidden Fields** or **Advanced Fields**. Add a hidden field, give it a label (e.g., "UTM Source"), map it to the "UTM Source" custom contact field, and set the default value to pull from the URL parameter named `utm_source`. Repeat for each UTM field.

**On Submit Actions for Google Ads Form:**

- Create/Update Contact: Enabled
- Set "Lead Source" custom field to: `Google Ads`
- Set Pipeline Stage: Kitchen Projects > Stage 1 "New Lead"
- Redirect to: Thank-You Page (Step 2 of this funnel — see below)

**Step 3 — Add Page 2: Thank-You Page with Calendar Embed**

1. In the funnel, click **+ Add Step**
2. Name it: `Thank-You Page`
3. Open the page builder

**Thank-You Page Content:**

- **Headline:** "You're Almost Done!"
- **Subheadline:** "Book your free consultation below to confirm your spot."
- **Short paragraph:** "We've received your information. The fastest way to get started is to book a 60-minute consultation — pick a time that works for you."
- **Calendar Embed Block:**
  1. Add a **Calendar Widget** or **Embed** block to the page
  2. Paste in the booking link for the **Consultation Calendar** (the link you saved in Task 1.3)
  3. This embeds the calendar directly on the thank-you page so the lead can book without leaving the funnel

- **Trust indicators (optional):** Add a row of logos (SieMatic, Woodmode, etc.) or a short testimonial below the calendar

**Step 4 — Set the Funnel Domain / URL**

1. In the funnel settings, assign a subdomain or custom domain
   - Default GHL subdomains look like: `yoursubdomain.gohighlevel.com/kitchen-leads`
   - If you have a custom domain connected to GHL (e.g., `inplacecabinetry.com`), you can assign the funnel to a path like `inplacecabinetry.com/free-consultation`
2. Connect your Google Ads campaigns to send traffic to this URL, making sure your ad URLs include UTM parameters, e.g.:
   ```
   https://yoursite.com/free-consultation?utm_source=google&utm_medium=cpc&utm_campaign=kitchen-leads&utm_term=custom+kitchen+cabinets
   ```

**Step 5 — Save and Publish the Funnel**

1. Save each page
2. Click **Publish Funnel**
3. Test the full flow: visit the landing page URL, fill out the form, confirm you land on the thank-you page with the calendar embed

---

### Form 3: Meta Lead Form

**Purpose:** Used for Facebook and Instagram Lead Ads. Meta Lead Ads show a form directly within Facebook/Instagram — users never leave the app. GHL can receive these leads via integration.

---

> **Important Note on Meta Lead Ads:** Meta Lead Ad forms are created inside **Facebook Ads Manager** (or Meta Business Suite), NOT inside GHL. However, GHL can connect to Meta to automatically import those leads. This section covers both the Meta side and the GHL connection.

---

**Part A: Connect Meta to GHL**

1. In GHL, go to **Settings** > **Integrations**
2. Find **Facebook / Meta** and click **Connect**
3. Follow the authorization steps — you will be taken to Facebook to log in and grant GHL permission to access your Facebook Page and Lead Ads
4. Select the correct Facebook Page (your InPlace Cabinetry & Design page)
5. Save the integration

---

**Part B: Create the Lead Form in Facebook Ads Manager**

1. Go to **Meta Business Suite** > **Ads Manager** (at `business.facebook.com`)
2. Create a new campaign with the objective **Lead Generation**
3. At the ad set level, configure your targeting (location, age, interests related to home renovation)
4. At the ad level, click **Create Form** (this is the Instant Form / Lead Form)

**Configure the Meta Lead Form:**

- **Form Type:** More Volume (for quantity) or Higher Intent (for quality — adds a review step)
  - **Recommended:** Higher Intent — shows the user their answers before submitting, which reduces fake leads

- **Intro Screen:**
  - Headline: "Get Your Free Kitchen Design Consultation"
  - Description: "Tell us a little about your project and we'll match you with a designer."
  - Image: Use a high-quality kitchen photo

- **Form Fields to Include:**

  | # | Field | Notes |
  |---|-------|-------|
  | 1 | First Name | Facebook pre-fills from user profile |
  | 2 | Last Name | Facebook pre-fills from user profile |
  | 3 | Phone Number | Facebook pre-fills from user profile |
  | 4 | Email | Facebook pre-fills from user profile |
  | 5 | What type of kitchen project? | Custom question — Multiple choice: New Build, Renovation, Remodel |
  | 6 | What is your budget range? | Custom question — Multiple choice: Under $25K, $25K-$50K, $50K-$100K, $100K-$200K, $200K+ |
  | 7 | What is your timeline? | Custom question — Multiple choice: ASAP, 1-3 Months, 3-6 Months, 6-12 Months |

- **Hidden UTM Fields:**
  Meta Lead Ads do not support true URL-based UTM capture in the form itself. However, you can track UTM data by:
  1. Using a unique form name per ad campaign (e.g., name the form `Meta-GoogleSearch-Spring2026`) — GHL will capture the form name
  2. OR passing UTM data through the Meta Pixel or Conversion API on your website's thank-you page (more advanced)
  3. For the GHL custom field "Lead Source," this will be set automatically to "Meta (FB/IG)" via a GHL workflow (set up in Phase 2)

- **Thank-You Screen:**
  - Headline: "We'll be in touch shortly!"
  - Description: "A member of our team will reach out within 1 business day to schedule your consultation."
  - Add a **Call-to-Action button** linking to your website or the Consultation Calendar URL: "Book Your Consultation Now"

- **Privacy Policy:** You must link to your website's privacy policy URL (required by Meta)

- **Click Save Form**

---

**Part C: Map Meta Form Fields to GHL Custom Fields**

After your Meta integration is active in GHL:

1. Go to **Settings > Integrations > Facebook**
2. Find the Lead Ads mapping section
3. Map each Meta form field to the corresponding GHL contact field:
   - First Name → First Name
   - Last Name → Last Name
   - Phone Number → Phone
   - Email → Email
   - Kitchen project type → Kitchen Type (custom field)
   - Budget range → Budget Range (custom field)
   - Timeline → Timeline (custom field)
4. Save the mapping

Once mapped, every time someone submits a Meta Lead Ad form, their information will automatically appear as a new contact in GHL, populated with the correct custom field values.

---

### Verification Checkpoint — Task 1.4

**Walk-In Form:**
- [ ] Go to Sites > Forms — "Walk-In Lead Capture" form is listed
- [ ] Open the form link in a private browser window — all 9 fields are visible
- [ ] Submit a test entry (use your own name/email) — confirm a new contact is created in GHL
- [ ] Open the test contact — confirm "Lead Source" is set to "Walk-In" and the contact is in the "New Lead" pipeline stage

**Google Ads Funnel:**
- [ ] Go to Sites > Funnels — "Google Ads — Kitchen Leads" funnel is listed with 2 steps
- [ ] Visit the funnel landing page URL — it loads correctly with the headline and form
- [ ] Submit a test entry — confirm you land on the thank-you page with the Consultation Calendar embedded
- [ ] Open the test contact in GHL — confirm "Lead Source" is set to "Google Ads" and UTM fields are captured (test by visiting the URL with UTM parameters appended manually)
- [ ] Confirm a test booking can be made from the embedded calendar on the thank-you page

**Meta Lead Form:**
- [ ] Go to Settings > Integrations — Facebook connection shows as "Connected"
- [ ] In Ads Manager, the lead form has been created and saved
- [ ] Field mapping is configured in GHL
- [ ] (When live) Submit a test lead through Facebook's "Preview" mode — confirm it appears in GHL within a few minutes

---

## Final Verification — Phase 1 Complete

Before declaring Phase 1 complete, run through this master checklist:

### Pipeline
- [ ] "Kitchen Projects" pipeline exists with all 12 stages in the correct order

### Custom Fields
- [ ] 28 custom fields exist under Contacts
- [ ] All dropdown fields have the correct options
- [ ] Field types are correct (no text fields where dropdowns should be, etc.)

### Team
- [ ] 4 team members are active: Nikita (Admin), Sarjit (Admin), Celeste (User), Fernando (User)
- [ ] All 4 have accepted their invites and can log in

### Calendars
- [ ] "Consultation Calendar" is live, assigned to Celeste and Sarjit, 60 min + 15 min buffer
- [ ] "Site Measurement Calendar" is live, assigned to Fernando, 90 min + 15 min buffer
- [ ] Both calendar booking pages load and allow test bookings

### Forms
- [ ] "Walk-In Lead Capture" form is live and creating contacts correctly
- [ ] "Google Ads — Kitchen Leads" funnel is live with working form, UTM capture, and calendar embed on thank-you page
- [ ] Meta integration is connected and lead form is published in Ads Manager

---

## Troubleshooting Common Issues

**Issue: I can't find "Custom Fields" in Settings**
- GHL sometimes labels this differently. Look for "Custom Values," "Contact Fields," or check under Settings > Fields.

**Issue: Pipeline stages are in the wrong order**
- In the pipeline editor, stages can usually be dragged and dropped to reorder them. If drag-and-drop doesn't work, delete the out-of-order stage and re-add it in the correct position.

**Issue: Team member invite was not received**
- Check spam/junk folders. If the email isn't found, go to Settings > Team Management, find the user, and click "Resend Invite."

**Issue: Custom fields are not showing up in the form builder**
- Make sure you created the fields under **Contacts** (not Opportunities) in Settings > Custom Fields. In the form builder, look for a "Custom Fields" section when adding fields.

**Issue: Meta lead form data is not appearing in GHL**
- Double-check that the Facebook integration is connected (Settings > Integrations > Facebook shows "Connected" not "Disconnected")
- Verify the field mapping is saved
- Meta can take up to 5 minutes to deliver lead data. If it's been longer than 10 minutes, disconnect and reconnect the integration.

**Issue: UTM parameters are not being captured**
- Confirm the hidden fields in the GHL form are set to pull from the URL parameter (not just set to a fixed value)
- Test by visiting the form URL with UTM parameters manually appended and submitting a test lead

---

## Next Steps — Phase 2 Preview

Once Phase 1 is complete and verified, Phase 2 will cover:

- **Automations & Workflows:** Automatic follow-up sequences for new leads, pipeline stage change notifications, appointment reminders
- **SMS & Email Templates:** Welcome messages, consultation confirmations, follow-up sequences
- **Reporting Dashboards:** Lead source tracking, conversion rate by stage, team performance
- **Website Integration:** Embedding forms and calendars on the InPlace website
- **Google Ads Integration:** Full conversion tracking setup with GHL

---

*Document created: April 4, 2026 | Version 1.0*  
*Questions? Contact your GHL setup consultant or refer to help.gohighlevel.com*
