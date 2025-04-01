import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Splash = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Exit App')}>
        <Text>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;