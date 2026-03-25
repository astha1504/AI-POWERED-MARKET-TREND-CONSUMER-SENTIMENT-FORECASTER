import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-slate-800 p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 hover:shadow-blue-500/30 hover:shadow-xl transition duration-300"
    >
      <h3 className="text-xl font-semibold mb-2">
        {product.name}
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        {product.category}
      </p>

      <div className="flex justify-between items-center text-sm">
        <span className="text-yellow-400">
          ⭐ {product.rating}
        </span>

        <span
          className={`px-2 py-1 rounded text-xs ${
            product.sentiment > 70
              ? "bg-green-600"
              : "bg-orange-500"
          }`}
        >
          Sentiment: {product.sentiment}%
        </span>
      </div>

      <div className="mt-4 text-sm">
        Trend:{" "}
        <span
          className={
            product.trend === "up"
              ? "text-green-400"
              : "text-red-400"
          }
        >
          {product.trend === "up" ? "▲ Rising" : "▼ Falling"}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
