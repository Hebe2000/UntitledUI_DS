import { useState, isValidElement } from 'react'
import {
  AlertCircle, AlertTriangle, Check, CheckCircle, ChevronDown,
  Eye, EyeOff, InfoCircle, Minus, User01, X, XClose,
} from '@untitled-ui/icons-react'

// ─── Components rebuilt on the real Untitled UI React component specs ────────
// (sizes, variant/colour taxonomy, structure) restyled with the Comply365
// intent/semantic tokens — see --bg-*, --text-*, --border-*, --control-*,
// --radius-*, --text-{size}, --shadow-* in src/styles/*.css

export type IconSlot = React.ComponentType<{ className?: string; style?: React.CSSProperties }> | React.ReactElement

function renderIcon(icon: IconSlot | undefined, size: number) {
  if (!icon) return null
  if (isValidElement(icon)) return icon
  const Icon = icon as React.ComponentType<{ style?: React.CSSProperties }>
  return <Icon style={{ width: size, height: size, flexShrink: 0 }} />
}

// ─── Shared intent token helpers ──────────────────────────────────────────────
// 'neutral' and 'primary' don't have a `-default` text token or full `-muted`
// set like the other eight intents, so they get dedicated fallbacks.

export type Intent = 'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'discovery' | 'yellow' | 'pink' | 'cyan'

function intentMutedBg(intent: Intent): string {
  return intent === 'primary' ? 'var(--bg-primary-soft)' : `var(--bg-${intent}-muted)`
}
function intentDefaultText(intent: Intent): string {
  if (intent === 'neutral') return 'var(--text-default)'
  if (intent === 'primary') return 'var(--text-primary-soft)'
  return `var(--text-${intent}-default)`
}
function intentMutedBorder(intent: Intent): string {
  if (intent === 'neutral') return 'var(--border-default)'
  if (intent === 'primary') return 'var(--border-primary-soft-outline)'
  return `var(--border-${intent}-muted)`
}

// ─── Featured icon ─────────────────────────────────────────────────────────────
// Untitled UI's "featured icon" — a tinted circle around an icon, used inside
// Alerts and Modal headers.

type FeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl'

const featuredIconPx: Record<FeaturedIconSize, number> = { sm: 32, md: 40, lg: 48, xl: 56 }
const featuredIconGlyphPx: Record<FeaturedIconSize, number> = { sm: 16, md: 20, lg: 24, xl: 28 }

export function FeaturedIcon({ icon, color = 'primary', size = 'md' }: { icon: IconSlot; color?: Intent; size?: FeaturedIconSize }) {
  const px = featuredIconPx[size]
  return (
    <div style={{
      width: px, height: px, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: intentMutedBg(color),
      color: intentDefaultText(color),
      flexShrink: 0,
    }}>
      {renderIcon(icon, featuredIconGlyphPx[size])}
    </div>
  )
}

// ─── Button ──────────────────────────────────────────────────────────────────
// Real Untitled UI sizes: xs | sm | md | lg | xl
// Real Untitled UI colors: primary | secondary | tertiary | link-gray | link-color
//                           + primary/secondary/tertiary/link -destructive variants

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ButtonColor =
  | 'primary' | 'secondary' | 'tertiary' | 'link-gray' | 'link-color'
  | 'primary-destructive' | 'secondary-destructive' | 'tertiary-destructive' | 'link-destructive'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'color'> {
  size?: ButtonSize
  color?: ButtonColor
  iconLeading?: IconSlot
  iconTrailing?: IconSlot
  isLoading?: boolean
  isDisabled?: boolean
  showTextWhileLoading?: boolean
}

const buttonBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  cursor: 'pointer',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  fontFamily: 'inherit',
  transition: 'background 0.1s, opacity 0.1s',
}

const buttonSizes: Record<ButtonSize, { padding: string; iconPadding: string; fontSize: string; gap: number; iconSize: number }> = {
  xs: { padding: '6px 10px',  iconPadding: '6px',  fontSize: 'var(--text-sm)',   gap: 4, iconSize: 16 },
  sm: { padding: '8px 12px',  iconPadding: '8px',  fontSize: 'var(--text-sm)',   gap: 4, iconSize: 20 },
  md: { padding: '10px 14px', iconPadding: '10px', fontSize: 'var(--text-sm)',   gap: 4, iconSize: 20 },
  lg: { padding: '10px 16px', iconPadding: '10px', fontSize: 'var(--text-base)', gap: 6, iconSize: 20 },
  xl: { padding: '12px 18px', iconPadding: '12px', fontSize: 'var(--text-base)', gap: 6, iconSize: 20 },
}

