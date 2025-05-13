// src/pages/ServerError.js
import React from 'react';

const ServerError = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-6xl font-bold text-yellow-600">500</h1>
      <p className="text-2xl mt-4">Internal Server Error</p>
      <p className="mt-2 text-gray-500">Something went wrong on our end. Please try again later.</p>
    </div>
  );
};

export default ServerError;
