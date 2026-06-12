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

type Section =
  | 'intro'
  | 'primitives' | 'semantic' | 'intent'
  | 'buttons' | 'badges' | 'inputs' | 'avatars' | 'alerts' | 'risk'
  | 'toggles' | 'checkboxes' | 'modals' | 'tooltips' | 'tabs' | 'selects'

const META: Record<Section, { heading: string; desc: string }> = {
  intro:      { heading: 'Introduction',        desc: 'A working reference for the UI patterns, tokens and components that support the Comply365 product.' },
  primitives: { heading: 'Primitive colours',  desc: 'Raw colour scales — gray, blue, red, green, yellow, orange, cyan, purple, pink and the primary alias. Dark mode flips the gray scale automatically.' },
  semantic:   { heading: 'Semantic tokens',     desc: 'Purpose-driven aliases: surface layers, text hierarchy, border strengths, control states, shadows. These adapt between light and dark.' },
  intent:     { heading: 'Intent tokens',       desc: 'Component-level intent tokens for bg, text and border across every semantic category: primary, neutral, danger, success, warning, info, discovery, yellow, pink and cyan.' },
  buttons:    { heading: 'Buttons',             desc: 'Primary, secondary, tertiary, ghost, danger and link variants across five sizes — all tokens from --bg-primary-solid, --bg-danger-solid, --border-neutral-outline.' },
  badges:     { heading: 'Badges',              desc: 'Soft, solid, outline and soft-outline badge styles across all intent colours. Uses --bg-{intent}-muted, --text-{intent}-default, --border-{intent}-muted.' },
  inputs:     { heading: 'Inputs',              desc: 'Text field variants using --control-border, --control-border-invalid, --control-text, --control-placeholder. Error state wires to --text-danger-default.' },
  avatars:    { heading: 'Avatars',             desc: 'User avatar in all six sizes, with online/away/busy/offline status dots wired to --bg-success-solid, --bg-warning-solid, --bg-danger-solid.' },
  alerts:     { heading: 'Alerts',              desc: 'Feedback banners for info, success, warning and danger. Background from --bg-{intent}-muted, border from --border-{intent}-default.' },
  risk:       { heading: 'Risk scale',          desc: 'Comply365-specific risk level indicator using --color-risk-low through --color-risk-high.' },
  toggles:    { heading: 'Toggles',             desc: 'Boolean on/off switch in two sizes. Checked state uses --bg-primary-solid; unchecked uses --border-default.' },
  checkboxes: { heading: 'Checkboxes',          desc: 'Checkbox with checked, unchecked and indeterminate states. Uses --bg-primary-solid for the checked fill and --control-border for the ring.' },
  modals:     { heading: 'Modals',              desc: 'Overlay dialog with title, description, body and footer slots in three widths. Clicking the backdrop dismisses.' },
  tooltips:   { heading: 'Tooltips',            desc: 'Hover-activated label in four placements. Uses --bg-neutral-solid and --text-neutral-solid.' },
  tabs:       { heading: 'Tabs',                desc: 'Underline and pill tab variants. Active tab uses --bg-primary-solid for the indicator or fill. Optional badge counts.' },
  selects:    { heading: 'Selects',             desc: 'Styled native select matching Input conventions. Uses --control-border, --control-text and --surface-primary.' },
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
              <ShowcaseBlock title="Variants">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="link">Link</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="Sizes">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">X-Large</Button>
                <Button size="2xl">2X-Large</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="Secondary sizes">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Medium</Button>
                <Button variant="secondary" size="lg">Large</Button>
                <Button variant="secondary" size="xl">X-Large</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="With icons">
                <Button leadingIcon={<PlusIcon />}>New item</Button>
                <Button variant="secondary" trailingIcon={<ChevronIcon />}>More options</Button>
                <Button variant="danger" leadingIcon={<TrashIcon />}>Delete</Button>
              </ShowcaseBlock>
              <ShowcaseBlock title="Disabled">
                <Button disabled>Primary</Button>
                <Button variant="secondary" disabled>Secondary</Button>
                <Button variant="danger" disabled>Danger</Button>
              </ShowcaseBlock>
            </>
          )}

          {active === 'badges' && (
            <>
              <ShowcaseBlock title="Soft (default)">
                {INTENT_COLORS.map(({ intent }) => (
                  <Badge key={intent} label={cap(intent)} intent={intent} />
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock title="Solid">
                {INTENT_COLORS.map(({ intent }) => (
                  <Badge key={intent} label={cap(intent)} intent={intent} badgeStyle="solid" />
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock title="Outline">
                {INTENT_COLORS.map(({ intent }) => (
                  <Badge key={intent} label={cap(intent)} intent={intent} badgeStyle="outline" />
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock title="Soft outline">
                {INTENT_COLORS.map(({ intent }) => (
                  <Badge key={intent} label={cap(intent)} intent={intent} badgeStyle="soft-outline" />
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock title="With dot">
                {(['neutral','danger','success','warning','info'] as const).map(intent => (
                  <Badge key={intent} label={cap(intent)} intent={intent} dot />
                ))}
              </ShowcaseBlock>
              <ShowcaseBlock title="Sizes — neutral">
                <Badge label="Small"   size="sm" />
                <Badge label="Medium"  size="md" />
                <Badge label="Large"   size="lg" />
              </ShowcaseBlock>
              <ShowcaseBlock title="Removable">
                <Badge label="Tag" onRemove={() => {}} />
                <Badge label="Success" intent="success" dot onRemove={() => {}} />
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
                  <Input label="Search" placeholder="Search documents…" leadingIcon={<SearchIcon />} />
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
                footer={
                  <>
                    <Button variant="secondary" onClick={() => setOpenModal(null)}>Cancel</Button>
                    <Button variant="danger" onClick={() => setOpenModal(null)}>Delete</Button>
                  </>
                }
              >
                <p style={{ margin: 0 }}>
                  Are you sure you want to delete <strong>Q3 Safety Report.pdf</strong>? All associated
                  comments and audit logs will also be removed.
                </p>
              </Modal>
              <ShowcaseBlock title="Sizes">
                <Button variant="secondary" onClick={() => setOpenModal('sm')}>Open small</Button>
                <Button variant="secondary" onClick={() => setOpenModal('md')}>Open medium</Button>
                <Button variant="secondary" onClick={() => setOpenModal('lg')}>Open large</Button>
              </ShowcaseBlock>
            </>
          )}

          {active === 'tooltips' && (
            <ShowcaseBlock title="Placements">
              <Tooltip content="Top tooltip" placement="top">
                <Button variant="secondary">Top</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" placement="bottom">
                <Button variant="secondary">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left tooltip" placement="left">
                <Button variant="secondary">Left</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" placement="right">
                <Button variant="secondary">Right</Button>
              </Tooltip>
            </ShowcaseBlock>
          )}

          {active === 'tabs' && (
            <>
              <ShowcaseBlock title="Underline">
                <Tabs
                  variant="underline"
                  active={activeTabUnder}
                  onChange={setActiveTabUnder}
                  tabs={[
                    { id: 'overview', label: 'Overview' },
                    { id: 'documents', label: 'Documents', badge: 12 },
                    { id: 'activity', label: 'Activity' },
                    { id: 'settings', label: 'Settings' },
                  ]}
                />
              </ShowcaseBlock>
              <ShowcaseBlock title="Pill">
                <Tabs
                  variant="pill"
                  active={activeTabPill}
                  onChange={setActiveTabPill}
                  tabs={[
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

        </main>
      </div>
    </div>
  )
}

// ── tiny icons ────────────────────────────────────────────────────────────────
function PlusIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}
function ChevronIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
}
function TrashIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
}
function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }
