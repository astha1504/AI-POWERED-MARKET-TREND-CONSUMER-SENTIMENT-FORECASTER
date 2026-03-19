import { useState, useEffect } from 'react';
import { analyzeSentiment } from '../utils/api';
import { DS } from '../data/dataset';

const POS_WORDS = ['good','great','excellent','love','fast','amazing','awesome',
  'perfect','best','happy','easy','nice','works','fantastic','wonderful'];
const NEG_WORDS = ['bad','poor','worst','slow','hate','broken','terrible',
  'awful','disappointed','useless','waste','cheap','horrible','frustrating','problem'];

export default function SentimentAnalysis() {
  const [status,  setStatus]  = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [running, setRunning] = useState(false);

  const fetchData = async (reanalyze = false) => {
    setLoading(true);
    setError(false);

    try {
      // Only run analysis if explicitly requested
      if (reanalyze) {
        setRunning(true);
        const res = await analyzeSentiment();
        if (res?.message) setStatus(res);
        setRunning(false);
      }

      // Always fetch existing results
      const r = await fetch('http://localhost:8000/sentiment/results?limit=200');
      const d = await r.json();
      if (Array.isArray(d) && d.length > 0) setReviews(d);
      else setError(true);

    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRunning(false);
    }
  };

  // On mount — just fetch, don't re-analyze
  useEffect(() => { fetchData(false); }, []);
  const calcStats = () => {
    if (reviews.length === 0) return null;
    const pos   = reviews.filter((r) => r.sentiment === 'positive').length;
    const neg   = reviews.filter((r) => r.sentiment === 'negative').length;
    const neu   = reviews.length - pos - neg;
    const total = reviews.length;
    const avgSc = (reviews.reduce((s, r) => s + (r.score ?? 0), 0) / total).toFixed(2);
    return {
      pos_pct: Math.round(pos / total * 100),
      neg_pct: Math.round(neg / total * 100),
      neu_pct: Math.round(neu / total * 100),
      total, avgSc,
    };
  };

  const buildProducts = () => {
    if (reviews.length === 0) return DS.products.slice(0, 6);
    const map = {};
    reviews.forEach((r) => {
      const key = r.product;
      if (!map[key]) map[key] = { name: key, pos: 0, neg: 0, total: 0, scoreSum: 0 };
      map[key].total++;
      map[key].scoreSum += r.score ?? 0;
      if (r.sentiment === 'positive')      map[key].pos++;
      else if (r.sentiment === 'negative') map[key].neg++;
    });
    return Object.values(map)
      .map((p) => ({
        name:  p.name,
        count: p.total,
        pos:   Math.round(p.pos / p.total * 100),
        neg:   Math.round(p.neg / p.total * 100),
        avg:   (p.scoreSum / p.total).toFixed(2),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  };

  const stats    = calcStats();
  const posP     = stats?.pos_pct ?? DS.pos_pct;
  const negP     = stats?.neg_pct ?? DS.neg_pct;
  const neuP     = stats?.neu_pct ?? DS.neu_pct;
  const total    = stats?.total   ?? DS.total;
  const avgSc    = stats?.avgSc   ?? '0.42';
  const products = buildProducts();
  const recentReviews = reviews.slice(0, 10);

  return (
    <div>
      {loading && (
        <div style={{ padding:'12px 16px', background:'rgba(200,255,0,0.06)', border:'1px solid rgba(200,255,0,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)', letterSpacing:1 }}>
          <span className="pulse-dot" />
          {running ? ' RUNNING KEYWORD SENTIMENT MODEL...' : ' FETCHING RESULTS FROM MongoDB...'}
        </div>
      )}
      {error && (
        <div style={{ padding:'12px 16px', background:'rgba(255,45,85,0.06)', border:'1px solid rgba(255,45,85,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--blood)', letterSpacing:1 }}>
          ⚠ BACKEND OFFLINE — SHOWING DATASET VALUES · Run: uvicorn app.main:app --reload
        </div>
      )}
      {status && !loading && (
        <div style={{ padding:'12px 16px', background:'rgba(200,255,0,0.06)', border:'1px solid rgba(200,255,0,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)', letterSpacing:1 }}>
          ✓ {status.message?.toUpperCase()} · {total} reviews scored · keyword model
        </div>
      )}

      <div className="kpi-grid">
        <div className="kpi-card positive">
          <div className="kpi-label">😊 Positive</div>
          <div className="kpi-val" style={{ color:'var(--acid)' }}>{posP}%</div>
          <div className="kpi-change up">↑ score &gt; 0</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">😐 Neutral</div>
          <div className="kpi-val">{neuP}%</div>
          <div className="kpi-change" style={{ color:'var(--electric)' }}>→ score = 0</div>
        </div>
        <div className="kpi-card negative">
          <div className="kpi-label">😠 Negative</div>
          <div className="kpi-val" style={{ color:'var(--blood)' }}>{negP}%</div>
          <div className="kpi-change down">↓ score &lt; 0</div>
        </div>
        <div className="kpi-card positive">
          <div className="kpi-label">🎯 Avg Score</div>
          <div className="kpi-val">{avgSc}</div>
          <div className="kpi-change up">↑ {total} reviews</div>
        </div>
      </div>

      <div className="dash-grid-2b">
        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Sentiment by Product</div>
            <span className="panel-action" onClick={fetchData}>
              {loading ? 'RUNNING...' : 'RE-ANALYZE'}
            </span>
          </div>
          {products.map((p, i) => {
            const color = p.pos >= 80 ? 'var(--acid)' : p.pos >= 60 ? 'var(--orange)' : 'var(--blood)';
            return (
              <div key={i} style={{ marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:6 }}>
                  <span>{(p.name || '').slice(0, 34)}</span>
                  <span style={{ fontFamily:'Space Mono,monospace', color }}>{p.pos}%</span>
                </div>
                <div style={{ height:8, background:'var(--glass-border)' }}>
                  <div style={{ width:`${p.pos}%`, height:'100%', background:color, transition:'width 1s ease' }} />
                </div>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--muted)', marginTop:3 }}>
                  {p.count} reviews · avg score {p.avg}
                </div>
              </div>
            );
          })}
        </div>

        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Keyword Score Distribution</div>
            <div className="panel-meta">KEYWORD MODEL</div>
          </div>
          {[
            { label:'😊 Positive', pct: posP, color:'var(--acid)',     desc:'Contains positive keywords' },
            { label:'😐 Neutral',  pct: neuP, color:'var(--electric)', desc:'No keyword matches' },
            { label:'😠 Negative', pct: negP, color:'var(--blood)',    desc:'Contains negative keywords' },
          ].map((s) => (
            <div key={s.label} style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                <span>{s.label}</span>
                <span style={{ fontFamily:'Space Mono,monospace', color:s.color }}>{s.pct}%</span>
              </div>
              <div style={{ height:8, background:'var(--glass-border)', marginBottom:3 }}>
                <div style={{ width:`${s.pct}%`, height:'100%', background:s.color, transition:'width 1s ease' }} />
              </div>
              <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--muted)', letterSpacing:1 }}>{s.desc}</div>
            </div>
          ))}

          <div style={{ marginTop:16, padding:14, border:'1px solid var(--glass-border)', background:'rgba(255,255,255,0.02)' }}>
            <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--muted)', letterSpacing:1, marginBottom:10 }}>MODEL KEYWORDS</div>
            <div style={{ marginBottom:10 }}>
              <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--acid)', letterSpacing:1, marginBottom:6 }}>POSITIVE WORDS</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                {POS_WORDS.map((w) => (
                  <span key={w} style={{ fontFamily:'Space Mono,monospace', fontSize:9, padding:'3px 8px', border:'1px solid rgba(200,255,0,0.3)', color:'var(--acid)', letterSpacing:1 }}>{w}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--blood)', letterSpacing:1, marginBottom:6 }}>NEGATIVE WORDS</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                {NEG_WORDS.map((w) => (
                  <span key={w} style={{ fontFamily:'Space Mono,monospace', fontSize:9, padding:'3px 8px', border:'1px solid rgba(255,45,85,0.3)', color:'var(--blood)', letterSpacing:1 }}>{w}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {recentReviews.length > 0 && (
        <div className="dash-panel" style={{ marginBottom:16 }}>
          <div className="panel-header">
            <div className="panel-title">Scored Reviews — Live from MongoDB</div>
            <div className="panel-meta">sentiment_results COLLECTION · {reviews.length} TOTAL</div>
          </div>
          <table className="trend-table">
            <thead>
              <tr><th>Product</th><th>Review Excerpt</th><th>Rating</th><th>Score</th><th>Sentiment</th></tr>
            </thead>
            <tbody>
              {recentReviews.map((r, i) => {
                const isPos = r.sentiment === 'positive';
                const isNeg = r.sentiment === 'negative';
                const color = isPos ? 'var(--acid)' : isNeg ? 'var(--blood)' : 'var(--electric)';
                const tag   = isPos ? 'rising' : isNeg ? 'falling' : 'stable';
                return (
                  <tr key={i}>
                    <td style={{ fontSize:12, maxWidth:140, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.product}</td>
                    <td style={{ fontSize:11, color:'var(--muted)', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{(r.review || '').slice(0, 80)}...</td>
                    <td style={{ fontFamily:'Space Mono,monospace', fontSize:12 }}>{r.rating}★</td>
                    <td style={{ fontFamily:'Space Mono,monospace', fontSize:12, color }}>{r.score > 0 ? `+${r.score}` : r.score}</td>
                    <td><span className={`trend-tag ${tag}`}>{(r.sentiment || 'neutral').toUpperCase()}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="dash-panel">
        <div className="panel-header">
          <div className="panel-title">Aspect-Based Sentiment</div>
          <div className="panel-meta">DATASET ANALYSIS</div>
        </div>
        <table className="trend-table">
          <thead>
            <tr><th>Aspect</th><th>Positive</th><th>Neutral</th><th>Negative</th><th>Volume</th><th>Trend</th></tr>
          </thead>
          <tbody>
            {[
              { aspect:'Product Quality',  pos:'81%', neu:'12%', neg:'7%',  vol:'441K', tag:'rising'  },
              { aspect:'Ease of Use',      pos:'76%', neu:'15%', neg:'9%',  vol:'312K', tag:'rising'  },
              { aspect:'Battery Life',     pos:'68%', neu:'18%', neg:'14%', vol:'198K', tag:'stable'  },
              { aspect:'Value for Money',  pos:'64%', neu:'20%', neg:'16%', vol:'287K', tag:'stable'  },
              { aspect:'Customer Support', pos:'43%', neu:'22%', neg:'35%', vol:'109K', tag:'falling' },
            ].map((a) => (
              <tr key={a.aspect}>
                <td>{a.aspect}</td>
                <td style={{ color:'var(--acid)',     fontFamily:'Space Mono,monospace', fontSize:12 }}>{a.pos}</td>
                <td style={{ color:'var(--electric)', fontFamily:'Space Mono,monospace', fontSize:12 }}>{a.neu}</td>
                <td style={{ color:'var(--blood)',    fontFamily:'Space Mono,monospace', fontSize:12 }}>{a.neg}</td>
                <td style={{ fontFamily:'Space Mono,monospace', fontSize:12 }}>{a.vol}</td>
                <td><span className={`trend-tag ${a.tag}`}>{a.tag.toUpperCase()}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}