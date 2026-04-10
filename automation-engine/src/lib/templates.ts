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

const LOGO_URL = "https://inplacestudio.com/wp-content/uploads/2025/07/Untitled-1000-x-1000-px-1000-x-1000-px.webp";
const HERO_IMAGE = "https://inplacestudio.com/wp-content/uploads/2025/05/siematic-custom-kitchens-inplace-studio-img9831bbcc04dd31d7_14-0182-1-f48e25e.jpg";
const PORTFOLIO_1 = "https://inplacestudio.com/wp-content/uploads/2025/05/siematic-kitchens-inplace-studio-imgdd51750d02783134_14-3538-1-a7088a7.jpg";
const PORTFOLIO_2 = "https://inplacestudio.com/wp-content/uploads/2025/05/siematic-kitchens-inplace-studio-img41d1e48c02782fae_14-3536-1-2af8a36.jpg";
const PORTFOLIO_3 = "https://inplacestudio.com/wp-content/uploads/2025/05/siematic-custom-kitchens-inplace-studio-imgf4d10b81031e319e_14-3620-1-4e36ab5.jpg";

/** Base HTML layout for all Inplace Studio emails — luxury aesthetic matching inplacestudio.com */
function baseEmail(preheader: string, body: string, heroImage: boolean = true, portfolioStrip: boolean = true): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inplace Studio</title>
</head>
<body style="margin:0;padding:0;background:#f7f4ee;font-family:Georgia,'Times New Roman',serif;">
  <span style="display:none;font-size:1px;color:#f7f4ee;max-height:0;overflow:hidden;">${preheader}</span>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ee;padding:32px 16px;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:640px;width:100%;">

        <!-- Top accent line -->
        <tr><td style="height:2px;background:#B98879;"></td></tr>

        <!-- Logo header -->
        <tr><td style="padding:36px 40px 28px;text-align:center;background:#fdfcfa;">
          <img src="${LOGO_URL}" alt="Inplace Studio" width="140" style="max-width:140px;height:auto;display:inline-block;" />
        </td></tr>

        ${heroImage ? `
        <!-- Hero image -->
        <tr><td style="padding:0;">
          <img src="${HERO_IMAGE}" alt="Luxury Kitchen by Inplace Studio" width="640" style="width:100%;height:auto;display:block;" />
        </td></tr>
        ` : ''}

        <!-- Body content -->
        <tr><td style="padding:44px 48px 36px;color:#3A3730;font-size:15px;line-height:1.9;font-family:Georgia,serif;background:#fdfcfa;">
          ${body}
        </td></tr>

        ${portfolioStrip ? `
        <!-- Portfolio strip -->
        <tr><td style="padding:0;background:#fdfcfa;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="33%" style="padding:0;"><img src="${PORTFOLIO_1}" alt="Kitchen Design" width="213" style="width:100%;height:160px;object-fit:cover;display:block;" /></td>
              <td width="34%" style="padding:0;"><img src="${PORTFOLIO_2}" alt="Kitchen Design" width="214" style="width:100%;height:160px;object-fit:cover;display:block;" /></td>
              <td width="33%" style="padding:0;"><img src="${PORTFOLIO_3}" alt="Kitchen Design" width="213" style="width:100%;height:160px;object-fit:cover;display:block;" /></td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:16px 48px 28px;background:#fdfcfa;text-align:center;">
          <p style="margin:0;font-size:10px;color:#a09890;font-family:Helvetica,Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">Recent Projects from Our Portfolio</p>
        </td></tr>
        ` : ''}

        <!-- Showrooms -->
        <tr><td style="padding:28px 48px;background:#f7f4ee;border-top:1px solid #ede8e0;">
          <p style="margin:0 0 16px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#B98879;font-family:Helvetica,Arial,sans-serif;">Our Showrooms</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:11px;color:#666;font-family:Helvetica,Arial,sans-serif;line-height:1.8;padding-right:10px;vertical-align:top;" width="33%">
                <strong style="color:#1C1A17;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;">La Jolla</strong><br>
                7739 Fay Ave<br>La Jolla, CA 92037
              </td>
              <td style="font-size:11px;color:#666;font-family:Helvetica,Arial,sans-serif;line-height:1.8;padding-right:10px;vertical-align:top;" width="33%">
                <strong style="color:#1C1A17;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;">Laguna Beach</strong><br>
                465 Forest Ave<br>Laguna Beach, CA 92651
              </td>
              <td style="font-size:11px;color:#666;font-family:Helvetica,Arial,sans-serif;line-height:1.8;vertical-align:top;" width="33%">
                <strong style="color:#1C1A17;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;">West Hollywood</strong><br>
                639 N La Peer Dr<br>West Hollywood, CA 90069
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#1C1A17;padding:28px 48px;text-align:center;">
          <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;color:#B98879;font-family:Helvetica,Arial,sans-serif;text-transform:uppercase;">Inplace Studio</p>
          <p style="margin:0 0 10px;font-size:11px;color:#999;font-family:Helvetica,Arial,sans-serif;line-height:1.8;">
            <a href="https://inplacestudio.com" style="color:#B98879;text-decoration:none;">inplacestudio.com</a> &nbsp;&middot;&nbsp;
            <a href="tel:+18584547397" style="color:#999;text-decoration:none;">(858) 454-7397</a> &nbsp;&middot;&nbsp;
            <a href="mailto:info@inplacestudio.com" style="color:#999;text-decoration:none;">info@inplacestudio.com</a>
          </p>
          <p style="margin:0;font-size:9px;color:#555;font-family:Helvetica,Arial,sans-serif;letter-spacing:1.5px;">
            <a href="https://www.instagram.com/inplacestudio/" style="color:#666;text-decoration:none;">INSTAGRAM</a> &nbsp;&middot;&nbsp;
            <a href="https://www.facebook.com/507307116031577" style="color:#666;text-decoration:none;">FACEBOOK</a> &nbsp;&middot;&nbsp;
            <a href="https://www.houzz.com/" style="color:#666;text-decoration:none;">HOUZZ</a>
          </p>
        </td></tr>

        <!-- Bottom accent line -->
        <tr><td style="height:2px;background:#B98879;"></td></tr>
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
    <p style="margin:0;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#B98879;font-family:Helvetica,Arial,sans-serif;text-align:center;">Welcome to</p>
    <h1 style="margin:10px 0 0;font-size:26px;font-weight:300;color:#1C1A17;letter-spacing:1px;font-family:Georgia,serif;text-align:center;line-height:1.3;">Your Kitchen Journey<br><em style="font-style:italic;color:#B98879;">Begins Here</em></h1>

    <table width="40" align="center" cellpadding="0" cellspacing="0" style="margin:20px auto;"><tr><td style="height:1px;background:#B98879;"></td></tr></table>

    <p style="margin:24px 0 22px;">Dear ${firstName},</p>

    <p style="margin:0 0 22px;">Thank you for reaching out to Inplace Studio. We're honoured by your interest and delighted to begin this journey with you.</p>

    <p style="margin:0 0 22px;">For over two decades, we've had the privilege of crafting extraordinary kitchens for Southern California's most discerning homeowners — partnering with the world's finest cabinetry houses to bring each vision to life with precision and artistry.</p>

    <!-- Brand strip -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;background:#1C1A17;">
      <tr><td style="padding:24px;text-align:center;">
        <p style="margin:0 0 12px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#B98879;font-family:Helvetica,Arial,sans-serif;">Our Curated Partners</p>
        <p style="margin:0;font-size:12px;letter-spacing:3px;color:#e8e4de;font-family:Georgia,serif;text-transform:uppercase;line-height:2;">
          SieMatic &middot; Woodmode &middot; Renzo Restelli<br>Signature Custom &middot; Full Custom
        </p>
      </td></tr>
    </table>

    <p style="margin:0;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#B98879;font-family:Helvetica,Arial,sans-serif;text-align:center;">Your Next Step</p>
    <h2 style="margin:12px 0 0;font-size:22px;font-weight:300;color:#1C1A17;font-family:Georgia,serif;text-align:center;line-height:1.3;">Complimentary Design<br><em style="font-style:italic;color:#B98879;">Consultation</em></h2>

    <table width="40" align="center" cellpadding="0" cellspacing="0" style="margin:20px auto;"><tr><td style="height:1px;background:#B98879;"></td></tr></table>

    <p style="margin:16px 0 24px;text-align:center;">We'd love to welcome you for a private consultation<br>at one of our showrooms, where you'll:</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f0ece5;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="width:32px;vertical-align:top;padding-top:2px;">
              <table width="20" height="20" cellpadding="0" cellspacing="0"><tr><td style="border:1px solid #B98879;text-align:center;font-size:10px;color:#B98879;font-family:Georgia,serif;">01</td></tr></table>
            </td>
            <td style="padding-left:14px;font-size:14px;color:#3A3730;font-family:Georgia,serif;line-height:1.6;">
              <strong style="color:#1C1A17;">Experience</strong> our curated material library &mdash; touch and feel premium finishes, woods, lacquers, and stone
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f0ece5;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="width:32px;vertical-align:top;padding-top:2px;">
              <table width="20" height="20" cellpadding="0" cellspacing="0"><tr><td style="border:1px solid #B98879;text-align:center;font-size:10px;color:#B98879;font-family:Georgia,serif;">02</td></tr></table>
            </td>
            <td style="padding-left:14px;font-size:14px;color:#3A3730;font-family:Georgia,serif;line-height:1.6;">
              <strong style="color:#1C1A17;">Collaborate</strong> with a senior designer on your project scope, aesthetic direction, and timeline
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 0;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="width:32px;vertical-align:top;padding-top:2px;">
              <table width="20" height="20" cellpadding="0" cellspacing="0"><tr><td style="border:1px solid #B98879;text-align:center;font-size:10px;color:#B98879;font-family:Georgia,serif;">03</td></tr></table>
            </td>
            <td style="padding-left:14px;font-size:14px;color:#3A3730;font-family:Georgia,serif;line-height:1.6;">
              <strong style="color:#1C1A17;">Discover</strong> which cabinetry brands and design solutions align perfectly with your vision
            </td>
          </tr></table>
        </td>
      </tr>
    </table>

    <p style="text-align:center;margin:0 0 24px;">
      <a href="${bookingLink}" style="display:inline-block;padding:18px 52px;background:#B98879;color:#ffffff;text-decoration:none;font-size:10px;font-weight:600;letter-spacing:4px;text-transform:uppercase;font-family:Helvetica,Arial,sans-serif;">Book Your Consultation</a>
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr><td style="border-top:1px solid #f0ece5;"></td></tr>
    </table>

    <p style="margin:0 0 8px;font-size:13px;color:#888;font-family:Helvetica,Arial,sans-serif;">Have questions? Simply reply to this email or call us directly.</p>

    <p style="margin:28px 0 0;font-size:15px;font-family:Georgia,serif;">With warm regards,</p>
    <p style="margin:6px 0 0;font-size:15px;font-family:Georgia,serif;"><strong style="color:#1C1A17;">The Inplace Studio Team</strong></p>
    <p style="margin:4px 0 0;font-size:10px;color:#B98879;font-family:Helvetica,Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">Crafting Extraordinary Kitchens Est. 2000</p>
  `;
  return { subject, html: baseEmail(subject, body, true, true) };
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
