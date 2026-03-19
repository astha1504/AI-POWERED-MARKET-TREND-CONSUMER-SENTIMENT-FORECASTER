export default function Sidebar({ activeSection, onSection, user, getDisplayName, getInitials }) {

  const NAV = [
    {
      group: 'Overview',
      items: [
        { id: 'overview', icon: '⬡', label: 'Dashboard' },
        { id: 'livefeed', icon: '📡', label: 'Live Feed', badge: 'NEW' },
      ],
    },
    {
      group: 'Intelligence',
      items: [
        { id: 'sentiment', icon: '💬', label: 'Sentiment Analysis' },
        { id: 'trends',    icon: '📈', label: 'Trend Forecasting' },
        { id: 'topics',    icon: '🔍', label: 'Topic Explorer' },
        { id: 'rag',       icon: '🤖', label: 'RAG Query' },
      ],
    },
    {
      group: 'Data',
      items: [
        { id: 'sources',  icon: '🌐', label: 'Data Sources' },
        { id: 'reports',  icon: '📊', label: 'Reports' },
        { id: 'alerts',   icon: '🔔', label: 'Alerts', badge: '3' },
      ],
    },
    {
      group: 'Settings',
      items: [
        { id: 'config', icon: '⚙️', label: 'Configuration' },
      ],
    },
  ];

  return (
    <div className="dash-sidebar">

      <div className="dash-logo">
        NEX<span>US</span>
      </div>

      {NAV.map((group) => (
        <div className="dash-nav-group" key={group.group}>
          <div className="dash-nav-label">{group.group}</div>
          {group.items.map((item) => (
            <div
              key={item.id}
              className={`dash-nav-item${activeSection === item.id ? ' active' : ''}`}
              onClick={() => onSection(item.id)}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="dash-nav-badge">{item.badge}</span>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="dash-user">
        <div className="dash-avatar">{getInitials()}</div>
        <div>
          <div className="dash-user-name">{getDisplayName()}</div>
          <div className="dash-user-role">
            {(user?.role || 'Analyst').toUpperCase()} · PRO
          </div>
        </div>
      </div>

    </div>
  );
}