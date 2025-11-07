import React from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: 'primary-school',
    name: 'Primary School',
    description: 'Predefined setup including classrooms, hall, library, and outdoor areas',
    image: 'https://d64gsuwffb70l.cloudfront.net/690d303a3650ca22a9f140a3_1762472042264_6a68668a.webp'
  },
  {
    id: 'secondary-school',
    name: 'Secondary/Grammar School',
    description: 'Start with a blank canvas and build your custom school tour',
    image: 'https://d64gsuwffb70l.cloudfront.net/690d303a3650ca22a9f140a3_1762472044670_03442cff.webp'
  },
  {
    id: 'custom-venue',
    name: 'Other Educational Venue',
    description: 'Custom virtual tour for colleges, universities, or specialized facilities',
    image: 'https://d64gsuwffb70l.cloudfront.net/690d303a3650ca22a9f140a3_1762472043805_b1498a52.webp'
  }
];

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start with a Template</h2>
          <p className="text-xl text-gray-600">Or build your custom quote from scratch</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {templates.map(template => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <button className="w-full bg-[#14b8a6] hover:bg-[#0f9b8e] text-white py-2 rounded-lg font-semibold transition-colors">
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
