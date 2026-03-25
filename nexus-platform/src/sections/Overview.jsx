import { DS } from '../data/dataset';

export default function Overview() {
  return (
    <div>

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card positive">
          <div className="kpi-label">⬡ Overall Sentiment</div>
          <div className="kpi-val" style={{ color:'var(--acid)' }}>{DS.pos_pct}%</div>
          <div className="kpi-change up">↑ from {DS.total} reviews</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">📡 Posts Ingested</div>
          <div className="kpi-val">{DS.total.toLocaleString()}</div>
          <div className="kpi-change up">↑ Real dataset loaded</div>
        </div>
        <div className="kpi-card warning">
          <div className="kpi-label">🔥 Trending Topics</div>
          <div className="kpi-val">5</div>
          <div className="kpi-change up">↑ Clusters detected</div>
        </div>
        <div className="kpi-card negative">
          <div className="kpi-label">🔔 Active Alerts</div>
          <div className="kpi-val" style={{ color:'var(--blood)' }}>3</div>
          <div className="kpi-change down">↓ 2 critical</div>
        </div>
      </div>

      {/* CHART + DONUT */}
      <div className="dash-grid-2">
        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Sentiment Trend — Last 30 Days</div>
            <span className="panel-action">EXPORT</span>
          </div>
          <svg viewBox="0 0 560 180" width="100%" style={{ height:180 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#c8ff00" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff2d55" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ff2d55" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="45"  x2="560" y2="45"  stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1="0" y1="90"  x2="560" y2="90"  stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1="0" y1="135" x2="560" y2="135" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <text x="0" y="48"  fill="rgba(122,122,140,0.6)" fontSize="9" fontFamily="Space Mono">80%</text>
            <text x="0" y="93"  fill="rgba(122,122,140,0.6)" fontSize="9" fontFamily="Space Mono">60%</text>
            <text x="0" y="138" fill="rgba(122,122,140,0.6)" fontSize="9" fontFamily="Space Mono">40%</text>
            <path d="M30,110 L67,95 L104,88 L141,100 L178,78 L215,65 L252,72 L289,58 L326,50 L363,42 L400,48 L437,38 L474,30 L511,35 L511,180 L30,180 Z" fill="url(#g1)" />
            <path d="M30,110 L67,95 L104,88 L141,100 L178,78 L215,65 L252,72 L289,58 L326,50 L363,42 L400,48 L437,38 L474,30 L511,35" fill="none" stroke="#c8ff00" strokeWidth="2" />
            <path d="M30,148 L67,152 L104,145 L141,155 L178,150 L215,158 L252,153 L289,160 L326,155 L363,162 L400,158 L437,165 L474,162 L511,168 L511,180 L30,180 Z" fill="url(#g2)" />
            <path d="M30,148 L67,152 L104,145 L141,155 L178,150 L215,158 L252,153 L289,160 L326,155 L363,162 L400,158 L437,165 L474,162 L511,168" fill="none" stroke="#ff2d55" strokeWidth="1.5" />
            <circle cx="474" cy="30" r="4" fill="#c8ff00" />
          </svg>
          <div style={{ display:'flex', gap:20, marginTop:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--muted)' }}>
              <div style={{ width:12, height:2, background:'var(--acid)' }} /> Positive
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--muted)' }}>
              <div style={{ width:12, height:2, background:'var(--blood)' }} /> Negative
            </div>
          </div>
        </div>

        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Sentiment Distribution</div>
            <div className="panel-meta"><span className="pulse-dot" style={{ background:'var(--acid)' }} />LIVE</div>
          </div>
          <div className="donut-wrap">
            <div style={{ position:'relative', width:160, height:160 }}>
              <svg viewBox="0 0 160 160" width="160" height="160">
                <circle cx="80" cy="80" r="60" fill="none" stroke="#1a1a2e" strokeWidth="22" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#c8ff00" strokeWidth="22"
                  strokeDasharray="318.8 376" strokeDashoffset="94" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#00e5ff" strokeWidth="22"
                  strokeDasharray="29.7 376" strokeDashoffset="-224.8" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#ff2d55" strokeWidth="22"
                  strokeDasharray="27.9 376" strokeDashoffset="-254.5" transform="rotate(-90 80 80)" />
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <div style={{ fontFamily:'Syne,sans-serif', fontSize:28, fontWeight:800, color:'var(--acid)' }}>{DS.pos_pct}%</div>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--muted)', letterSpacing:1 }}>POSITIVE</div>
              </div>
            </div>
            <div className="donut-legend">
              <div className="legend-item"><div className="legend-dot" style={{ background:'var(--acid)' }} /><span>Positive</span><span className="legend-pct">{DS.pos_pct}%</span></div>
              <div className="legend-item"><div className="legend-dot" style={{ background:'var(--electric)' }} /><span>Neutral</span><span className="legend-pct">{DS.neu_pct}%</span></div>
              <div className="legend-item"><div className="legend-dot" style={{ background:'var(--blood)' }} /><span>Negative</span><span className="legend-pct">{DS.neg_pct}%</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* TRENDING + ALERTS + SOURCES */}
      <div className="dash-grid-3">

        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Top Products</div>
            <span className="panel-action">VIEW ALL</span>
          </div>
          <table className="trend-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Reviews</th>
                <th>Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {DS.products.slice(0, 5).map((p, i) => (
                <tr key={i}>
                  <td style={{ fontSize:12 }}>{p.name.slice(0, 28)}</td>
                  <td style={{ fontFamily:'Space Mono,monospace', fontSize:12 }}>{p.count}</td>
                  <td>
                    <span className={`trend-tag ${p.pos >= 80 ? 'rising' : p.pos >= 60 ? 'stable' : 'falling'}`}>
                      {p.pos}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Active Alerts</div>
            <span className="panel-action">VIEW ALL</span>
          </div>
          <div className="alert-list">
            <div className="alert-item crit">
              <span className="alert-icon">🚨</span>
              <div className="alert-content">
                <div className="alert-title">Sentiment Spike Detected</div>
                <div className="alert-desc">NPS dropped 18pts in last 2h</div>
                <div className="alert-time">2 MINS AGO</div>
              </div>
            </div>
            <div className="alert-item warn">
              <span className="alert-icon">⚠️</span>
              <div className="alert-content">
                <div className="alert-title">Volume Anomaly</div>
                <div className="alert-desc">Mentions 340% above baseline</div>
                <div className="alert-time">14 MINS AGO</div>
              </div>
            </div>
            <div className="alert-item info">
              <span className="alert-icon">ℹ️</span>
              <div className="alert-content">
                <div className="alert-title">New Topic Cluster</div>
                <div className="alert-desc">Smart Speaker cluster growing</div>
                <div className="alert-time">1 HR AGO</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Data Sources</div>
            <div className="panel-meta">1 ACTIVE</div>
          </div>
          <div className="source-list">
            {DS.products.slice(0, 4).map((p, i) => {
              const pct = Math.round(p.count / DS.total * 100);
              return (
                <div key={i} className="source-item">
                  <div className="source-logo">📦</div>
                  <div>
                    <div className="source-name">{p.name.slice(0, 22)}</div>
                    <div className="source-vol">{p.count} reviews</div>
                  </div>
                  <div className="source-bar">
                    <div className="source-fill" style={{ width:`${Math.min(pct * 3, 100)}%` }} />
                  </div>
                  <div className="source-pct">{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}