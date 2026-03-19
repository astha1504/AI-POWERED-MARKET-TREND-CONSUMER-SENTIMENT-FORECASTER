import { useState } from 'react';
import { DS } from '../data/dataset';

export default function Reports() {
  const [reports, setReports] = useState([
    { icon:'📄', name:'Executive Summary — March 2025',       meta:'PDF · GENERATED 2 HRS AGO · 997 REVIEWS',    type:'executive', range:'March 2025'   },
    { icon:'📊', name:'Brand Comparison Report — Q1 2025',    meta:'PDF · GENERATED YESTERDAY · 997 REVIEWS',    type:'brand',     range:'Q1 2025'       },
    { icon:'📈', name:'Sentiment Deep-Dive — Last 30 Days',   meta:'PDF · GENERATED 3 DAYS AGO · 997 REVIEWS',   type:'sentiment', range:'Last 30 Days'  },
    { icon:'🗃️', name:'Raw Dataset Export — All 997 Reviews', meta:'CSV · GENERATED 5 DAYS AGO · FULL DATASET',  type:'csv',       range:'All Time'      },
  ]);

  const [rptType,   setRptType]   = useState('executive');
  const [rptRange,  setRptRange]  = useState('Last 30 days');
  const [rptFormat, setRptFormat] = useState('pdf');
  const [progress,  setProgress]  = useState(0);
  const [generating, setGenerating] = useState(false);
  const [dlCount,   setDlCount]   = useState(2400);

  const generate = () => {
    setGenerating(true);
    setProgress(0);
    const steps = [15, 40, 65, 88, 100];
    steps.forEach((p, i) => {
      setTimeout(() => {
        setProgress(p);
        if (p === 100) {
          setGenerating(false);
          const typeLabels = { executive:'Executive Summary', sentiment:'Sentiment Deep-Dive', trends:'Trend Analysis', brand:'Brand Comparison', csv:'Raw Data Export' };
          const icons = { executive:'📄', sentiment:'📈', trends:'📊', brand:'🏷️', csv:'🗃️' };
          const now = new Date();
          setReports((prev) => [{
            icon: icons[rptType],
            name: `${typeLabels[rptType]} — ${rptRange}`,
            meta: `${rptFormat.toUpperCase()} · GENERATED TODAY ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')} · ${DS.total} REVIEWS`,
            type: rptType,
            range: rptRange,
          }, ...prev]);
          setDlCount((c) => c + 1);
          if (rptFormat === 'csv') downloadCSV(rptType, rptRange);
          else downloadPDF(rptType, rptRange);
        }
      }, i * 500);
    });
  };

  const downloadCSV = (type, range) => {
    const rows = ['Product,Reviews,Avg Rating,Positive %,Negative %'];
    DS.products.forEach((p) => rows.push(`"${p.name}",${p.count},${p.avg},${p.pos}%,${p.neg}%`));
    rows.push('', `Total Reviews,${DS.total}`, `Positive,${DS.pos_pct}%`, `Neutral,${DS.neu_pct}%`, `Negative,${DS.neg_pct}%`, `Avg Rating,${DS.avg_rating}`, `Range,${range}`, `Generated,${new Date().toLocaleString()}`);
    const blob = new Blob([rows.join('\n')], { type:'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `NEXUS_${type}_${range.replace(/ /g,'_')}.csv`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const downloadPDF = (type, range) => {
    const typeLabels = { executive:'Executive Summary', sentiment:'Sentiment Deep-Dive', trends:'Trend Analysis', brand:'Brand Comparison', csv:'Raw Data Export' };
    const title = `${typeLabels[type] || type} — ${range}`;

    // Different content per report type
    const bodyContent = {
      executive: `
        <h2>Executive Summary</h2>
        <div class="ai">Based on <strong>${DS.total} consumer reviews</strong>, overall sentiment is <strong>strongly positive at ${DS.pos_pct}%</strong>. Average rating: <strong>${DS.avg_rating}★</strong>. Negative sentiment stands at ${DS.neg_pct}%. Recommendation: Prioritise support SLA and delivery transparency.</div>
        <h2>Top Products</h2>
        <table><thead><tr><th>#</th><th>Product</th><th>Reviews</th><th>Positive %</th><th>Avg Rating</th></tr></thead><tbody>
        ${DS.products.slice(0,8).map((p,i) => `<tr><td>${i+1}</td><td>${p.name}</td><td>${p.count}</td><td style="color:${p.pos>=80?'#16a34a':p.pos>=60?'#d97706':'#dc2626'};font-weight:700;">${p.pos}%</td><td>${p.avg}★</td></tr>`).join('')}
        </tbody></table>`,

      sentiment: `
        <h2>Sentiment Analysis</h2>
        <div class="ai">Detailed sentiment breakdown across ${DS.total} reviews. Positive: <strong>${DS.pos_pct}%</strong>, Neutral: <strong>${DS.neu_pct}%</strong>, Negative: <strong>${DS.neg_pct}%</strong>. Keyword model used: good, great, excellent, love, fast (positive) vs bad, poor, worst, slow, hate (negative).</div>
        <h2>Sentiment by Product</h2>
        <table><thead><tr><th>Product</th><th>Positive %</th><th>Negative %</th><th>Sentiment</th></tr></thead><tbody>
        ${DS.products.map(p => `<tr><td>${p.name}</td><td style="color:#16a34a;">${p.pos}%</td><td style="color:#dc2626;">${p.neg}%</td><td>${p.pos>=80?'✅ Positive':p.pos>=60?'⚠️ Mixed':'❌ Negative'}</td></tr>`).join('')}
        </tbody></table>`,

      trends: `
        <h2>Trend Analysis</h2>
        <div class="ai">Products with highest negative sentiment flagged for attention. Top concern: <strong>${DS.products.sort((a,b)=>b.neg-a.neg)[0]?.name}</strong> with ${DS.products.sort((a,b)=>b.neg-a.neg)[0]?.neg}% negative reviews. Monitor closely for sentiment spikes.</div>
        <h2>Negative Trend Leaders</h2>
        <table><thead><tr><th>Product</th><th>Negative %</th><th>Reviews</th><th>Severity</th></tr></thead><tbody>
        ${[...DS.products].sort((a,b)=>b.neg-a.neg).slice(0,10).map(p => `<tr><td>${p.name}</td><td style="color:#dc2626;font-weight:700;">${p.neg}%</td><td>${p.count}</td><td>${p.neg>=40?'🔴 HIGH':p.neg>=20?'🟠 MEDIUM':'🟢 LOW'}</td></tr>`).join('')}
        </tbody></table>`,

      brand: `
        <h2>Brand Comparison</h2>
        <div class="ai">Comparative analysis across ${DS.products.length} products. Best performer: <strong>${DS.products[0]?.name}</strong> (${DS.products[0]?.pos}% positive). Worst performer: <strong>${[...DS.products].sort((a,b)=>a.pos-b.pos)[0]?.name}</strong>.</div>
        <h2>Full Brand Scorecard</h2>
        <table><thead><tr><th>Product</th><th>Reviews</th><th>Positive</th><th>Negative</th><th>Rating</th><th>Grade</th></tr></thead><tbody>
        ${DS.products.map(p => `<tr><td>${p.name}</td><td>${p.count}</td><td style="color:#16a34a;">${p.pos}%</td><td style="color:#dc2626;">${p.neg}%</td><td>${p.avg}★</td><td>${p.pos>=80?'A':p.pos>=70?'B':p.pos>=60?'C':'D'}</td></tr>`).join('')}
        </tbody></table>`,

      csv: `
        <h2>Raw Data Export</h2>
        <div class="ai">Complete dataset export of all ${DS.total} reviews with sentiment scores, ratings, and product metadata. Use the CSV download for full row-level data.</div>
        <h2>Dataset Summary</h2>
        <table><thead><tr><th>#</th><th>Product</th><th>Reviews</th><th>Positive %</th><th>Avg Rating</th></tr></thead><tbody>
        ${DS.products.slice(0,8).map((p,i) => `<tr><td>${i+1}</td><td>${p.name}</td><td>${p.count}</td><td>${p.pos}%</td><td>${p.avg}★</td></tr>`).join('')}
        </tbody></table>`,
    };

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>NEXUS — ${title}</title>
<style>body{font-family:Arial,sans-serif;color:#1a1a1a;}.cover{background:#0a0a14;color:#fff;padding:48px;border-bottom:4px solid #c8ff00;-webkit-print-color-adjust:exact;print-color-adjust:exact;}.logo{font-size:32px;font-weight:900;color:#fff;}.logo span{color:#c8ff00;}.rt{font-size:22px;font-weight:700;color:#c8ff00;margin-top:8px;}.body{padding:32px 48px;}h2{font-size:15px;font-weight:800;border-bottom:2px solid #e5e7eb;padding-bottom:6px;margin:24px 0 12px;}table{width:100%;border-collapse:collapse;font-size:12px;}th{background:#f3f4f6;padding:8px 10px;text-align:left;font-size:10px;text-transform:uppercase;color:#6b7280;border-bottom:2px solid #e5e7eb;}td{padding:9px 10px;border-bottom:1px solid #f3f4f6;}.kr{display:flex;gap:12px;margin-top:20px;}.kb{flex:1;padding:14px;background:rgba(200,255,0,0.12);border-left:3px solid #c8ff00;}.kv{font-size:26px;font-weight:900;color:#c8ff00;}.kl{font-size:10px;color:#bbb;text-transform:uppercase;margin-top:2px;}.ai{background:#f9ffd9;border:2px solid #c8ff00;padding:20px;font-size:13px;line-height:1.8;margin-top:8px;}.footer{text-align:center;padding:16px;font-size:10px;color:#9ca3af;border-top:1px solid #e5e7eb;}</style>
</head><body>
<div class="cover"><div class="logo">NEX<span>US</span></div><div class="rt">${title}</div>
<div class="kr"><div class="kb"><div class="kv">${DS.total}</div><div class="kl">Total Reviews</div></div><div class="kb"><div class="kv">${DS.pos_pct}%</div><div class="kl">Positive</div></div><div class="kb"><div class="kv">${DS.avg_rating}★</div><div class="kl">Avg Rating</div></div><div class="kb"><div class="kv" style="color:#ef4444;">${DS.neg_pct}%</div><div class="kl">Negative</div></div></div></div>
<div class="body">${bodyContent[type] || bodyContent.executive}</div>
<div class="footer">NEXUS INTELLIGENCE · CONFIDENTIAL · ${new Date().toLocaleString()}</div>
<script>window.onload=function(){window.print();};<\/script></body></html>`;

    const win = window.open('','_blank');
    if (win) { win.document.write(html); win.document.close(); }
  };
  return (
    <div>

      <div className="kpi-grid">
        <div className="kpi-card positive">
          <div className="kpi-label">📄 Reports Generated</div>
          <div className="kpi-val" style={{ color:'var(--acid)' }}>{reports.length + 144}</div>
          <div className="kpi-change up">↑ This month</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">📅 Scheduled</div>
          <div className="kpi-val">12</div>
          <div className="kpi-change up">↑ Active</div>
        </div>
        <div className="kpi-card positive">
          <div className="kpi-label">📥 Downloads</div>
          <div className="kpi-val">{dlCount.toLocaleString()}</div>
          <div className="kpi-change up">↑ This week</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">📊 Dataset Rows</div>
          <div className="kpi-val">{DS.total}</div>
          <div className="kpi-change up">↑ Real data</div>
        </div>
      </div>

      <div className="dash-panel" style={{ marginBottom:16 }}>
        <div className="panel-header">
          <div className="panel-title">Generate New Report</div>
          {generating && (
            <div className="panel-meta" style={{ color:'var(--acid)' }}>GENERATING... {progress}%</div>
          )}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr auto', gap:12, alignItems:'end' }}>
          <div>
            <label className="form-label">Report Type</label>
            <select className="form-input" style={{ padding:'10px 12px', fontSize:13 }} value={rptType} onChange={(e) => setRptType(e.target.value)}>
              <option value="executive">Executive Summary</option>
              <option value="sentiment">Sentiment Deep-Dive</option>
              <option value="trends">Trend Analysis</option>
              <option value="brand">Brand Comparison</option>
              <option value="csv">Raw Data Export</option>
            </select>
          </div>
          <div>
            <label className="form-label">Date Range</label>
            <select className="form-input" style={{ padding:'10px 12px', fontSize:13 }} value={rptRange} onChange={(e) => setRptRange(e.target.value)}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last Quarter</option>
              <option>All Time</option>
            </select>
          </div>
          <div>
            <label className="form-label">Format</label>
            <select className="form-input" style={{ padding:'10px 12px', fontSize:13 }} value={rptFormat} onChange={(e) => setRptFormat(e.target.value)}>
              <option value="pdf">PDF Report</option>
              <option value="csv">CSV Raw Data</option>
            </select>
          </div>
          <button
            className="btn-primary"
            style={{ padding:'14px 24px', fontSize:11 }}
            onClick={generate}
            disabled={generating}
          >
            {generating ? `${progress}%` : 'GENERATE ↗'}
          </button>
        </div>
        {generating && (
          <div style={{ marginTop:16 }}>
            <div style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'var(--muted)', letterSpacing:1, marginBottom:8 }}>
              {progress < 40 ? 'LOADING DATASET...' : progress < 65 ? 'RUNNING SENTIMENT MODEL...' : progress < 88 ? 'BUILDING CHARTS...' : 'COMPILING REPORT...'}
            </div>
            <div style={{ height:3, background:'var(--glass-border)', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${progress}%`, background:'var(--acid)', transition:'width 0.4s ease' }} />
            </div>
          </div>
        )}
      </div>

      <div className="dash-panel" style={{ marginBottom:16 }}>
        <div className="panel-header">
          <div className="panel-title">Recent Reports</div>
          <span className="panel-action" onClick={() => setReports([])}>CLEAR ALL</span>
        </div>
        {reports.length === 0 && (
          <div style={{ textAlign:'center', padding:40, fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--muted)', letterSpacing:1 }}>
            NO REPORTS YET · GENERATE ONE ABOVE
          </div>
        )}
        <div className="report-list">
          {reports.map((r, i) => (
            <div key={i} className="report-item">
              <div className="report-icon">{r.icon}</div>
              <div style={{ flex:1 }}>
                <div className="report-name">{r.name}</div>
                <div className="report-meta">{r.meta}</div>
              </div>
              <div className="report-actions">
                <span className="report-btn primary-btn" onClick={() => downloadPDF(r.type, r.range)}>↓ PDF</span>
                <span className="report-btn" onClick={() => downloadCSV(r.type, r.range)}>↓ CSV</span>
                <span className="report-btn" onClick={() => { navigator.clipboard?.writeText(r.name); }}>SHARE</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}