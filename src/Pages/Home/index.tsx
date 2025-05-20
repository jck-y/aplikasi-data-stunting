import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import { ButtoninputData, home_top_background } from '../../Assets';
import { Profile } from '../../Component';
import { Mini_list_data } from '../../Component';
import { db } from '../../../config/firebase';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);
  const [regionCounts, setRegionCounts] = useState({
    Airmadidi: 0,
    Kalawat: 0,
    Dimembe: 0,
    Kauditan: 0,
    Kema: 0,
    Likupang_barat: 0,
    Likupang_selatan: 0,
    Likupang_timur: 0,
    Talawaan: 0,
    Wori: 0,
  });
  const userRole = route.params?.userRole || '';
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch users and calculate region counts in real-time (only risky cases)
  useEffect(() => {
    const unsubscribe = db.collection('users')
      .where('stuntingRisk', '==', 'Berisiko') // Filter only risky cases
      .onSnapshot(
        snapshot => {
          const usersData = [];
          const counts = {
            Airmadidi: 0,
            Kalawat: 0,
            Dimembe: 0,
            Kauditan: 0,
            Kema: 0,
            Likupang_barat: 0,
            Likupang_selatan: 0,
            Likupang_timur: 0,
            Talawaan: 0,
            Wori: 0,
          };

          snapshot.forEach(doc => {
            const userData = doc.data();
            usersData.push({ id: doc.id, ...userData });

            // Use the daerah field directly from Firestore
            const region = userData.daerah || '';
            if (counts.hasOwnProperty(region) && region !== '') {
              counts[region]++;
            }
          });

          setUsers(usersData);
          setRegionCounts(counts);
        },
        error => {
          console.error('Error fetching users in Home:', error);
        }
      );

    return () => unsubscribe();
  }, []);

  const getStatusColor = count => {
    if (count === 0) return '#28A745';
    if (count <= 30) return '#FFA500';
    return '#DC3545';
  };

  const showInputDataButton = userRole !== 'pemerintah';
  const showBantuanButton = userRole === 'pemerintah' || userRole === 'puskesmas' || userRole === 'admin' || userRole === 'posyandu' || userRole === 'kader';
  const handleCategorySelect = (category) => {
    setModalVisible(false);
    navigation.navigate('InputData', { category });
  };

  const handleBantuanPress = () => {
    navigation.navigate('Bantuan', { userRole });
  };

  // Tentukan teks tombol berdasarkan peran
  const getBantuanButtonText = () => {
    return userRole === 'pemerintah' ? 'Masukan Bantuan' : 'Bantuan';
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={home_top_background} />
      <Profile navigation={navigation} />
      <Text style={styles.welcomeText}>{`Selamat Datang\nDi Aplikasi Data Stunting`}</Text>
      <Mini_list_data navigation={navigation} users={users} />
      
      {/* Scrollable Region Counts Summary Section */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Ringkasan Kasus Per Kecamatan</Text>
          <View style={styles.regionGrid}>
            {Object.entries(regionCounts).map(([region, count]) => (
              <View key={region} style={styles.regionItem}>
                <View
                  style={[
                    styles.statusCircle,
                    { backgroundColor: getStatusColor(count) },
                  ]}
                />
                <Text style={styles.regionText}>{`${region}: ${count}`}</Text>
              </View>
            ))}
          </View>
          {showBantuanButton && (
            <View style={styles.containerbutton}>
              <TouchableOpacity onPress={handleBantuanPress} style={styles.customButton}>
                <Text style={styles.buttonText}>{getBantuanButtonText()}</Text>
              </TouchableOpacity>
            </View>
          )}
          {showInputDataButton && (
            <View style={styles.containerbutton}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <ButtoninputData />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Category Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Kategori Input Data</Text>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect('Balita')}>
              <Text style={styles.categoryText}>Balita</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect('Ibu Balita')}>
              <Text style={styles.categoryText}>Ibu Balita</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect('Ibu Hamil')}>
              <Text style={styles.categoryText}>Ibu Hamil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect('Remaja/Catin')}>
              <Text style={styles.categoryText}>Remaja/Catin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.categoryButton, styles.closeButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.categoryText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFE',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 290,
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
    width: 350,
  },
  scrollContainer: {
    flex: 1,
    marginTop: '22%',
  },
  summaryContainer: {
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  regionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (width - 70) / 2,
    marginBottom: 10,
  },
  statusCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  regionText: {
    fontSize: 14,
    color: '#333',
  },
  containerbutton: {
    alignItems: 'center',
    paddingVertical: "5%",
    backgroundColor: '#FDFEFE',
  },
  customButton: {
    backgroundColor: '#0077B6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#0077B6',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#DC3545',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});