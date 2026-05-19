import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Calendar, Shield, Bell, Brain, Star, Building2,
  CheckCircle, ArrowRight, Users, TrendingUp, Clock, HeartPulse
} from 'lucide-react';
import './LandingPage.css';

const patientBenefits = [
  { icon: <Calendar size={28} />, title: 'Kolay Randevu', desc: 'Dakikalar içinde randevu alın, bekleyiş olmadan.' },
  { icon: <Bell size={28} />, title: 'Akıllı Bildirim', desc: 'WhatsApp, SMS veya sesli arama ile anında haberdar olun.' },
  { icon: <Brain size={28} />, title: 'AI Sağlık Portalı', desc: 'Tahlil ve raporlarınız yapay zeka ile özetlenir.' },
  { icon: <Shield size={28} />, title: 'KVKK Uyumlu', desc: 'Verileriniz Türk hukuku güvencesi altında korunur.' },
];

const clinicBenefits = [
  { icon: <TrendingUp size={28} />, title: 'Slot Doluluk Oranı +%35', desc: 'Akıllı bekleme listesi ile boş kalan randevular otomatik dolar.' },
  { icon: <Users size={28} />, title: 'No-Show\'lar Azalır', desc: '24 saat öncesinden otomatik hatırlatma ile gelmeme oranı düşer.' },
  { icon: <Clock size={28} />, title: 'Resepsiyon Yükü Azalır', desc: 'Manuel aramalar ve takipler sisteme devredilir.' },
  { icon: <HeartPulse size={28} />, title: 'Hasta Memnuniyeti Artar', desc: 'Proaktif iletişim ile hasta sadakati güçlenir.' },
];

const testimonials = [
  { name: 'Ayşe K.', role: 'Hasta', comment: 'Randevum iptal olunca bekleme listesinden anında haberdar edildim. 10 dakika içinde yeni randevum oluştu!', rating: 5 },
  { name: 'Dr. Mehmet T.', role: 'Diş Hekimi', comment: 'Boş kalan slotlarım artık otomatik dolduruluyor. Günlük hasta sayısı belirgin şekilde arttı.', rating: 5 },
  { name: 'Zeynep A.', role: 'Hasta', comment: 'Tahlil sonuçlarımın yapay zeka özeti çok işe yarıyor. Doktora gitmeden önce neyi soracağımı biliyorum.', rating: 5 },
  { name: 'Elif S.', role: 'Klinik Yöneticisi', comment: 'Dashboard ile tüm kliniği tek ekrandan yönetiyorum. No-show oranımız %60 düştü.', rating: 5 },
];

export default function LandingPage() {
  const { login } = useAuth();

  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">🏥 Sağlıkta Yeni Nesil Yönetim</div>
        <h1 className="hero-title">
          Randevularınızı <span className="gradient-text">Yapay Zeka</span> ile Yönetin
        </h1>
        <p className="hero-subtitle">
          HAOS, kliniklerin randevu kaybını sıfıra indiren, hastaların ise sağlık süreçlerini kolayca takip edebildiği akıllı bir sağlık platformudur.
        </p>
        <div className="hero-actions">
          <button className="btn-hero-primary" onClick={() => login('patient')}>
            <HeartPulse size={18} /> Hasta Olarak Giriş Yap
          </button>
          <button className="btn-hero-outline" onClick={() => login('patient')}>
            Hesabınız yok mu? <strong>Kayıt Olun</strong> <ArrowRight size={16} />
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">%92</span><span className="stat-label">Bekleme Listesi Dolum Oranı</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">%60</span><span className="stat-label">No-Show Azalması</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">3 Kanal</span><span className="stat-label">WhatsApp · SMS · Sesli AI</span></div>
        </div>
      </section>

      {/* PATIENT BENEFITS */}
      <section className="section">
        <div className="section-tag">Hastalar İçin</div>
        <h2 className="section-title">Sağlığınızı Artık Daha Kolay Yönetin</h2>
        <div className="benefits-grid">
          {patientBenefits.map((b, i) => (
            <div key={i} className="benefit-card">
              <div className="benefit-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="cta-center">
          <button className="btn-hero-primary" onClick={() => login('patient')}>
            Hemen Başla <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* CLINIC BENEFITS */}
      <section className="section section-dark">
        <div className="section-tag light">Klinikler &amp; Hastaneler İçin</div>
        <h2 className="section-title light">Kliniğinizin Verimliliğini Maksimuma Çıkarın</h2>
        <div className="benefits-grid">
          {clinicBenefits.map((b, i) => (
            <div key={i} className="benefit-card dark">
              <div className="benefit-icon light">{b.icon}</div>
              <h3 style={{ color: '#fff' }}>{b.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="section-tag">Kullanıcı Yorumları</div>
        <h2 className="section-title">Onlar Ne Diyor?</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">{Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />)}</div>
              <p className="testimonial-text">"{t.comment}"</p>
              <div className="testimonial-author">
                <div className="avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNER WITH US */}
      <section className="section partner-section">
        <Building2 size={48} className="partner-icon" />
        <div className="section-tag">Kurumsal İşbirliği</div>
        <h2 className="section-title">Kliniğinizle Birlikte Çalışmak İster Misiniz?</h2>
        <p className="partner-desc">
          HAOS'u kliniğinize entegre edin. Çok şubeli yapılar, diş klinikleri, psikoloji merkezleri ve diyetetik danışma merkezleri için özelleştirilmiş kurumsal çözümler sunuyoruz.
        </p>
        <ul className="partner-list">
          {['Özel departman ve doktor yönetimi', 'Çoklu bildirim kanalı entegrasyonu', 'Gerçek zamanlı admin dashboard', 'KVKK uyumlu veri yönetimi', 'Sınırsız hasta kaydı'].map((item, i) => (
            <li key={i}><CheckCircle size={18} color="#10B981" /> {item}</li>
          ))}
        </ul>
        <button className="btn-hero-primary" onClick={() => login('admin')}>
          Demo Talep Et <ArrowRight size={16} />
        </button>
      </section>

    </div>
  );
}
