import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { home_top_background } from '../../Assets';
import { Profile } from '../../Component';
import { Mini_list_data } from '../../Component';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={home_top_background}  />
      <Profile />
      <Text style={styles.welcomeText} > {`Selamat Datang 
John Doe`}</Text>
      <Mini_list_data />

      <View style={styles.containerbutton}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('InputData')}
      >
        
        <Text style={styles.buttonText}>Input Data</Text>
      </TouchableOpacity>
    </View>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFEFE',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 250,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 24,
    zIndex: 1,
    position: 'absolute',
    top: 120,
    left: 60,
    color: '#fff',
    fontFamily: 'Montserrat-Regular.ttf',
    width: 200,
  },
  containerbutton: {
    alignItems: 'center',
    paddingTop: '100%',
  },
  button: {
    backgroundColor: '#4A90E2', 
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 50, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
