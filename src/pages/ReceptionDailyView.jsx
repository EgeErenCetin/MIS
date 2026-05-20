import React, { useState } from 'react';
import {
  Calendar, Clock, User, X, ChevronDown, ChevronUp,
  AlertCircle, Phone, MessageCircle, MessageSquare, Trash2
} from 'lucide-react';
import './ReceptionDailyView.css';



// ── Mock Data ──────────────────────────────────────────────────────────────
const INITIAL_APPOINTMENTS = [
  { id: 1, time: '09:00', patient: 'Ahmet Yılmaz', department: 'Diş Hekimliği', doctor: 'Dr. Smith', status: 'confirmed', phone: '+90 532 111 2233' },
  { id: 2, time: '09:30', patient: 'Fatma Kaya', department: 'Ortodonti', doctor: 'Dr. Jones', status: 'confirmed', phone: '+90 541 222 3344' },
  { id: 3, time: '10:00', patient: 'Mehmet Çelik', department: 'Psikoloji', doctor: 'Dr. Ay', status: 'confirmed', phone: '+90 505 333 4455' },
  { id: 4, time: '10:30', patient: 'Zeynep Arslan', department: 'Diyetetik', doctor: 'Dr. Can', status: 'confirmed', phone: '+90 553 444 5566' },
  { id: 5, time: '11:00', patient: 'Ali Demir', department: 'Diş Hekimliği', doctor: 'Dr. Smith', status: 'confirmed', phone: '+90 542 555 6677' },
  { id: 6, time: '11:30', patient: 'Ayşe Şahin', department: 'Ortodonti', doctor: 'Dr. Jones', status: 'confirmed', phone: '+90 506 666 7788' },
  { id: 7, time: '14:00', patient: 'Hasan Öztürk', department: 'Psikoloji', doctor: 'Dr. Ay', status: 'confirmed', phone: '+90 532 777 8899' },
  { id: 8, time: '14:30', patient: 'Merve Yıldız', department: 'Diyetetik', doctor: 'Dr. Can', status: 'confirmed', phone: '+90 541 888 9900' },
  { id: 9, time: '15:00', patient: 'Emre Koç', department: 'Diş Hekimliği', doctor: 'Dr. Smith', status: 'confirmed', phone: '+90 555 999 0011' },
];

const WAITLIST = [
  { id: 'w1', patient: 'Burak Güneş', department: 'Diş Hekimliği', timeOfDay: 'morning', channel: 'whatsapp', position: 1, phone: '+90 533 100 2020', dateRange: '19–25 Mayıs 2026' },
  { id: 'w2', patient: 'Selin Aydın', department: 'Ortodonti', timeOfDay: 'afternoon', channel: 'sms', position: 1, phone: '+90 542 200 3030', dateRange: '19–22 Mayıs 2026' }
];

