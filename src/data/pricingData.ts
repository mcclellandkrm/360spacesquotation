export const spaceTypes = [
  // Common spaces
  { id: 'classroom', name: 'Classroom', defaultPanos: 2, pricePerPano: 45 },
  { id: 'hall', name: 'Assembly/Sports Hall', defaultPanos: 3, pricePerPano: 50 },
  { id: 'canteen', name: 'Canteen/Dining Area', defaultPanos: 2, pricePerPano: 45 },
  { id: 'library', name: 'Library', defaultPanos: 2, pricePerPano: 45 },
  { id: 'it-suite', name: 'IT Suite', defaultPanos: 2, pricePerPano: 45 },
  { id: 'reception', name: 'Reception/Main Entrance', defaultPanos: 2, pricePerPano: 45 },
  { id: 'cloakroom', name: 'Cloakroom Area', defaultPanos: 1, pricePerPano: 40 },
  { id: 'playground', name: 'Playground/Outdoor Area', defaultPanos: 3, pricePerPano: 50 },
  { id: 'garden', name: 'Garden/Nature Area', defaultPanos: 2, pricePerPano: 45 },
  { id: 'corridor', name: 'Corridor/Hallway', defaultPanos: 2, pricePerPano: 40 },
  { id: 'office', name: 'Office/Staff Room', defaultPanos: 1, pricePerPano: 45 },

  // Primary school specific
  { id: 'sensory-room', name: 'Sensory Room', defaultPanos: 1, pricePerPano: 45 },
  { id: 'art-room', name: 'Art Room', defaultPanos: 2, pricePerPano: 45 },
  { id: 'music-room', name: 'Music Room', defaultPanos: 1, pricePerPano: 45 },

  // Secondary school specific - Science
  { id: 'physics-lab', name: 'Physics Lab', defaultPanos: 2, pricePerPano: 45 },
  { id: 'chemistry-lab', name: 'Chemistry Lab', defaultPanos: 2, pricePerPano: 45 },
  { id: 'biology-lab', name: 'Biology Lab', defaultPanos: 2, pricePerPano: 45 },
  { id: 'science-lab', name: 'Science Lab (General)', defaultPanos: 2, pricePerPano: 45 },

  // Secondary school specific - Subjects
  { id: 'stem-lab', name: 'STEM Lab', defaultPanos: 2, pricePerPano: 45 },
  { id: 'dt-workshop', name: 'Design & Technology Workshop', defaultPanos: 2, pricePerPano: 45 },
  { id: 'languages-lab', name: 'Languages Lab', defaultPanos: 2, pricePerPano: 45 },
  { id: 'history-room', name: 'History Room', defaultPanos: 2, pricePerPano: 45 },
  { id: 'geography-room', name: 'Geography Room', defaultPanos: 2, pricePerPano: 45 },
  { id: 'art-studio', name: 'Art Studio', defaultPanos: 2, pricePerPano: 45 },
  { id: 'drama-studio', name: 'Drama Studio', defaultPanos: 2, pricePerPano: 45 },
  { id: 'music-studio', name: 'Music Studio', defaultPanos: 2, pricePerPano: 45 },
  { id: '6th-form', name: '6th Form Area', defaultPanos: 2, pricePerPano: 45 },
  { id: 'sports-facilities', name: 'Sports Facilities', defaultPanos: 3, pricePerPano: 50 },

  { id: 'other', name: 'Other Space', defaultPanos: 1, pricePerPano: 45 },
];

export const addOns = [
  { id: 'drone', name: 'Drone Footage', description: '4-6 aerial shots', price: 150 },
  { id: 'aerial', name: 'Aerial Photography', description: '10-15 high-res photos', price: 120 },
  { id: 'headshots', name: 'Staff Headshots Package', description: 'Professional headshots for staff members', price: 250 },
  { id: 'branding', name: 'Custom Branding Package', description: 'Logo, fonts, colors', price: 200 },
];

export const features = [
  // Included features (price set to 0)
  { id: 'welcome', name: "Principal's Welcome", description: 'Video or text message', price: 0, included: true },
  { id: 'map', name: 'Navigation/Location Map', description: 'Interactive floor plan', price: 0, included: true },
  { id: 'social', name: 'Social Media Links', description: 'Integrated social buttons', price: 0, included: true },
  // Optional features
  { id: 'gallery', name: 'Photo Gallery', description: '20-30 high quality images', price: 80, included: false },
  { id: 'news', name: 'News Integration', description: 'Link to website news', price: 200, included: false },
];

// Function to calculate price per space with tiered pricing
// £45 for first panorama, £35 for each additional panorama
export const calculateSpacePrice = (panosPerSpace: number): number => {
  if (panosPerSpace === 0) return 0;
  if (panosPerSpace === 1) return 45;
  return 45 + ((panosPerSpace - 1) * 35);
};

// Function to calculate hosting price based on number of panoramas
export const calculateHostingPrice = (totalPanos: number): number => {
  const estimatedSizeMB = totalPanos * 15; // Assuming ~15MB per panorama
  if (estimatedSizeMB <= 500) return 90;
  if (estimatedSizeMB <= 1000) return 115;
  return 140;
};

export const hostingPlans = [
  {
    id: 'basic',
    name: 'Basic Hosting',
    price: 90,
    features: [
      'Up to 500MB storage',
      'SSL certificate & security',
      'Daily backups',
      'Email support',
      'Analytics dashboard',
      'Unlimited bandwidth'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Hosting',
    price: 115,
    features: [
      'Up to 1GB storage',
      'SSL certificate & security',
      'Daily backups',
      'Priority email support',
      'Analytics dashboard',
      'Unlimited bandwidth',
      'CDN delivery'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Hosting',
    price: 140,
    features: [
      'Unlimited storage',
      'SSL certificate & security',
      'Daily backups',
      '24/7 priority support',
      'Advanced analytics dashboard',
      'Unlimited bandwidth',
      'CDN delivery',
      'Performance optimization'
    ]
  }
];
