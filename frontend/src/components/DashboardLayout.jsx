import { Link, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <motion.main className="container page-space" style={{ flex: 1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4 }}>{children}</motion.main>
      <Footer />
    </div>
  );
}


