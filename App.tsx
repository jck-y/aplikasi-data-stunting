/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/Router/index';
import { auth, db } from './config/firebase'; // Adjust path to your Firebase config
import { View, Text } from 'react-native';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // User is signed in
        try {
          const roleDoc = await db.collection('roles').doc(currentUser.uid).get();
          if (roleDoc.exists) {
            const roleData = roleDoc.data();
            setUserRole(roleData.role);
            setUser(currentUser);
          } else {
            console.warn('Role document not found in Firestore');
            setUser(null);
            setUserRole(null);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUser(null);
          setUserRole(null);
        }
      } else {
        // User is signed out
        setUser(null);
        setUserRole(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Router initialUser={user} initialUserRole={userRole} />
    </NavigationContainer>
  );
};

export default App;