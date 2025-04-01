import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const OnboardingScreen3 = ({ navigation }) => {
  return (
    <View>
      <Text>Final Introduction - Screen 3</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen3;