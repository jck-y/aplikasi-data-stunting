import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
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