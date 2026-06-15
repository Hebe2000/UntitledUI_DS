import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { ThemeToggle } from './components/ThemeToggle'
import { Sidebar } from './components/Sidebar'
import { PrimitivesSection, SemanticSection, IntentSection } from './sections/TokenSection'
import { IntroSection } from './sections/IntroSection'
import {
  Button, Badge, Input, Avatar, Alert, RiskIndicator, ShowcaseBlock,
  Toggle, Checkbox, Modal, Tooltip, Tabs, Select,
} from './sections/ComponentSection'
import { Plus, ChevronDown, Trash01, SearchLg, AlertTriangle } from '@untitled-ui/icons-react'
import { LoginPageExample } from './sections/ExamplesSection'

type Section =
  | 'intro'
  | 'primitives' | 'semantic' | 'intent'
  | 'buttons' | 'badges' | 'inputs' | 'avatars' | 'alerts' | 'risk'
  | 'toggles' | 'checkboxes' | 'modals' | 'tooltips' | 'tabs' | 'selects'
  | 'login-example'

const META: Record<Section, { heading: string; desc: string }> = {
  intro:      { heading: 'Introduction',        desc: 'A working reference for the UI patterns, tokens and components that support the Comply365 product.' },
  primitives: { heading: 'Primitive colours',  desc: 'Raw colour scales — gray, blue, red, green, yellow, orange, cyan, purple, pink and the primary alias. Dark mode flips the gray scale automatically.' },
  semantic:   { heading: 'Semantic tokens',     desc: 'Purpose-driven aliases: surface layers, text hierarchy, border strengths, control states, shadows. These adapt between light and dark.' },
  intent:     { heading: 'Intent tokens',       desc: 'Component-level intent tokens for bg, text and border across every semantic category: primary, neutral, danger, success, warning, info, discovery, yellow, pink and cyan.' },
  buttons:    { heading: 'Buttons',             desc: 'Primary, secondary, tertiary, link-gray, link-color and destructive variants across five sizes (xs–xl) — tokens from --bg-primary-solid, --bg-danger-solid, --border-default.' },
  badges:     { heading: 'Badges',              desc: 'Pill-color, badge-color and badge-modern badge types across all intent colours. Uses --bg-{intent}-muted, --text-{intent}-default, --border-{intent}-muted.' },
  inputs:     { heading: 'Inputs',              desc: 'Text field variants using --control-border, --control-border-invalid, --control-text, --control-placeholder. Error state wires to --text-danger-default.' },
  avatars:    { heading: 'Avatars',             desc: 'User avatar in all six sizes, with online/away/busy/offline status dots wired to --bg-success-solid, --bg-warning-solid, --bg-danger-solid.' },
  alerts:     { heading: 'Alerts',              desc: 'Feedback banners for info, success, warning and danger. Background from --bg-{intent}-muted, border from --border-{intent}-default.' },
  risk:       { heading: 'Risk scale',          desc: 'Comply365-specific risk level indicator using --color-risk-low through --color-risk-high.' },
  toggles:    { heading: 'Toggles',             desc: 'Boolean on/off switch in two sizes. Checked state uses --bg-primary-solid; unchecked uses --border-default.' },
  checkboxes: { heading: 'Checkboxes',          desc: 'Checkbox with checked, unchecked and indeterminate states. Uses --bg-primary-solid for the checked fill and --control-border for the ring.' },
  modals:     { heading: 'Modals',              desc: 'Overlay dialog with title, description, body and footer slots in three widths. Clicking the backdrop dismisses.' },
  tooltips:   { heading: 'Tooltips',            desc: 'Hover-activated label with optional description, in four placements. Uses --bg-neutral-solid and --text-neutral-solid.' },
  tabs:       { heading: 'Tabs',                desc: 'Underline, button-border and button-gray tab types. Active tab uses --bg-primary-solid for the indicator or fill. Optional icon and badge slots.' },
  selects:    { heading: 'Selects',             desc: 'Styled native select matching Input conventions. Uses --control-border, --control-text and --surface-primary.' },
  'login-example': { heading: 'Login page', desc: 'A composed example screen built from Input, Button and Alert, using surface, text, control and success tokens together.' },
}

