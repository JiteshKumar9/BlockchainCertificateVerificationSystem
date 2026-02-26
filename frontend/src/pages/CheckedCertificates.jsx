import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';

export default function CheckedCertificates() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('checkedCertificates');
      const parsed = raw ? JSON.parse(raw) : [];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('checkedCertificates');
    setItems([]);
  };

  return (
    <DashboardLayout>
      <AnimateSection>
        <div className="card section" style={{ maxWidth: 1000, margin: '0 auto', background: 'rgba(59, 56, 160, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 className="page-title" style={{ margin: 0, color: '#B2B0E8' }}>Checked Certificates</h2>
            {items.length > 0 && (
              <button 
                onClick={clearHistory} 
                style={{ 
                  padding: '8px 12px', 
                  borderRadius: 8, 
                  border: '1px solid rgba(122, 133, 193, 0.4)', 
                  color: '#7A85C1', 
                  background: 'transparent', 
                  cursor: 'pointer' 
                }}
              >
                Clear History
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div 
              className="alert alert-info" 
              style={{ 
                background: 'rgba(59, 56, 160, 0.2)', 
                color: '#B2B0E8', 
                padding: 16, 
                borderRadius: 12 
              }}
            >
              No checked certificates yet. Use the Check Certificate page to verify an ID.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {items.map((item) => (
                <div key={item.id + item.checkedAt} style={{
                  background: 'rgba(59, 56, 160, 0.3)',
                  border: '1px solid rgba(122, 133, 193, 0.25)',
                  borderRadius: 12,
                  padding: 16,
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 12,
                  alignItems: 'center'
                }}>
                  <div style={{ color: '#B2B0E8' }}>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>ID: {item.id}</div>
                    {item.certificate && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        <div><span style={{ color: '#7A85C1' }}>Student:</span> {item.certificate.studentName}</div>
                        <div><span style={{ color: '#7A85C1' }}>Type:</span> {item.certificate.certificateType || item.certificate.title}</div>
                        <div><span style={{ color: '#7A85C1' }}>University:</span> {item.certificate.universityName}</div>
                      </div>
                    )}
                    <div style={{ marginTop: 6, color: item.valid ? '#1A2A80' : '#3B38A0' }}>
                      {item.valid ? 'Certificate is Valid' : (item.message || 'Invalid or Unverified Certificate')}
                    </div>
                    <div style={{ color: '#7A85C1', fontSize: 12, marginTop: 4 }}>Checked at: {new Date(item.checkedAt).toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {item.certificate?.qrCodeDataUrl && (
                      <img 
                        src={item.certificate.qrCodeDataUrl} 
                        alt="QR Code" 
                        style={{ 
                          width: 64, 
                          height: 64, 
                          background: '#7A85C1', 
                          borderRadius: 8 
                        }} 
                      />
                    )}
                    {item.certificate?.certificateId && (
                      <div style={{ marginTop: 8 }}>
                        <a 
                          href={`/verify/${item.certificate.certificateId}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            color: '#3B38A0', 
                            textDecoration: 'none', 
                            fontSize: 12 
                          }}
                        >
                          View Full Details
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimateSection>
    </DashboardLayout>
  );
}
