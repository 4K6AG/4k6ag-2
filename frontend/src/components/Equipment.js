import React from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Radio, Antenna, Zap, Waves } from 'lucide-react';
import { mockStationData } from '../mock';

const Equipment = () => {
  const { t } = useLanguage();

  const getEquipmentIcon = (type) => {
    switch (type) {
      case 'transceiver':
        return <Radio className="w-6 h-6 text-blue-600" />;
      case 'antenna':
        return <Antenna className="w-6 h-6 text-green-600" />;
      case 'amplifier':
        return <Zap className="w-6 h-6 text-orange-600" />;
      default:
        return <Waves className="w-6 h-6 text-purple-600" />;
    }
  };

  const getEquipmentBgColor = (type) => {
    switch (type) {
      case 'transceiver':
        return 'from-blue-50 to-blue-100 border-blue-200';
      case 'antenna':
        return 'from-green-50 to-green-100 border-green-200';
      case 'amplifier':
        return 'from-orange-50 to-orange-100 border-orange-200';
      default:
        return 'from-purple-50 to-purple-100 border-purple-200';
    }
  };

  return (
    <section id="equipment" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('equipment.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional amateur radio equipment for reliable worldwide communications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mockStationData.equipment.map((item) => (
            <Card 
              key={item.id} 
              className={`bg-gradient-to-br ${getEquipmentBgColor(item.type)} border-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  {getEquipmentIcon(item.type)}
                  <span className="text-lg">{item.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 font-medium">{item.specs}</p>
                
                <div className="space-y-2">
                  {item.power && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t('equipment.power')}:</span>
                      <Badge variant="secondary">{item.power}</Badge>
                    </div>
                  )}
                  
                  {item.gain && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Gain:</span>
                      <Badge variant="secondary">{item.gain}</Badge>
                    </div>
                  )}
                  
                  {item.bands && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t('equipment.bands')}:</span>
                      <Badge variant="outline" className="text-xs">{item.bands}</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-2">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900">Operating Bands</h3>
                  <div className="flex flex-wrap gap-2">
                    {['160m', '80m', '40m', '20m', '15m', '10m', '6m', '2m', '70cm'].map((band) => (
                      <Badge key={band} variant="outline" className="text-sm">{band}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900">Operating Modes</h3>
                  <div className="flex flex-wrap gap-2">
                    {['SSB', 'CW', 'FM', 'AM', 'FT8', 'PSK31', 'RTTY'].map((mode) => (
                      <Badge key={mode} variant="outline" className="text-sm">{mode}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Equipment;