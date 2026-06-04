// ─── Introduction page ────────────────────────────────────────────────────────

// ── Shared primitives ──────────────────────────────────────────────────────────

function Heading({ children }: { children: string }) {
  return (
    <h2 style={{
      margin: '0 0 14px',
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.09em',
      color: 'var(--text-subtle)',
    }}>
      {children}
    </h2>
  )
}

function InlineCode({ children }: { children: string }) {
  return (
    <code style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: 'var(--surface-secondary)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sm)',
      padding: '2px 6px',
      color: 'var(--text-default)',
    }}>
      {children}
    </code>
  )
}

// ── What's included ────────────────────────────────────────────────────────────

const INCLUDED = [
  {
    label: 'Design tokens',
    body: 'Colour scales, typography, radius, shadow, z-index — all as CSS custom properties.',
  },
  {
    label: 'Core components',
    body: 'Buttons, badges, inputs, avatars, alerts and risk indicators with live examples.',
  },
  {
    label: 'Usage patterns',
    body: 'State variants, composition patterns, and guidance on when to reach for each token layer.',
  },
]

function IncludedGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
      {INCLUDED.map(item => (
        <div key={item.label} style={{
          padding: '14px 16px',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--surface-primary)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-emphasis)', marginBottom: 4 }}>{item.label}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.body}</div>
        </div>
      ))}
    </div>
  )
}

// ── Three-layer diagram ────────────────────────────────────────────────────────

const LAYERS = [
  {
    num: '1',
    name: 'Intents',
    reach: 'Reach for these FIRST',
    desc: 'Tokens that describe meaning — danger, success, info, primary. Use on anything with a role: buttons, badges, alerts, tags.',
    examples: ['--bg-danger-soft', '--text-primary-solid', '--border-success-default'],
    bg: 'var(--bg-primary-soft)',
    stripe: 'var(--bg-primary-solid)',
    numBg: 'var(--bg-primary-solid)',
    numBorder: 'none',
    numText: 'var(--text-primary-solid)',
    badgeBg: 'var(--bg-primary-solid)',
    badgeText: 'var(--text-primary-solid)',
    badgeBorder: 'transparent',
  },
  {
    num: '2',
    name: 'Semantic tokens',
    reach: 'Reach for these NEXT',
    desc: 'Tokens that describe purpose in layout — page surfaces, default text, borders. Use for chrome, layout, and typography.',
    examples: ['--surface-page', '--text-default', '--border-default'],
    bg: 'var(--surface-secondary)',
    stripe: 'var(--border-emphasis)',
    numBg: 'transparent',
    numBorder: '1.5px solid var(--border-emphasis)',
    numText: 'var(--text-muted)',
    badgeBg: 'var(--surface-primary)',
    badgeText: 'var(--text-muted)',
    badgeBorder: 'var(--border-default)',
  },
  {
    num: '3',
    name: 'Primitives',
    reach: 'One-off cases only',
    desc: 'Raw colour scales — gray, blue, red, etc. Use only when no semantic or intent token fits: data viz, or building the DS itself.',
    examples: ['--gray-900', '--blue-500', '--alpha-08'],
    bg: 'var(--surface-primary)',
    stripe: 'var(--border-muted)',
    numBg: 'transparent',
    numBorder: '1.5px solid var(--border-default)',
    numText: 'var(--text-subtle)',
    badgeBg: 'var(--bg-warning-muted)',
    badgeText: 'var(--text-warning-default)',
    badgeBorder: 'var(--border-warning-muted)',
  },
]

