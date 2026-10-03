import { DealSOWInput } from "@/interfaces/deal.interface";
import { convertNumberToCurrency, formatDate } from "./client_helper";

export function quotationTemplate(
  quotationNumber: string,
  agencyName: string,
  brandName: string,
  campaignName: string,
  sow: DealSOWInput[],
  talentName: string,
  proposedValue: number,
  taxPct: number,
  tax: number,
  afterTax: number,
) {
  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${quotationNumber} | ${agencyName}</title>
    <style>
      :root {
        --ink: #1d262f;
        --muted: #64748b;
        --line: #e2e8f0;
        --soft: #f5f7fa;
        --white: #fff;
      }

      * {
        box-sizing: border-box;
      }
      html {
        background: #e9edf1;
      }
      body {
        margin: 0;
        color: var(--ink);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10pt;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .paper {
        position: relative;
        width: 210mm;
        min-height: 297mm;
        margin: 20px auto;
        overflow: hidden;
        background: var(--white);
        box-shadow: 0 12px 36px #1d262f22;
      }

      .masthead {
        min-height: 51mm;
        padding: 15mm 15.5mm 10mm;
        background: var(--ink);
        color: var(--white);
      }
      .agency-name {
        font-size: 15pt;
        font-weight: 700;
        letter-spacing: 0.015em;
      }
      .agency-contact {
        margin-top: 5mm;
        color: #cbd5e1;
        font-size: 8pt;
      }
      .masthead-bottom {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 10mm;
        margin-top: 13mm;
      }
      h1 {
        margin: 0;
        font-size: 25pt;
        line-height: 1;
        letter-spacing: 0.01em;
      }
      .version {
        padding-bottom: 1mm;
        color: #cbd5e1;
        font-size: 8.5pt;
        font-weight: 700;
        white-space: nowrap;
      }

      .content {
        padding: 4.5mm 15.5mm 0;
      }
      .demo-banner {
        margin: 0 0 8mm;
        padding: 3mm 4mm;
        border-radius: 2mm;
        background: #eff4f8;
        color: #394149;
        font-size: 7.7pt;
        font-weight: 700;
      }
      .meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 15mm;
        min-height: 28mm;
      }
      .eyebrow {
        color: var(--muted);
        font-size: 8pt;
        font-weight: 700;
      }
      .brand {
        margin: 4mm 0 1.5mm;
        font-size: 11pt;
        font-weight: 700;
      }
      .muted {
        color: var(--muted);
      }
      .meta p {
        margin: 0 0 2mm;
        font-size: 8.6pt;
      }
      .doc-detail {
        margin-top: 3.7mm;
      }
      .doc-detail div {
        display: flex;
        justify-content: space-between;
        gap: 4mm;
        margin-bottom: 2.5mm;
        font-size: 8.4pt;
      }
      .doc-detail strong {
        text-align: right;
      }
      .section-rule {
        border: 0;
        border-top: 0.25mm solid var(--line);
        margin: 2.5mm 0 6mm;
      }
      h2 {
        margin: 0;
        font-size: 13pt;
        line-height: 1.25;
      }
      .section-caption {
        margin: 2mm 0 6mm;
        color: var(--muted);
        font-size: 8.4pt;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
      }
      th {
        padding: 3.5mm 4mm;
        background: var(--soft);
        color: var(--muted);
        font-size: 7.8pt;
        text-align: left;
      }
      th:first-child {
        border-radius: 1.5mm 0 0 1.5mm;
      }
      th:last-child {
        border-radius: 0 1.5mm 1.5mm 0;
      }
      th:not(:first-child),
      td:not(:first-child) {
        text-align: right;
      }
      td {
        height: 12.5mm;
        padding: 2mm 4mm;
        border-bottom: 0.25mm solid var(--line);
        font-size: 8.6pt;
        vertical-align: middle;
      }
      td strong {
        font-size: 8.9pt;
      }
      td small {
        display: block;
        margin-top: 1.6mm;
        color: var(--muted);
        font-size: 7.5pt;
      }
      th:nth-child(1) {
        width: 52%;
      }
      th:nth-child(2) {
        width: 9%;
      }
      th:nth-child(3) {
        width: 19%;
      }
      th:nth-child(4) {
        width: 20%;
      }
      tr {
        break-inside: avoid;
      }

      .summary {
        width: 48%;
        margin: 4mm 0 0 auto;
        font-size: 8.6pt;
      }
      .summary-line {
        display: flex;
        justify-content: space-between;
        gap: 4mm;
        margin-bottom: 2.8mm;
      }
      .summary-line span:first-child {
        color: var(--muted);
      }
      .total {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 3mm;
        margin-top: 5mm;
        padding: 4.1mm 4.5mm;
        border-radius: 1.5mm;
        background: var(--ink);
        color: var(--white);
        font-weight: 700;
      }
      .total span {
        font-size: 8pt;
        white-space: nowrap;
      }
      .total strong {
        font-size: 11pt;
        white-space: nowrap;
      }

      .terms {
        margin-top: 9mm;
      }
      .terms h2 {
        font-size: 11pt;
      }
      .terms ol {
        margin: 5mm 0 0;
        padding-left: 5mm;
      }
      .terms li {
        margin: 0 0 2mm;
        padding-left: 1mm;
        font-size: 8pt;
        line-height: 1.35;
      }

      .signatures {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15mm;
        margin-top: 7mm;
        padding-top: 5mm;
        border-top: 0.25mm solid var(--line);
        break-inside: avoid;
      }
      .signature-label {
        color: var(--muted);
        font-size: 8pt;
      }
      .signature-line {
        width: 55mm;
        height: 11mm;
        border-bottom: 0.25mm solid var(--ink);
      }
      .signature-name {
        margin-top: 2mm;
        color: var(--muted);
        font-size: 7.5pt;
      }

      .footer {
        position: absolute;
        right: 15.5mm;
        bottom: 14mm;
        left: 15.5mm;
        display: flex;
        justify-content: space-between;
        padding-top: 3mm;
        border-top: 0.25mm solid var(--line);
        color: var(--muted);
        font-size: 7pt;
      }

      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        html {
          background: #fff;
        }
        .paper {
          width: 210mm;
          height: 297mm;
          min-height: 0;
          margin: 0;
          box-shadow: none;
        }
      }
      @media screen and (max-width: 820px) {
        body {
          overflow-x: auto;
        }
        .paper {
          margin: 0;
        }
      }
    </style>
  </head>
  <body>
    <main class="paper">
      <header class="masthead">
        <div class="agency-name">${agencyName}</div>
        <div class="agency-contact">
          Alamat agency &nbsp;•&nbsp; email@agency.com &nbsp;•&nbsp; +62
          812-0000-0000
        </div>
        <div class="masthead-bottom">
          <h1>QUOTATION</h1>
          <div class="version">VERSI 01 &nbsp;/&nbsp; DRAFT</div>
        </div>
      </header>

      <div class="content">
        <section class="meta" aria-label="Informasi quotation">
          <div>
            <div class="eyebrow">DITUJUKAN KEPADA</div>
            <div class="brand">${brandName}</div>
            <p>Campaign: ${campaignName}</p>
          </div>
          <div>
            <div class="eyebrow">DETAIL DOKUMEN</div>
            <div class="doc-detail">
              <div>
                <span class="muted">No. quotation</span
                ><strong>${quotationNumber}</strong>
              </div>
              <div>
                <span class="muted">Tanggal</span><span>${formatDate(new Date().toISOString(), "dd MMMM yyyy")}</span>
              </div>
              <div>
                <span class="muted">Berlaku sampai</span
                ><span>15 Oktober 2026</span>
              </div>
            </div>
          </div>
        </section>

        <hr class="section-rule" />
        <section aria-labelledby="penawaran-title">
          <h2 id="penawaran-title">Rincian Penawaran</h2>
          <p class="section-caption">
            Scope dari agency untuk campaign di atas.
          </p>
          <table>
            <thead>
              <tr>
                <th>TALENT / KONTEN</th>
                <th>QTY</th>
                <th>TENGGAT</th>
              </tr>
            </thead>
            <tbody>
              ${sow.map(
                (item) => `<tr>
                <td>
                  <strong>${item.content_name}</strong><small>${talentName}</small>
                </td>
                <td>${item.quantity}</td>
                <td>${formatDate(item.due_date)}</td>
              </tr>`,
              )}
            </tbody>
          </table>
          <div class="summary">
            <div class="summary-line">
              <span>Subtotal</span><span>${convertNumberToCurrency(proposedValue)}</span>
            </div>
            <div class="summary-line">
              <span>Pajak (${taxPct}%)</span><span class="muted">-${convertNumberToCurrency(tax)}</span>
            </div>
            <div class="total">
              <span>TOTAL PENAWARAN</span><strong>${convertNumberToCurrency(afterTax)}</strong>
            </div>
          </div>
        </section>

        <section class="terms" aria-labelledby="terms-title">
          <h2 id="terms-title">Ketentuan Penawaran</h2>
          <ol>
            <li>Harga dan deliverables mengikuti rincian pada dokumen ini.</li>
            <li>
              Jadwal produksi dan tayang disepakati setelah penawaran disetujui.
            </li>
            <li>
              Pajak, hak penggunaan konten, dan revisi ditetapkan pada
              kesepakatan final.
            </li>
            <li>
              Perubahan scope atau jumlah konten memerlukan quotation versi
              baru.
            </li>
          </ol>
        </section>

        <section class="signatures" aria-label="Persetujuan">
          <div>
            <div class="signature-label">Disiapkan oleh</div>
            <div class="signature-line"></div>
            <div class="signature-name">Nama &amp; jabatan agency</div>
          </div>
          <div>
            <div class="signature-label">Disetujui oleh</div>
            <div class="signature-line"></div>
            <div class="signature-name">Nama &amp; jabatan brand</div>
          </div>
        </section>
      </div>

      <footer class="footer">
        <span>Template quotation • CRM Agency KOL</span
        ><span>Halaman 1 dari 1</span>
      </footer>
    </main>
  </body>
</html>
`;
}
