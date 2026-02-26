import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import AnimateSection from '../components/AnimateSection';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  useEffect(() => { setEmail(params.get('email') || ''); }, [params]);

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error('Password must be at least 6 characters');
    if (password !== confirm) return toast.error('Passwords do not match');
    try {
      await api.post('/auth/reset-password', { email, password });
      toast.success('Password reset successful');
      window.location.href = '/login';
    } catch (e) { toast.error(e?.response?.data?.message || 'Reset failed'); }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <main className="container page-space" style={{ flex: 1 }}>
        <AnimateSection>
          <div className="narrow card section">
            <h2 className="page-title" style={{ marginBottom: 16 }}>Reset Password</h2>
            <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
              <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" name="newPassword" />
              <PasswordInput value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm New Password" name="confirmPassword" />
              <button className="btn btn-primary">Update Password</button>
            </form>
          </div>
        </AnimateSection>
      </main>
      <Footer />
    </div>
  );
}


