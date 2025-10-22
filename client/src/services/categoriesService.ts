import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/src/config/firebase';
import type {} from '@/src/stores/categoriesStore';

export interface CategoryDoc {
  id: string;
  name: string;
  image_url?: string;
  description?: string;
  created_at?: any;
}

export async function fetchCategories(): Promise<CategoryDoc[]> {
  const col = collection(db, 'categories');
  const q = query(col, orderBy('name'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}