function LayerDiagram() {
  return (
    <div>
      <div style={{
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
      }}>
        {LAYERS.map((layer, i) => (
          <div key={layer.name}>
            <div style={{
              padding: '16px 20px',
              background: layer.bg,
              boxShadow: `inset 4px 0 0 ${layer.stripe}`,
              borderTop: i > 0 ? '1px solid var(--border-default)' : 'none',
              display: 'grid',
              gridTemplateColumns: '32px 1fr',
              gap: '0 14px',
              alignItems: 'start',
            }}>
              {/* Step number */}
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: layer.numBg,
                border: layer.numBorder,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                color: layer.numText,
                marginTop: 1, flexShrink: 0,
              }}>
                {layer.num}
              </div>
              {/* Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-emphasis)' }}>
                    {layer.name}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 600,
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-md)',
                    background: layer.badgeBg,
                    border: `1px solid ${layer.badgeBorder}`,
                    color: layer.badgeText,
                    whiteSpace: 'nowrap' as const,
                    flexShrink: 0,
                    letterSpacing: '0.03em',
                  }}>
                    {layer.reach}
                  </span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {layer.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                  {layer.examples.map(ex => (
                    <code key={ex} style={{
                      fontSize: 11, fontFamily: 'monospace',
                      background: 'var(--surface-primary)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '2px 7px',
                      color: 'var(--text-default)',
                    }}>
                      {ex}
                    </code>
                  ))}
                </div>
              </div>
            </div>
            {/* Connector */}
            {i < LAYERS.length - 1 && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                padding: '5px 0',
                background: 'var(--surface-secondary)',
                borderTop: '1px solid var(--border-default)',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--border-emphasis)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <span style={{ fontSize: 10, color: 'var(--text-subtle)', fontStyle: 'italic' as const }}>
                  only if nothing above fits
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rule callout */}
      <div style={{
        marginTop: 12, padding: '11px 14px',
        background: 'var(--bg-warning-muted)',
        border: '1px solid var(--border-warning-muted)',
        borderRadius: 'var(--radius-lg)',
        fontSize: 12, color: 'var(--text-warning-default)', lineHeight: 1.55,
      }}>
        <strong>Rule:</strong> if you're reaching for a primitive inside a regular component, a semantic or intent token is probably missing — flag it instead of hard-coding.
      </div>
    </div>
  )
}

// ── Intent anatomy — two families ─────────────────────────────────────────────

const FAMILY_A = [
  { variant: 'solid',        use: 'Primary CTA, destructive confirm, loud status pill' },
  { variant: 'soft',         use: 'Default badge, subtle button, quiet status pill' },
  { variant: 'soft-outline', use: 'Badge when a tint alone isn\'t enough contrast' },
  { variant: 'outline',      use: 'Outlined button or pill' },
  { variant: 'ghost',        use: 'Text-button-style action, no visible background' },
]

const FAMILY_B = [
  { variant: 'muted',    use: 'Quiet contextual surface, tinted table rows' },
  { variant: 'default',  use: 'Default alert / callout / banner background' },
  { variant: 'emphasis', use: 'Alert that needs to draw the eye' },
]

