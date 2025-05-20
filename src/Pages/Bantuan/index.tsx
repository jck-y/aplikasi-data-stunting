import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../../../config/firebase';

const Bantuan = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bantuanText, setBantuanText] = useState('');
  const userRole = route.params?.userRole || '';

  // Fetch users with stuntingRisk: "Berisiko" in real-time
  useEffect(() => {
    const unsubscribe = db.collection('users')
      .where('stuntingRisk', '==', 'Berisiko')
      .onSnapshot(
        snapshot => {
          const usersData = [];
          snapshot.forEach(doc => {
            const data = doc.data();
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
              name,
            });
          });
          setUsers(usersData);
        },
        error => {
          console.error('Error fetching users in Bantuan:', error);
        }
      );

    return () => unsubscribe();
  }, []);

  // Format the bantuan array into a numbered list
  const formatBantuan = (bantuanArray) => {
    if (!bantuanArray || bantuanArray.length === 0) {
      return 'Belum ada bantuan';
    }
    return bantuanArray
      .map((item, index) => `${index + 1}. ${item}`)
      .join('\n');
  };

  // Handle saving bantuan data
  const handleSaveBantuan = async () => {
    if ((userRole === 'pemerintah' || userRole === 'kader') && selectedUser && bantuanText.trim()) {
      try {
        // Fetch the current bantuan array, or initialize it as an empty array
        const currentBantuan = selectedUser.bantuan || [];
        // Append the new bantuan to the array
        const updatedBantuan = [...currentBantuan, bantuanText];

        // Update the Firestore document with the new bantuan array
        await db.collection('users').doc(selectedUser.id).update({
          bantuan: updatedBantuan,
        });

        setBantuanText(''); // Reset input
        setSelectedUser(null); // Reset selected user
        alert('Bantuan berhasil disimpan!');
      } catch (error) {
        console.error('Error saving bantuan:', error);
        alert('Gagal menyimpan bantuan.');
      }
    } else if (userRole !== 'pemerintah' && userRole !== 'kader') {
      alert('Anda hanya dapat melihat data bantuan!');
    } else {
      alert('Pilih pengguna dan isi bantuan terlebih dahulu!');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dataRow}
      onPress={() => setSelectedUser(item)}
      disabled={userRole !== 'pemerintah' && userRole !== 'kader'}
    >
      <Text style={styles.dataText}>{item.name}</Text>
      <Text style={styles.dataText}>{item.tempatTinggal || 'Tidak diketahui'}</Text>
      <Text style={styles.dataText}>
        {formatBantuan(item.bantuan)}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Nama</Text>
      <Text style={styles.headerText}>Tempat Tinggal</Text>
      <Text style={styles.headerText}>Bantuan</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Masukan Bantuan</Text>
      </View>

      {renderHeader()}
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      {selectedUser && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bantuan untuk {selectedUser.name}</Text>
          <TextInput
            style={styles.input}
            value={bantuanText}
            onChangeText={setBantuanText}
            placeholder="Tulis bantuan di sini..."
            multiline
            editable={userRole === 'pemerintah' || userRole === 'kader'}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveBantuan}
            disabled={userRole !== 'pemerintah' && userRole !== 'kader'}
          >
            <Text style={styles.saveButtonText}>Simpan Bantuan</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Bantuan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    left: "20%",
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
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
    flexGrow: 0,
  },
  inputContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#E8ECEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#0077B6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});