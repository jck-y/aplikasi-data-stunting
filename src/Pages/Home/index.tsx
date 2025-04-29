import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ButtoninputData, home_top_background } from '../../Assets';
import { Profile } from '../../Component';
import { Mini_list_data } from '../../Component';
import { db } from '../../../config/firebase';

const Home = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);
  const userRole = route.params?.userRole || 'pemerintah'; // Default to 'pemerintah' if no role is provided

  // Fetch users in real-time for Mini_list_data
  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(
      snapshot => {
        const usersData = [];
        snapshot.forEach(doc => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersData);
      },
      error => {
        console.error('Error fetching users in Home:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Determine if the Input Data button should be shown
  const showInputDataButton = userRole !== 'pemerintah';

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={home_top_background} />
      <Profile navigation={navigation} />
      <Text style={styles.welcomeText}>{`Selamat Datang\nJohn Doe`}</Text>
      <Mini_list_data navigation={navigation} users={users} />
      {showInputDataButton && (
        <View style={styles.containerbutton}>
          <TouchableOpacity onPress={() => navigation.navigate('InputData')}>
            <ButtoninputData />
          </TouchableOpacity>
        </View>
      )}
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
});