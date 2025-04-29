import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fetchUserData} from '../../Api/showData';

// const dummyData = [
//   { id: '1', nama: 'Rhye, Olivia', tempatTinggal: 'Sukur, kec Airmadidi', tb: 178, bb: 56, umur: 18, jenisKelamin: 'L' },
//   { id: '2', nama: 'Soen, Albert Kuantino', tempatTinggal: 'Tetey, kec Dimembe', tb: 160, bb: 65, umur: 20, jenisKelamin: 'P' },
// ];

const ITEMS_PER_PAGE = 15; // Jumlah item per halaman

const ListData = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };
    loadData();
  }, []);

  const filteredData = userData.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.nama.toLowerCase().includes(query) ||
      item.alamat.toLowerCase().includes(query) ||
      item.tb.toString().includes(query) ||
      item.bb.toString().includes(query) ||
      item.umur.toString().includes(query) ||
      item.jenisKelamin.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  };

  const renderItem = ({item}) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataText}>{item.nama}</Text>
      <Text style={styles.dataText}>{item.alamat}</Text>
      <Text style={styles.dataText}>{item.tb}</Text>
      <Text style={styles.dataText}>{item.bb}</Text>
      <Text style={styles.dataText}>{item.umur}</Text>
      <Text style={styles.dataText}>{item.jenisKelamin}</Text>
    </View>
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Render header tabel
  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Nama</Text>
      <Text style={styles.headerText}>Tempat Tinggal</Text>
      <Text style={styles.headerText}>TB</Text>
      <Text style={styles.headerText}>BB</Text>
      <Text style={styles.headerText}>Umur</Text>
      <Text style={styles.headerText}>L/P</Text>
    </View>
  );

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

      {renderHeader()}
      <FlatList
        data={getPaginatedData()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={goToPreviousPage}
          disabled={currentPage === 1}
          style={styles.arrowButton}>
          <Text style={styles.arrowText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          Page {currentPage} of {totalPages}
        </Text>

        <TouchableOpacity
          onPress={goToNextPage}
          disabled={currentPage === totalPages}
          style={styles.arrowButton}>
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 14,
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
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
    color: '#4A90E2',
  },
  pageText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 20,
  },
});

export default ListData;
