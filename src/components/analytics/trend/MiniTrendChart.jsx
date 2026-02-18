import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { loadReviews } from "../../../services/reviewService";

const MiniTrendChart = ({ productName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadReviews().then((reviews) => {
      const filtered = reviews.filter(
        (r) => r.product === productName
      );

      if (filtered.length === 0) return;

      const chunkSize = Math.ceil(filtered.length / 5);

      const trendData = [];

      for (let i = 0; i < 5; i++) {
        const chunk = filtered.slice(
          i * chunkSize,
          (i + 1) * chunkSize
        );

        if (chunk.length === 0) continue;

        const avg =
          chunk.reduce(
            (sum, r) => sum + Number(r.rating),
            0
          ) / chunk.length;

        trendData.push({
          period: `P${i + 1}`,
          rating: avg.toFixed(2),
        });
      }

      setData(trendData);
    });
  }, [productName]);

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">
        Rating Trend (From Reviews)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="period" stroke="#94a3b8" />
          <YAxis domain={[0, 5]} stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniTrendChart;
