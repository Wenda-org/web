import React, { useState } from 'react';
import { useI18n } from '../i18n/useI18n';
import { 
  FaHeart, 
  FaTimes, 
  FaSeedling, 
  FaCloudRain, 
  FaThermometerHalf,
  FaTint,
  FaArrowLeft,
  FaInfoCircle
} from 'react-icons/fa';

interface Crop {
  id: number;
  name: string;
  scientificName: string;
  image: string;
  confidence: number;
  expectedYield: number;
  profitEstimate: number;
  plantingSeason: string;
  description: string;
  pros: string[];
  considerations: string[];
  climate: {
    rainfall: string;
    temperature: string;
    humidity: string;
  };
}

const FarmTinderDemo: React.FC = () => {
  const { t } = useI18n();
  
  const [currentCropIndex, setCurrentCropIndex] = useState(0);
  const [likedCrops, setLikedCrops] = useState<Crop[]>([]);
  const [rejectedCrops, setRejectedCrops] = useState<Crop[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Mock data de culturas baseado nos dados da Angola
  const crops: Crop[] = [
    {
      id: 1,
      name: t.farmTinderFull.crops.corn.name,
      scientificName: "Zea mays",
      image: "/images/crops/corn.jpg",
      confidence: 85,
      expectedYield: 2500,
      profitEstimate: 450,
      plantingSeason: t.farmTinderFull.crops.corn.plantingSeason,
      description: t.farmTinderFull.crops.corn.description,
      pros: t.farmTinderFull.crops.corn.pros,
      considerations: t.farmTinderFull.crops.corn.considerations,
      climate: {
        rainfall: "600-1000mm/ano",
        temperature: "20-30°C",
        humidity: "65-75%"
      }
    },
    {
      id: 2,
      name: t.farmTinderFull.crops.cassava.name,
      scientificName: "Manihot esculenta",
      image: "/images/crops/cassava.jpg",
      confidence: 92,
      expectedYield: 15000,
      profitEstimate: 380,
      plantingSeason: t.farmTinderFull.crops.cassava.plantingSeason,
      description: t.farmTinderFull.crops.cassava.description,
      pros: t.farmTinderFull.crops.cassava.pros,
      considerations: t.farmTinderFull.crops.cassava.considerations,
      climate: {
        rainfall: "400-800mm/ano",
        temperature: "25-35°C",
        humidity: "60-80%"
      }
    },
    {
      id: 3,
      name: t.farmTinderFull.crops.beans.name,
      scientificName: "Phaseolus vulgaris",
      image: "/images/crops/beans.jpg",
      confidence: 78,
      expectedYield: 1200,
      profitEstimate: 520,
      plantingSeason: t.farmTinderFull.crops.beans.plantingSeason,
      description: t.farmTinderFull.crops.beans.description,
      pros: t.farmTinderFull.crops.beans.pros,
      considerations: t.farmTinderFull.crops.beans.considerations,
      climate: {
        rainfall: "500-700mm/ano",
        temperature: "18-25°C",
        humidity: "65-70%"
      }
    },
    {
      id: 4,
      name: t.farmTinderFull.crops.sweetPotato.name,
      scientificName: "Ipomoea batatas",
      image: "/images/crops/sweet-potato.jpg",
      confidence: 88,
      expectedYield: 8000,
      profitEstimate: 290,
      plantingSeason: t.farmTinderFull.crops.sweetPotato.plantingSeason,
      description: t.farmTinderFull.crops.sweetPotato.description,
      pros: t.farmTinderFull.crops.sweetPotato.pros,
      considerations: t.farmTinderFull.crops.sweetPotato.considerations,
      climate: {
        rainfall: "400-600mm/ano",
        temperature: "22-28°C",
        humidity: "70-80%"
      }
    },
    {
      id: 5,
      name: t.farmTinderFull.crops.tomato.name,
      scientificName: "Solanum lycopersicum",
      image: "/images/crops/tomato.jpg",
      confidence: 65,
      expectedYield: 25000,
      profitEstimate: 850,
      plantingSeason: t.farmTinderFull.crops.tomato.plantingSeason,
      description: t.farmTinderFull.crops.tomato.description,
      pros: t.farmTinderFull.crops.tomato.pros,
      considerations: t.farmTinderFull.crops.tomato.considerations,
      climate: {
        rainfall: "600-800mm/ano",
        temperature: "18-25°C",
        humidity: "60-70%"
      }
    }
  ];

  const currentCrop = crops[currentCropIndex];

  const handleLike = () => {
    if (currentCrop) {
      setLikedCrops(prev => [...prev, currentCrop]);
      nextCrop();
    }
  };

  const handleReject = () => {
    if (currentCrop) {
      setRejectedCrops(prev => [...prev, currentCrop]);
      nextCrop();
    }
  };

  const nextCrop = () => {
    if (currentCropIndex < crops.length - 1) {
      setCurrentCropIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetDemo = () => {
    setCurrentCropIndex(0);
    setLikedCrops([]);
    setRejectedCrops([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t.farmTinderFull.results.title}
              </h1>
              <p className="text-gray-600">
                {t.farmTinderFull.results.subtitle}
              </p>
            </div>

            {likedCrops.length > 0 ? (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                  <FaHeart className="mr-2" />
                  {t.farmTinderFull.results.selectedCrops.replace('{count}', likedCrops.length.toString())}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {likedCrops.map((crop, index) => (
                    <div key={crop.id} className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                          <p className="text-sm text-gray-600">{crop.scientificName}</p>
                        </div>
                      </div>
                      
                                              <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{crop.expectedYield.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">{t.farmTinderFull.card.yieldUnit}</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-green-600">${crop.profitEstimate}</div>
                          <div className="text-xs text-gray-600">{t.farmTinderFull.card.profitUnit}</div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-2">
                        <strong>{t.farmTinderFull.card.bestPlantingSeason}:</strong> {crop.plantingSeason}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>{t.farmTinderFull.card.nasaConfidence}:</strong> {crop.confidence}%
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                    <FaInfoCircle className="mr-2" />
                    {t.farmTinderFull.results.nextSteps.title}
                  </h3>
                  <ul className="space-y-2 text-blue-800">
                    {t.farmTinderFull.results.nextSteps.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTimes className="text-gray-500 text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {t.farmTinderFull.results.noSelection.title}
                </h2>
                <p className="text-gray-600">
                  {t.farmTinderFull.results.noSelection.subtitle}
                </p>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetDemo}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                {t.farmTinderFull.results.buttons.tryAgain}
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                {t.farmTinderFull.results.buttons.backHome}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">{t.farmTinderFull.header.title}</h1>
            <p className="text-sm text-gray-600">
              {t.farmTinderFull.header.progress.replace('{current}', (currentCropIndex + 1).toString()).replace('{total}', crops.length.toString())}
            </p>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCropIndex + 1) / crops.length) * 100}%` }}
          ></div>
        </div>

        {/* Crop Card */}
        {currentCrop && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            {/* Crop Image */}
            <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaSeedling className="text-white text-6xl" />
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1">
                <span className="text-sm font-bold text-green-600">
                  {currentCrop.confidence}% {t.farmTinderFull.card.nasaConfidence}
                </span>
              </div>
            </div>

            {/* Crop Info */}
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentCrop.name}
                </h2>
                <p className="text-sm text-gray-500 italic mb-4">
                  {currentCrop.scientificName}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {currentCrop.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {currentCrop.expectedYield.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">{t.farmTinderFull.card.yieldUnit}</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    ${currentCrop.profitEstimate}
                  </div>
                  <div className="text-xs text-gray-600">{t.farmTinderFull.card.profitUnit}</div>
                </div>
              </div>

              {/* Climate Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">{t.farmTinderFull.card.idealConditions}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <FaCloudRain className="text-blue-500 mr-2" />
                    <span className="text-gray-700">{t.farmTinderFull.climate.rainfall} {currentCrop.climate.rainfall}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaThermometerHalf className="text-red-500 mr-2" />
                    <span className="text-gray-700">{t.farmTinderFull.climate.temperature} {currentCrop.climate.temperature}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaTint className="text-blue-400 mr-2" />
                    <span className="text-gray-700">{t.farmTinderFull.climate.humidity} {currentCrop.climate.humidity}</span>
                  </div>
                </div>
              </div>

              {/* Planting Season */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <span className="text-sm text-yellow-800 font-semibold">
                    {t.farmTinderFull.card.bestPlantingSeason}
                  </span>
                  <div className="text-lg font-bold text-yellow-900 mt-1">
                    {currentCrop.plantingSeason}
                  </div>
                </div>
              </div>

              {/* Pros */}
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2">{t.farmTinderFull.card.advantages}</h4>
                <ul className="text-sm space-y-1">
                  {currentCrop.pros.map((pro, index) => (
                    <li key={index} className="text-gray-700">• {pro}</li>
                  ))}
                </ul>
              </div>

              {/* Considerations */}
              <div className="mb-6">
                <h4 className="font-semibold text-orange-700 mb-2">{t.farmTinderFull.card.considerations}</h4>
                <ul className="text-sm space-y-1">
                  {currentCrop.considerations.map((consideration, index) => (
                    <li key={index} className="text-gray-700">• {consideration}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleReject}
            className="flex-1 bg-white border-2 border-red-300 text-red-600 py-4 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center"
          >
            <FaTimes className="mr-2 text-xl" />
            {t.farmTinderFull.actions.rejectButton}
          </button>
          
          <button
            onClick={handleLike}
            className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <FaHeart className="mr-2 text-xl" />
            {t.farmTinderFull.actions.acceptButton}
          </button>
        </div>

        {/* Demo Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {t.farmTinderFull.demo.info}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmTinderDemo;