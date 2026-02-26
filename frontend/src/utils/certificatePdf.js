// Utility to generate a styled Certificate PDF using html2canvas + jsPDF
// Usage: generateCertificatePDF({ studentName, courseName, issueDate, certificateId, universityName, verificationUrl, qrDataUrl?, logoUrl?, signatureText?, signatureImageUrl?, backgroundImageUrl?, backgroundOpacity?, gradientOpacity?, veilOpacity?, gradientEnabled? })

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

const brandColor = '#3b82f6';

function buildTemplateHTML(opts) {
  const {
    studentName,
    courseName,
    issueDate,
    certificateId,
    universityName,
    verificationUrl,
    qrDataUrl,
    logoUrl,
    signatureText = 'Authorized Signatory',
    signatureImageUrl,
    backgroundImageUrl,
    backgroundOpacity = 0.38,
    gradientOpacity = 0.45,
    veilOpacity = 0.04,
    gradientEnabled = true,
  } = opts;

  const qrImg = qrDataUrl ? `<img src="${qrDataUrl}" alt="QR" style="width:100px;height:100px" />` : '';
  const logoImg = logoUrl ? `<img src="${logoUrl}" alt="logo" crossorigin="anonymous" style="height:48px; object-fit:contain;"/>` : '';
  // Fallback lightweight signature SVG data URL if none provided
  const defaultSignatureSvg =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="220" height="48" viewBox="0 0 220 48">
        <path d="M5 30 C 30 10, 60 45, 90 25 S 150 10, 180 28" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M15 36 C 40 20, 70 40, 100 30" fill="none" stroke="#334155" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`);
  const signatureImg = `<img src="${signatureImageUrl || defaultSignatureSvg}" alt="signature" crossorigin="anonymous" onerror="this.onerror=null; this.src='${defaultSignatureSvg}';" style="max-height:60px; width:auto; opacity:0.95; object-fit:contain; display:block; margin:0 auto;"/>`;

  const bgLayer = backgroundImageUrl
    ? `
      <div style="position:absolute; inset:0; background-image:url('${backgroundImageUrl}'); background-size:cover; background-position:center; opacity:${backgroundOpacity}; filter:saturate(1.25);"></div>
      ${gradientEnabled ? `<div style="position:absolute; inset:0; background: linear-gradient(135deg, rgba(59,130,246,0.55) 0%, rgba(236,72,153,0.45) 50%, rgba(234,179,8,0.38) 100%); opacity: ${gradientOpacity};"></div>` : ''}
      <div style="position:absolute; inset:-10% -10% -10% -10%; background: radial-gradient(800px 500px at 15% 20%, rgba(59,130,246,0.30), transparent 60%), radial-gradient(700px 450px at 85% 80%, rgba(236,72,153,0.25), transparent 65%);"></div>
      <div style="position:absolute; inset:0; background: #ffffff; opacity: ${veilOpacity};"></div>
    `
    : '';

  return `
  <div id="certificate-root" style="width: 1123px; height: 794px; display:flex; align-items:center; justify-content:center; background:#f8fafc; font-family: 'Georgia', 'Times New Roman', serif;">
    <div style="position:relative; width: 1000px; height: 670px; background: #fff; border: 6px double ${brandColor}; padding: 40px; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
      ${bgLayer}
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div style="color:${brandColor}; font-weight:700; font-size:22px;">${universityName || 'Institution'}</div>
        ${logoImg}
      </div>

      <div style="text-align:center;">
        <div style="letter-spacing:3px; color:#111827; font-size:14px; text-shadow: 0 1px 0 rgba(255,255,255,0.6);">CERTIFICATE OF COMPLETION</div>
        <h1 style="margin: 8px 0 12px; font-size:44px; color:#0b1220; text-shadow: 0 1px 0 rgba(255,255,255,0.6);">${courseName}</h1>
        <div style="color:#1f2937; font-size:18px; text-shadow: 0 1px 0 rgba(255,255,255,0.6);">This is to certify that</div>
        <div style="margin-top:8px; font-size:30px; font-weight:700; color:#0b1220; text-shadow: 0 1px 0 rgba(255,255,255,0.6);">${studentName}</div>
        <div style="margin-top:8px; color:#1f2937; font-size:16px">has successfully completed the above course</div>
      </div>

      <div style="display:flex; gap:24px; align-items:flex-end; justify-content:space-between;">
        <div>
          <div style="color:#1f2937; font-size:14px">Certificate ID</div>
          <div style="font-family:monospace; background:#eff6ff; border:1px solid #bfdbfe; color:#1e3a8a; padding:6px 10px; border-radius:6px; display:inline-block;">${certificateId}</div>
          <div style="margin-top:10px; color:#1f2937; font-size:14px">Completion Date</div>
          <div style="font-weight:600; color:#0b1220;">${issueDate}</div>
          ${verificationUrl ? `<div style="margin-top:12px; color:#1f2937; font-size:12px">Verify at: <span style="color:${brandColor}">${verificationUrl}</span></div>` : ''}
        </div>
        <div style="text-align:center;">
          <div style="height:100px">${qrImg}</div>
          <div style="margin-top:8px; color:#1f2937; font-size:12px">Scan to verify</div>
        </div>
        <div style="text-align:center;">
          <div style="min-height:56px">${signatureImg}</div>
          <div style="margin-top:12px; border-top:2px solid #334155; width:220px; margin-left:auto; margin-right:auto"></div>
          <div style="color:#1f2937; font-weight:700">${signatureText}</div>
        </div>
      </div>
    </div>
  </div>`;
}

