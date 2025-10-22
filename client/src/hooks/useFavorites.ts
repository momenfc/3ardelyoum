import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/src/config/firebase';
import { useAuthUser } from '@/src/hooks/useAuthUser';

export function useFavorites() {
  const user = useAuthUser();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    setError('');
    getDoc(doc(db, 'users', user.uid))
      .then(snapshot => {
        const favs = snapshot.exists() ? snapshot.data().favorites || [] : [];
        setFavorites(favs);
      })
      .catch(err => {
        console.error('Error fetching user favorites:', err);
        setError('حدث خطأ أثناء تحميل المفضلة.');
        setFavorites([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const toggleFavorite = async (offerId: string) => {
    if (!user) return;
    setError('');
    setFavorites(prev => {
      const updated = prev.includes(offerId) ? prev.filter(id => id !== offerId) : [...prev, offerId];

      const userRef = doc(db, 'users', user.uid);
      updateDoc(userRef, {
        favorites: updated.includes(offerId) ? arrayUnion(offerId) : arrayRemove(offerId),
      }).catch(err => {
        console.error('Error updating favorites:', err);
        setError('حدث خطأ أثناء تحديث المفضلة.');
        // Revert on error
        setFavorites(prev);
      });

      return updated;
    });
  };

  return { favorites, loading, error, toggleFavorite };
}
