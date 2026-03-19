import { useState } from 'react';

export default function Toggle({ label, desc, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);

  return (
    <div className="toggle-row">

      <div>
        <div className="toggle-label">{label}</div>
        {desc && (
          <div className="toggle-desc">{desc}</div>
        )}
      </div>

      <div
        className={`toggle${on ? ' on' : ''}`}
        onClick={() => setOn(!on)}
      />

    </div>
  );
}