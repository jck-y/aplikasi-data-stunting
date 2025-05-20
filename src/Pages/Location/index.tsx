import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Search, Status } from '../../Component/location';
import { Gap } from '../../Component';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { db } from '../../../config/firebase'; // Adjust the path to your Firebase config

const Location = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users in real-time using onSnapshot
  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(
      snapshot => {
        const usersData = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          // Tentukan nama berdasarkan kategori
          let name = '';
          switch (data.kategori) {
            case 'Balita':
            case 'Ibu Balita':
              name = data.namaBalita || 'Tidak diketahui';
              break;
            case 'Ibu Hamil':
              name = data.namaIbu || 'Tidak diketahui';
              break;
            case 'Remaja/Catin':
              name = data.nama || 'Tidak diketahui';
              break;
            default:
              name = 'Tidak diketahui';
          }

          usersData.push({
            id: doc.id,
            ...data,
            name, // Simpan nama untuk pencarian dan marker
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
          });
        });
        setUsers(usersData);
        // Initially, set filtered users to empty
        setFilteredUsers([]);
      },
      error => {
        console.error('Error fetching users in Geolocation:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers([]); // Don't show any Status components when search query is empty
    } else {
      const queryLower = searchQuery.toLowerCase();
      const filtered = users.filter(user => {
        const fullName = user.name.toLowerCase();
        return fullName.includes(queryLower);
      });
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  // Handle search query from the Search component
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedUser(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.title}>View Geolocation</Text>
      </View>
      <Search onSearch={handleSearch} />
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
            image={require('../../Assets/Other/Vector.png')}
            title={user.name}
            description={`Rumah ${user.name}`}
            onPress={() => setSelectedUser(user)}
          />
        ))}
      </MapView>
      <View style={styles.statusList}>
        {selectedUser ? (
          <Status user={selectedUser} />
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <Status key={user.id} user={user} />
          ))
        ) : searchQuery.trim() !== '' ? (
          <Text style={styles.noResults}>Tidak ada hasil ditemukan</Text>
        ) : null}
      </View>
      <Gap height={30} />
    </ScrollView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container1: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#E9EAEB',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0077B6',
  },
  map: {
    width: 350,
    height: 300,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9EAEB',
    alignSelf: 'center',
  },
  statusList: {
    marginTop: 10,
    alignItems: 'center',
  },
  noResults: {
    fontSize: 16,
    color: '#868686',
    textAlign: 'center',
    marginVertical: 20,
  },
});