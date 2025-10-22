import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/src/config/firebase';
import { useUserStore } from '@/src/stores/userStore';

export function useUserInfo() {
  const uid = useUserStore(s => s.uid);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    getDoc(doc(db, 'users', uid))
      .then(snap => setInfo(snap.exists() ? snap.data() : null))
      .finally(() => setLoading(false));
  }, [uid]);

  return { info, loading };
}
