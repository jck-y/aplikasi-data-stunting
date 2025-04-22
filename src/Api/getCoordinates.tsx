import firestore from '@react-native-firebase/firestore';

// Fungsi untuk mengambil data users dari Firestore
export const fetchUsers = async () => {
  try {
    const usersSnapshot = await firestore().collection('users').get();

    const usersList = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      namaDepan: doc.data().namaDepan,
      namaBelakang: doc.data().namaBelakang,
      latitude: parseFloat(doc.data().latitude), // Konversi ke number
      longitude: parseFloat(doc.data().longitude), // Konversi ke number
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
