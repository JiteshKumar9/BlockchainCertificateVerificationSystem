import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function StudentDashboard() {
  const [form, setForm] = useState({ name: '', universityName: '', date: '', title: '', file: null });
  const [certs, setCerts] = useState([]);
  const [pending, setPending] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const upload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try {
      await api.post('/student/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Document uploaded (Pending verification)');
      setForm({ name: '', universityName: '', date: '', title: '', file: null });
      fetchData();
    } catch (e) {
      toast.error('Upload failed');
    }
  };

  const fetchData = async () => {
    try {
      const [certRes, profileRes] = await Promise.all([
        api.get('/student/certificates'),
        api.get('/student/profile')
      ]);
      setCerts(certRes.data.verified || []);
      setPending(certRes.data.pending || []);
      setStudentProfile(profileRes.data);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => { fetchData(); }, []);



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
        <div 
          className="two-col" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'minmax(500px, 1fr) minmax(400px, 0.8fr)', 
            gap: '32px', 
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '32px',
            backgroundColor: '#0f172a',
            borderRadius: '30px'
          }}
        >
          <AnimateSection>
          <form 
            onSubmit={upload} 
            className="card section" 
            style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.7)', 
              borderRadius: '12px', 
              padding: '32px',
              height: 'fit-content'
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
              Upload Document
            </h2>
            
            {/* Student ID Display */}
            {studentProfile && studentProfile.studentId && (
              <div style={{ 
                marginBottom: 20, 
                padding: '12px 16px', 
                backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, color: '#3b82f6', fontWeight: 600 }}>
                  Student ID: {studentProfile.studentId}
                </p>
              </div>
            )}
            
            <div style={{ display: 'grid', gap: 20 }}>
              <div>
                <label 
                  className="muted" 
                  style={{ 
                    display: 'block', 
                    marginBottom: 10, 
                    color: '#cbd5e1' 
                  }}
                >
                  Your Name
                </label>
                <input 
                  className="input" 
                  name="name" 
                  placeholder="Enter your name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '14px',
                    margin: '0 -5px 0',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
              </div>
              <div>
                <label 
                  className="muted" 
                  style={{ 
                    display: 'block', 
                    marginBottom: 10, 
                    color: '#cbd5e1' 
                  }}
                >
                  University Name
                </label>
                <input 
                  className="input" 
                  name="universityName" 
                  placeholder="Enter university name" 
                  value={form.universityName} 
                  onChange={handleChange} 
                  required 
                  style={{
                    width: '100%',
                    margin: '0 -5px 0',
                    padding: '14px',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
              </div>
              <div>
                <label 
                  className="muted" 
                  style={{ 
                    display: 'block', 
                    marginBottom: 10, 
                    color: '#cbd5e1' 
                  }}
                >
                  Title
                </label>
                <input 
                  className="input" 
                  name="title" 
                  placeholder="Enter title" 
                  value={form.title} 
                  onChange={handleChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '14px',
                    margin: '0 -5px 0',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
              </div>
              <div>
                <label 
                  className="muted" 
                  style={{ 
                    display: 'block', 
                    marginBottom: 10, 
                    color: '#cbd5e1' 
                  }}
                >
                  Date
                </label>
                <input 
                  className="input" 
                  name="date" 
                  type="date" 
                  value={form.date} 
                  onChange={handleChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '14px',
                    margin: '0 -5px 0',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
              </div>
              <div>
                <label 
                  className="muted" 
                  style={{ 
                    display: 'block', 
                    marginBottom: 10, 
                    color: '#cbd5e1' 
                  }}
                >
                  File
                </label>
                <input 
                  className="input" 
                  name="file" 
                  type="file" 
                  onChange={handleChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '14px',
                    margin: '0 -5px 0',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
              </div>
              <button 
                type="submit"
                className="btn btn-primary" 
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#3b82f6',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Upload
              </button>
            </div>
          </form>
          </AnimateSection>

                    <AnimateSection delay={0.1}>
          <div 
            className="card section" 
            style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.7)', 
              borderRadius: '12px', 
              padding: '32px',
              height: 'fit-content',
              textAlign: 'center'
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
              My Certificates
            </h2>
            
            {/* Student ID Display */}
            {studentProfile && studentProfile.studentId && (
              <div style={{ 
                marginBottom: 24, 
                padding: '12px 16px', 
                backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, color: '#3b82f6', fontSize: '16px', fontWeight: 600 }}>
                  Student ID: {studentProfile.studentId}
                </p>
              </div>
            )}
            
            <p style={{ 
              color: '#cbd5e1', 
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              View all your certificates, check their verification status, and access detailed information
            </p>
            
            <Link 
              to="/student/certificates" 
              style={{ 
                backgroundColor: '#10b981',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                border: '2px solid #10b981',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
              }}
            >
              📜 View All Certificates
            </Link>
            
            {/* Quick Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '16px', 
              marginTop: '32px' 
            }}>
              <div style={{
                backgroundColor: 'rgba(51, 65, 85, 0.5)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(100, 116, 139, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
                <div style={{ color: '#e2e8f0', fontWeight: '600' }}>{certs.length}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>Verified</div>
              </div>
              <div style={{
                backgroundColor: 'rgba(51, 65, 85, 0.5)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(100, 116, 139, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
                <div style={{ color: '#e2e8f0', fontWeight: '600' }}>{pending.length}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>Pending</div>
              </div>
              <div style={{
                backgroundColor: 'rgba(51, 65, 85, 0.5)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(100, 116, 139, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
                <div style={{ color: '#e2e8f0', fontWeight: '600' }}>{certs.length + pending.length}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>Total</div>
              </div>
            </div>
          </div>
          </AnimateSection>
        </div>
      </DashboardLayout>
    </div>
  );
}


