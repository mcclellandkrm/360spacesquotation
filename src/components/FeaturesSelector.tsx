import React from 'react';
import { InteractiveFeature } from '../types/quote';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';

interface FeaturesSelectorProps {
  features: InteractiveFeature[];
  onUpdateFeatures: (features: InteractiveFeature[]) => void;
}

export default function FeaturesSelector({ features, onUpdateFeatures }: FeaturesSelectorProps) {
  const handleToggle = (id: string) => {
    onUpdateFeatures(features.map(feature => 
      feature.id === id ? { ...feature, selected: !feature.selected } : feature
    ));
  };

  const includedFeatures = features.filter(f => f.included);
  const optionalFeatures = features.filter(f => !f.included);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Interactive Features</h3>
      <p className="text-gray-600">Add engaging elements to your virtual tour</p>

      {includedFeatures.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">FREE</span>
            Included Features
          </h4>
          {includedFeatures.map(feature => (
            <div
              key={feature.id}
              onClick={() => handleToggle(feature.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between ${
                feature.selected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-green-600">Included</span>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  feature.selected ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}>
                  {feature.selected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {optionalFeatures.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-900 mt-6">Optional Features</h4>
          {optionalFeatures.map(feature => (
            <div
              key={feature.id}
              onClick={() => handleToggle(feature.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between ${
                feature.selected ? 'border-[#14b8a6] bg-[#14b8a6]/5' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                  {feature.id === 'news' && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <button type="button" aria-label="News integration information" className="p-1 rounded-full hover:bg-[#14b8a6]/10 transition-colors">
                            <InfoCircledIcon className="h-5 w-5 text-[#14b8a6]" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Feature details coming soon. Contact us for more information about news integration options.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-[#14b8a6]">£{feature.price}</span>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  feature.selected ? 'bg-[#14b8a6] border-[#14b8a6]' : 'border-gray-300'
                }`}>
                  {feature.selected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
