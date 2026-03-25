export default function KpiCard({
  label,
  value,
  change,
  changeType = 'up',
  variant = 'positive',
  valueColor,
}) {
  return (
    <div className={`kpi-card ${variant}`}>

      <div className="kpi-label">{label}</div>

      <div
        className="kpi-val"
        style={valueColor ? { color: valueColor } : {}}
      >
        {value}
      </div>

      {change && (
        <div className={`kpi-change ${changeType}`}>
          {change}
        </div>
      )}

    </div>
  );
}