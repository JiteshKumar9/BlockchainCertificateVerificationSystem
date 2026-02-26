import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function QRCodeLink({ certificateId, size = 128 }) {
  const [dataUrl, setDataUrl] = useState('');
  const base = (import.meta.env.VITE_PUBLIC_BASE_URL) || window.location.origin;
  const verifyUrl = `${base}/certificate/${certificateId}`;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const url = await QRCode.toDataURL(verifyUrl);
        if (mounted) setDataUrl(url);
      } catch {
        if (mounted) setDataUrl('');
      }
    })();
    return () => { mounted = false; };
  }, [verifyUrl]);

  if (!dataUrl) return null;

  return (
    <a href={verifyUrl} title="Open verification page" target="_self" rel="noreferrer">
      <img src={dataUrl} width={size} height={size} alt="QR Code" className="qr-image" />
    </a>
  );
}


