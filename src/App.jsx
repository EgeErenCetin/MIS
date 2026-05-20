import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
    <header style={{ borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="flex justify-between items-center" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>HAOS</h1>
        <div className="flex items-center" style={{ gap: '0.625rem' }}>
          <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.25rem', fontWeight: 600 }} onClick={() => login('patient')}>Hasta Girişi</button>
          <button className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.25rem', fontWeight: 600 }} onClick={() => login('patient')}>Kayıt Ol</button>
          <div style={{ width: '1px', height: '24px', background: 'var(--color-border)', margin: '0 0.35rem' }} />
          <button className="btn btn-outline" style={{ fontSize: '0.8rem', borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', borderStyle: 'dashed' }} onClick={() => login('reception')}>Personel</button>
          <button className="btn btn-outline" style={{ fontSize: '0.8rem', borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', borderStyle: 'dashed' }} onClick={() => login('admin')}>Admin</button>
        </div>
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

/* Default home component based on user role to prevent screen flashing */
const DefaultHome = () => {
  const { user } = useAuth();
  if (user?.role === 'reception') {
    return <ReceptionDeskView />;
  }
  if (user?.role === 'admin') {
    return <Screen6AdminDashboard />;
  }
  return <Screen4AppointmentStatus />;
};

/* Root component: decides which layout to use */
const Root = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      if (user.role === 'reception') {
        navigate('/daily-schedule');
      } else if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/');
    }
  }, [user?.role]);

  if (!user) {
    return (
      <>
        <LandingNav />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <LandingPage />
        </div>
      </>
    );
  }
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DefaultHome />} />
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
