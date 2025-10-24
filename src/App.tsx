import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            🌍 Wenda
          </h1>
          <p className="text-gray-600 mt-1">Smart Tourism Platform in Angola</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Wenda
          </h2>
          <p className="text-gray-600 mb-6">
            Administrative interface for government and tourism operators — displays charts, forecasts, interactive maps, and reports.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">📊 Analytics</h3>
              <p className="text-sm text-gray-600">
                Real-time tourism data and insights
              </p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">🗺️ Maps</h3>
              <p className="text-sm text-gray-600">
                Interactive geographic visualization
              </p>
            </div>
            
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">📈 Forecasts</h3>
              <p className="text-sm text-gray-600">
                Predictive models and trends
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 pb-8 text-center text-gray-500 text-sm">
        <p>Wenda - Boosting tourism in Angola 🇦🇴</p>
      </footer>
    </div>
  )
}

export default App
