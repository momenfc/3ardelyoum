import { create } from 'zustand';

interface Category {
  id: string;
  name: string;
  image_url?: string;
  description?: string;
  created_at?: any;
}

interface CategoriesState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  removeCategory: (id: string) => void;
}

export const useCategoriesStore = create<CategoriesState>(set => ({
  categories: [],
  setCategories: categories => set({ categories }),
  addCategory: category => set(state => ({ categories: [...state.categories, category] })),
  removeCategory: id => set(state => ({ categories: state.categories.filter(c => c.id !== id) })),
}));
