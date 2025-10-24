import { useState } from "react";
import { FaChartBar, FaUsers, FaVideo, FaMapMarkerAlt, FaClock, FaArrowUp, FaDownload, FaFilter } from "react-icons/fa";
import { useI18n } from "../../i18n/useI18n";

interface RegionalStats {
  province: string;
  farmers: number;
  activeUsers: number;
  videoViews: number;
  avgWatchTime: string;
  topCategory: string;
  growthRate: number;
  lastActivity: string;
}

const regionalData: RegionalStats[] = [
  {
    province: "Luanda",
    farmers: 1250,
    activeUsers: 892,
    videoViews: 2340,
    avgWatchTime: "8:45",
    topCategory: "Irrigação",
    growthRate: 15.2,
    lastActivity: "2 horas atrás"
  },
  {
    province: "Benguela",
    farmers: 2100,
    activeUsers: 1680,
    videoViews: 3850,
    avgWatchTime: "12:30",
    topCategory: "Agricultura",
    growthRate: 22.8,
    lastActivity: "1 hora atrás"
  },
  {
    province: "Huambo",
    farmers: 3200,
    activeUsers: 2560,
    videoViews: 4120,
    avgWatchTime: "10:15",
    topCategory: "Solos",
    growthRate: 18.5,
    lastActivity: "30 min atrás"
  },
  {
    province: "Malanje",
    farmers: 1800,
    activeUsers: 1260,
    videoViews: 2980,
    avgWatchTime: "9:20",
    topCategory: "Meteorologia",
    growthRate: 12.3,
    lastActivity: "45 min atrás"
  },
  {
    province: "Huíla",
    farmers: 2800,
    activeUsers: 2240,
    videoViews: 4250,
    avgWatchTime: "11:50",
    topCategory: "Proteção",
    growthRate: 25.7,
    lastActivity: "1 hora atrás"
  },
  {
    province: "Bié",
    farmers: 1950,
    activeUsers: 1365,
    videoViews: 3120,
    avgWatchTime: "9:45",
    topCategory: "Irrigação",
    growthRate: 16.4,
    lastActivity: "3 horas atrás"
  },
  {
    province: "Cuanza Sul",
    farmers: 1650,
    activeUsers: 1155,
    videoViews: 2650,
    avgWatchTime: "8:30",
    topCategory: "Agricultura",
    growthRate: 14.1,
    lastActivity: "2 horas atrás"
  },
  {
    province: "Lunda Norte",
    farmers: 980,
    activeUsers: 686,
    videoViews: 1890,
    avgWatchTime: "7:15",
    topCategory: "Solos",
    growthRate: 8.9,
    lastActivity: "4 horas atrás"
  }
];

const timeRanges = ["24h", "7d", "30d", "90d"];

export default function RegionalStats() {
  const { t } = useI18n();
  
  const sortOptions = [
    { value: "farmers", label: t.ngo.regionalStats.sortOptions.farmers },
    { value: "activeUsers", label: t.ngo.regionalStats.sortOptions.activeUsers },
    { value: "videoViews", label: t.ngo.regionalStats.sortOptions.videoViews },
    { value: "growthRate", label: t.ngo.regionalStats.sortOptions.growthRate }
  ];
  
  const [timeRange, setTimeRange] = useState("30d");
  const [sortBy, setSortBy] = useState("farmers");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = regionalData
    .filter(item => 
      item.province.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof RegionalStats];
      const bValue = b[sortBy as keyof RegionalStats];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return bValue - aValue;
      }
      return 0;
    });

  const totalFarmers = regionalData.reduce((sum, item) => sum + item.farmers, 0);
  const totalActiveUsers = regionalData.reduce((sum, item) => sum + item.activeUsers, 0);
  const totalVideoViews = regionalData.reduce((sum, item) => sum + item.videoViews, 0);
  const avgGrowthRate = regionalData.reduce((sum, item) => sum + item.growthRate, 0) / regionalData.length;

  const getGrowthColor = (growth: number) => {
    if (growth > 20) return "text-green-600 bg-green-100";
    if (growth > 10) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getActivityColor = (activity: string) => {
    if (activity.includes("min")) return "text-green-600";
    if (activity.includes("1 hora") || activity.includes("2 horas")) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.ngo.regionalStats.title}
        </h1>
        <p className="text-gray-600">
          {t.ngo.regionalStats.subtitle}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{totalFarmers.toLocaleString()}</h3>
              <p className="text-gray-600">{t.ngo.regionalStats.summaryCards.totalFarmers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{totalActiveUsers.toLocaleString()}</h3>
              <p className="text-gray-600">{t.ngo.regionalStats.summaryCards.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaVideo className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{totalVideoViews.toLocaleString()}</h3>
              <p className="text-gray-600">{t.ngo.regionalStats.summaryCards.totalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <FaArrowUp className="text-orange-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{avgGrowthRate.toFixed(1)}%</h3>
              <p className="text-gray-600">{t.ngo.regionalStats.summaryCards.avgGrowth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <input
              type="text"
              placeholder={t.ngo.regionalStats.filters.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            {/* Time Range */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">{t.ngo.regionalStats.filters.period}</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                {timeRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      timeRange === range 
                        ? "bg-green-600 text-white" 
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {t.ngo.regionalStats.timeRanges[range as keyof typeof t.ngo.regionalStats.timeRanges]}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">{t.ngo.regionalStats.filters.sortBy}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <FaDownload className="mr-2" />
            {t.ngo.regionalStats.filters.exportData}
          </button>
        </div>
      </div>

      {/* Regional Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{t.ngo.regionalStats.tableTitle}</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.ngo.regionalStats.tableHeaders.province}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.ngo.regionalStats.tableHeaders.farmers}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.ngo.regionalStats.tableHeaders.activeUsers}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.ngo.regionalStats.tableHeaders.views}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.ngo.regionalStats.tableHeaders.avgTime}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.ngo.regionalStats.tableHeaders.topCategory}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.ngo.regionalStats.tableHeaders.growth}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.ngo.regionalStats.tableHeaders.lastActivity}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={item.province} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-green-600 mr-2" />
                      <div className="font-medium text-gray-900">{item.province}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.farmers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.activeUsers.toLocaleString()}
                    <div className="text-xs text-gray-500">
                      {((item.activeUsers / item.farmers) * 100).toFixed(1)}% {t.ngo.regionalStats.percentActive}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.videoViews.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <FaClock className="text-gray-400 mr-1" />
                      {item.avgWatchTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.topCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGrowthColor(item.growthRate)}`}>
                      +{item.growthRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getActivityColor(item.lastActivity)}>
                      {item.lastActivity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{t.ngo.regionalStats.charts.engagement.title}</h2>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FaChartBar className="text-6xl text-green-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{t.ngo.regionalStats.charts.engagement.subtitle}</h3>
                <p className="text-gray-500 text-sm">{t.ngo.regionalStats.charts.engagement.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Trends */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{t.ngo.regionalStats.charts.growth.title}</h2>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FaArrowUp className="text-6xl text-purple-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{t.ngo.regionalStats.charts.growth.subtitle}</h3>
                <p className="text-gray-500 text-sm">{t.ngo.regionalStats.charts.growth.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}