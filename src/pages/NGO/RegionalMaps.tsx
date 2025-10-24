import { useState } from "react";
import { FaMapMarkerAlt, FaThermometerHalf, FaCloudRain, FaLeaf, FaExclamationTriangle } from "react-icons/fa";
import { useI18n } from "../../i18n/useI18n";

const provinces = [
  { 
    name: "Luanda", 
    farmers: 1250, 
    temperature: "26°C", 
    rainfall: "85mm", 
    soilHealth: 78,
    alerts: 2,
    coordinates: { lat: -8.8390, lng: 13.2894 }
  },
  { 
    name: "Benguela", 
    farmers: 2100, 
    temperature: "24°C", 
    rainfall: "45mm", 
    soilHealth: 65,
    alerts: 1,
    coordinates: { lat: -12.5763, lng: 13.4055 }
  },
  { 
    name: "Huambo", 
    farmers: 3200, 
    temperature: "22°C", 
    rainfall: "120mm", 
    soilHealth: 82,
    alerts: 0,
    coordinates: { lat: -12.7756, lng: 15.7394 }
  },
  { 
    name: "Malanje", 
    farmers: 1800, 
    temperature: "25°C", 
    rainfall: "95mm", 
    soilHealth: 71,
    alerts: 1,
    coordinates: { lat: -9.5402, lng: 16.3410 }
  },
  { 
    name: "Huíla", 
    farmers: 2800, 
    temperature: "23°C", 
    rainfall: "65mm", 
    soilHealth: 88,
    alerts: 0,
    coordinates: { lat: -14.9176, lng: 13.5659 }
  }
];

export default function RegionalMaps() {
  const { t } = useI18n();
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]);
  const [activeLayer, setActiveLayer] = useState("climate");

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-600 bg-green-100";
    if (health >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getActiveLayerTitle = () => {
    switch (activeLayer) {
      case "climate": return t.ngo.regionalMaps.layers.climate;
      case "soil": return t.ngo.regionalMaps.layers.soil;
      case "rainfall": return t.ngo.regionalMaps.layers.rainfall;
      case "alerts": return t.ngo.regionalMaps.layers.alerts;
      default: return t.ngo.regionalMaps.layers.climate;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.ngo.regionalMaps.title}
        </h1>
        <p className="text-gray-600">
          {t.ngo.regionalMaps.subtitle}
        </p>
      </div>

      {/* Layer Controls */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.ngo.regionalMaps.layers.title}</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "climate", name: t.ngo.regionalMaps.layers.climate, icon: <FaThermometerHalf /> },
            { id: "soil", name: t.ngo.regionalMaps.layers.soil, icon: <FaLeaf /> },
            { id: "rainfall", name: t.ngo.regionalMaps.layers.rainfall, icon: <FaCloudRain /> },
            { id: "alerts", name: t.ngo.regionalMaps.layers.alerts, icon: <FaExclamationTriangle /> }
          ].map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeLayer === layer.id 
                  ? "bg-green-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-2">{layer.icon}</span>
              {layer.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t.ngo.regionalMaps.interactiveMap.title} - {getActiveLayerTitle()}</h2>
            </div>
            
            {/* Placeholder for Interactive Map */}
            <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 p-8 flex items-center justify-center relative">
              <div className="text-center">
                <FaMapMarkerAlt className="text-6xl text-green-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{t.ngo.regionalMaps.interactiveMap.title}</h3>
                <p className="text-gray-500 mb-4">{t.ngo.regionalMaps.interactiveMap.description}</p>
                <p className="text-sm text-gray-400">{t.ngo.regionalMaps.interactiveMap.integration}</p>
              </div>
              
              {/* Sample Province Markers */}
              {provinces.map((province, index) => (
                <button
                  key={province.name}
                  onClick={() => setSelectedProvince(province)}
                  className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all ${
                    selectedProvince.name === province.name 
                      ? "bg-green-600 w-6 h-6" 
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + index * 10}%`
                  }}
                  title={province.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Province Details */}
        <div className="space-y-6">
          {/* Selected Province Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t.ngo.regionalMaps.provinceDetails.title}: {selectedProvince.name}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <FaThermometerHalf className="text-blue-600 mr-2" />
                  <span className="font-medium">{t.ngo.regionalMaps.provinceDetails.temperature}</span>
                </div>
                <span className="font-bold text-blue-600">{selectedProvince.temperature}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                <div className="flex items-center">
                  <FaCloudRain className="text-cyan-600 mr-2" />
                  <span className="font-medium">{t.ngo.regionalMaps.provinceDetails.rainfall}</span>
                </div>
                <span className="font-bold text-cyan-600">{selectedProvince.rainfall}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <FaLeaf className="text-green-600 mr-2" />
                  <span className="font-medium">{t.ngo.regionalMaps.provinceDetails.soilHealth}</span>
                </div>
                <span className={`font-bold px-2 py-1 rounded ${getHealthColor(selectedProvince.soilHealth)}`}>
                  {selectedProvince.soilHealth}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{t.ngo.regionalMaps.provinceDetails.activeFarmers}</span>
                <span className="font-bold text-gray-700">{selectedProvince.farmers.toLocaleString()}</span>
              </div>

              {selectedProvince.alerts > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <FaExclamationTriangle className="text-red-600 mr-2" />
                    <span className="font-medium text-red-700">{t.ngo.regionalMaps.provinceDetails.activeAlerts}</span>
                  </div>
                  <span className="font-bold text-red-600">{selectedProvince.alerts}</span>
                </div>
              )}
            </div>
          </div>

          {/* All Provinces Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.ngo.regionalMaps.nationalSummary}</h3>
            <div className="space-y-3">
              {provinces.map((province) => (
                <button
                  key={province.name}
                  onClick={() => setSelectedProvince(province)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedProvince.name === province.name 
                      ? "bg-green-100 border border-green-300" 
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{province.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{province.farmers}</span>
                      {province.alerts > 0 && (
                        <FaExclamationTriangle className="text-red-500 text-sm" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}