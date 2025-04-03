import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { home_top_background } from '../../Assets';
import { Profile } from '../../Component';
import { NavigationProp } from '@react-navigation/native';
import { Mini_list_data } from '../../Component';

const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={home_top_background}  />
      <Profile />
      <Text style={styles.welcomeText} > {`Selamat Datang 
John Doe`}</Text>
      <Mini_list_data />
      <TouchableOpacity onPress={() => navigation.navigate('Location')}>
        <Text>Location</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Statistik')}>
        <Text>Statistic</Text>
      </TouchableOpacity>
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
  }
});
