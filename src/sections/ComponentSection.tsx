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
