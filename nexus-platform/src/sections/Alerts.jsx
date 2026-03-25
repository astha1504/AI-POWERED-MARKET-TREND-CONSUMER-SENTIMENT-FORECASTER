import { useState, useEffect } from 'react';
import { getAlerts } from '../utils/api';
import Toggle from '../components/ui/Toggle';

export default function Alerts() {

  const [alerts,  setAlerts]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  // Fallback alerts when backend is offline
  const FALLBACK = [
    { product:'Brand X',          message:'Negative sentiment spike detected', severity:'High',   time:'2 MINS AGO'  },
    { product:'Fire TV Remote',   message:'Negative sentiment spike detected', severity:'High',   time:'8 MINS AGO'  },
    { product:'OEM Charger',      message:'Negative sentiment spike detected', severity:'Medium', time:'14 MINS AGO' },
  ];

  const fetchAlerts = () => {
    setLoading(true);
    setError(false);
    getAlerts().then((res) => {
      if (res && Array.isArray(res) && res.length > 0) {
        setAlerts(res);
      } else if (res && Array.isArray(res) && res.length === 0) {
        // Backend returned empty — no alerts
        setAlerts([]);
      } else {
        // Backend offline
        setAlerts(FALLBACK);
        setError(true);
      }
      setLoading(false);
    });
  };

  useEffect(() => { fetchAlerts(); }, []);

  const dismiss = (i) => setAlerts((prev) => prev.filter((_, idx) => idx !== i));

  // Map severity to type class
  const getType = (severity) => {
    if (!severity) return 'info';
    const s = severity.toLowerCase();
    if (s === 'high'   || s === 'critical') return 'crit';
    if (s === 'medium' || s === 'warning')  return 'warn';
    return 'info';
  };

  const getIcon = (severity) => {
    if (!severity) return 'ℹ️';
    const s = severity.toLowerCase();
    if (s === 'high'   || s === 'critical') return '🚨';
    if (s === 'medium' || s === 'warning')  return '⚠️';
    return 'ℹ️';
  };

  const critCount = alerts.filter((a) => getType(a.severity) === 'crit').length;
  const warnCount = alerts.filter((a) => getType(a.severity) === 'warn').length;
  const infoCount = alerts.filter((a) => getType(a.severity) === 'info').length;

  return (
    <div>

      {/* STATUS BAR */}
      {loading && (
        <div style={{ padding:'12px 16px', background:'rgba(200,255,0,0.06)', border:'1px solid rgba(200,255,0,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)', letterSpacing:1 }}>
          <span className="pulse-dot" /> LOADING ALERTS FROM MongoDB...
        </div>
      )}
      {error && (
        <div style={{ padding:'12px 16px', background:'rgba(255,45,85,0.06)', border:'1px solid rgba(255,45,85,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--blood)', letterSpacing:1 }}>
          ⚠ BACKEND OFFLINE — SHOWING FALLBACK ALERTS · Run: uvicorn app.main:app --reload
        </div>
      )}
      {!loading && !error && (
        <div style={{ padding:'12px 16px', background:'rgba(200,255,0,0.06)', border:'1px solid rgba(200,255,0,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)', letterSpacing:1 }}>
          ✓ LIVE ALERTS FROM MongoDB · avg_score &lt; -0.5 threshold
        </div>
      )}

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card negative">
          <div className="kpi-label">🚨 High Severity</div>
          <div className="kpi-val" style={{ color:'var(--blood)' }}>{critCount}</div>
          <div className="kpi-change down">↓ Needs attention</div>
        </div>
        <div className="kpi-card warning">
          <div className="kpi-label">⚠️ Medium Severity</div>
          <div className="kpi-val" style={{ color:'var(--orange)' }}>{warnCount}</div>
          <div className="kpi-change" style={{ color:'var(--orange)' }}>→ Monitor</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">ℹ️ Info</div>
          <div className="kpi-val">{infoCount}</div>
          <div className="kpi-change up">↑ Low priority</div>
        </div>
        <div className="kpi-card positive">
          <div className="kpi-label">📊 Total Active</div>
          <div className="kpi-val" style={{ color:'var(--acid)' }}>{alerts.length}</div>
          <div className="kpi-change up">↑ From sentiment_results</div>
        </div>
      </div>

      <div className="dash-grid-2b">

        {/* ALERT LIST */}
        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Active Alerts</div>
            <div style={{ display:'flex', gap:8 }}>
              <span className="panel-action" onClick={fetchAlerts}>REFRESH</span>
              <span className="panel-action" onClick={() => setAlerts([])}>DISMISS ALL</span>
            </div>
          </div>

          {alerts.length === 0 && !loading && (
            <div style={{ textAlign:'center', padding:40, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--muted)', letterSpacing:1 }}>
              ✓ NO ALERTS — ALL PRODUCTS ABOVE -0.5 THRESHOLD
            </div>
          )}

          <div className="alert-list">
            {alerts.map((a, i) => (
              <div key={i} className={`alert-item ${getType(a.severity)}`}>
                <span className="alert-icon">{getIcon(a.severity)}</span>
                <div className="alert-content">
                  {/* Product name as title */}
                  <div className="alert-title">{a.product}</div>
                  {/* Message from backend */}
                  <div className="alert-desc">{a.message}</div>
                  {/* Severity badge + avg score if available */}
                  <div className="alert-time">
                    SEVERITY: {a.severity?.toUpperCase()}
                    {a.avg_score !== undefined && ` · AVG SCORE: ${a.avg_score.toFixed(4)}`}
                  </div>
                </div>
                <span className="alert-dismiss" onClick={() => dismiss(i)}>
                  DISMISS
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ALERT RULES */}
        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Alert Rules</div>
            <span className="panel-action">+ NEW RULE</span>
          </div>

          {/* Current active rule from backend */}
          <div style={{ padding:'12px 14px', border:'1px solid rgba(200,255,0,0.2)', background:'rgba(200,255,0,0.04)', marginBottom:16 }}>
            <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--acid)', letterSpacing:1, marginBottom:6 }}>
              ✓ ACTIVE RULE — FROM alert_service.py
            </div>
            <div style={{ fontSize:13, fontWeight:500, marginBottom:4 }}>
              Negative Sentiment Spike
            </div>
            <div style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'var(--muted)', letterSpacing:1 }}>
              TRIGGER: avg_score &lt; -0.5 per product
            </div>
            <div style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'var(--muted)', letterSpacing:1, marginTop:2 }}>
              SOURCE: MongoDB sentiment_results collection
            </div>
            <div style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'var(--muted)', letterSpacing:1, marginTop:2 }}>
              SEVERITY: High
            </div>
          </div>

          <Toggle label="Sentiment Drop > 10pts"  desc="Trigger: Critical · Channel: Slack + Email" defaultOn={true}  />
          <Toggle label="Volume Spike > 200%"      desc="Trigger: Warning · Channel: Email"          defaultOn={true}  />
          <Toggle label="New Topic Emerging"       desc="Trigger: Info · Channel: Dashboard"          defaultOn={true}  />
          <Toggle label="Competitor Mention Surge" desc="Trigger: Warning · Channel: Slack"           defaultOn={false} />
          <Toggle label="Scraper Failure"          desc="Trigger: Critical · Channel: PagerDuty"      defaultOn={true}  />
        </div>

      </div>

    </div>
  );
}