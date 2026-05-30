'use client';

import { useState } from 'react';
import { FloatingSidebar, PageHeader, Card, CardHeader, CardContent, CardFooter, Divider, Accordion, Stack, Grid, Container, Spacer, Avatar, AvatarGroup, Tag, Badge, List, Timeline, StatusBadge, DataTable, Alert, ProgressBar, Spinner, Skeleton, SkeletonCard, SkeletonTable, Tooltip, Tabs, Pagination, Stepper, TreeView, MenuBar, Input, Textarea, Checkbox, CheckboxGroup, RadioGroup, Switch, Select, MultiSelect, FileUpload, Slider, DatePicker, Sparkline, AreaChart, BarChart, StockChart, type StockDataPoint, Button, ToastProvider, useToast, BottomNav, Modal } from '@aura/ui';
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
  const [showModal, setShowModal] = useState(false);

  const navItems = [
    { id: 'showcase', label: 'Showcase', icon: '\u229E' },
    { id: 'forms', label: 'Forms', icon: '\u25D0' },
    { id: 'data', label: 'Data', icon: '\u25D1' },
    { id: 'feedback', label: 'Feedback', icon: '\u25C8' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/' },
    { id: 'projects', label: 'Projects', children: [
      { id: 'web', label: 'Web Apps', href: '/projects/web' },
      { id: 'mobile', label: 'Mobile', href: '/projects/mobile' },
      { id: 'api', label: 'API Services', href: '/projects/api' },
    ]},
    { id: 'docs', label: 'Docs', href: '/docs' },
    { id: 'pricing', label: 'Pricing', href: '/pricing' },
  ];

  const bottomNavItems = [
    { id: 'showcase', label: 'Home', icon: '\u2302' },
    { id: 'forms', label: 'Forms', icon: '\u25D0' },
    { id: 'data', label: 'Data', icon: '\u25D1' },
    { id: 'feedback', label: 'Alerts', icon: '\u25C8' },
    { id: 'settings', label: 'Settings', icon: '\u2699' },
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

  const avatarData = [
    { id: '1', src: 'https://i.pravatar.cc/150?img=1', alt: 'User 1', status: 'online' as const },
    { id: '2', src: 'https://i.pravatar.cc/150?img=2', alt: 'User 2', status: 'away' as const },
    { id: '3', src: 'https://i.pravatar.cc/150?img=3', alt: 'User 3' },
  ];

  const listItems = [
    { id: '1', title: 'Dashboard', description: 'Overview and analytics', icon: '\uD83D\uDCCA' },
    { id: '2', title: 'Reports', description: 'Generate reports', icon: '\uD83D\uDCC8' },
    { id: '3', title: 'Settings', description: 'Configuration', icon: '\u2699\uFE0F' },
  ];

  const timelineItems = [
    { id: '1', title: 'Project created', description: 'Initial setup', time: 'Mar 15', icon: '\uD83D\uDCC1' },
    { id: '2', title: 'Design approved', description: 'Review complete', time: 'Mar 20', icon: '\u2713' },
    { id: '3', title: 'Development started', description: 'Coding in progress', time: 'Mar 25', icon: '\uD83D\uDCBB' },
  ];

  const accordionItems = [
    { id: '1', title: 'Getting Started', content: <p>Follow these steps to set up your project.</p> },
    { id: '2', title: 'Advanced Configuration', content: <p>Customize your environment with these options.</p> },
    { id: '3', title: 'Deployment', content: <p>Deploy your application to production.</p> },
  ];

  const stepperItems = [
    { id: '1', label: 'Create account', description: 'Step 1' },
    { id: '2', label: 'Configure settings', description: 'Step 2' },
    { id: '3', label: 'Finish setup', description: 'Step 3' },
  ];

  const regionStateData = [
    { id: 'south', label: 'South India', children: [
      { id: 'tn', label: 'Tamil Nadu' }, { id: 'ka', label: 'Karnataka' }, { id: 'ap', label: 'Andhra Pradesh' }, { id: 'kl', label: 'Kerala' },
    ]},
    { id: 'north', label: 'North India', children: [
      { id: 'up', label: 'Uttar Pradesh' }, { id: 'dl', label: 'Delhi' }, { id: 'pb', label: 'Punjab' }, { id: 'hr', label: 'Haryana' },
    ]},
    { id: 'east', label: 'East India', children: [
      { id: 'wb', label: 'West Bengal' }, { id: 'or', label: 'Odisha' }, { id: 'br', label: 'Bihar' },
    ]},
    { id: 'west', label: 'West India', children: [
      { id: 'mh', label: 'Maharashtra' }, { id: 'gj', label: 'Gujarat' },
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
      { id: 'ka', label: 'Karnataka', children: [
        { id: 'bangalore', label: 'Bangalore', children: [
          { id: 'east', label: 'East Bangalore' }, { id: 'west', label: 'West Bangalore' },
        ]},
      ]},
    ]},
    { id: 'north', label: 'North India', children: [
      { id: 'up', label: 'Uttar Pradesh', children: [
        { id: 'noida', label: 'Noida', children: [
          { id: 'sector-62', label: 'Sector 62' }, { id: 'sector-135', label: 'Sector 135' },
        ]},
        { id: 'ghaziabad', label: 'Ghaziabad', children: [{ id: 'city-center', label: 'City Center' }],
        },
      ]},
    ]},
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--aura-bg)', paddingBottom: '80px' }}>
      <MenuBar
        items={menuItems}
        activeId="showcase"
        user={{ name: 'Karthik', email: 'karthik@test.com' }}
        notificationCount={5}
        onNotificationClick={() => addToast('info', 'Notifications')}
        onLogout={() => addToast('info', 'Logged out')}
        onThemeToggle={toggleTheme}
        theme={theme}
      />

      <div style={{ display: 'flex' }}>
        <FloatingSidebar items={navItems} activeId={activeNav} onNavigate={setActiveNav}
          logo={<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>A</div>
            <span style={{ fontWeight: 700 }}>Aura</span>
          </div>} />

        <main style={{ flex: 1, padding: '16px', width: '100%' }} className="main-content">
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
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Loading & Feedback</h2>
              <Stack direction="horizontal" gap="24px" wrap>
                <Spinner size="sm" label="Loading..." />
                <Spinner size="md" label="Processing..." />
                <Spinner size="lg" label="Fetching data..." />
              </Stack>
              <div style={{ marginTop: '16px' }}>
                <ProgressBar value={65} label="Progress" showValue />
              </div>
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>User Components</h2>
              <Stack direction="horizontal" gap="24px" align="center" wrap>
                <Avatar src={avatarData[0].src} alt={avatarData[0].alt} size="lg" status="online" />
                <AvatarGroup avatars={avatarData} size="sm" />
                <StatusBadge status="live" label="Online" />
              </Stack>
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Tags & Tooltips</h2>
              <Stack gap="16px">
                <Stack direction="horizontal" gap="8px" wrap>
                  <Tag>Default</Tag>
                  <Tag color="accent">Accent</Tag>
                  <Tag color="success">Success</Tag>
                  <Tag color="warning">Warning</Tag>
                  <Tag color="danger" removable>Danger</Tag>
                </Stack>
                <Stack direction="horizontal" gap="8px" wrap>
                  <Tooltip content="This is a tooltip" position="top">
                    <Button variant="outline" size="sm">Hover me</Button>
                  </Tooltip>
                  <Tooltip content="More information" position="bottom">
                    <Badge color="#8b5cf6">Info</Badge>
                  </Tooltip>
                </Stack>
              </Stack>
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Lists & Timeline</h2>
              <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap="24px">
                <Card><CardHeader title="Navigation List" />
                  <CardContent><List items={listItems} /></CardContent>
                </Card>
                <Card><CardHeader title="Activity Timeline" />
                  <CardContent><Timeline items={timelineItems} /></CardContent>
                </Card>
              </Grid>
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
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Accordion</h2>
              <Card style={{ maxWidth: '600px' }}>
                <Accordion items={accordionItems} multiple defaultOpen={['1']} />
              </Card>
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Data & Tables</h2>
              <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap="24px">
                <Card><CardHeader title="Skeleton Loading" />
                  <CardContent><SkeletonCard /></CardContent>
                </Card>
                <Card><CardHeader title="Table Loading" />
                  <CardContent><SkeletonTable rows={4} cols={3} /></CardContent>
                </Card>
              </Grid>
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Market Reports</h2>
              <Grid columns="repeat(auto-fit, minmax(260px, 1fr))" gap="24px">
                <Card><CardHeader title="Sensex" subtitle="Stock market index" />
                  <CardContent><div style={{ width: '100%', overflow: 'hidden' }}><AreaChart data={sensexData} width={300} height={180} color="#10b981" /></div></CardContent>
                </Card>
                <Card><CardHeader title="Nifty 50" subtitle="NSE benchmark" />
                  <CardContent><div style={{ width: '100%', overflow: 'hidden' }}><BarChart data={sensexData.map((d, i) => ({ label: d.label, value: niftyData[i]?.value || 0, color: '#3b82f6' }))} width={300} height={180} /></div></CardContent>
                </Card>
                <Card><CardHeader title="Bank Nifty" subtitle="Banking sector index" />
                  <CardContent><div style={{ width: '100%', overflow: 'hidden' }}><AreaChart data={bankNiftyData} width={300} height={180} color="#f59e0b" /></div></CardContent>
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

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Navigation</h2>
              <Stack gap="16px">
                <Tabs variant="underline" tabs={[
                  { id: 'tab1', label: 'Overview', content: <p>Overview content with details about the project.</p> },
                  { id: 'tab2', label: 'Analytics', badge: '5', content: <p>Analytics dashboard with charts and metrics.</p> },
                  { id: 'tab3', label: 'Settings', content: <p>Settings panel with configuration options.</p> },
                ]} />
                <Pagination page={page} totalPages={10} onChange={setPage} />
              </Stack>
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Stepper</h2>
              <Stepper steps={stepperItems} activeIndex={1} />
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Form Controls</h2>
              <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap="24px">
                <Card>
                  <CardHeader title="Basic Inputs" />
                  <CardContent>
                    <Stack gap="16px">
                      <Input label="Name" placeholder="Enter your name" />
                      <Input label="Email" placeholder="user@example.com" type="email" />
                      <Textarea label="Bio" placeholder="Tell us about yourself..." maxLength={200} showCount />
                    </Stack>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader title="Selection Controls" />
                  <CardContent>
                    <Stack gap="16px">
                      <CheckboxGroup label="Features" options={[
                        { value: 'option1', label: 'Analytics' }, { value: 'option2', label: 'Reporting' }, { value: 'option3', label: 'API Access' },
                      ]} value={checkboxValues} onChange={setCheckboxValues} />
                      <RadioGroup label="Plan" options={[
                        { value: 'free', label: 'Free', description: 'Basic features' },
                        { value: 'pro', label: 'Pro', description: 'Advanced features' },
                        { value: 'enterprise', label: 'Enterprise', description: 'All features' },
                      ]} value={radioValue} onChange={setRadioValue} />
                      <Switch label="Dark Theme" checked={theme === 'dark'} onChange={toggleTheme} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </section>

            <section style={{ marginTop: '24px' }}>
              <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap="24px">
                <Card>
                  <CardHeader title="Dropdowns & Date" />
                  <CardContent>
                    <Stack gap="16px">
                      <Select label="Country" options={[
                        { value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' },
                        { value: 'ca', label: 'Canada' }, { value: 'au', label: 'Australia' },
                      ]} value={selectValue} onChange={setSelectValue} clearable />
                      <MultiSelect label="Skills" options={[
                        { value: 'react', label: 'React' }, { value: 'typescript', label: 'TypeScript' },
                        { value: 'node', label: 'Node.js' }, { value: 'python', label: 'Python' }, { value: 'go', label: 'Go' },
                      ]} value={multiSelectValue} onChange={setMultiSelectValue} />
                      <DatePicker label="Birthday" value={dateValue} onChange={setDateValue} />
                    </Stack>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader title="Slider & Upload" />
                  <CardContent>
                    <Stack gap="16px">
                      <Slider label="Volume" value={sliderValue} onChange={setSliderValue} showValue formatValue={(v) => `${v}%`} />
                      <FileUpload label="Documents" hint="PDF, DOC up to 10MB" accept=".pdf,.doc,.docx" multiple value={files} onChange={setFiles} />
                      <Button onClick={() => setShowModal(true)} style={{ marginTop: '8px' }}>Open Modal</Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </section>

            <Spacer />
            <Divider />

            <section style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Buttons</h2>
              <Stack gap="16px">
                <Stack direction="horizontal" gap="8px" wrap>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </Stack>
                <Stack direction="horizontal" gap="8px" wrap>
                  <Badge color="#3b82f6">Primary</Badge>
                  <Badge color="#10b981">Success</Badge>
                  <Badge color="#f59e0b">Warning</Badge>
                  <Badge color="#ef4444">Danger</Badge>
                  <Badge color="#06b6d4">Info</Badge>
                </Stack>
              </Stack>
            </section>
          </div>
        </main>
      </div>

      <BottomNav items={bottomNavItems} activeId={activeNav} onNavigate={setActiveNav} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Demo Modal" description="This is a modal example.">
        <p>Modal content goes here.</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={() => { addToast('success', 'Saved!'); setShowModal(false); }}>Save</Button>
        </div>
      </Modal>
    </div>
  );
}

export default function ShowcasePage() {
  return (<ToastProvider><ShowcaseContent /></ToastProvider>);
}
