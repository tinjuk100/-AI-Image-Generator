import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      <p className="ml-3 text-lg text-gray-400">กำลังสร้างสรรค์ภาพ...</p>
    </div>
  );
};

export default LoadingSpinner;