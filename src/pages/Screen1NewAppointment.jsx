import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, AlertTriangle, CheckCircle2, ArrowRight, User, FileText, Check } from 'lucide-react';

export default function Screen1NewAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    notes: ''
  });
  
  const [slotStatus, setSlotStatus] = useState(null); // 'available' | 'full'

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSlotStatus(null); // Reset status when input changes
  };

  const checkAvailability = (e) => {
    e.preventDefault();
    // MOCK LOGIC: If time is 10:00, simulate FULL slot to demonstrate the waitlist feature
    if (formData.time === '10:00') {
      setSlotStatus('full');
    } else {
      setSlotStatus('available');
    }
  };

  const handleBook = () => {
    alert('Randevunuz başarıyla oluşturuldu!');
    navigate('/dashboard');
  };

  const handleJoinWaitlist = () => {
    // Pass context to the waitlist form
    navigate('/waitlist', { state: { ...formData } });
  };

  return (
    <div className="card max-w-2xl mx-auto glass-panel" style={{ padding: '2rem', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)', borderRadius: '16px', background: '#fff', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="text-center" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, letterSpacing: '-0.02em' }}>Yeni Randevu Al</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>Poliklinik, hekim ve saat seçerek randevunuzu hızlıca oluşturun.</p>
      </div>
      
      <form onSubmit={checkAvailability} className="flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Hasta Adı Soyadı *</label>
          <div style={{ position: 'relative' }}>
            <input required type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} className="input-field" placeholder="Hasta adını giriniz..." style={{ paddingLeft: '2.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%' }} />
            <User size={16} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
          </div>
        </div>

        <div className="flex gap-4" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Poliklinik / Bölüm *</label>
            <select required name="department" value={formData.department} onChange={handleInputChange} className="input-field" style={{ borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%', padding: '0 0.75rem' }}>
              <option value="">Seçiniz...</option>
              <option value="Diş Hekimliği">Diş Hekimliği</option>
              <option value="Ortodonti">Ortodonti</option>
              <option value="Psikoloji">Psikoloji</option>
              <option value="Diyetetik">Diyetetik</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Tercih Edilen Hekim (Opsiyonel)</label>
            <select name="doctor" value={formData.doctor} onChange={handleInputChange} className="input-field" disabled={!formData.department} style={{ borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%', padding: '0 0.75rem' }}>
              <option value="">Fark Etmez / İlk Müsait Hekim</option>
              <option value="Dr. Ayşe Smith">Dr. Ayşe Smith</option>
              <option value="Dr. Mehmet Jones">Dr. Mehmet Jones</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Tercih Edilen Tarih *</label>
            <input required type="date" name="date" value={formData.date} onChange={handleInputChange} className="input-field" style={{ borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%', padding: '0 0.75rem' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Tercih Edilen Saat *</label>
            <select required name="time" value={formData.time} onChange={handleInputChange} className="input-field" style={{ borderRadius: '12px', border: '1px solid var(--color-border)', height: '42px', width: '100%', padding: '0 0.75rem' }}>
              <option value="">Seçiniz...</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00 (Denemek için bunu seçin - Bekleme Listesi)</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '0.35rem', display: 'block' }}>Ziyaret Nedeni / Notlar</label>
          <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="input-field" rows="3" placeholder="Randevu için belirtmek istediğiniz şikayet veya notlar..." style={{ borderRadius: '12px', border: '1px solid var(--color-border)', width: '100%', padding: '0.75rem' }}></textarea>
        </div>

        {!slotStatus && (
          <button type="submit" className="btn btn-primary w-full mt-2" style={{ padding: '0.75rem', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }}>
            Randevu Müsaitliğini Kontrol Et
          </button>
        )}
      </form>

      {/* Proactive Waitlist Redirect UI (Amber Alert Box to match Screen 4 waitlist indicator) */}
      {slotStatus === 'full' && (
        <div className="mt-6 p-5 rounded-2xl border" style={{ backgroundColor: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
          <div className="flex items-center gap-2 mb-3" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={20} style={{ color: '#D97706' }} />
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#B45309' }}>⚠️ Seçilen Saat Doludur</h3>
          </div>
          <p className="text-sm" style={{ color: '#B45309', margin: '0 0 1rem 0', lineHeight: 1.6 }}>
            Seçmiş olduğunuz <strong>{formData.time}</strong> saati şu an doludur. Ancak sistemimizdeki alternatif saatleri seçebilir veya **Akıllı Bekleme Listesine** katılarak boşaldığı anda haberdar olabilirsiniz:
          </p>
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid #FEF3C7', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#B45309', display: 'block', marginBottom: '0.5rem' }}>Önerilen Müsait Saatler:</span>
            <ul style={{ listStylePosition: 'inside', fontSize: '0.85rem', color: '#92400E', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>• Aynı Gün saat 11:00'de</li>
              <li>• Aynı Gün saat 14:00'de</li>
              <li>• Sonraki Gün saat 10:00'da</li>
            </ul>
          </div>
          <div className="flex gap-3" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-outline" style={{ borderColor: '#D97706', color: '#D97706', backgroundColor: 'transparent', flex: 1, padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 600 }} onClick={() => setSlotStatus(null)}>Başka Saat Seç</button>
            <button className="btn" style={{ backgroundColor: '#D97706', color: '#fff', flex: 1.2, padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }} onClick={handleJoinWaitlist}>
              Bekleme Listesine Katıl
            </button>
          </div>
        </div>
      )}

      {/* Available Indicator (Green Alert Box to match Screen 4 confirmed badge) */}
      {slotStatus === 'available' && (
        <div className="mt-6 p-5 rounded-2xl border text-center" style={{ backgroundColor: '#D1FAE5', borderColor: '#A7F3D0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
          <div className="flex justify-center mb-2" style={{ display: 'flex', justifyContent: 'center', color: '#059669', marginBottom: '0.5rem' }}>
            <CheckCircle2 size={36} />
          </div>
          <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#065F46' }}>Randevu Saati Uygundur!</h3>
          <p className="text-sm" style={{ color: '#047857', margin: '0 0 1.25rem 0' }}>Seçtiğiniz tarih ve saat dilimi randevu oluşturmanız için müsaittir.</p>
          <button className="btn btn-primary w-full" style={{ padding: '0.75rem', borderRadius: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }} onClick={handleBook}>
            Randevuyu Onayla ve Tamamla <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