export async function generateCertificatePDF(options) {
  const opts = { ...options };
  // Create QR if not provided
  if (!opts.qrDataUrl && opts.verificationUrl) {
    try {
      opts.qrDataUrl = await QRCode.toDataURL(opts.verificationUrl, { margin: 1, width: 200 });
    } catch {
      // ignore QR errors
    }
  }

  // Helper to convert an image URL to data URL to avoid CORS/taint issues
  async function toDataURL(url) {
    try {
      const urlWithBust = typeof url === 'string' ? (url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now()) : url;
      const res = await fetch(urlWithBust, { mode: 'cors' });
      const blob = await res.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch {
      return url; // fallback
    }
  }

  // Inline signature, logo, and background if provided as paths
  if (opts.signatureImageUrl && !String(opts.signatureImageUrl).startsWith('data:')) {
    opts.signatureImageUrl = await toDataURL(opts.signatureImageUrl);
  }
  if (opts.logoUrl && !String(opts.logoUrl).startsWith('data:')) {
    opts.logoUrl = await toDataURL(opts.logoUrl);
  }
  if (opts.backgroundImageUrl && !String(opts.backgroundImageUrl).startsWith('data:')) {
    opts.backgroundImageUrl = await toDataURL(opts.backgroundImageUrl);
  }

  // Create a hidden container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-20000px';
  container.style.top = '0';
  container.style.zIndex = '-1';
  container.innerHTML = buildTemplateHTML(opts);
  document.body.appendChild(container);

  const root = container.querySelector('#certificate-root');

  // Ensure images (logo, signature, QR) are loaded before rendering
  const waitForImages = async (el) => {
    const imgs = Array.from(el.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) => (
        img.complete && img.naturalWidth > 0
          ? Promise.resolve()
          : new Promise((resolve) => {
              const done = () => resolve();
              img.addEventListener('load', done, { once: true });
              img.addEventListener('error', done, { once: true });
            })
      ))
    );
  };
  await waitForImages(root);

  const canvas = await html2canvas(root, { scale: 2, backgroundColor: '#f8fafc', useCORS: true, allowTaint: true });
  const imgData = canvas.toDataURL('image/png');

  // A4 landscape (mm)
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Fit image within page while preserving aspect ratio
  const imgWidthPx = canvas.width;
  const imgHeightPx = canvas.height;
  const aspect = imgHeightPx / imgWidthPx;
  const imgWidth = pageWidth - 10; // margins
  const imgHeight = imgWidth * aspect;
  const y = (pageHeight - imgHeight) / 2;

  pdf.addImage(imgData, 'PNG', 5, Math.max(5, y), imgWidth, imgHeight, undefined, 'FAST');

  const fileName = `Certificate_${(opts.studentName || 'Student').replace(/\s+/g, '_')}.pdf`;
  pdf.save(fileName);

  // Clean up
  document.body.removeChild(container);
}
