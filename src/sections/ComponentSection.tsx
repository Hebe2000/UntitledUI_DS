import { useState } from 'react'

// ─── Components styled with Comply365 intent/semantic tokens ─────────────────
// Tokens used: --surface-*, --text-*, --border-*, --bg-*-*, --control-*,
//              --radius-*, --shadow-*, --text-{size}

// ─── Button ──────────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

const buttonBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontWeight: 600,
  cursor: 'pointer',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  transition: 'opacity 0.12s',
  fontFamily: 'inherit',
}

const buttonVariants: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--bg-primary-solid)',
    color: 'var(--text-primary-solid)',
    border: '1px solid transparent',
  },
  secondary: {
    background: 'var(--surface-primary)',
    color: 'var(--text-neutral-outline)',
    border: '1px solid var(--border-neutral-outline)',
  },
  tertiary: {
    background: 'transparent',
    color: 'var(--text-neutral-outline)',
    border: '1px solid transparent',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-neutral-ghost)',
    border: '1px solid transparent',
  },
  danger: {
    background: 'var(--bg-danger-solid)',
    color: 'var(--text-danger-solid)',
    border: '1px solid transparent',
  },
  link: {
    background: 'transparent',
    color: 'var(--text-info-default)',
    border: 'none',
    textDecoration: 'underline',
    padding: 0,
  },
}

const buttonSizes: Record<ButtonSize, React.CSSProperties> = {
  sm:  { padding: '8px 14px',  fontSize: 'var(--text-sm)',   borderRadius: 'var(--radius-md)' },
  md:  { padding: '10px 16px', fontSize: 'var(--text-sm)',   borderRadius: 'var(--radius-md)' },
  lg:  { padding: '10px 18px', fontSize: 'var(--text-base)', borderRadius: 'var(--radius-md)' },
  xl:  { padding: '12px 20px', fontSize: 'var(--text-base)', borderRadius: 'var(--radius-lg)' },
  '2xl': { padding: '16px 28px', fontSize: 'var(--text-lg)', borderRadius: 'var(--radius-xl)' },
}

export function Button({
  variant = 'primary', size = 'md',
  leadingIcon, trailingIcon, children, style, disabled, ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        ...buttonBase,
        ...buttonVariants[variant],
        ...buttonSizes[size],
        ...(disabled ? { opacity: 0.45, cursor: 'not-allowed' } : {}),
        ...style,
      }}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

type BadgeIntent = 'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'discovery' | 'yellow' | 'pink' | 'cyan'
type BadgeSize  = 'sm' | 'md' | 'lg'
type BadgeStyle = 'soft' | 'solid' | 'outline' | 'soft-outline'

interface BadgeProps {
  label: string
  intent?: BadgeIntent
  size?: BadgeSize
  badgeStyle?: BadgeStyle
  dot?: boolean
  onRemove?: () => void
}

function getBadgeStyles(intent: BadgeIntent, style: BadgeStyle): React.CSSProperties {
  switch (style) {
    case 'solid':
      return {
        background: `var(--bg-${intent}-solid)`,
        color: `var(--text-${intent}-solid)`,
        border: '1px solid transparent',
      }
    case 'outline':
      return {
        background: 'transparent',
        color: `var(--text-${intent}-outline)`,
        border: `1px solid var(--border-${intent}-outline)`,
      }
    case 'soft-outline':
      return {
        background: `var(--bg-${intent}-soft)`,
        color: `var(--text-${intent}-soft-outline)`,
        border: `1px solid var(--border-${intent}-soft-outline)`,
      }
    default: // soft
      return {
        background: `var(--bg-${intent}-muted)`,
        color: `var(--text-${intent}-default)`,
        border: `1px solid var(--border-${intent}-muted)`,
      }
  }
}

