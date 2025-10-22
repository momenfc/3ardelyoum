import { useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '@/src/config/firebase';
import { useUserStore } from '@/src/stores/userStore';

export function useSyncFavorites() {
  const uid = useUserStore(state => state.uid);
  const favorites = useUserStore(state => state.favorites);
  const setFavorites = useUserStore(state => state.setFavorites);

  // Sync favorites from Firestore to Zustand when user logs in
  useEffect(() => {
    if (!uid) return;

    getDoc(doc(db, 'users', uid))
      .then(snapshot => {
        if (snapshot.exists()) {
          const favs = snapshot.data().favorites || [];
          setFavorites(favs);
        }
      })
      .catch(err => {
        console.error('Error fetching favorites from Firestore:', err);
      });
  }, [uid, setFavorites]);

  // Sync favorites changes to Firestore
  const syncToFirestore = async (offerId: string, isAdding: boolean) => {
    if (!uid) return;

    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        favorites: isAdding ? arrayUnion(offerId) : arrayRemove(offerId),
      });
    } catch (err) {
      console.error('Error syncing favorites to Firestore:', err);
    }
  };

  return { syncToFirestore };
}
