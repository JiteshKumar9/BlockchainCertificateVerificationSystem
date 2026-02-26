import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function Login() {
  const navigate = useNavigate();
  return (
    <div 
      className="login-page"
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <div 
        style={{ 
          maxWidth: 400, 
          width: '100%', 
          padding: '2.5rem', 
          backgroundColor: 'rgba(30, 41, 59, 0.7)', 
          borderRadius: '16px',
          position: 'relative'
        }}
      >
        {/* Home icon button inside container */}
        <Link 
          to="/" 
          aria-label="Go to Home"
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            width: 36,
            height: 36,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(51,65,85,0.5)',
            border: '1px solid rgba(59,130,246,0.35)',
            color: '#e2e8f0',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(51,65,85,0.8)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(51,65,85,0.5)'; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l9-8 9 8" />
            <path d="M9 22V12h6v10" />
          </svg>
        </Link>
        <h1 
          style={{ 
            fontSize: 32, 
            marginBottom: 12, 
            color: '#3b82f6', 
            textAlign: 'center' 
          }}
        >
          Welcome back
        </h1>
        <p 
          style={{ 
            marginBottom: 28, 
            textAlign: 'center', 
            color: '#cbd5e1' 
          }}
        >
          Login to access your dashboard
        </p>
        <AuthForm
          mode="login"
          onSuccess={() => {
            const role = localStorage.getItem('role');
            navigate(`/${role}`);
          }}
        />
        <div 
          style={{ 
            marginTop: 16, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <Link 
            to="/forgot-password" 
            style={{ 
              color: '#3b82f6', 
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease',
              ':hover': {
                color: '#2563eb',
                textDecoration: 'underline'
              }
            }}
            className="hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <p 
          style={{ 
            marginTop: 16, 
            textAlign: 'center', 
            color: '#94a3b8',
            fontSize: '14px'
          }}
        >
          Don't have an account?{' '}
          <Link 
            to="/register" 
            style={{ 
              color: '#3b82f6', 
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              ':hover': {
                color: '#2563eb',
                textDecoration: 'underline'
              }
            }}
            className="hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}


