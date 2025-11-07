import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Virtual Tour Pricing Calculator
            </h1>
            <p className="text-xl text-gray-200">
              Create your own transparent quotation for your school's custom virtual tour. Perfect for Primary, Secondary/Grammar Schools and other educational spaces.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-[#14b8a6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-lg">360° panoramic photography</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-[#14b8a6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-lg">Custom branding & navigation</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-[#14b8a6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-lg">Drone & aerial photography options</span>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-[#14b8a6] hover:bg-[#0f9b8e] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Get Your Quote Now
            </button>
          </div>
          
          <div className="relative">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/690d303a3650ca22a9f140a3_1762472042264_6a68668a.webp"
              alt="Virtual Tour Sample"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-[#14b8a6]">£45</div>
              <div className="text-sm text-gray-600">per panorama</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