const buttonColors: Record<ButtonColor, React.CSSProperties> = {
  primary: {
    background: 'var(--bg-primary-solid)', color: 'var(--text-primary-solid)',
    border: '1px solid transparent', boxShadow: 'var(--shadow-xs)',
  },
  secondary: {
    background: 'var(--surface-primary)', color: 'var(--text-default)',
    border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)',
  },
  tertiary: {
    background: 'transparent', color: 'var(--text-muted)', border: '1px solid transparent',
  },
  'link-gray': {
    background: 'transparent', color: 'var(--text-muted)', border: 'none',
    textDecoration: 'underline', padding: 0, boxShadow: 'none',
  },
  'link-color': {
    background: 'transparent', color: 'var(--text-info-default)', border: 'none',
    textDecoration: 'underline', padding: 0, boxShadow: 'none',
  },
  'primary-destructive': {
    background: 'var(--bg-danger-solid)', color: 'var(--text-danger-solid)',
    border: '1px solid transparent', boxShadow: 'var(--shadow-xs)',
  },
  'secondary-destructive': {
    background: 'var(--surface-primary)', color: 'var(--text-danger-default)',
    border: '1px solid var(--border-danger-outline)', boxShadow: 'var(--shadow-xs)',
  },
  'tertiary-destructive': {
    background: 'transparent', color: 'var(--text-danger-default)', border: '1px solid transparent',
  },
  'link-destructive': {
    background: 'transparent', color: 'var(--text-danger-default)', border: 'none',
    textDecoration: 'underline', padding: 0, boxShadow: 'none',
  },
}

export function Button({
  size = 'sm', color = 'primary', children, iconLeading, iconTrailing,
  isLoading, isDisabled, showTextWhileLoading, style, ...props
}: ButtonProps) {
  const cfg = buttonSizes[size]
  const isIconOnly = Boolean((iconLeading || iconTrailing) && !children)
  const isLinkType = color.startsWith('link')
  const disabled = isDisabled || isLoading

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        ...buttonBase,
        ...buttonColors[color],
        padding: isIconOnly ? cfg.iconPadding : cfg.padding,
        fontSize: cfg.fontSize,
        gap: cfg.gap,
        borderRadius: isLinkType ? 0 : 'var(--radius-md)',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        ...style,
      }}
    >
      {isLoading && (
        <svg
          className="ds-spin" width={cfg.iconSize} height={cfg.iconSize} viewBox="0 0 20 20" fill="none"
          style={!showTextWhileLoading ? { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' } : undefined}
        >
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="12.5 50" strokeLinecap="round" />
        </svg>
      )}
      {!isLoading && renderIcon(iconLeading, cfg.iconSize)}
      {children && (
        <span style={{ visibility: isLoading && !showTextWhileLoading ? 'hidden' : 'visible' }}>{children}</span>
      )}
      {!isLoading && renderIcon(iconTrailing, cfg.iconSize)}
    </button>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────
// Real Untitled UI badge types: pill-color (rounded-full), badge-color (rounded),
// badge-modern (surface card). Sizes sm | md | lg, with optional dot/icon/remove.

export type BadgeType = 'pill-color' | 'badge-color' | 'badge-modern'
export type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
  children: React.ReactNode
  type?: BadgeType
  color?: Intent
  size?: BadgeSize
  dot?: boolean
  iconLeading?: IconSlot
  iconTrailing?: IconSlot
  onRemove?: () => void
}

const pillSizes: Record<BadgeSize, React.CSSProperties> = {
  sm: { padding: '2px 8px',  fontSize: 'var(--text-xs)' },
  md: { padding: '2px 10px', fontSize: 'var(--text-sm)' },
  lg: { padding: '4px 12px', fontSize: 'var(--text-sm)' },
}
const badgeSizes: Record<BadgeSize, React.CSSProperties> = {
  sm: { padding: '2px 6px',  fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)' },
  md: { padding: '2px 8px',  fontSize: 'var(--text-sm)', borderRadius: 'var(--radius-sm)' },
  lg: { padding: '4px 10px', fontSize: 'var(--text-sm)', borderRadius: 'var(--radius-md)' },
}

function badgeColorStyle(type: BadgeType, color: Intent): React.CSSProperties {
  if (type === 'badge-modern') {
    return { background: 'var(--surface-primary)', color: 'var(--text-default)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }
  }
  return { background: intentMutedBg(color), color: intentDefaultText(color), border: `1px solid ${intentMutedBorder(color)}` }
}

export function Badge({ children, type = 'pill-color', color = 'neutral', size = 'md', dot, iconLeading, iconTrailing, onRemove }: BadgeProps) {
  const sizeStyle = type === 'pill-color' ? pillSizes[size] : badgeSizes[size]
  const iconPx = 12
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontWeight: 500,
      lineHeight: 1.5,
      whiteSpace: 'nowrap',
      borderRadius: type === 'pill-color' ? 9999 : undefined,
      ...sizeStyle,
      ...badgeColorStyle(type, color),
    }}>
      {dot && (
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: intentDefaultText(color), flexShrink: 0 }} />
      )}
      {iconLeading && renderIcon(iconLeading, iconPx)}
      {children}
      {iconTrailing && renderIcon(iconTrailing, iconPx)}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="Remove"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginLeft: 2, background: 'none', border: 'none', cursor: 'pointer',
            padding: 1, color: 'inherit', borderRadius: type === 'pill-color' ? 9999 : 'var(--radius-xs)',
          }}
        >
          <X style={{ width: 10, height: 10 }} />
        </button>
      )}
    </span>
  )
}

