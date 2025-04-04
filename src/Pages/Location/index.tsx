import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Search, Status } from '../../Component/location';


const Location = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.title}>View Geolocation</Text>
      </View>
      <Search />
      <Status />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  container1: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#E9EAEB',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0077B6',
  },

});