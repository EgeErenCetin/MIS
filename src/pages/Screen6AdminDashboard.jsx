import React from 'react';
import { Activity, Users, Clock, CheckCircle } from 'lucide-react';

export default function Screen6AdminDashboard() {
  // Mock data for the dashboard
  const metrics = [
    { label: "Slot Utilization Rate", value: "85%", icon: <Activity size={24} />, color: "var(--color-primary)" },
    { label: "No-Show Rate", value: "4.2%", icon: <Users size={24} />, color: "var(--color-danger)" },
    { label: "Waitlist Fill Rate", value: "92%", icon: <Clock size={24} />, color: "var(--color-warning)" },
    { label: "Notification Response", value: "78%", icon: <CheckCircle size={24} />, color: "var(--color-success)" }
  ];

  const waitlist = [
    { id: 1, patient: "Alice V.", department: "Dentistry", queue: 1, channel: "WhatsApp", days: 2 },
    { id: 2, patient: "Bob M.", department: "Orthodontics", queue: 2, channel: "SMS", days: 4 },
    { id: 3, patient: "Charlie K.", department: "Dietetics", queue: 1, channel: "Voice", days: 1 },
  ];

  return (
    <div className="flex-col gap-6 w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h2>Clinic Admin Dashboard</h2>
        <span className="badge badge-success">Live Updates Active</span>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {metrics.map((m, i) => (
          <div key={i} className="card glass-panel flex-col gap-2">
            <div className="flex justify-between items-center">
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{m.label}</span>
              <div style={{ color: m.color }}>{m.icon}</div>
            </div>
            <h3 style={{ fontSize: '2rem', color: m.color }}>{m.value}</h3>
          </div>
        ))}
      </div>

      <div className="flex gap-6" style={{ flexWrap: 'wrap' }}>
        {/* Waitlist Overview Table */}
        <div className="card glass-panel" style={{ flex: '2 1 400px' }}>
          <h3 className="mb-4">Active Waitlist Overview</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '0.75rem' }}>Patient</th>
                  <th style={{ padding: '0.75rem' }}>Dept</th>
                  <th style={{ padding: '0.75rem' }}>Queue Pos</th>
                  <th style={{ padding: '0.75rem' }}>Channel</th>
                  <th style={{ padding: '0.75rem' }}>Wait Time</th>
                </tr>
              </thead>
              <tbody>
                {waitlist.map(row => (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem' }}>{row.patient}</td>
                    <td style={{ padding: '0.75rem' }}>{row.department}</td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-warning">#{row.queue}</span></td>
                    <td style={{ padding: '0.75rem' }}>{row.channel}</td>
                    <td style={{ padding: '0.75rem' }}>{row.days} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dummy Chart Area */}
        <div className="card glass-panel flex-col items-center justify-center" style={{ flex: '1 1 300px', minHeight: '300px' }}>
          <h3 className="mb-4" style={{ alignSelf: 'flex-start' }}>Department Breakdown</h3>
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'conic-gradient(var(--color-primary) 0% 40%, var(--color-secondary) 40% 70%, var(--color-success) 70% 100%)' }}></div>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1"><span style={{ width: 10, height: 10, backgroundColor: 'var(--color-primary)', display: 'inline-block' }}></span> Dentistry</span>
            <span className="flex items-center gap-1"><span style={{ width: 10, height: 10, backgroundColor: 'var(--color-secondary)', display: 'inline-block' }}></span> Ortho</span>
            <span className="flex items-center gap-1"><span style={{ width: 10, height: 10, backgroundColor: 'var(--color-success)', display: 'inline-block' }}></span> Diet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
