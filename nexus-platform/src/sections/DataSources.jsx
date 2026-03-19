import { useState, useEffect } from 'react';
import { getReviews } from '../utils/api';
import { DS } from '../data/dataset';
import Toggle from '../components/ui/Toggle';

export default function DataSources() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    getReviews(200).then((data) => {
      if (data && Array.isArray(data)) setReviews(data);
      else setError(true);
      setLoading(false);
    });
  }, []);

  const buildProducts = () => {
    if (reviews.length === 0) return DS.products.slice(0, 5);
    const map = {};
    reviews.forEach((r) => {
      const key = r.product;
      if (!map[key]) map[key] = { name: key, count: 0, ratingSum: 0 };
      map[key].count++;
      map[key].ratingSum += r.rating ?? 0;
    });
    return Object.values(map)
      .map((p) => ({
        name:  p.name,
        count: p.count,
        avg:   (p.ratingSum / p.count).toFixed(2),
        pct:   Math.round((p.count / reviews.length) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  };

  const total    = reviews.length || DS.total;
  const products = buildProducts();

  return (
    <div>

      {loading && (
        <div style={{ padding:'12px 16px', background:'rgba(200,255,0,0.06)', border:'1px solid rgba(200,255,0,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)', letterSpacing:1 }}>
          <span className="pulse-dot" /> FETCHING DATA SOURCES FROM MongoDB...
        </div>
      )}
      {error && (
        <div style={{ padding:'12px 16px', background:'rgba(255,45,85,0.06)', border:'1px solid rgba(255,45,85,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--blood)', letterSpacing:1 }}>
          ⚠ BACKEND OFFLINE — SHOWING DATASET VALUES · Run: uvicorn app.main:app --reload
        </div>
      )}
      {!loading && !error && reviews.length > 0 && (
        <div style={{ padding:'12px 16px', background:'rgba(200,255,0,0.06)', border:'1px solid rgba(200,255,0,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)', letterSpacing:1 }}>
          ✓ LIVE DATA FROM MongoDB · {total} reviews · {products.length} products loaded
        </div>
      )}

      <div className="kpi-grid">
        <div className="kpi-card positive">
          <div className="kpi-label">✅ Active Sources</div>
          <div className="kpi-val" style={{ color:'var(--acid)' }}>
            {reviews.length > 0 ? 1 : 0}
          </div>
          <div className="kpi-change up">↑ {reviews.length > 0 ? 'Connected' : 'Offline'}</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">📥 Total Ingested</div>
          <div className="kpi-val">{total}</div>
          <div className="kpi-change up">↑ Reviews loaded</div>
        </div>
        <div className="kpi-card positive">
          <div className="kpi-label">📦 Products</div>
          <div className="kpi-val" style={{ color:'var(--acid)' }}>{products.length}</div>
          <div className="kpi-change up">↑ Unique products</div>
        </div>
        <div className="kpi-card warning">
          <div className="kpi-label">⚡ Avg Rating</div>
          <div className="kpi-val" style={{ color:'var(--orange)' }}>
            {reviews.length > 0
              ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length).toFixed(2)
              : '4.36'}★
          </div>
          <div className="kpi-change up">↑ Across all reviews</div>
        </div>
      </div>

      <div className="dash-panel" style={{ marginBottom:16 }}>
        <div className="panel-header">
          <div className="panel-title">Connected Data Sources</div>
          <span className="panel-action">+ ADD SOURCE</span>
        </div>
        <div className="source-list">
          <div className="source-item">
            <div className="source-logo">⭐</div>
            <div style={{ flex:1 }}>
              <div className="source-name">Amazon Reviews Dataset</div>
              <div className="source-vol">{total} reviews · Last sync: now</div>
            </div>
            <div className="source-bar"><div className="source-fill" style={{ width:'100%' }} /></div>
            <div className="source-pct">100%</div>
            <span className="source-status on">ACTIVE</span>
          </div>
          {products.map((p, i) => (
            <div key={i} className="source-item">
              <div className="source-logo">📦</div>
              <div style={{ flex:1 }}>
                <div className="source-name">{p.name.slice(0, 34)}</div>
                <div className="source-vol">{p.count} reviews · avg {p.avg}★</div>
              </div>
              <div className="source-bar">
                <div className="source-fill" style={{ width:`${Math.min(p.pct * 3, 100)}%` }} />
              </div>
              <div className="source-pct">{p.pct}%</div>
              <span className="source-status on">ACTIVE</span>
            </div>
          ))}
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="dash-panel" style={{ marginBottom:16 }}>
          <div className="panel-header">
            <div className="panel-title">Live Review Feed — From MongoDB</div>
            <div className="panel-meta">cleaned_reviews · {total} TOTAL</div>
          </div>
          <table className="trend-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Review Excerpt</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {reviews.slice(0, 8).map((r, i) => (
                <tr key={i}>
                  <td style={{ fontSize:12, maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {r.product}
                  </td>
                  <td style={{ fontSize:11, color:'var(--muted)', maxWidth:260, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {(r.review || '').slice(0, 100)}...
                  </td>
                  <td style={{ fontFamily:'Space Mono,monospace', fontSize:12, color: r.rating >= 4 ? 'var(--acid)' : r.rating <= 2 ? 'var(--blood)' : 'var(--orange)' }}>
                    {r.rating}★
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="dash-grid-2b">
        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Pipeline Health</div>
            <div className="panel-meta"><span className="pulse-dot" />LIVE</div>
          </div>
          <Toggle label="Auto-scraping"      desc="Continuously pull new data"        defaultOn={true}  />
          <Toggle label="Deduplication"      desc="Remove duplicate entries"          defaultOn={true}  />
          <Toggle label="Language Detection" desc="Auto-detect and route by language" defaultOn={true}  />
          <Toggle label="PII Scrubbing"      desc="Remove personal identifiers"       defaultOn={true}  />
          <Toggle label="Sentiment Analysis" desc="Auto-score on ingestion"           defaultOn={false} />
          <Toggle label="Alert Triggers"     desc="Fire alerts on sentiment spikes"   defaultOn={true}  />
        </div>

        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Error Log</div>
            <span className="panel-action">CLEAR</span>
          </div>
          {[
            { msg:'Rate limit hit — API',   code:'429 TOO MANY REQUESTS', time:'14:23:11' },
            { msg:'Timeout — Scraper',      code:'504 GATEWAY TIMEOUT',   time:'13:41:07' },
            { msg:'Schema mismatch — feed', code:'PARSE ERROR',           time:'12:09:55' },
          ].map((e, i) => (
            <div key={i} style={{ padding:'10px 12px', border:'1px solid rgba(255,140,0,0.2)', background:'rgba(255,140,0,0.04)', marginBottom:8 }}>
              <div style={{ fontSize:12, marginBottom:3 }}>{e.msg}</div>
              <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--muted)' }}>
                {e.code} · {e.time}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}