import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ForecastChart = () => {
  const data = [
    { month: "Jun", forecast: 65, upper: 72, lower: 58 },
    { month: "Jul", forecast: 70, upper: 78, lower: 62 },
    { month: "Aug", forecast: 75, upper: 84, lower: 66 },
    { month: "Sep", forecast: 80, upper: 90, lower: 70 },
  ];

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">
        AI Forecast with Confidence Interval
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#3b82f6"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="upper"
            stroke="#22c55e"
            strokeDasharray="5 5"
          />

          <Line
            type="monotone"
            dataKey="lower"
            stroke="#ef4444"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
