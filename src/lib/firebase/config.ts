import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  type Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA2FLZX04W72LoRzKZookE9Pm1Nv316TDI",
  authDomain: "karate-opam.firebaseapp.com",
  projectId: "karate-opam",
  storageBucket: "karate-opam.firebasestorage.app",
  messagingSenderId: "400165846080",
  appId: "1:400165846080:web:1081c55ec33cf02c8173a5",
  measurementId: "G-SJGH0R1E7B"
};

// Initialize Firebase (singleton)
let app: FirebaseApp;
let auth: Auth;

if (typeof window !== 'undefined') {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
}

export { auth, onAuthStateChanged };

export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<User> {
  console.log('🔓 Opening Google Sign-In popup...');
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  
  console.log('✅ Google Sign-In successful for:', user.email);
  
  // Salvar ID token em cookie para o proxy/middleware
  const idToken = await user.getIdToken();
  console.log('🎫 ID Token obtained, saving to cookie...');
  console.log('🍪 Token length:', idToken.length);
  
  document.cookie = `__session=${idToken}; path=/; max-age=3600; SameSite=Lax`;
  console.log('✅ Cookie saved: __session');
  
  // Verificar se o cookie foi realmente salvo
  const cookieCheck = document.cookie.includes('__session=');
  console.log('🔍 Cookie verification:', cookieCheck ? 'FOUND' : 'NOT FOUND');
  
  return user;
}

export async function signOut(): Promise<void> {
  // Limpar cookie do token
  document.cookie = '__session=; path=/; max-age=0';
  await firebaseSignOut(auth);
}

export async function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}
