import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="p-12">
      <div className="relative flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 animate-pulse">Tracking IP location...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;