// ─── Input ────────────────────────────────────────────────────────────────────
// Real Untitled UI sizes: sm | md | lg — label, leading icon, hint/error text,
// password visibility toggle and invalid icon.

export type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  icon?: IconSlot
  size?: InputSize
}

const inputSizes: Record<InputSize, { padding: string; paddingWithIcon: string; fontSize: string; iconSize: number; iconInset: number }> = {
  sm: { padding: '8px 12px',  paddingWithIcon: '8px 36px 8px 36px',  fontSize: 'var(--text-sm)',   iconSize: 16, iconInset: 12 },
  md: { padding: '8px 12px',  paddingWithIcon: '8px 40px 8px 40px',  fontSize: 'var(--text-base)', iconSize: 20, iconInset: 12 },
  lg: { padding: '10px 14px', paddingWithIcon: '10px 42px 10px 42px', fontSize: 'var(--text-base)', iconSize: 20, iconInset: 14 },
}

export function Input({ label, hint, error, icon, size = 'md', style, type = 'text', ...props }: InputProps) {
  const [focused, setFocused] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const cfg = inputSizes[size]
  const isPassword = type === 'password'
  const hasTrailing = isPassword || Boolean(error)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-default)' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', borderRadius: 'var(--radius-md)' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: cfg.iconInset,
            color: 'var(--text-subtle)',
            display: 'flex', alignItems: 'center', pointerEvents: 'none',
          }}>
            {renderIcon(icon, cfg.iconSize)}
          </span>
        )}
        <input
          {...props}
          type={isPassword && passwordVisible ? 'text' : type}
          onFocus={e => { setFocused(true); props.onFocus?.(e) }}
          onBlur={e => { setFocused(false); props.onBlur?.(e) }}
          style={{
            width: '100%',
            padding: icon || hasTrailing ? cfg.paddingWithIcon : cfg.padding,
            paddingLeft: icon ? cfg.iconInset + cfg.iconSize + 8 : undefined,
            paddingRight: hasTrailing ? cfg.iconInset + cfg.iconSize + 8 : undefined,
            fontSize: cfg.fontSize,
            border: `1px solid ${error ? 'var(--control-border-invalid)' : 'var(--control-border)'}`,
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-primary)',
            color: 'var(--control-text)',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            boxShadow: focused
              ? `0 0 0 2px ${error ? 'var(--control-ring-invalid)' : 'var(--control-ring)'}`
              : 'var(--shadow-xs)',
            ...style,
          }}
        />
        {isPassword && (
          <button
            type="button"
            aria-label="Toggle password visibility"
            onClick={() => setPasswordVisible(v => !v)}
            style={{
              position: 'absolute', right: cfg.iconInset,
              display: 'flex', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-subtle)', padding: 0,
            }}
          >
            {passwordVisible ? <EyeOff style={{ width: cfg.iconSize, height: cfg.iconSize }} /> : <Eye style={{ width: cfg.iconSize, height: cfg.iconSize }} />}
          </button>
        )}
        {!isPassword && error && (
          <span style={{
            position: 'absolute', right: cfg.iconInset,
            display: 'flex', alignItems: 'center', pointerEvents: 'none',
            color: 'var(--text-danger-default)',
          }}>
            <AlertCircle style={{ width: cfg.iconSize, height: cfg.iconSize }} />
          </span>
        )}
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

