import { useEffect, useState } from 'react'
import primitivesRaw from '../styles/primitives.css?raw'
import baseRaw from '../styles/base.css?raw'
import intentsRaw from '../styles/intents.css?raw'
import appRaw from '../styles/app.css?raw'

// ─── helpers ────────────────────────────────────────────────────────────────

/** Live-resolve a custom property in the current theme */
export function resolveVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/** Extract all --custom-property names declared in a CSS source string */
function extractPropNames(css: string): string[] {
  const names: string[] = []
  const seen = new Set<string>()
  const re = /(--[\w-]+)\s*:/g
  let m: RegExpExecArray | null
  while ((m = re.exec(css)) !== null) {
    if (!seen.has(m[1])) { seen.add(m[1]); names.push(m[1]) }
  }
  return names
}

const ALL_PROP_NAMES: string[] = [
  ...extractPropNames(primitivesRaw),
  ...extractPropNames(baseRaw),
  ...extractPropNames(intentsRaw),
  ...extractPropNames(appRaw),
].filter((n, i, a) => a.indexOf(n) === i)

/** Resolve current computed values for all known custom properties */
function collectAllCustomProps(): Array<{ name: string; rawValue: string }> {
  return ALL_PROP_NAMES
    .map(name => ({ name, rawValue: resolveVar(name) }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

// ─── sub-components ──────────────────────────────────────────────────────────

export function ColorSwatch({ name, rawValue }: { name: string; rawValue: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(`var(${name})`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      title={`var(${name})\n${rawValue || '—'}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg, 10px)',
        border: '1px solid var(--border-default)',
        cursor: 'pointer',
        background: 'var(--surface-primary)',
        textAlign: 'left',
        transition: 'box-shadow 0.15s',
        minWidth: 0,
      }}
    >
      <div
        style={{
          height: 56,
          background: name.startsWith('--border-') ? 'var(--surface-primary)' : `var(${name})`,
          border: name.startsWith('--border-') ? `1px solid var(${name})` : 'none',
          borderBottom: name.startsWith('--border-') ? `1px solid var(${name})` : 'none',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 600,
          color: 'rgba(128,128,128,0.9)',
        }}
      >
        {copied && '✓'}
      </div>
      <div style={{ padding: '6px 8px' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 500,
          color: 'var(--text-default)',
          wordBreak: 'break-all',
          lineHeight: 1.3,
        }}>
          {name.replace(/^--/, '')}
        </div>
      </div>
    </button>
  )
}

function TokenRow({ name, rawValue }: { name: string; rawValue: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(`var(${name})`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  // Decide if this looks like a colour (show a swatch) or not (show a text chip)
  const isColourLike = /^(#|rgb|hsl|oklch|color-mix|transparent)/i.test(rawValue) || /\b(var\(--(gray|blue|red|green|yellow|orange|purple|pink|cyan|primary|alpha))/i.test(rawValue)
  return (
    <tr
      onClick={copy}
      style={{ cursor: 'pointer', borderBottom: '1px solid var(--border-default)' }}
      title={`Click to copy var(${name})`}
    >
      <td style={{ padding: '9px 12px', verticalAlign: 'middle', width: 36 }}>
        {isColourLike ? (
          <div style={{
            width: 24, height: 24, borderRadius: 6,
            background: name.startsWith('--border-') ? 'var(--surface-primary)' : `var(${name})`,
            border: name.startsWith('--border-') ? `1px solid var(${name})` : '1px solid var(--border-default)',
            boxSizing: 'border-box',
            flexShrink: 0,
          }} />
        ) : (
          <div style={{
            width: 24, height: 24, borderRadius: 6,
            background: 'var(--surface-secondary)',
            border: '1px solid var(--border-default)',
          }} />
        )}
      </td>
      <td style={{ padding: '9px 12px', fontSize: 12, fontFamily: 'monospace', color: 'var(--text-default)', whiteSpace: 'nowrap' }}>
        {name}
      </td>
      <td style={{ padding: '9px 12px', fontSize: 11, fontFamily: 'monospace', color: 'var(--text-muted)', wordBreak: 'break-all', maxWidth: 360 }}>
        {rawValue || '—'}
      </td>
      <td style={{ padding: '9px 12px', fontSize: 11, color: 'var(--text-muted)', width: 55, textAlign: 'right' }}>
        {copied ? 'Copied' : ''}
      </td>
    </tr>
  )
}

function TokenTable({ tokens }: { tokens: Array<{ name: string; rawValue: string }> }) {
  return (
    <div style={{ overflow: 'auto', borderRadius: 'var(--radius-xl, 12px)', border: '1px solid var(--border-default)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--surface-secondary)' }}>
            {['', 'Token', 'Value', ''].map((h, i) => (
              <th key={i} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tokens.map(t => <TokenRow key={t.name} {...t} />)}
        </tbody>
      </table>
    </div>
  )
}

// ─── scale group helper ───────────────────────────────────────────────────────

const COLOUR_SCALES = ['gray', 'blue', 'cyan', 'green', 'yellow', 'orange', 'red', 'purple', 'pink', 'primary', 'alpha']

function ScaleGroup({ scale, tokens }: { scale: string; tokens: Array<{ name: string; rawValue: string }> }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h4 style={{
        margin: '0 0 10px',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        {scale}
      </h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tokens.map(t => <ColorSwatch key={t.name} {...t} />)}
      </div>
    </div>
  )
}

// ─── CSS source block ────────────────────────────────────────────────────────

function CSSSourceBlock({ css, label }: { css: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div style={{ marginTop: 36 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 10,
      }}>
        <h3 style={{
          margin: 0, fontSize: 11, fontWeight: 600,
          textTransform: 'uppercase' as const, letterSpacing: '0.09em',
          color: 'var(--text-subtle)',
        }}>
          {label}
        </h3>
        <button
          onClick={copy}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 11px',
            fontSize: 11, fontWeight: 500, fontFamily: 'inherit',
            background: copied ? 'var(--bg-success-muted)' : 'var(--surface-secondary)',
            border: `1px solid ${copied ? 'var(--border-success-default)' : 'var(--border-default)'}`,
            borderRadius: 'var(--radius-md)',
            color: copied ? 'var(--text-success-default)' : 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all 0.12s',
          }}
        >
          {copied ? '✓ Copied' : 'Copy CSS'}
        </button>
      </div>
      <pre style={{
        margin: 0, padding: '16px 18px',
        background: 'var(--surface-secondary)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        fontSize: 12, fontFamily: 'monospace',
        color: 'var(--text-default)',
        lineHeight: 1.65,
        overflowY: 'auto',
        overflowX: 'auto',
        maxHeight: 480,
      }}>
        {css}
      </pre>
    </div>
  )
}

// ─── section components ───────────────────────────────────────────────────────

function useTokens(theme: string) {
  const [all, setAll] = useState<Array<{ name: string; rawValue: string }>>([])
  useEffect(() => {
    const id = setTimeout(() => setAll(collectAllCustomProps()), 60)
    return () => clearTimeout(id)
  }, [theme])
  return all
}

export function PrimitivesSection({ theme }: { theme: string }) {
  const all = useTokens(theme)

  const byScale: Record<string, Array<{ name: string; rawValue: string }>> = {}
  for (const t of all) {
    for (const scale of COLOUR_SCALES) {
      if (new RegExp(`^--${scale}-`).test(t.name)) {
        if (!byScale[scale]) byScale[scale] = []
        byScale[scale].push(t)
        break
      }
    }
  }

  const hasTokens = Object.values(byScale).some(a => a.length > 0)
  if (!hasTokens) return <EmptyState message="No primitive colour tokens found. Ensure primitives.css is imported." />

  return (
    <div>
      {COLOUR_SCALES.filter(s => byScale[s]?.length).map(scale => (
        <ScaleGroup key={scale} scale={scale} tokens={byScale[scale]} />
      ))}
      <CSSSourceBlock css={primitivesRaw} label="CSS source — primitives.css" />
    </div>
  )
}

export function SemanticSection({ theme }: { theme: string }) {
  const all = useTokens(theme)

  const semantic = all.filter(t =>
    /^--(surface|app-bg|app-border|text-emphasis|text-default|text-muted|text-subtle|text-inverse|border-default|border-muted|border-subtle|border-emphasis|ring|control-|ds-shadow|ds-inset)/.test(t.name)
  )

  if (!semantic.length) return <EmptyState message="No semantic tokens found. Ensure base.css is imported." />

  // Group into surface/text/border/control/shadow
  const groups: Array<{ heading: string; filter: (n: string) => boolean }> = [
    { heading: 'Surface', filter: n => n.startsWith('--surface') || n.startsWith('--app-') },
    { heading: 'Text',    filter: n => /^--text-(emphasis|default|muted|subtle|inverse)/.test(n) },
    { heading: 'Border',  filter: n => /^--border-(default|muted|subtle|emphasis)/.test(n) },
    { heading: 'Control', filter: n => n.startsWith('--control-') },
    { heading: 'Ring',    filter: n => n === '--ring' },
    { heading: 'Shadow',  filter: n => n.startsWith('--ds-shadow') || n.startsWith('--ds-inset') },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {groups.map(({ heading, filter }) => {
        const tokens = semantic.filter(t => filter(t.name))
        if (!tokens.length) return null
        return (
          <div key={heading}>
            <h3 style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {heading}
            </h3>
            <TokenTable tokens={tokens} />
          </div>
        )
      })}
    </div>
  )
}

const INTENT_CATEGORIES = [
  'primary', 'neutral', 'danger', 'success', 'warning', 'info',
  'discovery', 'yellow', 'pink', 'cyan',
]

const PROPERTY_GROUPS = [
  { key: 'text',   label: 'Text',       prefix: '--text-' },
  { key: 'bg',     label: 'Background', prefix: '--bg-' },
  { key: 'border', label: 'Border',     prefix: '--border-' },
] as const

const VARIANT_ORDER = ['semantic', 'solid', 'soft', 'outline', 'ghost', 'soft-outline'] as const
const VARIANT_LABELS: Record<string, string> = {
  semantic: 'Semantic', solid: 'Solid', soft: 'Soft',
  outline: 'Outline', ghost: 'Ghost', 'soft-outline': 'Soft Outline',
}

function getVariant(tokenName: string, propertyPrefix: string, intent: string): string {
  const suffix = tokenName.slice(propertyPrefix.length + intent.length + 1)
  if (suffix.startsWith('soft-outline')) return 'soft-outline'
  if (suffix.startsWith('solid')) return 'solid'
  if (suffix.startsWith('soft')) return 'soft'
  if (suffix.startsWith('outline')) return 'outline'
  if (suffix.startsWith('ghost')) return 'ghost'
  return 'semantic'
}

function VariantCard({ label, tokens }: {
  label: string
  tokens: Array<{ name: string; rawValue: string }>
}) {
  return (
    <div style={{
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg, 10px)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '8px 12px',
        background: 'var(--surface-secondary)',
        borderBottom: '1px solid var(--border-default)',
        fontSize: 11, fontWeight: 600, color: 'var(--text-subtle)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        {label}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {tokens.map(t => <TokenRow key={t.name} {...t} />)}
        </tbody>
      </table>
    </div>
  )
}

function VariantTokenCards({ tokens, propertyPrefix, intent }: {
  tokens: Array<{ name: string; rawValue: string }>
  propertyPrefix: string
  intent: string
}) {
  const byVariant: Record<string, Array<{ name: string; rawValue: string }>> = {}
  for (const t of tokens) {
    const v = getVariant(t.name, propertyPrefix, intent)
    if (!byVariant[v]) byVariant[v] = []
    byVariant[v].push(t)
  }
  const activeVariants = VARIANT_ORDER.filter(v => byVariant[v]?.length)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {activeVariants.map(variant => (
        <VariantCard
          key={variant}
          label={VARIANT_LABELS[variant]}
          tokens={byVariant[variant]}
        />
      ))}
    </div>
  )
}

function GroupedIntentTokens({ tokens, intent }: { tokens: Array<{ name: string; rawValue: string }>; intent: string }) {
  const groups = PROPERTY_GROUPS.map(g => ({
    ...g,
    tokens: tokens.filter(t => t.name.startsWith(g.prefix)),
  })).filter(g => g.tokens.length > 0)

  const [activeTab, setActiveTab] = useState(groups[0]?.key ?? 'text')
  const activeGroup = groups.find(g => g.key === activeTab) ?? groups[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-default)', paddingBottom: 0 }}>
        {groups.map(g => (
          <button
            key={g.key}
            type="button"
            onClick={() => setActiveTab(g.key)}
            style={{
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              color: activeTab === g.key ? 'var(--text-default)' : 'var(--text-muted)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === g.key ? '2px solid var(--text-default)' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: -1,
            }}
          >
            {g.label}
          </button>
        ))}
      </div>
      {activeGroup && (
        <VariantTokenCards tokens={activeGroup.tokens} propertyPrefix={activeGroup.prefix} intent={intent} />
      )}
    </div>
  )
}

export function IntentSection({ theme }: { theme: string }) {
  const all = useTokens(theme)
  const [expanded, setExpanded] = useState<string | null>('danger')

  const byCategory: Record<string, Array<{ name: string; rawValue: string }>> = {}
  for (const t of all) {
    for (const cat of INTENT_CATEGORIES) {
      if (new RegExp(`^--(bg|text|border)-${cat}-`).test(t.name)) {
        if (!byCategory[cat]) byCategory[cat] = []
        byCategory[cat].push(t)
        break
      }
    }
  }

  const appTokens = all.filter(t =>
    /^--color-risk-/.test(t.name) ||
    /^--radius-/.test(t.name) ||
    /^--shadow-/.test(t.name) ||
    /^--(z-index|height)-/.test(t.name)
  )

  const hasAny = INTENT_CATEGORIES.some(c => byCategory[c]?.length) || appTokens.length > 0
  if (!hasAny) return <EmptyState message="No intent tokens found. Ensure intents.css is imported." />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {INTENT_CATEGORIES.filter(c => byCategory[c]?.length).map(cat => (
        <div key={cat} style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)' }}>
          <button
            onClick={() => setExpanded(expanded === cat ? null : cat)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-default)',
              fontWeight: 600,
              fontSize: 14,
              borderRadius: expanded === cat ? 'var(--radius-xl) var(--radius-xl) 0 0' : 'var(--radius-xl)',
              background: expanded === cat ? 'var(--surface-secondary)' : 'var(--surface-primary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%',
                background: `var(--bg-${cat}-solid, var(--bg-${cat}-emphasis))`,
              }} />
              {capitalize(cat)}
              <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--text-subtle)' }}>
                {byCategory[cat].length} tokens
              </span>
            </div>
            <span style={{ color: 'var(--text-subtle)', fontSize: 11 }}>
              {expanded === cat ? '▲' : '▼'}
            </span>
          </button>
          {expanded === cat && (
            <div style={{ borderTop: '1px solid var(--border-default)', padding: 16 }}>
              <GroupedIntentTokens tokens={byCategory[cat]} intent={cat} />
            </div>
          )}
        </div>
      ))}

      {appTokens.length > 0 && (
        <div>
          <h3 style={{ margin: '16px 0 10px', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            App utilities
          </h3>
          <TokenTable tokens={appTokens} />
        </div>
      )}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div style={{
      padding: '48px 24px',
      textAlign: 'center',
      border: '2px dashed var(--border-default)',
      borderRadius: 'var(--radius-xl, 12px)',
      color: 'var(--text-subtle)',
      fontSize: 14,
    }}>
      <div style={{ fontSize: 28, marginBottom: 12 }}>🎨</div>
      {message}
    </div>
  )
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
