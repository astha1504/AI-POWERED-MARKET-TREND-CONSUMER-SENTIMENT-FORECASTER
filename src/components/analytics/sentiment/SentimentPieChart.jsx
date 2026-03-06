import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SentimentPieChart = ({ sentiment }) => {
  const positive = sentiment;
  const negative = 100 - sentiment;

  const data = [
    { name: "Positive", value: positive },
    { name: "Negative", value: negative },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">
        Sentiment Distribution
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentPieChart;