const INTENT_COLORS: Array<{
  intent: 'neutral'|'primary'|'danger'|'success'|'warning'|'info'|'discovery'|'yellow'|'pink'|'cyan'
}> = [
  { intent: 'neutral' },
  { intent: 'primary' },
  { intent: 'danger' },
  { intent: 'success' },
  { intent: 'warning' },
  { intent: 'info' },
  { intent: 'discovery' },
  { intent: 'yellow' },
  { intent: 'pink' },
  { intent: 'cyan' },
]

export default function App() {
  const { theme, toggle } = useTheme()
  const [active, setActive] = useState<Section>('intro')
  const [dismissedAlert, setDismissedAlert] = useState(false)
  const [toggleA, setToggleA] = useState(true)
  const [toggleB, setToggleB] = useState(false)
  const [checkA, setCheckA] = useState(true)
  const [checkB, setCheckB] = useState(false)
  const [openModal, setOpenModal] = useState<'sm' | 'md' | 'lg' | null>(null)
  const [activeTabUnder, setActiveTabUnder] = useState('overview')
  const [activeTabPill, setActiveTabPill] = useState('all')
  const [selectVal, setSelectVal] = useState('')
  const { heading, desc } = META[active]

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100dvh',
      background: 'var(--surface-page)',
      color: 'var(--text-default)',
    }}>
      {/* ── header ──────────────────────────────────────────────── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: 52,
        borderBottom: '1px solid var(--app-border)',
        background: 'var(--surface-primary)',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-index-header)',
        flexShrink: 0,
        boxShadow: 'var(--shadow-xs)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 'var(--radius-md)',
            background: 'var(--bg-primary-solid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-primary-solid)',
            fontSize: 12, fontWeight: 700, letterSpacing: '-0.5px',
          }}>
            C
          </div>
          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-emphasis)' }}>Comply365</span>
          <span style={{ color: 'var(--text-subtle)', fontSize: 13 }}>/</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Design System</span>
        </div>
        <ThemeToggle theme={theme} onToggle={toggle} />
      </header>

      {/* ── body ────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar active={active} onNav={id => setActive(id as Section)} />

        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 40px',
        }}>
          {/* section header */}
          <div style={{ marginBottom: 28, maxWidth: 640 }}>
            <h1 style={{
              margin: '0 0 6px',
              fontSize: 'var(--text-2xl)',
              fontWeight: 600,
              color: 'var(--text-emphasis)',
              letterSpacing: 'var(--text-2xl--letter-spacing)',
              lineHeight: 'var(--text-2xl--line-height)',
            }}>
              {heading}
            </h1>
            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--text-sm--line-height)' }}>
              {desc}
            </p>
          </div>

          {/* ── Token sections ─────────────────────────────────── */}
          {active === 'intro'      && <IntroSection />}
          {active === 'primitives' && <PrimitivesSection theme={theme} />}
          {active === 'semantic'   && <SemanticSection   theme={theme} />}
          {active === 'intent'     && <IntentSection     theme={theme} />}

          {/* ── Component sections ─────────────────────────────── */}
          {active === 'buttons' && (
            <>
              <ShowcaseBlock title="Colors">
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="tertiary">Tertiary</Button>
                <Button color="link-gray">Link gray</Button>
                <Button color="link-color">Link color</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="Destructive">
                <Button color="primary-destructive">Primary</Button>
                <Button color="secondary-destructive">Secondary</Button>
                <Button color="tertiary-destructive">Tertiary</Button>
                <Button color="link-destructive">Link</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="Sizes">
                <Button size="xs">Extra small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra large</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="Secondary sizes">
                <Button color="secondary" size="xs">Extra small</Button>
                <Button color="secondary" size="sm">Small</Button>
                <Button color="secondary" size="md">Medium</Button>
                <Button color="secondary" size="lg">Large</Button>
                <Button color="secondary" size="xl">Extra large</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="With icons">
                <Button iconLeading={Plus}>New item</Button>
                <Button color="secondary" iconTrailing={ChevronDown}>More options</Button>
                <Button color="primary-destructive" iconLeading={Trash01}>Delete</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="Icon only">
                <Button iconLeading={Plus} aria-label="Add" />
                <Button color="secondary" iconLeading={SearchLg} aria-label="Search" />
              </ShowcaseBlock>
              <ShowcaseBlock title="Loading">
                <Button isLoading>Primary</Button>
                <Button color="secondary" isLoading showTextWhileLoading>Secondary</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="Disabled">
                <Button isDisabled>Primary</Button>
                <Button color="secondary" isDisabled>Secondary</Button>
                <Button color="primary-destructive" isDisabled>Danger</Button>
              </ShowcaseBlock>
            </>
          )}

          {active === 'badges' && (
            <>
              <ShowcaseBlock title="Pill color (default)">
                {INTENT_COLORS.map(({ intent }) => (
                  <Badge key={intent} color={intent}>{cap(intent)}</Badge>
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock title="Badge color">
                {INTENT_COLORS.map(({ intent }) => (
                  <Badge key={intent} type="badge-color" color={intent}>{cap(intent)}</Badge>
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock title="Badge modern">
                {INTENT_COLORS.map(({ intent }) => (
                  <Badge key={intent} type="badge-modern" color={intent}>{cap(intent)}</Badge>
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock title="With dot">
                {(['neutral','danger','success','warning','info'] as const).map(intent => (
                  <Badge key={intent} color={intent} dot>{cap(intent)}</Badge>
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock title="Sizes — neutral">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </ShowcaseBlock>
              <ShowcaseBlock title="Removable">
                <Badge onRemove={() => {}}>Tag</Badge>
                <Badge color="success" dot onRemove={() => {}}>Success</Badge>
              </ShowcaseBlock>
            </>
          )}

          {active === 'inputs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 440 }}>
              <ShowcaseBlock title="Default">
                <div style={{ width: '100%' }}>
                  <Input label="Email" placeholder="you@comply365.com" type="email" />
                </div>
              </ShowcaseBlock>
              <ShowcaseBlock title="With hint text">
                <div style={{ width: '100%' }}>
                  <Input label="Password" type="password" placeholder="Min. 8 characters" hint="Must contain an uppercase letter and a number." />
                </div>
              </ShowcaseBlock>
              <ShowcaseBlock title="Error state">
                <div style={{ width: '100%' }}>
                  <Input label="Email" type="email" defaultValue="not-an-email" error="Please enter a valid email address." />
                </div>
              </ShowcaseBlock>
              <ShowcaseBlock title="With leading icon">
                <div style={{ width: '100%' }}>
                  <Input label="Search" placeholder="Search documents…" icon={SearchLg} />
                </div>
              </ShowcaseBlock>
            </div>
          )}

          {active === 'avatars' && (
            <>
              <ShowcaseBlock title="Sizes with initials">
                <Avatar initials="MK" size="xs" />
                <Avatar initials="MK" size="sm" />
                <Avatar initials="MK" size="md" />
                <Avatar initials="MK" size="lg" />
                <Avatar initials="MK" size="xl" />
                <Avatar initials="MK" size="2xl" />
              </ShowcaseBlock>
              <ShowcaseBlock title="Status indicators">
                <Avatar initials="ON" size="lg" status="online"  />
                <Avatar initials="AW" size="lg" status="away"    />
                <Avatar initials="BS" size="lg" status="busy"    />
                <Avatar initials="OF" size="lg" status="offline" />
              </ShowcaseBlock>
            </>
          )}

          {active === 'alerts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 560 }}>
              <Alert variant="info"    title="Heads up"          description="This action may affect all users in your workspace." />
              <Alert variant="success" title="Changes saved"     description="Your profile has been updated successfully." />
              <Alert variant="warning" title="Usage limit approaching" description="You've used 85 % of your monthly document quota." />
              {!dismissedAlert
                ? <Alert variant="danger" title="Submission failed" description="Please fix the errors below before continuing." onClose={() => setDismissedAlert(true)} />
                : (
                  <button
                    onClick={() => setDismissedAlert(false)}
                    style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'inherit' }}
                  >
                    ↺ Restore danger alert
                  </button>
                )
              }
            </div>
          )}

          {active === 'risk' && (
            <>
              <ShowcaseBlock title="Risk levels">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <RiskIndicator level="low" />
                  <RiskIndicator level="low-med" />
                  <RiskIndicator level="med" />
                  <RiskIndicator level="med-high" />
                  <RiskIndicator level="high" />
                </div>
              </ShowcaseBlock>
              <ShowcaseBlock title="Inline labels">
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  <RiskIndicator level="low"      label="Compliant — Low risk" />
                  <RiskIndicator level="med"      label="Review required" />
                  <RiskIndicator level="high"     label="Non-compliant — High risk" />
                </div>
              </ShowcaseBlock>
              <ShowcaseBlock title="Token reference">
                {(['low','low-med','med','med-high','high'] as const).map(l => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: `var(--color-risk-${l})` }} />
                    <code style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>--color-risk-{l}</code>
                  </div>
                ))}
              </ShowcaseBlock>
            </>
          )}
          {active === 'toggles' && (
            <>
              <ShowcaseBlock title="Sizes">
                <Toggle checked={toggleA} onChange={setToggleA} size="sm" label="Small" />
                <Toggle checked={toggleB} onChange={setToggleB} size="md" label="Medium" />
              </ShowcaseBlock>
              <ShowcaseBlock title="States">
                <Toggle checked={true}  onChange={() => {}} label="On" />
                <Toggle checked={false} onChange={() => {}} label="Off" />
                <Toggle checked={true}  onChange={() => {}} label="Disabled on"  disabled />
                <Toggle checked={false} onChange={() => {}} label="Disabled off" disabled />
              </ShowcaseBlock>
            </>
          )}

          {active === 'checkboxes' && (
            <>
              <ShowcaseBlock title="States">
                <Checkbox checked={checkA} onChange={setCheckA} label="Checked" />
                <Checkbox checked={checkB} onChange={setCheckB} label="Unchecked" />
                <Checkbox checked={false} onChange={() => {}} indeterminate label="Indeterminate" />
              </ShowcaseBlock>
              <ShowcaseBlock title="Disabled">
                <Checkbox checked={true}  onChange={() => {}} label="Checked"   disabled />
                <Checkbox checked={false} onChange={() => {}} label="Unchecked" disabled />
              </ShowcaseBlock>
            </>
          )}

          {active === 'modals' && (
            <>
              <Modal
                open={openModal !== null}
                onClose={() => setOpenModal(null)}
                title="Delete document"
                description="This action cannot be undone. The document will be permanently removed."
                size={openModal ?? 'md'}
                icon={AlertTriangle}
                iconColor="danger"
                footer={
                  <>
                    <Button color="secondary" onClick={() => setOpenModal(null)}>Cancel</Button>
                    <Button color="primary-destructive" onClick={() => setOpenModal(null)}>Delete</Button>
                  </>
                }
              >
                <p style={{ margin: 0 }}>
                  Are you sure you want to delete <strong>Q3 Safety Report.pdf</strong>? All associated
                  comments and audit logs will also be removed.
                </p>
              </Modal>
              <ShowcaseBlock title="Sizes">
                <Button color="secondary" onClick={() => setOpenModal('sm')}>Open small</Button>
                <Button color="secondary" onClick={() => setOpenModal('md')}>Open medium</Button>
                <Button color="secondary" onClick={() => setOpenModal('lg')}>Open large</Button>
              </ShowcaseBlock>
            </>
          )}

          {active === 'tooltips' && (
            <>
              <ShowcaseBlock title="Placements">
                <Tooltip title="Top tooltip" placement="top">
                  <Button color="secondary">Top</Button>
                </Tooltip>
                <Tooltip title="Bottom tooltip" placement="bottom">
                  <Button color="secondary">Bottom</Button>
                </Tooltip>
                <Tooltip title="Left tooltip" placement="left">
                  <Button color="secondary">Left</Button>
                </Tooltip>
                <Tooltip title="Right tooltip" placement="right">
                  <Button color="secondary">Right</Button>
                </Tooltip>
              </ShowcaseBlock>
              <ShowcaseBlock title="With description">
                <Tooltip title="Document status" description="Shows the current review stage and assigned reviewer." placement="top">
                  <Button color="secondary">Hover for details</Button>
                </Tooltip>
              </ShowcaseBlock>
            </>
          )}

          {active === 'tabs' && (
            <>
              <ShowcaseBlock title="Underline">
                <Tabs
                  type="underline"
                  selectedKey={activeTabUnder}
                  onChange={setActiveTabUnder}
                  items={[
                    { id: 'overview', label: 'Overview' },
                    { id: 'documents', label: 'Documents', badge: 12 },
                    { id: 'activity', label: 'Activity' },
                    { id: 'settings', label: 'Settings' },
                  ]}
                />
              </ShowcaseBlock>
              <ShowcaseBlock title="Button border">
                <Tabs
                  type="button-border"
                  selectedKey={activeTabPill}
                  onChange={setActiveTabPill}
                  items={[
                    { id: 'all', label: 'All', badge: 48 },
                    { id: 'active', label: 'Active' },
                    { id: 'archived', label: 'Archived' },
                  ]}
                />
              </ShowcaseBlock>
              <ShowcaseBlock title="Button gray">
                <Tabs
                  type="button-gray"
                  size="md"
                  selectedKey={activeTabPill}
                  onChange={setActiveTabPill}
                  items={[
                    { id: 'all', label: 'All', badge: 48 },
                    { id: 'active', label: 'Active' },
                    { id: 'archived', label: 'Archived' },
                  ]}
                />
              </ShowcaseBlock>
            </>
          )}

          {active === 'selects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 440 }}>
              <ShowcaseBlock title="Default">
                <div style={{ width: '100%' }}>
                  <Select
                    label="Country"
                    placeholder="Select a country…"
                    value={selectVal}
                    onChange={setSelectVal}
                    options={[
                      { value: 'au', label: 'Australia' },
                      { value: 'ca', label: 'Canada' },
                      { value: 'gb', label: 'United Kingdom' },
                      { value: 'us', label: 'United States' },
                    ]}
                  />
                </div>
              </ShowcaseBlock>
              <ShowcaseBlock title="With hint">
                <div style={{ width: '100%' }}>
                  <Select
                    label="Role"
                    hint="Determines what the user can access in the workspace."
                    value="viewer"
                    onChange={() => {}}
                    options={[
                      { value: 'admin',  label: 'Admin' },
                      { value: 'editor', label: 'Editor' },
                      { value: 'viewer', label: 'Viewer' },
                    ]}
                  />
                </div>
              </ShowcaseBlock>
              <ShowcaseBlock title="Error state">
                <div style={{ width: '100%' }}>
                  <Select
                    label="Department"
                    error="Please select a department."
                    placeholder="Select…"
                    value=""
                    onChange={() => {}}
                    options={[
                      { value: 'ops',    label: 'Operations' },
                      { value: 'safety', label: 'Safety' },
                      { value: 'hr',     label: 'HR' },
                    ]}
                  />
                </div>
              </ShowcaseBlock>
              <ShowcaseBlock title="Disabled">
                <div style={{ width: '100%' }}>
                  <Select
                    label="Region"
                    value="apac"
                    onChange={() => {}}
                    disabled
                    options={[{ value: 'apac', label: 'APAC' }]}
                  />
                </div>
              </ShowcaseBlock>
            </div>
          )}

          {/* ── Example sections ───────────────────────────────── */}
          {active === 'login-example' && <LoginPageExample theme={theme} />}

        </main>
      </div>
    </div>
  )
}

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }
