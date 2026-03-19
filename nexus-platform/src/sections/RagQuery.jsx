import { useState } from 'react';

const SUGGESTED = [
  'What are the top complaints?',
  'Which product has best sentiment?',
  'Show negative review trends',
  'Summarize Kindle feedback',
  'What do users say about sound quality?',
  'Which product has worst reviews?',
  'What are customers happy about?',
  'Compare Echo vs Kindle reviews',
  'What are common issues with charging?',
  'Show me 5 star review themes',
];

const INITIAL_MSG = {
  role: 'ai',
  text: 'Ask me anything about your review dataset. I can surface trends, summarize sentiment, compare products, and identify key themes across all 997 ingested reviews.',
  sources: null,
};

export default function RagQuery() {
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const send = async (text) => {
    const query = (text || input).trim();
    if (!query) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: query }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/rag/query', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      const answer =
        data.answer ??
        data.response ??
        data.result ??
        data.context ??
        (typeof data === 'string' ? data : JSON.stringify(data));

      setMessages((prev) => [
        ...prev,
        {
          role:    'ai',
          text:    answer,
          sources: data.sources_used ?? data.num_sources ?? data.chunks ?? null,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: err.message.includes('fetch')
            ? '⚠ Backend offline — run: uvicorn app.main:app --reload'
            : `⚠ Error: ${err.message}`,
          sources: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([INITIAL_MSG]);

  return (
    <div>
      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card positive">
          <div className="kpi-label">🔗 Vector Store</div>
          <div className="kpi-val" style={{ color: 'var(--acid)' }}>FAISS</div>
          <div className="kpi-change up">↑ Connected</div>
        </div>
        <div className="kpi-card neutral">
          <div className="kpi-label">📚 Indexed Docs</div>
          <div className="kpi-val">997</div>
          <div className="kpi-change" style={{ color: 'var(--electric)' }}>Reviews</div>
        </div>
        <div className="kpi-card positive">
          <div className="kpi-label">🧠 LLM</div>
          <div className="kpi-val" style={{ fontSize: 14 }}>LangChain</div>
          <div className="kpi-change up">↑ RAG Pipeline</div>
        </div>
        <div className="kpi-card warning">
          <div className="kpi-label">⚡ Embeddings</div>
          <div className="kpi-val" style={{ fontSize: 13 }}>MiniLM</div>
          <div className="kpi-change up">↑ all-MiniLM-L6-v2</div>
        </div>
      </div>

      <div className="dash-panel">
        <div className="panel-header">
          <div className="panel-title">RAG Query Interface</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="panel-meta">
              <span className="pulse-dot" />
              LANGCHAIN · FAISS · VECTOR SEARCH
            </div>
            <span className="panel-action" onClick={clearChat}>CLEAR</span>
          </div>
        </div>

        <div className="rag-chips">
          {SUGGESTED.map((s) => (
            <span
              key={s}
              className="rag-chip"
              onClick={() => !loading && send(s)}
              style={{ opacity: loading ? 0.5 : 1 }}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="rag-messages">
          {messages.map((m, i) => (
            <div key={i} className={`rag-msg ${m.role}`}>
              {m.role === 'ai' && (
                <div className="rag-ai-header">
                  <span className="pulse-dot" />
                  NEXUS RAG · LANGCHAIN + FAISS
                </div>
              )}
              <div className={m.role === 'ai' ? 'rag-ai-text' : ''} style={{ fontSize: 13 }}>
                {m.text}
              </div>
              {m.role === 'ai' && m.sources != null && (
                <div className="rag-ai-footer">
                  {m.sources} SOURCE CHUNKS RETRIEVED
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="rag-msg ai">
              <div className="rag-ai-header">
                <span className="pulse-dot" />
                NEXUS RAG · SEARCHING...
              </div>
              <div className="rag-ai-text">
                Querying vector store and retrieving relevant reviews...
              </div>
            </div>
          )}
        </div>

        <div className="rag-input-row">
          <input
            className="form-input"
            placeholder="Ask anything about your reviews..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && send()}
            disabled={loading}
            style={{ flex: 1 }}
          />
          <button
            className="btn-primary"
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{ padding: '0 24px', height: 48, opacity: loading || !input.trim() ? 0.5 : 1 }}
          >
            {loading ? '...' : 'ASK'}
          </button>
        </div>
      </div>
    </div>
  );
}