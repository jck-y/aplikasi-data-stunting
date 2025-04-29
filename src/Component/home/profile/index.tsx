/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Pressable, Alert } from "react-native";
import { active_profile, emilia } from "../../../Assets";
import { auth } from '../../../../config/firebase'; // Adjust the path to your Firebase config

const Profile = ({ navigation }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      setIsDropdownVisible(false);
      navigation.replace('Login'); // Navigate to Login screen
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Gagal keluar. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Image style={styles.profile} source={emilia} />
        <Image style={styles.active} source={active_profile} />
      </TouchableOpacity>
      {isDropdownVisible && (
        <Pressable
          style={styles.overlay}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
              <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: "30%",
    position: 'absolute',
    left: "70%",
    top: 40,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 18.2,
  },
  active: {
    left: 40,
    top: -10,
    width: 10,
    height: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#E60E12',
  },
});