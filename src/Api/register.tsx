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
export const registerUser = async (userData: any) => {
  try {
    // Validasi data dasar
    if (!userData.latitude || !userData.longitude) {
      throw new Error('Koordinat latitude dan longitude wajib diisi');
    }

    // Mengambil alamat dari koordinat
    const address = await getAddressFromCoordinates(userData.latitude, userData.longitude);

    // Struktur data dasar
    const baseData = {
      tempatTinggal: userData.tempatTinggal || 'Tidak diketahui',
      daerah: userData.daerah || 'Tidak diketahui',
      latitude: userData.latitude,
      longitude: userData.longitude,
      address: address,
      kategori: userData.kategori,
      stuntingRisk: userData.stuntingRisk || 'Tidak diketahui',
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    let specificData = {};
    switch (userData.kategori) {
      case 'Balita':
        specificData = {
          namaBalita: userData.namaBalita || 'Tidak diketahui',
          namaOrangtua: userData.namaOrangtua || 'Tidak diketahui',
          desaKelurahan: userData.desaKelurahan || 'Tidak diketahui',
          jagaLingkungan: userData.jagaLingkungan || 'Tidak diketahui',
          usiaBulan: parseFloat(userData.usiaBulan) || 0,
          beratBadan: parseFloat(userData.beratBadan) || 0,
          panjangTinggi: parseFloat(userData.panjangTinggi) || 0,
          lila: parseFloat(userData.lila) || 0,
          lingkarKepala: parseFloat(userData.lingkarKepala) || 0,
        };
        break;
      // ... (lakukan hal yang sama untuk kategori lain dengan nilai default)
      case 'Ibu Balita':
        specificData = {
          namaBalita: userData.namaBalita || 'Tidak diketahui',
          namaOrangtua: userData.namaOrangtua || 'Tidak diketahui',
          desaKelurahan: userData.desaKelurahan || 'Tidak diketahui',
          jagaLingkungan: userData.jagaLingkungan || 'Tidak diketahui',
          usiaIbu: userData.usiaIbu || 'Tidak diketahui',
          jumlahAnak: userData.jumlahAnak || 'Tidak diketahui',
          jarakKelahiran: userData.jarakKelahiran || 'Tidak diketahui',
          beratLahir: parseFloat(userData.beratLahir) || 0,
          panjangLahir: parseFloat(userData.panjangLahir) || 0,
          aksesAir: userData.aksesAir || 'Tidak diketahui',
          jambanLayak: userData.jambanLayak || 'Tidak diketahui',
          bpjs: userData.bpjs || 'Tidak diketahui',
          ktp: userData.ktp || 'Tidak diketahui',
          akteKelahiran: userData.akteKelahiran || 'Tidak diketahui',
          intervensi: userData.intervensi || 'Tidak diketahui',
        };
        break;
      // ... (tambahkan untuk 'Ibu Hamil' dan 'Remaja/Catin' dengan nilai default)
      default:
        throw new Error('Kategori tidak valid');
    }

    const dataToSave = { ...baseData, ...specificData };

    // Simpan ke Firestore
    const docRef = await firestore().collection('users').add(dataToSave);
    console.log('Document written with ID: ', docRef.id);

    return { success: true, message: 'Data berhasil disimpan ke Firestore!' };
  } catch (error) {
    console.error('Error menyimpan data ke Firestore:', error);
    return { success: false, message: `Gagal menyimpan data ke Firestore: ${error.message}` };
  }
};