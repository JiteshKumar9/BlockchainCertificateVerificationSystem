export default function QRCodeDisplay({ dataUrl, size = 128 }) {
  if (!dataUrl) return null;
  return (
    <img
      src={dataUrl}
      alt="QR Code"
      width={size}
      height={size}
      className="qr-image"
    />
  );
}


