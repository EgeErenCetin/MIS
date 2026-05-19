import React, { useState } from 'react';
import { FileText, Lock, UploadCloud, BrainCircuit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Screen5HealthPortal() {
  const { user } = useAuth();
  // Mock data
  const [hasAiConsent, setHasAiConsent] = useState(true); // Toggle this to test the consent gate
  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: 'Blood_Test_Results_2025.pdf', 
      date: '2025-11-10', 
      summary: 'Your comprehensive metabolic panel and CBC are within normal limits. Vitamin D levels are slightly low; consider a supplement. Cholesterol is well-managed.' 
    },
    { 
      id: 2, 
      name: 'Dental_XRay_Report.pdf', 
      date: '2026-02-14', 
      summary: 'No new cavities detected. Minor calculus buildup on lower anterior teeth. Wisdom teeth (third molars) appear stable and asymptomatic.' 
    }
  ]);

  const toggleConsent = () => setHasAiConsent(!hasAiConsent);

  return (
    <div className="flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <h2>Patient Health Portal</h2>
        {user?.role === 'reception' && (
          <button className="btn btn-primary"><UploadCloud size={18} /> Upload Document</button>
        )}
      </div>
      
      {user?.role === 'patient' && (
        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded glass-panel mb-4">
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-1">AI Portal Settings</h4>
            <p className="text-xs text-gray-500">Toggle whether AI generates summaries for your medical documents.</p>
          </div>
          <button 
            className={`btn ${hasAiConsent ? 'btn-primary' : 'btn-outline'}`}
            onClick={toggleConsent}
          >
            {hasAiConsent ? 'AI Summaries Enabled' : 'Enable AI Summaries'}
          </button>
        </div>
      )}

      <div className="flex-col gap-6">
        {documents.map(doc => (
          <div key={doc.id} className="card glass-panel flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded text-gray-600"><FileText size={20} /></div>
                <div>
                  <h4 className="font-medium text-sm">{doc.name}</h4>
                  <span className="text-xs text-gray-500">Uploaded on {doc.date}</span>
                </div>
              </div>
              <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>View File</button>
            </div>
            
            {/* AI Summary Block */}
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <BrainCircuit size={100} />
              </div>
              
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <BrainCircuit size={18} className="text-indigo-600" />
                <h5 className="font-semibold text-indigo-900 text-sm">Gemini AI Summary</h5>
              </div>
              
              <div className="relative z-10">
                {hasAiConsent ? (
                  <>
                    <p className="text-sm text-indigo-800 leading-relaxed mb-3">
                      {doc.summary}
                    </p>
                    <p className="text-xs text-indigo-600 italic opacity-80 border-t border-indigo-200 pt-2 mt-2">
                      Disclaimer: This summary is AI-generated and for informational purposes only. It does not replace professional medical advice.
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <Lock size={32} className="text-indigo-300 mb-2" />
                    <p className="text-sm text-indigo-800 font-medium">AI Summaries are disabled</p>
                    <p className="text-xs text-indigo-600 mt-1">Enable AI summaries in your profile settings to view insights.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
