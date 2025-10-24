import React from 'react';
import { useI18n } from '../../i18n/useI18n';

const FarmRewards: React.FC = () => {
  const { t } = useI18n();

  console.log('FarmRewards component rendered');
  console.log('farmRewards data:', t.farmRewards);

  const rewardCards = [
    {
      icon: t.farmRewards.cards.foodVouchers.icon,
      title: t.farmRewards.cards.foodVouchers.title,
      description: t.farmRewards.cards.foodVouchers.description,
    },
    {
      icon: t.farmRewards.cards.agriculturalTools.icon,
      title: t.farmRewards.cards.agriculturalTools.title,
      description: t.farmRewards.cards.agriculturalTools.description,
    },
    {
      icon: t.farmRewards.cards.ecoRewards.icon,
      title: t.farmRewards.cards.ecoRewards.title,
      description: t.farmRewards.cards.ecoRewards.description,
    },
    {
      icon: t.farmRewards.cards.localPartnerships.icon,
      title: t.farmRewards.cards.localPartnerships.title,
      description: t.farmRewards.cards.localPartnerships.description,
    },
  ];

  return (
    <section id="farm-rewards" className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" style={{ minHeight: '500px' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.farmRewards.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {t.farmRewards.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed">
            {t.farmRewards.description}
          </p>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {rewardCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className="text-6xl mb-6 text-center">
                {card.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {card.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-center leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            {t.farmRewards.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FarmRewards;