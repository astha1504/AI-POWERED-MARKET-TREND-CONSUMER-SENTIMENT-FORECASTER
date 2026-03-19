import { useState } from 'react';
import Toggle from '../components/ui/Toggle';

export default function Configuration({ user, getDisplayName, getInitials }) {
  const [confVal, setConfVal] = useState(80);
  const [topkVal, setTopkVal] = useState(10);
  const [accentColor, setAccentColor] = useState('#c8ff00');

  const changeColor = (color) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--acid', color);
  };

  return (
    <div>

      <div className="dash-grid-2b">

        <div>
          <div className="dash-panel" style={{ marginBottom:16 }}>
            <div className="panel-header"><div className="panel-title">Model Configuration</div></div>

            <div className="config-group">
              <div className="config-group-title">LLM Settings</div>
              <div className="config-row">
                <div><div className="config-label">Sentiment Model</div><div className="config-desc">Primary model for scoring</div></div>
                <select className="form-input config-input" style={{ padding:'8px 12px', fontSize:12 }}>
                  <option>GPT-4 Turbo</option><option>LLaMA 3.1 70B</option><option>Claude 3 Sonnet</option>
                </select>
              </div>
              <div className="config-row">
                <div><div className="config-label">Topic Model</div><div className="config-desc">Clustering and extraction</div></div>
                <select className="form-input config-input" style={{ padding:'8px 12px', fontSize:12 }}>
                  <option>BERTopic</option><option>LDA</option><option>NMF</option>
                </select>
              </div>
              <div className="config-row">
                <div><div className="config-label">Confidence Threshold</div><div className="config-desc">Minimum score to include</div></div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <input type="range" className="range-input" min="50" max="99" value={confVal} onChange={(e) => setConfVal(e.target.value)} />
                  <span style={{ fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)' }}>{confVal}%</span>
                </div>
              </div>
            </div>

            <div className="config-group">
              <div className="config-group-title">RAG Pipeline</div>
              <div className="config-row">
                <div><div className="config-label">Vector DB</div><div className="config-desc">Embedding storage backend</div></div>
                <select className="form-input config-input" style={{ padding:'8px 12px', fontSize:12 }}>
                  <option>Pinecone</option><option>Weaviate</option><option>Qdrant</option>
                </select>
              </div>
              <div className="config-row">
                <div><div className="config-label">Embedding Model</div><div className="config-desc">For vectorization</div></div>
                <select className="form-input config-input" style={{ padding:'8px 12px', fontSize:12 }}>
                  <option>text-embedding-3-large</option><option>BGE-M3</option><option>E5-Large</option>
                </select>
              </div>
              <div className="config-row">
                <div><div className="config-label">Top-K Retrieval</div><div className="config-desc">Docs retrieved per query</div></div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <input type="range" className="range-input" min="3" max="20" value={topkVal} onChange={(e) => setTopkVal(e.target.value)} />
                  <span style={{ fontFamily:'Space Mono,monospace', fontSize:11, color:'var(--acid)' }}>{topkVal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="dash-panel" style={{ marginBottom:16 }}>
            <div className="panel-header"><div className="panel-title">Notifications & Integrations</div></div>
            <div className="config-group">
              <div className="config-group-title">Notification Channels</div>
              <Toggle label="Slack Integration" desc="Post alerts to #nexus-alerts" defaultOn={true}  />
              <Toggle label="Email Digest"      desc="Daily summary to team"         defaultOn={true}  />
              <Toggle label="PagerDuty"         desc="Critical-only escalation"      defaultOn={false} />
              <div className="config-row">
                <div><div className="config-label">Webhook Endpoint</div><div className="config-desc">Custom HTTP webhook</div></div>
                <input type="text" className="form-input config-input" style={{ padding:'8px 12px', fontSize:12 }} placeholder="https://your-endpoint.com" />
              </div>
            </div>
            <div className="config-group">
              <div className="config-group-title">Dashboard Preferences</div>
              <div className="config-row">
                <div><div className="config-label">Accent Color</div><div className="config-desc">UI highlight color</div></div>
                <div className="color-pick">
                  {['#c8ff00','#00e5ff','#ff2d55','#a855f7'].map((c) => (
                    <div
                      key={c}
                      className={`color-swatch${accentColor === c ? ' selected' : ''}`}
                      style={{ background:c }}
                      onClick={() => changeColor(c)}
                    />
                  ))}
                </div>
              </div>
              <div className="config-row">
                <div><div className="config-label">Auto-refresh Rate</div><div className="config-desc">Dashboard update interval</div></div>
                <select className="form-input config-input" style={{ padding:'8px 12px', fontSize:12 }}>
                  <option>5 seconds</option><option selected>10 seconds</option><option>30 seconds</option><option>1 minute</option>
                </select>
              </div>
            </div>
          </div>

          <div className="dash-panel">
            <div className="panel-header"><div className="panel-title">Account & Team</div></div>
            <div style={{ display:'flex', alignItems:'center', gap:16, padding:16, border:'1px solid var(--glass-border)', marginBottom:12 }}>
              <div className="dash-avatar" style={{ width:48, height:48, fontSize:18 }}>
                {getInitials ? getInitials() : 'U'}
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:500 }}>{getDisplayName ? getDisplayName() : 'User'}</div>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'var(--muted)', marginTop:2 }}>
                  {user?.email || 'user@nexus.ai'} · PRO PLAN
                </div>
              </div>
              <span className="panel-action" style={{ marginLeft:'auto' }}>EDIT PROFILE</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button className="btn-ghost" style={{ flex:1, padding:10, fontSize:11 }}>INVITE TEAM</button>
              <button className="btn-ghost" style={{ flex:1, padding:10, fontSize:11 }}>MANAGE PLAN</button>
              <button className="btn-ghost" style={{ flex:1, padding:10, fontSize:11, color:'var(--blood)', borderColor:'rgba(255,45,85,0.2)' }}>SIGN OUT</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}