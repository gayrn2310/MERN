import React from 'react';
import { ZapIcon } from 'lucide-react'; 

const RateLimitedUI = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className=" p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-4">
          <ZapIcon className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-600 mb-2 text-primary">Rate Limit Exceeded</h1>
        <p className="text-gray-700 mb-3">
          You have exceeded the allowed number of requests. Please try again later.
        </p>
        <p className="text-gray-500 text-sm">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default RateLimitedUI;
