import React, { useState, useRef } from 'react';
import Hero from './Hero';
import TemplateSelector from './TemplateSelector';
import SpaceSelector from './SpaceSelector';
import AddOnsSelector from './AddOnsSelector';
import FeaturesSelector from './FeaturesSelector';
import QuoteSummary from './QuoteSummary';
import ClientForm from './ClientForm';
import ShareQuote from './ShareQuote';
import { QuoteData, SpaceItem, AddOn, InteractiveFeature } from '../types/quote';
import { spaceTypes, addOns as addOnsData, features as featuresData, calculateSpacePrice } from '../data/pricingData';

const AppLayout: React.FC = () => {
  const quoteBuilderRef = useRef<HTMLDivElement>(null);
  
  const [spaces, setSpaces] = useState<SpaceItem[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>(
    addOnsData.map(a => ({ ...a, selected: false }))
  );
  const [features, setFeatures] = useState<InteractiveFeature[]>(
    featuresData.map(f => ({ ...f, selected: false }))
  );
  const [clientInfo, setClientInfo] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleGetStarted = () => {
    quoteBuilderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTemplate = (templateId: string) => {
    if (templateId === 'primary-school') {
      setSpaces([
        { id: 'classroom', name: 'Classroom', quantity: 5, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'hall', name: 'Assembly/Sports Hall', quantity: 1, panosPerSpace: 3, pricePerPano: 50 },
        { id: 'it-suite', name: 'IT Suite', quantity: 1, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'library', name: 'Library', quantity: 1, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'reception', name: 'Reception/Main Entrance', quantity: 1, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'cloakroom', name: 'Cloakroom Area', quantity: 1, panosPerSpace: 1, pricePerPano: 40 },
        { id: 'playground', name: 'Playground/Outdoor Area', quantity: 1, panosPerSpace: 3, pricePerPano: 50 },
        { id: 'garden', name: 'Garden/Nature Area', quantity: 1, panosPerSpace: 2, pricePerPano: 45 }
      ]);
      setAddOns(addOns.map(a =>
        a.id === 'drone' || a.id === 'aerial' ? { ...a, selected: true } : a
      ));
      setFeatures(features.map(f => f.included ? { ...f, selected: true } : f));
    } else if (templateId === 'secondary-school') {
      setSpaces([
        { id: 'classroom', name: 'Classroom', quantity: 10, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'hall', name: 'Assembly/Sports Hall', quantity: 2, panosPerSpace: 3, pricePerPano: 50 },
        { id: 'it-suite', name: 'IT Suite', quantity: 2, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'library', name: 'Library', quantity: 1, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'canteen', name: 'Canteen/Dining Area', quantity: 1, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'reception', name: 'Reception/Main Entrance', quantity: 1, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'office', name: 'Office/Staff Room', quantity: 1, panosPerSpace: 1, pricePerPano: 45 },
        { id: 'playground', name: 'Playground/Outdoor Area', quantity: 2, panosPerSpace: 3, pricePerPano: 50 }
      ]);
      setAddOns(addOns.map(a =>
        a.id === 'drone' || a.id === 'aerial' ? { ...a, selected: true } : a
      ));
      setFeatures(features.map(f => ({ ...f, selected: true })));
    } else if (templateId === 'custom-venue') {
      setSpaces([
        { id: 'reception', name: 'Reception/Main Entrance', quantity: 1, panosPerSpace: 2, pricePerPano: 45 },
        { id: 'hall', name: 'Assembly/Sports Hall', quantity: 1, panosPerSpace: 3, pricePerPano: 50 },
        { id: 'corridor', name: 'Corridor/Hallway', quantity: 2, panosPerSpace: 2, pricePerPano: 40 }
      ]);
      setAddOns(addOns.map(a => ({ ...a, selected: false })));
      setFeatures(features.map(f => f.included ? { ...f, selected: true } : f));
    }
    quoteBuilderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const spacesTotal = spaces.reduce((sum, space) =>
    sum + (space.quantity * calculateSpacePrice(space.panosPerSpace)), 0
  );
  const addOnsTotal = addOns.filter(a => a.selected).reduce((sum, addon) => sum + addon.price, 0);
  const featuresTotal = features.filter(f => f.selected).reduce((sum, feature) => sum + feature.price, 0);
  const total = spacesTotal + addOnsTotal + featuresTotal;

  const quoteData: QuoteData = { spaces, addOns, features, hostingPlan: null, clientInfo };

  return (
    <div className="min-h-screen bg-white">
      <Hero onGetStarted={handleGetStarted} />
      <TemplateSelector onSelectTemplate={handleSelectTemplate} />
      
      <div ref={quoteBuilderRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <SpaceSelector spaces={spaces} onUpdateSpaces={setSpaces} />
            <AddOnsSelector addOns={addOns} onUpdateAddOns={setAddOns} />
            <FeaturesSelector features={features} onUpdateFeatures={setFeatures} />

            {/* Hosting Information */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Annual Hosting</h3>
              <div className="border-2 border-green-500 bg-green-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded mr-2">INCLUDED</span>
                      First Year Free
                    </h4>
                    <p className="text-gray-600 mb-4">Professional hosting included for your first year</p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>SSL certificate & security</span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>Daily backups & unlimited bandwidth</span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>Analytics dashboard & email support</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-4">Renewal pricing will be calculated based on final project size</p>
                  </div>
                </div>
              </div>
            </div>

            <ClientForm 
              clientInfo={clientInfo} 
              onUpdateClientInfo={setClientInfo}
              quoteData={quoteData}
            />
            <ShareQuote quoteData={quoteData} total={total} />
          </div>
          
          <div className="lg:col-span-1">
            <QuoteSummary spaces={spaces} addOns={addOns} features={features} hostingPlan={null} />
          </div>
        </div>
      </div>

      <footer className="bg-[#1e3a5f] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Virtual Tour Pro</h3>
              <p className="text-gray-300">Professional virtual tour services for schools, businesses, and venues.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>360° Photography</li>
                <li>Drone & Aerial Shots</li>
                <li>Custom Branding</li>
                <li>Interactive Features</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-300">Get in touch for a personalized consultation</p>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Virtual Tour Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
