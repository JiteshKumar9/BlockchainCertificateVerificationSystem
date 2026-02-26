import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import AnimateSection from '../components/AnimateSection';
import QRCodeLink from '../components/QRCodeLink';

export default function CertificateVerification() {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/certificates/verify/${certificateId}`);
        setCertificate(res.data.certificate);
        setVerificationResult(res.data);
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to fetch certificate');
      } finally {
        setLoading(false);
      }
    };

    if (certificateId) {
      fetchCertificate();
    }
  }, [certificateId]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#e2e8f0', fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          color: '#ef4444', 
          fontSize: '18px',
          textAlign: 'center',
          padding: '32px'
        }}>
          <h2 style={{ marginBottom: '16px' }}>Certificate Not Found</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a',
      padding: '32px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        borderRadius: '16px',
        padding: '32px',
        border: '1px solid rgba(100, 116, 139, 0.3)'
      }}>
        <AnimateSection>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ 
              color: '#3b82f6', 
              fontSize: '32px',
              marginBottom: '8px'
            }}>
              Certificate Verification
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '16px' }}>
              Verify the authenticity of this certificate
            </p>
          </div>

          {/* Verification Status */}
          <div style={{ 
            marginBottom: '32px',
            padding: '20px',
            backgroundColor: verificationResult.isValid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${verificationResult.isValid ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '16px',
              color: verificationResult.isValid ? '#059669' : '#dc2626'
            }}>
              {verificationResult.isValid ? '✓' : '✗'}
            </div>
            <h2 style={{ 
              color: verificationResult.isValid ? '#059669' : '#dc2626',
              marginBottom: '8px'
            }}>
              {verificationResult.isValid ? 'Certificate Valid' : 'Certificate Invalid'}
            </h2>
            <p style={{ 
              color: verificationResult.isValid ? '#059669' : '#dc2626',
              margin: 0
            }}>
              {verificationResult.isValid 
                ? 'This certificate has not been tampered with and is authentic.'
                : 'This certificate may have been modified or is not authentic.'
              }
            </p>
          </div>

          {/* Certificate Details */}
          <div style={{ 
            backgroundColor: 'rgba(51, 65, 85, 0.5)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{ 
              color: '#e2e8f0', 
              fontSize: '20px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Certificate Information
            </h3>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              {/* Certificate ID */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ 
                  color: '#94a3b8', 
                  fontSize: '14px',
                  minWidth: '120px',
                  fontWeight: '500'
                }}>
                  Certificate ID:
                </span>
                <span style={{ 
                  color: '#e2e8f0', 
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  padding: '6px 10px',
                  borderRadius: '6px'
                }}>
                  {certificate.certificateId}
                </span>
              </div>

              {/* Student ID */}
              {certificate.studentId && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    color: '#94a3b8', 
                    fontSize: '14px',
                    minWidth: '120px',
                    fontWeight: '500'
                  }}>
                    Student ID:
                  </span>
                  <span style={{ 
                    color: '#e2e8f0', 
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    padding: '6px 10px',
                    borderRadius: '6px'
                  }}>
                    {certificate.studentId}
                  </span>
                </div>
              )}

              {/* Student Name */}
              {certificate.studentName && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    color: '#94a3b8', 
                    fontSize: '14px',
                    minWidth: '120px',
                    fontWeight: '500'
                  }}>
                    Student Name:
                  </span>
                  <span style={{ color: '#e2e8f0', fontSize: '14px' }}>
                    {certificate.studentName}
                  </span>
                </div>
              )}

              {/* Certificate Title */}
              {certificate.title && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    color: '#94a3b8', 
                    fontSize: '14px',
                    minWidth: '120px',
                    fontWeight: '500'
                  }}>
                    Title:
                  </span>
                  <span style={{ color: '#e2e8f0', fontSize: '14px' }}>
                    {certificate.title}
                  </span>
                </div>
              )}

              {/* Issue Date */}
              {certificate.issueDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    color: '#94a3b8', 
                    fontSize: '14px',
                    minWidth: '120px',
                    fontWeight: '500'
                  }}>
                    Issue Date:
                  </span>
                  <span style={{ color: '#e2e8f0', fontSize: '14px' }}>
                    {formatDate(certificate.issueDate)}
                  </span>
                </div>
              )}

              {/* Description */}
              {certificate.description && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ 
                    color: '#94a3b8', 
                    fontSize: '14px',
                    minWidth: '120px',
                    fontWeight: '500',
                    marginTop: '2px'
                  }}>
                    Description:
                  </span>
                  <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>
                    {certificate.description}
                  </span>
                </div>
              )}

              {/* University Name */}
              {certificate.universityName && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    color: '#94a3b8', 
                    fontSize: '14px',
                    minWidth: '120px',
                    fontWeight: '500'
                  }}>
                    University:
                  </span>
                  <span style={{ color: '#e2e8f0', fontSize: '14px' }}>
                    {certificate.universityName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Hash Verification Details */}
          <div style={{ 
            backgroundColor: 'rgba(51, 65, 85, 0.5)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{ 
              color: '#e2e8f0', 
              fontSize: '20px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Hash Verification
            </h3>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ 
                  color: '#94a3b8', 
                  fontSize: '14px',
                  minWidth: '120px',
                  fontWeight: '500'
                }}>
                  Stored Hash:
                </span>
                <span style={{ 
                  color: '#e2e8f0', 
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  backgroundColor: 'rgba(100, 116, 139, 0.2)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  wordBreak: 'break-all'
                }}>
                  {verificationResult.storedHash}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ 
                  color: '#94a3b8', 
                  fontSize: '14px',
                  minWidth: '120px',
                  fontWeight: '500'
                }}>
                  Current Hash:
                </span>
                <span style={{ 
                  color: '#e2e8f0', 
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  backgroundColor: 'rgba(100, 116, 139, 0.2)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  wordBreak: 'break-all'
                }}>
                  {verificationResult.currentHash}
                </span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              color: '#e2e8f0', 
              fontSize: '20px',
              marginBottom: '20px'
            }}>
              QR Code
            </h3>
            <div style={{ 
              display: 'inline-block',
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '12px'
            }}>
              <QRCodeLink certificateId={certificate.certificateId} size={120} />
            </div>
            <p style={{ 
              color: '#94a3b8', 
              fontSize: '14px',
              marginTop: '16px'
            }}>
              Scan this QR code to verify the certificate
            </p>
          </div>
        </AnimateSection>
      </div>
    </div>
  );
}
