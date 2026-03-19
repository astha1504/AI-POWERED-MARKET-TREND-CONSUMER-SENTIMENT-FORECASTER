export default function LandingPage({ onNav }) {

  const features = [
    { num:'01', icon:'🕸️', name:'Data Collection & Scraping',  desc:'Multi-channel ingestion via Scrapy/APIs from social media, reviews, and global news. Cleaned and normalized in real time.', tags:['Scrapy','REST APIs','ETL'] },
    { num:'02', icon:'🧠', name:'LLM Sentiment Engine',         desc:'Fine-grained scoring via Llama/GPT with emotion detection, aspect analysis and sarcasm handling across 40+ languages.',    tags:['LLaMA','GPT-4','BERTopic'] },
    { num:'03', icon:'🔍', name:'RAG Pipeline',                 desc:'LangChain + Pinecone vector search for contextual consumer insights. Query your full data corpus conversationally.',          tags:['LangChain','Pinecone','RAG'] },
    { num:'04', icon:'📊', name:'Trend Analytics Dashboard',    desc:'Interactive dashboards with sentiment timelines, brand comparisons, and topic clusters.',                                     tags:['Plotly','React','D3.js'] },
    { num:'05', icon:'🔔', name:'Alerts & Spike Detection',     desc:'ML anomaly detection fires instant alerts on sentiment spikes or trend shifts. Custom thresholds per channel.',               tags:['Webhooks','Slack','Anomaly ML'] },
    { num:'06', icon:'📄', name:'Report Generation',            desc:'One-click PDF and CSV exports with AI-written summaries. Schedule automated reports to any stakeholder inbox.',               tags:['PDF','CSV','Scheduled'] },
  ];

  const ticker = [
    { label:'POSITIVE SENTIMENT', val:'84.7%', cls:'up' },
    { label:'REVIEWS INGESTED',   val:'997',   cls:'' },
    { label:'TOP PRODUCT',        val:'Amazon Tap 92%', cls:'up' },
    { label:'AVG RATING',         val:'4.36★', cls:'' },
    { label:'NEGATIVE SENTIMENT', val:'7.4%',  cls:'down' },
    { label:'CLUSTERS',           val:'5 BERTopic', cls:'' },
    { label:'KEYWORDS',           val:'40 terms', cls:'' },
    { label:'ACCURACY',           val:'98.2%', cls:'up' },
  ];

  const doubled = [...ticker, ...ticker];

  const scrollTo = (id) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div id="landing">

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div style={{ position:'relative', zIndex:2 }}>
          <div className="hero-label fade-up">AI Consumer Intelligence Platform</div>
          <h1 className="fade-up delay-1">
            Decode<br />Market<br /><em>Signals</em><br />
            <span className="accent">Instantly.</span>
          </h1>
          <p className="hero-desc fade-up delay-2">
            NEXUS aggregates millions of social posts, product reviews, and news
            to deliver real-time consumer sentiment and trend intelligence powered
            by LLMs and RAG pipelines.
          </p>
          <div className="hero-actions fade-up delay-3">
            <a href="#" className="btn-primary btn-large" onClick={(e) => { e.preventDefault(); onNav('signup'); }}>
              Start Free Trial
            </a>
            <a href="#" className="btn-ghost btn-large" onClick={(e) => { e.preventDefault(); scrollTo('features-section'); }}>
              Explore Features
            </a>
          </div>
          <div className="hero-stat-row fade-up delay-4">
            <div>
              <div className="hero-stat-num">12<span>M+</span></div>
              <div className="hero-stat-label">Data Points / Day</div>
            </div>
            <div>
              <div className="hero-stat-num">98<span>%</span></div>
              <div className="hero-stat-label">Sentiment Accuracy</div>
            </div>
            <div>
              <div className="hero-stat-num">4<span>ms</span></div>
              <div className="hero-stat-label">Avg. Latency</div>
            </div>
          </div>
        </div>

        <div className="hero-visual fade-up delay-2">
          <div className="hero-card hero-card-main">
            <div className="card-title">Live Sentiment Analysis</div>
            <div className="sentiment-bar s-positive">
              <div className="s-label"><span>Positive</span><span>84.7%</span></div>
              <div className="s-track"><div className="s-fill" style={{ width:'84.7%' }} /></div>
            </div>
            <div className="sentiment-bar s-neutral">
              <div className="s-label"><span>Neutral</span><span>7.9%</span></div>
              <div className="s-track"><div className="s-fill" style={{ width:'7.9%' }} /></div>
            </div>
            <div className="sentiment-bar s-negative">
              <div className="s-label"><span>Negative</span><span>7.4%</span></div>
              <div className="s-track"><div className="s-fill" style={{ width:'7.4%' }} /></div>
            </div>
            <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:8 }}>
              <span className="pulse-dot" />
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'var(--muted)', letterSpacing:1 }}>
                PROCESSING 997 REVIEWS
              </span>
            </div>
          </div>

          <div className="hero-card" style={{ top:40, right:0, width:200, background:'rgba(200,255,0,0.06)', borderColor:'rgba(200,255,0,0.2)' }}>
            <div className="card-title">Top Product</div>
            <div className="card-trend-num">92%</div>
            <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>Amazon Tap positive</div>
          </div>

          <div className="hero-card" style={{ bottom:60, right:0, width:220, borderColor:'rgba(0,229,255,0.2)', background:'rgba(0,229,255,0.04)' }}>
            <div style={{ display:'flex', alignItems:'center' }}>
              <span className="pulse-dot" />
              <span className="live-tag">LIVE FEED</span>
            </div>
            <div className="live-value">
              997
              <span style={{ fontSize:14, color:'var(--muted)', fontFamily:'DM Sans', fontWeight:400 }}>
                {' '}reviews
              </span>
            </div>
            <div className="mini-chart">
              {[40,55,35,70,50,85,65,100].map((h, i) => (
                <div key={i} className="mini-bar" style={{ height:`${h}%` }} />
              ))}
            </div>
          </div>

          <div className="hero-card" style={{ top:40, left:0, width:180 }}>
            <div className="card-title">Hot Topics</div>
            <span className="topic-tag hot">alexa</span>
            <span className="topic-tag hot">echo</span>
            <span className="topic-tag">screen</span>
            <span className="topic-tag hot">sound</span>
            <span className="topic-tag">read</span>
          </div>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker">
          {doubled.map((t, i) => (
            <div key={i} className="ticker-item">
              {t.label}&nbsp;
              <span className={`val ${t.cls}`}>{t.val}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="features-section">
        <div className="section-label">Platform Capabilities</div>
        <h2 className="section-title">Everything you need to understand your market.</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.num} className="feature-card">
              <div className="feature-card-top">
                <div className="feature-icon">{f.icon}</div>
                <span className="feature-num">{f.num}</span>
              </div>
              <div className="feature-name">{f.name}</div>
              <div className="feature-desc">{f.desc}</div>
              <div className="feature-tags">
                {f.tags.map((t) => <span key={t} className="ftag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about-section">
        <div className="about-visual">
          <div className="about-card">
            <div className="card-title" style={{ marginBottom:8 }}>Intelligence Pipeline</div>
            {[
              ['01','🌐','Ingest',    'Scrapy · APIs · Webhooks'],
              ['02','🧹','Normalize', 'Clean · Schema · Dedupe'],
              ['03','🔬','Analyze',   'LLM · BERTopic · Scoring'],
              ['04','📦','Vectorize', 'Pinecone · LangChain'],
              ['05','📡','Deliver',   'Dashboard · Alerts · Reports'],
            ].map(([n,icon,name,desc]) => (
              <div key={n} className="pipeline-step">
                <span className="step-num">{n}</span>
                <span className="step-icon">{icon}</span>
                <div>
                  <div className="step-name">{name}</div>
                  <div className="step-desc">{desc}</div>
                </div>
                <span className="step-status">ACTIVE</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-content">
          <div className="section-label">About NEXUS</div>
          <h2 className="section-title">Built for teams that move at the speed of culture.</h2>
          <p className="about-text">
            NEXUS was built to solve a fundamental problem: consumer opinions move faster
            than traditional research cycles. We built an AI-native platform that processes
            millions of data points continuously.
          </p>
          <p className="about-text">
            From FMCG giants tracking regional sentiment shifts, to e-commerce brands
            monitoring post-launch feedback, to agencies building real-time campaign intelligence.
          </p>
          <div className="about-metrics">
            {[
              ['500+','Enterprise clients globally'],
              ['40+', 'Languages supported'],
              ['99.9%','Platform uptime SLA'],
              ['4ms', 'Average API latency'],
            ].map(([v,l]) => (
              <div key={l} className="metric-box">
                <div className="metric-val">{v}</div>
                <div className="metric-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="footer">
        <div className="footer-brand">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); onNav('landing'); }}>
            NEX<span>US</span>
          </a>
          <p className="footer-tagline">
            AI-powered market intelligence for teams that demand real-time consumer clarity.
          </p>
        </div>
        {[
          { title:'Product', links:['Features','Pricing','API Docs','Changelog'] },
          { title:'Company', links:['About','Blog','Careers','Press'] },
          { title:'Legal',   links:['Privacy','Terms','Security'] },
        ].map((col) => (
          <div key={col.title}>
            <div className="footer-col-title">{col.title}</div>
            <ul className="footer-links">
              {col.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </footer>

      <div className="footer-bottom">
        <p>© 2025 NEXUS INTELLIGENCE INC. — ALL RIGHTS RESERVED</p>
        <p>LLM · RAG · VECTOR SEARCH</p>
      </div>

    </div>
  );
}