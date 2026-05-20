import React, { useState } from 'react';
import {
  Calendar, Clock, User, Trash2, Plus, X, Phone,
  Mail, ChevronLeft, ChevronRight, MessageCircle,
  MessageSquare, AlertCircle, UserPlus, Stethoscope
} from 'lucide-react';
import './ReceptionDeskView.css';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const DOCTORS = [
  { id: 'd1', name: 'Dr. Ayşe Smith', department: 'Diş Hekimliği', color: '#4F46E5', light: '#EEF2FF' },
  { id: 'd2', name: 'Dr. Mehmet Jones', department: 'Ortodonti', color: '#0EA5E9', light: '#E0F2FE' },
  { id: 'd3', name: 'Dr. Fatma Ay', department: 'Psikoloji', color: '#8B5CF6', light: '#F5F3FF' },
  { id: 'd4', name: 'Dr. Ali Can', department: 'Diyetetik', color: '#10B981', light: '#ECFDF5' },
];

const TIME_SLOTS = [
  '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
];

const INITIAL_APPTS = {
  'd1-09:00': { patient: 'Ahmet Yılmaz', phone: '+90 532 111 22 33', note: 'Rutin kontrol' },
  'd1-10:30': { patient: 'Fatma Kaya', phone: '+90 541 222 33 44', note: 'Dolgu' },
  'd2-09:30': { patient: 'Zeynep Arslan', phone: '+90 553 333 44 55', note: 'Tel takma' },
  'd2-14:00': { patient: 'Emre Koç', phone: '+90 542 444 55 66', note: 'Braket kontrolü' },
  'd3-11:00': { patient: 'Hasan Öztürk', phone: '+90 505 555 66 77', note: 'Seans' },
  'd4-13:30': { patient: 'Merve Yıldız', phone: '+90 506 666 77 88', note: 'İlk görüşme' },
};

const WAITLIST = [
  { id: 'w1', patient: 'Burak Güneş', dept: 'Diş Hekimliği', timeOfDay: 'morning', channel: 'whatsapp', pos: 1, phone: '+90 533 100 20 20', range: '19–25 Mayıs' },
  { id: 'w2', patient: 'Selin Aydın', dept: 'Ortodonti', timeOfDay: 'afternoon', channel: 'sms', pos: 1, phone: '+90 542 200 30 30', range: '19–22 Mayıs' },
  { id: 'w3', patient: 'Can Arslan', dept: 'Psikoloji', timeOfDay: 'any', channel: 'voice', pos: 1, phone: '+90 555 300 40 40', range: '18–24 Mayıs' },
];

const ChannelIcon = ({ ch }) => {
  if (ch === 'whatsapp') return <MessageCircle size={13} color="#25D366" />;
  if (ch === 'sms') return <MessageSquare size={13} color="#0EA5E9" />;
  return <Phone size={13} color="#F59E0B" />;
};

const timeLabel = t => ({ morning: 'Sabah', afternoon: 'Öğleden Sonra', any: 'Fark Etmez' }[t] || t);

