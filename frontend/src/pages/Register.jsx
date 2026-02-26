import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="register-page">
      <div className="narrow card section">
        {/* Home icon button inside container */}
        <Link 
          to="/" 
          aria-label="Go to Home"
          className="home-link"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l9-8 9 8" />
            <path d="M9 22V12h6v10" />
          </svg>
        </Link>
        <h1 className="page-title text-center mb-3">
          Create an account
        </h1>
        <p className="muted text-center mb-7">
          Register to get started
        </p>
        <AuthForm
          mode="register"
          onSuccess={() => navigate('/login')}
        />
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


