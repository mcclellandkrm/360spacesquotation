import React from 'react';
import { Button } from './ui/button';
import { useAppContext } from '@/contexts/AppContext';
import type { QuoteData } from '@/types/quote';

interface ClientFormProps {
  clientInfo: {
    schoolName: string;
    contactName: string;
    email: string;
    phone: string;
    notes: string;
  };
  onUpdateClientInfo: (info: any) => void;
  quoteData: QuoteData;
}

export default function ClientForm({ clientInfo, onUpdateClientInfo, quoteData }: ClientFormProps) {
  const { saveQuote, loading } = useAppContext();

  const handleChange = (field: string, value: string) => {
    onUpdateClientInfo({ ...clientInfo, [field]: value });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!clientInfo.schoolName || !clientInfo.contactName || !clientInfo.email) {
      alert('Please fill in all required fields');
      return;
    }

    // Save to Supabase
    const result = await saveQuote(quoteData);
    if (result.success) {
      // Quote saved successfully
      console.log('Quote saved with ID:', result.id);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Your Details</h3>
      <p className="text-gray-600">Help us personalize your quote</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School/Venue Name *
          </label>
          <input
            type="text"
            value={clientInfo.schoolName}
            onChange={(e) => handleChange('schoolName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
            placeholder="St. Mary's Primary School"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Name *
          </label>
          <input
            type="text"
            value={clientInfo.contactName}
            onChange={(e) => handleChange('contactName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
            placeholder="John Smith"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={clientInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
            placeholder="john@school.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CC Email Address
          </label>
          <input
            type="email"
            value={clientInfo.ccEmail || ''}
            onChange={(e) => handleChange('ccEmail', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
            placeholder="Optional CC recipient"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={clientInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
            placeholder="+44 1234 567890"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={clientInfo.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
          placeholder="Any special requirements or questions..."
        />
      </div>

      <div className="mt-6">
        <Button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full md:w-auto"
        >
          {loading ? 'Saving...' : 'Save Quote'}
        </Button>
      </div>
    </div>
  );
}
