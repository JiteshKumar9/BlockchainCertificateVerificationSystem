import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function PendingCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/student/certificates');
      const pendingCerts = Array.isArray(response.data?.pending) 
        ? response.data.pending 
        : [];
      setCertificates(pendingCerts);
    } catch (error) {
      console.error('Error fetching pending certificates:', error);
      setError(error.message || 'Failed to fetch pending certificates');
      toast.error('Failed to load pending certificates');
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRefresh = () => {
    fetchCertificates();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <AnimateSection>
          <div className="narrow card section">
            <div className="loading-spinner">Loading...</div>
          </div>
        </AnimateSection>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <AnimateSection>
        <div className="narrow card section" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="page-title" style={{ margin: 0 }}>Pending Certificates</h2>
            <button 
              onClick={handleRefresh}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: '#2563eb',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              <span>Refresh</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M22 12.5a10 10 0 0 0-17.8-6M2 11.5a10 10 0 0 0 17.8 6" />
              </svg>
            </button>
          </div>

          {error ? (
            <div className="alert alert-error">
              {error}
              <button 
                className="btn btn-sm btn-ghost" 
                onClick={handleRefresh}
                style={{ marginLeft: '12px' }}
              >
                Try Again
              </button>
            </div>
          ) : certificates.length === 0 ? (
            <div className="alert alert-info">
              No pending certificates found. Your submitted certificates will appear here while they're being reviewed.
            </div>
          ) : (
            <div className="certificate-grid">
              {certificates.map((cert) => (
                <div 
                  key={cert._id} 
                  className={`certificate-card ${expandedCard === cert._id ? 'expanded' : ''}`}
                  onClick={() => setExpandedCard(expandedCard === cert._id ? null : cert._id)}
                >
                  <div className="certificate-card-content">
                    <div className="certificate-card-header">
                      <h3 className="certificate-title">{cert.title || 'Untitled Certificate'}</h3>
                      <span className="certificate-status">
                        <span className="status-badge status-pending">Pending</span>
                      </span>
                    </div>
                    <div className="certificate-details">
                      <div className="detail-row">
                        <span className="detail-label">Submitted:</span>
                        <span className="detail-value">{formatDate(cert.createdAt)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value">{cert.certificateType || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">University:</span>
                        <span className="detail-value">{cert.universityName || 'N/A'}</span>
                      </div>
                    </div>
                    
                    {expandedCard === cert._id && (
                      <div className="expanded-details">
                        <div className="detail-section">
                          <div className="detail-grid">
                            <div className="detail-item">
                              <span className="detail-label">Status</span>
                              <span className="detail-value">Pending Review</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Submitted On</span>
                              <span className="detail-value">{formatDate(cert.createdAt)}</span>
                            </div>
                            {cert.description && (
                              <div className="detail-item full-width">
                                <span className="detail-label">Description</span>
                                <p className="detail-value">{cert.description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="expand-indicator">
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{
                          transform: expandedCard === cert._id ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimateSection>


      <style jsx>{`
        .certificate-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }
        
        .certificate-card {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 14px;
          padding: 16px 24px;
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        .certificate-card.expanded {
          background: rgba(30, 41, 59, 0.7);
          border-color: rgba(59, 130, 246, 0.4);
        }
        
        .certificate-card-content {
          width: 100%;
        }
        
        .certificate-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border-color: rgba(59, 130, 246, 0.4);
        }
        
        .certificate-card-header {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin-right: 24px;
        }
        
        .certificate-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #e2e8f0;
          margin: 0 0 8px 0;
          line-height: 1.4;
        }
        
        .certificate-status {
          margin-left: 12px;
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .status-pending {
          background-color: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
        }
        
        .certificate-details {
          display: flex;
          gap: 24px;
          margin: 8px 0;
        }
        
        .detail-row {
          display: flex;
          align-items: center;
          margin-right: 16px;
        }
        
        .detail-label {
          color: #94a3b8;
          font-size: 0.9375rem;
        }
        
        .detail-value {
          color: #e2e8f0;
          font-weight: 500;
          font-size: 0.9375rem;
          margin-left: 6px;
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          padding: 40px 0;
          color: #94a3b8;
        }
        
        .alert {
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .alert-error {
          background-color: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .alert-info {
          background-color: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }
        
        /* Expanded details styles */
        .expanded-details {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        .detail-section {
          margin-bottom: 12px;
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
          margin-top: 8px;
        }
        
        .detail-item {
          margin-bottom: 8px;
        }
        
        .detail-item.full-width {
          grid-column: 1 / -1;
        }
        
        .detail-item .detail-label {
          display: block;
          color: #94a3b8;
          font-size: 0.875rem;
          margin-bottom: 4px;
        }
        
        .detail-item .detail-value {
          color: #e2e8f0;
          font-size: 0.9375rem;
          margin: 0;
        }
        
        .expand-indicator {
          display: flex;
          justify-content: center;
          margin-top: 8px;
          color: #64748b;
        }
        
        @media (max-width: 768px) {
          .certificate-card {
            padding: 16px;
          }
          
          .certificate-details {
            flex-wrap: wrap;
            gap: 12px;
          }
          
          .detail-row {
            min-width: 45%;
            margin-right: 0;
          }
          
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