const badgeSizes: Record<BadgeSize, React.CSSProperties> = {
  sm: { padding: '2px 8px',   fontSize: 'var(--text-xs)',      borderRadius: 'var(--radius-sm)' },
  md: { padding: '2px 10px',  fontSize: 'var(--text-xs-plus)', borderRadius: 'var(--radius-sm)' },
  lg: { padding: '4px 12px',  fontSize: 'var(--text-sm)',      borderRadius: 'var(--radius-md)' },
}

export function Badge({ label, intent = 'neutral', size = 'md', badgeStyle = 'soft', dot, onRemove }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontWeight: 500,
        lineHeight: 1.5,
        ...badgeSizes[size],
        ...getBadgeStyles(intent, badgeStyle),
      }}
    >
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'currentColor', flexShrink: 0,
        }} />
      )}
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{ marginLeft: 2, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', lineHeight: 1, fontSize: 13 }}
        >
          ×
        </button>
      )}
    </span>
  )
}

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  leadingIcon?: React.ReactNode
}

export function Input({ label, hint, error, leadingIcon, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-default)' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leadingIcon && (
          <span style={{
            position: 'absolute', left: 12,
            color: 'var(--text-subtle)',
            display: 'flex', alignItems: 'center', pointerEvents: 'none',
          }}>
            {leadingIcon}
          </span>
        )}
        <input
          {...props}
          style={{
            width: '100%',
            padding: leadingIcon ? '10px 14px 10px 40px' : '10px 14px',
            fontSize: 'var(--text-base)',
            border: `1px solid ${error ? 'var(--control-border-invalid)' : 'var(--control-border)'}`,
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-primary)',
            color: 'var(--control-text)',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            ...style,
          }}
        />
      </div>
      {(hint || error) && (
        <p style={{
          margin: 0,
          fontSize: 'var(--text-sm)',
          color: error ? 'var(--text-danger-default)' : 'var(--text-muted)',
        }}>
          {error || hint}
        </p>
      )}
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface AvatarProps {
  src?: string
  initials?: string
  size?: AvatarSize
  status?: 'online' | 'offline' | 'away' | 'busy'
}

const avatarPx: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 56, '2xl': 64 }
const statusColors = { online: 'var(--bg-success-solid)', offline: 'var(--text-subtle)', away: 'var(--bg-warning-solid)', busy: 'var(--bg-danger-solid)' }

export function Avatar({ src, initials, size = 'md', status }: AvatarProps) {
  const px = avatarPx[size]
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: px, height: px, borderRadius: '50%',
        background: src ? 'transparent' : 'var(--bg-neutral-default)',
        color: 'var(--text-neutral-outline)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: px * 0.36, fontWeight: 600, overflow: 'hidden', flexShrink: 0,
        border: '1px solid var(--border-default)',
      }}>
        {src
          ? <img src={src} alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : initials}
      </div>
      {status && (
        <span style={{
          position: 'absolute', bottom: 0, right: 0,
          width: px * 0.28, height: px * 0.28,
          borderRadius: '50%',
          background: statusColors[status],
          border: '2px solid var(--surface-primary)',
        }} />
      )}
    </div>
  )
}

// ─── Alert ────────────────────────────────────────────────────────────────────

type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

interface AlertProps {
  variant?: AlertVariant
  title: string
  description?: string
  onClose?: () => void
}

const alertIcons: Record<AlertVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  danger: '✕',
}

export function Alert({ variant = 'info', title, description, onClose }: AlertProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      padding: '14px 16px',
      borderRadius: 'var(--radius-xl)',
      border: `1px solid var(--border-${variant}-default)`,
      background: `var(--bg-${variant}-muted)`,
    }}>
      <span style={{ fontSize: 15, color: `var(--text-${variant}-default)`, flexShrink: 0, lineHeight: 1.5 }}>
        {alertIcons[variant]}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', fontWeight: 600, color: `var(--text-${variant}-emphasis)` }}>
          {title}
        </p>
        {description && (
          <p style={{ margin: '3px 0 0', fontSize: 'var(--text-sm)', color: `var(--text-${variant}-soft)` }}>
            {description}
          </p>
        )}
      </div>
      {onClose && (
        <button onClick={onClose} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: `var(--text-${variant}-muted)`, padding: 0, lineHeight: 1, fontSize: 14,
        }}>
          ✕
        </button>
      )}
    </div>
  )
}