// ─── Empty slot form (inline modal) ──────────────────────────────────────────
function SlotForm({ doctor, time, onSave, onClose }) {
  const [tab, setTab] = useState('existing'); // 'existing' | 'new'
  const [form, setForm] = useState({
    patient: '', phone: '', email: '', dob: '', note: '',
    kvkk: false, aiConsent: false,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.patient || !form.phone) return;
    if (tab === 'new' && !form.kvkk) { alert('KVKK onayı zorunludur.'); return; }
    onSave({ patient: form.patient, phone: form.phone, note: form.note });
  };

  return (
    <div className="sf-overlay" onClick={onClose}>
      <div className="sf-modal" onClick={e => e.stopPropagation()}>
        <div className="sf-header">
          <div>
            <h3 className="sf-title">Randevu Ekle</h3>
            <p className="sf-subtitle" style={{ color: doctor.color }}>
              {doctor.name} · {time}
            </p>
          </div>
          <button className="sf-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Tabs */}
        <div className="sf-tabs">
          <button className={`sf-tab ${tab === 'existing' ? 'active' : ''}`} onClick={() => setTab('existing')}>
            <User size={14} /> Mevcut Hasta
          </button>
          <button className={`sf-tab ${tab === 'new' ? 'active' : ''}`} onClick={() => setTab('new')}>
            <UserPlus size={14} /> Yeni Hasta Kayıt
          </button>
        </div>

        <div className="sf-body">
          {tab === 'existing' && (
            <>
              <label className="sf-label">Hasta Adı *</label>
              <input className="sf-input" placeholder="Hasta adı veya ID giriniz…" value={form.patient} onChange={e => set('patient', e.target.value)} />
              <label className="sf-label">Telefon *</label>
              <input className="sf-input" placeholder="+90 5xx xxx xx xx" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </>
          )}

          {tab === 'new' && (
            <>
              <label className="sf-label">Ad Soyad *</label>
              <input className="sf-input" placeholder="Hasta adı soyadı" value={form.patient} onChange={e => set('patient', e.target.value)} />
              <div className="sf-row">
                <div style={{ flex: 1 }}>
                  <label className="sf-label">Telefon *</label>
                  <input className="sf-input" placeholder="+90 5xx…" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="sf-label">E-posta</label>
                  <input className="sf-input" placeholder="ornek@mail.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
              </div>
              <label className="sf-label">Doğum Tarihi</label>
              <input className="sf-input" type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
              <div className="sf-consents">
                <label className="sf-consent-row">
                  <input type="checkbox" checked={form.kvkk} onChange={e => set('kvkk', e.target.checked)} />
                  <span><strong>KVKK Genel Onayı *</strong> — Kişisel verilerimin 6698 sayılı Kanun kapsamında işlenmesine onay veriyorum.</span>
                </label>
                <label className="sf-consent-row">
                  <input type="checkbox" checked={form.aiConsent} onChange={e => set('aiConsent', e.target.checked)} />
                  <span><strong>AI Portal Onayı</strong> — Tıbbi belgelerimin yapay zeka tarafından özetlenmesine onay veriyorum.</span>
                </label>
              </div>
            </>
          )}

          <label className="sf-label" style={{ marginTop: '0.75rem' }}>Not / Ziyaret Nedeni</label>
          <textarea className="sf-input sf-textarea" placeholder="Opsiyonel…" value={form.note} onChange={e => set('note', e.target.value)} />
        </div>

        <div className="sf-footer">
          <button className="sf-btn-cancel" onClick={onClose}>İptal</button>
          <button className="sf-btn-save" style={{ background: `linear-gradient(135deg, ${doctor.color}, #0EA5E9)` }} onClick={handleSave}>
            Randevuyu Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ReceptionDeskView() {
  const [appts, setAppts] = useState(INITIAL_APPTS);
  const [form, setForm] = useState(null);   // { doctorId, time }
  const [confirm, setConfirm] = useState(null);   // key to delete
  const [loading, setLoading] = useState(false);
  const [dateOffset, setDateOffset] = useState(0);

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

  const today = new Date();
  today.setDate(today.getDate() + dateOffset);
  const dateStr = today.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const key = (did, time) => `${did}-${time}`;

  const saveAppt = (doctorId, time, data) => {
    setAppts(prev => ({ ...prev, [key(doctorId, time)]: data }));
    setForm(null);
  };

  const removeAppt = (k) => { setAppts(prev => { const n = { ...prev }; delete n[k]; return n; }); setConfirm(null); };

  const totalAppts = Object.keys(appts).length;

  return (
    <div className="desk-root">

      {/* ── Top Bar ── */}
      <div className="desk-topbar">
        <div className="desk-topbar-left">
          <div className="desk-date-nav">
            <button className="desk-nav-btn" onClick={() => setDateOffset(d => d - 1)}><ChevronLeft size={16} /></button>
            <div>
              <div className="desk-date-label"><Calendar size={13} /> {dateStr}</div>
            </div>
            <button className="desk-nav-btn" onClick={() => setDateOffset(d => d + 1)}><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="desk-stats">
          <div className="desk-stat"><span className="desk-stat-val">{totalAppts}</span><span className="desk-stat-lbl">Randevu</span></div>
          <div className="desk-stat"><span className="desk-stat-val">{WAITLIST.length}</span><span className="desk-stat-lbl">Bekleme</span></div>
          <div className="desk-stat"><span className="desk-stat-val">{DOCTORS.length}</span><span className="desk-stat-lbl">Doktor</span></div>
        </div>
      </div>

      <div className="desk-body">
        {/* ── Schedule Grid ── */}
        <div className="desk-grid-wrap">
          <div className="desk-grid" style={{ gridTemplateColumns: `72px repeat(${DOCTORS.length}, minmax(180px,1fr))` }}>

            {/* Header row */}
            <div className="desk-cell desk-time-header" />
            {DOCTORS.map(doc => (
              <div key={doc.id} className="desk-cell desk-doc-header" style={{ borderTop: `3px solid ${doc.color}`, background: doc.light }}>
                <div className="desk-doc-avatar" style={{ background: doc.color }}><Stethoscope size={14} color="#fff" /></div>
                <div>
                  <div className="desk-doc-name">{doc.name}</div>
                  <div className="desk-doc-dept" style={{ color: doc.color }}>{doc.department}</div>
                </div>
              </div>
            ))}

            {/* Time rows */}
            {TIME_SLOTS.map(time => (
              <React.Fragment key={time}>
                {/* Time label */}
                <div className="desk-cell desk-time-cell">
                  <Clock size={11} /> {time}
                </div>

                {/* Each doctor's slot */}
                {DOCTORS.map(doc => {
                  const k = key(doc.id, time);
                  const appt = appts[k];
                  const isConfirm = confirm === k;
                  return (
                    <div key={doc.id} className={`desk-cell desk-slot ${appt ? 'desk-slot--filled' : 'desk-slot--empty'}`}
                      style={appt ? { borderLeft: `3px solid ${doc.color}`, background: doc.light } : {}}
                      onClick={!appt ? () => setForm({ doctorId: doc.id, time }) : undefined}
                    >
                      {appt ? (
                        <div className="desk-appt">
                          <div className="desk-appt-top">
                            <span className="desk-appt-name"><User size={11} /> {appt.patient}</span>
                            {isConfirm ? (
                              <div className="desk-confirm">
                                <button className="desk-btn-yes" onClick={() => removeAppt(k)}>✓</button>
                                <button className="desk-btn-no" onClick={() => setConfirm(null)}>✕</button>
                              </div>
                            ) : (
                              <button className="desk-del-btn" onClick={e => { e.stopPropagation(); setConfirm(k) }}><Trash2 size={12} /></button>
                            )}
                          </div>
                          {appt.phone && <span className="desk-appt-phone"><Phone size={10} /> {appt.phone}</span>}
                          {appt.note && <span className="desk-appt-note">{appt.note}</span>}
                        </div>
                      ) : (
                        <span className="desk-slot-add"><Plus size={12} /> Ekle</span>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Waitlist Panel ── */}
        <div className="desk-wl-panel">
          <div className="desk-wl-title">
            <AlertCircle size={16} color="#F59E0B" />
            <span>Bugün Müsait Bekleme</span>
          </div>
          <p className="desk-wl-sub">Tarih aralığı bugünü kapsayan kayıtlar</p>
          <div className="desk-wl-list">
            {WAITLIST.map(w => {
              const doc = DOCTORS.find(d => d.department === w.dept);
              return (
                <div key={w.id} className="desk-wl-card">
                  <div className="desk-wl-top">
                    <div className="desk-wl-av" style={{ background: doc?.color || '#64748B' }}>{w.patient[0]}</div>
                    <div className="desk-wl-info">
                      <strong>{w.patient}</strong>
                      <span style={{ color: doc?.color }}>{w.dept}</span>
                    </div>
                    <span className="desk-wl-pos">#{w.pos}</span>
                  </div>
                  <div className="desk-wl-meta">
                    <span><Clock size={11} /> {timeLabel(w.timeOfDay)}</span>
                    <span><Calendar size={11} /> {w.range}</span>
                    <span><ChannelIcon ch={w.channel} /> {w.channel}</span>
                  </div>
                  <span className="desk-wl-phone"><Phone size={11} /> {w.phone}</span>
                  <button className="desk-wl-btn" onClick={() => { console.log("hadi"); sendWhatsappMessage(); }} style={{ background: doc?.color || 'var(--color-primary)' }}>
                    Bildirim Gönder
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Slot Form Modal ── */}
      {form && (
        <SlotForm
          doctor={DOCTORS.find(d => d.id === form.doctorId)}
          time={form.time}
          onSave={(data) => saveAppt(form.doctorId, form.time, data)}
          onClose={() => setForm(null)}
        />
      )}
    </div>
  );
}
