import React from 'react';
import { SpaceItem, AddOn, InteractiveFeature, HostingPlan } from '../types/quote';
import { calculateSpacePrice } from '../data/pricingData';

interface QuoteSummaryProps {
  spaces: SpaceItem[];
  addOns: AddOn[];
  features: InteractiveFeature[];
  hostingPlan: HostingPlan | null;
}

export default function QuoteSummary({ spaces, addOns, features, hostingPlan }: QuoteSummaryProps) {
  const spacesTotal = spaces.reduce((sum, space) =>
    sum + (space.quantity * calculateSpacePrice(space.panosPerSpace)), 0
  );
  
  const addOnsTotal = addOns.filter(a => a.selected).reduce((sum, addon) => sum + addon.price, 0);
  const featuresTotal = features.filter(f => f.selected).reduce((sum, feature) => sum + feature.price, 0);
  const hostingTotal = hostingPlan?.price || 0;
  
  const subtotal = spacesTotal + addOnsTotal + featuresTotal;
  const total = subtotal + hostingTotal;

  const totalPanos = spaces.reduce((sum, space) => sum + (space.quantity * space.panosPerSpace), 0);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Quote Summary</h3>
      
      <div className="space-y-4 mb-6">
        {spaces.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Spaces ({totalPanos} panoramas)</h4>
            {spaces.map(space => (
              <div key={space.id} className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{space.name} x{space.quantity} ({space.panosPerSpace} panos)</span>
                <span>£{space.quantity * calculateSpacePrice(space.panosPerSpace)}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-gray-900 mt-2 pt-2 border-t">
              <span>Spaces Total</span>
              <span>£{spacesTotal}</span>
            </div>
          </div>
        )}

        {addOns.some(a => a.selected) && (
          <div className="pt-4 border-t">
            <h4 className="font-semibold text-gray-900 mb-2">Add-Ons</h4>
            {addOns.filter(a => a.selected).map(addon => (
              <div key={addon.id} className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{addon.name}</span>
                <span>£{addon.price}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-gray-900 mt-2 pt-2 border-t">
              <span>Add-Ons Total</span>
              <span>£{addOnsTotal}</span>
            </div>
          </div>
        )}

        {features.some(f => f.selected) && (
          <div className="pt-4 border-t">
            <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
            {features.filter(f => f.selected).map(feature => (
              <div key={feature.id} className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{feature.name}</span>
                <span>£{feature.price}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-gray-900 mt-2 pt-2 border-t">
              <span>Features Total</span>
              <span>£{featuresTotal}</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t-2 border-gray-300 pt-4 mb-4">
        <div className="flex justify-between text-lg font-semibold text-gray-900 mb-2">
          <span>Setup Cost</span>
          <span>£{subtotal}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-green-600">
          <span>First Year Hosting</span>
          <span>FREE</span>
        </div>
      </div>

      <div className="bg-[#14b8a6] text-white rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total Investment</span>
          <span className="text-3xl font-bold">£{subtotal}</span>
        </div>
        <p className="text-xs text-white/80 mt-2">First year hosting included at no extra cost</p>
      </div>
    </div>
  );
}
