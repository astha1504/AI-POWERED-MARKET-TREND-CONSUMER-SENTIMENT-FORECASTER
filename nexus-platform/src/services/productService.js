import { loadReviews } from "./reviewService";

export const loadProducts = async () => {
  const reviews = await loadReviews();

  const productMap = {};

  reviews.forEach((r) => {
    const name = r.product;
    const rating = Number(r.rating);

    if (!productMap[name]) {
      productMap[name] = {
        name,
        ratings: [],
      };
    }

    productMap[name].ratings.push(rating);
  });

  const products = Object.values(productMap).map(
    (p, index) => {
      const avg =
        p.ratings.reduce((a, b) => a + b, 0) /
        p.ratings.length;

      const sentiment =
        (p.ratings.filter((r) => r >= 4).length /
          p.ratings.length) *
        100;

      return {
        id: index + 1,
        name: p.name,
        rating: avg.toFixed(1),
        sentiment: Math.round(sentiment),
      };
    }
  );

  return products;
};
