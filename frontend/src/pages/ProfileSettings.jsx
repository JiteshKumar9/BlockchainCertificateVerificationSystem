import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AnimateSection from '../components/AnimateSection';
import api, { ASSET_BASE_URL } from '../utils/api';
import { toast } from 'react-toastify';

export default function ProfileSettings() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/profile/get');
        setForm({ name: res.data?.name || '', email: res.data?.email || '', password: '' });
        if (res.data?.profilePicture) {
          setPreview(res.data.profilePicture.startsWith('http') ? res.data.profilePicture : ASSET_BASE_URL + res.data.profilePicture);
        }
      } catch {}
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    if (form.password) data.append('password', form.password);
    if (file) data.append('profilePicture', file);
    try {
      const updateRes = await api.post('/profile/update', data);
      if (updateRes.data?.profilePicture) {
        const url = updateRes.data.profilePicture.startsWith('http') ? updateRes.data.profilePicture : ASSET_BASE_URL + updateRes.data.profilePicture;
        setPreview(url);
      }
      toast.success('Profile updated');
    } catch { toast.error('Update failed'); }
  };

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
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%',
            padding: '32px',
            backgroundColor: '#0f172a',
            borderRadius: '30px'
          }}
        >
          <AnimateSection>
            <div 
              style={{ 
                width: '500px', 
                backgroundColor: 'rgba(30, 41, 59, 0.7)', 
                borderRadius: '16px', 
                padding: '32px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '1px solid rgba(100, 116, 139, 0.2)'
              }}
            >
              <h2 
                className="page-title" 
                style={{ 
                  marginBottom: 24, 
                  textAlign: 'center', 
                  color: '#3b82f6', 
                  fontSize: '24px' 
                }}
              >
                Profile Settings
              </h2>
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr', 
                  gap: 24, 
                  alignItems: 'center' 
                }}
              >
                <div 
                  style={{ 
                    display: 'grid', 
                    placeItems: 'center', 
                    gap: 16 
                  }}
                >
                  <img 
                    className="avatar" 
                    src={preview || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(form.name || 'U')} 
                    alt="avatar" 
                    style={{ 
                      width: 150, 
                      height: 150, 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '4px solid #3b82f6' 
                    }}
                  />
                  <label 
                    style={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                      color: '#3b82f6', 
                      padding: '10px 16px', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      ':hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.2)'
                      }
                    }}
                  >
                    Upload Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        setFile(f || null);
                        if (f) {
                          const reader = new FileReader();
                          reader.onload = () => setPreview(reader.result);
                          reader.readAsDataURL(f);
                        }
                      }} 
                    />
                  </label>
                </div>
                <form 
                  onSubmit={submit} 
                  style={{ 
                    display: 'grid', 
                    gap: 20 
                  }}
                >
                  <div>
                    <label 
                      className="label" 
                      style={{ 
                        display: 'block', 
                        marginBottom: 8, 
                        color: '#cbd5e1' 
                      }}
                    >
                      Name
                    </label>
                    <input 
                      className="input" 
                      placeholder="Enter your name" 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      style={{
                        width: '100%',
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
                      className="label" 
                      style={{ 
                        display: 'block', 
                        marginBottom: 8, 
                        color: '#cbd5e1' 
                      }}
                    >
                      Email
                    </label>
                    <input 
                      className="input" 
                      placeholder="Enter your email" 
                      type="email" 
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })} 
                      style={{
                        width: '100%',
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
                      className="label" 
                      style={{ 
                        display: 'block', 
                        marginBottom: 8, 
                        color: '#cbd5e1' 
                      }}
                    >
                      New Password (optional)
                    </label>
                    <input 
                      className="input" 
                      placeholder="Enter new password" 
                      type="password" 
                      value={form.password} 
                      onChange={(e) => setForm({ ...form, password: e.target.value })} 
                      style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: 'rgba(51, 65, 85, 0.5)',
                        border: '1px solid rgba(100, 116, 139, 0.3)',
                        borderRadius: '8px',
                        color: '#e2e8f0'
                      }}
                    />
                  </div>
                  <button 
                    className="btn btn-primary" 
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: '#3b82f6',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s ease',
                      ':hover': {
                        backgroundColor: '#2563eb'
                      }
                    }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </AnimateSection>
        </div>
      </DashboardLayout>
    </div>
  );
}


