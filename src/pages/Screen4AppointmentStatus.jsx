import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, Sparkles, Check, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Screen4AppointmentStatus() {
  const navigate = useNavigate();
  // Mock data
  const [appointments, setAppointments] = useState([
    { id: 1, type: 'upcoming', doctor: 'Dr. Ayşe Smith', department: 'Diş Hekimliği', date: '2026-06-01', time: '14:00', status: 'confirmed' },
    { id: 2, type: 'past', doctor: 'Dr. Mehmet Jones', department: 'Ortodonti', date: '2025-11-15', time: '09:00', status: 'completed' },
    { id: 3, type: 'past', doctor: 'Dr. Ayşe Smith', department: 'Diş Hekimliği', date: '2025-05-10', time: '11:00', status: 'no-show' }
  ]);

  const [waitlist] = useState([
    { id: 1, department: 'Diş Hekimliği', position: 2, dateRange: '19–25 Mayıs' }
  ]);

  const handleCancel = (id) => {
    if (window.confirm('Randevunuzu iptal etmek istediğinize emin misiniz?')) {
      setAppointments(appointments.map(app => app.id === id ? { ...app, status: 'cancelled', type: 'past' } : app));
    }
  };

  const statusBadge = (status) => {
    const badgeBase = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '0.75rem',
      padding: '0.3rem 0.6rem',
      borderRadius: '9999px',
      lineHeight: '1',
      height: '24px'
    };

    switch(status) {
      case 'confirmed':
        return <span style={{ ...badgeBase, backgroundColor: '#D1FAE5', color: '#065F46' }}><CheckCircle2 size={12} style={{ marginRight: '4px' }} /> Onaylandı</span>;
      case 'completed':
        return <span style={{ ...badgeBase, backgroundColor: '#E0F2FE', color: '#0369A1' }}><Check size={12} style={{ marginRight: '4px' }} /> Tamamlandı</span>;
      case 'cancelled':
        return <span style={{ ...badgeBase, backgroundColor: '#FEE2E2', color: '#991B1B' }}><XCircle size={12} style={{ marginRight: '4px' }} /> İptal Edildi</span>;
      case 'no-show':
        return <span style={{ ...badgeBase, backgroundColor: '#FEF3C7', color: '#92400E' }}><AlertTriangle size={12} style={{ marginRight: '4px' }} /> Gelmedi</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-col gap-6 max-w-4xl mx-auto w-full" style={{ padding: '1rem 0', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* Upper Action Bar */}
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-text-main)' }}>Randevularım</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>Mevcut randevularınızı takip edin veya yeni bir randevu planlayın.</p>
        </div>
        <button className="btn btn-primary" style={{ borderRadius: '12px', padding: '0.625rem 1.25rem', gap: '0.5rem', display: 'flex', alignItems: 'center', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)', fontWeight: 600 }} onClick={() => navigate('/book')}>
          Yeni Randevu Al
        </button>
      </div>

      {/* Waitlist Indicators (Alert Box style) */}
      {waitlist.length > 0 && (
        <div className="flex-col gap-3" style={{ marginBottom: '2rem' }}>
          {waitlist.map(item => (
            <div key={item.id} className="p-4 rounded-2xl border" style={{ backgroundColor: '#FEF3C7', borderColor: '#FDE68A', display: 'flex', justifyContent: 'between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
              <div className="flex items-center gap-3" style={{ flex: 1 }}>
                <div className="p-2 bg-white rounded-xl text-amber-600" style={{ boxShadow: '0 2px 6px rgba(217,119,6,0.1)', display: 'inline-flex' }}>
                  <AlertTriangle size={20} className="animate-pulse" />
                </div>
                <div className="flex-col">
                  <span className="font-semibold text-amber-900" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>⚠️ Sıra Bekleme Listesi Aktif</span>
                  <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.85rem', color: '#92400E' }}>
                    <strong>{item.department}</strong> bölümü için takip aralığı: <strong>{item.dateRange}</strong>
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge" style={{ backgroundColor: '#D97706', color: '#white', fontWeight: 800, padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)', color: 'white', fontSize: '0.8rem' }}>
                  Sıra Durumu: {item.position}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="flex-col gap-4" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0' }}>
          <Calendar size={18} className="text-primary" /> Gelecek Randevular
        </h3>
        {appointments.filter(a => a.type === 'upcoming').length === 0 ? (
          <div className="card text-center p-6" style={{ background: 'white', borderStyle: 'dashed' }}>
            <p className="text-sm text-gray-500" style={{ margin: 0 }}>Planlanmış gelecek randevunuz bulunmamaktadır.</p>
          </div>
        ) : (
          appointments.filter(a => a.type === 'upcoming').map(app => (
            <div key={app.id} className="card flex justify-between items-center" style={{ padding: '1.25rem 1.5rem', border: '1px solid var(--color-border)', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)', background: '#fff' }}>
              <div className="flex gap-4 items-center">
                {/* Bigger calendar icon on the left */}
                <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={28} />
                </div>
                {/* Title and details nicely stacked on the right of the icon */}
                <div className="flex-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{app.doctor}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{app.department}</span>
                  <div className="flex gap-4 text-xs text-gray-500" style={{ marginTop: '0.35rem', gap: '1rem', display: 'flex' }}>
                    <span className="flex items-center gap-1" style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}><Calendar size={12} /> {app.date}</span>
                    <span className="flex items-center gap-1" style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}><Clock size={12} /> {app.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex-col items-end gap-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {statusBadge(app.status)}
                <div className="flex gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '8px', fontWeight: 600 }} onClick={() => navigate('/book')}>Tarihi Değiştir</button>
                  <button className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#FEE2E2', color: '#EF4444', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => handleCancel(app.id)}>İptal Et</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Past Appointments (Clean divider-separated list structure) */}
      <div className="flex-col gap-4">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0' }}>
          <Clock size={18} className="text-muted" /> Randevu Geçmişi
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '0.5rem 1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          {appointments.filter(a => a.type === 'past').map((app, index, arr) => (
            <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: index === arr.length - 1 ? 'none' : '1px solid #F3F4F6' }}>
              <div className="flex-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span className="font-semibold" style={{ color: 'var(--color-text-main)', fontSize: '0.95rem' }}>{app.doctor}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{app.department}</span>
                {/* Beautiful separate line for date and time to prevent squishing */}
                <span className="text-xs text-gray-500" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#9CA3AF', marginTop: '0.15rem' }}>
                  <Calendar size={11} /> {app.date} &nbsp;·&nbsp; <Clock size={11} /> {app.time}
                </span>
              </div>
              <div>
                {statusBadge(app.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
