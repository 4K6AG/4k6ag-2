import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Camera, Maximize2 } from 'lucide-react';
import { mockStationData } from '../mock';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.gallery')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A visual journey through our amateur radio station and equipment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mockStationData.gallery.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <CardContent className="p-0 relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="secondary"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white"
                        onClick={() => setSelectedImage(item)}
                      >
                        <Maximize2 className="w-4 h-4 mr-2" />
                        View Full Size
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      {selectedImage && (
                        <div className="space-y-4">
                          <img 
                            src={selectedImage.image} 
                            alt={selectedImage.title}
                            className="w-full h-auto rounded-lg"
                          />
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{selectedImage.title}</h3>
                            <p className="text-gray-600">{selectedImage.description}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Photo Statistics */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <Camera className="w-8 h-8 text-blue-600 mx-auto" />
                  <div className="text-3xl font-bold text-gray-900">{mockStationData.gallery.length}+</div>
                  <div className="text-gray-600">Photos in Gallery</div>
                </div>
                <div className="space-y-2">
                  <Camera className="w-8 h-8 text-green-600 mx-auto" />
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-gray-600">Equipment Photos</div>
                </div>
                <div className="space-y-2">
                  <Camera className="w-8 h-8 text-purple-600 mx-auto" />
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-gray-600">QSL Card Designs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Gallery;