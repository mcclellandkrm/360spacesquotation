import React from 'react';
import { HostingPlan } from '../types/quote';

interface HostingSelectorProps {
  plans: HostingPlan[];
  selectedPlan: HostingPlan | null;
  onSelectPlan: (plan: HostingPlan) => void;
}

export default function HostingSelector({ plans, selectedPlan, onSelectPlan }: HostingSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Annual Hosting</h3>
      <p className="text-gray-600">Choose your hosting plan (billed annually)</p>
      
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map(plan => (
          <div
            key={plan.id}
            onClick={() => onSelectPlan(plan)}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              selectedPlan?.id === plan.id ? 'border-[#14b8a6] bg-[#14b8a6]/5 ring-2 ring-[#14b8a6]/20' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-semibold text-gray-900 text-lg mb-2">{plan.name}</h4>
            <div className="mb-4">
              <span className="text-3xl font-bold text-[#14b8a6]">£{plan.price}</span>
              <span className="text-gray-600">/year</span>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
