import { create } from 'zustand';

interface Offer {
  id: string;
  title: string;
  image?: string;
  discount: number;
  price_before?: number;
  price_after?: number;
  category?: string;
  description?: string;
  valid_until?: any;
}

interface OffersState {
  offers: Offer[];
  setOffers: (offers: Offer[]) => void;
  addOffer: (offer: Offer) => void;
  removeOffer: (id: string) => void;
}

export const useOffersStore = create<OffersState>(set => ({
  offers: [],
  setOffers: offers => set({ offers }),
  addOffer: offer => set(state => ({ offers: [...state.offers, offer] })),
  removeOffer: id => set(state => ({ offers: state.offers.filter(o => o.id !== id) })),
}));
