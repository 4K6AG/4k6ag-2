import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Mail, Send, MessageSquare, Radio, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { contactAPI } from '../services/api';
import { LoadingSpinner } from './Loading';

const Contacts = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    callsign: '',
    message: '',
    qsl_request: false,
    frequency: '',
    mode: '',
    rst_sent: '',
    rst_received: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await contactAPI.submitContactForm(formData);
      
      if (response.data.success) {
        toast.success(response.data.message || 'Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          callsign: '',
          message: '',
          qsl_request: false,
          frequency: '',
          mode: '',
          rst_sent: '',
          rst_received: ''
        });
      } else {
        toast.error(response.data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch for QSL requests, technical questions, or general inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <MessageSquare className="w-7 h-7 text-blue-600" />
                <span>{t('contact.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.name')} *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/80"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="callsign">{t('contact.callsign')}</Label>
                    <Input
                      id="callsign"
                      name="callsign"
                      type="text"
                      value={formData.callsign}
                      onChange={handleInputChange}
                      placeholder="e.g., VK3ABC"
                      className="bg-white/80"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.email')} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/80"
                    disabled={isSubmitting}
                  />
                </div>

                {/* QSL Request Fields */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="qsl_request"
                    name="qsl_request"
                    checked={formData.qsl_request}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="qsl_request" className="text-sm">
                    This is a QSL request
                  </Label>
                </div>

                {formData.qsl_request && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Input
                        id="frequency"
                        name="frequency"
                        type="text"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        placeholder="14.200 MHz"
                        className="bg-white/80"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mode">Mode</Label>
                      <Input
                        id="mode"
                        name="mode"
                        type="text"
                        value={formData.mode}
                        onChange={handleInputChange}
                        placeholder="SSB, CW, FT8"
                        className="bg-white/80"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rst_sent">RST Sent</Label>
                      <Input
                        id="rst_sent"
                        name="rst_sent"
                        type="text"
                        value={formData.rst_sent}
                        onChange={handleInputChange}
                        placeholder="59"
                        className="bg-white/80"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rst_received">RST Received</Label>
                      <Input
                        id="rst_received"
                        name="rst_received"
                        type="text"
                        value={formData.rst_received}
                        onChange={handleInputChange}
                        placeholder="59"
                        className="bg-white/80"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.message')} *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-white/80"
                    placeholder="Your message or QSL request details..."
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="small" className="mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.submit')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Radio className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Callsign</div>
                    <div className="font-semibold text-gray-900">4K6AG</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-semibold text-gray-900">4k6ag@example.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">QTH</div>
                    <div className="font-semibold text-gray-900">Baku, Azerbaijan</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Operating Hours</div>
                    <div className="font-semibold text-gray-900">15:00 - 21:00 UTC</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QSL Information */}
            <Card className="border-2 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-xl">QSL Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">QSL Manager:</span>
                  <Badge variant="secondary">Direct</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">LoTW:</span>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">eQSL:</span>
                  <Badge variant="default" className="bg-blue-600">Supported</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Bureau:</span>
                  <Badge variant="outline">Available</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Operating Schedule */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Operating Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span className="font-medium">16:00 - 20:00 UTC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Weekends:</span>
                    <span className="font-medium">08:00 - 22:00 UTC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Contests:</span>
                    <span className="font-medium">24/7 Activity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;