// ─── Select ───────────────────────────────────────────────────────────────────
// Real Untitled UI NativeSelect sizes: sm | md | lg — matches Input conventions.

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
  size?: InputSize
  disabled?: boolean
}

export function Select({ options, value, onChange, label, hint, error, placeholder, size = 'md', disabled }: SelectProps) {
  const [focused, setFocused] = useState(false)
  const cfg = inputSizes[size]
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: cfg.padding,
            paddingRight: cfg.iconInset + cfg.iconSize + 8,
            fontSize: cfg.fontSize,
            fontWeight: 500,
            border: `1px solid ${error ? 'var(--control-border-invalid)' : 'var(--control-border)'}`,
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-primary)',
            color: value ? 'var(--control-text)' : 'var(--control-placeholder)',
            appearance: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            boxShadow: focused
              ? `0 0 0 2px ${error ? 'var(--control-ring-invalid)' : 'var(--control-ring)'}`
              : 'var(--shadow-xs)',
          }}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span style={{
          position: 'absolute', right: cfg.iconInset, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', color: 'var(--text-subtle)', display: 'flex',
        }}>
          <ChevronDown style={{ width: cfg.iconSize, height: cfg.iconSize }} />
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

// ─── Checkbox ─────────────────────────────────────────────────────────────────
// Real Untitled UI sizes: sm (16px) | md (20px), with indeterminate state.

export type CheckboxSize = 'sm' | 'md'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: CheckboxSize
  label?: React.ReactNode
  hint?: React.ReactNode
  indeterminate?: boolean
  disabled?: boolean
}

const checkboxSizes: Record<CheckboxSize, { box: number; radius: string; icon: number; label: string; hint: string }> = {
  sm: { box: 16, radius: 'var(--radius-xs)', icon: 10, label: 'var(--text-sm)', hint: 'var(--text-sm)' },
  md: { box: 20, radius: 'var(--radius-sm)', icon: 14, label: 'var(--text-base)', hint: 'var(--text-base)' },
}

export function Checkbox({ checked, onChange, size = 'sm', label, hint, indeterminate, disabled }: CheckboxProps) {
  const cfg = checkboxSizes[size]
  const filled = checked || indeterminate
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: size === 'sm' ? 8 : 12, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <button
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          width: cfg.box, height: cfg.box,
          borderRadius: cfg.radius,
          border: filled ? '1px solid transparent' : '1px solid var(--control-border)',
          background: filled ? 'var(--bg-primary-solid)' : disabled ? 'var(--surface-secondary)' : 'var(--surface-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, padding: 0, marginTop: label || hint ? 2 : 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'background 0.1s, border-color 0.1s',
        }}
      >
        {checked && !indeterminate && <Check style={{ width: cfg.icon, height: cfg.icon, color: 'var(--text-primary-solid)', strokeWidth: 3 }} />}
        {indeterminate && <Minus style={{ width: cfg.icon, height: cfg.icon, color: 'var(--text-primary-solid)', strokeWidth: 3 }} />}
      </button>
      {(label || hint) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label && <span style={{ fontSize: cfg.label, fontWeight: 500, color: 'var(--text-default)' }}>{label}</span>}
          {hint && <span style={{ fontSize: cfg.hint, color: 'var(--text-muted)' }}>{hint}</span>}
        </span>
      )}
    </label>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
// Real Untitled UI Switch sizes: sm | md.

