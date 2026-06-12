interface NavItem  { id: string; label: string }
interface NavGroup { heading: string; items: NavItem[] }

const NAV: NavGroup[] = [
  {
    heading: '',
    items: [
      { id: 'intro', label: 'Introduction' },
    ],
  },
  {
    heading: 'Tokens',
    items: [
      { id: 'primitives', label: 'Primitive colours' },
      { id: 'semantic',   label: 'Semantic tokens'  },
      { id: 'intent',     label: 'Intent tokens'    },
    ],
  },
  {
    heading: 'Components',
    items: [
      { id: 'buttons',   label: 'Buttons'   },
      { id: 'badges',    label: 'Badges'    },
      { id: 'inputs',    label: 'Inputs'    },
      { id: 'avatars',   label: 'Avatars'   },
      { id: 'alerts',    label: 'Alerts'    },
      { id: 'risk',      label: 'Risk scale' },
      { id: 'toggles',   label: 'Toggles'    },
      { id: 'checkboxes',label: 'Checkboxes' },
      { id: 'modals',    label: 'Modals'     },
      { id: 'tooltips',  label: 'Tooltips'   },
      { id: 'tabs',      label: 'Tabs'       },
      { id: 'selects',   label: 'Selects'    },
    ],
  },
]

interface Props {
  active: string
  onNav: (id: string) => void
}

export function Sidebar({ active, onNav }: Props) {
  return (
    <nav style={{
      width: 216,
      flexShrink: 0,
      borderRight: '1px solid var(--app-border)',
      padding: '20px 0',
      overflowY: 'auto',
      background: 'var(--surface-primary)',
    }}>
      {NAV.map(group => (
        <div key={group.heading || '_top'} style={{ marginBottom: 20 }}>
          {group.heading && (
            <div style={{
              padding: '0 14px',
              marginBottom: 2,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-subtle)',
            }}>
              {group.heading}
            </div>
          )}
          {group.items.map(item => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '5px 14px',
                border: 'none',
                background: active === item.id ? 'var(--bg-neutral-muted)' : 'transparent',
                color: active === item.id ? 'var(--text-emphasis)' : 'var(--text-muted)',
                fontWeight: active === item.id ? 500 : 400,
                fontSize: 13,
                cursor: 'pointer',
                borderLeft: active === item.id ? '2px solid var(--bg-primary-solid)' : '2px solid transparent',
                transition: 'all 0.1s',
                fontFamily: 'inherit',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  )
}
