import React from 'react';
import { FileText, CheckCircle, AlertOctagon, Scale, ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex-col gap-6 max-w-3xl mx-auto w-full" style={{ padding: '2rem 0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="inline-flex p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-3" style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#EEF2FF', borderRadius: '16px', color: 'var(--color-primary)' }}>
          <FileText size={32} />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, letterSpacing: '-0.02em' }}>Kullanım Şartları</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: '0.35rem 0 0 0' }}>HAOS platformunu kullanırken uymanız gereken genel kurallar ve şartlar.</p>
      </div>

      <div className="card" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Section 1 */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600" style={{ display: 'flex', padding: '0.5rem', backgroundColor: '#EEF2FF', borderRadius: '12px', color: 'var(--color-primary)' }}>
            <Scale size={20} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>1. Kabul Edilebilir Kullanım</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              HAOS platformu, hastaların randevu alma süreçlerini optimize etmek ve yönetmek üzere tasarlanmıştır. Sisteme sahte hesaplar, yanlış veya yanıltıcı tıbbi belgeler yüklenmesi ve sistemi suistimal edecek sıklıkta asılsız bekleme listesi kaydı oluşturulması yasaktır.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600" style={{ display: 'flex', padding: '0.5rem', backgroundColor: '#EEF2FF', borderRadius: '12px', color: 'var(--color-primary)' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>2. Randevu ve İptal Şartları</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Kullanıcılar randevularını planlanan tarihten en az **24 saat öncesine kadar** sistem üzerinden ücretsiz olarak erteleyebilir ya da iptal edebilirler. Mazeretsiz olarak gelinmeyen randevular "No-Show" (Gelmedi) olarak işaretlenir ve bu durum bekleme listesi önceliğinizi etkileyebilir.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600" style={{ display: 'flex', padding: '0.5rem', backgroundColor: '#EEF2FF', borderRadius: '12px', color: 'var(--color-primary)' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>3. Akıllı Bekleme Listesi Kuralları</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Akıllı bekleme listesindeki konumunuz poliklinik doluluk oranları, iptal edilen randevular ve talep edilen tarihlere göre dinamik olarak hesaplanır. Sıra size geldiğinde tercih ettiğiniz bildirim kanalına bildirim iletilir. Size ayrılan rezerve süresi içinde randevuyu onaylamamanız halinde sıra bir sonraki hastaya aktarılır.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600" style={{ display: 'flex', padding: '0.5rem', backgroundColor: '#EEF2FF', borderRadius: '12px', color: 'var(--color-primary)' }}>
            <AlertOctagon size={20} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>4. Tıbbi Feragatname (Disclaimer)</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              HAOS Sağlık Portalı üzerindeki Gemini AI tahlil ve doküman analizleri tamamen otomatik özetleme amaçlıdır. **Hiçbir yapay zeka çıktısı, profesyonel bir tıbbi teşhis, tedavi veya klinik muayene kararı yerine geçemez.** Acil tıbbi durumlarda lütfen derhal 112 Acil Yardım hattını arayınız.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
