'use client';

import { useState } from 'react';
import { FloatingSidebar, PageHeader, StatCard, StatusBadge, Button, Modal, Input, Textarea, ButtonGroup, ToastProvider, useToast, Sparkline, AreaChart, BarChart } from '@aura/ui';
import { useTheme } from './components/theme-provider';

// Sample data
const revenueData = [
  { label: 'Jan', value: 12000 }, { label: 'Feb', value: 19000 }, { label: 'Mar', value: 15000 },
  { label: 'Apr', value: 28000 }, { label: 'May', value: 32000 }, { label: 'Jun', value: 48000 },
  { label: 'Jul', value: 42000 }, { label: 'Aug', value: 55000 }, { label: 'Sep', value: 61000 },
  { label: 'Oct', value: 58000 }, { label: 'Nov', value: 72000 }, { label: 'Dec', value: 85000 },
];

const usersData = [
  { label: 'Jan', value: 800 }, { label: 'Feb', value: 1200 }, { label: 'Mar', value: 1800 },
  { label: 'Apr', value: 2400 }, { label: 'May', value: 2800 }, { label: 'Jun', value: 3200 },
  { label: 'Jul', value: 3800 }, { label: 'Aug', value: 4200 }, { label: 'Sep', value: 4800 },
  { label: 'Oct', value: 5200 }, { label: 'Nov', value: 5800 }, { label: 'Dec', value: 6200 },
];

const categoryData = [
  { label: 'SaaS', value: 42, color: '#3b82f6' }, { label: 'E-com', value: 28, color: '#10b981' },
  { label: 'FinTech', value: 18, color: '#f59e0b' }, { label: 'Health', value: 12, color: '#ef4444' },
];

const recentActivity = [
  { id: '1', user: 'Sarah Chen', action: 'Upgraded to Pro', time: '2 min ago', amount: '+$49/mo', type: 'success' },
  { id: '2', user: 'James Wilson', action: 'New signup', time: '15 min ago', amount: '', type: 'info' },
  { id: '3', user: 'Maria Garcia', action: 'Payment failed', time: '1 hour ago', amount: '-$29', type: 'danger' },
  { id: '4', user: 'Alex Kim', action: 'Cancelled plan', time: '3 hours ago', amount: '-$99/mo', type: 'warning' },
  { id: '5', user: 'Emma Davis', action: 'Upgraded to Enterprise', time: '5 hours ago', amount: '+$299/mo', type: 'success' },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'analytics', label: 'Analytics', icon: '◐', badge: '3' },
  { id: 'users', label: 'Users', icon: '◑', children: [
    { id: 'all-users', label: 'All Users' }, { id: 'roles', label: 'Roles & Permissions' },
  ]},
  { id: 'billing', label: 'Billing', icon: '◈' },
  { id: 'messages', label: 'Messages', icon: '◇', badge: '12' },
  { id: 'settings', label: 'Settings', icon: '○' },
];

function DashboardContent() {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--aura-bg)' }}>
      <FloatingSidebar
        items={navItems}
        activeId={activeNav}
        onNavigate={setActiveNav}
        collapsed={sidebarCollapsed}
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0,
            }}>A</div>
            {!sidebarCollapsed && <span style={{ fontWeight: 700, fontSize: '16px' }}>Aura</span>}
          </div>
        }
        footer={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button onClick={toggleTheme} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 12px', borderRadius: 'var(--aura-radius-md)',
              border: 'none', background: 'transparent', color: 'var(--aura-fg-muted)', cursor: 'pointer', fontSize: '14px',
            }}>{theme === 'light' ? '🌙' : '☀️'} {!sidebarCollapsed && <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>}</button>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 12px', borderRadius: 'var(--aura-radius-md)',
              border: 'none', background: 'transparent', color: 'var(--aura-fg-muted)', cursor: 'pointer', fontSize: '14px',
            }}>{sidebarCollapsed ? '→' : '←'} {!sidebarCollapsed && <span>Collapse</span>}</button>
          </div>
        }
      />

      <main style={{
        flex: 1, marginLeft: sidebarCollapsed ? '88px' : '272px', padding: '32px',
        minHeight: '100vh', transition: 'margin-left 0.2s ease',
      }} className="main-content">
        <PageHeader title="Dashboard" subtitle="Welcome back! Here's what's happening with your projects."
          breadcrumbs={['Home', 'Dashboard']} actions={
            <>
              <Button variant="outline" size="sm" onClick={() => addToast('info', 'Settings saved!')}>Settings</Button>
              <Button size="sm" onClick={() => setShowModal(true)}>New User</Button>
            </>
          } />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px' }} className="dashboard-stats">
          <StatCard title="Total Users" value="6,284" trend="+12.5%" trendLabel="vs last month"
            icon={<Sparkline data={[800, 1200, 1800, 2400, 2800, 3200, 3800, 4200, 4800, 5200, 5800, 6284]} color="#3b82f6" />} />
          <StatCard title="Revenue" value="$85.2k" trend="+8.2%" trendLabel="vs last month"
            icon={<Sparkline data={[12, 19, 15, 28, 32, 48, 42, 55, 61, 58, 72, 85]} color="#10b981" />} />
          <StatCard title="Active Sessions" value="1,429" trend="-3.1%" trendLabel="vs last hour"
            icon={<Sparkline data={[1800, 1600, 1900, 1400, 1500, 1300, 1600, 1400, 1200, 1500, 1429]} color="#f59e0b" />} />
          <StatCard title="Conversion Rate" value="3.24%" trend="+0.4%" trendLabel="vs last week"
            icon={<Sparkline data={[2.1, 2.4, 2.2, 2.8, 3.0, 2.9, 3.1, 3.2, 3.0, 3.15, 3.24]} color="#8b5cf6" />} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginTop: '16px' }} className="dashboard-charts">
          <div style={{ background: 'var(--aura-surface)', border: '1px solid var(--aura-border)', borderRadius: 'var(--aura-radius-xl)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div><h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Revenue Overview</h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--aura-fg-muted-soft)' }}>Monthly revenue for 2026</p></div>
              <StatusBadge status="active" label="+24% YoY" />
            </div>
            <AreaChart data={revenueData} width={500} height={220} color="#3b82f6" />
          </div>
          <div style={{ background: 'var(--aura-surface)', border: '1px solid var(--aura-border)', borderRadius: 'var(--aura-radius-xl)', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>By Category</h3>
            <BarChart data={categoryData} width={280} height={180} />
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categoryData.map((c) => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color }} />
                    <span style={{ color: 'var(--aura-fg-muted)' }}>{c.label}</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal open={showModal} onClose={() => setShowModal(false)} title="Create User" description="Add a new user to your organization.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input label="Name" placeholder="Full name" />
            <Input label="Email" placeholder="user@example.com" type="email" />
            <ButtonGroup label="Role" options={[
              { value: 'admin', label: 'Admin' }, { value: 'editor', label: 'Editor' }, { value: 'viewer', label: 'Viewer' },
            ]} value="viewer" onChange={() => {}} />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={() => { addToast('success', 'User created!'); setShowModal(false); }}>Create User</Button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}

export default function Page() {
  return (<ToastProvider><DashboardContent /></ToastProvider>);
}