// ─── Risk Indicator ───────────────────────────────────────────────────────────

type RiskLevel = 'low' | 'low-med' | 'med' | 'med-high' | 'high'

interface RiskProps {
  level: RiskLevel
  label?: string
}

const riskLabels: Record<RiskLevel, string> = {
  low: 'Low',
  'low-med': 'Low–Med',
  med: 'Medium',
  'med-high': 'Med–High',
  high: 'High',
}

export function RiskIndicator({ level, label }: RiskProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: `var(--color-risk-${level})`,
        boxShadow: `0 0 0 3px color-mix(in oklab, var(--color-risk-${level}) 25%, transparent)`,
        flexShrink: 0,
      }} />
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-default)' }}>
        {label ?? riskLabels[level]}
      </span>
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

type ToggleSize = 'sm' | 'md'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: ToggleSize
  label?: string
  disabled?: boolean
}

const toggleTrack: Record<ToggleSize, { width: number; height: number }> = {
  sm: { width: 32, height: 18 },
  md: { width: 44, height: 24 },
}
const toggleThumb: Record<ToggleSize, { size: number; offset: number }> = {
  sm: { size: 14, offset: 2 },
  md: { size: 20, offset: 2 },
}

export function Toggle({ checked, onChange, size = 'md', label, disabled }: ToggleProps) {
  const track = toggleTrack[size]
  const thumb = toggleThumb[size]
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1 }}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          position: 'relative',
          width: track.width,
          height: track.height,
          borderRadius: track.height,
          background: checked ? 'var(--bg-primary-solid)' : 'var(--border-default)',
          border: 'none',
          padding: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.15s',
          flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute',
          top: thumb.offset,
          left: checked ? track.width - thumb.size - thumb.offset : thumb.offset,
          width: thumb.size,
          height: thumb.size,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.15s',
          boxShadow: 'var(--shadow-sm)',
        }} />
      </button>
      {label && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-default)', fontWeight: 500 }}>{label}</span>}
    </label>
  )
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  indeterminate?: boolean
  disabled?: boolean
}

export function Checkbox({ checked, onChange, label, indeterminate, disabled }: CheckboxProps) {
  const filled = checked || indeterminate
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1 }}>
      <button
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          width: 16, height: 16,
          borderRadius: 'var(--radius-sm)',
          border: filled ? 'none' : '1.5px solid var(--control-border)',
          background: filled ? 'var(--bg-primary-solid)' : 'var(--surface-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, padding: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.1s, border-color 0.1s',
        }}
      >
        {checked && !indeterminate && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {indeterminate && <span style={{ width: 8, height: 1.5, background: '#fff', borderRadius: 2, display: 'block' }} />}
      </button>
      {label && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-default)', fontWeight: 500 }}>{label}</span>}
    </label>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

type ModalSize = 'sm' | 'md' | 'lg'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  size?: ModalSize
  children?: React.ReactNode
  footer?: React.ReactNode
}

const modalWidths: Record<ModalSize, number> = { sm: 400, md: 520, lg: 640 }

