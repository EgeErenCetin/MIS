import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Screen3PatientRegistration from './pages/Screen3PatientRegistration';
import Screen6AdminDashboard from './pages/Screen6AdminDashboard';
import Screen1NewAppointment from './pages/Screen1NewAppointment';
import Screen2WaitlistJoin from './pages/Screen2WaitlistJoin';
import Screen4AppointmentStatus from './pages/Screen4AppointmentStatus';
import Screen5HealthPortal from './pages/Screen5HealthPortal';
import LandingPage from './pages/LandingPage';
import ReceptionDeskView from './pages/ReceptionDeskView';

/* Navbar shown on the landing page (not logged in) */
const LandingNav = () => {
  const { login } = useAuth();
  return (
    <header className="flex justify-between items-center" style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <h1 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', letterSpacing: '-0.03em' }}>HAOS</h1>
      <div className="flex gap-2">
        <button className="btn btn-outline" onClick={() => login('patient')}>Hasta Girişi</button>
        <button className="btn btn-primary" onClick={() => login('patient')}>Kayıt Ol</button>
        <button className="btn btn-outline" style={{ fontSize: '0.75rem' }} onClick={() => login('reception')}>Personel</button>
        <button className="btn btn-outline" style={{ fontSize: '0.75rem' }} onClick={() => login('admin')}>Admin</button>
      </div>
    </header>
  );
};

/* Authenticated sidebar layout */
const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <div className="container flex-col" style={{ minHeight: '100vh', display: 'flex' }}>
      <header className="flex justify-between items-center" style={{ padding: '1rem 0', borderBottom: '1px solid var(--color-border)' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>HAOS</h1>
        </Link>
        <div className="flex gap-4 items-center">
          <span className="badge badge-success">Rol: {user?.role}</span>
          <button className="btn btn-outline" onClick={logout}>Çıkış</button>
        </div>
      </header>
      <div className="flex gap-6 mt-4" style={{ flex: 1 }}>
        <nav style={{ width: '220px', flexShrink: 0 }} className="flex-col gap-2">
          {user?.role === 'reception' && (
            <Link to="/daily-schedule" className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>Günlük Masa</Link>
          )}
          {user?.role === 'patient' && (
            <>
              <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>Randevularım</Link>
              <Link to="/book" className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>Randevu Al</Link>
              <Link to="/waitlist" className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>Bekleme Listesi</Link>
              <Link to="/health-portal" className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>Sağlık Portalı</Link>
            </>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>Admin Paneli</Link>
          )}
        </nav>
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </div>
  );
};

/* Root component: decides which layout to use */
const Root = () => {
  const { user } = useAuth();
  if (!user) {
    return (
      <>
        <LandingNav />
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <LandingPage />
        </div>
      </>
    );
  }
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Screen4AppointmentStatus />} />
        <Route path="/book" element={<Screen1NewAppointment />} />
        <Route path="/waitlist" element={<Screen2WaitlistJoin />} />
        <Route path="/register-patient" element={<Screen3PatientRegistration />} />
        <Route path="/dashboard" element={<Screen4AppointmentStatus />} />
        <Route path="/health-portal" element={<Screen5HealthPortal />} />
        <Route path="/admin" element={<Screen6AdminDashboard />} />
        <Route path="/daily-schedule" element={<ReceptionDeskView />} />
      </Routes>
    </AppLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Root />
      </Router>
    </AuthProvider>
  );
}

export default App;