export type ToggleSize = 'sm' | 'md'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: ToggleSize
  label?: string
  hint?: string
  disabled?: boolean
}

const toggleTrack: Record<ToggleSize, { width: number; height: number; thumb: number }> = {
  sm: { width: 36, height: 20, thumb: 16 },
  md: { width: 44, height: 24, thumb: 20 },
}

export function Toggle({ checked, onChange, size = 'sm', label, hint, disabled }: ToggleProps) {
  const track = toggleTrack[size]
  const offset = 2
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: size === 'sm' ? 8 : 12, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          position: 'relative',
          width: track.width,
          height: track.height,
          borderRadius: 9999,
          background: checked ? 'var(--bg-primary-solid)' : 'var(--bg-neutral-default)',
          border: 'none',
          padding: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'background 0.15s',
          flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute',
          top: offset,
          left: checked ? track.width - track.thumb - offset : offset,
          width: track.thumb,
          height: track.thumb,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: 'var(--shadow-sm)',
          transition: 'left 0.15s',
        }} />
      </button>
      {(label || hint) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label && <span style={{ fontSize: size === 'sm' ? 'var(--text-sm)' : 'var(--text-base)', fontWeight: 500, color: 'var(--text-default)' }}>{label}</span>}
          {hint && <span style={{ fontSize: size === 'sm' ? 'var(--text-sm)' : 'var(--text-base)', color: 'var(--text-muted)' }}>{hint}</span>}
        </span>
      )}
    </label>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
// Real Untitled UI sizes: xs | sm | md | lg | xl | 2xl, with online/offline
// status (away/busy kept as Comply365 extensions on the same dot pattern).

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

interface AvatarProps {
  src?: string
  initials?: string
  size?: AvatarSize
  status?: AvatarStatus
}

const avatarPx: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 56, '2xl': 64 }
const statusColors: Record<AvatarStatus, string> = {
  online: 'var(--bg-success-solid)', offline: 'var(--bg-neutral-solid)',
  away: 'var(--bg-warning-solid)', busy: 'var(--bg-danger-solid)',
}

export function Avatar({ src, initials, size = 'md', status }: AvatarProps) {
  const px = avatarPx[size]
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: px, height: px, borderRadius: '50%',
        background: src ? 'transparent' : 'var(--bg-neutral-muted)',
        color: 'var(--text-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: px * 0.36, fontWeight: 600, overflow: 'hidden', flexShrink: 0,
        outline: '1px solid var(--border-subtle)', outlineOffset: -1,
      }}>
        {src
          ? <img src={src} alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : initials
            ? initials
            : <User01 style={{ width: px * 0.5, height: px * 0.5 }} />}
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

const alertIcons: Record<AlertVariant, IconSlot> = {
  info: InfoCircle, success: CheckCircle, warning: AlertTriangle, danger: AlertCircle,
}
const alertIntents: Record<AlertVariant, Intent> = {
  info: 'info', success: 'success', warning: 'warning', danger: 'danger',
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
      <FeaturedIcon icon={alertIcons[variant]} color={alertIntents[variant]} size="sm" />
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
          color: `var(--text-${variant}-muted)`, padding: 0, lineHeight: 1, alignSelf: 'flex-start',
        }}>
          <XClose style={{ width: 16, height: 16 }} />
        </button>
      )}
    </div>
  )
}

// ─── Risk Indicator (Comply365-specific) ───────────────────────────────────────

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

// ─── Modal ────────────────────────────────────────────────────────────────────

export type ModalSize = 'sm' | 'md' | 'lg'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  size?: ModalSize
  icon?: IconSlot
  iconColor?: Intent
  children?: React.ReactNode
  footer?: React.ReactNode
}

const modalWidths: Record<ModalSize, number> = { sm: 400, md: 480, lg: 600 }