export function Modal({ open, onClose, title, description, size = 'md', children, footer }: ModalProps) {
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: modalWidths[size],
          background: 'var(--surface-primary)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-2xl)',
          border: '1px solid var(--border-default)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-emphasis)', lineHeight: 'var(--text-lg--line-height)' }}>
              {title}
            </h2>
            {description && (
              <p style={{ margin: '4px 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{description}</p>
            )}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: 4, lineHeight: 1, borderRadius: 'var(--radius-sm)', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        {children && (
          <div style={{ padding: '16px 24px 24px', fontSize: 'var(--text-sm)', color: 'var(--text-default)', lineHeight: 'var(--text-sm--line-height)' }}>
            {children}
          </div>
        )}
        {footer && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-default)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: string
  children: React.ReactNode
  placement?: TooltipPlacement
}

export function Tooltip({ content, children, placement = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  const pos: React.CSSProperties =
    placement === 'top'    ? { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 6 } :
    placement === 'bottom' ? { top: '100%',    left: '50%', transform: 'translateX(-50%)', marginTop: 6 } :
    placement === 'left'   ? { right: '100%',  top: '50%',  transform: 'translateY(-50%)', marginRight: 6 } :
                             { left: '100%',   top: '50%',  transform: 'translateY(-50%)', marginLeft: 6 }

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: 'absolute',
          background: 'var(--bg-neutral-solid)',
          color: 'var(--text-neutral-solid)',
          fontSize: 'var(--text-xs)',
          fontWeight: 500,
          padding: '5px 10px',
          borderRadius: 'var(--radius-md)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 9998,
          boxShadow: 'var(--shadow-md)',
          ...pos,
        }}>
          {content}
        </div>
      )}
    </div>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type TabsVariant = 'underline' | 'pill'

interface TabItem {
  id: string
  label: string
  badge?: string | number
}

interface TabsProps {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  variant?: TabsVariant
}

export function Tabs({ tabs, active, onChange, variant = 'underline' }: TabsProps) {
  const isPill = variant === 'pill'
  return (
    <div style={{
      display: 'flex',
      gap: isPill ? 4 : 0,
      borderBottom: isPill ? 'none' : '1px solid var(--border-default)',
      padding: isPill ? 4 : 0,
      background: isPill ? 'var(--bg-neutral-muted)' : 'transparent',
      borderRadius: isPill ? 'var(--radius-lg)' : 0,
      width: 'fit-content',
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: isPill ? '6px 12px' : '8px 12px',
              border: 'none',
              borderBottom: !isPill ? `2px solid ${isActive ? 'var(--bg-primary-solid)' : 'transparent'}` : 'none',
              marginBottom: !isPill ? -1 : 0,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: isActive ? 600 : 500,
              fontSize: 'var(--text-sm)',
              transition: 'all 0.1s',
              borderRadius: isPill ? 'var(--radius-md)' : 0,
              background: isPill && isActive ? 'var(--surface-primary)' : 'transparent',
              color: isActive ? 'var(--text-emphasis)' : 'var(--text-muted)',
              boxShadow: isPill && isActive ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span style={{
                fontSize: 'var(--text-xs)', fontWeight: 500,
                padding: '1px 6px',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'var(--bg-primary-solid)' : 'var(--bg-neutral-default)',
                color: isActive ? 'var(--text-primary-solid)' : 'var(--text-muted)',
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  disabled?: boolean
}

export function Select({ options, value, onChange, label, hint, error, placeholder, disabled }: SelectProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-default)' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <select
          value={value ?? ''}
          disabled={disabled}
          onChange={e => onChange?.(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 36px 10px 14px',
            fontSize: 'var(--text-base)',
            border: `1px solid ${error ? 'var(--control-border-invalid)' : 'var(--control-border)'}`,
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-primary)',
            color: value ? 'var(--control-text)' : 'var(--text-muted)',
            appearance: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.45 : 1,
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-subtle)', display: 'flex' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {(hint || error) && (
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: error ? 'var(--text-danger-default)' : 'var(--text-muted)' }}>
          {error || hint}
        </p>
      )}
    </div>
  )
}

// ─── Showcase wrapper ─────────────────────────────────────────────────────────

interface ShowcaseBlockProps {
  title: string
  children: React.ReactNode
}

export function ShowcaseBlock({ title, children }: ShowcaseBlockProps) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-default)' }}>
        {title}
      </h3>
      <div style={{
        padding: '20px 24px',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-default)',
        background: 'var(--surface-primary)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        alignItems: 'center',
      }}>
        {children}
      </div>
    </div>
  )
}
