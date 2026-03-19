import { useEffect, useState } from "react";
import { loadReviews } from "../../../services/reviewService";

const ReviewList = ({ productName }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews().then((data) => {
      const filtered = data.filter(
        (r) => r.product === productName
      );
      setReviews(filtered.slice(0, 5)); // show first 5
    });
  }, [productName]);

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">
        Customer Reviews
      </h3>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-slate-700 pb-3">
            <div className="flex justify-between">
              <p className="font-semibold">
                User {index + 1}
              </p>
              <span className="text-yellow-400">
                {"⭐".repeat(Math.round(review.rating))}
              </span>
            </div>

            <p className="text-gray-400 mt-1 text-sm">
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
