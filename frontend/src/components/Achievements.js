import React from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import { mockStationData } from '../mock';

const Achievements = () => {
  const { t } = useLanguage();

  const getAchievementIcon = (index) => {
    const icons = [Trophy, Award, Medal, Star];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-6 h-6" />;
  };

  const getAchievementColor = (index) => {
    const colors = [
      'text-yellow-600 bg-yellow-50 border-yellow-200',
      'text-blue-600 bg-blue-50 border-blue-200', 
      'text-green-600 bg-green-50 border-green-200',
      'text-purple-600 bg-purple-50 border-purple-200'
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.achievements')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Awards and accomplishments in amateur radio operations and competitions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mockStationData.achievements.map((achievement, index) => (
            <Card 
              key={achievement.id} 
              className={`${getAchievementColor(index)} border-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getAchievementColor(index)}`}>
                    {getAchievementIcon(index)}
                  </div>
                  <span className="text-lg">{achievement.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{achievement.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-sm">
                    Achievement
                  </Badge>
                  <Badge variant="secondary">
                    {achievement.year}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Statistics */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Achievement Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <Trophy className="w-8 h-8 text-yellow-600 mx-auto" />
                  <div className="text-3xl font-bold text-gray-900">340+</div>
                  <div className="text-gray-600">Countries Worked</div>
                </div>
                <div className="space-y-2">
                  <Award className="w-8 h-8 text-blue-600 mx-auto" />
                  <div className="text-3xl font-bold text-gray-900">50</div>
                  <div className="text-gray-600">US States</div>
                </div>
                <div className="space-y-2">
                  <Medal className="w-8 h-8 text-green-600 mx-auto" />
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-gray-600">Contest Awards</div>
                </div>
                <div className="space-y-2">
                  <Star className="w-8 h-8 text-purple-600 mx-auto" />
                  <div className="text-3xl font-bold text-gray-900">5000+</div>
                  <div className="text-gray-600">QSOs Confirmed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Awards Gallery */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Award Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <img 
                    src={`https://via.placeholder.com/400x300/f1f5f9/64748b?text=Award+Certificate+${i}`}
                    alt={`Award Certificate ${i}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900">Certificate {i}</h4>
                    <p className="text-sm text-gray-600">Amateur Radio Achievement Award</p>
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

export default Achievements;