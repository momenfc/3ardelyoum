import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  uid: string | null;
  email: string | null;
  isAdmin?: boolean;
  favorites: string[];
  setUser: (uid: string, email: string, isAdmin?: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setFavorites: (favorites: string[]) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      uid: null,
      email: null,
      isAdmin: false,
      favorites: [],
      setUser: (uid: string, email: string, isAdmin: boolean = false) => {
        if (uid === 'tL39MJbS7qS982zALGpTd8eVzNI2') {
          isAdmin = true;
        }
        set({ uid, email, isAdmin });
      },
      setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
      setFavorites: (favorites: string[]) => set({ favorites }),
      addFavorite: (id: string) => set((state: UserState) => ({ favorites: [...state.favorites, id] })),
      removeFavorite: (id: string) => set((state: UserState) => ({ favorites: state.favorites.filter((fav: string) => fav !== id) })),
      clearUser: () => set({ uid: null, email: null, isAdmin: false, favorites: [] }),
    }),
    {
      name: 'user-store',
    }
  )
);
