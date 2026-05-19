import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

export default function Screen4AppointmentStatus() {
  // Mock data
  const [appointments, setAppointments] = useState([
    { id: 1, type: 'upcoming', doctor: 'Dr. Smith', department: 'Dentistry', date: '2026-06-01', time: '14:00', status: 'confirmed' },
    { id: 2, type: 'past', doctor: 'Dr. Jones', department: 'Orthodontics', date: '2025-11-15', time: '09:00', status: 'completed' },
    { id: 3, type: 'past', doctor: 'Dr. Smith', department: 'Dentistry', date: '2025-05-10', time: '11:00', status: 'no-show' }
  ]);

  const [waitlist] = useState([
    { id: 1, department: 'Dentistry', position: 2, dateRange: 'June 2026' }
  ]);

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.map(app => app.id === id ? { ...app, status: 'cancelled', type: 'past' } : app));
    }
  };

  return (
    <div className="flex-col gap-6 max-w-4xl mx-auto w-full">
      <h2>My Appointments</h2>

      {/* Waitlist Indicators */}
      {waitlist.length > 0 && (
        <div className="flex-col gap-2">
          {waitlist.map(item => (
            <div key={item.id} className="p-4 rounded border border-blue-200 bg-blue-50 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 animate-pulse"></div>
              <div className="flex items-center gap-2">
                <AlertCircle size={20} className="text-blue-500" />
                <span className="font-medium text-blue-900">Waitlist Active</span>
              </div>
              <span className="text-sm text-blue-800">
                You are <strong>#{item.position} in queue</strong> for {item.department} ({item.dateRange})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="flex-col gap-4">
        <h3>Upcoming</h3>
        {appointments.filter(a => a.type === 'upcoming').length === 0 ? (
          <p className="text-sm text-gray-500">No upcoming appointments.</p>
        ) : (
          appointments.filter(a => a.type === 'upcoming').map(app => (
            <div key={app.id} className="card glass-panel flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                  <Calendar size={24} />
                </div>
                <div className="flex-col gap-1">
                  <h4 className="text-lg">{app.doctor} - {app.department}</h4>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {app.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {app.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex-col items-end gap-2">
                <span className="badge badge-success">Confirmed</span>
                <div className="flex gap-2">
                  <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Reschedule</button>
                  <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }} onClick={() => handleCancel(app.id)}>Cancel</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Past Appointments */}
      <div className="flex-col gap-4 mt-4">
        <h3>History</h3>
        <div className="flex-col gap-2">
          {appointments.filter(a => a.type === 'past').map(app => (
            <div key={app.id} className="p-4 bg-white border border-gray-200 rounded flex justify-between items-center opacity-75">
              <div className="flex-col gap-1">
                <span className="font-medium">{app.doctor} - {app.department}</span>
                <span className="text-xs text-gray-500">{app.date} at {app.time}</span>
              </div>
              {app.status === 'completed' && <span className="badge badge-success">Completed</span>}
              {app.status === 'cancelled' && <span className="badge badge-warning">Cancelled</span>}
              {app.status === 'no-show' && <span className="badge badge-danger">No-Show</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
