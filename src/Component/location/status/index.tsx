import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { maximize, user_location } from '../../../Assets';

const Status = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.userimage} source={user_location} />
        <Text style={styles.usertext}>{user.namaDepan}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.container1}>
          <Text style={styles.title}>Nama :</Text>
          <Text style={styles.text}>{`${user.namaDepan} ${user.namaBelakang}`}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Alamat :</Text>
          <Text style={styles.text}>{user.address || 'Memuat alamat...'}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Tinggi :</Text>
          <Text style={styles.text}>{user.tinggiBadan}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Berat :</Text>
          <Text style={styles.text}>{user.beratBadan}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Umur :</Text>
          <Text style={styles.text}>{user.umur}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Jenis Kelamin :</Text>
          <Text style={styles.text}>{user.jenisKelamin}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Status :</Text>
          <Text style={styles.status}>Memerlukan Bantuan</Text>
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
    width: 36,
    height: 36,
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
    color: '#E60E12',
    fontSize: 10,
    width: 160,
    marginLeft: 6,
    fontWeight: 'bold',
  },
});