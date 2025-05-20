import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../../config/firebase'; 

const ITEMS_PER_PAGE = 100; 

const MiniListData = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState({
    Balita: 1,
    IbuBalita: 1,
    IbuHamil: 1,
    RemajaCatin: 1,
  });
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState([]);

  // Fetch data dari Firestore secara real-time
  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(
      snapshot => {
        const usersData = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          usersData.push({
            id: doc.id,
            ...data,
            kategori: data.kategori || 'Tidak diketahui',
          });
        });
        setUserData(usersData);
      },
      error => {
        console.error('Error fetching users in MiniListData:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Pisahkan data berdasarkan kategori
  const getDataByCategory = (category) => {
    return userData.filter(item => item.kategori === category);
  };

  // Filter data berdasarkan search query
  const filterData = (data) => {
    if (searchQuery.trim() === '') return data;
    const queryLower = searchQuery.toLowerCase();
    return data.filter(item => {
      let name = '';
      let age = '';
      let weight = '';
      let height = '';
      switch (item.kategori) {
        case 'Balita':
        case 'Ibu Balita':
          name = item.namaBalita || '';
          age = item.kategori === 'Balita' ? item.usiaBulan : item.usiaIbu || '';
          weight = item.kategori === 'Balita' ? item.beratBadan : item.beratLahir || '';
          height = item.kategori === 'Balita' ? item.panjangTinggi : item.panjangLahir || '';
          break;
        case 'Ibu Hamil':
          name = item.namaIbu || '';
          age = item.usiaIbu || '';
          weight = item.beratBadan || '';
          height = item.tinggiBadan || '';
          break;
        case 'Remaja/Catin':
          name = item.nama || '';
          age = item.usia || '';
          weight = item.beratBadan || '';
          height = item.tinggiBadan || '';
          break;
        default:
          return false;
      }
      return (
        name.toLowerCase().includes(queryLower) ||
        (item.tempatTinggal || '').toLowerCase().includes(queryLower) ||
        (height || '').toString().includes(queryLower) ||
        (weight || '').toString().includes(queryLower) ||
        (age || '').toString().includes(queryLower) ||
        (item.stuntingRisk || '').toLowerCase().includes(queryLower)
      );
    });
  };

  const getPaginatedData = (data, category) => {
    const startIndex = (currentPage[category] - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filterData(data).slice(startIndex, endIndex);
  };

  const renderItem = ({ item }) => {
    let name = '';
    let age = '';
    let weight = '';
    let height = '';
    switch (item.kategori) {
      case 'Balita':
        name = item.namaBalita || 'Tidak diketahui';
        age = item.usiaBulan || 'Tidak diketahui';
        weight = item.beratBadan || 'Tidak diketahui';
        height = item.panjangTinggi || 'Tidak diketahui';
        break;
      case 'Ibu Balita':
        name = item.namaBalita || 'Tidak diketahui';
        age = item.usiaIbu || 'Tidak diketahui';
        weight = item.beratLahir || 'Tidak diketahui';
        height = item.panjangLahir || 'Tidak diketahui';
        break;
      case 'Ibu Hamil':
        name = item.namaIbu || 'Tidak diketahui';
        age = item.usiaIbu || 'Tidak diketahui';
        weight = item.beratBadan || 'Tidak diketahui';
        height = item.tinggiBadan || 'Tidak diketahui';
        break;
      case 'Remaja/Catin':
        name = item.nama || 'Tidak diketahui';
        age = item.usia || 'Tidak diketahui';
        weight = item.beratBadan || 'Tidak diketahui';
        height = item.tinggiBadan || 'Tidak diketahui';
        break;
      default:
        name = 'Tidak diketahui';
        age = 'Tidak diketahui';
        weight = 'Tidak diketahui';
        height = 'Tidak diketahui';
    }

    return (
      <View style={styles.dataRow}>
        <Text style={styles.dataText}>{name}</Text>
        <Text style={styles.dataText}>{item.tempatTinggal || 'Tidak diketahui'}</Text>
        <Text style={styles.dataText}>{height}</Text>
        <Text style={styles.dataText}>{weight}</Text>
        <Text style={styles.dataText}>{age}</Text>
        <Text style={styles.dataText}>{item.stuntingRisk || 'Tidak diketahui'}</Text>
      </View>
    );
  };

  // Render header tabel
  const renderHeader = (category) => {
    let headers = [];
    switch (category) {
      case 'Balita':
        headers = ['Nama Balita', 'Tempat Tinggal', 'Panjang', 'BB', 'Usia (Bulan)', 'Status'];
        break;
      case 'Ibu Balita':
        headers = ['Nama Balita', 'Tempat Tinggal', 'Panjang Lahir', 'BB Lahir', 'Usia Ibu', 'Status'];
        break;
      case 'Ibu Hamil':
        headers = ['Nama Ibu', 'Tempat Tinggal', 'Tinggi', 'BB', 'Usia Ibu', 'Status'];
        break;
      case 'Remaja/Catin':
        headers = ['Nama', 'Tempat Tinggal', 'Tinggi', 'BB', 'Usia', 'Status'];
        break;
      default:
        headers = ['Nama', 'Tempat Tinggal', 'Tinggi', 'BB', 'Usia', 'Status'];
    }

    return (
      <View style={styles.headerRow}>
        {headers.map((header, index) => (
          <Text key={index} style={styles.headerText}>{header}</Text>
        ))}
      </View>
    );
  };

  const renderTable = (category) => {
    const data = getDataByCategory(category === 'IbuBalita' ? 'Ibu Balita' : category === 'IbuHamil' ? 'Ibu Hamil' : category === 'RemajaCatin' ? 'Remaja/Catin' : category);
    const totalPages = Math.ceil(filterData(data).length / ITEMS_PER_PAGE);

    const goToPreviousPage = () => {
      if (currentPage[category] > 1) {
        setCurrentPage(prev => ({
          ...prev,
          [category]: prev[category] - 1,
        }));
      }
    };

    const goToNextPage = () => {
      if (currentPage[category] < totalPages) {
        setCurrentPage(prev => ({
          ...prev,
          [category]: prev[category] + 1,
        }));
      }
    };

    return (
      <View style={styles.tableContainer}>
        <Text style={styles.categoryTitle}>
          {category === 'IbuBalita' ? 'Ibu Balita' : category === 'IbuHamil' ? 'Ibu Hamil' : category === 'RemajaCatin' ? 'Remaja/Catin' : category}
        </Text>
        {renderHeader(category === 'IbuBalita' ? 'Ibu Balita' : category === 'IbuHamil' ? 'Ibu Hamil' : category === 'RemajaCatin' ? 'Remaja/Catin' : category)}
        <FlatList
          data={getPaginatedData(data, category)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
        {/* {data.length > 0 && (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              onPress={goToPreviousPage}
              disabled={currentPage[category] === 1}
              style={styles.arrowButton}>
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.pageText}>
              Page {currentPage[category]} of {totalPages || 1}
            </Text>
            <TouchableOpacity
              onPress={goToNextPage}
              disabled={currentPage[category] === totalPages}
              style={styles.arrowButton}>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>List Data</Text>
        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
          <Icon name="search" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Cari..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}

      <ScrollView>
        {renderTable('Balita')}
        {renderTable('IbuBalita')}
        {renderTable('IbuHamil')}
        {renderTable('RemajaCatin')}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#4A90E2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#E8ECEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  tableContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    borderRadius: 5,
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  dataRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  dataText: {
    flex: 1,
    color: '#333',
    textAlign: 'center',
    fontSize: 12,
  },
  list: {
    flexGrow: 0,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
    color: '#4A90E2',
  },
  pageText: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 20,
  },
});

export default MiniListData;