import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import MiniTrendChart from "../components/analytics/trend/MiniTrendChart";
import RatingDistribution from "../components/analytics/reviews/RatingDistribution";
import ReviewList from "../components/analytics/reviews/ReviewList";
import SentimentPieChart from "../components/analytics/sentiment/SentimentPieChart";
import { loadProducts } from "../services/productService";

const ProductDetail = () => {
  const { productName } = useParams();
  const decodedName = decodeURIComponent(productName);

  const [product, setProduct] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    loadProducts().then((products) => {
      const found = products.find(
        (p) => p.name === decodedName
      );
      setProduct(found);

      if (found) {
        const existing =
          JSON.parse(localStorage.getItem("watchlist")) || [];

        const exists = existing.find(
          (p) => p.name === found.name
        );

        setIsInWatchlist(!!exists);
      }
    });
  }, [decodedName]);

  const handleAddToWatchlist = () => {
    if (!product) return;

    const existing =
      JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!existing.find((p) => p.name === product.name)) {
      const updated = [...existing, product];
      localStorage.setItem(
        "watchlist",
        JSON.stringify(updated)
      );
      setIsInWatchlist(true);
    }
  };

  if (!product) {
    return (
      <DashboardLayout>
        <p className="text-red-500">
          Product not found
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 overflow-y-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">
            {product.name}
          </h2>

          <div className="flex gap-4 items-center mt-3 flex-wrap">
            <span className="text-yellow-400 text-lg">
              ⭐ {product.rating}
            </span>

            <span
              className={`px-3 py-1 rounded text-sm ${
                product.sentiment > 70
                  ? "bg-green-600"
                  : "bg-orange-500"
              }`}
            >
              Sentiment: {product.sentiment}%
            </span>

            {/* Watchlist Button */}
            <button
              onClick={handleAddToWatchlist}
              disabled={isInWatchlist}
              className={`ml-2 px-4 py-1 rounded-lg text-sm transition ${
                isInWatchlist
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isInWatchlist
                ? "Added ✔"
                : "Add to Watchlist"}
            </button>
          </div>
        </div>

        {/* Trend + Sentiment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <MiniTrendChart productName={product.name} />
          <SentimentPieChart sentiment={product.sentiment} />
        </div>

        {/* Rating + Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          <div className="md:col-span-1">
            <RatingDistribution productName={product.name} />
          </div>

          <div className="md:col-span-2">
            <ReviewList productName={product.name} />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default ProductDetail;
