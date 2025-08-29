import React from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { User, MapPin, Radio, Award } from 'lucide-react';
import { mockStationData } from '../mock';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Station Information */}
          <Card className="border-2 hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Radio className="w-6 h-6 text-blue-600" />
                <span>Station Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{t('about.operator')}:</span>
                </div>
                <span className="font-semibold text-gray-900">{mockStationData.operator}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{t('about.location')}:</span>
                </div>
                <span className="font-semibold text-gray-900">{mockStationData.location}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Radio className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{t('about.grid')}:</span>
                </div>
                <Badge variant="secondary" className="font-semibold">{mockStationData.grid}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{t('about.license')}:</span>
                </div>
                <Badge variant="default" className="bg-blue-600 text-white">{mockStationData.license}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Station Status */}
          <Card className="border-2 hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${mockStationData.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span>{t('hero.status')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  mockStationData.status === 'online' 
                    ? 'bg-green-100 border-4 border-green-500' 
                    : 'bg-gray-100 border-4 border-gray-400'
                }`}>
                  <Radio className={`w-8 h-8 ${
                    mockStationData.status === 'online' ? 'text-green-600' : 'text-gray-500'
                  }`} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  mockStationData.status === 'online' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {t(`hero.${mockStationData.status}`)}
                </h3>
                <p className="text-gray-600">
                  {mockStationData.status === 'online' 
                    ? 'Station is currently active and monitoring frequencies'
                    : 'Station is currently offline'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;