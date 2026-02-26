import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import AnimateSection from '../components/AnimateSection';

export default function VerifyOtp() {
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  useEffect(() => { setEmail(params.get('email') || ''); }, [params]);

  const verify = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/verify-otp', { email, otp });
      toast.success('OTP verified');
      window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
    } catch (e) { toast.error(e?.response?.data?.message || 'OTP verification failed'); }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <main className="container page-space" style={{ flex: 1 }}>
        <AnimateSection>
          <div className="narrow card section">
            <h2 className="page-title" style={{ marginBottom: 16 }}>Verify OTP</h2>
            <form onSubmit={verify} style={{ display: 'grid', gap: 12 }}>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
              <input className="input" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required />
              <button className="btn btn-primary">Verify</button>
            </form>
          </div>
        </AnimateSection>
      </main>
      <Footer />
    </div>
  );
}


