import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Help() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    {
      id: 'overview',
      title: 'System Overview',
      content: [
        'The Blockchain Certificate Verification System is an innovative platform designed to secure and streamline academic certificate management.',
        'Our system leverages blockchain technology to create tamper-proof, verifiable digital certificates for students, universities, and verifiers.'
      ]
    },
    {
      id: 'roles',
      title: 'User Roles',
      content: [
        {
          title: 'Student',
          description: 'Upload and manage your academic certificates. Share verified documents with employers or institutions.'
        },
        {
          title: 'University',
          description: 'Issue digital certificates, manage student records, and maintain a secure academic record system.'
        },
        {
          title: 'Verifier',
          description: 'Instantly verify the authenticity of certificates using unique QR codes and blockchain technology.'
        }
      ]
    },
    {
      id: 'features',
      title: 'Key Features',
      content: [
        'Blockchain-secured certificates',
        'Instant QR code verification',
        'Role-based access control',
        'Secure document storage',
        'Easy certificate sharing',
        'Tamper-evident audit trail'
      ]
    },
    {
      id: 'verification',
      title: 'Certificate Verification Process',
      content: [
        '1. University issues a digital certificate with a unique ID and QR code',
        '2. Certificate is recorded on the blockchain',
        '3. Student can share the certificate',
        '4. Verifier scans QR code to instantly check authenticity',
        '5. Verification result is displayed immediately'
      ]
    },
    {
      id: 'security',
      title: 'Security Measures',
      content: [
        'End-to-end encryption',
        'Blockchain immutability',
        'Multi-factor authentication',
        'Secure JWT-based user sessions',
        'Regular security audits'
      ]
    }
  ];

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        backgroundColor: '#0f172a', 
        color: '#e2e8f0',
        borderRadius: '30px'
      }}
    >
      <Navbar />
      <main 
        style={{ 
          flex: 1, 
          padding: '32px', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          width: '100%' 
        }}
      >
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '250px 1fr', 
            gap: '32px', 
            backgroundColor: 'rgba(30, 41, 59, 0.7)', 
            borderRadius: '12px', 
            overflow: 'hidden' 
          }}
        >
          {/* Sidebar */}
          <div 
            style={{ 
              backgroundColor: 'rgba(51, 65, 85, 0.5)', 
              padding: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
            }}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  backgroundColor: activeSection === section.id 
                    ? 'rgba(59, 130, 246, 0.2)' 
                    : 'transparent',
                  color: activeSection === section.id ? '#3b82f6' : '#94a3b8',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div style={{ padding: '32px' }}>
            <h1 
              style={{ 
                fontSize: '2rem', 
                marginBottom: '24px', 
                color: '#3b82f6' 
              }}
            >
              {sections.find(s => s.id === activeSection).title}
            </h1>
            
            {activeSection === 'roles' ? (
              <div style={{ display: 'grid', gap: '16px' }}>
                {sections.find(s => s.id === activeSection).content.map((role) => (
                  <div 
                    key={role.title}
                    style={{ 
                      backgroundColor: 'rgba(51, 65, 85, 0.5)', 
                      padding: '16px', 
                      borderRadius: '8px' 
                    }}
                  >
                    <h3 
                      style={{ 
                        color: '#3b82f6', 
                        marginBottom: '8px' 
                      }}
                    >
                      {role.title}
                    </h3>
                    <p style={{ color: '#cbd5e1' }}>{role.description}</p>
                  </div>
                ))}
              </div>
            ) : activeSection === 'features' || activeSection === 'security' ? (
              <ul style={{ 
                listStyleType: 'none', 
                padding: 0, 
                display: 'grid', 
                gap: '12px' 
              }}>
                {sections.find(s => s.id === activeSection).content.map((item) => (
                  <li 
                    key={item} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      color: '#cbd5e1'
                    }}
                  >
                    <span 
                      style={{ 
                        color: '#3b82f6', 
                        fontSize: '1.2rem' 
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {sections.find(s => s.id === activeSection).content.map((paragraph, index) => (
                  <p 
                    key={index} 
                    style={{ 
                      color: '#cbd5e1', 
                      lineHeight: 1.6 
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
                {activeSection === 'verification' && (
                  <div 
                    style={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                      padding: '16px', 
                      borderRadius: '8px', 
                      marginTop: '16px' 
                    }}
                  >
                    <h4 
                      style={{ 
                        color: '#3b82f6', 
                        marginBottom: '12px' 
                      }}
                    >
                      Quick Tip
                    </h4>
                    <p style={{ color: '#94a3b8' }}>
                      Always verify certificates using the official QR code to ensure authenticity.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
