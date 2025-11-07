import React from 'react';
import { SpaceItem } from '../types/quote';
import { spaceTypes } from '../data/pricingData';
import { QuantitySelect, PanoSelect } from './ui/quantity-select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';

interface SpaceSelectorProps {
  spaces: SpaceItem[];
  onUpdateSpaces: (spaces: SpaceItem[]) => void;
}

export default function SpaceSelector({ spaces, onUpdateSpaces }: SpaceSelectorProps) {
  const handleToggleSpace = (spaceId: string) => {
    const existing = spaces.find(s => s.id === spaceId);
    if (existing) {
      onUpdateSpaces(spaces.filter(s => s.id !== spaceId));
    } else {
      const spaceType = spaceTypes.find(st => st.id === spaceId);
      if (spaceType) {
        onUpdateSpaces([...spaces, {
          id: spaceType.id,
          name: spaceType.name,
          quantity: 1,
          panosPerSpace: spaceType.defaultPanos,
          pricePerPano: spaceType.pricePerPano
        }]);
      }
    }
  };

  const handleUpdateQuantity = (spaceId: string, quantity: number) => {
    onUpdateSpaces(spaces.map(s => 
      s.id === spaceId ? { ...s, quantity: Math.max(1, quantity) } : s
    ));
  };

  const handleUpdatePanos = (spaceId: string, panos: number) => {
    onUpdateSpaces(spaces.map(s => 
      s.id === spaceId ? { ...s, panosPerSpace: Math.max(1, panos) } : s
    ));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Select Spaces</h3>
      <div className="flex items-center">
        <p className="text-gray-600">Choose the areas you want to include in your virtual tour</p>
        <p className="ml-2 text-[#14b8a6] font-semibold flex items-center">
          £45 first pano, £35 each additional
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" aria-label="Pricing information" className="ml-2 p-1 rounded-full hover:bg-[#14b8a6]/10 transition-colors">
                  <InfoCircledIcon className="h-5 w-5 text-[#14b8a6]" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Each space is priced at £45 for the first panorama and £35 for each additional panorama. Price includes full HDR imagery.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {spaceTypes.map(spaceType => {
          const selected = spaces.find(s => s.id === spaceType.id);
          return (
            <div
              key={spaceType.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selected ? 'border-[#14b8a6] bg-[#14b8a6]/5' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleToggleSpace(spaceType.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{spaceType.name}</h4>
                </div>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  selected ? 'bg-[#14b8a6] border-[#14b8a6]' : 'border-gray-300'
                }`}>
                  {selected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>
              </div>
              
              {selected && (
                <div className="mt-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-3">
                    <label className="text-sm text-gray-700 w-24">Quantity:</label>
                    <QuantitySelect
                      value={selected.quantity}
                      onChange={(value) => handleUpdateQuantity(spaceType.id, value)}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="text-sm text-gray-700 w-24">Panos each:</label>
                    <PanoSelect
                      value={selected.panosPerSpace}
                      onChange={(value) => handleUpdatePanos(spaceType.id, value)}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
