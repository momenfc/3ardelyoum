import { db } from '@/src/config/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';

export interface OfferDoc {
  id?: string;
  title: string;
  image?: string;
  discount: number;
  price_before?: number;
  price_after?: number;
  category?: string;
  description?: string;
  valid_until?: any;
}

export async function fetchOffers(): Promise<OfferDoc[]> {
  const col = collection(db, 'offers');
  const q = query(col, orderBy('title'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}

export async function addOffer(offer: OfferDoc): Promise<string> {
  const col = collection(db, 'offers');
  const docRef = await addDoc(col, offer);
  return docRef.id;
}

export async function updateOffer(id: string, offer: Partial<OfferDoc>): Promise<void> {
  const docRef = doc(db, 'offers', id);
  await updateDoc(docRef, offer);
}

export async function deleteOffer(id: string): Promise<void> {
  const docRef = doc(db, 'offers', id);
  await deleteDoc(docRef);
}
