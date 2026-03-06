import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { loadProducts } from "../services/productService";
import { loadReviews } from "../services/reviewService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts().then((data) => {
      setProducts(data);
    });

    loadReviews().then((reviews) => {
      setTotalReviews(reviews.length);
    });
  }, []);

  const totalProducts = products.length;

  const avgSentiment =
    products.length > 0
      ? Math.round(
          products.reduce(
            (acc, p) => acc + p.sentiment,
            0
          ) / products.length
        )
      : 0;

  return (
    <DashboardLayout>
      <div className="p-6 overflow-y-auto">

        {/* Dashboard Overview */}
        <h2 className="text-2xl font-bold mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-gray-400 text-sm">
              Total Products
            </h3>
            <p className="text-2xl font-bold mt-2">
              {totalProducts}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-gray-400 text-sm">
              Average Sentiment
            </h3>
            <p className="text-2xl font-bold mt-2 text-green-400">
              {avgSentiment}%
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-gray-400 text-sm">
              Total Reviews
            </h3>
            <p className="text-2xl font-bold mt-2">
              {totalReviews}
            </p>
          </div>

        </div>

        {/* Products Section */}
        <h2 className="text-2xl font-bold mb-6">
          Products (From Scraped Data)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {products.map((product) => (
            <div
              key={product.id}
              onClick={() =>
                navigate(
                  `/product/${encodeURIComponent(product.name)}`
                )
              }
              className="bg-slate-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold">
                {product.name}
              </h3>

              <p className="text-yellow-400 mt-3">
                ⭐ {product.rating}
              </p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded text-sm ${
                  product.sentiment > 70
                    ? "bg-green-600"
                    : "bg-orange-500"
                }`}
              >
                Sentiment: {product.sentiment}%
              </span>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
