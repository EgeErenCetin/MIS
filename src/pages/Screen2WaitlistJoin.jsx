import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, MessageSquare, Phone } from 'lucide-react';

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
      <div className="card max-w-lg mx-auto glass-panel text-center">
        <h2 className="mb-4 text-green-600">You're on the Waitlist!</h2>
        <p className="mb-4">You are currently <strong>#3</strong> in the queue for <strong>{formData.department}</strong>.</p>
        <p className="text-sm text-gray-500 mb-6">We will notify you immediately via {formData.notificationChannel.toUpperCase()} if a slot opens up between {formData.startDate} and {formData.endDate}.</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="card max-w-2xl mx-auto glass-panel">
      <h2 className="mb-2">Join the Smart Waitlist</h2>
      <p className="mb-6 text-sm">We will notify you as soon as a slot opens up.</p>
      
      <form onSubmit={handleSubmit} className="flex-col gap-4">
        <div>
          <label className="label">Patient Name</label>
          <input required type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} className="input-field" />
        </div>

        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label className="label">Department *</label>
            <input required type="text" name="department" value={formData.department} onChange={handleInputChange} className="input-field" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="label">Preferred Doctor</label>
            <input type="text" name="doctor" value={formData.doctor} onChange={handleInputChange} className="input-field" placeholder="Any" />
          </div>
        </div>

        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label className="label">Start Date *</label>
            <input required type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="input-field" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="label">End Date *</label>
            <input required type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="input-field" />
          </div>
        </div>

        <div>
          <label className="label">Preferred Time of Day</label>
          <select name="timeOfDay" value={formData.timeOfDay} onChange={handleInputChange} className="input-field">
            <option value="any">No Preference</option>
            <option value="morning">Morning (09:00 - 12:00)</option>
            <option value="afternoon">Afternoon (13:00 - 17:00)</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="label mb-2">How should we notify you? *</label>
          <div className="flex gap-4">
            <label className={`flex-col items-center gap-2 p-4 border rounded cursor-pointer transition-all ${formData.notificationChannel === 'whatsapp' ? 'border-primary bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`} style={{ flex: 1 }}>
              <input type="radio" name="notificationChannel" value="whatsapp" checked={formData.notificationChannel === 'whatsapp'} onChange={handleInputChange} className="hidden" />
              <MessageCircle size={24} color="#25D366" />
              <span className="text-sm font-medium">WhatsApp</span>
            </label>
            
            <label className={`flex-col items-center gap-2 p-4 border rounded cursor-pointer transition-all ${formData.notificationChannel === 'sms' ? 'border-primary bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`} style={{ flex: 1 }}>
              <input type="radio" name="notificationChannel" value="sms" checked={formData.notificationChannel === 'sms'} onChange={handleInputChange} className="hidden" />
              <MessageSquare size={24} color="#0EA5E9" />
              <span className="text-sm font-medium">SMS</span>
            </label>
            
            <label className={`flex-col items-center gap-2 p-4 border rounded cursor-pointer transition-all ${formData.notificationChannel === 'voice' ? 'border-primary bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`} style={{ flex: 1 }}>
              <input type="radio" name="notificationChannel" value="voice" checked={formData.notificationChannel === 'voice'} onChange={handleInputChange} className="hidden" />
              <Phone size={24} color="#F59E0B" />
              <span className="text-sm font-medium">AI Voice Call</span>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">Join Waitlist</button>
      </form>
    </div>
  );
}
