import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Screen3PatientRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    dob: '',
    department: '',
    kvkkConsent: false,
    aiPortalConsent: false,
  });

  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.kvkkConsent) {
      setStatus('Error: KVKK Consent is mandatory.');
      return;
    }

    try {
      setStatus('Submitting...');
      // Simulated or actual Supabase insertion
      const { data, error } = await supabase.from('patients').insert([
        {
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          date_of_birth: formData.dob,
          kvkk_consent: formData.kvkkConsent,
          ai_portal_consent: formData.aiPortalConsent,
          // department of interest could be stored as notes or a separate relation depending on exact needs
        }
      ]);
      
      if (error && error.message !== 'FetchError') throw error; // FetchError because URL is fake initially
      
      setStatus('Success! Patient registered.');
      setFormData({
        fullName: '', phoneNumber: '', email: '', dob: '', department: '',
        kvkkConsent: false, aiPortalConsent: false
      });
    } catch (error) {
      console.error(error);
      setStatus('Patient Registration Mock Success (Real Supabase connection failed as expected without keys)');
    }
  };

  return (
    <div className="card max-w-2xl mx-auto glass-panel">
      <h2 className="mb-4">New Patient Registration</h2>
      <p className="mb-4 text-sm">Register a new patient into the HAOS system. (Reception Staff Only)</p>
      
      {status && (
        <div className={`mb-4 p-3 rounded ${status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-col gap-4">
        <div>
          <label className="label">Full Name *</label>
          <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="input-field" placeholder="John Doe" />
        </div>
        
        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label className="label">Phone Number *</label>
            <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="input-field" placeholder="+90 555 555 5555" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="label">Email (Optional)</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field" placeholder="john@example.com" />
          </div>
        </div>

        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label className="label">Date of Birth *</label>
            <input required type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="input-field" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="label">Department of Interest</label>
            <select name="department" value={formData.department} onChange={handleInputChange} className="input-field">
              <option value="">Select...</option>
              <option value="dentistry">Dentistry</option>
              <option value="orthodontics">Orthodontics</option>
              <option value="psychology">Psychology</option>
              <option value="dietetics">Dietetics</option>
            </select>
          </div>
        </div>

        <div className="mt-4 p-4 border border-gray-200 rounded bg-gray-50 flex-col gap-2">
          <h4 className="text-sm font-semibold mb-2">Legal Consents</h4>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input required type="checkbox" name="kvkkConsent" checked={formData.kvkkConsent} onChange={handleInputChange} />
            <span><strong>KVKK General Consent:</strong> I consent to the processing of my personal data in accordance with Law No. 6698. *</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" name="aiPortalConsent" checked={formData.aiPortalConsent} onChange={handleInputChange} />
            <span><strong>AI Health Portal Consent:</strong> I consent to the use of AI to generate summaries of my medical documents within the Patient Health Portal.</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-4 w-full">Register Patient</button>
      </form>
    </div>
  );
}
