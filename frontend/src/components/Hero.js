import React from 'react';
import { useLanguage } from './LanguageContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Radio, Signal, MapPin, Globe } from 'lucide-react';
import { useStationData } from '../hooks/useData';
import { LoadingSection, ErrorMessage } from './Loading';

const Hero = () => {
  const { t } = useLanguage();
  const { data: stationData, loading, error, refetch } = useStationData();

  const scrollToContacts = () => {
    const element = document.querySelector('#contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <LoadingSection title="Loading station information..." height="400px" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <ErrorMessage error={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Station Status Badge */}
          <div className="flex justify-center mb-6">
            <Badge 
              variant={stationData?.status === 'online' ? 'default' : 'secondary'} 
              className={`px-4 py-2 text-sm font-medium ${
                stationData?.status === 'online' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-gray-100 text-gray-800 border-gray-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${
                stationData?.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
              {t('hero.status')}: {t(`hero.${stationData?.status || 'offline'}`)}
            </Badge>
          </div>

          {/* Main Title */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full animate-pulse"></div>
            </div>
            <div className="relative z-10 flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <Radio className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
              {stationData?.callsign || '4K6AG'}
            </h1>
            <p className="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Station Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <Signal className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">{t('about.operator')}</div>
              <div className="font-semibold text-gray-900">{stationData?.operator || 'N/A'}</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">{t('about.location')}</div>
              <div className="font-semibold text-gray-900">{stationData?.location || 'N/A'}</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <Globe className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">{t('about.grid')}</div>
              <div className="font-semibold text-gray-900">{stationData?.grid || 'N/A'}</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <Radio className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">{t('about.license')}</div>
              <div className="font-semibold text-gray-900">{stationData?.license || 'N/A'}</div>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={scrollToContacts}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t('contact.qslRequest')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;