export interface ProposalData {
  proposalNumber: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  projectAddress: string;
  supplierName: string;
  lines: {
    description: string;
    dimensions: string | null;
    doorStyle: string | null;
    finish: string | null;
    hardware: string | null;
    quantity: number;
    lineTotal: number;
  }[];
  installationCost: number;
  timelineEstimate: string | null;
  termsAndConditions: string | null;
  total: number;
  createdAt: string;
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildLineRows(data: ProposalData): string {
  return data.lines
    .map((line, idx) => {
      const details: string[] = [];
      if (line.dimensions) details.push(`<span class="detail-label">Dimensions:</span> ${escapeHtml(line.dimensions)}`);
      if (line.doorStyle) details.push(`<span class="detail-label">Door Style:</span> ${escapeHtml(line.doorStyle)}`);
      if (line.finish) details.push(`<span class="detail-label">Finish:</span> ${escapeHtml(line.finish)}`);
      if (line.hardware) details.push(`<span class="detail-label">Hardware:</span> ${escapeHtml(line.hardware)}`);

      const detailsHtml = details.length > 0
        ? `<div class="line-details">${details.join("<br>")}</div>`
        : `<div class="line-details no-details">—</div>`;

      const rowClass = idx % 2 === 0 ? "table-row" : "table-row table-row-alt";
      return `
        <tr class="${rowClass}">
          <td class="col-description">
            <div class="item-name">${escapeHtml(line.description)}</div>
            ${detailsHtml}
          </td>
          <td class="col-qty">${line.quantity}</td>
          <td class="col-price">${formatCurrency(line.lineTotal)}</td>
        </tr>`;
    })
    .join("");
}

export function generateProposalHTML(data: ProposalData): string {
  const cabinetsSubtotal = data.lines.reduce((s, l) => s + l.lineTotal, 0);
  const formattedDate = formatDate(data.createdAt);
  const lineRows = buildLineRows(data);
  const defaultTerms = `This proposal is prepared exclusively for ${escapeHtml(data.clientName)} and is valid for 30 days from the date above. Prices are subject to change after the validity period. All cabinetry is custom-ordered and non-refundable once production begins. Installation scheduling is subject to project readiness and crew availability. Any changes to the scope of work after deposit may result in revised pricing.`;
  const termsText = data.termsAndConditions
    ? escapeHtml(data.termsAndConditions)
    : defaultTerms;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kitchen Design Proposal — ${escapeHtml(data.clientName)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

    /* ─── Reset & Base ─────────────────────────────────────────────── */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --brown:        #8c6b4e;
      --brown-light:  #b5936e;
      --brown-pale:   #f0e8e0;
      --dark:         #1d2327;
      --mid:          #4a4a4a;
      --muted:        #888888;
      --rule:         #d4c4b5;
      --bg:           #fafaf8;
      --white:        #ffffff;
      --page-width:   8.5in;
      --page-height:  11in;
      --margin-h:     0.75in;
      --margin-v:     0.75in;
    }

    html, body {
      background: #e8e4df;
      font-family: 'Jost', sans-serif;
      font-weight: 300;
      color: var(--dark);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* ─── Page Shell ────────────────────────────────────────────────── */
    .page {
      width: var(--page-width);
      min-height: var(--page-height);
      background: var(--bg);
      margin: 0.5in auto;
      padding: var(--margin-v) var(--margin-h);
      position: relative;
      box-shadow: 0 4px 40px rgba(0,0,0,0.18), 0 1px 8px rgba(0,0,0,0.10);
      overflow: hidden;
    }

    .page + .page {
      margin-top: 0.35in;
    }

    /* ─── Cover Page ────────────────────────────────────────────────── */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: var(--page-height);
      padding: var(--margin-v) var(--margin-h);
    }

    .cover-corner-accent {
      position: absolute;
      top: 0;
      right: 0;
      width: 3.2in;
      height: 3.2in;
      background: var(--brown-pale);
      clip-path: polygon(100% 0, 0 0, 100% 100%);
      opacity: 0.5;
    }

    .cover-corner-accent-br {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 2in;
      height: 2in;
      background: var(--brown-pale);
      clip-path: polygon(0 100%, 0 0, 100% 100%);
      opacity: 0.35;
    }

    .cover-header {
      position: relative;
      z-index: 1;
    }

    .brand-logo {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-size: 13pt;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--dark);
    }

