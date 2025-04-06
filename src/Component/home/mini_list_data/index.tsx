/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { button_left, button_right, maximize } from "../../../Assets";
import { fetchUserData } from "../../../Api/showData";

const Mini_list_data = ({ navigation }) => {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUserData();
      setUserList(data);
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={{ fontSize: 16, left: 10 }}>List Data</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ListData')} activeOpacity={0.7}>
          <Image style={{ width: 20, height: 20, right: 10, top: 4 }} source={maximize} />
        </TouchableOpacity>
      </View>

      {/* ScrollView supaya bisa menampilkan banyak data */}
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
        // Ganti boxShadow dengan properti shadow React Native
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.1,
        shadowRadius: 50,
        elevation: 5, // Untuk Android
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