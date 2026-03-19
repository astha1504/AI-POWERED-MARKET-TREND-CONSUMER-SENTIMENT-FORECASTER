import { useState, useEffect, useRef } from 'react';
import { DS } from '../data/dataset';

export default function LiveFeed() {
  const [feed, setFeed] = useState([]);
  const idxRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = DS.feed[idxRef.current % DS.feed.length];
      idxRef.current++;
      const stars = '★'.repeat(Math.round(d.rating)) + '☆'.repeat(5 - Math.round(d.rating));
      const scoreMap = { pos: '+0.87', neg: '-0.74', neu: '±0.11' };
      setFeed((prev) => [{ ...d, stars, score: scoreMap[d.s], id: Date.now() }, ...prev].slice(0, 12));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      <div className="kpi-grid">
        <div className="kpi-card positive">
          <div className="kpi-label">📥 Total Reviews</div>
          <div className="kpi-val" style={{ color:'var(--acid)' }}>{DS.total}</div>
          <div className="kpi-change up">↑ Dataset loaded</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">😊 Positive</div>
          <div className="kpi-val">{DS.pos_pct}%</div>
          <div className="kpi-change up">↑ Strong</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">😐 Neutral</div>
          <div className="kpi-val">{DS.neu_pct}%</div>
          <div className="kpi-change" style={{ color:'var(--electric)' }}>→ Stable</div>
        </div>
        <div className="kpi-card negative">
          <div className="kpi-label">😠 Negative</div>
          <div className="kpi-val" style={{ color:'var(--blood)' }}>{DS.neg_pct}%</div>
          <div className="kpi-change down">↓ Monitor</div>
        </div>
      </div>

      <div className="dash-grid-2b">
        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Real-Time Review Stream</div>
            <div className="panel-meta"><span className="pulse-dot" />STREAMING LIVE</div>
          </div>
          <div style={{ maxHeight:460, overflowY:'auto' }}>
            {feed.length === 0 && (
              <div style={{ padding:40, textAlign:'center', fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--muted)', letterSpacing:1 }}>
                LOADING FEED...
              </div>
            )}
            {feed.map((item) => (
              <div key={item.id} className={`feed-item ${item.s}`}>
                <div className="feed-source-icon">⭐</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--muted)', letterSpacing:1, marginBottom:4 }}>
                    {item.prod.slice(0, 40).toUpperCase()}
                  </div>
                  <div className="feed-text">
                    {item.text.slice(0, 160)}{item.text.length > 160 ? '...' : ''}
                  </div>
                  <div className="feed-meta" style={{ marginTop:6 }}>
                    <span className={`feed-score ${item.s}`}>{item.score}</span>
                    <span style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'var(--acid)' }}>{item.stars}</span>
                    <span className="feed-time">JUST NOW</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">Sentiment Breakdown</div>
            <div className="panel-meta">REAL DATA</div>
          </div>
          {[
            { label:'Positive', pct: DS.pos_pct, color:'var(--acid)' },
            { label:'Neutral',  pct: DS.neu_pct, color:'var(--electric)' },
            { label:'Negative', pct: DS.neg_pct, color:'var(--blood)' },
          ].map((s) => (
            <div key={s.label} style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:6 }}>
                <span>{s.label}</span>
                <span style={{ fontFamily:'Space Mono,monospace', color:s.color }}>{s.pct}%</span>
              </div>
              <div style={{ height:8, background:'var(--glass-border)' }}>
                <div style={{ width:`${s.pct}%`, height:'100%', background:s.color }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop:32 }}>
            <div className="panel-title" style={{ marginBottom:12, fontSize:13 }}>Top Products by Volume</div>
            {DS.products.slice(0, 4).map((p, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'var(--muted)', width:20 }}>{i + 1}</div>
                <div style={{ flex:1, fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'var(--acid)' }}>{p.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}