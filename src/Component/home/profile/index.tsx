/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { active_profile, emilia } from "../../../Assets";


const Profile = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.profile} source={emilia} />
      <Image style={styles.active} source={active_profile} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
      width: 40,
      height: 40,
      position: 'absolute',
      left: 270,
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
})