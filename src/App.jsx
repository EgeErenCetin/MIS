import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Plus, Sparkles, HeartPulse, Settings, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Screen3PatientRegistration from './pages/Screen3PatientRegistration';
import Screen6AdminDashboard from './pages/Screen6AdminDashboard';
import Screen1NewAppointment from './pages/Screen1NewAppointment';
import Screen2WaitlistJoin from './pages/Screen2WaitlistJoin';
import Screen4AppointmentStatus from './pages/Screen4AppointmentStatus';
import Screen5HealthPortal from './pages/Screen5HealthPortal';
import LandingPage from './pages/LandingPage';
import ReceptionDeskView from './pages/ReceptionDeskView';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SupportPage from './pages/SupportPage';

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

/* Reusable and modern Footer component */
const Footer = ({ isLanding }) => {
  return (
    <footer style={{ 
      borderTop: '1px solid var(--color-border)', 
      padding: '2rem 1rem', 
      marginTop: 'auto', 
      background: isLanding ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
      backdropFilter: isLanding ? 'blur(8px)' : 'none',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        maxWidth: isLanding ? '1280px' : '100%', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>HAOS</span>
          <div style={{ width: '1px', height: '14px', background: 'var(--color-border)' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
            © {new Date().getFullYear()} HAOS. Tüm Hakları Saklıdır.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', fontWeight: 600 }}>
          <Link to="/privacy" style={{ color: '#6B7280', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = '#6B7280'}>Gizlilik Politikası</Link>
          <Link to="/terms" style={{ color: '#6B7280', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = '#6B7280'}>Kullanım Şartları</Link>
          <Link to="/support" style={{ color: '#6B7280', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = '#6B7280'}>Destek</Link>
        </div>
      </div>
    </footer>
  );
};

/* Authenticated sidebar layout */
const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const activeStyle = {
    background: 'rgba(79, 70, 229, 0.08)',
    color: 'var(--color-primary)',
    fontWeight: 600,
    borderRadius: '12px',
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.2s ease',
    border: 'none',
  };

  const inactiveStyle = {
    background: 'transparent',
    color: '#6B7280',
    fontWeight: 500,
    borderRadius: '12px',
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.2s ease',
    border: 'none',
  };

  return (
    <div className="container flex-col" style={{ minHeight: '100vh', display: 'flex' }}>
      <header className="flex justify-between items-center" style={{ padding: '1rem 0', borderBottom: '1px solid var(--color-border)' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>HAOS</h1>
        </Link>
        <div className="flex gap-4 items-center">
          <span className="badge badge-success" style={{ fontWeight: 600 }}>Rol: {user?.role === 'reception' ? 'Personel' : user?.role === 'admin' ? 'Yönetici' : 'Hasta'}</span>
          <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }} onClick={logout}>
            <LogOut size={13} /> Çıkış Yap
          </button>
        </div>
      </header>
      <div className="flex gap-6 mt-4" style={{ flex: 1 }}>
        <nav style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {user?.role === 'reception' && (
            <Link to="/daily-schedule" style={location.pathname === '/daily-schedule' || location.pathname === '/' ? activeStyle : inactiveStyle} className="sidebar-link">
              <Calendar size={18} />
              <span>Günlük Masa</span>
            </Link>
          )}
          {user?.role === 'patient' && (
            <>
              <Link to="/dashboard" style={location.pathname === '/dashboard' || location.pathname === '/' ? activeStyle : inactiveStyle} className="sidebar-link">
                <Calendar size={18} />
                <span>Randevularım</span>
              </Link>
              <Link to="/book" style={location.pathname === '/book' ? activeStyle : inactiveStyle} className="sidebar-link">
                <Plus size={18} />
                <span>Randevu Al</span>
              </Link>
              <Link to="/waitlist" style={location.pathname === '/waitlist' ? activeStyle : inactiveStyle} className="sidebar-link">
                <Sparkles size={18} />
                <span>Bekleme Listesi</span>
              </Link>
              <Link to="/health-portal" style={location.pathname === '/health-portal' ? activeStyle : inactiveStyle} className="sidebar-link">
                <HeartPulse size={18} />
                <span>Sağlık Portalı</span>
              </Link>
            </>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" style={location.pathname === '/admin' || location.pathname === '/' ? activeStyle : inactiveStyle} className="sidebar-link">
              <Settings size={18} />
              <span>Admin Paneli</span>
            </Link>
          )}
        </nav>
        <main style={{ flex: 1 }}>{children}</main>
      </div>
      <Footer isLanding={false} />
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
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <LandingNav />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem', flex: 1, width: '100%', boxSizing: 'border-box' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
        <Footer isLanding={true} />
      </div>
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
        
        {/* Support pages inside authenticated sidebar view */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/support" element={<SupportPage />} />
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
