import { useState } from 'react';

export default function SignupPage({ onNav, onRegister }) {
  const [form, setForm] = useState({
    first: '', last: '', email: '', company: '', role: 'Select your role', password: '',
  });

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleRegister = () => {
    if (!form.first && !form.email) { alert('Please fill in your name and email.'); return; }
    onRegister(form.first, form.last, form.email, form.role);
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
          Start<br />seeing<br /><em>signals.</em>
        </h2>
        <p className="auth-sub">
          Join 500+ teams using NEXUS to track consumer trends
          and get ahead of the market.
        </p>
        <ul className="auth-features">
          <li>14-day free trial, no credit card required</li>
          <li>Onboarding support with dedicated analyst</li>
          <li>Connect to your existing data sources in minutes</li>
          <li>SOC 2 Type II compliant, enterprise-ready</li>
        </ul>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h3 className="auth-form-title">Create account</h3>
          <p className="auth-form-sub">
            Already a member?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onNav('login'); }}>
              Sign in
            </a>
          </p>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input type="text" className="form-input" placeholder="Jane" value={form.first} onChange={set('first')} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-input" placeholder="Smith" value={form.last} onChange={set('last')} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Work Email</label>
            <input type="email" className="form-input" placeholder="jane@company.com" value={form.email} onChange={set('email')} />
          </div>

          <div className="form-group">
            <label className="form-label">Company</label>
            <input type="text" className="form-input" placeholder="Acme Corp" value={form.company} onChange={set('company')} />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-input" value={form.role} onChange={set('role')}>
              <option>Select your role</option>
              <option>Marketing Manager</option>
              <option>Product Analyst</option>
              <option>Brand Strategist</option>
              <option>Data Scientist</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} />
          </div>

          <div className="form-check">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
          </div>

          <div style={{ marginTop:20 }}>
            <a href="#" className="btn-primary btn-full" onClick={(e) => { e.preventDefault(); handleRegister(); }}>
              Create Free Account
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}