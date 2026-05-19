import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
    alert('Appointment booked successfully!');
    navigate('/dashboard');
  };

  const handleJoinWaitlist = () => {
    // Pass context to the waitlist form
    navigate('/waitlist', { state: { ...formData } });
  };

  return (
    <div className="card max-w-2xl mx-auto glass-panel">
      <h2 className="mb-4">Book New Appointment</h2>
      
      <form onSubmit={checkAvailability} className="flex-col gap-4">
        <div>
          <label className="label">Patient Name</label>
          <input required type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} className="input-field" placeholder="Select or type patient name" />
        </div>

        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label className="label">Department *</label>
            <select required name="department" value={formData.department} onChange={handleInputChange} className="input-field">
              <option value="">Select...</option>
              <option value="Dentistry">Dentistry</option>
              <option value="Orthodontics">Orthodontics</option>
              <option value="Psychology">Psychology</option>
              <option value="Dietetics">Dietetics</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label className="label">Preferred Doctor (Optional)</label>
            <select name="doctor" value={formData.doctor} onChange={handleInputChange} className="input-field" disabled={!formData.department}>
              <option value="">Any Doctor</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Jones">Dr. Jones</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label className="label">Preferred Date *</label>
            <input required type="date" name="date" value={formData.date} onChange={handleInputChange} className="input-field" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="label">Preferred Time *</label>
            <select required name="time" value={formData.time} onChange={handleInputChange} className="input-field">
              <option value="">Select time...</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM (Try this to see Waitlist)</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">02:00 PM</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="label">Reason / Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="input-field" rows="3"></textarea>
        </div>

        {!slotStatus && (
          <button type="submit" className="btn btn-primary mt-2">Check Availability</button>
        )}
      </form>

      {/* Proactive Waitlist Redirect UI */}
      {slotStatus === 'full' && (
        <div className="mt-6 p-4 rounded" style={{ backgroundColor: 'var(--color-warning)', color: '#fff', border: '1px solid #D97706' }}>
          <h3 className="mb-2 text-white">Time Slot is Unavailable</h3>
          <p className="mb-4 text-sm" style={{ color: '#fff' }}>The slot at {formData.time} is already taken. Here are the nearest available alternatives:</p>
          <ul className="mb-4 text-sm" style={{ listStylePosition: 'inside' }}>
            <li>Same day at 11:00 AM</li>
            <li>Same day at 02:00 PM</li>
            <li>Next day at 10:00 AM</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <button className="btn" style={{ backgroundColor: '#fff', color: 'var(--color-warning)' }} onClick={() => setSlotStatus(null)}>Choose Another Slot</button>
            <button className="btn" style={{ backgroundColor: '#B45309', color: '#fff' }} onClick={handleJoinWaitlist}>
              Add me to the waitlist for {formData.time}
            </button>
          </div>
        </div>
      )}

      {slotStatus === 'available' && (
        <div className="mt-6 p-4 rounded bg-green-100 border border-green-300">
          <h3 className="mb-2 text-green-800">Slot Available!</h3>
          <p className="mb-4 text-sm text-green-700">The requested time slot is open.</p>
          <button className="btn btn-primary w-full" onClick={handleBook}>Confirm Appointment</button>
        </div>
      )}
    </div>
  );
}
