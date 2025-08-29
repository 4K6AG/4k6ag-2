import React from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Radio, Mail, MapPin, ExternalLink, Github, Globe } from 'lucide-react';

const Footer = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'az', name: 'Azərbaycan' },
    { code: 'ru', name: 'Русский' }, 
    { code: 'en', name: 'English' }
  ];

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'equipment', href: '#equipment' },
    { key: 'qsl', href: '#qsl' }
  ];

  const informationLinks = [
    { key: 'gallery', href: '#gallery' },
    { key: 'achievements', href: '#achievements' },
    { key: 'news', href: '#news' },
    { key: 'contacts', href: '#contacts' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Station Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">4K6AG</h3>
                <p className="text-gray-400 text-sm">{t('hero.subtitle')}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">Baku, Azerbaijan (LN40AA)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {t(`nav.${link.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Information</h4>
            <ul className="space-y-2">
              {informationLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {t(`nav.${link.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Language */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact & Language</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:4k6ag@example.com" className="text-gray-400 hover:text-white transition-colors">
                  4k6ag@example.com
                </a>
              </div>
              
              {/* Language Switcher */}
              <div className="space-y-2">
                <div className="text-sm text-gray-400 flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>Language:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={currentLanguage === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => changeLanguage(lang.code)}
                      className={`text-xs h-7 ${
                        currentLanguage === lang.code
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-transparent text-gray-400 border-gray-600 hover:text-white hover:border-gray-400'
                      }`}
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            {t('footer.copyright')}
          </div>
          
          {/* Social/External Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://qrz.com/db/4K6AG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://lotw.arrl.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              LoTW
            </a>
            <a
              href="https://eqsl.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              eQSL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;