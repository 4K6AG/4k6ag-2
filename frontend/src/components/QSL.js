import React from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Mail, Calendar, Image, Send } from 'lucide-react';
import { mockStationData } from '../mock';

const QSL = () => {
  const { t } = useLanguage();

  const scrollToContacts = () => {
    const element = document.querySelector('#contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="qsl" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('qsl.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('qsl.info')}
          </p>
        </div>

        {/* QSL Information */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Mail className="w-7 h-7 text-blue-600" />
                <span>QSL Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">QSL Bureau</h3>
                  <p className="text-gray-700">
                    QSL cards can be sent via Azerbaijan amateur radio bureau or direct mail.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Bureau</Badge>
                      <span className="text-sm text-gray-600">Via 4K bureau</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Direct</Badge>
                      <span className="text-sm text-gray-600">Direct mail accepted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">eQSL</Badge>
                      <span className="text-sm text-gray-600">Electronic QSL supported</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">QSL Policy</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>100% QSL for direct cards with SAE/IRC</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Bureau QSL sent monthly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>eQSL confirmations within 24 hours</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>LoTW uploads daily</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-blue-200">
                <Button 
                  onClick={scrollToContacts}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t('qsl.request')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QSL Card Gallery */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">{t('qsl.gallery')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStationData.qslCards.map((card) => (
              <Card key={card.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img 
                      src={card.image} 
                      alt={`QSL Card ${card.year}`}
                      className="w-full h-48 object-cover"
                    />
                    <Badge 
                      className="absolute top-3 right-3 bg-white/90 text-gray-900"
                      variant="secondary"
                    >
                      {card.year}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{card.design}</h4>
                      <p className="text-sm text-gray-600">QSL Card Design</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{card.year}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QSL;