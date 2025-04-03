import React from 'react';
import { Logo2 } from '../../Assets';
import Gap from '../../Components/Gap';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
const Splash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo2/>
      <Gap height={127} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={styles.buttonContainer}>
          <Text style={styles.textStyle}>Masuk</Text>
        </View>
      </TouchableOpacity>
      <Gap height={19} />
      <TouchableOpacity onPress={() => console.log('Exit App')}>
        <View style={styles.buttonContainer1}>
          <Text style={styles.textStyle1}>Keluar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#725d8d'
  },
  buttonContainer: {
    backgroundColor: '#0077B6',
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 17,
    // paddingVertical: 20,
    // paddingHorizontal: 50,
    width: 215,
    height: 57,
    textAlign: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 24,
    color: 'white',
  },
  buttonContainer1: {
    backgroundColor: '#A4CADF',
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 17,
    // paddingVertical: 20,
    // paddingHorizontal: 50,
    width: 215,
    height: 57,
    textAlign: 'center',
    justifyContent: 'center',
  },
  textStyle1: {
    fontSize: 24,
    color: '#0077B6',
  },
})