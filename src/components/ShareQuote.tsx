import React from 'react';
import { QuoteData } from '../types/quote';

interface ShareQuoteProps {
  quoteData: QuoteData;
  total: number;
}

export default function ShareQuote({ quoteData, total }: ShareQuoteProps) {
  const generateQuoteText = () => {
    const lines = ['VIRTUAL TOUR QUOTE', ''];
    
    if (quoteData.clientInfo.schoolName) {
      lines.push(`For: ${quoteData.clientInfo.schoolName}`);
      lines.push('');
    }
    
    if (quoteData.spaces.length > 0) {
      lines.push('SPACES:');
      quoteData.spaces.forEach(space => {
        lines.push(`- ${space.name} x${space.quantity} (${space.panosPerSpace} panos) - £${space.quantity * space.panosPerSpace * space.pricePerPano}`);
      });
      lines.push('');
    }
    
    const selectedAddOns = quoteData.addOns.filter(a => a.selected);
    if (selectedAddOns.length > 0) {
      lines.push('ADD-ONS:');
      selectedAddOns.forEach(addon => {
        lines.push(`- ${addon.name} - £${addon.price}`);
      });
      lines.push('');
    }
    
    const selectedFeatures = quoteData.features.filter(f => f.selected);
    if (selectedFeatures.length > 0) {
      lines.push('FEATURES:');
      selectedFeatures.forEach(feature => {
        lines.push(`- ${feature.name} - £${feature.price}`);
      });
      lines.push('');
    }
    
    if (quoteData.hostingPlan) {
      lines.push(`HOSTING: ${quoteData.hostingPlan.name} - £${quoteData.hostingPlan.price}/year`);
      lines.push('');
    }
    
    lines.push(`TOTAL INVESTMENT: £${total}`);
    
    return lines.join('\n');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Virtual Tour Quote');
    const body = encodeURIComponent(generateQuoteText());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(generateQuoteText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generateQuoteText());
    alert('Quote copied to clipboard!');
  };

  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Share Your Quote</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleEmailShare}
          className="flex items-center space-x-2 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Email</span>
        </button>
        
        <button
          onClick={handleWhatsAppShare}
          className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>WhatsApp</span>
        </button>
        
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        </button>
      </div>
    </div>
  );
}
