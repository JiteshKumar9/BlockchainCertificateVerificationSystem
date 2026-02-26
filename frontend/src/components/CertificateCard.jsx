import React from 'react';
import QRCodeLink from './QRCodeLink';

const CertificateCard = ({ certificate, onClick }) => {
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
    <div 
      onClick={onClick}
      style={{ 
        backgroundColor: 'rgba(51, 65, 85, 0.5)',
        padding: '20px',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(100, 116, 139, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '16px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.7)';
        e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.5)';
        e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.2)';
      }}
    >
      <div style={{ flex: 1 }}>
        {/* Certificate Title */}
        <h3 style={{ 
          margin: '0 0 12px 0', 
          color: '#e2e8f0', 
          fontSize: '18px',
          fontWeight: '600'
        }}>
          {certificate.title || certificate.certificateType || 'Certificate'}
        </h3>
        
        {/* Certificate Details Grid */}
        <div style={{ 
          display: 'grid', 
          gap: '8px',
          marginBottom: '12px'
        }}>
          {/* Certificate ID */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              color: '#94a3b8', 
              fontSize: '13px',
              minWidth: '80px'
            }}>
              ID:
            </span>
            <span style={{ 
              color: '#cbd5e1', 
              fontSize: '13px',
              fontFamily: 'monospace',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              {certificate.certificateId}
            </span>
          </div>
          
          {/* Student ID */}
          {certificate.studentId && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                color: '#94a3b8', 
                fontSize: '13px',
                minWidth: '80px'
              }}>
                Student:
              </span>
              <span style={{ 
                color: '#cbd5e1', 
                fontSize: '13px',
                fontFamily: 'monospace',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                {certificate.studentId}
              </span>
            </div>
          )}
          
          {/* Issue Date */}
          {certificate.issueDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                color: '#94a3b8', 
                fontSize: '13px',
                minWidth: '80px'
              }}>
                Issued:
              </span>
              <span style={{ 
                color: '#cbd5e1', 
                fontSize: '13px'
              }}>
                {formatDate(certificate.issueDate)}
              </span>
            </div>
          )}
          
          {/* Description */}
          {certificate.description && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ 
                color: '#94a3b8', 
                fontSize: '13px',
                minWidth: '80px',
                marginTop: '2px'
              }}>
                Details:
              </span>
              <span style={{ 
                color: '#cbd5e1', 
                fontSize: '13px',
                lineHeight: '1.4'
              }}>
                {certificate.description}
              </span>
            </div>
          )}
        </div>
        
        {/* Status Badge */}
        <span style={{
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px', 
          padding: '6px 12px', 
          borderRadius: '999px',
          background: certificate.status === 'Verified' ? 'rgba(16,185,129,.12)' : 'rgba(239,68,68,.12)',
          color: certificate.status === 'Verified' ? '#059669' : '#dc2626', 
          fontWeight: '600', 
          fontSize: '12px',
          border: `1px solid ${certificate.status === 'Verified' ? 'rgba(16,185,129,.3)' : 'rgba(239,68,68,.3)'}`
        }}>
          {certificate.status === 'Verified' ? '✓ Verified' : '✗ Rejected'}
        </span>
      </div>
      
      {/* QR Code */}
      <div style={{ flexShrink: 0 }}>
        <QRCodeLink certificateId={certificate.certificateId} size={80} />
      </div>
    </div>
  );
};

export default CertificateCard;
