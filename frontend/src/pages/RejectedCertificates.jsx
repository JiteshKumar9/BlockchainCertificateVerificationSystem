import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function RejectedCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRejectedCertificates = async () => {
    try {
      setLoading(true);
      const res = await api.get('/university/rejected-certificates');
      setCertificates(res.data || []);
    } catch (error) {
      toast.error('Failed to fetch rejected certificates');
      console.error('Error fetching rejected certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRejectedCertificates();
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
                Rejected Certificates
              </h1>
              <p style={{ 
                color: '#94a3b8', 
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                History of all certificates that have been rejected by your university
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: '#dc2626', fontSize: '24px', margin: '0 0 8px 0' }}>
                    {certificates.length}
                  </h3>
                  <p style={{ color: '#ef4444', margin: 0 }}>Total Rejected</p>
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
                  <p style={{ color: '#94a3b8' }}>Loading rejected certificates...</p>
                </div>
              ) : certificates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: '#94a3b8' }}>No rejected certificates found</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {certificates.map((cert) => (
                    <div key={cert._id} style={{ 
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ color: '#e2e8f0', margin: 0, fontSize: '18px' }}>
                          {cert.title || cert.certificateName}
                        </h3>
                        <span style={{ 
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          color: '#ef4444',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          REJECTED
                        </span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 4px 0' }}>Student Name</p>
                          <p style={{ color: '#e2e8f0', margin: 0 }}>{cert.name}</p>
                        </div>
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 4px 0' }}>Rejection Date</p>
                          <p style={{ color: '#e2e8f0', margin: 0 }}>{formatDate(cert.updatedAt || cert.createdAt)}</p>
                        </div>
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 4px 0' }}>University</p>
                          <p style={{ color: '#e2e8f0', margin: 0 }}>{cert.universityName}</p>
                        </div>
                      </div>
                      
                      {cert.rejectionReason && (
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 4px 0' }}>Rejection Reason</p>
                          <p style={{ color: '#ef4444', margin: 0 }}>{cert.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimateSection>
        </div>
      </DashboardLayout>
    </div>
  );
}
