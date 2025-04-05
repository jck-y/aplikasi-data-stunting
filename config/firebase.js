import {initializeApp} from 'firebase/app';
import {getApps} from 'firebase/app';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDQ8rbe4Cz46Fbop9ugJ3IWMCNmVVIkHjA',
  authDomain: 'datastunting-5526f.firebaseapp.com',
  projectId: 'datastunting-5526f',
  storageBucket: 'datastunting-5526f.firebasestorage.app',
  messagingSenderId: '209864998830',
  appId: '1:209864998830:web:e103cff9142c8a50c9123f',
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
  console.log('Firebase berhasil !');
} else {
  console.log('Firebase sudah terhubung.');
}
const app = initializeApp(firebaseConfig);

export {database};