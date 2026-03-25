const BASE_URL = "http://127.0.0.1:8000";

async function request(method, path, body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);
    const res  = await fetch(`${BASE_URL}${path}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`API Error [${method} ${path}]:`, err);
    return null;
  }
}

// GET /alerts/
// Returns: [ { product, message, severity } ]
export async function getAlerts() {
  return await request('GET', '/alerts/');
}

// POST /data/upload
// Returns: { message: "..." }
export async function uploadData() {
  return await request('POST', '/data/upload');
}

// GET /data/reviews?limit=20
// Returns: [ { product, review, rating } ]
export async function getReviews(limit = 20) {
  return await request('GET', `/data/reviews?limit=${limit}`);
}

// GET /trend/
// Returns: [ { _id: "Product Name", count: 42 } ]
// Only NEGATIVE products sorted by count desc
export async function getTrends() {
  return await request('GET', '/trend/');
}

// POST /sentiment/analyze
// Runs keyword scoring on all reviews in MongoDB
// Stores results in sentiment_results collection
// Returns: { message: "Sentiment analysis completed" }
// Then call getReviews() to get actual scored data
export async function analyzeSentiment() {
  return await request('POST', '/sentiment/analyze');
}

// GET /data/reviews — fetch scored results after analysis
// Returns: [ { product, review, rating, sentiment, score } ]
export async function getSentimentResults(limit = 100) {
  return await request('GET', `/sentiment/results?limit=${limit}`);
}
// GET /trend/ — reused for topic explorer
// Component falls back to local CLUSTERS if response has no .topics key
export async function getTopics() {
  return await request('GET', '/trend/');
}