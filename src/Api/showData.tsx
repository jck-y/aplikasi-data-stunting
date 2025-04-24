import firestore from '@react-native-firebase/firestore';

export const fetchUserData = async () => {
  try {
    const usersCollection = await firestore().collection('users').get();
    const usersData = usersCollection.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nama: `${data.namaDepan} ${data.namaBelakang}`,
        alamat: data.tempatTinggal,
        tb: data.tinggiBadan,
        bb: data.beratBadan,
        umur: data.umur,
        jenisKelamin: data.jenisKelamin,
        longitude: data.longitude,
        latitude: data.latitude,
      };
    });
    return usersData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