function FamilyTable({ heading, subheading, rows }: { heading: string; subheading: string; rows: { variant: string; use: string }[] }) {
  return (
    <div style={{ flex: 1, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
      <div style={{ padding: '11px 14px', background: 'var(--surface-secondary)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-emphasis)' }}>{heading}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{subheading}</div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--surface-primary)' }}>
            {['Variant', 'Use for'].map(h => (
              <th key={h} style={{ padding: '6px 12px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.variant} style={{ borderTop: '1px solid var(--border-muted)' }}>
              <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' as const }}>
                <InlineCode>{row.variant}</InlineCode>
              </td>
              <td style={{ padding: '8px 12px', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{row.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Intent reference table ────────────────────────────────────────────────────

const INTENTS = [
  { name: 'primary',   colour: 'gray (rebrandable)', when: 'The brand action / primary CTA',                     tag: false },
  { name: 'neutral',   colour: 'gray',               when: 'Quiet actions, secondary chrome, unstyled tags',     tag: false },
  { name: 'danger',    colour: 'red',                when: 'Destructive actions, errors, validation failures',   tag: false },
  { name: 'success',   colour: 'green',              when: 'Confirmation, positive states, completion',          tag: false },
  { name: 'warning',   colour: 'orange',             when: 'Caution, attention, things needing review',          tag: false },
  { name: 'info',      colour: 'blue',               when: 'Informational callouts, neutral-tone notifications', tag: false },
  { name: 'discovery', colour: 'purple',             when: 'AI / generated / experimental surfaces',             tag: false },
  { name: 'yellow',    colour: 'yellow',             when: 'Pending / in-review states (tag colour)',            tag: true  },
  { name: 'pink',      colour: 'pink',               when: 'Secondary tag colour',                               tag: true  },
  { name: 'cyan',      colour: 'cyan',               when: 'Secondary tag colour',                               tag: true  },
]

function IntentReference() {
  return (
    <div>
      <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-secondary)' }}>
              {['', 'Intent', 'Colour', 'When to use'].map(h => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INTENTS.map(row => (
              <tr key={row.name} style={{ borderTop: '1px solid var(--border-muted)' }}>
                <td style={{ padding: '8px 14px', width: 32 }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: `var(--bg-${row.name}-solid)`,
                    border: '1px solid var(--border-default)',
                    flexShrink: 0,
                  }} />
                </td>
                <td style={{ padding: '8px 14px', whiteSpace: 'nowrap' as const }}>
                  <code style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-default)', fontWeight: 500 }}>
                    {row.name}
                  </code>
                  {row.tag && (
                    <span style={{
                      marginLeft: 7, fontSize: 10, fontWeight: 500,
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-neutral-muted)',
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-subtle)',
                      verticalAlign: 'middle',
                    }}>
                      tag
                    </span>
                  )}
                </td>
                <td style={{ padding: '8px 14px', fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' as const }}>{row.colour}</td>
                <td style={{ padding: '8px 14px', fontSize: 12, color: 'var(--text-muted)' }}>{row.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{
        margin: '10px 0 0', padding: '10px 14px',
        background: 'var(--bg-neutral-muted)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--text-default)' }}>yellow, pink and cyan</strong> are intents in the technical sense but are mostly used as tag colours rather than semantic states. Reach for <strong style={{ color: 'var(--text-default)' }}>danger / success / warning / info / discovery</strong> first when the state has meaning.
      </p>
    </div>
  )
}

// ── Quick chooser ──────────────────────────────────────────────────────────────

const CHOOSER = [
  { task: 'A button',                             reach: 'Family A — solid, soft, outline, ghost' },
  { task: 'A badge / tag / pill',                 reach: 'Family A — solid, soft, soft-outline' },
  { task: 'An inline alert / banner',             reach: 'Family B — muted, default, emphasis' },
  { task: 'A callout or notification card',       reach: 'Family B — default bg + matching text/border' },
  { task: 'A tinted row (e.g. row has an error)', reach: 'Family B — muted or muted-alpha' },
  { task: 'Layout / chrome / body text',          reach: 'Semantic tokens' },
  { task: 'A form control',                       reach: '--control-* family' },
  { task: 'Data viz / charts',                    reach: 'Primitives' },
]

function ChooserTable() {
  return (
    <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--surface-secondary)' }}>
            {["You're building…", 'Reach for…'].map(h => (
              <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CHOOSER.map(row => (
            <tr key={row.task} style={{ borderTop: '1px solid var(--border-muted)' }}>
              <td style={{ padding: '9px 14px', fontSize: 13, color: 'var(--text-default)', whiteSpace: 'nowrap' as const }}>{row.task}</td>
              <td style={{ padding: '9px 14px', fontSize: 12, color: 'var(--text-muted)' }}>{row.reach}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Decision flowchart ─────────────────────────────────────────────────────────

const FLOW = [
  {
    question: 'Does this have meaning — error, success, primary action, info?',
    answer: 'Use an intent token',
    detail: ['Button / badge / tag → Family A (solid, soft, outline, ghost)', 'Alert / banner / row tint → Family B (muted, default, emphasis)'],
  },
  {
    question: 'Is this layout, chrome, or body text?',
    answer: 'Use a semantic token',
    detail: ['--surface-*, --text-*, --border-*, --app-*'],
  },
  {
    question: 'Is this a form control?',
    answer: 'Use --control-* family',
    detail: ['--control-border, --control-bg-hover, --control-text, --control-ring …'],
  },
  {
    question: 'Is this data viz or a genuine one-off with no semantic meaning?',
    answer: 'Use a primitive',
    detail: ['--gray-900, --blue-500, --red-600 …'],
  },
  {
    question: 'Nothing fits?',
    answer: 'Flag it as a missing token',
    detail: ["Don't hard-code a value. Raise it so the DS can grow."],
  },
]

function Flowchart() {
  return (
    <div>
      {FLOW.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 0 }}>
          {/* Track */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 36, flexShrink: 0 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
              background: i === 0 ? 'var(--bg-primary-solid)' : 'var(--surface-secondary)',
              border: i === 0 ? 'none' : '1px solid var(--border-default)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
              color: i === 0 ? 'var(--text-primary-solid)' : 'var(--text-muted)',
              zIndex: 1,
            }}>
              {i + 1}
            </div>
            {i < FLOW.length - 1 && (
              <div style={{ width: 1, flex: 1, minHeight: 16, background: 'var(--border-default)' }} />
            )}
          </div>
          {/* Content */}
          <div style={{ flex: 1, paddingLeft: 10, paddingBottom: 22 }}>
            <p style={{ margin: '3px 0 6px', fontSize: 13, color: 'var(--text-default)', fontWeight: 500, lineHeight: 1.4 }}>
              {step.question}
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '4px 10px', marginBottom: 6,
              background: 'var(--bg-info-muted)',
              border: '1px solid var(--border-info-muted)',
              borderRadius: 'var(--radius-md)',
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-info-default)', fontWeight: 500 }}>
                → {step.answer}
              </span>
            </div>
            <div>
              {step.detail.map(d => (
                <div key={d} style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>· {d}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Code examples ──────────────────────────────────────────────────────────────

const CODE_EXAMPLES = [
  {
    label: 'Family A — danger button (component variant, interactive)',
    code: `<button class="bg-(--bg-danger-solid) text-(--text-danger-solid)
         hover:bg-(--bg-danger-solid-hover)">
  Delete
</button>`,
  },
  {
    label: 'Family B — danger alert (surface tint, static)',
    code: `<div class="bg-(--bg-danger-default) border border-(--border-danger-default)
      text-(--text-danger-default)">
  Something went wrong.
</div>`,
  },
]

function CodeExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {CODE_EXAMPLES.map(ex => (
        <div key={ex.label}>
          <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>
            {ex.label}
          </div>
          <pre style={{
            margin: 0, padding: '14px 16px',
            background: 'var(--surface-secondary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 12, fontFamily: 'monospace',
            color: 'var(--text-default)',
            overflowX: 'auto',
            lineHeight: 1.65,
          }}>
            {ex.code}
          </pre>
        </div>
      ))}
    </div>
  )
}

// ── File map ───────────────────────────────────────────────────────────────────

const FILE_MAP = [
  { file: 'primitives.css', contents: 'Raw colour scales: gray, blue, cyan, green, yellow, orange, red, purple, pink + alpha overlay' },
  { file: 'base.css',       contents: 'Semantic tokens: --surface-*, --text-*, --border-*, --ring, --control-*, shadows, app chrome' },
  { file: 'intents.css',    contents: 'Intent tokens for primary, neutral, danger, success, warning, info, discovery, yellow, pink, cyan' },
  { file: 'app.css',        contents: 'Imports everything; exposes Tailwind utilities, radius scale, type scale, shadow scale, z-index scale' },
]

function FileMap() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-secondary)' }}>
              {['File', "What's in it"].map(h => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FILE_MAP.map(row => (
              <tr key={row.file} style={{ borderTop: '1px solid var(--border-muted)' }}>
                <td style={{ padding: '9px 14px', whiteSpace: 'nowrap' as const }}>
                  <InlineCode>{row.file}</InlineCode>
                </td>
                <td style={{ padding: '9px 14px', fontSize: 12, color: 'var(--text-muted)' }}>{row.contents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{
        padding: '11px 14px',
        background: 'var(--bg-info-muted)',
        border: '1px solid var(--border-info-muted)',
        borderRadius: 'var(--radius-lg)',
        fontSize: 12, color: 'var(--text-info-default)', lineHeight: 1.6,
      }}>
        <strong>Alpha overlay scale</strong> (<InlineCode>--alpha-02</InlineCode> → <InlineCode>--alpha-50</InlineCode>): neutral black overlays at increasing opacity, defined in <InlineCode>primitives.css</InlineCode>. They adapt to whatever surface they sit on, making them ideal for borders and subtle tints that need to mix with the background rather than fight it. Dark mode automatically flips the base to white so the overlays stay correct.
      </div>
      <div style={{
        padding: '11px 14px',
        background: 'var(--bg-discovery-muted)',
        border: '1px solid var(--border-discovery-muted)',
        borderRadius: 'var(--radius-lg)',
        fontSize: 12, color: 'var(--text-discovery-default)', lineHeight: 1.6,
      }}>
        <strong>Primary palette:</strong> currently aliased to gray. To rebrand, swap <InlineCode>--primary-*</InlineCode> to any hue and the entire primary intent retunes itself — buttons, badges, focus rings, and all primary-intent tokens update in one place.
      </div>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────────

export function IntroSection() {
  return (
    <div style={{ maxWidth: 740, display: 'flex', flexDirection: 'column', gap: 44 }}>

      <section>
        <Heading>What's included</Heading>
        <IncludedGrid />
      </section>

      <section>
        <Heading>The three-layer token system</Heading>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Every colour decision maps to one of three layers. Start at the top — only drop down when nothing above fits.
        </p>
        <LayerDiagram />
      </section>

      <section>
        <Heading>Intent anatomy — two families</Heading>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Each intent (danger, success, primary, etc.) has two families. Pick the right family before picking the variant.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <FamilyTable
            heading="Family A — Component variants"
            subheading="Buttons, badges, tags, pills. Has hover/active states."
            rows={FAMILY_A}
          />
          <FamilyTable
            heading="Family B — Surface tints"
            subheading="Alerts, banners, callouts, row tints. Static, no hover."
            rows={FAMILY_B}
          />
        </div>
        <div style={{
          marginTop: 12, padding: '11px 14px',
          background: 'var(--surface-secondary)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6,
        }}>
          <strong style={{ color: 'var(--text-default)' }}>-alpha variants:</strong> each muted and default tint has a transparent counterpart (<InlineCode>--bg-danger-muted-alpha</InlineCode>, <InlineCode>--bg-danger-default-alpha</InlineCode>, etc.). Use these when the same component may appear on multiple surfaces — for example, a banner that sits on a page background in one place and inside a dialog in another — so the tint mixes with whatever is behind it instead of clashing.
        </div>
      </section>

      <section>
        <Heading>Intent reference</Heading>
        <IntentReference />
      </section>

      <section>
        <Heading>Quick chooser</Heading>
        <ChooserTable />
      </section>

      <section>
        <Heading>Decision flowchart</Heading>
        <Flowchart />
      </section>

      <section>
        <Heading>Code examples — Tailwind v4 syntax</Heading>
        <CodeExamples />
      </section>

      <section>
        <Heading>File map</Heading>
        <FileMap />
      </section>

    </div>
  )
}
