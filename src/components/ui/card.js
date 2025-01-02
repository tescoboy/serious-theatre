import React from 'react';

// Card Component
export const Card = ({ children, className }) => {
  return (
    <div
      className={`border border-gray-300 rounded-md shadow-md p-4 bg-white ${className}`}
    >
      {children}
    </div>
  );
};

// CardHeader Component
export const CardHeader = ({ children, className }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

// CardTitle Component
export const CardTitle = ({ children, className }) => {
  return (
    <h2 className={`text-lg font-bold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
};

// CardContent Component
export const CardContent = ({ children, className }) => {
  return (
    <div className={`text-gray-600 ${className}`}>
      {children}
    </div>
  );
};
