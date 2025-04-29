import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

// Fungsi untuk mengubah koordinat menjadi alamat menggunakan Google Maps Geocoding API
const getAddressFromCoordinates = async (latitude: string, longitude: string): Promise<string> => {
  try {
    const apiKey = 'AIzaSyBSUsuZy3LChLHnJJvGwJpQv2SxShqwSe0'; // Ganti dengan API Key Anda atau gunakan .env
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
    );

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    } else {
      return 'Alamat tidak ditemukan';
    }
  } catch (error) {
    console.error('Error mengambil alamat dari Geocoding API:', error);
    return 'Gagal mengambil alamat';
  }
};

// Fungsi untuk menyimpan data ke Firestore
export const registerUser = async (userData: {
  namaDepan: string;
  namaBelakang: string;
  tempatTinggal: string;
  daerah: string; // Add daerah to the expected fields
  tinggiBadan: string;
  beratBadan: string;
  umur: string;
  jenisKelamin: string;
  latitude: string;
  longitude: string;
}) => {
  try {
    // Mengambil alamat dari koordinat
    const address = await getAddressFromCoordinates(userData.latitude, userData.longitude);

    // Menyimpan data ke koleksi 'users' di Firestore
    await firestore()
      .collection('users')
      .add({
        namaDepan: userData.namaDepan,
        namaBelakang: userData.namaBelakang,
        tempatTinggal: userData.tempatTinggal,
        daerah: userData.daerah, // Save the daerah field
        tinggiBadan: parseFloat(userData.tinggiBadan),
        beratBadan: parseFloat(userData.beratBadan),
        umur: parseInt(userData.umur),
        jenisKelamin: userData.jenisKelamin,
        latitude: userData.latitude,
        longitude: userData.longitude,
        address: address, // Save the geocoded address
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true, message: 'Data berhasil disimpan ke Firestore!' };
  } catch (error) {
    console.error('Error menyimpan data ke Firestore:', error);
    return { success: false, message: 'Gagal menyimpan data ke Firestore.' };
  }
};