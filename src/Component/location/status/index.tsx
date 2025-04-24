import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {maximize, user_location} from '../../../Assets';

const Status = ({user}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image style={styles.userimage} source={user_location} />
        <Text style={styles.usertext}>{user.namaDepan}</Text>
      </View>
      <View style={styles.container1}>
        <Text style={styles.title}>Nama :</Text>
        <Text
          style={styles.text}>{`${user.namaDepan} ${user.namaBelakang}`}</Text>
      </View>
      <View style={styles.container1}>
        <Text style={styles.title}>Alamat :</Text>
        <Text style={styles.text}>{`${user.latitude}, ${user.longitude}`}</Text>
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
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    width: 345,
    height: maximize.height + 100,
    top: 40,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 5,
    boxShadow: '2px 1px 4px 4px rgba(230, 14, 18, 0.25)',
    paddingVertical: 10,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    width: 160,
    left: 6,
  },
  container1: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  status: {
    color: '#E60E12',
    fontSize: 10,
    width: 160,
    left: 6,
    fontWeight: 'bold',
  },
  container2: {
    position: 'absolute',
    left: 280,
    top: 16,
  },
  userimage: {
    width: 36,
    height: 36,
  },
  usertext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E60E12',
  },
});
