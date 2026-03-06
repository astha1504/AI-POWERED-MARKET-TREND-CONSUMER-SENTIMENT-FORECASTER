import { useEffect, useState } from "react";
import { loadReviews } from "../../../services/reviewService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RatingDistribution = ({ productName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadReviews().then((reviews) => {
      const filtered = reviews.filter(
        (r) => r.product === productName
      );

      const counts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      filtered.forEach((r) => {
        const rating = Math.round(r.rating);
        counts[rating]++;
      });

      const formatted = Object.keys(counts).map((key) => ({
        rating: `${key}⭐`,
        count: counts[key],
      }));

      setData(formatted);
    });
  }, [productName]);

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">
        Rating Distribution
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="rating" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingDistribution;
