import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function IssuedCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchIssuedCertificates = async () => {
    try {
      setLoading(true);
      const res = await api.get('/university/issued-certificates');
      setCertificates(res.data || []);
    } catch (error) {
      toast.error('Failed to fetch issued certificates');
      console.error('Error fetching issued certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuedCertificates();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a' }}>
      <DashboardLayout>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
          <AnimateSection>
            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.7)', 
              borderRadius: '16px', 
              padding: '32px',
              marginBottom: '32px'
            }}>
              <h1 style={{ 
                color: '#3b82f6', 
                fontSize: '28px', 
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Issued Certificates
              </h1>
              <p style={{ 
                color: '#94a3b8', 
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                History of all certificates that have been issued by your university
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: '#3b82f6', fontSize: '24px', margin: '0 0 8px 0' }}>
                    {certificates.length}
                  </h3>
                  <p style={{ color: '#3b82f6', margin: 0 }}>Total Issued</p>
                </div>
              </div>
            </div>
          </AnimateSection>

          <AnimateSection delay={0.1}>
            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.7)', 
              borderRadius: '16px', 
              padding: '32px'
            }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: '#94a3b8' }}>Loading issued certificates...</p>
                </div>
              ) : certificates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: '#94a3b8' }}>No issued certificates found</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {certificates.map((cert) => (
                    <div key={cert._id} style={{ 
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => { setSelectedCertificate(cert); setShowModal(true); }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.7)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ color: '#e2e8f0', margin: 0, fontSize: '18px' }}>
                          {cert.title || cert.certificateType || cert.certificateName || 'Certificate'}
                        </h3>
                        <span style={{ 
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          color: '#3b82f6',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          ISSUED
                        </span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 4px 0' }}>Student ID</p>
                          <p style={{ color: '#e2e8f0', margin: 0 }}>{cert.studentId}</p>
                        </div>
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 4px 0' }}>Issue Date</p>
                          <p style={{ color: '#e2e8f0', margin: 0 }}>{formatDate(cert.issueDate)}</p>
                        </div>
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 4px 0' }}>University</p>
                          <p style={{ color: '#e2e8f0', margin: 0 }}>{cert.universityName}</p>
                        </div>
                      </div>
                      
                      {cert.description && (
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 4px 0' }}>Description</p>
                          <p style={{ color: '#e2e8f0', margin: 0 }}>{cert.description}</p>
                        </div>
                      )}
                      
                      {cert.certificateHash && (
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 4px 0' }}>Certificate Hash</p>
                          <p style={{ color: '#e2e8f0', margin: 0, fontSize: '12px', wordBreak: 'break-all' }}>
                            {cert.certificateHash}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimateSection>
          {/* Detail Modal */}
          {showModal && selectedCertificate && (
            <div style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => { setShowModal(false); setSelectedCertificate(null); }}
            >
              <div style={{
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                borderRadius: '20px',
                padding: '32px',
                maxWidth: '800px',
                width: '100%',
                color: '#e2e8f0',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => { setShowModal(false); setSelectedCertificate(null); }}
                  style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'transparent', border: 'none', color: '#94a3b8',
                    fontSize: 22, cursor: 'pointer'
                  }}
                >✕</button>

                <h2 style={{ marginTop: 0, marginBottom: 12, color: '#3b82f6' }}>
                  {selectedCertificate.title || selectedCertificate.certificateType || selectedCertificate.certificateName || 'Certificate'}
                </h2>

                <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 16 }}>
                  {selectedCertificate.certificateId && (
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: 13 }}>Certificate ID</div>
                      <div style={{ fontFamily: 'monospace' }}>{selectedCertificate.certificateId}</div>
                    </div>
                  )}
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>Student ID</div>
                    <div>{selectedCertificate.studentId || '—'}</div>
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>Student Name</div>
                    <div>{selectedCertificate.studentName || '—'}</div>
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>University</div>
                    <div>{selectedCertificate.universityName || '—'}</div>
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>Issue Date</div>
                    <div>{formatDate(selectedCertificate.issueDate)}</div>
                  </div>
                  {selectedCertificate.status && (
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: 13 }}>Status</div>
                      <div>{selectedCertificate.status}</div>
                    </div>
                  )}
                </div>

                {selectedCertificate.description && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>Description</div>
                    <div>{selectedCertificate.description}</div>
                  </div>
                )}

                {selectedCertificate.certificateHash && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>Certificate Hash</div>
                    <div style={{ fontSize: 12, wordBreak: 'break-all' }}>{selectedCertificate.certificateHash}</div>
                  </div>
                )}

                {selectedCertificate.qrCodeDataUrl && (
                  <div style={{ textAlign: 'center', marginTop: 12 }}>
                    <div style={{ display: 'inline-block', padding: 12, background: '#fff', borderRadius: 12 }}>
                      <img src={selectedCertificate.qrCodeDataUrl} alt="QR" style={{ width: 120, height: 120 }} />
                    </div>
                    {selectedCertificate.certificateId && (
                      <div style={{ marginTop: 8 }}>
                        <a
                          href={`/verify/${selectedCertificate.certificateId}`}
                          target="_blank" rel="noreferrer"
                          style={{ color: '#3b82f6', textDecoration: 'none', fontSize: 14 }}
                        >View Public Verification Page →</a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
}
