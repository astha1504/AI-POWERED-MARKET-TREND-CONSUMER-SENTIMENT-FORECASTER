import Papa from "papaparse";

/**
 * Load reviews from public/reviews.csv
 * Returns Promise<Array>
 */
export const loadReviews = async () => {
  return new Promise((resolve, reject) => {
    Papa.parse("/reviews.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
