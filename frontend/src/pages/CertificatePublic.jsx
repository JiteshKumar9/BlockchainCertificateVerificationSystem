import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';
import QRCodeDisplay from '../components/QRCodeDisplay';

export default function CertificatePublic() {
  const { certificateId } = useParams();
  const [cert, setCert] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/certificates/${certificateId}`);
        setCert(res.data);
      } catch (e) { setError('Certificate not found'); }
    })();
  }, [certificateId]);

  return (
    <DashboardLayout>
      <AnimateSection>
      <div className="narrow card section">
        {!cert && !error && <p>Loading...</p>}
        {error && <p style={{ color: '#dc2626', fontWeight: 600 }}>{error}</p>}
        {cert && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16 }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <h2 className="page-title" style={{ marginBottom: 8 }}>{cert.title || cert.certificateType}</h2>
              <div><strong>Certificate ID:</strong> {cert.certificateId}</div>
              <div><strong>Candidate Name:</strong> {cert.studentName}</div>
              <div><strong>University Name:</strong> {cert.universityName}</div>
              <div><strong>Issue Date:</strong> {cert.date}</div>
              <div><strong>Status:</strong> {cert.status === 'Verified' ? 'Verified' : 'Rejected'}</div>
              <p className="muted" style={{ marginTop: 8 }}>Verified via Blockchain Certificate Verification System</p>
            </div>
            <QRCodeDisplay dataUrl={cert.qrCodeDataUrl} size={120} />
          </div>
        )}
      </div>
      </AnimateSection>
    </DashboardLayout>
  );
}


