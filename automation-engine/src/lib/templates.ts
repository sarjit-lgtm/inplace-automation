/**
 * SMS and Email Templates
 * All merge fields are passed as function arguments for type safety.
 */

// ─── SMS Templates ────────────────────────────────────────────────────────────

/** Immediate first response when a new lead comes in */
export function instantLeadSMS(
  firstName: string,
  bookingLink: string
): string {
  return `Hi ${firstName}, thanks for reaching out to Inplace Studio! We'd love to learn about your kitchen project. Book your free consultation here: ${bookingLink}`;
}

/** Auto reply when a call is missed */
export function missedCallSMS(bookingLink: string): string {
  return `Thanks for calling Inplace Studio! We missed your call but want to help. Reply with your name and project details, or book a consultation: ${bookingLink}`;
}

/** Step 1 (5 min) – no reply yet */
export function fiveMinNoReplySMS(
  firstName: string,
  bookingLink: string
): string {
  return `Hi ${firstName}, this is Inplace Studio following up on your inquiry. We specialize in high-end kitchen design and would love to schedule a quick call. Book here: ${bookingLink}`;
}

/** Step 3 (24 hours) – no reply yet */
export function twentyFourHourSMS(
  firstName: string,
  bookingLink: string
): string {
  return `Hi ${firstName}, just checking in from Inplace Studio. We'd hate for you to miss out on transforming your kitchen — let's chat! Book your free consult: ${bookingLink}`;
}

/** Step 4 (3 days) – no reply yet */
export function threeDaySMS(firstName: string, bookingLink: string): string {
  return `Hi ${firstName}, Inplace Studio here. We're still excited about your kitchen project! If now's not the right time, no worries — but we'd love to help when you're ready. Book anytime: ${bookingLink}`;
}

/** Internal alert to Sarjit when a high-score lead comes in */
export function highScoreAlertSMS(
  contactName: string,
  phone: string,
  email: string,
  source: string,
  budget: string,
  timeline: string,
  kitchenType: string,
  stylePref: string,
  score: number
): string {
  return [
    `🔥 NEW LEAD ALERT`,
    ``,
    `Name: ${contactName}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Source: ${source}`,
    `Score: ${score}/100`,
    ``,
    `Budget: ${budget}`,
    `Timeline: ${timeline}`,
    `Kitchen: ${kitchenType || "Not specified"}`,
    `Style: ${stylePref || "Not specified"}`,
    ``,
    `Follow up immediately!`,
  ].join("\n");
}

// ─── Email Templates ──────────────────────────────────────────────────────────

export interface EmailTemplate {
  subject: string;
  html: string;
}

