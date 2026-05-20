import React from 'react';
import { Shield, Eye, Lock, FileCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="flex-col gap-6 max-w-3xl mx-auto w-full" style={{ padding: '2rem 0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="inline-flex p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-3" style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#EEF2FF', borderRadius: '16px', color: 'var(--color-primary)' }}>
          <Shield size={32} />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, letterSpacing: '-0.02em' }}>Gizlilik Politikası</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: '0.35rem 0 0 0' }}>Kişisel verilerinizin ve tıbbi kayıtlarınızın korunması en yüksek önceliğimizdir.</p>
      </div>

      <div className="card" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Section 1 */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600" style={{ display: 'flex', padding: '0.5rem', backgroundColor: '#EEF2FF', borderRadius: '12px', color: 'var(--color-primary)' }}>
            <Lock size={20} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>1. Veri Güvenliği ve Şifreleme</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              HAOS platformu üzerindeki tüm hasta kayıtları, randevu bilgileri ve tıbbi belgeler endüstri standardı uçtan uca şifreleme (AES-256) algoritmalarıyla korunmaktadır. Verileriniz, sunucularımızda ve veri tabanımızda güvenli bir şekilde saklanır.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600" style={{ display: 'flex', padding: '0.5rem', backgroundColor: '#EEF2FF', borderRadius: '12px', color: 'var(--color-primary)' }}>
            <Eye size={20} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>2. Kişisel Verilerin İşlenmesi (KVKK)</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, adınız, telefon numaranız ve randevu detaylarınız sadece size en iyi sağlık hizmetini sunmak, bilgilendirme SMS/WhatsApp bildirimlerini iletmek amacıyla işlenmektedir. Verileriniz üçüncü şahıslarla asla paylaşılmaz.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600" style={{ display: 'flex', padding: '0.5rem', backgroundColor: '#EEF2FF', borderRadius: '12px', color: 'var(--color-primary)' }}>
            <Shield size={20} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>3. Yapay Zeka Özetleme İzni</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Sağlık Portalınız üzerinden yüklediğiniz tıbbi PDF analizleri, yalnızca sizin **"AI Özetlerini Etkinleştir"** onayınız doğrultusunda Gemini AI modelleriyle analiz edilmektedir. Bu analizler anonimleştirilmiş verilerle yapılır ve yapay zeka modellerinin genel eğitimi için kullanılmaz.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600" style={{ display: 'flex', padding: '0.5rem', backgroundColor: '#EEF2FF', borderRadius: '12px', color: 'var(--color-primary)' }}>
            <FileCheck size={20} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>4. Haklarınız ve İletişim</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Dilediğiniz an sistemdeki tıbbi kayıtlarınızın tamamen silinmesini talep edebilir, veri işleme onaylarınızı iptal edebilirsiniz. Bu konudaki tüm talepleriniz için **Destek** sayfamızdan bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
