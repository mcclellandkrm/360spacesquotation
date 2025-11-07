import React from 'react';
import { AddOn } from '../types/quote';

interface AddOnsSelectorProps {
  addOns: AddOn[];
  onUpdateAddOns: (addOns: AddOn[]) => void;
}

export default function AddOnsSelector({ addOns, onUpdateAddOns }: AddOnsSelectorProps) {
  const handleToggle = (id: string) => {
    onUpdateAddOns(addOns.map(addon => 
      addon.id === id ? { ...addon, selected: !addon.selected } : addon
    ));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Premium Add-Ons</h3>
      <p className="text-gray-600">Enhance your tour with professional extras</p>
      
      <div className="grid md:grid-cols-3 gap-4">
        {addOns.map(addon => (
          <div
            key={addon.id}
            onClick={() => handleToggle(addon.id)}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              addon.selected ? 'border-[#14b8a6] bg-[#14b8a6]/5' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{addon.name}</h4>
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                addon.selected ? 'bg-[#14b8a6] border-[#14b8a6]' : 'border-gray-300'
              }`}>
                {addon.selected && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
            <p className="text-2xl font-bold text-[#14b8a6]">£{addon.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
