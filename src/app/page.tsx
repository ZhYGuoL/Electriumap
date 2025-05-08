'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import ImageUpload from '@/components/ImageUpload';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

interface Outlet {
  id: string;
  latitude: number;
  longitude: number;
  userName: string;
}

export default function Home() {
  const [user] = useAuthState(auth);
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchOutlets();
    }
  }, [user]);

  const fetchOutlets = async () => {
    try {
      console.log('Fetching outlets...');
      const outletsQuery = query(collection(db, 'outlets'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(outletsQuery);
      const outletsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Outlet[];
      console.log('Fetched outlets:', outletsData);
      setOutlets(outletsData);
    } catch (error) {
      console.error('Error fetching outlets:', error);
      setError('Failed to fetch outlets. Please try again.');
    }
  };

  const handleAddOutlet = async (lat: number, lng: number) => {
    if (!user) {
      console.log('No user logged in');
      return;
    }

    try {
      console.log('Adding outlet:', { lat, lng, user: user.displayName });
      const docRef = await addDoc(collection(db, 'outlets'), {
        latitude: lat,
        longitude: lng,
        userId: user.uid,
        userName: user.displayName,
        createdAt: serverTimestamp(),
      });
      console.log('Outlet added with ID:', docRef.id);
      await fetchOutlets();
    } catch (error) {
      console.error('Error adding outlet:', error);
      setError('Failed to add outlet. Please try again.');
    }
  };

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
    }
  };

  const handleLocationFound = (lat: number, lng: number) => {
    console.log('Location found from image:', { lat, lng });
    handleAddOutlet(lat, lng);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Map outlets={outlets} onAddOutlet={handleAddOutlet} />
      {user && <ImageUpload onLocationFound={handleLocationFound} />}
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        right: '1rem', 
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {user ? (
          <div className="flex items-center gap-4">
            <p>Signed in as {user.displayName}</p>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
