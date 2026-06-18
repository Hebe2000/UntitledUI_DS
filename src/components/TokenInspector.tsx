import { useState, useCallback, useRef, useEffect } from 'react'
import { resolveVar } from '../sections/TokenSection'

export interface TokenDef {
  name: string
  cssVar: string
  property: string
  resolved?: string
}

const ACCENT = '#2970FF'

function getResolved(token: TokenDef): string {
  return token.resolved || resolveVar(token.cssVar)
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={async (e) => {
        e.stopPropagation()
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1400)
      }}
      style={{
        border: '1px solid #3a3a3a',
        background: copied ? '#1d9e75' : '#262626',
        color: copied ? '#fff' : '#d4d4d4',
        borderRadius: 4,
        fontSize: 11,
        padding: '3px 8px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        lineHeight: 1.4,
        transition: 'background 120ms ease',
        flexShrink: 0,
      }}
      aria-label={copied ? 'Copied' : 'Copy CSS declaration'}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function TokenPopover({ token, anchorRect }: { token: TokenDef; anchorRect: DOMRect }) {
  const decl = `${token.property}: var(${token.cssVar});`
  const resolved = getResolved(token)

  return (
    <div
      role="tooltip"
      style={{
        position: 'fixed',
        top: anchorRect.bottom + 8,
        left: Math.max(8, Math.min(anchorRect.left, window.innerWidth - 280)),
        zIndex: 1000,
        background: '#1a1a1a',
        border: '1px solid #3a3a3a',
        borderRadius: 6,
        padding: '8px 10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
        maxWidth: 280,
        pointerEvents: 'auto',
      }}
    >
      <div style={{
        fontSize: 11, color: '#8a8a8a', marginBottom: 4,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      }}>
        {token.name}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <code style={{
          fontSize: 12, color: '#e8e8e8',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {decl}
        </code>
        <CopyButton text={decl} />
      </div>
      {resolved && (
        <div style={{
          fontSize: 11, color: '#6a6a6a', marginTop: 4,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{
            display: 'inline-block', width: 10, height: 10, borderRadius: 2,
            background: resolved, border: '1px solid #3a3a3a', flexShrink: 0,
          }} />
          resolves to {resolved}
        </div>
      )}
    </div>
  )
}

function Swatch({ token, active, onToggle }: {
  token: TokenDef; active: boolean; onToggle: (name: string) => void
}) {
  const resolved = getResolved(token)

  return (
    <button
      type="button"
      onClick={() => onToggle(token.name)}
      aria-pressed={active}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        gap: 6, background: 'transparent', border: 'none', padding: 0,
        cursor: 'pointer', fontFamily: 'inherit',
      }}
    >
      <div style={{
        width: 56, height: 56,
        borderRadius: 'var(--radius-md, 6px)',
        background: resolved || '#ccc',
        border: active ? `2px solid ${ACCENT}` : '1px solid var(--border-default)',
        boxShadow: active ? `0 0 0 2px ${ACCENT}33` : 'none',
        transition: 'border 120ms ease, box-shadow 120ms ease',
      }} />
      <span style={{
        fontSize: 11,
        color: active ? ACCENT : 'var(--text-muted)',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        maxWidth: 72, wordBreak: 'break-word', textAlign: 'left',
      }}>
        {token.name}
      </span>
    </button>
  )
}

interface TokenInspectorProps {
  tokens: TokenDef[]
  children: React.ReactNode
  theme?: string
  exampleLabel?: string
}

export function TokenInspector({ tokens, children, theme, exampleLabel = 'Example' }: TokenInspectorProps) {
  const [activeTokens, setActiveTokens] = useState<Set<string>>(new Set())
  const [hoveredEl, setHoveredEl] = useState<string | null>(null)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  const [, setResolveKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const hoveredTargetRef = useRef<Element | null>(null)
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const id = setTimeout(() => setResolveKey(k => k + 1), 60)
    return () => clearTimeout(id)
  }, [theme])

  const toggleToken = useCallback((name: string) => {
    setActiveTokens(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  useEffect(() => {
    if (hoveredEl && !activeTokens.has(hoveredEl)) {
      setHoveredEl(null)
      setAnchorRect(null)
    }
  }, [activeTokens, hoveredEl])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const allTagged = root.querySelectorAll<HTMLElement>('[data-token]')

    if (activeTokens.size === 0) {
      allTagged.forEach(el => {
        el.style.outline = ''
        el.style.outlineOffset = ''
        el.style.transition = ''
      })
      return
    }

    allTagged.forEach(el => {
      const elTokens = (el.getAttribute('data-token') || '').split(/\s+/).filter(Boolean)
      const isMatch = elTokens.some(t => activeTokens.has(t))
      el.style.transition = 'outline 120ms ease'
      if (isMatch) {
        el.style.outline = `2px solid ${ACCENT}`
        el.style.outlineOffset = '2px'
      } else {
        el.style.outline = ''
        el.style.outlineOffset = ''
      }
    })
  }, [activeTokens])

  const cancelDismiss = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current)
      dismissTimer.current = null
    }
  }, [])

  const scheduleDismiss = useCallback(() => {
    cancelDismiss()
    dismissTimer.current = setTimeout(() => {
      hoveredTargetRef.current = null
      setHoveredEl(null)
      setAnchorRect(null)
    }, 150)
  }, [cancelDismiss])

  const handleMouseOver = useCallback((e: React.MouseEvent) => {
    if (activeTokens.size === 0) return
    const target = (e.target as Element).closest('[data-token]')
    if (!target) return
    const elTokens = (target.getAttribute('data-token') || '').split(/\s+/).filter(Boolean)
    const matched = elTokens.find(t => activeTokens.has(t))
    if (!matched) return
    cancelDismiss()
    hoveredTargetRef.current = target
    setHoveredEl(matched)
    setAnchorRect(target.getBoundingClientRect())
  }, [activeTokens, cancelDismiss])

  const handleMouseOut = useCallback((e: React.MouseEvent) => {
    const target = (e.target as Element).closest('[data-token]')
    if (!target) return
    if (e.relatedTarget && target.contains(e.relatedTarget as Node)) return
    scheduleDismiss()
  }, [scheduleDismiss])

  useEffect(() => {
    if (!hoveredEl) return
    const updateRect = () => {
      if (hoveredTargetRef.current) {
        setAnchorRect(hoveredTargetRef.current.getBoundingClientRect())
      }
    }
    window.addEventListener('scroll', updateRect, true)
    window.addEventListener('resize', updateRect)
    return () => {
      window.removeEventListener('scroll', updateRect, true)
      window.removeEventListener('resize', updateRect)
    }
  }, [hoveredEl])

  const hoveredToken = tokens.find(t => t.name === hoveredEl)

  return (
    <div>
      <div
        ref={containerRef}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ position: 'relative' }}
        aria-label={exampleLabel}
      >
        {children}
      </div>

      {hoveredToken && anchorRect && (
        <div
          ref={popoverRef}
          onMouseEnter={cancelDismiss}
          onMouseLeave={scheduleDismiss}
        >
          <TokenPopover token={hoveredToken} anchorRect={anchorRect} />
        </div>
      )}

      <div style={{ marginTop: 28 }}>
        <h4 style={{
          margin: '0 0 10px', fontSize: 12, fontWeight: 600,
          color: 'var(--text-muted)', textTransform: 'uppercase',
          letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          Tokens used in this example
          <span style={{
            fontWeight: 400, textTransform: 'none', letterSpacing: '0',
            fontSize: 11, color: 'var(--text-subtle, #aaa)',
          }}>
            — click a swatch to highlight matching elements
          </span>
          {activeTokens.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveTokens(new Set())}
              style={{
                fontSize: 11, color: ACCENT, background: 'none', border: 'none',
                cursor: 'pointer', textTransform: 'none', letterSpacing: '0',
                fontWeight: 400, padding: 0,
              }}
            >
              Clear ({activeTokens.size})
            </button>
          )}
        </h4>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {tokens.map(token => (
            <Swatch
              key={token.name}
              token={token}
              active={activeTokens.has(token.name)}
              onToggle={toggleToken}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
