import { useState } from 'react';
import Sidebar   from '../components/dashboard/Sidebar';
import Topbar    from '../components/dashboard/Topbar';
import Overview          from '../sections/Overview';
import LiveFeed          from '../sections/LiveFeed';
import SentimentAnalysis from '../sections/SentimentAnalysis';
import TrendForecasting  from '../sections/TrendForecasting';
import TopicExplorer     from '../sections/TopicExplorer';
import RagQuery          from '../sections/RagQuery';
import DataSources       from '../sections/DataSources';
import Reports           from '../sections/Reports';
import Alerts            from '../sections/Alerts';
import Configuration     from '../sections/Configuration';

const SECTIONS = {
  overview:  <Overview />,
  livefeed:  <LiveFeed />,
  sentiment: <SentimentAnalysis />,
  trends:    <TrendForecasting />,
  topics:    <TopicExplorer />,
  rag:       <RagQuery />,
  sources:   <DataSources />,
  reports:   <Reports />,
  alerts:    <Alerts />,
  config:    <Configuration />,
};

export default function DashboardPage({ onNav, user, getDisplayName, getInitials }) {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="dash-layout">

      <Sidebar
        activeSection={activeSection}
        onSection={setActiveSection}
        user={user}
        getDisplayName={getDisplayName}
        getInitials={getInitials}
      />

      <div className="dash-main">
        <Topbar
          section={activeSection}
          onExit={() => onNav('landing')}
        />
        <div className="dash-content">
          {SECTIONS[activeSection]}
        </div>
      </div>

    </div>
  );
}