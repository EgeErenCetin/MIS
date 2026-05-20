import React, { useState } from 'react';
import { FileText, Lock, UploadCloud, BrainCircuit, Sparkles, Check, Settings2, Info, RefreshCw, Key, AlertCircle, Copy, Printer, CheckCircle2, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Screen5HealthPortal() {
  const { user } = useAuth();
  
  // States
  const [hasAiConsent, setHasAiConsent] = useState(true);
  const [liveResponse, setLiveResponse] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [apiErrors, setApiErrors] = useState({});
  const [tempApiKey, setTempApiKey] = useState('');
  const [selectedMockDoc, setSelectedMockDoc] = useState(null);
  const [copiedMap, setCopiedMap] = useState({});
  
  // Mock data + dynamic user uploads
  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: 'Kan_Tahlili_Sonuclari_Mayis_2026.pdf', 
      date: '2026-05-19', 
      summary: 'Kapsamlı metabolik paneliniz ve tam kan sayımınız (Hemogram) tamamen normal sınırlar içerisindedir. Vitamin D seviyeniz hafif derecede düşük çıkmıştır; doktorunuzun kontrolünde takviye düşünebilirsiniz. Kolesterol değerleriniz son derece sağlıklıdır.' 
    },
    { 
      id: 2, 
      name: 'Dental_Rontgen_Raporu.pdf', 
      date: '2026-02-14', 
      summary: 'Herhangi bir yeni çürük oluşumu tespit edilmemiştir. Alt ön dişlerin arkasında hafif derecede tartar (diş taşı) birikimi gözlenmiştir; rutin diş taşı temizliği önerilir. Yirmilik yaş dişlerinizin durumu stabil ve semptomsuzdur.' 
    }
  ]);

  const toggleConsent = () => setHasAiConsent(!hasAiConsent);

  // Dynamic file upload handler for patients
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      
      const newDoc = {
        id: Date.now(),
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        summary: `Yüklediğiniz "${file.name}" belgesi sisteme başarıyla kaydedildi. Canlı yapay zeka tahlil analizi için yanındaki "İncele" butonuna tıklayabilirsiniz.`,
        fileUrl: URL.createObjectURL(file), // Magic: Browser object url to display the real PDF!
        base64Data: base64String, // Base64 representation of the uploaded PDF file
        isUploaded: true
      };

      setDocuments([newDoc, ...documents]);
    };
    reader.readAsDataURL(file);
  };

  // View document details or open real PDF
  const handleViewDocument = (doc) => {
    if (doc.fileUrl) {
      window.open(doc.fileUrl, '_blank');
    } else {
      setSelectedMockDoc(doc);
    }
  };

  // Trigger Live Gemini API call
  const examineDocument = async (doc) => {
    if (!hasAiConsent) {
      alert('Lütfen yapay zeka analizlerini kullanabilmek için yukarıdan Yapay Zeka Portalı İznini aktif hale getirin.');
      return;
    }

    setLoadingMap(prev => ({ ...prev, [doc.id]: true }));
    setApiErrors(prev => ({ ...prev, [doc.id]: null }));
    setLiveResponse(prev => ({ ...prev, [doc.id]: null }));

    // Prepare simulated text if it is a mock document so Gemini can perform a real live analysis of it!
    let customPrompt = `Aşağıdaki tıbbi tahlil raporunu detaylıca analiz et. Bulunan değerleri anlaşılır, sakinleştirici, tıbbi bir otorite yerine dostane bir dille hastaya açıkla.
    Formatlama kuralları:
    - Sonuçları başlıklar halinde incele (Örn: "### 1. Genel Bulgular", "### 2. Vitamin Değerleri" gibi).
    - Önemli vurguları ve test isimlerini kalın (**test adı**) yaz.
    - Düşük olan Vitamin D değerine dikkat çekerek sağlıklı yaşam önerileri sun (Güneşlenme, somon, yumurta vb.).
    - Sonuna bunun kesinlikle bir resmi tanı olmadığını ve hekime danışılması gerektiğini nazikçe hatırlat. \n\n`;

    if (!doc.isUploaded) {
      if (doc.id === 1) {
        customPrompt += `[Tahlil Değerleri]: Hemogram (HGB): 14.2 g/dL (Normal), Vitamin D (25-OH): 19.4 ng/mL (Düşük, Ref: 30-100), Kolesterol Total: 185 mg/dL (Normal).`;
      } else if (doc.id === 2) {
        customPrompt += `[Tahlil Değerleri]: Ortodonti Röntgen İncelemesi: Herhangi bir çürük saptanmamıştır, alt ön dişlerde hafif diş taşı (tartar) mevcuttur.`;
      }
    } else {
      customPrompt += `[Tahlil Belgesi]: ${doc.name}`;
    }

    try {
      const response = await fetch('http://localhost:5000/api/examine-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentName: doc.name,
          base64Data: doc.base64Data || null, // Sends real base64 PDF data to Gemini multimodal API!
          prompt: customPrompt,
          customApiKey: tempApiKey // Sends temporary input key if provided
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setLiveResponse(prev => ({ ...prev, [doc.id]: data.text }));
      } else {
        setApiErrors(prev => ({ 
          ...prev, 
          [doc.id]: {
            code: data.error,
            message: data.message
          } 
        }));
      }
    } catch (error) {
      setApiErrors(prev => ({ 
        ...prev, 
        [doc.id]: {
          code: 'CONNECTION_ERROR',
          message: 'Yerel API sunucusuna bağlanılamadı. Lütfen sunucunun (npm run server) 5000 portunda çalıştığından emin olun.'
        } 
      }));
    } finally {
      setLoadingMap(prev => ({ ...prev, [doc.id]: false }));
    }
  };

  // Simulate response if key is missing and user clicks "Simüle Et"
  const simulateResponse = (docId) => {
    setLoadingMap(prev => ({ ...prev, [docId]: true }));
    setApiErrors(prev => ({ ...prev, [docId]: null }));
    
    setTimeout(() => {
      setLiveResponse(prev => ({ 
        ...prev, 
        [docId]: `### 1. Genel Bulgular ve Hemogram
Kapsamlı metabolik tahlilinizde **Hemogram (HGB)** değeriniz **14.2 g/dL** ölçülmüştür. Bu değer sağlıklı referans aralığında (12.0 - 16.0) olup kan değerlerinizin son derece güçlü olduğunu göstermektedir.
Total **Kolesterol** değeriniz ise **185 mg/dL** ile ideal sınır olan 200 mg/dL'nin altında kalmış, kalp ve damar sağlığınız için mükemmel bir seviyededir.

### 2. Vitamin Seviyeleri ve Vitamin D Uyarısı
Tahlilinizde dikkat çeken tek bulgu **Vitamin D (25-OH)** seviyenizin **19.4 ng/mL** çıkmasıdır. Sağlıklı bir bağışıklık ve kemik metabolizması için bu değerin **30.0 - 100.0 ng/mL** arasında olması önerilir. Değeriniz normal sınırların biraz altında kalmıştır.

### 3. Sağlıklı Yaşam Önerilerimiz
* **Güneş Işığı**: Her gün düzenli olarak 15-20 dakika cildinizi doğrudan güneş ışığıyla buluşturmaya özen gösterin.
* **Beslenme Düzeni**: Somon, ton balığı gibi yağlı balıklar, yumurta sarısı ve Vitamin D ile zenginleştirilmiş gıdaları öğünlerinize ekleyin.
* **Hekim Kontrolü**: Hekiminizin uygun göreceği dozda Vitamin D3 damla veya takviyesi kullanmanız bu eksikliği hızlıca giderecektir.

*Bilgilendirme: Bu analiz tamamen yapay zeka yardımıyla hazırlanmış olup, kesinlikle resmi bir tıbbi tanı veya tedavi planı değildir. En doğru yönlendirme için lütfen klinik doktorunuza danışınız.*` 
      }));
      setLoadingMap(prev => ({ ...prev, [docId]: false }));
    }, 1000);
  };

  // Format Markdown-like output into highly styled and responsive React Elements
  const formatAiResponse = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, index) => {
      let trimmed = line.trim();
      if (!trimmed) return <div key={index} style={{ height: '0.75rem' }} />;
      
      // Section Headers
      if (trimmed.startsWith('###') || trimmed.startsWith('##') || trimmed.startsWith('#')) {
        const cleanText = trimmed.replace(/#/g, '').trim().replace(/\*\*/g, '');
        return (
          <h4 key={index} style={{ fontSize: '1.05rem', fontWeight: 800, color: '#4C1D95', margin: '1.5rem 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '4px', height: '14px', backgroundColor: '#8B5CF6', borderRadius: '4px', display: 'inline-block' }} />
            {cleanText}
          </h4>
        );
      }
      
      // Bullet list items
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        let cleanText = trimmed.substring(1).trim();
        const parts = cleanText.split('**');
        return (
          <div key={index} style={{ display: 'flex', gap: '0.5rem', margin: '0.4rem 0 0.4rem 1.25rem', alignItems: 'start', fontSize: '0.875rem', lineHeight: 1.6, color: '#4B5563' }}>
            <span style={{ color: '#8B5CF6', marginTop: '0.45rem', fontSize: '0.55rem' }}>●</span>
            <span>
              {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} style={{ color: '#4C1D95', fontWeight: 700 }}>{part}</strong> : part)}
            </span>
          </div>
        );
      }
      
      // Ordinary text paragraphs with inline bold styling
      const parts = trimmed.split('**');
      return (
        <p key={index} style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.75 }}>
          {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} style={{ color: '#312E81', fontWeight: 700 }}>{part}</strong> : part)}
        </p>
      );
    });
  };

  // Copy Analysis to clipboard
  const handleCopyReport = (docId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedMap(prev => ({ ...prev, [docId]: true }));
    setTimeout(() => {
      setCopiedMap(prev => ({ ...prev, [docId]: false }));
    }, 2000);
  };

  // Print single analysis report card
  const handlePrintReport = (docName) => {
    window.print();
  };

  return (
    <div className="flex-col gap-6 max-w-4xl mx-auto w-full" style={{ padding: '1rem 0', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* Header Bar */}
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-text-main)' }}>Hasta Sağlık Portalı</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>Tıbbi raporlarınızı ve tahlil sonuçlarınızın yapay zeka analizlerini görüntüleyin.</p>
        </div>
        {user?.role === 'patient' && (
          <label className="btn btn-primary animate-pulse" style={{ borderRadius: '12px', padding: '0.625rem 1.25rem', fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)' }}>
            <UploadCloud size={16} /> PDF Tahlil Yükle
            <input type="file" accept="application/pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        )}
      </div>
      
      {user?.role === 'patient' && (
        <div className="flex items-center gap-4 p-4 border border-indigo-100 rounded-2xl glass-panel mb-4" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)', borderLeft: '4px solid var(--color-primary)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div className="p-2 bg-white rounded-xl text-indigo-600" style={{ boxShadow: '0 2px 6px rgba(79,70,229,0.05)', display: 'inline-flex' }}>
            <Settings2 size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Yapay Zeka Portalı Ayarları</h4>
            <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Tıbbi raporlarınız için yapay zeka tarafından otomatik özet ve analizler üretilmesini kontrol edin.</p>
          </div>
          <button 
            className="btn"
            style={{ 
              backgroundColor: hasAiConsent ? 'var(--color-primary)' : 'transparent', 
              color: hasAiConsent ? 'white' : 'var(--color-primary)',
              border: '2px solid var(--color-primary)',
              borderRadius: '9999px',
              padding: '0.5rem 1.25rem',
              fontWeight: 600,
              boxShadow: hasAiConsent ? '0 4px 12px rgba(79, 70, 229, 0.15)' : 'none',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
            onClick={toggleConsent}
          >
            {hasAiConsent ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Check size={14} /> AI Özetleri Aktif</span>
            ) : (
              'AI Özetlerini Etkinleştir'
            )}
          </button>
        </div>
      )}

      {/* Global API Key helper field for easy debugging and testing */}
      {user?.role === 'patient' && (
        <div className="p-4 border rounded-2xl mb-6 flex-col gap-2" style={{ backgroundColor: '#F8FAFC', borderColor: 'var(--color-border)', display: 'flex', gap: '0.75rem', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
          <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={18} className="text-primary" />
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>Opsiyonel: Hızlı Test İçin Gemini API Key Girin</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
            Eğer projenin kök dizinindeki <code>.env</code> dosyasına <code>GEMINI_API_KEY</code> henüz tanımlamadıysanız, tarayıcıyı yenileyene kadar geçerli olacak API anahtarını buraya girerek <strong>"İncele"</strong> butonunu anında canlı olarak test edebilirsiniz.
          </p>
          <input 
            type="password" 
            placeholder="Aura / Gemini API Anahtarı girin..." 
            value={tempApiKey} 
            onChange={(e) => setTempApiKey(e.target.value)} 
            style={{ 
              width: '100%', 
              height: '38px', 
              borderRadius: '8px', 
              border: '1px solid var(--color-border)', 
              padding: '0 0.75rem', 
              fontSize: '0.8rem',
              boxSizing: 'border-box'
            }} 
          />
        </div>
      )}

      {/* Documents List */}
      <div className="flex-col gap-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {documents.map(doc => (
          <div key={doc.id} className="card glass-panel flex-col gap-4" style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '16px', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Document Header */}
            <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px dashed var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="p-3 bg-red-50 rounded-2xl text-red-600" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{doc.name}</h4>
                  <span className="text-xs text-gray-500" style={{ display: 'block', marginTop: '0.15rem' }}>Yüklenme Tarihi: {doc.date}</span>
                </div>
              </div>
              <div className="flex gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-outline" 
                  style={{ fontSize: '0.78rem', padding: '0.4rem 1rem', borderRadius: '8px', fontWeight: 600 }}
                  onClick={() => handleViewDocument(doc)}
                >
                  Belgeyi Görüntüle
                </button>
                <button 
                  className="btn" 
                  style={{ 
                    fontSize: '0.78rem', 
                    padding: '0.4rem 1rem', 
                    borderRadius: '8px', 
                    fontWeight: 700, 
                    backgroundColor: '#FAF5FF', 
                    color: '#7C3AED', 
                    border: '1px solid #E9D5FF',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }} 
                  onClick={() => examineDocument(doc)}
                  disabled={loadingMap[doc.id]}
                >
                  {loadingMap[doc.id] ? (
                    <RefreshCw size={12} className="animate-spin" />
                  ) : (
                    <Sparkles size={12} />
                  )}
                  İncele
                </button>
              </div>
            </div>

            {/* Live Gemini API Output Box */}
            {(loadingMap[doc.id] || liveResponse[doc.id] || apiErrors[doc.id]) && (
              <div className="rounded-2xl p-5 border relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FAF5FF 0%, #EEF2FF 100%)', borderColor: '#E9D5FF', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.03)' }}>
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <BrainCircuit size={120} />
                </div>
                
                <div className="flex items-center justify-between mb-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(124, 58, 237, 0.1)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BrainCircuit size={20} style={{ color: '#7C3AED' }} />
                    <h5 style={{ margin: 0, fontWeight: 800, color: '#5B21B6', fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                      Canlı Gemini AI Belge Analiz Raporu
                    </h5>
                  </div>
                  {loadingMap[doc.id] && (
                    <span className="badge" style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED', fontWeight: 700, fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                      <RefreshCw size={10} className="animate-spin" /> Gemini Analiz Ediyor...
                    </span>
                  )}
                  {liveResponse[doc.id] && !loadingMap[doc.id] && (
                    <span className="badge" style={{ backgroundColor: '#ECFDF5', color: '#059669', fontWeight: 700, fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid #A7F3D0' }}>
                      <CheckCircle2 size={10} /> Başarılı
                    </span>
                  )}
                </div>

                <div className="relative z-10" style={{ minHeight: '60px' }}>
                  {loadingMap[doc.id] && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 0', gap: '0.75rem' }}>
                      <p className="animate-pulse" style={{ margin: 0, fontSize: '0.85rem', color: '#6B21A8', fontWeight: 600 }}>Gemini tıbbi laboratuvar verilerini çözümlüyor, analiz oluşturuluyor... 🧠✨</p>
                    </div>
                  )}

                  {liveResponse[doc.id] && !loadingMap[doc.id] && (
                    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(124, 58, 237, 0.15)', boxShadow: '0 2px 8px rgba(0,0,0,0.01)', marginBottom: '1rem' }}>
                      
                      {/* Clinical Stamp watermark overlay */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8B5CF6' }}>
                          <Heart size={14} className="fill-current text-primary" />
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>HAOS Tıbbi Yapay Zeka Raporu</span>
                        </div>
                        <span style={{ fontSize: '0.68rem', color: '#9CA3AF', fontWeight: 500 }}>
                          ID: #{doc.id.toString().substring(0, 6)}
                        </span>
                      </div>

                      {/* Render beautiful parsed markdown list and sections */}
                      <div className="ai-report-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {formatAiResponse(liveResponse[doc.id])}
                      </div>

                      {/* Print and Copy Action Bar */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px dashed #E5E7EB', paddingTop: '1rem' }}>
                        <button 
                          onClick={() => handleCopyReport(doc.id, liveResponse[doc.id])}
                          style={{
                            background: '#F9FAFB',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            padding: '0.4rem 0.85rem',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: '#4B5563',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.2s'
                          }}
                          className="btn-hover-gray"
                        >
                          {copiedMap[doc.id] ? <Check size={12} style={{ color: '#059669' }} /> : <Copy size={12} />}
                          {copiedMap[doc.id] ? 'Kopyalandı!' : 'Metni Kopyala'}
                        </button>
                        <button 
                          onClick={() => handlePrintReport(doc.name)}
                          style={{
                            background: '#F9FAFB',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            padding: '0.4rem 0.85rem',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: '#4B5563',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.2s'
                          }}
                          className="btn-hover-gray"
                        >
                          <Printer size={12} />
                          Yazdır / Kaydet
                        </button>
                      </div>

                    </div>
                  )}

                  {liveResponse[doc.id] && !loadingMap[doc.id] && (
                    <div className="flex gap-2 items-start" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <Info size={12} style={{ color: '#8B5CF6', marginTop: '0.15rem', flexShrink: 0 }} />
                      <p style={{ margin: 0, fontSize: '0.72rem', color: '#7C3AED', fontStyle: 'italic', opacity: 0.85, lineHeight: 1.4 }}>
                        Bilgilendirme: Bu analiz tamamen yapay zeka yardımıyla otomatik hazırlanmıştır. Kesinlikle bir doktor tahlil muayenesi veya teşhis kararı yerine geçmez.
                      </p>
                    </div>
                  )}

                  {apiErrors[doc.id] && !loadingMap[doc.id] && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#991B1B' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={16} />
                        <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Entegrasyon Uyarısı: {apiErrors[doc.id].code}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.5, color: '#991B1B' }}>
                        {apiErrors[doc.id].message}
                      </p>
                      
                      {apiErrors[doc.id].code === 'GEMINI_API_KEY_MISSING' && (
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                          <button 
                            className="btn" 
                            style={{ 
                              fontSize: '0.75rem', 
                              padding: '0.35rem 0.75rem', 
                              borderRadius: '6px', 
                              backgroundColor: '#B45309', 
                              color: 'white', 
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: 600
                            }}
                            onClick={() => simulateResponse(doc.id)}
                          >
                            Simüle Et (Hızlı Gösterim)
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Static Mock Summary Card */}
            <div className="rounded-2xl p-5 border relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)', borderColor: '#E2E8F0' }}>
              <div className="flex items-center justify-between mb-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BrainCircuit size={20} style={{ color: '#64748B' }} />
                  <h5 style={{ margin: 0, fontWeight: 700, color: '#334155', fontSize: '0.95rem' }}>
                    Sistem Kayıtlı Tıbbi Analiz Özeti
                  </h5>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                {doc.summary}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Mock PDF laboratory report modal */}
      {selectedMockDoc && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{
            maxWidth: '600px',
            width: '100%',
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedMockDoc(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              ×
            </button>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #F3F4F6', paddingBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>HAOS Merkez Laboratuvarı</span>
              <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Klinik Tahlil Sonuç Raporu</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem', background: '#F8FAFC', padding: '1rem', borderRadius: '12px' }}>
              <div><strong>Hasta Adı:</strong> Eren Cetin</div>
              <div><strong>Tarih:</strong> {selectedMockDoc.date}</div>
              <div><strong>Protokol No:</strong> HAOS-981203</div>
              <div><strong>Belge Tipi:</strong> Tıbbi Rapor (PDF)</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Ölçüm Sonuçları:</span>
              
              {selectedMockDoc.id === 1 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E5E7EB', color: '#6B7280', textAlign: 'left' }}>
                      <th style={{ padding: '0.5rem 0' }}>Test Adı</th>
                      <th>Bulgu</th>
                      <th>Referans</th>
                      <th>Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>Hemogram (HGB)</td>
                      <td>14.2 g/dL</td>
                      <td>12.0 - 16.0</td>
                      <td style={{ color: '#059669', fontWeight: 600 }}>Normal</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>Vitamin D (25-OH)</td>
                      <td style={{ color: '#D97706', fontWeight: 600 }}>19.4 ng/mL</td>
                      <td>30.0 - 100.0</td>
                      <td style={{ color: '#D97706', fontWeight: 600 }}>Düşük ⚠️</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>Kolesterol (Total)</td>
                      <td>185 mg/dL</td>
                      <td>&lt; 200</td>
                      <td style={{ color: '#059669', fontWeight: 600 }}>Normal</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.6 }}>
                  <strong>Dental Gözlem Raporu:</strong><br />
                  Yapılan radyolojik incelemede herhangi bir patolojik durum saptanmamıştır. Diş yapısı stabil olup, yirmilik yaş dişlerinin pozisyonu normal sınırlar içerisindedir.
                </div>
              )}
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', marginTop: '0.5rem', border: 'none', cursor: 'pointer' }}
              onClick={() => setSelectedMockDoc(null)}
            >
              Kapat
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
