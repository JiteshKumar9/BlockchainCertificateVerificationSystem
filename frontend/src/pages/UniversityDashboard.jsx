import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function UniversityDashboard() {
  const [pending, setPending] = useState([]);
  const [issueForm, setIssueForm] = useState({ 
    studentId: '', 
    certificateName: '', 
    issueDate: '', 
    description: '', 
    universityName: '' 
  });
  const [studentInfo, setStudentInfo] = useState(null);
  const [isValidatingStudent, setIsValidatingStudent] = useState(false);
  const [analytics, setAnalytics] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    issued: 0
  });

  const fetchPending = async () => {
    try {
      const res = await api.get('/university/pending');
      setPending(res.data || []);
    } catch (e) { /* ignore */ }
  };

  const fetchAnalytics = async () => {
    try {
      const [pendingRes, approvedRes, rejectedRes, issuedRes] = await Promise.all([
        api.get('/university/pending'),
        api.get('/university/approved-certificates'),
        api.get('/university/rejected-certificates'),
        api.get('/university/issued-certificates')
      ]);
      
      setAnalytics({
        pending: pendingRes.data?.length || 0,
        approved: approvedRes.data?.length || 0,
        rejected: rejectedRes.data?.length || 0,
        issued: issuedRes.data?.length || 0
      });
    } catch (e) { /* ignore */ }
  };

  useEffect(() => { 
    fetchPending(); 
    fetchAnalytics();
  }, []);

  const act = async (id, action) => {
    try {
      await api.post(`/university/verify/${id}`, { action });
      toast.success(action === 'verify' ? 'Verified' : 'Rejected');
      fetchPending();
      fetchAnalytics();
    } catch (e) {
      toast.error('Action failed');
    }
  };

  const change = (e) => setIssueForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Validate student ID when it changes
  const validateStudentId = async (studentId) => {
    if (!studentId || studentId.length < 3) {
      setStudentInfo(null);
      return;
    }

    setIsValidatingStudent(true);
    try {
      const res = await api.get(`/university/student/${studentId}`);
      setStudentInfo(res.data);
      toast.success(`Student found: ${res.data.name}`);
    } catch (e) {
      setStudentInfo(null);
      if (studentId.length >= 3) {
        toast.error('Student ID not found');
      }
    } finally {
      setIsValidatingStudent(false);
    }
  };

  const handleStudentIdChange = (e) => {
    const value = e.target.value;
    setIssueForm(prev => ({ ...prev, studentId: value }));
    validateStudentId(value);
  };

  const submitIssue = async (e) => {
    e.preventDefault();
    
    if (!studentInfo) {
      toast.error('Please enter a valid Student ID');
      return;
    }

    try {
      await api.post('/university/issue', issueForm);
      toast.success('Certificate issued successfully');
      setIssueForm({ studentId: '', certificateName: '', issueDate: '', description: '', universityName: '' });
      setStudentInfo(null);
      fetchAnalytics();
    } catch (e) { 
      toast.error(e.response?.data?.message || 'Issue failed'); 
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a' }}>
      <DashboardLayout>
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '24px' }}>
          {/* Header Section */}
          <AnimateSection>
            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.7)', 
              borderRadius: '20px', 
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h1 style={{ 
                color: '#3b82f6', 
                fontSize: '26px', 
                marginBottom: '6px',
                textAlign: 'center'
              }}>
                University Dashboard
              </h1>
              <p style={{ 
                color: '#94a3b8', 
                textAlign: 'center',
                marginBottom: '0'
              }}>
                Manage certificates and view analytics
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                <a href="/university/appearance" style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  background: 'rgba(59,130,246,0.12)'
                }}>Admin: PDF Appearance</a>
              </div>
            </div>
          </AnimateSection>

          {/* Analytics Section */}
          <AnimateSection delay={0.1}>
            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.7)', 
              borderRadius: '20px', 
              padding: '24px',
              marginBottom: '20px'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '16px'
              }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease'
                }}>
                  <h3 style={{ color: '#3b82f6', fontSize: '28px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                    {analytics.pending}
                  </h3>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Pending Documents</p>
                </div>
                
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease'
                }}>
                  <h3 style={{ color: '#10b981', fontSize: '28px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                    {analytics.approved}
                  </h3>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Approved Certificates</p>
                </div>
                
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease'
                }}>
                  <h3 style={{ color: '#ef4444', fontSize: '28px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                    {analytics.rejected}
                  </h3>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Rejected Certificates</p>
                </div>
                
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease'
                }}>
                  <h3 style={{ color: '#a855f7', fontSize: '28px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                    {analytics.issued}
                  </h3>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Issued Certificates</p>
                </div>
              </div>
            </div>
          </AnimateSection>

          {/* Pending Documents Section */}
          <AnimateSection delay={0.1}>
            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.7)', 
              borderRadius: '20px', 
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h2 style={{ 
                color: '#3b82f6', 
                fontSize: '22px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Pending Documents
              </h2>
              
              {pending.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: '#94a3b8' }}>No pending documents</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {pending.map((doc) => (
                    <div key={doc._id} style={{ 
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      borderRadius: '12px',
                      padding: '16px',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      <div style={{ marginBottom: '10px' }}>
                        <h3 style={{ color: '#e2e8f0', margin: '0 0 6px 0', fontSize: '14px' }}>
                          {doc.title}
                        </h3>
                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '12px' }}>
                          By: {doc.name} — {doc.universityName}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => act(doc._id, 'verify')}
                          style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                            flex: 1,
                            fontSize: '12px'
                          }}
                        >
                          ✓ Approve
                        </button>
                        <button 
                          onClick={() => act(doc._id, 'reject')}
                          style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                            flex: 1,
                            fontSize: '12px'
                          }}
                        >
                          ✗ Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimateSection>

          {/* Issue Certificate Section */}
          <AnimateSection delay={0.2}>
            <form onSubmit={submitIssue} style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.7)', 
              borderRadius: '20px', 
              padding: '48px'
            }}>
              <h2 style={{ 
                color: '#3b82f6', 
                fontSize: '22px',
                marginBottom: '40px',
                textAlign: 'center'
              }}>
                Issue Certificate
              </h2>
              
              <div style={{ display: 'grid', gap: '32px' }}>
                {/* Student ID Field */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '18px', 
                    color: '#cbd5e1',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}>
                    Student ID *
                  </label>
                  <input 
                    name="studentId" 
                    placeholder="Enter Student ID (e.g., STU1234567)" 
                    value={issueForm.studentId} 
                    onChange={handleStudentIdChange} 
                    required 
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '14px',
                      color: '#e2e8f0',
                      fontSize: '15px'
                    }}
                  />
                  {isValidatingStudent && (
                    <p style={{ marginTop: '8px', color: '#fbbf24', fontSize: '14px' }}>
                      Validating Student ID...
                    </p>
                  )}
                  {studentInfo && (
                    <div style={{ 
                      marginTop: '8px', 
                      padding: '12px', 
                      backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px'
                    }}>
                      <p style={{ color: '#10b981', fontSize: '14px', margin: 0 }}>
                        ✓ Student: {studentInfo.name} ({studentInfo.email})
                      </p>
                    </div>
                  )}
                </div>

                {/* Certificate Name Field */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '18px', 
                    color: '#cbd5e1',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}>
                    Certificate Name *
                  </label>
                  <input 
                    name="certificateName" 
                    placeholder="Enter certificate name" 
                    value={issueForm.certificateName} 
                    onChange={change} 
                    required 
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '14px',
                      color: '#e2e8f0',
                      fontSize: '15px'
                    }}
                  />
                </div>

                {/* Issue Date Field */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '18px', 
                    color: '#cbd5e1',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}>
                    Issue Date *
                  </label>
                  <input 
                    name="issueDate" 
                    type="date" 
                    value={issueForm.issueDate} 
                    onChange={change} 
                    required 
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '14px',
                      color: '#e2e8f0',
                      fontSize: '15px'
                    }}
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '18px', 
                    color: '#cbd5e1',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}>
                    Description
                  </label>
                  <textarea 
                    name="description" 
                    placeholder="Enter certificate description" 
                    value={issueForm.description} 
                    onChange={change} 
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '14px',
                      color: '#e2e8f0',
                      fontSize: '15px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* University Name Field */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '18px', 
                    color: '#cbd5e1',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}>
                    University Name
                  </label>
                  <input 
                    name="universityName" 
                    placeholder="Enter university name" 
                    value={issueForm.universityName} 
                    onChange={change} 
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '14px',
                      color: '#e2e8f0',
                      fontSize: '15px'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={!studentInfo}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: studentInfo 
                      ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                      : 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                    border: 'none',
                    borderRadius: '16px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: studentInfo ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    boxShadow: studentInfo ? '0 8px 24px rgba(59, 130, 246, 0.5)' : 'none',
                    marginTop: '12px'
                  }}
                >
                  {studentInfo ? 'Issue Certificate' : 'Enter Valid Student ID'}
                </button>
              </div>
            </form>
          </AnimateSection>
        </div>
      </DashboardLayout>
    </div>
  );
}


