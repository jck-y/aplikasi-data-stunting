import firestore from '@react-native-firebase/firestore';

// Fungsi untuk menyimpan data ke Firestore
export const registerUser = async (userData: {
  namaDepan: string;
  namaBelakang: string;
  tempatTinggal: string;
  tinggiBadan: string;
  beratBadan: string;
  umur: string;
  jenisKelamin: string;
}) => {
  try {
    // Menyimpan data ke koleksi 'users' di Firestore
    await firestore()
      .collection('users')
      .add({
        namaDepan: userData.namaDepan,
        namaBelakang: userData.namaBelakang,
        tempatTinggal: userData.tempatTinggal,
        tinggiBadan: parseFloat(userData.tinggiBadan), // Konversi ke number
        beratBadan: parseFloat(userData.beratBadan), // Konversi ke number
        umur: parseInt(userData.umur), // Konversi ke number
        jenisKelamin: userData.jenisKelamin,
        createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp saat data dibuat
      });
    return {success: true, message: 'Data berhasil disimpan ke Firestore!'};
  } catch (error) {
    console.error('Error menyimpan data ke Firestore:', error);
    return {success: false, message: 'Gagal menyimpan data ke Firestore.'};
  }
};
