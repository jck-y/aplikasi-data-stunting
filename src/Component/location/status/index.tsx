import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { maximize, user_location } from '../../../Assets';

const Status = ({ user }) => {
  const getName = () => {
    switch (user.kategori) {
      case 'Balita':
      case 'Ibu Balita':
        return user.namaBalita || 'Tidak diketahui';
      case 'Ibu Hamil':
        return user.namaIbu || 'Tidak diketahui';
      case 'Remaja/Catin':
        return user.nama || 'Tidak diketahui';
      default:
        return 'Tidak diketahui';
    }
  };

  // Tentukan usia berdasarkan kategori
  const getAge = () => {
    switch (user.kategori) {
      case 'Balita':
        return user.usiaBulan ? `${user.usiaBulan} bulan` : 'Tidak diketahui';
      case 'Ibu Balita':
      case 'Ibu Hamil':
        return user.usiaIbu || 'Tidak diketahui';
      case 'Remaja/Catin':
        return user.usia || 'Tidak diketahui';
      default:
        return 'Tidak diketahui';
    }
  };

  // Tentukan berat badan berdasarkan kategori
  const getWeight = () => {
    switch (user.kategori) {
      case 'Balita':
      case 'Ibu Hamil':
      case 'Remaja/Catin':
        return user.beratBadan || 'Tidak diketahui';
      case 'Ibu Balita':
        return user.beratLahir || 'Tidak diketahui';
      default:
        return 'Tidak diketahui';
    }
  };

  // Tentukan tinggi/panjang badan berdasarkan kategori
  const getHeight = () => {
    switch (user.kategori) {
      case 'Balita':
        return user.panjangTinggi || 'Tidak diketahui';
      case 'Ibu Balita':
        return user.panjangLahir || 'Tidak diketahui';
      case 'Ibu Hamil':
      case 'Remaja/Catin':
        return user.tinggiBadan || 'Tidak diketahui';
      default:
        return 'Tidak diketahui';
    }
  };

  // Tentukan status bantuan berdasarkan stuntingRisk
  const getStatus = () => {
    return user.stuntingRisk === 'Berisiko' ? 'Memerlukan Bantuan' : 'Tidak Memerlukan Bantuan';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.userimage} source={user_location} />
        <Text style={styles.usertext}>{getName()}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.container1}>
          <Text style={styles.title}>Kategori :</Text>
          <Text style={styles.text}>{user.kategori || 'Tidak diketahui'}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Nama :</Text>
          <Text style={styles.text}>{getName()}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Alamat :</Text>
          <Text style={styles.text}>{user.tempatTinggal || user.address || 'Memuat alamat...'}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Tinggi/Panjang :</Text>
          <Text style={styles.text}>{getHeight()}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Berat :</Text>
          <Text style={styles.text}>{getWeight()}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Umur :</Text>
          <Text style={styles.text}>{getAge()}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Status :</Text>
          <Text style={[styles.status, { color: user.stuntingRisk === 'Berisiko' ? '#E60E12' : '#28A745' }]}>
            {getStatus()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    width: 345,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 10,
    // Shadow for iOS
    shadowColor: '#E60E12',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  userimage: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  usertext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E60E12',
  },
  content: {
    paddingTop: 10,
  },
  container1: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    width: 160,
    marginLeft: 6,
  },
  status: {
    fontSize: 10,
    width: 160,
    marginLeft: 6,
    fontWeight: 'bold',
  },
});