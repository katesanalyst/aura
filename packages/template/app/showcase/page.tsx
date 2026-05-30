'use client';

import { useState } from 'react';
import { FloatingSidebar, PageHeader, Card, CardHeader, CardContent, CardFooter, Divider, Accordion, Stack, Grid, Container, Spacer, Avatar, AvatarGroup, Tag, Badge, List, Timeline, StatusBadge, DataTable, Alert, ProgressBar, Spinner, Skeleton, SkeletonCard, SkeletonTable, Tooltip, Tabs, Pagination, Stepper, TreeView, MenuBar, Input, Textarea, Checkbox, CheckboxGroup, RadioGroup, Switch, Select, MultiSelect, FileUpload, Slider, DatePicker, Sparkline, AreaChart, BarChart, StockChart, type StockDataPoint, Button, ToastProvider, useToast } from '@aura/ui';
import { useTheme } from '../components/theme-provider';

function ShowcaseContent() {
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState('showcase');
  const [checkboxValues, setCheckboxValues] = useState<string[]>(['option1']);
  const [radioValue, setRadioValue] = useState('option1');
  const [switchValue, setSwitchValue] = useState(true);
  const [selectValue, setSelectValue] = useState('');
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(50);
  const [dateValue, setDateValue] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [page, setPage] = useState(1);

  const navItems = [
    { id: 'showcase', label: 'Showcase', icon: '⊞' },
    { id: 'forms', label: 'Forms', icon: '◐' },
    { id: 'data', label: 'Data', icon: '◑' },
    { id: 'feedback', label: 'Feedback', icon: '◈' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/' },
    { id: 'projects', label: 'Projects', children: [
      { id: 'web', label: 'Web Apps', href: '/projects/web' },
      { id: 'mobile', label: 'Mobile', href: '/projects/mobile' },
      { id: 'api', label: 'API Services', href: '/projects/api' },
    ]},
  ];

  const regionStateData = [
    { id: 'south', label: 'South India', children: [
      { id: 'tn', label: 'Tamil Nadu' }, { id: 'ka', label: 'Karnataka' }, { id: 'ap', label: 'Andhra Pradesh' }, { id: 'kl', label: 'Kerala' },
    ]},
    { id: 'north', label: 'North India', children: [
      { id: 'up', label: 'Uttar Pradesh' }, { id: 'dl', label: 'Delhi' }, { id: 'pb', label: 'Punjab' }, { id: 'hr', label: 'Haryana' },
    ]},
  ];

  const regionStateDistrictCityData = [
    { id: 'south', label: 'South India', children: [
      { id: 'tn', label: 'Tamil Nadu', children: [
        { id: 'chennai', label: 'Chennai', children: [
          { id: 'central', label: 'Central Chennai' }, { id: 'north', label: 'North Chennai' },
        ]},
        { id: 'coimbatore', label: 'Coimbatore', children: [{ id: 'mettupalayam', label: 'Mettupalayam' }],
        },
      ]},
    ]},
  ];

  const sensexData = [
    { label: 'Mon', value: 74250 }, { label: 'Tue', value: 74580 }, { label: 'Wed', value: 74120 },
    { label: 'Thu', value: 74900 }, { label: 'Fri', value: 75230 }, { label: 'Sat', value: 74890 }, { label: 'Sun', value: 75620 },
  ];

  const niftyData = [
    { label: 'Mon', value: 22850 }, { label: 'Tue', value: 22980 }, { label: 'Wed', value: 22750 },
    { label: 'Thu', value: 23020 }, { label: 'Fri', value: 23180 }, { label: 'Sat', value: 23050 }, { label: 'Sun', value: 23300 },
  ];

  const bankNiftyData = [
    { label: 'Mon', value: 53450 }, { label: 'Tue', value: 53820 }, { label: 'Wed', value: 53200 },
    { label: 'Thu', value: 54050 }, { label: 'Fri', value: 54280 }, { label: 'Sat', value: 53910 }, { label: 'Sun', value: 54500 },
  ];

  const niftyCandleData: StockDataPoint[] = [
    { date: '22-Mar', open: 22800, high: 23100, low: 22700, close: 22980, volume: 12500000 },
    { date: '25-Mar', open: 22950, high: 23250, low: 22900, close: 23020, volume: 15600000 },
    { date: '26-Mar', open: 23000, high: 23400, low: 22950, close: 23350, volume: 18200000 },
    { date: '27-Mar', open: 23300, high: 23500, low: 23200, close: 23150, volume: 14300000 },
    { date: '28-Mar', open: 23100, high: 23300, low: 23000, close: 23280, volume: 16700000 },
    { date: '29-Mar', open: 23250, high: 23600, low: 23100, close: 23300, volume: 19800000 },
    { date: '30-Mar', open: 23300, high: 23550, low: 23200, close: 23420, volume: 17500000 },
    { date: '31-Mar', open: 23400, high: 23500, low: 23100, close: 23200, volume: 13400000 },
    { date: '01-Apr', open: 23200, high: 23650, low: 23150, close: 23580, volume: 20100000 },
    { date: '02-Apr', open: 23550, high: 23800, low: 23400, close: 23750, volume: 22300000 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--aura-bg)' }}>
      <MenuBar items={menuItems} user={{ name: 'Karthik', email: 'karthik@test.com' }} notificationCount={5}
        onNotificationClick={() => addToast('info', 'Notifications')} onLogout={() => addToast('info', 'Logged out')} />

      <div style={{ display: 'flex' }}>
        <FloatingSidebar items={navItems} activeId={activeNav} onNavigate={setActiveNav}
          logo={<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>A</div>
            <span style={{ fontWeight: 700 }}>Aura</span>
          </div>} />

        <main style={{ flex: 1, padding: '16px' }} className="main-content">
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <PageHeader title="Component Showcase" subtitle="All Aura UI components in one place"
              actions={<Button onClick={() => addToast('success', 'Toast notification!')}>Show Toast</Button>} />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Alerts</h2>
              <Stack gap="12px">
                <Alert type="info" title="Info" dismissible onDismiss={() => {}}>This is an informational alert.</Alert>
                <Alert type="success" title="Success">Operation completed successfully.</Alert>
                <Alert type="warning" title="Warning">Please review before continuing.</Alert>
                <Alert type="danger" title="Error">Something went wrong.</Alert>
              </Stack>
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Tree View - Location Hierarchies</h2>
              <div style={{ maxWidth: '800px' }}>
                <Tabs variant="underline" tabs={[
                  { id: 'region-tab', label: 'Region - State',
                    content: <Card style={{ marginTop: '16px' }}>
                      <CardHeader title="2-Level: Region -> State" />
                      <CardContent><TreeView data={regionStateData} searchable defaultExpanded /></CardContent>
                    </Card>
                  },
                  { id: 'state-tab', label: 'Full Hierarchy',
                    content: <Card style={{ marginTop: '16px' }}>
                      <CardHeader title="4-Level: Region -> State -> District -> City" />
                      <CardContent><TreeView data={regionStateDistrictCityData} searchable showCheckboxes defaultExpanded /></CardContent>
                    </Card>
                  },
                ]} />
              </div>
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Market Reports</h2>
              <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap="24px">
                <Card><CardHeader title="Sensex" subtitle="Stock market index" />
                  <CardContent><AreaChart data={sensexData} width={300} height={180} color="#10b981" /></CardContent>
                </Card>
                <Card><CardHeader title="Nifty 50" subtitle="NSE benchmark" />
                  <CardContent><BarChart data={sensexData.map((d, i) => ({ label: d.label, value: niftyData[i]?.value || 0, color: '#3b82f6' }))} width={300} height={180} /></CardContent>
                </Card>
                <Card><CardHeader title="Bank Nifty" subtitle="Banking sector index" />
                  <CardContent><AreaChart data={bankNiftyData} width={300} height={180} color="#f59e0b" /></CardContent>
                </Card>
              </Grid>
            </section>

            <section style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '12px', color: 'var(--aura-fg-muted)' }}>Stock Chart with Technical Indicators</h3>
              <Card>
                <CardHeader title="Nifty 50 - Candlestick with SMA" />
                <CardContent>
                  <div style={{ width: '100%', overflowX: 'auto' }}>
                    <StockChart data={niftyCandleData} width={500} height={250} smaPeriods={[5, 8]} />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* IYIpolitics-style Hero Stats */}
            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>IYIpolitics Hero Stats (Glass Pattern)</h2>
              <div style={{ display: 'grid', gap: '12px' }} className="hero-grid">
                <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--aura-radius-xl)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#3b82f6' }}>273</div>
                  <div style={{ fontSize: '11px', color: 'var(--aura-fg-muted-soft)', marginTop: '4px' }}>Constituencies</div>
                </div>
                <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--aura-radius-xl)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#10b981' }}>10</div>
                  <div style={{ fontSize: '11px', color: 'var(--aura-fg-muted-soft)', marginTop: '4px' }}>Parties</div>
                </div>
                <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--aura-radius-xl)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#f97316' }}>8</div>
                  <div style={{ fontSize: '11px', color: 'var(--aura-fg-muted-soft)', marginTop: '4px' }}>Leaders</div>
                </div>
                <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--aura-radius-xl)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#8b5cf6' }}>5</div>
                  <div style={{ fontSize: '11px', color: 'var(--aura-fg-muted-soft)', marginTop: '4px' }}>Elections</div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  return (<ToastProvider><ShowcaseContent /></ToastProvider>);
}