    .brand-logo em {
      font-style: normal;
      color: var(--brown);
    }

    .cover-rule-top {
      width: 0.6in;
      height: 1px;
      background: var(--brown);
      margin: 0.18in 0 0.22in;
    }

    .brand-tagline {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 7.5pt;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .cover-body {
      position: relative;
      z-index: 1;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0.4in 0;
    }

    .cover-eyebrow {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 7pt;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--brown);
      margin-bottom: 0.18in;
    }

    .cover-title {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-size: 42pt;
      line-height: 1.08;
      color: var(--dark);
      letter-spacing: -0.01em;
      margin-bottom: 0.12in;
    }

    .cover-title em {
      font-style: italic;
      color: var(--brown);
    }

    .cover-divider {
      display: flex;
      align-items: center;
      gap: 0.12in;
      margin: 0.22in 0 0.32in;
    }

    .cover-divider-line {
      flex: 1;
      max-width: 2.4in;
      height: 1px;
      background: var(--rule);
    }

    .cover-divider-ornament {
      width: 5px;
      height: 5px;
      background: var(--brown);
      transform: rotate(45deg);
      flex-shrink: 0;
    }

    .cover-client-block {
      display: flex;
      flex-direction: column;
      gap: 0.05in;
    }

    .cover-client-label {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 7pt;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 0.04in;
    }

    .cover-client-name {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 400;
      font-size: 22pt;
      color: var(--dark);
      letter-spacing: 0.01em;
    }

    .cover-client-address {
      font-family: 'Jost', sans-serif;
      font-weight: 300;
      font-size: 9.5pt;
      color: var(--mid);
      margin-top: 0.04in;
      line-height: 1.5;
    }

    .cover-meta {
      margin-top: 0.28in;
      display: flex;
      gap: 0.5in;
    }

    .cover-meta-item {
      display: flex;
      flex-direction: column;
      gap: 0.03in;
    }

    .cover-meta-label {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 6.5pt;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .cover-meta-value {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      font-size: 9pt;
      color: var(--dark);
    }

    .cover-confidential {
      position: absolute;
      bottom: var(--margin-v);
      right: var(--margin-h);
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 6.5pt;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--rule);
    }

    .cover-footer {
      position: relative;
      z-index: 1;
      border-top: 1px solid var(--rule);
      padding-top: 0.18in;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .cover-footer-address {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 7pt;
      color: var(--muted);
      line-height: 1.6;
    }

    .cover-footer-web {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-size: 9pt;
      color: var(--brown);
      letter-spacing: 0.05em;
    }

    /* ─── Interior Pages ────────────────────────────────────────────── */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 0.2in;
      border-bottom: 1px solid var(--rule);
      margin-bottom: 0.35in;
    }

