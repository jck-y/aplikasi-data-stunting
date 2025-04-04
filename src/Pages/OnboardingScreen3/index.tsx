import React from 'react';
import { O3 } from '../../Assets';
import Gap from '../../Components/Gap';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const OnboardingScreen3 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <O3/>
      <Gap height={88} />
      <Text style={styles.title}>Data Akurat untuk Tindakan Lebih Cepat</Text>
      <Gap height={71} />
      <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
          <View style={styles.buttonContainer}>
            <Text style={styles.textStyle}>Berikutnya</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen3;
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
    color: '#333333',
    textAlign: 'center',
    width: 350,
  },
  buttonContainer: {
    backgroundColor: '#0077B6',
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 17,
    // paddingVertical: 20,
    // paddingHorizontal: 50,
    width: 321,
    height: 56,
    textAlign: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 16,
    color: 'white',
  },
})