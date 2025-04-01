import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const OnboardingScreen2 = ({ navigation }) => {
  return (
    <View>
      <Text>Introduction - Screen 2</Text>
      <TouchableOpacity onPress={() => navigation.navigate('OnboardingScreen3')}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen2;