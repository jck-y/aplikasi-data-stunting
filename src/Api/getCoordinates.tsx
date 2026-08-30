import firestore from '@react-native-firebase/firestore';

export const fetchUsers = async () => {
  try {
    const usersSnapshot = await firestore().collection('users').get();

    const usersList = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      namaDepan: doc.data().namaDepan,
      namaBelakang: doc.data().namaBelakang,
      latitude: parseFloat(doc.data().latitude),
      longitude: parseFloat(doc.data().longitude),
      address: doc.data().address || 'Alamat tidak tersedia',
      beratBadan: parseFloat(doc.data().beratBadan),
      tinggiBadan: parseFloat(doc.data().tinggiBadan),
      jenisKelamin: doc.data().jenisKelamin,
      umur: parseInt(doc.data().umur, 10),
    }));

    return {
      success: true,
      data: usersList,
      message: 'Data pengguna berhasil diambil dari Firestore!',
    };
  } catch (error) {
    console.error('Error mengambil data dari Firestore:', error);
    return {
      success: false,
      data: [],
      message: 'Gagal mengambil data dari Firestore.',
    };
  }
};
