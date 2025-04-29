import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDQ8rbe4Cz46Fbop9ugJ3IWMCNmVVIkHjA',
  authDomain: 'datastunting-5526f.firebaseapp.com',
  projectId: 'datastunting-5526f',
  storageBucket: 'datastunting-5526f.firebasestorage.app',
  messagingSenderId: '209864998830',
  appId: '1:209864998830:web:e103cff9142c8a50c9123f',
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase berhasil diinisialisasi!');
} else {
  console.log('Firebase sudah terhubung.');
}

// Export Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database();

export {auth, db, database};
