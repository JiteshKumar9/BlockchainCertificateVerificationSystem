import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function VerifierDashboard() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('verify'); // 'verify', 'certificates', 'stats'

  // Component did mount - no extra data required now
  useEffect(() => {}, []);

  // Single tab view now; no tab switching required

  // Removed certificates and stats endpoints for simplified view

  const check = async (e) => {
    e.preventDefault();
    if (!id.trim()) {
      toast.error('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(`/verifier/check/${id}`);
      setResult(res.data);
      // Persist to localStorage history
      try {
        const raw = localStorage.getItem('checkedCertificates');
        const arr = raw ? JSON.parse(raw) : [];
        const entry = {
          id,
          valid: !!res.data.valid,
          message: res.data.message,
          certificate: res.data.certificate || null,
          checkedAt: Date.now(),
        };
        const next = [entry, ...Array.isArray(arr) ? arr : []].slice(0, 100);
        localStorage.setItem('checkedCertificates', JSON.stringify(next));
      } catch { /* ignore storage errors */ }
      if (res.data.valid) {
        toast.success('Certificate is Verified');
      } else {
        toast.error('Certificate is Not Valid');
      }
    } catch (e) {
      setResult({ valid: false, message: 'Invalid or Unverified Certificate' });
      toast.error('Failed to verify certificate');
    } finally {
      setLoading(false);
    }
  };

  // Removed helper components for unused tabs

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f172a', 
        display: 'flex', 
        flexDirection: 'column' 
      }}
    >
      <DashboardLayout>
        <div style={{ 
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px',
          backgroundColor: '#0f172a',
          borderRadius: '30px'
        }}>
          {/* Single Tab Header */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '32px',
            backgroundColor: 'rgba(51, 65, 85, 0.3)',
            padding: '8px',
            borderRadius: '12px',
            width: 'fit-content'
          }}>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '500'
              }}
            >
              Check Certificate
            </div>
          </div>

          {/* Verify Certificate Tab */}
          {activeTab === 'verify' && (
            <AnimateSection>
              <div 
                className="card section" 
                style={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.7)', 
                  borderRadius: '12px', 
                  padding: '32px',
                  maxWidth: '800px',
                  width: '100%',
                  margin: 0
                }}
              >
                <h2 
                  className="page-title" 
                  style={{ 
                    marginBottom: 24, 
                    color: '#3b82f6', 
                    fontSize: '24px',
                    textAlign: 'center'
                  }}
                >
                  Check Certificate
                </h2>
                <form 
                  onSubmit={check} 
                  style={{ 
                    display: 'flex', 
                    gap: 16, 
                    marginBottom: 24 
                  }}
                >
                  <input 
                    className="input" 
                    placeholder="Enter Certificate ID" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                    style={{
                      flex: 1,
                      padding: '14px',
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '8px',
                      color: '#e2e8f0'
                    }}
                  />
                  <button 
                    type="submit"
                    className="btn btn-primary" 
                    disabled={loading}
                    style={{
                      padding: '14px 24px',
                      backgroundColor: loading ? '#64748b' : '#3b82f6',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s ease',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? 'Checking...' : 'Check'}
                  </button>
                </form>
                
                {result && (
                  <div 
                    style={{ 
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      borderRadius: '8px',
                      padding: '24px'
                    }}
                  >
                    {result.valid ? (
                      <p 
                        style={{ 
                          color: '#10b981', 
                          fontWeight: 600, 
                          marginBottom: 16,
                          textAlign: 'center'
                        }}
                      >
                        ✓ Certificate is Valid
                      </p>
                    ) : (
                      <p 
                        style={{ 
                          color: '#ef4444', 
                          fontWeight: 600, 
                          marginBottom: 16,
                          textAlign: 'center'
                        }}
                      >
                        ✗ {result.message || 'Invalid or Unverified Certificate'}
                      </p>
                    )}
                    
                    {result.certificate && (
                      <div 
                        style={{ 
                          display: 'grid', 
                          gridTemplateColumns: '1fr auto', 
                          gap: 16, 
                          alignItems: 'center' 
                        }}
                      >
                        <div 
                          style={{ 
                            display: 'grid', 
                            gap: 12,
                            color: '#e2e8f0'
                          }}
                        >
                          <div>
                            <strong style={{ color: '#94a3b8' }}>ID:</strong> {result.certificate.certificateId}
                          </div>
                          {result.certificate.studentId && (
                            <div>
                              <strong style={{ color: '#94a3b8' }}>Student ID:</strong> {result.certificate.studentId}
                            </div>
                          )}
                          <div>
                            <strong style={{ color: '#94a3b8' }}>Student:</strong> {result.certificate.studentName}
                          </div>
                          <div>
                            <strong style={{ color: '#94a3b8' }}>Type:</strong> {result.certificate.certificateType || result.certificate.title}
                          </div>
                          <div>
                            <strong style={{ color: '#94a3b8' }}>University:</strong> {result.certificate.universityName}
                          </div>
                          <div>
                            <strong style={{ color: '#94a3b8' }}>Date:</strong> {result.certificate.date}
                          </div>
                          {result.certificate.description && (
                            <div>
                              <strong style={{ color: '#94a3b8' }}>Description:</strong> {result.certificate.description}
                            </div>
                          )}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ 
                            backgroundColor: 'white', 
                            padding: '8px', 
                            borderRadius: '8px',
                            marginBottom: '8px'
                          }}>
                            <img 
                              src={result.certificate.qrCodeDataUrl} 
                              alt="QR Code" 
                              style={{ width: '80px', height: '80px' }}
                            />
                          </div>
                          <a 
                            href={`/verify/${result.certificate.certificateId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#3b82f6',
                              textDecoration: 'none',
                              fontSize: '12px'
                            }}
                          >
                            View Full Details
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </AnimateSection>
          )}

          {/* Removed extra tabs; single Check Certificate view only */}
        </div>
      </DashboardLayout>
    </div>
  );
}