    .page-header-brand {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-size: 10pt;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--dark);
    }

    .page-header-brand em {
      font-style: normal;
      color: var(--brown);
    }

    .page-header-meta {
      text-align: right;
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 7pt;
      color: var(--muted);
      line-height: 1.8;
      letter-spacing: 0.05em;
    }

    /* ─── Section Headings ──────────────────────────────────────────── */
    .section-heading {
      display: flex;
      align-items: center;
      gap: 0.14in;
      margin-bottom: 0.22in;
    }

    .section-heading-text {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 400;
      font-size: 18pt;
      color: var(--dark);
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    .section-heading-rule {
      flex: 1;
      height: 1px;
      background: var(--rule);
    }

    /* ─── Summary Grid ──────────────────────────────────────────────── */
    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.3in 0.5in;
      margin-bottom: 0.35in;
    }

    .summary-card {
      padding: 0.2in;
      border: 1px solid var(--rule);
      background: var(--white);
      position: relative;
    }

    .summary-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 100%;
      background: var(--brown);
    }

    .summary-card-label {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 6.5pt;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 0.08in;
    }

    .summary-card-value {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      font-size: 10pt;
      color: var(--dark);
      line-height: 1.5;
    }

    .summary-card-value.large {
      font-family: 'Cormorant Garamond', serif;
      font-size: 14pt;
      font-weight: 400;
    }

    .summary-full {
      grid-column: 1 / -1;
    }

    /* ─── Items Table ───────────────────────────────────────────────── */
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 0.3in;
    }

    .items-table thead tr {
      border-bottom: 1px solid var(--brown);
    }

    .items-table thead th {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      font-size: 6.5pt;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--brown);
      padding: 0 0 0.1in;
      text-align: left;
      vertical-align: bottom;
    }

    .items-table thead th.col-qty,
    .items-table thead th.col-price {
      text-align: right;
    }

    .col-description { width: 68%; }
    .col-qty         { width: 10%; text-align: right; }
    .col-price       { width: 22%; text-align: right; }

    .table-row td,
    .table-row-alt td {
      padding: 0.13in 0;
      vertical-align: top;
      border-bottom: 1px solid #ede8e2;
    }

    .table-row-alt {
      background: transparent;
    }

    .item-name {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      font-size: 9.5pt;
      color: var(--dark);
      margin-bottom: 0.05in;
    }

    .line-details {
      font-family: 'Jost', sans-serif;
      font-weight: 300;
      font-size: 7.5pt;
      color: var(--muted);
      line-height: 1.7;
    }

    .line-details.no-details {
      color: var(--rule);
    }

    .detail-label {
      color: var(--brown);
      font-weight: 400;
    }

    .col-qty td,
    td.col-qty {
      font-family: 'Jost', sans-serif;
      font-weight: 300;
      font-size: 9pt;
      color: var(--mid);
      text-align: right;
    }

    td.col-price {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      font-size: 9.5pt;
      color: var(--dark);
      text-align: right;
    }

    /* ─── Subtotal Strip ────────────────────────────────────────────── */
    .subtotal-strip {
      display: flex;
      justify-content: flex-end;
      padding-top: 0.15in;
      border-top: 1px solid var(--rule);
      margin-bottom: 0.12in;
    }

    .subtotal-block {
      width: 2.8in;
    }

    .subtotal-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.055in 0;
      border-bottom: 1px solid #ede8e2;
    }

    .subtotal-row:last-child {
      border-bottom: none;
    }

    .subtotal-label {
      font-family: 'Jost', sans-serif;
      font-weight: 300;
      font-size: 8.5pt;
      color: var(--mid);
      letter-spacing: 0.02em;
    }

    .subtotal-value {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      font-size: 9pt;
      color: var(--dark);
    }

    /* ─── Investment Summary Page ───────────────────────────────────── */
    .investment-block {
      margin: 0.3in 0;
      padding: 0.35in 0.4in;
      border: 1px solid var(--rule);
      background: var(--white);
      position: relative;
    }

    .investment-block::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--brown), var(--brown-light), var(--brown));
    }

    .investment-line {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.1in 0;
      border-bottom: 1px solid #ede8e2;
    }

    .investment-line:last-child {
      border-bottom: none;
    }

    .investment-label {
      font-family: 'Jost', sans-serif;
      font-weight: 300;
      font-size: 10pt;
      color: var(--mid);
    }

    .investment-value {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      font-size: 10.5pt;
      color: var(--dark);
    }

    .investment-total-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.18in 0 0.08in;
      border-top: 1px solid var(--brown);
      margin-top: 0.1in;
    }

    .investment-total-label {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 400;
      font-size: 20pt;
      color: var(--dark);
      letter-spacing: 0.01em;
    }

    .investment-total-value {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 600;
      font-size: 26pt;
      color: var(--brown);
      letter-spacing: -0.01em;
    }

    /* ─── Payment Schedule ──────────────────────────────────────────── */
    .payment-schedule {
      margin: 0.28in 0;
    }

    .payment-row {
      display: flex;
      align-items: flex-start;
      gap: 0.18in;
      padding: 0.1in 0;
      border-bottom: 1px solid #ede8e2;
    }

    .payment-row:last-child {
      border-bottom: none;
    }

    .payment-number {
      width: 0.26in;
      height: 0.26in;
      background: var(--brown);
      color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Jost', sans-serif;
      font-size: 7pt;
      font-weight: 400;
      flex-shrink: 0;
      margin-top: 0.01in;
    }

    .payment-content {
      flex: 1;
    }

    .payment-milestone {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      font-size: 9pt;
      color: var(--dark);
    }

    .payment-detail {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 8pt;
      color: var(--muted);
      margin-top: 0.02in;
    }

    .payment-pct {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 400;
      font-size: 16pt;
      color: var(--brown);
      flex-shrink: 0;
      text-align: right;
      min-width: 0.6in;
    }

    /* ─── Terms Block ───────────────────────────────────────────────── */
    .terms-block {
      font-family: 'Jost', sans-serif;
      font-weight: 300;
      font-size: 7.5pt;
      color: var(--muted);
      line-height: 1.75;
      margin: 0.2in 0;
      padding: 0.18in 0.22in;
      border-left: 2px solid var(--rule);
      background: var(--white);
    }

    /* ─── Signature Block ───────────────────────────────────────────── */
    .signature-grid {
      display: grid;
      grid-template-columns: 1fr 0.2in 1fr;
      gap: 0;
      margin: 0.35in 0 0.25in;
    }

    .signature-column {
      padding: 0;
    }

    .signature-line {
      border-bottom: 1px solid var(--dark);
      height: 0.45in;
      margin-bottom: 0.08in;
    }

    .signature-label {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 6.5pt;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .signature-name {
      font-family: 'Jost', sans-serif;
      font-weight: 300;
      font-size: 8.5pt;
      color: var(--dark);
      margin-top: 0.04in;
    }

    /* ─── Validity Note ─────────────────────────────────────────────── */
    .validity-note {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 7.5pt;
      color: var(--muted);
      letter-spacing: 0.06em;
      text-align: center;
      padding: 0.12in;
      border: 1px solid var(--rule);
      margin-bottom: 0.25in;
    }

    /* ─── Page Footer ───────────────────────────────────────────────── */
    .page-footer {
      border-top: 1px solid var(--rule);
      padding-top: 0.15in;
      margin-top: 0.3in;
    }

    .footer-showrooms {
      display: flex;
      justify-content: space-between;
      gap: 0.2in;
      margin-bottom: 0.12in;
    }

    .footer-showroom {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 6.5pt;
      color: var(--muted);
      line-height: 1.7;
    }

    .footer-showroom-name {
      font-weight: 400;
      color: var(--brown);
      letter-spacing: 0.1em;
      font-size: 6pt;
      text-transform: uppercase;
      margin-bottom: 0.03in;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-brand {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-size: 8.5pt;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--brown);
    }

    .footer-copy {
      font-family: 'Jost', sans-serif;
      font-weight: 200;
      font-size: 6.5pt;
      color: var(--rule);
      letter-spacing: 0.08em;
    }

    /* ─── Watermark ─────────────────────────────────────────────────── */
    .watermark {
      position: absolute;
      bottom: 1.2in;
      left: 50%;
      transform: translateX(-50%) rotate(-35deg);
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-size: 56pt;
      color: rgba(140, 107, 78, 0.04);
      white-space: nowrap;
      pointer-events: none;
      letter-spacing: 0.1em;
      z-index: 0;
    }

    .page-content {
      position: relative;
      z-index: 1;
    }

    /* ─── Print Styles ──────────────────────────────────────────────── */
    @media print {
      html, body {
        background: none;
        margin: 0;
        padding: 0;
      }

      .page {
        margin: 0;
        padding: 0.65in 0.75in;
        box-shadow: none;
        width: 8.5in;
        min-height: 11in;
        page-break-after: always;
        break-after: page;
      }

      .page:last-child {
        page-break-after: avoid;
        break-after: avoid;
      }

      .cover-page {
        height: 11in;
      }

      @page {
        size: letter;
        margin: 0;
      }

      .watermark {
        color: rgba(140, 107, 78, 0.035);
      }
    }
  </style>
</head>
<body>

  <!-- ═══════════════════════════════════════════════
       PAGE 1 — COVER
  ═══════════════════════════════════════════════ -->
  <div class="page cover-page">
    <div class="cover-corner-accent"></div>
    <div class="cover-corner-accent-br"></div>

    <div class="cover-header">
      <div class="brand-logo">Inplace <em>Studio</em></div>
      <div class="cover-rule-top"></div>
      <div class="brand-tagline">Premium Kitchen Design &nbsp;·&nbsp; Southern California</div>
    </div>

    <div class="cover-body">
      <div class="cover-eyebrow">Kitchen Design Proposal</div>
      <div class="cover-title">
        Prepared<br>
        <em>Exclusively For</em>
      </div>
      <div class="cover-divider">
        <div class="cover-divider-line"></div>
        <div class="cover-divider-ornament"></div>
        <div class="cover-divider-line"></div>
      </div>
      <div class="cover-client-block">
        <div class="cover-client-label">Client</div>
        <div class="cover-client-name">${escapeHtml(data.clientName)}</div>
        <div class="cover-client-address">${escapeHtml(data.projectAddress)}</div>
      </div>
      <div class="cover-meta">
        <div class="cover-meta-item">
          <span class="cover-meta-label">Date</span>
          <span class="cover-meta-value">${formattedDate}</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Proposal No.</span>
          <span class="cover-meta-value">${escapeHtml(data.proposalNumber)}</span>
        </div>
        <div class="cover-meta-item">
          <span class="cover-meta-label">Cabinetry</span>
          <span class="cover-meta-value">${escapeHtml(data.supplierName)}</span>
        </div>
      </div>
    </div>

    <div class="cover-confidential">Prepared Exclusively for ${escapeHtml(data.clientName)}</div>

    <div class="cover-footer">
      <div class="cover-footer-address">
        Irvine Showroom &nbsp;·&nbsp; 6 Journey, Ste 115, Aliso Viejo, CA 92656<br>
        Rancho Cucamonga &nbsp;·&nbsp; 11098 Arrow Rte, Ste 403, Rancho Cucamonga, CA 91730<br>
        Los Angeles &nbsp;·&nbsp; 14016 Ventura Blvd, Sherman Oaks, CA 91423
      </div>
      <div class="cover-footer-web">inplacestudio.com</div>
    </div>
  </div>


  <!-- ═══════════════════════════════════════════════
       PAGE 2 — PROJECT SUMMARY
  ═══════════════════════════════════════════════ -->
  <div class="page">
    <div class="watermark">Inplace Studio</div>
    <div class="page-content">
      <div class="page-header">
        <div class="page-header-brand">Inplace <em>Studio</em></div>
        <div class="page-header-meta">
          Proposal ${escapeHtml(data.proposalNumber)}<br>
          ${formattedDate}
        </div>
      </div>

      <div class="section-heading">
        <div class="section-heading-text">Project Summary</div>
        <div class="section-heading-rule"></div>
      </div>

      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-card-label">Client</div>
          <div class="summary-card-value large">${escapeHtml(data.clientName)}</div>
        </div>

        <div class="summary-card">
          <div class="summary-card-label">Project Address</div>
          <div class="summary-card-value">${escapeHtml(data.projectAddress)}</div>
        </div>

        ${data.clientEmail ? `
        <div class="summary-card">
          <div class="summary-card-label">Email</div>
          <div class="summary-card-value">${escapeHtml(data.clientEmail)}</div>
        </div>` : ""}

        ${data.clientPhone ? `
        <div class="summary-card">
          <div class="summary-card-label">Phone</div>
          <div class="summary-card-value">${escapeHtml(data.clientPhone)}</div>
        </div>` : ""}

        <div class="summary-card">
          <div class="summary-card-label">Cabinetry Supplier</div>
          <div class="summary-card-value">${escapeHtml(data.supplierName)}</div>
        </div>

        ${data.timelineEstimate ? `
        <div class="summary-card">
          <div class="summary-card-label">Estimated Timeline</div>
          <div class="summary-card-value">${escapeHtml(data.timelineEstimate)}</div>
        </div>` : ""}

        <div class="summary-card">
          <div class="summary-card-label">Proposal Date</div>
          <div class="summary-card-value">${formattedDate}</div>
        </div>

        <div class="summary-card">
          <div class="summary-card-label">Valid Until</div>
          <div class="summary-card-value">${escapeHtml(new Date(new Date(data.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))}</div>
        </div>
      </div>

      <div class="page-footer">
        <div class="footer-showrooms">
          <div class="footer-showroom">
            <div class="footer-showroom-name">Irvine / Aliso Viejo</div>
            6 Journey, Suite 115<br>Aliso Viejo, CA 92656
          </div>
          <div class="footer-showroom">
            <div class="footer-showroom-name">Rancho Cucamonga</div>
            11098 Arrow Route, Suite 403<br>Rancho Cucamonga, CA 91730
          </div>
          <div class="footer-showroom">
            <div class="footer-showroom-name">Los Angeles</div>
            14016 Ventura Blvd<br>Sherman Oaks, CA 91423
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-brand">Inplace Studio</div>
          <div class="footer-copy">Confidential &nbsp;·&nbsp; Prepared for ${escapeHtml(data.clientName)}</div>
        </div>
      </div>
    </div>
  </div>


  <!-- ═══════════════════════════════════════════════
       PAGE 3 — ITEMIZED SPECIFICATIONS
  ═══════════════════════════════════════════════ -->
  <div class="page">
    <div class="watermark">Inplace Studio</div>
    <div class="page-content">
      <div class="page-header">
        <div class="page-header-brand">Inplace <em>Studio</em></div>
        <div class="page-header-meta">
          Proposal ${escapeHtml(data.proposalNumber)}<br>
          ${formattedDate}
        </div>
      </div>

      <div class="section-heading">
        <div class="section-heading-text">Cabinetry &amp; Specifications</div>
        <div class="section-heading-rule"></div>
      </div>

      <table class="items-table">
        <thead>
          <tr>
            <th class="col-description">Item &amp; Details</th>
            <th class="col-qty">Qty</th>
            <th class="col-price">Investment</th>
          </tr>
        </thead>
        <tbody>
          ${lineRows}
        </tbody>
      </table>

      <div class="subtotal-strip">
        <div class="subtotal-block">
          <div class="subtotal-row">
            <span class="subtotal-label">Cabinetry Subtotal</span>
            <span class="subtotal-value">${formatCurrency(cabinetsSubtotal)}</span>
          </div>
          <div class="subtotal-row">
            <span class="subtotal-label">Installation</span>
            <span class="subtotal-value">${formatCurrency(data.installationCost)}</span>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <div class="footer-showrooms">
          <div class="footer-showroom">
            <div class="footer-showroom-name">Irvine / Aliso Viejo</div>
            6 Journey, Suite 115<br>Aliso Viejo, CA 92656
          </div>
          <div class="footer-showroom">
            <div class="footer-showroom-name">Rancho Cucamonga</div>
            11098 Arrow Route, Suite 403<br>Rancho Cucamonga, CA 91730
          </div>
          <div class="footer-showroom">
            <div class="footer-showroom-name">Los Angeles</div>
            14016 Ventura Blvd<br>Sherman Oaks, CA 91423
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-brand">Inplace Studio</div>
          <div class="footer-copy">Confidential &nbsp;·&nbsp; Prepared for ${escapeHtml(data.clientName)}</div>
        </div>
      </div>
    </div>
  </div>


  <!-- ═══════════════════════════════════════════════
       PAGE 4 — INVESTMENT SUMMARY
  ═══════════════════════════════════════════════ -->
  <div class="page">
    <div class="watermark">Inplace Studio</div>
    <div class="page-content">
      <div class="page-header">
        <div class="page-header-brand">Inplace <em>Studio</em></div>
        <div class="page-header-meta">
          Proposal ${escapeHtml(data.proposalNumber)}<br>
          ${formattedDate}
        </div>
      </div>

      <div class="section-heading">
        <div class="section-heading-text">Your Investment</div>
        <div class="section-heading-rule"></div>
      </div>

      <div class="investment-block">
        <div class="investment-line">
          <span class="investment-label">Cabinetry &amp; Millwork</span>
          <span class="investment-value">${formatCurrency(cabinetsSubtotal)}</span>
        </div>
        <div class="investment-line">
          <span class="investment-label">Professional Installation</span>
          <span class="investment-value">${formatCurrency(data.installationCost)}</span>
        </div>
        <div class="investment-total-row">
          <span class="investment-total-label">Total Investment</span>
          <span class="investment-total-value">${formatCurrency(data.total)}</span>
        </div>
      </div>

      <div class="section-heading" style="margin-top: 0.35in;">
        <div class="section-heading-text">Payment Schedule</div>
        <div class="section-heading-rule"></div>
      </div>

      <div class="payment-schedule">
        <div class="payment-row">
          <div class="payment-number">1</div>
          <div class="payment-content">
            <div class="payment-milestone">Deposit — Due at Signing</div>
            <div class="payment-detail">Required to begin cabinetry production and secure your project timeline</div>
          </div>
          <div class="payment-pct">50%</div>
        </div>
        <div class="payment-row">
          <div class="payment-number">2</div>
          <div class="payment-content">
            <div class="payment-milestone">Pre-Installation — Due Before Delivery</div>
            <div class="payment-detail">Due upon confirmation of delivery and installation scheduling</div>
          </div>
          <div class="payment-pct">40%</div>
        </div>
        <div class="payment-row">
          <div class="payment-number">3</div>
          <div class="payment-content">
            <div class="payment-milestone">Final Balance — Due at Completion</div>
            <div class="payment-detail">Due upon successful installation and client walkthrough</div>
          </div>
          <div class="payment-pct">10%</div>
        </div>
      </div>

      <div class="section-heading" style="margin-top: 0.3in;">
        <div class="section-heading-text">Terms &amp; Conditions</div>
        <div class="section-heading-rule"></div>
      </div>

      <div class="terms-block">${termsText}</div>

      <div class="validity-note">
        This proposal is valid for 30 days from ${formattedDate}. Pricing is subject to change after this period.
      </div>

      <div class="section-heading" style="margin-top: 0.28in;">
        <div class="section-heading-text">Authorization</div>
        <div class="section-heading-rule"></div>
      </div>

      <div class="signature-grid">
        <div class="signature-column">
          <div class="signature-line"></div>
          <div class="signature-label">Client Signature</div>
          <div class="signature-name">${escapeHtml(data.clientName)}</div>
        </div>
        <div></div>
        <div class="signature-column">
          <div class="signature-line"></div>
          <div class="signature-label">Inplace Studio Representative</div>
          <div class="signature-name">Authorized Designee</div>
        </div>
      </div>

      <div class="page-footer">
        <div class="footer-showrooms">
          <div class="footer-showroom">
            <div class="footer-showroom-name">Irvine / Aliso Viejo</div>
            6 Journey, Suite 115<br>Aliso Viejo, CA 92656
          </div>
          <div class="footer-showroom">
            <div class="footer-showroom-name">Rancho Cucamonga</div>
            11098 Arrow Route, Suite 403<br>Rancho Cucamonga, CA 91730
          </div>
          <div class="footer-showroom">
            <div class="footer-showroom-name">Los Angeles</div>
            14016 Ventura Blvd<br>Sherman Oaks, CA 91423
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-brand">Inplace Studio</div>
          <div class="footer-copy">inplacestudio.com &nbsp;·&nbsp; Confidential</div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>`;
}
