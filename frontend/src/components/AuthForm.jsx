import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';
import PasswordInput from './PasswordInput';

export default function AuthForm({ mode = 'login', onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        const res = await api.post('/register', form);
        
        // Show student ID if student was registered
        if (form.role === 'student' && res.data.studentId) {
          setRegistrationResult({
            studentId: res.data.studentId,
            name: form.name
          });
          toast.success(`Registered successfully! Your Student ID is: ${res.data.studentId}`);
        } else {
          toast.success('Registered successfully');
        }
        
        if (onSuccess) onSuccess(res.data);
      } else {
        const res = await api.post('/login', { email: form.email, password: form.password });
        const { token, role } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        toast.success('Logged in');
        if (onSuccess) onSuccess(res.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    border: '1px solid rgba(100, 116, 139, 0.3)',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block', 
    marginBottom: 10, 
    color: '#cbd5e1',
    fontSize: '14px',
    fontWeight: 500
  };

  // If registration was successful and student ID was generated, show success message
  if (registrationResult) {
    return (
      <div style={{ 
        textAlign: 'center',
        padding: '32px 16px'
      }}>
        <div style={{ 
          fontSize: '48px', 
          marginBottom: '16px',
          color: '#059669'
        }}>
          ✓
        </div>
        <h2 style={{ 
          color: '#059669', 
          marginBottom: '16px',
          fontSize: '24px'
        }}>
          Registration Successful!
        </h2>
        <div style={{ 
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <p style={{ 
            color: '#059669', 
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Welcome, {registrationResult.name}!
          </p>
          <p style={{ 
            color: '#059669', 
            margin: '0 0 16px 0',
            fontSize: '14px'
          }}>
            Your Student ID has been generated:
          </p>
          <div style={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px'
          }}>
            <span style={{ 
              color: '#059669', 
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'monospace'
            }}>
              {registrationResult.studentId}
            </span>
          </div>
          <p style={{ 
            color: '#059669', 
            margin: 0,
            fontSize: '13px'
          }}>
            Please save this ID - you'll need it for certificate verification
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/login'}
          className="btn btn-primary" 
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
        >
          Continue to Login
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={submit} 
      className="section" 
      style={{ 
        maxWidth: 520, 
        margin: '0 auto',
        display: 'grid',
        gap: 20
      }}
    >
      {mode === 'register' && (
        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input 
              name="name" 
              placeholder="Enter your name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Role</label>
            <select 
              name="role" 
              value={form.role} 
              onChange={handleChange} 
              style={{
                ...inputStyle,
                appearance: 'none',
                backgroundImage: 'linear-gradient(45deg, transparent 50%, #3b82f6 50%), linear-gradient(135deg, #3b82f6 50%, transparent 50%)',
                backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)',
                backgroundSize: '5px 5px, 5px 5px',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <option value="student">Student</option>
              <option value="university">University</option>
              <option value="verifier">Verifier</option>
            </select>
          </div>
        </div>
      )}
      <div style={{ display: 'grid', gap: 16 }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input 
            name="email" 
            type="email" 
            placeholder="Enter your email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <PasswordInput 
            name="password" 
            placeholder="Enter your password"
            value={form.password} 
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
            ':hover': {
              backgroundColor: '#2563eb'
            }
          }}
        >
          {loading ? 'Please wait...' : (mode === 'register' ? 'Register' : 'Login')}
        </button>
      </div>
    </form>
  );
}


