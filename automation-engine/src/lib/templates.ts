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
  score: number,
  preferredContact?: string
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
    `Prefers: ${preferredContact || "Not specified"}`,
    ``,
    `Follow up immediately!`,
  ].join("\n");
}

// ─── Email Templates ──────────────────────────────────────────────────────────

export interface EmailTemplate {
  subject: string;
  html: string;
}

/** Base HTML layout for all Inplace Studio emails — luxury aesthetic */
function baseEmail(preheader: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inplace Studio</title>
</head>
<body style="margin:0;padding:0;background:#f7f6f3;font-family:Georgia,'Times New Roman',serif;">
  <span style="display:none;font-size:1px;color:#f7f6f3;max-height:0;overflow:hidden;">${preheader}</span>

  <!-- Outer container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f3;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;width:100%;">

        <!-- Top accent line -->
        <tr><td style="height:3px;background:#8c6b4e;"></td></tr>

        <!-- Header -->
        <tr><td style="padding:48px 50px 32px;text-align:center;border-bottom:1px solid #eee8e0;">
          <p style="margin:0;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#8c6b4e;font-family:Helvetica,Arial,sans-serif;">Southern California's Premier</p>
          <h1 style="margin:12px 0 0;font-size:28px;font-weight:400;color:#1d2327;letter-spacing:3px;text-transform:uppercase;font-family:Georgia,serif;">INPLACE STUDIO</h1>
          <p style="margin:8px 0 0;font-size:11px;letter-spacing:2px;color:#a09890;font-family:Helvetica,Arial,sans-serif;">KITCHEN DESIGN &middot; CABINETRY &middot; INSTALLATION</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:44px 50px 40px;color:#3a3632;font-size:15px;line-height:1.85;font-family:Georgia,'Times New Roman',serif;">
          ${body}
        </td></tr>

        <!-- Showrooms -->
        <tr><td style="padding:0 50px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee8e0;padding-top:28px;">
            <tr>
              <td style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#8c6b4e;font-family:Helvetica,Arial,sans-serif;padding-bottom:16px;" colspan="3">Our Showrooms</td>
            </tr>
            <tr>
              <td style="font-size:12px;color:#666;font-family:Helvetica,Arial,sans-serif;line-height:1.7;padding-right:16px;vertical-align:top;" width="33%">
                <strong style="color:#1d2327;font-size:11px;letter-spacing:1px;">LA JOLLA</strong><br>
                7739 Fay Ave<br>La Jolla, CA 92037
              </td>
              <td style="font-size:12px;color:#666;font-family:Helvetica,Arial,sans-serif;line-height:1.7;padding-right:16px;vertical-align:top;" width="33%">
                <strong style="color:#1d2327;font-size:11px;letter-spacing:1px;">LAGUNA BEACH</strong><br>
                465 Forest Ave<br>Laguna Beach, CA 92651
              </td>
              <td style="font-size:12px;color:#666;font-family:Helvetica,Arial,sans-serif;line-height:1.7;vertical-align:top;" width="33%">
                <strong style="color:#1d2327;font-size:11px;letter-spacing:1px;">WEST HOLLYWOOD</strong><br>
                639 N La Peer Dr<br>West Hollywood, CA 90069
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#1d2327;padding:28px 50px;text-align:center;">
          <p style="margin:0;font-size:10px;letter-spacing:2px;color:#8c6b4e;font-family:Helvetica,Arial,sans-serif;text-transform:uppercase;">Inplace Studio</p>
          <p style="margin:8px 0 0;font-size:11px;color:#666;font-family:Helvetica,Arial,sans-serif;">
            <a href="https://inplacestudio.com" style="color:#999;text-decoration:none;">inplacestudio.com</a> &nbsp;&middot;&nbsp;
            <a href="tel:+18584547397" style="color:#999;text-decoration:none;">(858) 454-7397</a> &nbsp;&middot;&nbsp;
            <a href="mailto:info@inplacestudio.com" style="color:#999;text-decoration:none;">info@inplacestudio.com</a>
          </p>
        </td></tr>

        <!-- Bottom accent line -->
        <tr><td style="height:3px;background:#8c6b4e;"></td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Step 0 – Welcome email sent immediately when a new lead comes in */
export function welcomeEmail(
  firstName: string,
  bookingLink: string
): EmailTemplate {
  const subject = `${firstName}, Your Kitchen Journey Begins Here`;
  const body = `
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8c6b4e;font-family:Helvetica,Arial,sans-serif;margin:0 0 20px;">Welcome</p>

    <p style="margin:0 0 20px;">Dear ${firstName},</p>

    <p style="margin:0 0 20px;">Thank you for reaching out to Inplace Studio. We're honoured by your interest and excited to learn more about your vision.</p>

    <p style="margin:0 0 20px;">For over a decade, we've partnered with discerning homeowners across Southern California to create kitchens that are as functional as they are beautiful — working with the world's finest cabinetry houses including <strong>SieMatic</strong>, <strong>Woodmode</strong>, and <strong>Renzo Restelli</strong>.</p>

    <!-- Divider -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
      <tr><td style="border-top:1px solid #eee8e0;"></td></tr>
    </table>

    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8c6b4e;font-family:Helvetica,Arial,sans-serif;margin:0 0 16px;">Your Next Step</p>

    <p style="margin:0 0 24px;">We'd love to invite you for a <strong>complimentary design consultation</strong> at one of our showrooms. During this private session, you'll:</p>

    <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr>
        <td style="padding:8px 0;color:#8c6b4e;font-size:18px;vertical-align:top;width:24px;">&#9672;</td>
        <td style="padding:8px 0 8px 8px;font-size:14px;color:#3a3632;">Experience our curated material library and cabinetry displays</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#8c6b4e;font-size:18px;vertical-align:top;width:24px;">&#9672;</td>
        <td style="padding:8px 0 8px 8px;font-size:14px;color:#3a3632;">Discuss your project scope, aesthetic, and timeline with a senior designer</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#8c6b4e;font-size:18px;vertical-align:top;width:24px;">&#9672;</td>
        <td style="padding:8px 0 8px 8px;font-size:14px;color:#3a3632;">Receive a personalised overview of brands and solutions that suit your vision</td>
      </tr>
    </table>

    <p style="text-align:center;margin:0 0 32px;">
      <a href="${bookingLink}" style="display:inline-block;padding:16px 44px;background:#8c6b4e;color:#ffffff;text-decoration:none;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;font-family:Helvetica,Arial,sans-serif;">Book Your Consultation</a>
    </p>

    <!-- Divider -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr><td style="border-top:1px solid #eee8e0;"></td></tr>
    </table>

    <p style="margin:0 0 8px;font-size:14px;color:#666;">Have questions? Simply reply to this email or call us directly.</p>

    <p style="margin:28px 0 0;font-size:14px;">With warm regards,</p>
    <p style="margin:4px 0 0;font-size:14px;"><strong style="color:#1d2327;">The Inplace Studio Team</strong></p>
    <p style="margin:2px 0 0;font-size:12px;color:#8c6b4e;font-family:Helvetica,Arial,sans-serif;letter-spacing:1px;">Crafting Extraordinary Kitchens Since 2012</p>
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
