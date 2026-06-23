'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LogEntry {
  timestamp: string;
  visitorName?: string;
  phone?: string;
  course?: string;
  handoffRequested: boolean;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState({ totalVisitors: 0, totalConversations: 0, handoffs: 0 });

  useEffect(() => {
    const raw = localStorage.getItem('livedesk_logs');
    if (raw) {
      const parsed: LogEntry[] = JSON.parse(raw);
      setLogs(parsed);
      setStats({
        totalVisitors: parsed.filter(l => l.visitorName).length,
        totalConversations: parsed.length,
        handoffs: parsed.filter(l => l.handoffRequested).length,
      });
    }
  }, []);

  const exportCSV = () => {
    const header = 'Timestamp,Visitor Name,Phone,Course,Handoff Requested\n';
    const rows = logs.map(l =>
      `"${l.timestamp}","${l.visitorName || ''}","${l.phone || ''}","${l.course || ''}","${l.handoffRequested}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `livedesk-logs-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0e27', color: '#ffffff' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold" style={{ color: '#e94560' }}>Dashboard</h1>
          <Link href="/" className="text-sm hover:underline" style={{ color: '#4a9eff' }}>← Back to Reception</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Visitors Registered" value={stats.totalVisitors} color="#00d4aa" />
          <StatCard label="Total Conversations" value={stats.totalConversations} color="#4a9eff" />
          <StatCard label="Handoffs Requested" value={stats.handoffs} color="#e94560" />
        </div>

        <div style={{ backgroundColor: '#141738', borderColor: '#1e2248' }} className="rounded-xl border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: '#8892b0' }}>Recent Activity</h2>
            {logs.length > 0 && (
              <button
                onClick={exportCSV}
                className="px-4 py-2 text-sm rounded-lg transition-colors"
                style={{ backgroundColor: '#4a9eff', color: '#ffffff' }}
              >
                Export CSV
              </button>
            )}
          </div>

          {logs.length === 0 ? (
            <p className="text-center py-8" style={{ color: '#8892b0' }}>No activity yet. Start a conversation on the reception page.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b" style={{ color: '#8892b0', borderColor: '#1e2248' }}>
                    <th className="py-2 pr-4">Time</th>
                    <th className="py-2 pr-4">Visitor</th>
                    <th className="py-2 pr-4">Phone</th>
                    <th className="py-2 pr-4">Course</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.slice().reverse().map((log, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #1e2248' }}>
                      <td className="py-2 pr-4" style={{ color: '#8892b0' }}>{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="py-2 pr-4">{log.visitorName || '—'}</td>
                      <td className="py-2 pr-4" style={{ color: '#8892b0' }}>{log.phone || '—'}</td>
                      <td className="py-2 pr-4">{log.course || '—'}</td>
                      <td className="py-2">
                        {log.handoffRequested
                          ? <span style={{ color: '#e94560' }}>Handoff</span>
                          : <span style={{ color: '#00d4aa' }}>AI Served</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ backgroundColor: '#141738', borderColor: '#1e2248' }} className="rounded-xl border p-5 text-center">
      <p className="text-3xl font-bold mb-1" style={{ color }}>{value}</p>
      <p className="text-sm" style={{ color: '#8892b0' }}>{label}</p>
    </div>
  );
}
