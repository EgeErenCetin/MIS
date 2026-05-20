import React, { useState } from 'react';
import { HelpCircle, Phone, Mail, MapPin, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function SupportPage() {
  const [ticket, setTicket] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Akıllı Bekleme Listesi nasıl çalışır?',
      a: 'İstediğiniz poliklinik ve saat dolu olduğunda bekleme listesine katılarak kuyruğa girersiniz. Mevcut bir hasta randevusunu iptal ettiğinde veya hekim planı güncellendiğinde sistem sıradaki ilk hastaya tercih ettiği kanaldan (WhatsApp, SMS vb.) bildirim göndererek onayını talep eder.'
    },
    {
      q: 'Randevumu ne zamana kadar iptal edebilirim?',
      a: 'Randevularınızı planlanan saatten en geç 24 saat öncesine kadar hiçbir ücret ödemeden ve mazeret göstermeden iptal edebilir ya da tarihlerini güncelleyebilirsiniz.'
    },
    {
      q: 'Gemini AI tıbbi özetleri güvenli midir?',
      a: 'Evet, tüm tıbbi belgeleriniz KVKK standartlarına uygun şifrelenmiş olarak analiz edilir. Yapay zeka analizleri tamamen anonim verilerle gerçekleştirilir ve verileriniz kesinlikle modellerin eğitimi için kullanılmaz. İstediğiniz an ayarlar kısmından bu izni kapatabilirsiniz.'
    },
    {
      q: 'Sıra bana geldiğinde ne kadar sürem var?',
      a: 'Sıra size geldiğinde size gönderilen bildirimdeki onay butonuna basarak randevuyu tamamlamak için 15 dakika süreniz bulunmaktadır. Bu süre zarfında onaylanmayan randevular sıradaki diğer hastaya devredilir.'
    }
  ];

  return (
    <div className="flex-col gap-6 max-w-4xl mx-auto w-full" style={{ padding: '2rem 0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="inline-flex p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-3" style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#EEF2FF', borderRadius: '16px', color: 'var(--color-primary)' }}>
          <HelpCircle size={32} />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, letterSpacing: '-0.02em' }}>Destek & İletişim</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: '0.35rem 0 0 0' }}>Sorularınızı yanıtlamak ve size yardımcı olmak için buradayız.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', width: '100%' }}>
        
        {/* Contact Info and FAQ (Left Side) */}
        <div style={{ flex: 1.2, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* FAQ List */}
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1.25rem 0', color: 'var(--color-text-main)' }}>Sıkça Sorulan Sorular</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '0.75rem' }}>
                  <button 
                    onClick={() => toggleFaq(i)}
                    style={{ 
                      width: '100%', 
                      background: 'none', 
                      border: 'none', 
                      textAlign: 'left', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      fontWeight: 600, 
                      color: openFaq === i ? 'var(--color-primary)' : 'var(--color-text-main)', 
                      cursor: 'pointer',
                      padding: '0.5rem 0',
                      fontSize: '0.9rem'
                    }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openFaq === i && (
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>Diğer İletişim Kanallarımız</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
              <Phone size={16} className="text-primary" />
              <span>+90 (212) 555 42 67</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
              <Mail size={16} className="text-primary" />
              <span>destek@haos.com.tr</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
              <MapPin size={16} className="text-primary" style={{ marginTop: '0.2rem' }} />
              <span>HAOS Genel Merkezi, Maslak Teknokent B Blok No:4, İstanbul</span>
            </div>
          </div>

        </div>

        {/* Support Request Form (Right Side) */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {submitted ? (
            <div className="card text-center" style={{ padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: '#ECFDF5', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: '#059669', marginBottom: '1rem' }}>
                <CheckCircle2 size={48} className="animate-bounce" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065F46', margin: '0 0 0.5rem 0' }}>Destek Talebiniz Alındı!</h3>
              <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: '#047857', lineHeight: 1.6 }}>
                Destek talebiniz <strong>#T-{Math.floor(100000 + Math.random() * 900000)}</strong> referans koduyla başarıyla oluşturulmuştur. Ekibimiz en geç 2 saat içinde <strong>{ticket.email}</strong> adresinize dönüş yapacaktır.
              </p>
              <button className="btn btn-primary w-full" style={{ padding: '0.6rem 1.25rem', borderRadius: '12px', border: 'none', cursor: 'pointer' }} onClick={() => { setSubmitted(false); setTicket({ name: '', email: '', subject: '', message: '' }); }}>
                Yeni Talep Oluştur
              </button>
            </div>
          ) : (
            <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1.25rem 0', color: 'var(--color-text-main)' }}>Destek Talebi Gönder</h3>
              
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="label" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.25rem', display: 'block' }}>Adınız Soyadınız *</label>
                  <input required type="text" name="name" value={ticket.name} onChange={handleInputChange} className="input-field" placeholder="Örn: Ege Eren" style={{ borderRadius: '12px', height: '40px', width: '100%', border: '1px solid var(--color-border)', padding: '0 0.75rem' }} />
                </div>
                
                <div>
                  <label className="label" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.25rem', display: 'block' }}>E-Posta Adresiniz *</label>
                  <input required type="email" name="email" value={ticket.email} onChange={handleInputChange} className="input-field" placeholder="Orn: eposta@adresiniz.com" style={{ borderRadius: '12px', height: '40px', width: '100%', border: '1px solid var(--color-border)', padding: '0 0.75rem' }} />
                </div>

                <div>
                  <label className="label" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.25rem', display: 'block' }}>Destek Konusu *</label>
                  <select required name="subject" value={ticket.subject} onChange={handleInputChange} className="input-field" style={{ borderRadius: '12px', height: '40px', width: '100%', border: '1px solid var(--color-border)', padding: '0 0.75rem' }}>
                    <option value="">Seçiniz...</option>
                    <option value="randevu">Randevu Değişikliği / İptali</option>
                    <option value="waitlist">Bekleme Listesi Sıralaması</option>
                    <option value="portal">Sağlık Portalı / Gemini AI Raporları</option>
                    <option value="teknik">Sistem / Teknik Hatalar</option>
                  </select>
                </div>

                <div>
                  <label className="label" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.25rem', display: 'block' }}>Açıklama / Mesajınız *</label>
                  <textarea required name="message" value={ticket.message} onChange={handleInputChange} className="input-field" rows="4" placeholder="Size nasıl yardımcı olabileceğimizi detaylıca açıklayınız..." style={{ borderRadius: '12px', width: '100%', border: '1px solid var(--color-border)', padding: '0.75rem' }}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '12px', fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                  Gönder <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
