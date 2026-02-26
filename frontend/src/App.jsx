import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Notification from './components/Notification';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import UniversityDashboard from './pages/UniversityDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import AdminAppearance from './pages/AdminAppearance';
import PendingCertificates from './pages/PendingCertificates';
import ProfileSettings from './pages/ProfileSettings';
import CertificatePublic from './pages/CertificatePublic';
import CertificateVerification from './pages/CertificateVerification';
import MyCertificates from './pages/MyCertificates';
import ApprovedCertificates from './pages/ApprovedCertificates';
import RejectedCertificates from './pages/RejectedCertificates';
import IssuedCertificates from './pages/IssuedCertificates';
import CheckedCertificates from './pages/CheckedCertificates';
import Home from './pages/Home';
import Help from './pages/Help';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/certificate/:certificateId" element={<CertificatePublic />} />
          <Route path="/verify/:certificateId" element={<CertificateVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/student"
            element={<PrivateRoute><StudentDashboard /></PrivateRoute>}
          />
          <Route path="/student/profile" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
          <Route path="/student/certificates" element={<PrivateRoute><MyCertificates /></PrivateRoute>} />
          <Route path="/student/pending" element={<PrivateRoute><PendingCertificates /></PrivateRoute>} />
          <Route
            path="/university"
            element={<PrivateRoute><UniversityDashboard /></PrivateRoute>}
          />
          <Route path="/university/profile" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
          <Route path="/university/approved" element={<PrivateRoute><ApprovedCertificates /></PrivateRoute>} />
          <Route path="/university/rejected" element={<PrivateRoute><RejectedCertificates /></PrivateRoute>} />
          <Route path="/university/issued" element={<PrivateRoute><IssuedCertificates /></PrivateRoute>} />
          <Route path="/university/appearance" element={<PrivateRoute><AdminAppearance /></PrivateRoute>} />
          <Route
            path="/verifier"
            element={<PrivateRoute><VerifierDashboard /></PrivateRoute>}
          />
          <Route
            path="/verifier/verified"
            element={<PrivateRoute><VerifierDashboard /></PrivateRoute>}
          />
          <Route path="/verifier/profile" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
          <Route path="/verifier/checked" element={<PrivateRoute><CheckedCertificates /></PrivateRoute>} />
        </Routes>
        <Notification />
      </div>
    </BrowserRouter>
  );
}
