import React from 'react';
import { Card, CardContent } from './ui/card';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = "default", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-6 h-6", 
    large: "w-8 h-8"
  };

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin ${className}`} />
  );
};

export const LoadingCard = ({ title = "Loading...", className = "" }) => {
  return (
    <Card className={`border-2 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="large" className="text-blue-600 mb-4" />
        <p className="text-gray-600 font-medium">{title}</p>
      </CardContent>
    </Card>
  );
};

export const LoadingSection = ({ title = "Loading content...", height = "200px" }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
      style={{ minHeight: height }}
    >
      <LoadingSpinner size="large" className="text-blue-600 mb-4" />
      <p className="text-gray-600 font-medium">{title}</p>
    </div>
  );
};

export const LoadingSkeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-300 rounded h-4 w-full mb-2"></div>
      <div className="bg-gray-300 rounded h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-300 rounded h-4 w-1/2"></div>
    </div>
  );
};

export const ErrorMessage = ({ error, onRetry, className = "" }) => {
  return (
    <Card className={`border-2 border-red-200 bg-red-50 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="text-red-600 text-center mb-4">
          <p className="font-semibold mb-2">Error loading data</p>
          <p className="text-sm text-red-500">{error}</p>
        </div>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default {
  LoadingSpinner,
  LoadingCard,
  LoadingSection,
  LoadingSkeleton,
  ErrorMessage
};