const TIME_GROUPS = [
  { label: '☀️ Sabah (09:00–12:00)', range: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'] },
  { label: '🌤️ Öğleden Sonra (14:00–17:00)', range: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'] },
];

const DEPT_COLORS = {
  'Diş Hekimliği': '#4F46E5',
  'Ortodonti': '#0EA5E9',
  'Psikoloji': '#8B5CF6',
  'Diyetetik': '#10B981',
};

const ChannelIcon = ({ channel }) => {
  if (channel === 'whatsapp') return <MessageCircle size={14} color="#25D366" />;
  if (channel === 'sms') return <MessageSquare size={14} color="#0EA5E9" />;
  return <Phone size={14} color="#F59E0B" />;
};

const channelLabel = c => ({ whatsapp: 'WhatsApp', sms: 'SMS', voice: 'Sesli Arama' }[c] || c);
const timeLabel = t => ({ morning: 'Sabah', afternoon: 'Öğleden Sonra', any: 'Fark Etmez' }[t] || t);

// ── Component ──────────────────────────────────────────────────────────────
export default function ReceptionDailyView() {
  const today = new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [collapsed, setCollapsed] = useState({});
  const [confirmId, setConfirmId] = useState(null);

  const [loading, setLoading] = useState(false);

  const sendWhatsappMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      if (data.success) {
        alert(`Mesaj başarıyla gönderildi! SID: ${data.sid}`);
      } else {
        alert(`Hata oluştu: ${data.error}`);
      }
    } catch (error) {
      alert('Sunucuya bağlanılamadı.');
    } finally {
      setLoading(false);
    }
  };

  const toggle = (label) => setCollapsed(c => ({ ...c, [label]: !c[label] }));

  const removeAppointment = (id) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    setConfirmId(null);
  };

  return (
    <div className="rdv-root">

      {/* Header */}
      <div className="rdv-header">
        <div>
          <h2 className="rdv-title">Günlük Program</h2>
          <span className="rdv-date"><Calendar size={14} /> {today}</span>
        </div>
        <div className="rdv-summary">
          <div className="rdv-stat">
            <span className="rdv-stat-val">{appointments.length}</span>
            <span className="rdv-stat-lbl">Aktif Randevu</span>
          </div>
          <div className="rdv-stat">
            <span className="rdv-stat-val">{WAITLIST.length}</span>
            <span className="rdv-stat-lbl">Bekleme Listesi</span>
          </div>
        </div>
      </div>

      <div className="rdv-body">

        {/* ── LEFT: Time-grouped appointments ── */}
        <div className="rdv-left">
          {TIME_GROUPS.map(group => {
            const slots = appointments.filter(a => group.range.includes(a.time));
            const isOpen = !collapsed[group.label];
            return (
              <div key={group.label} className="rdv-group">
                <button className="rdv-group-header" onClick={() => toggle(group.label)}>
                  <span>{group.label}</span>
                  <span className="rdv-group-meta">
                    <span className="rdv-badge">{slots.length} hasta</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="rdv-slots">
                    {group.range.map(time => {
                      const apt = slots.find(a => a.time === time);
                      return (
                        <div key={time} className={`rdv-slot ${apt ? 'rdv-slot--filled' : 'rdv-slot--empty'}`}>
                          <div className="rdv-slot-time">
                            <Clock size={13} /> {time}
                          </div>
                          {apt ? (
                            <div className="rdv-slot-card">
                              <div className="rdv-slot-dept-bar" style={{ backgroundColor: DEPT_COLORS[apt.department] || '#64748B' }} />
                              <div className="rdv-slot-info">
                                <span className="rdv-patient-name"><User size={13} /> {apt.patient}</span>
                                <span className="rdv-patient-meta">{apt.department} · {apt.doctor}</span>
                                <span className="rdv-patient-phone"><Phone size={11} /> {apt.phone}</span>
                              </div>
                              <div className="rdv-slot-actions">
                                <span className="rdv-dept-tag" style={{ background: DEPT_COLORS[apt.department] + '22', color: DEPT_COLORS[apt.department] }}>
                                  {apt.department}
                                </span>
                                {confirmId === apt.id ? (
                                  <div className="rdv-confirm">
                                    <span>Silinsin mi?</span>
                                    <button className="rdv-btn-danger" onClick={() => removeAppointment(apt.id)}>Evet</button>
                                    <button className="rdv-btn-cancel" onClick={() => setConfirmId(null)}>Hayır</button>
                                  </div>
                                ) : (
                                  <button className="rdv-remove-btn" title="Randevuyu Kaldır" onClick={() => setConfirmId(apt.id)}>
                                    <Trash2 size={15} />
                                  </button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="rdv-slot-empty-label">Boş Slot</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── RIGHT: Waitlist ── */}
        <div className="rdv-right">
          <div className="rdv-waitlist-header">
            <AlertCircle size={18} color="#F59E0B" />
            <h3>Bugün Müsait Bekleme Listesi</h3>
          </div>
          <p className="rdv-waitlist-sub">Tarih aralığı bugünü kapsayan kayıtlar gösteriliyor.</p>

          <div className="rdv-waitlist-list">
            {WAITLIST.map(w => (
              <div key={w.id} className="rdv-waitlist-card">
                <div className="rdv-wl-top">
                  <div className="rdv-wl-avatar">{w.patient[0]}</div>
                  <div className="rdv-wl-info">
                    <strong>{w.patient}</strong>
                    <span>{w.department}</span>
                  </div>
                  <span className="rdv-wl-pos">#{w.position}</span>
                </div>
                <div className="rdv-wl-details">
                  <span><Clock size={12} /> {timeLabel(w.timeOfDay)}</span>
                  <span><Calendar size={12} /> {w.dateRange}</span>
                  <span><Phone size={12} /> {w.phone}</span>
                  <span className="rdv-wl-channel"><ChannelIcon channel={w.channel} /> {channelLabel(w.channel)}</span>
                </div>
                <button className="rdv-wl-notify" onClick={() => { console.log("hadi"); sendWhatsappMessage(); }} disabled={loading}>
                  Bildirim Gönder
                </button>
              </div>

            ))}
            <button className="rdv-wl-notify" onClick={() => { console.log("hadi"); sendWhatsappMessage(); }} disabled={loading}>
              Bildirim Gönder
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
