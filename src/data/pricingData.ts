export const spaceTypes = [
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
