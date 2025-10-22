import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export function observeAuthState(callback: (user: any | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Check if user exists in Firestore
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
      favorites: [],
    });
  }

  return user;
}

export async function register(email: string, password: string) {
  // 1️⃣ Create user in Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 2️⃣ Create user document in Firestore
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    createdAt: new Date(),
    favorites: [],
    notificationsEnabled: true, // optional: default settings
  });

  // 3️⃣ Return user object
  return user;
}

export async function logout() {
  return signOut(auth);
}
