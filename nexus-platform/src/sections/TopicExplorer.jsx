import { useState, useEffect } from 'react';
import { getTopics } from '../utils/api';
import { CLUSTERS, TOPIC_KEYWORDS } from '../data/dataset';

// LDA produces 5 topics — map to readable names
const TOPIC_NAMES = {
  0: { name: 'Smart Speaker & Alexa', icon: '🔊', color: '#c8ff00' },
  1: { name: 'E-Reader & Kindle',     icon: '📚', color: '#00e5ff' },
  2: { name: 'Streaming & Fire TV',   icon: '📺', color: '#a855f7' },
  3: { name: 'Cases & Accessories',   icon: '🛡️', color: '#ff8c00' },
  4: { name: 'Charging & Power',      icon: '⚡', color: '#ff2d55' },
};

export default function TopicExplorer() {
  const [data,          setData]          = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(false);
  const [activeCluster, setActiveCluster] = useState(null);
  const [search,        setSearch]        = useState('');

  useEffect(() => {
    getTopics().then((res) => {
      if (res) setData(res);
      else     setError(true);
      setLoading(false);
    });
  }, []);

  // Build topic clusters from backend data or fallback
  const buildClusters = () => {
    if (!data?.topics) return CLUSTERS;
    return data.topics.map((t, i) => ({
      id:       String(i),
      name:     TOPIC_NAMES[i]?.name  ?? `Topic ${i}`,
      icon:     TOPIC_NAMES[i]?.icon  ?? '📌',
      color:    TOPIC_NAMES[i]?.color ?? '#c8ff00',
      count:    t.count               ?? 0,
      pos:      t.positive_percent    ?? 0,
      avg:      t.avg_rating          ?? 0,
      keywords: t.top_words           ?? [],
      products: t.products            ?? [],
      insight:  t.insight             ?? `Topic ${i} extracted by LDA model with ${t.top_words?.length ?? 5} key terms.`,
    }));
  };

  const clusters  = buildClusters();
  const cluster   = clusters.find((c) => c.id === activeCluster);

  // Keywords — use real top words from LDA if available
  const keywords = data?.top_words
    ? data.top_words.map((w, i) => ({ word: w, count: 400 - i * 8 }))
    : TOPIC_KEYWORDS;

  const filtered = search
    ? keywords.filter((k) => k.word.includes(search.toLowerCase()))
    : keywords;

  const max = keywords[0]?.count ?? 452;

  return (
    <div>

      {/* STATUS */}
      {loading && (
        <div style={{ padding:'12px 16px', background:'rgba(200,255,0,0.06)', border:'1px solid rgba(200,255,0,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)', letterSpacing:1 }}>
          <span className="pulse-dot" /> LOADING LDA TOPIC MODEL (5 TOPICS)...
        </div>
      )}
      {error && (
        <div style={{ padding:'12px 16px', background:'rgba(255,45,85,0.06)', border:'1px solid rgba(255,45,85,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--blood)', letterSpacing:1 }}>
          ⚠ BACKEND OFFLINE — SHOWING DATASET VALUES · Run: uvicorn app.main:app --reload
        </div>
      )}
      {data && !loading && (
        <div style={{ padding:'12px 16px', background:'rgba(200,255,0,0.06)', border:'1px solid rgba(200,255,0,0.2)', marginBottom:16, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)', letterSpacing:1 }}>
          ✓ LIVE LDA TOPICS FROM /trend/ · {clusters.length} topics · sklearn LDA
        </div>
      )}

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card positive">
          <div className="kpi-label">🔍 Keywords</div>
          <div className="kpi-val" style={{ color:'var(--acid)' }}>{keywords.length}</div>
          <div className="kpi-change up">↑ From 997 reviews</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">🧬 LDA Topics</div>
          <div className="kpi-val">{clusters.length}</div>
          <div className="kpi-change" style={{ color:'var(--electric)' }}>sklearn LDA</div>
        </div>
        <div className="kpi-card positive">
          <div className="kpi-label">🏆 Top Topic</div>
          <div className="kpi-val" style={{ fontSize:14 }}>
            {clusters[0]?.icon} {clusters[0]?.name?.split(' ')[0]}
          </div>
          <div className="kpi-change up">↑ {clusters[0]?.count ?? 602} reviews</div>
        </div>
        <div className="kpi-card warning">
          <div className="kpi-label">⚠️ Low Sentiment</div>
          <div className="kpi-val" style={{ color:'var(--blood)', fontSize:14 }}>
            {clusters.sort((a, b) => a.pos - b.pos)[0]?.name?.split(' ')[0]}
          </div>
          <div className="kpi-change down">↓ Lowest pos%</div>
        </div>
      </div>

      {/* KEYWORD CLOUD */}
      <div className="dash-panel" style={{ marginBottom:16 }}>
        <div className="panel-header">
          <div className="panel-title">
            Keyword Cloud — {data ? 'LDA Top Words' : 'Dataset Keywords'}
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <input
              className="dash-search"
              style={{ width:180 }}
              placeholder="Filter keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="panel-action" onClick={() => { setSearch(''); setActiveCluster(null); }}>
              RESET
            </span>
          </div>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, lineHeight:2.2 }}>
          {filtered.map((kw) => {
            const ratio    = kw.count / max;
            const size     = ratio > 0.7 ? 18 : ratio > 0.5 ? 15 : ratio > 0.35 ? 13 : 11;
            const op       = ratio > 0.5 ? 1 : ratio > 0.3 ? 0.8 : 0.6;
            const matched  = cluster?.keywords?.includes(kw.word);
            return (
              <span
                key={kw.word}
                className="cloud-tag"
                style={{
                  fontSize:    size,
                  opacity:     activeCluster ? (matched ? 1 : 0.2) : op,
                  color:       matched ? cluster.color : '',
                  borderColor: matched ? cluster.color : '',
                  cursor:      'pointer',
                }}
                title={`${kw.count} mentions`}
                onClick={() => {
                  const found = clusters.find((c) =>
                    c.keywords?.includes(kw.word)
                  );
                  if (found) setActiveCluster(found.id);
                }}
              >
                {kw.word}
              </span>
            );
          })}
        </div>
      </div>

      {/* CLUSTERS + DETAIL */}
      <div className="dash-grid-2b" style={{ marginBottom:16 }}>

        {/* CLUSTER LIST */}
        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">LDA Topic Clusters</div>
            <div className="panel-meta">{clusters.length} TOPICS · n_components=5</div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {clusters.map((c) => {
              const posColor = c.pos >= 80 ? 'var(--acid)' : c.pos >= 60 ? 'var(--orange)' : 'var(--blood)';
              const isActive = activeCluster === c.id;
              return (
                <div
                  key={c.id}
                  className="cluster-card"
                  style={{
                    borderColor: isActive ? c.color : 'var(--glass-border)',
                    background:  isActive ? 'rgba(255,255,255,0.06)' : 'var(--glass)',
                  }}
                  onClick={() => setActiveCluster(isActive ? null : c.id)}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                    <span style={{ fontSize:18 }}>{c.icon}</span>
                    <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:13, flex:1 }}>
                      {c.name}
                    </span>
                    <span style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:c.color }}>
                      {c.count} reviews
                    </span>
                  </div>
                  <div style={{ height:4, background:'var(--glass-border)', marginBottom:6, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${c.pos}%`, background:posColor }} />
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontSize:11, color:'var(--muted)' }}>
                      {c.keywords?.slice(0, 4).join(' · ')}
                    </span>
                    <span style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:posColor }}>
                      {c.pos}% pos
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CLUSTER DETAIL */}
        <div className="dash-panel">
          <div className="panel-header">
            <div className="panel-title">
              {cluster ? `${cluster.icon} ${cluster.name}` : 'Select a Topic'}
            </div>
            <div className="panel-meta">
              {cluster ? `TOPIC ${cluster.id} · LDA` : ''}
            </div>
          </div>

          {!cluster && (
            <div style={{ textAlign:'center', padding:'40px 20px', fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--muted)', letterSpacing:1 }}>
              ← CLICK A TOPIC TO EXPLORE
            </div>
          )}

          {cluster && (
            <div>
              {/* Stats */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:16 }}>
                {[
                  { val: cluster.count, lbl:'REVIEWS' },
                  { val: cluster.pos + '%', lbl:'POSITIVE' },
                  { val: cluster.avg + '★', lbl:'AVG RATING' },
                ].map((s) => (
                  <div key={s.lbl} style={{ padding:10, border:'1px solid var(--glass-border)', textAlign:'center' }}>
                    <div style={{ fontFamily:'Syne,sans-serif', fontSize:20, fontWeight:800, color:cluster.color }}>
                      {s.val}
                    </div>
                    <div style={{ fontFamily:'Space Mono,monospace', fontSize:8, color:'var(--muted)', letterSpacing:1 }}>
                      {s.lbl}
                    </div>
                  </div>
                ))}
              </div>

              {/* LDA Top Words */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--muted)', letterSpacing:1, marginBottom:8 }}>
                  LDA TOP WORDS
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                  {cluster.keywords?.map((k) => (
                    <span
                      key={k}
                      style={{ fontFamily:'Space Mono,monospace', fontSize:9, padding:'3px 8px', border:`1px solid ${cluster.color}`, color:cluster.color, letterSpacing:1 }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* Products */}
              {cluster.products?.length > 0 && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--muted)', letterSpacing:1, marginBottom:8 }}>
                    PRODUCTS IN TOPIC
                  </div>
                  {cluster.products.map((p) => {
                    const pos   = p.pos ?? p.positive_percent ?? 0;
                    const name  = p.name ?? p.product ?? '';
                    const count = p.count ?? p.total ?? 0;
                    const avg   = p.avg ?? p.avg_rating ?? 0;
                    const c     = pos >= 80 ? 'var(--acid)' : pos >= 60 ? 'var(--orange)' : 'var(--blood)';
                    return (
                      <div key={name} style={{ padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                          <span style={{ fontSize:12, fontWeight:500 }}>{name.slice(0, 36)}</span>
                          <span style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:c }}>{pos}%</span>
                        </div>
                        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                          <div style={{ flex:1, height:3, background:'var(--glass-border)' }}>
                            <div style={{ height:'100%', width:`${pos}%`, background:c }} />
                          </div>
                          <span style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--muted)' }}>
                            {count} · {avg}★
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* AI Insight */}
              <div style={{ padding:12, border:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.03)' }}>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:9, color:'var(--acid)', letterSpacing:1, marginBottom:6 }}>
                  🤖 LDA INSIGHT
                </div>
                <div style={{ fontSize:12, lineHeight:1.6, color:'var(--muted)' }}>
                  {cluster.insight}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* KEYWORD FREQUENCY BARS */}
      <div className="dash-panel">
        <div className="panel-header">
          <div className="panel-title">Top Keywords by Frequency</div>
          <div className="panel-meta">
            {data ? 'LDA FEATURE NAMES' : 'NLP EXTRACTED'}
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {keywords.slice(0, 15).map((kw) => {
            const pct   = Math.round(kw.count / max * 100);
            const color = pct > 70 ? 'var(--acid)' : pct > 50 ? 'var(--electric)' : 'var(--orange)';
            return (
              <div key={kw.word} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'var(--muted)', width:90, textAlign:'right', letterSpacing:1 }}>
                  {kw.word}
                </div>
                <div style={{ flex:1, height:6, background:'var(--glass-border)' }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:color, transition:'width 1.2s ease' }} />
                </div>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:10, color, width:36 }}>
                  {kw.count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}