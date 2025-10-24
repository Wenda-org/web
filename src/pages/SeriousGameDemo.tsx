import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/useI18n';
import { 
  FaArrowLeft, 
  FaPlay, 
  FaPause, 
  FaRedo,
  FaCloudRain,
  FaThermometerHalf,
  FaTint,
  FaSeedling,
  FaExclamationTriangle,
  FaTrophy,
  FaInfoCircle,
  FaBolt,
  FaLeaf,
  FaGamepad
} from 'react-icons/fa';

interface GameState {
  level: number;
  score: number;
  water: number;
  soilHealth: number;
  cropGrowth: number;
  day: number;
  season: string;
  budget: number;
  totalInvestment: number;
  weather: {
    temperature: number;
    rainfall: number;
    humidity: number;
  };
  alerts: string[];
}

interface Decision {
  id: string;
  text: string;
  impact: {
    water?: number;
    soilHealth?: number;
    cropGrowth?: number;
    score?: number;
  };
  cost?: number;
}

const SeriousGameDemo: React.FC = () => {
  const { t } = useI18n();
  
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    water: 75,
    soilHealth: 80,
    cropGrowth: 0,
    day: 1,
    season: 'Plantio',
    budget: 400000,
    totalInvestment: 0,
    weather: {
      temperature: 25,
      rainfall: 30,
      humidity: 65
    },
    alerts: []
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showDecisions, setShowDecisions] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  // Cenários do jogo baseados em dados reais da agricultura angolana
  const scenarios = [
    {
      title: t.seriousGameFull.scenarios.week1.title,
      description: t.seriousGameFull.scenarios.week1.description,
      nasaData: {
        soilMoisture: 15,
        ndvi: 0.1,
        precipitation: 5,
        temperature: 28
      },
      decisions: [
        {
          id: 'deep_tillage',
          text: t.seriousGameFull.scenarios.week1.decisions.deepTillage,
          impact: { soilHealth: +15, water: -5, score: +12 },
          cost: 32000
        },
        {
          id: 'organic_matter',
          text: t.seriousGameFull.scenarios.week1.decisions.organicMatter,
          impact: { soilHealth: +20, water: +10, score: +18 },
          cost: 24000
        },
        {
          id: 'wait_rain',
          text: t.seriousGameFull.scenarios.week1.decisions.waitRain,
          impact: { water: +5, soilHealth: +5, score: +8 },
          cost: 0
        }
      ]
    },
    {
      title: t.seriousGameFull.scenarios.week2.title,
      description: t.seriousGameFull.scenarios.week2.description,
      nasaData: {
        soilMoisture: 45,
        ndvi: 0.2,
        precipitation: 30,
        temperature: 25
      },
      decisions: [
        {
          id: 'drought_resistant',
          text: t.seriousGameFull.scenarios.week2.decisions.droughtResistant,
          impact: { water: +15, cropGrowth: +8, score: +15 },
          cost: 18000
        },
        {
          id: 'high_yield',
          text: t.seriousGameFull.scenarios.week2.decisions.highYield,
          impact: { water: -10, cropGrowth: +15, score: +12 },
          cost: 26000
        },
        {
          id: 'local_variety',
          text: t.seriousGameFull.scenarios.week2.decisions.localVariety,
          impact: { water: +5, soilHealth: +5, cropGrowth: +5, score: +10 },
          cost: 10000
        }
      ]
    },
    {
      title: t.seriousGameFull.scenarios.week4.title,
      description: t.seriousGameFull.scenarios.week4.description,
      nasaData: {
        soilMoisture: 25,
        ndvi: 0.4,
        precipitation: 5,
        temperature: 32
      },
      decisions: [
        {
          id: 'precision_irrigation',
          text: t.seriousGameFull.scenarios.week4.decisions.precisionIrrigation,
          impact: { water: -20, cropGrowth: +12, score: +15 },
          cost: 36000
        },
        {
          id: 'mulching',
          text: t.seriousGameFull.scenarios.week4.decisions.mulching,
          impact: { water: +15, soilHealth: +8, score: +18 },
          cost: 16000
        },
        {
          id: 'foliar_nutrition',
          text: t.seriousGameFull.scenarios.week4.decisions.foliarNutrition,
          impact: { cropGrowth: +8, soilHealth: +5, score: +12 },
          cost: 14000
        }
      ]
    },
    {
      title: t.seriousGameFull.scenarios.week6.title,
      description: t.seriousGameFull.scenarios.week6.description,
      nasaData: {
        soilMoisture: 60,
        ndvi: 0.6,
        precipitation: 40,
        temperature: 29
      },
      decisions: [
        {
          id: 'biological_control',
          text: t.seriousGameFull.scenarios.week6.decisions.biologicalControl,
          impact: { cropGrowth: +5, soilHealth: +10, score: +20 },
          cost: 20000
        },
        {
          id: 'targeted_pesticide',
          text: t.seriousGameFull.scenarios.week6.decisions.targetedPesticide,
          impact: { cropGrowth: +10, soilHealth: -5, score: +8 },
          cost: 28000
        },
        {
          id: 'monitoring',
          text: t.seriousGameFull.scenarios.week6.decisions.monitoring,
          impact: { cropGrowth: +3, score: +12 },
          cost: 8000
        }
      ]
    },
    {
      title: t.seriousGameFull.scenarios.week8.title,
      description: t.seriousGameFull.scenarios.week8.description,
      nasaData: {
        soilMoisture: 70,
        ndvi: 0.7,
        precipitation: 45,
        temperature: 27
      },
      decisions: [
        {
          id: 'variable_rate',
          text: t.seriousGameFull.scenarios.week8.decisions.variableRate,
          impact: { cropGrowth: +15, soilHealth: +5, score: +22 },
          cost: 48000
        },
        {
          id: 'uniform_application',
          text: t.seriousGameFull.scenarios.week8.decisions.uniformApplication,
          impact: { cropGrowth: +10, soilHealth: +3, score: +12 },
          cost: 32000
        },
        {
          id: 'organic_fertilizer',
          text: t.seriousGameFull.scenarios.week8.decisions.organicFertilizer,
          impact: { cropGrowth: +8, soilHealth: +12, score: +18 },
          cost: 26000
        }
      ]
    },
    {
      title: t.seriousGameFull.scenarios.week10.title,
      description: t.seriousGameFull.scenarios.week10.description,
      nasaData: {
        soilMoisture: 85,
        ndvi: 0.8,
        precipitation: 80,
        temperature: 26
      },
      decisions: [
        {
          id: 'drainage_system',
          text: t.seriousGameFull.scenarios.week10.decisions.drainageSystem,
          impact: { water: -15, soilHealth: +8, cropGrowth: +10, score: +25 },
          cost: 60000
        },
        {
          id: 'temporary_cover',
          text: t.seriousGameFull.scenarios.week10.decisions.temporaryCover,
          impact: { cropGrowth: +12, score: +15 },
          cost: 80000
        },
        {
          id: 'early_harvest_partial',
          text: t.seriousGameFull.scenarios.week10.decisions.earlyHarvestPartial,
          impact: { cropGrowth: +5, score: +18 },
          cost: 40000
        }
      ]
    },
    {
      title: t.seriousGameFull.scenarios.week12.title,
      description: t.seriousGameFull.scenarios.week12.description,
      nasaData: {
        soilMoisture: 40,
        ndvi: 0.9,
        precipitation: 15,
        temperature: 30
      },
      decisions: [
        {
          id: 'immediate_harvest',
          text: t.seriousGameFull.scenarios.week12.decisions.immediateHarvest,
          impact: { cropGrowth: +18, score: +25 },
          cost: 100000
        },
        {
          id: 'selective_harvest',
          text: t.seriousGameFull.scenarios.week12.decisions.selectiveHarvest,
          impact: { cropGrowth: +20, score: +35 },
          cost: 120000
        },
        {
          id: 'wait_perfect_timing',
          text: t.seriousGameFull.scenarios.week12.decisions.waitPerfectTiming,
          impact: { cropGrowth: +25, score: +30 },
          cost: 32000
        }
      ]
    },
    {
      title: t.seriousGameFull.scenarios.postHarvest.title,
      description: t.seriousGameFull.scenarios.postHarvest.description,
      nasaData: {
        soilMoisture: 30,
        ndvi: 0.3,
        precipitation: 10,
        temperature: 31
      },
      decisions: [
        {
          id: 'cover_crops',
          text: t.seriousGameFull.scenarios.postHarvest.decisions.coverCrops,
          impact: { soilHealth: +25, water: +10, score: +30 },
          cost: 28000
        },
        {
          id: 'crop_rotation',
          text: t.seriousGameFull.scenarios.postHarvest.decisions.cropRotation,
          impact: { soilHealth: +20, cropGrowth: +5, score: +28 },
          cost: 34000
        },
        {
          id: 'soil_analysis',
          text: t.seriousGameFull.scenarios.postHarvest.decisions.soilAnalysis,
          impact: { soilHealth: +10, score: +15 },
          cost: 12000
        }
      ]
    }
  ];

  const currentScenarioData = scenarios[currentScenario];

  const handleDecision = (decision: Decision) => {
    // Verificar se tem orçamento suficiente
    if ((decision.cost || 0) > gameState.budget) {
      setGameState(prev => ({
        ...prev,
        alerts: [t.seriousGameFull.ui.decisions.insufficientBudget, ...prev.alerts.slice(0, 2)]
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      water: Math.max(0, Math.min(100, prev.water + (decision.impact.water || 0))),
      soilHealth: Math.max(0, Math.min(100, prev.soilHealth + (decision.impact.soilHealth || 0))),
      cropGrowth: Math.max(0, Math.min(100, prev.cropGrowth + (decision.impact.cropGrowth || 0))),
      score: prev.score + (decision.impact.score || 0),
      budget: prev.budget - (decision.cost || 0),
      totalInvestment: prev.totalInvestment + (decision.cost || 0),
      day: prev.day + 7
    }));

    // Adicionar feedback baseado na decisão
    const feedback = getFeedback(decision);
    setGameState(prev => ({
      ...prev,
      alerts: [feedback, ...prev.alerts.slice(0, 2)]
    }));

    // Avançar para o próximo cenário
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
        setShowDecisions(true); // Garantir que as decisões apareçam
      } else {
        // Fim do jogo
        setIsPlaying(false);
        setShowDecisions(false);
      }
    }, 2000);
  };

  const getFeedback = (decision: Decision): string => {
    const feedbacks: { [key: string]: string } = {
      // Semana 1 - Preparação do solo
      'deep_tillage': t.seriousGameFull.feedback.deepTillage,
      'organic_matter': t.seriousGameFull.feedback.organicMatter,
      'wait_rain': t.seriousGameFull.feedback.waitRain,
      
      // Semana 2 - Plantio
      'drought_resistant': t.seriousGameFull.feedback.droughtResistant,
      'high_yield': t.seriousGameFull.feedback.highYield,
      'local_variety': t.seriousGameFull.feedback.localVariety,
      
      // Semana 4 - Crescimento inicial
      'precision_irrigation': t.seriousGameFull.feedback.precisionIrrigation,
      'mulching': t.seriousGameFull.feedback.mulching,
      'foliar_nutrition': t.seriousGameFull.feedback.foliarNutrition,
      
      // Semana 6 - Controle de pragas
      'biological_control': t.seriousGameFull.feedback.biologicalControl,
      'targeted_pesticide': t.seriousGameFull.feedback.targetedPesticide,
      'monitoring': t.seriousGameFull.feedback.monitoring,
      
      // Semana 8 - Fertilização
      'variable_rate': t.seriousGameFull.feedback.variableRate,
      'uniform_application': t.seriousGameFull.feedback.uniformApplication,
      'organic_fertilizer': t.seriousGameFull.feedback.organicFertilizer,
      
      // Semana 10 - Gestão hídrica
      'drainage_system': t.seriousGameFull.feedback.drainageSystem,
      'temporary_cover': t.seriousGameFull.feedback.temporaryCover,
      'early_harvest_partial': t.seriousGameFull.feedback.earlyHarvestPartial,
      
      // Semana 12 - Colheita
      'immediate_harvest': t.seriousGameFull.feedback.immediateHarvest,
      'selective_harvest': t.seriousGameFull.feedback.selectiveHarvest,
      'wait_perfect_timing': t.seriousGameFull.feedback.waitPerfectTiming,
      
      // Pós-colheita
      'cover_crops': t.seriousGameFull.feedback.coverCrops,
      'crop_rotation': t.seriousGameFull.feedback.cropRotation,
      'soil_analysis': t.seriousGameFull.feedback.soilAnalysis
    };
    
    return feedbacks[decision.id] || 'Decisão tomada! Continue aprendendo com os dados da NASA.';
  };

  const getProgressColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const startGame = () => {
    setGameStarted(true);
    setIsPlaying(true);
    setShowTutorial(false);
    setTimeout(() => setShowDecisions(true), 1000);
  };

  const resetGame = () => {
    setGameState({
      level: 1,
      score: 0,
      water: 75,
      soilHealth: 80,
      cropGrowth: 0,
      day: 1,
      season: 'Plantio',
      budget: 400000,
      totalInvestment: 0,
      weather: {
        temperature: 25,
        rainfall: 30,
        humidity: 65
      },
      alerts: []
    });
    setCurrentScenario(0);
    setIsPlaying(false);
    setShowDecisions(false);
    setGameStarted(false);
    setShowTutorial(true);
  };

  // Garantir que as decisões apareçam quando o cenário muda
  useEffect(() => {
    if (isPlaying && gameStarted) {
      const timer = setTimeout(() => {
        setShowDecisions(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentScenario, isPlaying, gameStarted]);

  if (showTutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">{t.seriousGameFull.welcome.title}</h1>
              <div className="w-10"></div>
            </div>

            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGamepad className="text-white text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t.seriousGameFull.welcome.subtitle}
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                {t.seriousGameFull.welcome.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <FaSeedling className="text-blue-600 text-2xl mx-auto mb-2" />
                <h3 className="font-bold text-blue-900">{t.seriousGameFull.welcome.features.realScenarios.title}</h3>
                <p className="text-sm text-blue-700">{t.seriousGameFull.welcome.features.realScenarios.description}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <FaLeaf className="text-green-600 text-2xl mx-auto mb-2" />
                <h3 className="font-bold text-green-900">{t.seriousGameFull.welcome.features.nasaData.title}</h3>
                <p className="text-sm text-green-700">{t.seriousGameFull.welcome.features.nasaData.description}</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <FaTrophy className="text-yellow-600 text-2xl mx-auto mb-2" />
                <h3 className="font-bold text-yellow-900">{t.seriousGameFull.welcome.features.scientificFeedback.title}</h3>
                <p className="text-sm text-yellow-700">{t.seriousGameFull.welcome.features.scientificFeedback.description}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <FaBolt className="text-purple-600 text-2xl mx-auto mb-2" />
                <h3 className="font-bold text-purple-900">{t.seriousGameFull.welcome.features.budgetManagement.title}</h3>
                <p className="text-sm text-purple-700">{t.seriousGameFull.welcome.features.budgetManagement.description}</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-orange-900 mb-3 flex items-center">
                <FaInfoCircle className="mr-2" />
                {t.seriousGameFull.welcome.howToPlay.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-800">
                <div>
                  <strong>{t.seriousGameFull.welcome.howToPlay.steps.analyze}</strong>
                </div>
                <div>
                  <strong>{t.seriousGameFull.welcome.howToPlay.steps.decide}</strong>
                </div>
                <div>
                  <strong>{t.seriousGameFull.welcome.howToPlay.steps.manage}</strong>
                </div>
                <div>
                  <strong>{t.seriousGameFull.welcome.howToPlay.steps.learn}</strong>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-12 py-4 rounded-xl text-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {t.seriousGameFull.welcome.startButton}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                {t.seriousGameFull.welcome.duration}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header com indicadores */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>

          <div className="flex items-center space-x-6">
            {/* Indicadores do jogo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaTint className="text-blue-500 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">{t.seriousGameFull.ui.indicators.water}</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(gameState.water)}`}
                      style={{ width: `${gameState.water}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <FaLeaf className="text-green-500 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">{t.seriousGameFull.ui.indicators.soil}</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(gameState.soilHealth)}`}
                      style={{ width: `${gameState.soilHealth}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <FaSeedling className="text-green-600 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">{t.seriousGameFull.ui.indicators.growth}</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(gameState.cropGrowth)}`}
                      style={{ width: `${gameState.cropGrowth}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <FaTrophy className="text-yellow-500 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">{t.seriousGameFull.ui.indicators.score}</div>
                  <div className="text-lg font-bold text-gray-900">{gameState.score}</div>
                </div>
              </div>

              <div className="flex items-center">
                <FaBolt className="text-purple-500 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">{t.seriousGameFull.ui.indicators.budget}</div>
                  <div className="text-lg font-bold text-purple-900">{gameState.budget.toLocaleString()} {t.seriousGameFull.common.kz}</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={resetGame}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaRedo className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Painel principal do jogo */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentScenarioData?.title}</h2>
                  <p className="text-gray-600">Dia {gameState.day} • {gameState.season}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Cenário</div>
                  <div className="text-xl font-bold text-green-600">{currentScenario + 1}/{scenarios.length}</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{currentScenarioData?.description}</p>

              {/* Dados NASA */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  {t.seriousGameFull.ui.nasaPanel.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center">
                    <FaTint className="text-blue-600 mr-2" />
                    <div>
                      <div className="font-semibold">{t.seriousGameFull.ui.nasaPanel.soilMoisture}</div>
                      <div>{currentScenarioData?.nasaData.soilMoisture}%</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaLeaf className="text-green-600 mr-2" />
                    <div>
                      <div className="font-semibold">{t.seriousGameFull.ui.nasaPanel.ndvi}</div>
                      <div>{currentScenarioData?.nasaData.ndvi}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaCloudRain className="text-blue-600 mr-2" />
                    <div>
                      <div className="font-semibold">{t.seriousGameFull.ui.nasaPanel.precipitation}</div>
                      <div>{currentScenarioData?.nasaData.precipitation}mm</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaThermometerHalf className="text-red-500 mr-2" />
                    <div>
                      <div className="font-semibold">{t.seriousGameFull.ui.nasaPanel.temperature}</div>
                      <div>{currentScenarioData?.nasaData.temperature}°C</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decisões */}
              {showDecisions && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">🤔 Que decisão você toma?</h3>
                  <div className="space-y-3">
                    {currentScenarioData?.decisions.map((decision, index) => (
                      <button
                        key={decision.id}
                        onClick={() => handleDecision(decision)}
                        disabled={(decision.cost || 0) > gameState.budget}
                        className={`w-full text-left p-4 border-2 rounded-xl transition-all duration-300 group ${
                          (decision.cost || 0) > gameState.budget
                            ? 'border-red-200 bg-red-50 opacity-60 cursor-not-allowed'
                            : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className={`font-semibold ${
                              (decision.cost || 0) > gameState.budget
                                ? 'text-red-700'
                                : 'text-gray-900 group-hover:text-green-700'
                            }`}>
                              {decision.text}
                            </div>
                            <div className={`text-sm mt-1 flex items-center ${
                              (decision.cost || 0) > gameState.budget ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              <span className="mr-2">
                                {decision.cost === 0 ? '💚 Grátis' : `💰 ${decision.cost?.toLocaleString()} Kz`}
                              </span>
                              {(decision.cost || 0) > gameState.budget && (
                                <span className="text-xs bg-red-200 px-2 py-1 rounded-full">
                                  {t.seriousGameFull.ui.decisions.insufficientBudget}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            {Object.entries(decision.impact).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-end">
                                <span className="mr-1">
                                  {key === 'water' && '💧'}
                                  {key === 'soilHealth' && '🌱'}
                                  {key === 'cropGrowth' && '📈'}
                                  {key === 'score' && '⭐'}
                                </span>
                                <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {value > 0 ? '+' : ''}{value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Painel lateral */}
          <div className="space-y-6">
            {/* Alertas */}
            {gameState.alerts.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                  <FaExclamationTriangle className="text-yellow-500 mr-2" />
                  Feedback
                </h3>
                <div className="space-y-2">
                  {gameState.alerts.map((alert, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg text-sm ${
                        index === 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {alert}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status da fazenda */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-900 mb-4">{t.seriousGameFull.ui.status.title}</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t.seriousGameFull.ui.status.waterReserve}</span>
                    <span>{gameState.water}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(gameState.water)}`}
                      style={{ width: `${gameState.water}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Saúde do Solo</span>
                    <span>{gameState.soilHealth}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(gameState.soilHealth)}`}
                      style={{ width: `${gameState.soilHealth}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Crescimento das Culturas</span>
                    <span>{gameState.cropGrowth}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(gameState.cropGrowth)}`}
                      style={{ width: `${gameState.cropGrowth}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dicas */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-bold text-green-900 mb-3 flex items-center">
                💡 Dica NASA
              </h3>
              <p className="text-sm text-green-800">
                {currentScenario === 0 && "Solo com baixa umidade precisa de preparação cuidadosa. Matéria orgânica melhora retenção de água."}
                {currentScenario === 1 && "NDVI baixo indica início do crescimento. Escolha de variedade é crucial para o clima local."}
                {currentScenario === 2 && "Umidade do solo abaixo de 30% é crítica. Mulch reduz evaporação em até 50%."}
                {currentScenario === 3 && "Imagens de satélite podem detectar pragas antes dos sintomas visuais. Ação precoce é mais eficaz."}
                {currentScenario === 4 && "NDVI variável indica necessidade de fertilização por zonas. Precisão economiza recursos."}
                {currentScenario === 5 && "Encharcamento durante enchimento de grãos pode causar fungos. Drenagem é investimento essencial."}
                {currentScenario === 6 && "NDVI alto (>0.85) indica maturação. Timing da colheita afeta qualidade e rendimento."}
                {currentScenario === 7 && "Culturas de cobertura capturam 30-50% mais carbono no solo. Benefício a longo prazo."}
              </p>
            </div>
          </div>
        </div>

        {/* Fim do jogo */}
        {!isPlaying && gameStarted && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTrophy className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.seriousGameFull.endGame.title}
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              {t.seriousGameFull.endGame.subtitle}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{gameState.score}</div>
                <div className="text-sm text-blue-800">{t.seriousGameFull.endGame.results.finalScore}</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">{gameState.cropGrowth}%</div>
                <div className="text-sm text-green-800">{t.seriousGameFull.ui.indicators.growth}</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-600">{Math.round(gameState.soilHealth)}%</div>
                <div className="text-sm text-yellow-800">{t.seriousGameFull.ui.indicators.soil}</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600">{gameState.budget.toLocaleString()} {t.seriousGameFull.common.kz}</div>
                <div className="text-sm text-purple-800">{t.seriousGameFull.ui.indicators.budget}</div>
              </div>
            </div>

            {/* Análise de Performance */}
            <div className="bg-gray-50 rounded-xl p-6 max-w-3xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.seriousGameFull.endGame.performance.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">{t.seriousGameFull.endGame.results.totalInvested}:</span>
                  <span className="ml-2 text-green-600">{gameState.totalInvestment.toLocaleString()} {t.seriousGameFull.common.kz}</span>
                </div>
                <div>
                  <span className="font-semibold">{t.seriousGameFull.endGame.results.budgetEfficiency}:</span>
                  <span className="ml-2 text-blue-600">
                    {gameState.totalInvestment > 0 ? (gameState.score / gameState.totalInvestment * 1000).toFixed(1) : 0} pts/1000Kz
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Sustentabilidade:</span>
                  <span className="ml-2">
                    {gameState.soilHealth >= 80 ? '🏆 Excelente' : 
                     gameState.soilHealth >= 60 ? '✅ Boa' : 
                     gameState.soilHealth >= 40 ? '⚠️ Regular' : '❌ Precisa melhorar'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Gestão Hídrica:</span>
                  <span className="ml-2">
                    {gameState.water >= 70 ? '🏆 Excelente' : 
                     gameState.water >= 50 ? '✅ Boa' : 
                     gameState.water >= 30 ? '⚠️ Regular' : '❌ Crítica'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 mr-4"
              >
                {t.seriousGameFull.endGame.actions.playAgain}
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                {t.seriousGameFull.endGame.actions.backHome}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                {t.seriousGameFull.endGame.actions.downloadApp}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriousGameDemo;