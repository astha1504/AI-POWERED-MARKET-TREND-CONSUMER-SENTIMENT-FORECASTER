import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">
          AI Market Forecaster
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 border border-gray-500 rounded-lg hover:bg-slate-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-20">

        <h2 className="text-5xl font-extrabold max-w-4xl leading-tight">
          AI-Powered Market Trend &
          <span className="text-blue-500"> Consumer Sentiment Forecasting</span>
        </h2>

        <p className="text-gray-400 mt-6 max-w-2xl text-lg">
          Analyze product trends, forecast demand, and understand consumer sentiment
          using advanced AI insights and real-time analytics.
        </p>

        <div className="flex gap-6 mt-10">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Free Trial
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 border border-gray-500 rounded-xl text-lg hover:bg-slate-700 transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-32 px-10 pb-20">

        <h3 className="text-3xl font-bold text-center mb-16">
          Powerful AI Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-4">
              📈 Trend Analysis
            </h4>
            <p className="text-gray-400">
              Monitor product performance trends with dynamic visualizations
              and real-time market insights.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-4">
              💬 Sentiment Intelligence
            </h4>
            <p className="text-gray-400">
              Analyze customer feedback across platforms using AI-powered
              sentiment detection.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-4">
              🔮 Demand Forecasting
            </h4>
            <p className="text-gray-400">
              Predict future demand and risk levels using machine learning
              based forecasting models.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-slate-700 text-gray-500">
        © 2026 AI Market Forecaster. All rights reserved.
      </div>

    </div>
  );
};

export default Landing;
