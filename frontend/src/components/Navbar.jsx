import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ProfileMenu from './ProfileMenu';

export default function Navbar() {
  const role = localStorage.getItem('role');
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkStyle = (path) => ({
    textDecoration: 'none',
    padding: '8px 10px',
    borderRadius: 10,
    color: pathname === path ? '#3B38A0' : '#7A85C1',
    background: pathname === path ? 'rgba(59, 56, 160, 0.1)' : 'transparent',
    fontWeight: 700,
    transition: 'all 0.3s ease'
  });

  return (
    <header 
      className="header-bar" 
      style={{ 
        backgroundColor: 'rgba(26, 42, 128, 0.7)', 
        borderBottom: '1px solid rgba(122, 133, 193, 0.2)' 
      }}
    >
      <div 
        className="header-inner container" 
        style={{ 
          gap: 12, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '16px 32px' 
        }}
      >
        <h1 
          style={{ 
            fontSize: 18, 
            fontWeight: 700, 
            color: '#B2B0E8'
          }}
        >
          Blockchain Certificate Verification
        </h1>
        <button 
          aria-label="Toggle menu" 
          onClick={() => setOpen((o) => !o)} 
          style={{ 
            display: 'none', 
            background: 'transparent', 
            border: 'none', 
            color: '#B2B0E8' 
          }} 
          className="nav-toggle"
        >
          ≡
        </button>
        <style>{`@media (max-width: 820px){ .nav-menu{ display:${open ? 'flex' : 'none'}; position:absolute; right:16px; top:64px; flex-direction:column; background:rgba(59, 56, 160, 0.9); padding:12px; border-radius:12px; } .nav-toggle{ display:block } }`}</style>
        <nav 
          className="nav-menu" 
          style={{ 
            display: 'flex', 
            gap: 16, 
            alignItems: 'center' 
          }}
        >
          {/* <Link 
            style={linkStyle('/help')} 
            className="nav-link" 
            to="/help"
          >
            Help
          </Link> */}
          {!role ? (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Link
                className="btn"
                to="/"
                style={{
                  padding: '16px 32px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  border: '2px solid #3b82f6',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                 
                }}
              >
                Home
              </Link>
              <Link 
                className="btn btn-primary" 
                to="/login" 
                style={{ 
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
                Login
              </Link>
            </div>
          ) : (
            <ProfileMenu />
          )}
        </nav>
      </div>
    </header>
  );
}