/** Base HTML layout for all Inplace Studio emails */
function baseEmail(preheader: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inplace Studio</title>
  <style>
    body { margin: 0; padding: 0; background: #f5f5f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: #000000; padding: 32px 40px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
    .body { padding: 40px; color: #222222; font-size: 16px; line-height: 1.7; }
    .body p { margin: 0 0 18px; }
    .cta { display: inline-block; margin: 24px 0; padding: 14px 32px; background: #000000; color: #ffffff !important; text-decoration: none; font-size: 15px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; border-radius: 2px; }
    .footer { background: #f0f0f0; padding: 24px 40px; font-size: 12px; color: #888888; text-align: center; line-height: 1.6; }
    .footer a { color: #555555; }
    .divider { border: none; border-top: 1px solid #eeeeee; margin: 28px 0; }
  </style>
</head>
<body>
  <span style="display:none;font-size:1px;color:#ffffff;max-height:0;">${preheader}</span>
  <div class="wrapper">
    <div class="header">
      <h1>Inplace Studio</h1>
    </div>
    <div class="body">
      ${body}
    </div>
    <div class="footer">
      <p>Inplace Studio &mdash; La Jolla, CA</p>
      <p>You're receiving this because you reached out about a kitchen project.</p>
    </div>
  </div>
</body>
</html>`;
}

/** Step 0 – Welcome email sent immediately when a new lead comes in */
export function welcomeEmail(
  firstName: string,
  bookingLink: string
): EmailTemplate {
  const subject = `Welcome to Inplace Studio, ${firstName} — Let's Build Something Beautiful`;
  const body = `
    <p>Hi ${firstName},</p>
    <p>Thank you for reaching out to <strong>Inplace Studio</strong>! We're thrilled to hear about your kitchen project and can't wait to bring your vision to life.</p>
    <p>At Inplace Studio, we design and build high-end kitchens that blend functionality with stunning aesthetics — every project is crafted with meticulous attention to detail.</p>
    <p>To get started, let's schedule a complimentary discovery consultation where we'll discuss your ideas, timeline, and budget.</p>
    <p style="text-align:center;">
      <a class="cta" href="${bookingLink}">Book Your Free Consultation</a>
    </p>
    <hr class="divider" />
    <p>Have questions? Simply reply to this email or give us a call — we're here to help.</p>
    <p>Looking forward to connecting!</p>
    <p>Warm regards,<br /><strong>The Inplace Studio Team</strong></p>
  `;
  return { subject, html: baseEmail(subject, body) };
}

/** Step 2 – Portfolio email sent at ~1 hour with style-specific content */
export function portfolioEmail(
  firstName: string,
  stylePref: string,
  bookingLink: string
): EmailTemplate {
  const subject = `${firstName}, Here's Some Inspiration for Your Kitchen Project`;
  const styleNote = stylePref
    ? `<p>Based on your interest in a <strong>${stylePref}</strong> style, we've curated some of our favorite recent projects that we think you'll love.</p>`
    : `<p>We've put together a collection of our recent kitchen projects that showcase the craftsmanship and design philosophy we bring to every job.</p>`;

  const body = `
    <p>Hi ${firstName},</p>
    <p>We wanted to share some inspiration while you're thinking about your kitchen project.</p>
    ${styleNote}
    <p>From custom cabinetry and premium countertops to integrated appliances and bespoke lighting — our team handles every detail so you don't have to.</p>
    <p style="text-align:center;">
      <a class="cta" href="${bookingLink}">Schedule Your Consultation</a>
    </p>
    <hr class="divider" />
    <p>Still have questions? Hit reply and we'll get back to you right away.</p>
    <p>Best,<br /><strong>The Inplace Studio Team</strong></p>
  `;
  return { subject, html: baseEmail(subject, body) };
}

/** Consultation booked confirmation email */
export function consultationConfirmationEmail(
  firstName: string
): EmailTemplate {
  const subject = `Your Consultation is Confirmed, ${firstName}!`;
  const body = `
    <p>Hi ${firstName},</p>
    <p>Great news — your consultation with Inplace Studio is confirmed! We're excited to learn more about your kitchen project and start exploring what's possible.</p>
    <p>Here's what to expect:</p>
    <ul>
      <li>A detailed discussion of your vision, style preferences, and goals</li>
      <li>An overview of our design and build process</li>
      <li>A preliminary discussion of budget and timeline</li>
    </ul>
    <p>Please feel free to gather any inspiration photos, measurements, or notes before we meet — the more detail, the better!</p>
    <p>See you soon!</p>
    <p>Best,<br /><strong>The Inplace Studio Team</strong></p>
  `;
  return { subject, html: baseEmail(subject, body) };
}

/** Site measurement scheduling email */
export function siteMeasurementEmail(firstName: string): EmailTemplate {
  const subject = `Next Step: Site Measurement for Your Kitchen — ${firstName}`;
  const body = `
    <p>Hi ${firstName},</p>
    <p>Exciting progress! It's time to schedule your site measurement — this is where our team visits your home to take precise measurements and assess the space.</p>
    <p>This step is essential to ensuring your design is perfectly tailored to your kitchen. The visit typically takes 60–90 minutes.</p>
    <p>Please reply to this email or call us directly to schedule a convenient time. We're flexible and happy to work around your schedule.</p>
    <p>We're looking forward to seeing the space in person!</p>
    <p>Best,<br /><strong>The Inplace Studio Team</strong></p>
  `;
  return { subject, html: baseEmail(subject, body) };
}

/** Design phase started email */
export function designPhaseEmail(firstName: string): EmailTemplate {
  const subject = `Your Kitchen Design Has Begun, ${firstName}!`;
  const body = `
    <p>Hi ${firstName},</p>
    <p>We're thrilled to let you know that your kitchen design is now underway! Our design team is working on bringing your vision to life.</p>
    <p>Here's what's happening behind the scenes:</p>
    <ul>
      <li>3D modeling of your kitchen layout</li>
      <li>Material and finish selection</li>
      <li>Custom cabinetry specifications</li>
      <li>Lighting and fixture planning</li>
    </ul>
    <p>We'll be in touch soon to share the initial designs and gather your feedback. This is the fun part!</p>
    <p>Best,<br /><strong>The Inplace Studio Team</strong></p>
  `;
  return { subject, html: baseEmail(subject, body) };
}

/** Proposal/quote presented email */
export function proposalEmail(firstName: string): EmailTemplate {
  const subject = `Your Custom Kitchen Proposal is Ready, ${firstName}`;
  const body = `
    <p>Hi ${firstName},</p>
    <p>Your personalized kitchen design proposal is ready! We've put together a comprehensive plan that reflects your vision, preferences, and budget.</p>
    <p>The proposal includes:</p>
    <ul>
      <li>Detailed design renderings</li>
      <li>Full materials and finish specifications</li>
      <li>Itemized pricing breakdown</li>
      <li>Project timeline</li>
    </ul>
    <p>Please review the attached proposal and let us know if you'd like to schedule a call to walk through it together. We're happy to answer any questions and make adjustments.</p>
    <p>We're excited about this project and look forward to making it a reality!</p>
    <p>Best,<br /><strong>The Inplace Studio Team</strong></p>
  `;
  return { subject, html: baseEmail(subject, body) };
}