export function Modal({ open, onClose, title, description, size = 'md', icon, iconColor = 'primary', children, footer }: ModalProps) {
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--backdrop)',
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
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-default)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {icon && <FeaturedIcon icon={icon} color={iconColor} size="lg" />}
            <div>
              <h2 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-emphasis)', lineHeight: 'var(--text-lg--line-height)' }}>
                {title}
              </h2>
              {description && (
                <p style={{ margin: '4px 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{description}</p>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: 4, lineHeight: 1, borderRadius: 'var(--radius-sm)', flexShrink: 0 }}>
            <XClose style={{ width: 16, height: 16 }} />
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
  title: string
  description?: string
  children: React.ReactNode
  placement?: TooltipPlacement
}

export function Tooltip({ title, description, children, placement = 'top' }: TooltipProps) {
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
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxWidth: 320,
          background: 'var(--bg-neutral-solid)',
          color: 'var(--text-neutral-solid)',
          padding: description ? '12px' : '8px 12px',
          borderRadius: 'var(--radius-md)',
          whiteSpace: description ? 'normal' : 'nowrap',
          pointerEvents: 'none',
          zIndex: 9998,
          boxShadow: 'var(--shadow-lg)',
          ...pos,
        }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{title}</span>
          {description && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, opacity: 0.7 }}>{description}</span>}
        </div>
      )}
    </div>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
// Real Untitled UI horizontal tab types: underline | button-border | button-gray
// (a subset of the full button-brand/button-gray/button-border/button-minimal/underline set)

export type TabsType = 'underline' | 'button-border' | 'button-gray'
export type TabsSize = 'sm' | 'md'

interface TabItem {
  id: string
  label: string
  icon?: IconSlot
  badge?: string | number
}

interface TabsProps {
  items: TabItem[]
  selectedKey: string
  onChange: (id: string) => void
  type?: TabsType
  size?: TabsSize
}

const tabSizes: Record<TabsSize, { padding: string; underlinePadding: string; fontSize: string; gap: number; iconSize: number }> = {
  sm: { padding: '8px 10px',  underlinePadding: '0 2px 10px', fontSize: 'var(--text-sm)',   gap: 4, iconSize: 16 },
  md: { padding: '10px 10px', underlinePadding: '0 2px 10px', fontSize: 'var(--text-base)', gap: 6, iconSize: 20 },
}

const tabsContainer: Record<TabsType, React.CSSProperties> = {
  underline: { display: 'flex', gap: 12, borderBottom: '1px solid var(--border-default)' },
  'button-border': { display: 'flex', gap: 4, padding: 4, borderRadius: 'var(--radius-lg)', background: 'var(--bg-neutral-muted)', border: '1px solid var(--border-default)', width: 'fit-content' },
  'button-gray': { display: 'flex', gap: 4 },
}

function tabStyle(type: TabsType, size: TabsSize, isActive: boolean): React.CSSProperties {
  const cfg = tabSizes[size]
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: cfg.gap,
    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    fontWeight: 600, fontSize: cfg.fontSize, transition: 'all 0.1s',
    color: isActive ? 'var(--text-default)' : 'var(--text-muted)',
  }
  if (type === 'underline') {
    return {
      ...base,
      padding: cfg.underlinePadding,
      borderBottom: `2px solid ${isActive ? 'var(--bg-primary-solid)' : 'transparent'}`,
      marginBottom: -1,
      borderRadius: 0,
      color: isActive ? 'var(--text-info-default)' : 'var(--text-muted)',
    }
  }
  if (type === 'button-border') {
    return {
      ...base,
      padding: cfg.padding,
      borderRadius: 'var(--radius-md)',
      background: isActive ? 'var(--surface-primary)' : 'transparent',
      boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
    }
  }
  // button-gray
  return {
    ...base,
    padding: cfg.padding,
    borderRadius: 'var(--radius-md)',
    background: isActive ? 'var(--bg-neutral-muted)' : 'transparent',
  }
}

export function Tabs({ items, selectedKey, onChange, type = 'underline', size = 'sm' }: TabsProps) {
  const cfg = tabSizes[size]
  return (
    <div style={tabsContainer[type]}>
      {items.map(item => {
        const isActive = item.id === selectedKey
        return (
          <button key={item.id} onClick={() => onChange(item.id)} style={tabStyle(type, size, isActive)}>
            {item.icon && renderIcon(item.icon, cfg.iconSize)}
            {item.label}
            {item.badge !== undefined && (
              <Badge type="pill-color" size="sm" color={isActive ? 'primary' : 'neutral'}>{item.badge}</Badge>
            )}
          </button>
        )
      })}
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
