import Papa from "papaparse";
import api from "./api";

const normalizeReview = (raw) => ({
  product: raw.product || raw.Product || "Unknown Product",
  review:
    raw.review || raw.text || raw.comment || raw.Review || "",
  rating: Number(raw.rating || raw.Rating || 0),
});

const loadReviewsFromCsv = async () => {
  return new Promise((resolve, reject) => {
    Papa.parse("/reviews.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data.map(normalizeReview));
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

/**
 * Load reviews from backend (/data/reviews).
 * Falls back to public/reviews.csv if backend is unavailable
 * or has no loaded data yet.
 * Returns Promise<Array>
 */
export const loadReviews = async () => {
  try {
    const response = await api.get("/data/reviews");
    const reviews = Array.isArray(response.data)
      ? response.data.map(normalizeReview)
      : [];

    if (reviews.length > 0) {
      return reviews;
    }
  } catch {
    // Fallback handled below.
  }

  return loadReviewsFromCsv();
};
