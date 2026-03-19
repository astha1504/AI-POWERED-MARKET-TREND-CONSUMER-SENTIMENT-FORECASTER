import { useState, useEffect } from 'react';
import { getTrends } from '../utils/api';
import { DS } from '../data/dataset';

export default function TrendForecasting() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError(false);
    getTrends().then((res) => {
      if (res && Array.isArray(res)) setData(res);
      else setError(true);
      setLoading(false);
    });
  };

  useEffect(() => { fetchData(); }, []);

  const negativeProducts = data ?? [];
  const allProducts      = DS.products;
  const topNegative      = negativeProducts[0];
  const maxCount         = negativeProducts[0]?.count ?? 1;

  return (
    <div>

      {loading && (
        <div style={{ padding:'12px 16px', background:'rgba(200,255,0,0.06)', border:'1px solid rgba(200,255,0,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)', letterSpacing:1 }}>
          <span className="pulse-dot" /> LOADING TREND DATA FROM MongoDB...
        </div>
      )}
      {error && (
        <div style={{ padding:'12px 16px', background:'rgba(255,45,85,0.06)', border:'1px solid rgba(255,45,85,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--blood)', letterSpacing:1 }}>
          ⚠ BACKEND OFFLINE — SHOWING DATASET VALUES · Run: uvicorn app.main:app --reload
        </div>
      )}
      {data && !loading && (
        <div style={{ padding:'12px 16px', background:'rgba(255,45,85,0.06)', border:'1px solid rgba(255,45,85,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--blood)', letterSpacing:1 }}>
          ⚠ LIVE NEGATIVE TRENDS FROM /trend/ · {negativeProducts.length} products flagged · sentiment_results collection
        </div>
      )}

      <div className="kpi-grid">
        <div className="kpi-card negative">
          <div className="kpi-label">⚠️ Most Complained</div>
          <div className="kpi-val" style={{ color:'var(--blood)', fontSize:14 }}>
            {topNegative?._id?.slice(0, 14) ?? 'N/A'}
          </div>
          <div className="kpi-change down">↓ {topNegative?.count ?? 0} negative reviews</div>
        </div>
        <div className="kpi-card warning">
          <div className="kpi-label">📉 Flagged Products</div>
          <div className="kpi-val" style={{ color:'var(--orange)' }}>
            {negativeProducts.length || DS.products.filter((p) => p.neg > 20).length}
          </div>
          <div className="kpi-change down">↓ Have negative sentiment</div>
        </div>
        <div className="kpi-card positive">
          <div className="kpi-label">🏆 Best Rated</div>
          <div className="kpi-val" style={{ color:'var(--acid)' }}>4.79★</div>
          <div className="kpi-change up">↑ Kid-Proof Case</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">📊 Total Products</div>
          <div className="kpi-val">{allProducts.length}</div>
          <div className="kpi-change up">↑ In dataset</div>
        </div>
      </div>

      {negativeProducts.length > 0 && (
        <div className="dash-panel" style={{ marginBottom:16 }}>
          <div className="panel-header">
            <div className="panel-title">⚠️ Negative Sentiment Trends — Live from Backend</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <div className="panel-meta">LIVE /trend/ · {negativeProducts.length} PRODUCTS</div>
              <span className="panel-action" onClick={fetchData}>REFRESH</span>
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
            {negativeProducts.slice(0, 10).map((p, i) => {
              const pct   = Math.round((p.count / maxCount) * 100);
              const color = p.count >= 10 ? 'var(--blood)' : p.count >= 5 ? 'var(--orange)' : 'var(--electric)';
              const tag   = p.count >= 10 ? 'falling' : p.count >= 5 ? 'stable' : 'rising';
              return (
                <div key={i}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                    <span style={{ maxWidth:340, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {p._id}
                    </span>
                    <div style={{ display:'flex', gap:8, alignItems:'center', flexShrink:0 }}>
                      <span className={`trend-tag ${tag}`}>{tag.toUpperCase()}</span>
                      <span style={{ fontFamily:'Space Mono,monospace', fontSize:11, color }}>{p.count} neg</span>
                    </div>
                  </div>
                  <div style={{ height:6, background:'var(--glass-border)' }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:color, transition:'width 1s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <table className="trend-table">
            <thead>
              <tr>
                <th>#</th><th>Product</th><th>Negative Reviews</th><th>Severity</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {negativeProducts.map((p, i) => {
                const severity = p.count >= 10 ? 'HIGH' : p.count >= 5 ? 'MEDIUM' : 'LOW';
                const tag      = p.count >= 10 ? 'falling' : p.count >= 5 ? 'stable' : 'rising';
                const color    = p.count >= 10 ? 'var(--blood)' : p.count >= 5 ? 'var(--orange)' : 'var(--electric)';
                return (
                  <tr key={i}>
                    <td style={{ fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--blood)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <td style={{ maxWidth:220, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {p._id}
                    </td>
                    <td style={{ fontFamily:'Space Mono,monospace', fontSize:12, color:'var(--blood)' }}>{p.count}</td>
                    <td style={{ fontFamily:'Space Mono,monospace', fontSize:11, color }}>{severity}</td>
                    <td><span className={`trend-tag ${tag}`}>{tag.toUpperCase()}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="dash-panel" style={{ marginBottom:16 }}>
        <div className="panel-header">
          <div className="panel-title">All Products — Full Sentiment Overview</div>
          <div className="panel-meta">DATASET VALUES</div>
        </div>
        <table className="trend-table">
          <thead>
            <tr>
              <th>#</th><th>Product</th><th>Reviews</th>
              <th>Positive %</th><th>Negative %</th><th>Avg Rating</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((p, i) => {
              const tag   = p.pos >= 80 ? 'rising' : p.pos >= 60 ? 'stable' : 'falling';
              const color = p.pos >= 80 ? 'var(--acid)' : p.pos >= 60 ? 'var(--orange)' : 'var(--blood)';
              const isNegTrend = negativeProducts.some(
                (n) => n._id?.toLowerCase().includes(p.name?.toLowerCase().slice(0, 15))
              );
              return (
                <tr key={i} style={{ background: isNegTrend ? 'rgba(255,45,85,0.04)' : '' }}>
                  <td style={{ fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </td>
                  <td style={{ maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {p.name}
                    {isNegTrend && (
                      <span style={{ fontFamily:'Space Mono,monospace', fontSize:8, color:'var(--blood)', marginLeft:6, letterSpacing:1 }}>
                        ⚠ FLAGGED
                      </span>
                    )}
                  </td>
                  <td style={{ fontFamily:'Space Mono,monospace', fontSize:12 }}>{p.count}</td>
                  <td style={{ fontFamily:'Space Mono,monospace', fontSize:11, color }}>{p.pos}%</td>
                  <td style={{ fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--blood)' }}>{p.neg}%</td>
                  <td style={{ fontFamily:'Space Mono,monospace', fontSize:11 }}>{p.avg}★</td>
                  <td><span className={`trend-tag ${tag}`}>{tag.toUpperCase()}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="dash-panel">
        <div className="panel-header">
          <div className="panel-title">Negative Review Count — Top 8 Products</div>
          <div className="panel-meta">FROM /trend/ ENDPOINT</div>
        </div>
        <svg viewBox="0 0 700 220" width="100%" style={{ height:220 }}>
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="60" y1={y} x2="680" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4,4" />
          ))}
          <line x1="60" y1="180" x2="680" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {negativeProducts.slice(0, 8).map((p, i) => {
            const barW  = 60;
            const gap   = 78;
            const x     = 70 + i * gap;
            const h     = Math.max(8, Math.round((p.count / maxCount) * 130));
            const y     = 180 - h;
            const color = p.count >= 10 ? '#ff2d55' : p.count >= 5 ? '#ff8c00' : '#00e5ff';
            return (
              <g key={i}>
                <rect x={x} y={y} width={barW} height={h} fill={color} opacity="0.8" rx="2" />
                <text x={x + barW / 2} y={y - 6} fill={color} fontSize="10" fontFamily="Space Mono" textAnchor="middle">
                  {p.count}
                </text>
                <text x={x + barW / 2} y="198" fill="rgba(122,122,140,0.7)" fontSize="8" fontFamily="Space Mono" textAnchor="middle">
                  {p._id?.slice(0, 8)}
                </text>
              </g>
            );
          })}

          <text x="50" y="44"  fill="rgba(122,122,140,0.6)" fontSize="9" fontFamily="Space Mono" textAnchor="end">{maxCount}</text>
          <text x="50" y="124" fill="rgba(122,122,140,0.6)" fontSize="9" fontFamily="Space Mono" textAnchor="end">{Math.round(maxCount/2)}</text>
          <text x="50" y="184" fill="rgba(122,122,140,0.6)" fontSize="9" fontFamily="Space Mono" textAnchor="end">0</text>
        </svg>

        <div style={{ marginTop:8, display:'flex', gap:20 }}>
          {[
            { color:'var(--blood)',    label:'High (10+)' },
            { color:'var(--orange)',   label:'Medium (5-9)' },
            { color:'var(--electric)', label:'Low (<5)' },
          ].map((l) => (
            <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:10, height:10, background:l.color, borderRadius:2 }} />
              <span style={{ fontSize:11, color:'var(--muted)' }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}