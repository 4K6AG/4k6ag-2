import React from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Newspaper, Radio, Trophy } from 'lucide-react';
import { mockStationData } from '../mock';

const News = () => {
  const { t } = useLanguage();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'equipment':
        return <Radio className="w-5 h-5" />;
      case 'contests':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Newspaper className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'equipment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contests':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="news" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.news')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Latest updates, achievements, and technical developments from 4K6AG
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {mockStationData.news.map((article) => (
            <Card key={article.id} className="border-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getCategoryColor(article.category)} flex items-center space-x-1`}>
                    {getCategoryIcon(article.category)}
                    <span className="capitalize">{article.category}</span>
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{article.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Timeline */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-2">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Radio className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Equipment Upgrade</h3>
                    <p className="text-gray-600 text-sm">Installed new antenna rotator system for better coverage</p>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Contest Participation</h3>
                    <p className="text-gray-600 text-sm">Participated in ARRL DX Contest with 150+ QSOs</p>
                    <span className="text-xs text-gray-500">1 week ago</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Newspaper className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Website Launch</h3>
                    <p className="text-gray-600 text-sm">Launched new multilingual website with enhanced features</p>
                    <span className="text-xs text-gray-500">2 weeks ago</span>
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

export default News;