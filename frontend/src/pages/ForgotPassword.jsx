import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import AnimateSection from '../components/AnimateSection';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const requestOtp = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/send-otp', { email });
      toast.success('OTP sent to your email');
      window.location.href = `/verify-otp?email=${encodeURIComponent(email)}`;
    } catch (e) { toast.error(e?.response?.data?.message || 'Failed to send OTP'); }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <main className="container page-space" style={{ flex: 1 }}>
        <AnimateSection>
          <div className="narrow card section">
            <h2 className="page-title" style={{ marginBottom: 16 }}>Forgot Password</h2>
            <form onSubmit={requestOtp} style={{ display: 'grid', gap: 12 }}>
              <input className="input" type="email" placeholder="Registered Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button className="btn btn-primary">Send OTP</button>
            </form>
          </div>
        </AnimateSection>
      </main>
      <Footer />
    </div>
  );
}


