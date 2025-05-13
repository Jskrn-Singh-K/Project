// src/pages/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate=useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <p className="mt-2 text-gray-500">The page you are looking for doesn’t exist or has been moved.</p>
      <p onClick={()=>navigate("/Home")} className="mt-2 text-gray-900 bg-slate-400 p-3">Click here to redirect to Home Page</p>
    </div>
  );
};

export default NotFound;
