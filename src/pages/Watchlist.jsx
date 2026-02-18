import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(stored);
  }, []);

  const removeItem = (name) => {
    const updated = watchlist.filter(
      (p) => p.name !== name
    );
    setWatchlist(updated);
    localStorage.setItem(
      "watchlist",
      JSON.stringify(updated)
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">

        <h2 className="text-2xl font-bold mb-6">
          My Watchlist
        </h2>

        {watchlist.length === 0 && (
          <p className="text-gray-400">
            No products saved yet.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {watchlist.map((product) => (
            <div
              key={product.name}
              className="bg-slate-800 p-6 rounded-2xl shadow-lg"
            >
              <h3 className="font-semibold text-lg">
                {product.name}
              </h3>

              <p className="text-yellow-400 mt-2">
                ⭐ {product.rating}
              </p>

              <p className="mt-2 text-sm">
                Sentiment: {product.sentiment}%
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    navigate(
                      `/product/${encodeURIComponent(product.name)}`
                    )
                  }
                  className="px-3 py-1 bg-blue-600 rounded"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    removeItem(product.name)
                  }
                  className="px-3 py-1 bg-red-600 rounded"
                >
                  Remove
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Watchlist;
