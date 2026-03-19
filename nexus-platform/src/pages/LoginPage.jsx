import { useState } from 'react';

export default function LoginPage({ onNav, onLogin }) {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (!email) { alert('Please enter your email.'); return; }
    onLogin(email);
    onNav('dashboard');
  };

  return (
    <div className="auth-page">

      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-left-grid" />
        <div className="auth-brand" onClick={() => onNav('landing')}>
          NEX<span>US</span>
        </div>
        <h2 className="auth-headline">
          Welcome<br />back to<br /><em>clarity.</em>
        </h2>
        <p className="auth-sub">
          Millions of consumer signals processed every hour.
          Pick up exactly where you left off.
        </p>
        <ul className="auth-features">
          <li>Real-time sentiment dashboards</li>
          <li>Trending topic detection across 40+ languages</li>
          <li>Instant alerts on sentiment anomalies</li>
          <li>AI-generated reports with one click</li>
        </ul>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h3 className="auth-form-title">Sign in</h3>
          <p className="auth-form-sub">
            No account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onNav('signup'); }}>
              Create one free
            </a>
          </p>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••••"
            />
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:24 }}>
            <a href="#" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'var(--acid)', textDecoration:'none', letterSpacing:1 }}>
              FORGOT PASSWORD?
            </a>
          </div>

          <a href="#" className="btn-primary btn-full" onClick={(e) => { e.preventDefault(); handleLogin(); }}>
            Sign In
          </a>

          <div className="form-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <button className="btn-ghost" style={{ padding:12 }} onClick={handleLogin}>
              G Google
            </button>
            <button className="btn-ghost" style={{ padding:12 }} onClick={handleLogin}>
              Microsoft
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}