import React from 'react';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <p className="text-2xl mt-4">Access Denied</p>
      <p className="mt-2 text-gray-500">You do not have permission to view this page.</p>
    </div>
  );
};

export default Forbidden;