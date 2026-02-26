import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimateSection from '../components/AnimateSection';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div 
      className="home-page"
      style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        flexDirection: 'column', 
        color: '#e2e8f0',
        overflowX: 'hidden'
      }}
    >
      <Navbar />
      
      {/* Hero Section */}
      <AnimateSection>
        <section 
          style={{ 
            // background: 'linear-gradient(135deg,rgb(65, 95, 191) 0%, #1A2A40 50%, #3B38A0 100%)',
            padding: '80px 20px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            
            zIndex: 1
          }} />
          
          {/* Floating Elements */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '100px',
            height: '100px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            zIndex: 1
          }} />
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '80px',
            height: '80px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse',
            zIndex: 1
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '60px',
            height: '60px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '50%',
            animation: 'float 7s ease-in-out infinite',
            zIndex: 1
          }} />
          
          {/* Additional Small Particles */}
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '25%',
            width: '20px',
            height: '20px',
            background: 'rgba(59, 130, 246, 0.15)',
            borderRadius: '50%',
            animation: 'float 5s ease-in-out infinite',
            zIndex: 1
          }} />
          <div style={{
            position: 'absolute',
            top: '70%',
            left: '5%',
            width: '15px',
            height: '15px',
            background: 'rgba(16, 185, 129, 0.15)',
            borderRadius: '50%',
            animation: 'float 9s ease-in-out infinite reverse',
            zIndex: 1
          }} />
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '5%',
            width: '25px',
            height: '25px',
            background: 'rgba(139, 92, 246, 0.15)',
            borderRadius: '50%',
            animation: 'float 6.5s ease-in-out infinite',
            zIndex: 1
          }} />
          
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
            {/* Main Title */}
            <h1 
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '800',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.2'
              }}
            >
              Blockchain Certificate Verification System
            </h1>
            
            {/* Subtitle */}
            <p 
              style={{ 
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                maxWidth: '800px',
                margin: '0 auto 40px',
                color: '#cbd5e1',
                lineHeight: '1.6',
                opacity: '0.9'
              }}
            >
              Securely issue, verify, and manage academic certificates with instant QR verification and blockchain-level security
            </p>
            
            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                to="/login" 
                style={{ 
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                  border: '2px solid #3b82f6'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
                }}
              >
                🚀 Get Started
              </Link>
              
              <Link 
                to="/help" 
                style={{ 
                  backgroundColor: 'transparent',
                  color: '#3b82f6',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  border: '2px solid #3b82f6'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#3b82f6';
                }}
              >
                📚 Learn More
              </Link>
            </div>
          </div>
        </section>
      </AnimateSection>

      {/* Main Content */}
      <main style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* How It Works Section */}
        <AnimateSection delay={0.1}>
          <section style={{ marginBottom: '60px' }}>
            <h2 
              style={{ 
                fontSize: '2.5rem',
                textAlign: 'center',
                marginBottom: '50px',
                color: '#e2e8f0',
                fontWeight: '700'
              }}
            >
              How It Works
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '30px' 
            }}>
              {[
                { icon: '🎓', title: 'University Issues', desc: 'Certificates with unique ID + QR code generation' },
                { icon: '📱', title: 'Verifier Scans QR', desc: 'Instant authenticity check and verification' },
                { icon: '🔒', title: 'Student Shares', desc: 'Secure and tamper-proof certificate sharing' },
                { icon: '✅', title: 'Result Shown', desc: 'Verified or Rejected immediately' }
              ].map((step, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.8)',
                    padding: '40px 30px',
                    borderRadius: '20px',
                    textAlign: 'center',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Step Number */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}>
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                    {step.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#3b82f6',
                    marginBottom: '15px'
                  }}>
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p style={{
                    color: '#cbd5e1',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </AnimateSection>

        {/* Features Section */}
        <AnimateSection delay={0.2}>
          <section style={{ marginBottom: '60px' }}>
            <h2 
              style={{ 
                fontSize: '2.5rem',
                textAlign: 'center',
                marginBottom: '50px',
                color: '#e2e8f0',
                fontWeight: '700'
              }}
            >
              Key Features
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '30px' 
            }}>
                            {[
                { 
                  icon: '👥', 
                  title: 'Role-based Dashboards', 
                  desc: 'Tailored interfaces for Students, Universities, and Verifiers with specific functionality for each role.',
                  color: '#3b82f6'
                },
                { 
                  icon: '📱', 
                  title: 'Instant QR Verification', 
                  desc: 'Scan-to-verify system with public certificate verification page for instant authenticity checks.',
                  color: '#10b981'
                },
                { 
                  icon: '🔐', 
                  title: 'Secure Storage', 
                  desc: 'JWT authentication, encrypted data storage, and blockchain-level security for certificate integrity.',
                  color: '#f59e0b'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.8)',
                    padding: '30px',
                    borderRadius: '16px',
                    border: `1px solid ${feature.color}20`,
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = `${feature.color}40`;
                    e.currentTarget.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = `${feature.color}20`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Icon */}
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    {feature.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: feature.color,
                    marginBottom: '15px',
                    textAlign: 'center'
                  }}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p style={{
                    color: '#cbd5e1',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    textAlign: 'center'
                  }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </AnimateSection>

        {/* About Section */}
        <AnimateSection delay={0.3}>
          <section style={{ marginBottom: '60px' }}>
            <div style={{
              // background: 'linear-gradient(135deg, #1A2A40 0%, #3B38A0 100%)',
              padding: '50px',
              borderRadius: '20px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 90% 10%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
                `,
                zIndex: 1
              }} />
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 
                  style={{ 
                    fontSize: '2.5rem',
                    textAlign: 'center',
                    marginBottom: '40px',
                    color: '#3b82f6',
                    fontWeight: '700'
                  }}
                >
                  About the System
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '40px' 
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: '#10b981',
                      marginBottom: '20px',
                      fontWeight: '600'
                    }}>
                      🎯 The Problem
                    </h3>
                    <p style={{
                      color: '#cbd5e1',
                      lineHeight: '1.7',
                      fontSize: '1rem'
                    }}>
                      Traditional certificate verification is slow, manual, and prone to fraud. 
                      Fake certificates and manual verification processes slow down institutions 
                      and employers, leading to delays and potential security risks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: '#3b82f6',
                      marginBottom: '20px',
                      fontWeight: '600'
                    }}>
                      💡 The Solution
                    </h3>
                    <p style={{
                      color: '#cbd5e1',
                      lineHeight: '1.7',
                      fontSize: '1rem'
                    }}>
                      A blockchain-inspired platform that issues certificates with unique IDs 
                      and QR codes. Verifiers can instantly check authenticity by scanning 
                      QR codes or entering certificate IDs, eliminating manual verification.
                    </p>
                  </div>
                  
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: '#f59e0b',
                      marginBottom: '20px',
                      fontWeight: '600'
                    }}>
                      🚀 The Benefits
                    </h3>
                    <p style={{
                      color: '#cbd5e1',
                      lineHeight: '1.7',
                      fontSize: '1rem'
                    }}>
                      Faster onboarding, fewer disputes, tamper-evident audit trails, 
                      and instant verification. The system integrates modern UI, 
                      secure authentication, and public verification capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimateSection>

        {/* Target Users Section */}
        <AnimateSection delay={0.4}>
          <section style={{ marginBottom: '60px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              padding: '50px',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <h2 
                style={{ 
                  fontSize: '2.5rem',
                  marginBottom: '30px',
                  color: '#e2e8f0',
                  fontWeight: '700'
                }}
              >
                Who Uses It?
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '30px',
                marginTop: '40px'
              }}>
                {[
                  { icon: '🏛️', title: 'Universities', desc: 'Issue and manage academic certificates' },
                  { icon: '🎓', title: 'Training Institutes', desc: 'Verify course completion certificates' },
                  { icon: '💼', title: 'HR Teams', desc: 'Eliminate manual verification processes' },
                  { icon: '🔍', title: 'Verifiers', desc: 'Instant certificate authenticity checks' }
                ].map((user, index) => (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      padding: '30px 20px',
                      borderRadius: '16px',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                      {user.icon}
                    </div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: '#3b82f6',
                      marginBottom: '10px',
                      fontWeight: '600'
                    }}>
                      {user.title}
                    </h3>
                    <p style={{
                      color: '#cbd5e1',
                      fontSize: '0.9rem',
                      lineHeight: '1.5'
                    }}>
                      {user.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateSection>

        {/* CTA Section */}
        <AnimateSection delay={0.5}>
          <section style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '20px',
              color: '#e2e8f0',
              fontWeight: '700'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#cbd5e1',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Join thousands of institutions already using our secure certificate verification system
            </p>
            <Link 
              to="/register" 
              style={{ 
                backgroundColor: '#10b981',
                color: 'white',
                padding: '18px 40px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                border: '2px solid #10b981',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
              }}
            >
              🚀 Start Free Trial
            </Link>
          </section>
        </AnimateSection>

        {/* Visual Separator */}
        <div style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0'
        }}>
          <div style={{
            width: '100px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)',
            borderRadius: '2px'
          }} />
        </div>

        {/* Statistics Section */}
        <AnimateSection delay={0.6}>
          <section style={{ marginBottom: '60px', marginTop: '20px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #0A1128 0%, #1A2A40 50%, #3B38A0 100%)',
              padding: '50px',
              borderRadius: '20px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
                `,
                zIndex: 1
              }} />
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{
                  fontSize: '2.5rem',
                  textAlign: 'center',
                  marginBottom: '50px',
                  color: '#e2e8f0',
                  fontWeight: '700'
                }}>
                  Why Choose Our System?
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '30px'
                }}>
                  {[
                    { icon: '⚡', number: '99.9%', label: 'Uptime', desc: 'Reliable service availability' },
                    { icon: '🔒', number: '256-bit', label: 'Encryption', desc: 'Military-grade security' },
                    { icon: '📱', number: '< 2s', label: 'Verification', desc: 'Instant QR code scanning' },
                    { icon: '🌍', number: '24/7', label: 'Support', desc: 'Round-the-clock assistance' }
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      style={{
                        backgroundColor: 'rgba(51, 65, 85, 0.5)',
                        padding: '30px 20px',
                        borderRadius: '16px',
                        textAlign: 'center',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                        {stat.icon}
                      </div>
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#3b82f6',
                        marginBottom: '5px'
                      }}>
                        {stat.number}
                      </div>
                      <div style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#e2e8f0',
                        marginBottom: '10px'
                      }}>
                        {stat.label}
                      </div>
                      <div style={{
                        color: '#cbd5e1',
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                      }}>
                        {stat.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimateSection>
      </main>
      
      <Footer />
    </div>
  );
}