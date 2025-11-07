import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import type { QuoteData } from '@/types/quote';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  saveQuote: (quoteData: QuoteData) => Promise<{ success: boolean; id?: string; error?: string }>;
  loading: boolean;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  saveQuote: async () => ({ success: false }),
  loading: false,
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const saveQuote = async (quoteData: QuoteData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          id: uuidv4(),
          school_name: quoteData.clientInfo.schoolName,
          contact_name: quoteData.clientInfo.contactName,
          email: quoteData.clientInfo.email,
          phone: quoteData.clientInfo.phone,
          notes: quoteData.clientInfo.notes,
          spaces: quoteData.spaces,
          add_ons: quoteData.addOns,
          features: quoteData.features,
          hosting_plan: quoteData.hostingPlan
        })
        .select()
        .single();

      if (error) throw error;

      // Send confirmation emails
      const { error: emailError } = await supabase.functions.invoke('send-quote-emails', {
        body: {
          quoteData: quoteData, // Pass the entire quote data object
          clientEmail: quoteData.clientInfo.email
        }
      });

      if (emailError) {
        console.error('Error sending emails:', emailError);
        toast({
          title: "Quote Saved",
          description: "Quote saved but there was an issue sending confirmation emails.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Quote Saved!",
          description: "Your quote has been saved and confirmation emails have been sent.",
        });
      }

      return { success: true, id: data.id };
    } catch (error) {
      console.error('Error saving quote:', error);
      console.error('Detailed error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save quote. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        saveQuote,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
