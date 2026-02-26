import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { generateCertificatePDF } from '../utils/certificatePdf';

export default function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // PDF appearance settings (persisted to localStorage)
  const [pdfSettings, setPdfSettings] = useState({
    backgroundImageUrl: '/certificate-bg.png',
    backgroundOpacity: 0.38,
    gradientOpacity: 0.45,
    veilOpacity: 0.04,
    gradientEnabled: true,
  });

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);
      // Use the same endpoint as the dashboard summary for consistency
      const response = await api.get('/student/certificates');
      const list = Array.isArray(response.data?.verified)
        ? response.data.verified
        : Array.isArray(response.data)
          ? response.data
          : [];
      setCertificates(list);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setError(error.message || 'Failed to fetch certificates');
      toast.error('Failed to fetch certificates');
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  const resetToOrgDefaults = async () => {
    try {
      localStorage.removeItem('pdfSettings');
      const res = await api.get('/settings/pdf-defaults');
      const org = res.data || {};
      setPdfSettings((prev) => ({ ...prev, ...org }));
      toast.success('Reset to organization defaults');
    } catch (e) {
      toast.error('Failed to reset to org defaults');
    }
  };

  // Load PDF settings from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('pdfSettings');
      if (raw) {
        const parsed = JSON.parse(raw);
        setPdfSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  // Fetch org-wide defaults and apply if no local overrides
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/settings/pdf-defaults');
        const org = res.data || {};
        const hasLocal = !!localStorage.getItem('pdfSettings');
        if (!hasLocal) {
          setPdfSettings((prev) => ({ ...prev, ...org }));
        }
      } catch {}
    })();
  }, []);

  // Persist PDF settings
  useEffect(() => {
    try {
      localStorage.setItem('pdfSettings', JSON.stringify(pdfSettings));
    } catch {}
  }, [pdfSettings]);

  // Download a specific certificate (used by per-card button)
  const handleDownloadFor = async (certificate) => {
    if (!certificate) return;
    try {
      const courseName = certificate.title || certificate.certificateType || 'Course';
      const certificateId = certificate.certificateId || certificate._id || 'CERT-UNKNOWN';
      const issueDate = certificate.issueDate
        ? new Date(certificate.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date().toLocaleDateString('en-US');
      const universityName = certificate.universityName || certificate.institutionName || '';
      const verificationUrl = `${window.location.origin}/verify/${certificateId}`;
      const qrDataUrl = certificate.qrCodeDataUrl;
      const logoUrl = '/vite.svg';
      const signatureImageUrl = '/signature.png';
      const { backgroundImageUrl, backgroundOpacity, gradientOpacity, veilOpacity, gradientEnabled } = pdfSettings;

      await generateCertificatePDF({
        studentName: userName || 'Student',
        courseName,
        issueDate,
        certificateId,
        universityName,
        verificationUrl,
        qrDataUrl,
        logoUrl,
        signatureText: 'Authorized Signatory',
        signatureImageUrl,
        backgroundImageUrl,
        backgroundOpacity,
        gradientOpacity,
        veilOpacity,
        gradientEnabled
      });
      toast.success('Certificate downloaded');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate certificate');
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Fetch logged-in user to get student name for PDF
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/profile/get');
        setUserName(res.data?.name || 'Student');
        setUserRole(res.data?.role || '');
      } catch (e) {
        setUserName('Student');
      }
    })();
  }, []);

  // Presets
  const applyPreset = (type) => {
    const presets = {
      Vibrant: {
        backgroundOpacity: 0.45,
        gradientOpacity: 0.55,
        veilOpacity: 0.03,
        gradientEnabled: true,
      },
      Soft: {
        backgroundOpacity: 0.32,
        gradientOpacity: 0.35,
        veilOpacity: 0.05,
        gradientEnabled: true,
      },
      Minimal: {
        backgroundOpacity: 0.28,
        gradientOpacity: 0.0,
        veilOpacity: 0.06,
        gradientEnabled: false,
      },
    };
    const preset = presets[type];
    if (preset) setPdfSettings((s) => ({ ...s, ...preset }));
  };

  const saveOrgDefaults = async () => {
    try {
      const payload = {
        backgroundImageUrl: pdfSettings.backgroundImageUrl,
        backgroundOpacity: pdfSettings.backgroundOpacity,
        gradientOpacity: pdfSettings.gradientOpacity,
        veilOpacity: pdfSettings.veilOpacity,
        gradientEnabled: pdfSettings.gradientEnabled,
      };
      const res = await api.post('/settings/pdf-defaults', payload);
      toast.success('Organization defaults saved');
    } catch (e) {
      toast.error('Failed to save org defaults');
    }
  };

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
  };

  const handleDownload = async () => {
    if (!selectedCertificate) return;
    try {
      const courseName = selectedCertificate.title || selectedCertificate.certificateType || 'Course';
      const certificateId = selectedCertificate.certificateId || selectedCertificate._id || 'CERT-UNKNOWN';
      const issueDate = selectedCertificate.issueDate ? new Date(selectedCertificate.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US');
      // Use the institution/university name exactly from the entity
      const universityName = selectedCertificate.universityName || selectedCertificate.institutionName || '';
      const verificationUrl = `${window.location.origin}/verify/${certificateId}`;
      const qrDataUrl = selectedCertificate.qrCodeDataUrl; // optional; util can generate if missing
      const logoUrl = '/vite.svg';
      const { backgroundImageUrl, backgroundOpacity, gradientOpacity, veilOpacity, gradientEnabled } = pdfSettings;

      await generateCertificatePDF({
        studentName: userName || 'Student',
        courseName,
        issueDate,
        certificateId,
        universityName,
        verificationUrl,
        qrDataUrl,
        logoUrl,
        signatureText: 'Authorized Signatory',
        backgroundImageUrl,
        backgroundOpacity,
        gradientOpacity,
        veilOpacity,
        gradientEnabled
      });
      toast.success('Certificate downloaded');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate certificate');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669', border: 'rgba(16, 185, 129, 0.3)' };
      case 'rejected':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: 'rgba(239, 68, 68, 0.3)' };
      case 'pending':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: '#d97706', border: 'rgba(245, 158, 11, 0.3)' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b', border: 'rgba(100, 116, 139, 0.3)' };
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return '✅';
      case 'rejected':
        return '❌';
      case 'pending':
        return '⏳';
      default:
        return '❓';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a' }}>
      <DashboardLayout>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '32px 20px' 
        }}>
          <AnimateSection>
            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.8)', 
              borderRadius: '20px', 
              padding: '40px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  color: '#e2e8f0', 
                  marginBottom: '16px',
                  fontWeight: '700'
                }}>
                  My Certificates
                </h1>
                <p style={{ 
                  color: '#cbd5e1', 
                  fontSize: '1.1rem',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  View and manage all your academic certificates in one place
                </p>

                {/* PDF Appearance Settings Toggle */}
                <div style={{ marginTop: '20px' }}>
                  <button
                    onClick={() => setShowSettings((v) => !v)}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#0ea5e9',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '700'
                    }}
                  >
                    {showSettings ? 'Hide PDF Appearance' : 'Show PDF Appearance'}
                  </button>
                </div>

                {showSettings && (
                  <div style={{
                    marginTop: '16px',
                    textAlign: 'left',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    {/* Preset Buttons */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <button onClick={() => applyPreset('Vibrant')} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.4)', background: 'rgba(59,130,246,0.15)', color: '#e2e8f0', cursor: 'pointer' }}>Vibrant</button>
                      <button onClick={() => applyPreset('Soft')} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(148,163,184,0.3)', background: 'rgba(148,163,184,0.15)', color: '#e2e8f0', cursor: 'pointer' }}>Soft</button>
                      <button onClick={() => applyPreset('Minimal')} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(15,23,42,0.4)', color: '#e2e8f0', cursor: 'pointer' }}>Minimal</button>
                      <button onClick={resetToOrgDefaults} title="Reset to organization defaults" style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(148,163,184,0.25)', background: 'rgba(2,6,23,0.35)', color: '#e2e8f0', cursor: 'pointer' }}>Reset to Org Defaults</button>
                      {userRole === 'university' && (
                        <button onClick={saveOrgDefaults} style={{ marginLeft: 'auto', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.15)', color: '#bbf7d0', cursor: 'pointer', fontWeight: '700' }}>Save as Org Default</button>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ color: '#cbd5e1', fontSize: '14px' }}>Background Image</label>
                        <select
                          value={pdfSettings.backgroundImageUrl}
                          onChange={(e) => setPdfSettings((s) => ({ ...s, backgroundImageUrl: e.target.value }))}
                          style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid rgba(148,163,184,0.3)', marginTop: '6px' }}
                        >
                          <option value="/certificate-bg.png">Colorful Waves (default)</option>
                          <option value="/background.png">Abstract Pattern</option>
                          <option value="custom">Custom URL (set below)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ color: '#cbd5e1', fontSize: '14px' }}>Custom Background URL</label>
                        <input
                          type="text"
                          placeholder="https://... or /path.png"
                          value={pdfSettings.backgroundImageUrl.startsWith('http') || pdfSettings.backgroundImageUrl.startsWith('/') ? pdfSettings.backgroundImageUrl : ''}
                          onChange={(e) => setPdfSettings((s) => ({ ...s, backgroundImageUrl: e.target.value }))}
                          style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid rgba(148,163,184,0.3)', marginTop: '6px' }}
                        />
                      </div>

                      <div>
                        <label style={{ color: '#cbd5e1', fontSize: '14px' }}>Background Opacity: {pdfSettings.backgroundOpacity.toFixed(2)}</label>
                        <input type="range" min="0" max="1" step="0.01"
                          value={pdfSettings.backgroundOpacity}
                          onChange={(e) => setPdfSettings((s) => ({ ...s, backgroundOpacity: parseFloat(e.target.value) }))}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#cbd5e1', fontSize: '14px' }}>Gradient Opacity: {pdfSettings.gradientOpacity.toFixed(2)}</label>
                        <input type="range" min="0" max="1" step="0.01"
                          value={pdfSettings.gradientOpacity}
                          onChange={(e) => setPdfSettings((s) => ({ ...s, gradientOpacity: parseFloat(e.target.value) }))}
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ color: '#cbd5e1', fontSize: '14px' }}>White Veil Opacity: {pdfSettings.veilOpacity.toFixed(2)}</label>
                        <input type="range" min="0" max="0.2" step="0.01"
                          value={pdfSettings.veilOpacity}
                          onChange={(e) => setPdfSettings((s) => ({ ...s, veilOpacity: parseFloat(e.target.value) }))}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'end' }}>
                        <label style={{ color: '#cbd5e1', fontSize: '14px' }}>
                          <input
                            type="checkbox"
                            checked={pdfSettings.gradientEnabled}
                            onChange={(e) => setPdfSettings((s) => ({ ...s, gradientEnabled: e.target.checked }))}
                            style={{ marginRight: '8px' }}
                          />
                          Enable Color Gradient Overlay
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
                  <p style={{ color: '#cbd5e1' }}>Loading certificates...</p>
                </div>
              ) : error ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '16px',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>❌</div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '8px' }}>Error Loading Certificates</h3>
                  <p style={{ color: '#94a3b8', margin: 0 }}>{error}</p>
                  <button 
                    onClick={fetchCertificates}
                    style={{
                      marginTop: '16px',
                      padding: '12px 24px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Try Again
                  </button>
                </div>
              ) : certificates.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  backgroundColor: 'rgba(51, 65, 85, 0.3)',
                  borderRadius: '16px',
                  border: '1px solid rgba(100, 116, 139, 0.2)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📜</div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '8px' }}>No Certificates Yet</h3>
                  <p style={{ color: '#94a3b8', margin: 0 }}>
                    Upload documents to get started with certificate verification
                  </p>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gap: '24px',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
                }}>
                  {certificates.map((cert, index) => (
                    <div key={cert._id || index} style={{
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid rgba(100, 116, 139, 0.2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onClick={() => handleCertificateClick(cert)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.7)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.5)';
                      e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      {/* Status Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        ...getStatusColor(cert.status),
                        border: `1px solid ${getStatusColor(cert.status).border}`,
                        fontWeight: '600',
                        fontSize: '12px'
                      }}>
                        {getStatusIcon(cert.status)} {cert.status || 'Unknown'}
                      </div>

                      {/* Certificate Content */}
                      <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ 
                          margin: '0 0 16px 0', 
                          color: '#e2e8f0', 
                          fontSize: '20px',
                          fontWeight: '600',
                          lineHeight: '1.3'
                        }}>
                          {cert.title || cert.certificateType || 'Certificate'}
                        </h3>
                        
                        <div style={{ display: 'grid', gap: '12px' }}>
                          {cert.certificateId && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#94a3b8', fontSize: '14px', minWidth: '80px' }}>
                                Certificate ID:
                              </span>
                              <span style={{ 
                                color: '#cbd5e1', 
                                fontSize: '14px',
                                fontFamily: 'monospace',
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                padding: '4px 8px',
                                borderRadius: '6px'
                              }}>
                                {cert.certificateId}
                              </span>
                            </div>
                          )}
                          
                          {cert.studentId && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#94a3b8', fontSize: '14px', minWidth: '80px' }}>
                                Student ID:
                              </span>
                              <span style={{ 
                                color: '#cbd5e1', 
                                fontSize: '14px',
                                fontFamily: 'monospace',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                padding: '4px 8px',
                                borderRadius: '6px'
                              }}>
                                {cert.studentId}
                              </span>
                            </div>
                          )}
                          
                          {cert.status && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#94a3b8', fontSize: '14px', minWidth: '80px' }}>
                                Status:
                              </span>
                              <span style={{
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '600',
                                backgroundColor: cert.status === 'Verified' ? 'rgba(16, 185, 129, 0.1)' : 
                                                 cert.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : 
                                                 'rgba(245, 158, 11, 0.1)',
                                color: cert.status === 'Verified' ? '#059669' : 
                                       cert.status === 'Rejected' ? '#dc2626' : '#d97706',
                                border: `1px solid ${cert.status === 'Verified' ? 'rgba(16, 185, 129, 0.3)' : 
                                                 cert.status === 'Rejected' ? 'rgba(239, 68, 68, 0.3)' : 
                                                 'rgba(245, 158, 11, 0.3)'}`
                              }}>
                                {cert.status}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Click to View More */}
                      <div style={{
                        textAlign: 'center',
                        padding: '12px',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        color: '#3b82f6',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Click to view full details →
                      </div>

                      {/* Per-card Download Button */}
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDownloadFor(cert); }}
                          style={{
                            padding: '10px 16px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '700',
                            boxShadow: '0 6px 16px rgba(59,130,246,0.25)'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#3b82f6'; }}
                        >
                          ⬇️ Download Certificate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              

              {/* Note: Download action is available inside the details modal */}
            </div>
          </AnimateSection>
        </div>

        {/* Certificate Detail Modal */}
        {showModal && selectedCertificate && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={closeModal}
          >
            <div style={{
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.target.style.color = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#94a3b8';
                }}
              >
                ✕
              </button>

              {/* Certificate Details Header */}
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  color: '#e2e8f0', 
                  marginBottom: '16px',
                  fontWeight: '700'
                }}>
                  Certificate Details
                </h2>
                <p style={{ color: '#94a3b8', marginTop: 0 }}>Logged in as: {userName || 'Student'}</p>
                
                {/* Status Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  ...getStatusColor(selectedCertificate.status),
                  border: `2px solid ${getStatusColor(selectedCertificate.status).border}`,
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  {getStatusIcon(selectedCertificate.status)} {selectedCertificate.status || 'Unknown'}
                </div>
              </div>

              {/* Certificate Information */}
              <div style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
                {[
                  { label: 'Title', value: selectedCertificate.title || selectedCertificate.certificateType || 'N/A' },
                  { label: 'Certificate ID', value: selectedCertificate.certificateId || 'N/A' },
                  { label: 'Student ID', value: selectedCertificate.studentId || 'N/A' },
                  { label: 'University', value: selectedCertificate.universityName || 'N/A' },
                  { label: 'Issue Date', value: selectedCertificate.issueDate ? new Date(selectedCertificate.issueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A' },
                  { label: 'Description', value: selectedCertificate.description || 'No description available' }
                ].map((item, index) => (
                  <div key={index}>
                    <label style={{ 
                      display: 'block', 
                      color: '#94a3b8', 
                      fontSize: '14px', 
                      marginBottom: '8px',
                      fontWeight: '600'
                    }}>
                      {item.label}
                    </label>
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      borderRadius: '12px',
                      color: '#e2e8f0',
                      fontSize: '16px',
                      lineHeight: '1.5',
                      border: '1px solid rgba(100, 116, 139, 0.2)'
                    }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Single Download Button for the entire certificate */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', marginBottom: '24px' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDownloadFor(selectedCertificate); }}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    boxShadow: '0 6px 16px rgba(59,130,246,0.3)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#3b82f6'; }}
                >
                  ⬇️ Download Certificate
                </button>
              </div>

              {/* QR Code Section */}
              {selectedCertificate.qrCodeDataUrl && (
                <div style={{ textAlign: 'center' }}>
                  <label style={{ 
                    display: 'block', 
                    color: '#94a3b8', 
                    fontSize: '16px', 
                    marginBottom: '16px',
                    fontWeight: '600'
                  }}>
                    QR Code
                  </label>
                  <div style={{
                    display: 'inline-block',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: '3px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                  }}>
                    <img 
                      src={selectedCertificate.qrCodeDataUrl} 
                      alt="Certificate QR Code"
                      style={{
                        width: '150px',
                        height: '150px',
                        display: 'block'
                      }}
                    />
                  </div>
                  <p style={{ 
                    color: '#94a3b8', 
                    fontSize: '14px', 
                    marginTop: '12px',
                    fontStyle: 'italic'
                  }}>
                    Scan this QR code to verify certificate authenticity
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </DashboardLayout>
    </div>
  );
}
