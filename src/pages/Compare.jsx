import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { loadProducts } from "../services/productService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const Compare = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    loadProducts().then((data) => {
      setProducts(data);
    });
  }, []);


  const toggleProduct = (product) => {
    if (selected.find((p) => p.name === product.name)) {
      setSelected(
        selected.filter((p) => p.name !== product.name)
      );
    } else if (selected.length < 2) {
      setSelected([...selected, product]);
    }
  };

  const comparisonData =
    selected.length === 2
      ? [
          {
            name: selected[0].name,
            rating: Number(selected[0].rating),
            sentiment: selected[0].sentiment,
          },
          {
            name: selected[1].name,
            rating: Number(selected[1].rating),
            sentiment: selected[1].sentiment,
          },
        ]
      : [];
      let aiRecommendation = null;

if (selected.length === 2) {
  const p1 = selected[0];
  const p2 = selected[1];

  const score1 = Number(p1.rating) * 0.6 + p1.sentiment * 0.4;
  const score2 = Number(p2.rating) * 0.6 + p2.sentiment * 0.4;

  if (score1 > score2) {
    aiRecommendation = {
      winner: p1.name,
      difference: (score1 - score2).toFixed(2),
    };
  } else if (score2 > score1) {
    aiRecommendation = {
      winner: p2.name,
      difference: (score2 - score1).toFixed(2),
    };
  } else {
    aiRecommendation = null;
  }
}


  return (
    <DashboardLayout>
      <div className="p-6">

        <h2 className="text-2xl font-bold mb-6">
          Compare Products
        </h2>

        {/* Product Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {products.map((product) => (
            <div
              key={product.name}
              onClick={() => toggleProduct(product)}
              className={`p-4 rounded-lg cursor-pointer transition ${
                selected.find(
                  (p) => p.name === product.name
                )
                  ? "bg-blue-600"
                  : "bg-slate-800"
              }`}
            >
              {product.name}
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        {selected.length === 2 && (
          <div className="space-y-10">

            {/* Rating Comparison */}
            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">
                Rating Comparison
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="rating" fill="#facc15" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sentiment Comparison */}
            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">
                Sentiment Comparison
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="sentiment" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {aiRecommendation && (
  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl shadow-lg">
    <h3 className="text-xl font-bold mb-3">
      🤖 AI Recommendation
    </h3>

    <p className="text-sm leading-relaxed">
      Based on combined rating and sentiment analysis,
      <span className="font-semibold">
        {" "}{aiRecommendation.winner}
      </span>
      {" "}outperforms the alternative by
      {" "}{aiRecommendation.difference}% in overall
      performance score.
    </p>

    <p className="mt-2 text-sm opacity-80">
      Recommended Choice:{" "}
      <span className="font-bold">
        {aiRecommendation.winner}
      </span>
    </p>
  </div>
)}


          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Compare;
