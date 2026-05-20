import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, MessageSquare, Phone, Sparkles, CheckCircle2, Calendar, User, UserCheck } from 'lucide-react';

export default function Screen2WaitlistJoin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    department: '',
    doctor: '',
    startDate: '',
    endDate: '',
    timeOfDay: 'any',
    notificationChannel: 'whatsapp'
  });
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill data if navigated from the Appointment form
  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        patientName: location.state.patientName || '',
        department: location.state.department || '',
        doctor: location.state.doctor || '',
        startDate: location.state.date || '',
        endDate: location.state.date || '',
      }));
    }
  }, [location]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card max-w-lg mx-auto glass-panel text-center" style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '16px', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div className="flex justify-center mb-4" style={{ display: 'flex', justifyContent: 'center', color: '#059669', marginBottom: '1rem' }}>
          <CheckCircle2 size={48} className="animate-bounce" />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#065F46', margin: '0 0 0.5rem 0' }}>Akıllı Bekleme Listesindesiniz!</h2>
        <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
          <strong>{formData.department}</strong> bölümü için bekleme sırasında <strong>#3.</strong> sıradasınız.
        </p>
        <p className="text-sm text-gray-500" style={{ margin: '0 0 2rem 0', lineHeight: 1.6 }}>
          <strong>{formData.startDate}</strong> ile <strong>{formData.endDate}</strong> tarihleri arasında bir randevu slotu boşaldığı anda sizi tercih ettiğiniz <strong>{formData.notificationChannel.toUpperCase()}</strong> kanalı üzerinden anında bilgilendireceğiz.
        </p>
        <button className="btn btn-primary w-full" style={{ padding: '0.75rem', borderRadius: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          Randevularıma Git
        </button>
      </div>
    );
  }

  return (
    <div className="card max-w-2xl mx-auto glass-panel" style={{ padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '16px', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="text-center" style={{ marginBottom: '2rem' }}>
        <div className="inline-flex p-2 bg-indigo-50 rounded-xl text-indigo-600 mb-3" style={{ display: 'inline-flex', padding: '0.5rem', backgroundColor: '#EEF2FF', borderRadius: '12px', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
          <Sparkles size={24} />
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, letterSpacing: '-0.02em' }}>Akıllı Bekleme Listesine Katıl</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>Sıra size geldiğinde otomatik bildirim kanalları ile anında haberdar olun.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Hasta Adı Soyadı *</label>
          <div style={{ position: 'relative' }}>
            <input required type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} className="input-field" placeholder="Adınızı giriniz..." style={{ paddingLeft: '2.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%' }} />
            <User size={16} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
          </div>
        </div>

        <div className="flex gap-4" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Poliklinik / Bölüm *</label>
            <input required type="text" name="department" value={formData.department} onChange={handleInputChange} className="input-field" placeholder="Örn: Diş Hekimliği" style={{ borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%', padding: '0 0.75rem' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Tercih Edilen Hekim</label>
            <input type="text" name="doctor" value={formData.doctor} onChange={handleInputChange} className="input-field" placeholder="Fark Etmez" style={{ borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%', padding: '0 0.75rem' }} />
          </div>
        </div>

        <div className="flex gap-4" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Takip Başlangıç Tarihi *</label>
            <input required type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="input-field" style={{ borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%', padding: '0 0.75rem' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Takip Bitiş Tarihi *</label>
            <input required type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="input-field" style={{ borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%', padding: '0 0.75rem' }} />
          </div>
        </div>

        <div>
          <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Günlük Tercih Edilen Zaman Dilimi</label>
          <select name="timeOfDay" value={formData.timeOfDay} onChange={handleInputChange} className="input-field" style={{ borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%', padding: '0 0.75rem' }}>
            <option value="any">Fark Etmez (Tüm Gün)</option>
            <option value="morning">Sabah (09:00 - 12:00)</option>
            <option value="afternoon">Öğleden Sonra (13:00 - 17:00)</option>
          </select>
        </div>

        <div className="mt-2">
          <label className="label mb-2" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.75rem', display: 'block' }}>Sizinle Nasıl İletişim Kuralım? (Bildirim Kanalı) *</label>
          <div className="flex gap-4" style={{ display: 'flex', gap: '1rem' }}>
            
            <label className="sidebar-link" style={{ flex: 1, border: formData.notificationChannel === 'whatsapp' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', backgroundColor: formData.notificationChannel === 'whatsapp' ? 'rgba(79, 70, 229, 0.04)' : 'transparent' }}>
              <input type="radio" name="notificationChannel" value="whatsapp" checked={formData.notificationChannel === 'whatsapp'} onChange={handleInputChange} style={{ display: 'none' }} />
              <div className="p-2 rounded-full inline-flex" style={{ backgroundColor: 'rgba(37, 211, 102, 0.08)', marginBottom: '0.5rem', display: 'inline-flex' }}>
                <MessageCircle size={24} color="#25D366" />
              </div>
              <span className="text-sm font-semibold" style={{ display: 'block', color: formData.notificationChannel === 'whatsapp' ? 'var(--color-primary)' : 'var(--color-text-main)' }}>WhatsApp</span>
            </label>
            
            <label className="sidebar-link" style={{ flex: 1, border: formData.notificationChannel === 'sms' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', backgroundColor: formData.notificationChannel === 'sms' ? 'rgba(79, 70, 229, 0.04)' : 'transparent' }}>
              <input type="radio" name="notificationChannel" value="sms" checked={formData.notificationChannel === 'sms'} onChange={handleInputChange} style={{ display: 'none' }} />
              <div className="p-2 rounded-full inline-flex" style={{ backgroundColor: 'rgba(14, 165, 233, 0.08)', marginBottom: '0.5rem', display: 'inline-flex' }}>
                <MessageSquare size={24} color="#0EA5E9" />
              </div>
              <span className="text-sm font-semibold" style={{ display: 'block', color: formData.notificationChannel === 'sms' ? 'var(--color-primary)' : 'var(--color-text-main)' }}>SMS</span>
            </label>
            
            <label className="sidebar-link" style={{ flex: 1, border: formData.notificationChannel === 'voice' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', backgroundColor: formData.notificationChannel === 'voice' ? 'rgba(79, 70, 229, 0.04)' : 'transparent' }}>
              <input type="radio" name="notificationChannel" value="voice" checked={formData.notificationChannel === 'voice'} onChange={handleInputChange} style={{ display: 'none' }} />
              <div className="p-2 rounded-full inline-flex" style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', marginBottom: '0.5rem', display: 'inline-flex' }}>
                <Phone size={24} color="#F59E0B" />
              </div>
              <span className="text-sm font-semibold" style={{ display: 'block', color: formData.notificationChannel === 'voice' ? 'var(--color-primary)' : 'var(--color-text-main)' }}>Sesli Yapay Zeka</span>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4" style={{ padding: '0.75rem', borderRadius: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }}>
          Bekleme Listesine Kaydol <UserCheck size={18} />
        </button>
      </form>
    </div>
  );
}
