export interface SpaceItem {
  id: string;
  name: string;
  quantity: number;
  panosPerSpace: number;
  pricePerPano: number;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export interface InteractiveFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
  included?: boolean;
}

export interface HostingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface QuoteData {
  spaces: SpaceItem[];
  addOns: AddOn[];
  features: InteractiveFeature[];
  hostingPlan: HostingPlan | null;
  clientInfo: {
    schoolName: string;
    contactName: string;
    email: string;
    ccEmail?: string;
    phone: string;
    notes: string;
  };
}
