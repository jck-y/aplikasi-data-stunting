import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Search, Status} from '../../Component/location';
import {Gap} from '../../Component';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {fetchUsers} from '../../Api/getCoordinates';

const Location = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const getUsers = async () => {
      const result = await fetchUsers();
      if (result.success) {
        setUsers(result.data);
      } else {
        console.error(result.message);
      }
    };

    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.title}>View Geolocation</Text>
      </View>
      <Search />
      <Gap height={30} />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 1.4159985697381958,
          longitude: 124.98653168294511,
          latitudeDelta: 0.0075,
          longitudeDelta: 0.00605,
        }}>
        {users.map(user => (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            title={`${user.namaDepan} ${user.namaBelakang}`}
            description={`Rumah ${user.namaDepan}`}
          />
        ))}
      </MapView>
      <Status />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Container takes full screen height
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#F5F5F5', // Optional: light background for visibility
  },
  container1: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#E9EAEB',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF', // Ensure header is visible
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0077B6',
  },
  map: {
    width: 350, // Fixed width for map box
    height: 300, // Fixed height for map box
    marginVertical: 10, // Space above and below map
    borderRadius: 10, // Optional: rounded corners for box look
    borderWidth: 1, // Optional: border for visibility
    borderColor: '#E9EAEB',
  },
});
