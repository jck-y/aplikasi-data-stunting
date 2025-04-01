import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const OnboardingScreen1 = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the App - Screen 1</Text>
      <TouchableOpacity onPress={() => navigation.navigate('OnboardingScreen2')}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
export default OnboardingScreen1;