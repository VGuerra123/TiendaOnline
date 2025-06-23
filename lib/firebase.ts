// lib/firebase.ts -----------------------------------------------------------
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth, Auth,
} from 'firebase/auth';
import { getFirestore, Firestore, setLogLevel } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!, // <- appspot.com
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// ────────────────────────────────────────────────────────────────────────────
// Inicializar sólo una vez
// ────────────────────────────────────────────────────────────────────────────
const app: FirebaseApp =
  getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Reducir verbosidad de Firestore en desarrollo
if (process.env.NODE_ENV === 'development') {
  setLogLevel('error'); // 'debug' | 'error' | 'silent'
}

// Analytics sólo en navegador y producción
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  isSupported()
    .then((ok) => { if (ok) analytics = getAnalytics(app); })
    .catch(() => { /* Analytics no disponible (p. ej. navegador sin cookies) */ });
}

export default app;
