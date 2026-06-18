import { useState } from 'react'
import { Button, Input } from './ComponentSection'
import { TokenInspector, type TokenDef } from '../components/TokenInspector'
import heroImg from '../assets/login-hero.jpg'
import logoPaths from '../assets/comply-logo-paths'

const INSPECTOR_TOKENS: TokenDef[] = [
  { name: 'surface-primary',    cssVar: '--surface-primary',    property: 'background-color' },
  { name: 'text-default',       cssVar: '--text-default',       property: 'color' },
  { name: 'text-muted',         cssVar: '--text-muted',         property: 'color' },
  { name: 'text-info-default',  cssVar: '--text-info-default',  property: 'color' },
  { name: 'bg-primary-solid',   cssVar: '--bg-primary-solid',   property: 'background-color' },
  { name: 'text-primary-solid', cssVar: '--text-primary-solid', property: 'color' },
  { name: 'border-default',     cssVar: '--border-default',     property: 'border-color' },
  { name: 'control-border',     cssVar: '--control-border',     property: 'border-color' },
  { name: 'control-text',       cssVar: '--control-text',       property: 'color' },
]

function ComplyLogo() {
  return (
    <svg width="161" height="14" viewBox="0 0 321 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d={logoPaths.p3e01cc00} fill="url(#login-logo-gradient)" fillRule="evenodd" />
      <path d={logoPaths.p7210c00} fill="#181818" />
      <path d={logoPaths.p3b093280} fill="#181818" />
      <path d={logoPaths.p2373480} fill="#181818" />
      <path d={logoPaths.p5d8f00} fill="#181818" />
      <path d={logoPaths.p20cb3ac0} fill="#181818" />
      <path d={logoPaths.p1f8e2450} fill="#181818" />
      <path d={logoPaths.p17be62b0} fill="#181818" />
      <path d={logoPaths.p225b2500} fill="#181818" />
      <path d={logoPaths.p26b33d80} fill="#181818" />
      <path d={logoPaths.p2434bd00} fill="#181818" />
      <defs>
        <linearGradient id="login-logo-gradient" gradientUnits="userSpaceOnUse" x1="-0.00642151" x2="51.1417" y1="26.9913" y2="-9.33808">
          <stop stopColor="#0057FF" />
          <stop offset="1" stopColor="#00BBC7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LoginPageExample({ theme }: { theme: string }) {
  const [orgCode, setOrgCode] = useState('VSTDEV')
  const [username, setUsername] = useState('')

  return (
    <TokenInspector tokens={INSPECTOR_TOKENS} theme={theme} exampleLabel="Login page example">
      <div
        data-token="border-default"
        style={{
          display: 'flex',
          aspectRatio: '16 / 9',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* ── left pane: login form ──────────────────────────────── */}
        <div
          data-token="surface-primary"
          style={{
            flex: '0 0 42%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 24,
            padding: '48px 64px',
            background: 'var(--surface-primary)',
            overflow: 'auto',
          }}
        >
          <ComplyLogo />

          <div>
            <h2
              data-token="text-default"
              style={{
                margin: '0 0 8px',
                fontSize: 32,
                fontWeight: 600,
                color: 'var(--text-default)',
                letterSpacing: '-1px',
                lineHeight: '36px',
              }}
            >
              Log into your account
            </h2>
            <p
              data-token="text-muted"
              style={{ margin: 0, fontSize: 16, color: 'var(--text-muted)', letterSpacing: '-0.2px' }}
            >
              Please enter your organisation code.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
              data-token="control-border control-text"
              label="Organisation Code"
              value={orgCode}
              onChange={e => setOrgCode(e.target.value)}
            />
            <div>
              <Input
                data-token="control-border control-text"
                label="Username"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <a
                href="#"
                data-token="text-info-default"
                style={{ display: 'inline-block', marginTop: 8, fontSize: 14, color: 'var(--text-info-default)', textDecoration: 'none' }}
              >
                I forgot my username
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
              <Button data-token="bg-primary-solid text-primary-solid" color="primary" size="lg" style={{ width: '100%' }}>Next</Button>
              <Button data-token="border-default text-default" color="secondary" size="lg" style={{ width: '100%' }} onClick={() => { setOrgCode(''); setUsername('') }}>Clear All</Button>
            </div>
          </div>

          <p
            data-token="text-default"
            style={{ margin: 0, fontSize: 14, color: 'var(--text-default)', lineHeight: '20px' }}
          >
            For assistance with usernames and passwords please contact your administrator.
          </p>
        </div>

        {/* ── right pane: hero image ─────────────────────────────── */}
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          <img
            src={heroImg}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
    </TokenInspector>
  )
}
