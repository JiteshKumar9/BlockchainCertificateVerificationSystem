import { useEffect, useRef, useState } from 'react';
import api, { ASSET_BASE_URL } from '../utils/api';

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/profile/get');
        setUser(res.data);
      } catch { /* ignore */ }
    })();
  }, []);

  if (!user) return null;

  const role = localStorage.getItem('role');

  const itemsByRole = {
    student: [
      { key: 'home', label: 'Home', href: '/student' },
      { key: 'profile', label: 'Profile Settings', href: '/student/profile' },
      { key: 'pending', label: 'Pending Certificates', href: '/student/pending' },
      { key: 'certs', label: 'My Certificates', href: '/student/certificates' },
      { key: 'logout', label: 'Logout', href: '/login', action: () => { localStorage.clear(); } },
    ],
    university: [
      { key: 'home', label: 'Home', href: '/university' },
      { key: 'profile', label: 'Profile Settings', href: '/university/profile' },
      { key: 'approved', label: 'Approved Certificates', href: '/university/approved' },
      { key: 'rejected', label: 'Rejected Certificates', href: '/university/rejected' },
      { key: 'issued', label: 'Issued Certificates', href: '/university/issued' },
      { key: 'logout', label: 'Logout', href: '/login', action: () => { localStorage.clear(); } },
    ],
    verifier: [
      { key: 'home', label: 'Home', href: '/verifier' },
      { key: 'profile', label: 'Profile Settings', href: '/verifier/profile' },
      { key: 'checked', label: 'Checked Certificates', href: '/verifier/checked' },
      { key: 'logout', label: 'Logout', href: '/login', action: () => { localStorage.clear(); } },
    ],
  };

  const items = itemsByRole[role] || [];

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 50 }}>
      <button 
        onClick={() => setOpen((o) => !o)} 
        className="btn btn-primary" 
        style={{ 
          display: 'flex', 
          gap: 8,
          position: 'relative',
          zIndex: 51,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          padding: '8px 16px',
          color: '#e2e8f0',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)';
          e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)';
          e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)';
        }}
      >
        <img 
          src={(user.profilePicture ? (user.profilePicture.startsWith('http') ? user.profilePicture : ASSET_BASE_URL + user.profilePicture) : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'U'))} 
          alt="avatar" 
          width={24} 
          height={24} 
          style={{ 
            borderRadius: '999px', 
            background: '#fff' 
          }} 
        />
        <span>{user.name || 'User'}</span>
      </button>
      {open && (
        <div 
          className="card" 
          style={{ 
            position: 'absolute', 
            right: 0, 
            top: '110%', 
            padding: '8px', 
            minWidth: 240,
            zIndex: 100,
            backgroundColor: 'rgba(30, 41, 59, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {items.map((it) => (
            <a 
              key={it.key} 
              href={it.href} 
              onClick={it.action} 
              style={{ 
                display: 'block', 
                padding: '12px 16px', 
                color: '#e2e8f0', 
                textDecoration: 'none', 
                borderRadius: '8px', 
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                margin: '2px 0'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                e.target.style.color = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#e2e8f0';
              }}
            >
              {it.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}


