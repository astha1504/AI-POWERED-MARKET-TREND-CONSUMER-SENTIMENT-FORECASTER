const SECTION_META = {
  overview:  ['Intelligence Overview',       'LIVE · LAST UPDATED 4 SECONDS AGO'],
  livefeed:  ['Live Feed',                   'STREAMING · 997 REAL REVIEWS'],
  sentiment: ['Sentiment Analysis',          'LLM MODEL · MULTI-CLASS · 997 REVIEWS'],
  trends:    ['Trend Forecasting',           'TOP PRODUCTS BY REVIEW VOLUME'],
  topics:    ['Topic Explorer',             'REAL PRODUCT CLUSTERS'],
  rag:       ['RAG Intelligence Query',      'LANGCHAIN · PINECONE · GPT-4'],
  sources:   ['Data Sources',               'AMAZON REVIEWS DATASET · 997 ENTRIES'],
  reports:   ['Reports & Exports',           '148 REPORTS THIS MONTH'],
  alerts:    ['Alert Center',               '3 ACTIVE · 2 CRITICAL'],
  config:    ['Configuration',              'SETTINGS & PREFERENCES'],
};

export default function Topbar({ section, onExit }) {
  const [title, sub] = SECTION_META[section] || ['Dashboard', ''];

  return (
    <div className="dash-topbar">

      <div className="dash-topbar-left">
        <div className="dash-page-title">{title}</div>
        <div className="dash-page-sub">
          <span className="pulse-dot" />
          {sub}
        </div>
      </div>

      <div className="dash-topbar-right">
        <input
          className="dash-search"
          type="text"
          placeholder="Search topics, brands..."
        />
        <div className="dash-notif">
          🔔
          <div className="notif-badge" />
        </div>
        <div
          className="dash-notif"
          onClick={onExit}
          style={{
            fontSize: 13,
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
          }}
        >
          EXIT
        </div>
      </div>

    </div>
  );
}