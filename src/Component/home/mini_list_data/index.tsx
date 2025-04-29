/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { button_left, button_right, maximize } from "../../../Assets";
import { db } from '../../../../config/firebase'; // Adjust the path to your Firebase config

const Mini_list_data = ({ navigation }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(
      snapshot => {
        const usersData = [];
        snapshot.forEach(doc => {
          const data = doc.data();

          let displayAddress = '';
          const fullAddress = data.address || data.tempatTinggal || '';
          if (fullAddress) {
            const addressParts = fullAddress.split(',').map(part => part.trim());
            if (addressParts.length >= 3) {
              displayAddress = `${addressParts[1]}, ${addressParts[2]}`; // "Airmadidi Bawah, Airmadidi"
            } else {
              displayAddress = fullAddress; // Fallback to the full address if parsing fails
            }
          }

          usersData.push({
            id: doc.id,
            nama: `${data.namaDepan} ${data.namaBelakang}`,
            alamat: displayAddress,
            ...data,
          });
        });
        setUserList(usersData);
      },
      error => {
        console.error('Error fetching users in Mini_list_data:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={{ fontSize: 16, left: 10 }}>List Data</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ListData')} activeOpacity={0.7}>
          <Image style={{ width: 20, height: 20, right: 10, top: 4 }} source={maximize} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ maxHeight: 150 }}>
        {userList.map((user, index) => (
          <View key={user.id || index} style={styles.container2}>
            <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 20 }}>{user.nama}</Text>
            <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 20 }}>{user.alamat}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.container3}>
        <TouchableOpacity>
          <Image source={button_left} />
        </TouchableOpacity>
        <Text>Page 1 of 10</Text>
        <TouchableOpacity>
          <Image source={button_right} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Mini_list_data;

const styles = StyleSheet.create({
  container: {
    width: 335,
    height: maximize.height + 100,
    backgroundColor: "#fff",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.1,
    shadowRadius: 50,
    elevation: 5,
    position: 'absolute',
    alignSelf: 'center',
    top: 200,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  container2: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: '#E9EAEB',
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
});