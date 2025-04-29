import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import { V, X } from '../../Assets';
import { Gap } from '../../Component';
import { registerUser } from '../../Api/register';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const jenisKelaminData = [
  { label: 'Laki-laki', value: 'Laki-laki' },
  { label: 'Perempuan', value: 'Perempuan' },
];

const daerahData = [
  { label: 'Airmadidi', value: 'Airmadidi' },
  { label: 'Kalawat', value: 'Kalawat' },
  { label: 'Dimembe', value: 'Dimembe' },
  { label: 'Kauditan', value: 'Kauditan' },
  { label: 'Kema', value: 'Kema' },
  { label: 'Likupang', value: 'Likupang' },
];

const InputData = () => {
  const navigation = useNavigation();
  const [namaDepan, setNamaDepan] = useState('');
  const [namaBelakang, setNamaBelakang] = useState('');
  const [alamat, setAlamat] = useState('');
  const [daerah, setDaerah] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [umur, setUmur] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const isFormFilled = () => {
    return (
      namaDepan.trim() !== '' &&
      namaBelakang.trim() !== '' &&
      alamat.trim() !== '' &&
      daerah.trim() !== '' &&
      tinggiBadan.trim() !== '' &&
      beratBadan.trim() !== '' &&
      umur.trim() !== '' &&
      jenisKelamin.trim() !== '' &&
      latitude.trim() !== '' &&
      longitude.trim() !== ''
    );
  };

  const handleNumericInput = (text, setter) => {
    const numericValue = text.replace(/[^0-9.-]/g, '') || '';
    setter(numericValue);
  };

  const handleSubmit = async () => {
    if (isFormFilled()) {
      const umurNum = parseFloat(umur);
      const tinggiNum = parseFloat(tinggiBadan);
      const beratNum = parseFloat(beratBadan);
      const latNum = parseFloat(latitude);
      const longNum = parseFloat(longitude);

      if (
        !isNaN(umurNum) &&
        umurNum > 0 &&
        !isNaN(tinggiNum) &&
        tinggiNum > 0 &&
        !isNaN(beratNum) &&
        beratNum > 0 &&
        !isNaN(latNum) &&
        !isNaN(longNum)
      ) {
        const userData = {
          namaDepan,
          namaBelakang,
          tempatTinggal: alamat, // Match the field name expected by registerUser
          daerah, // Include daerah field
          tinggiBadan, // Keep as string, registerUser will parse it
          beratBadan, // Keep as string, registerUser will parse it
          umur, // Keep as string, registerUser will parse it
          jenisKelamin,
          latitude, // Keep as string, registerUser expects string
          longitude, // Keep as string, registerUser expects string
        };

        console.log('Saving userData:', userData); // Debug log

        try {
          const result = await registerUser(userData);
          setIsSuccess(result.success);
        } catch (error) {
          console.error('Error in handleSubmit:', error);
          setIsSuccess(false);
        }
      } else {
        setIsSuccess(false);
      }

      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        if (isSuccess) {
          setNamaDepan('');
          setNamaBelakang('');
          setAlamat('');
          setDaerah('');
          setTinggiBadan('');
          setBeratBadan('');
          setUmur('');
          setJenisKelamin('');
          setLatitude('');
          setLongitude('');
          navigation.navigate('Home');
        }
      }, 1500);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Masukkan Data</Text>
      <Text>Nama Depan</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama depan"
        value={namaDepan}
        onChangeText={setNamaDepan}
      />
      <Text>Nama Belakang</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan marga"
        value={namaBelakang}
        onChangeText={setNamaBelakang}
      />
      <Text>Alamat</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan alamat lengkap"
        value={alamat}
        onChangeText={setAlamat}
      />
      <Text>Daerah</Text>
      <Gap height={8} />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={daerahData}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder="Pilih daerah"
        value={daerah}
        onChange={item => setDaerah(item.value)}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />
        )}
      />
      <Text>Tinggi Badan</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan tinggi badan (cm)"
        value={tinggiBadan}
        onChangeText={text => handleNumericInput(text, setTinggiBadan)}
        keyboardType="numeric"
      />
      <Text>Berat Badan</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan berat badan (kg)"
        value={beratBadan}
        onChangeText={text => handleNumericInput(text, setBeratBadan)}
        keyboardType="numeric"
      />
      <Text>Umur</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan usia (tahun)"
        value={umur}
        onChangeText={text => handleNumericInput(text, setUmur)}
        keyboardType="numeric"
      />
      <Text>Jenis Kelamin</Text>
      <Gap height={8} />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={jenisKelaminData}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder="Pilih jenis kelamin"
        value={jenisKelamin}
        onChange={item => setJenisKelamin(item.value)}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />
        )}
      />
      <Text>Latitude</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan koordinat kiri"
        value={latitude}
        onChangeText={text => handleNumericInput(text, setLatitude)}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
      />
      <Text>Longitude</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan koordinat kanan"
        value={longitude}
        onChangeText={text => handleNumericInput(text, setLongitude)}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isFormFilled() ? '#0077B6' : '#D3D3D3' },
        ]}
        onPress={handleSubmit}
        disabled={!isFormFilled()}>
        <Text style={styles.buttonText}>Masukan Data</Text>
      </TouchableOpacity>
      <Gap height={30} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {isSuccess ? <V /> : <X />}
            <Text
              style={{
                fontSize: 25,
                marginTop: 43,
                textAlign: 'center',
                fontWeight: '500',
              }}>
              {isSuccess
                ? 'Data berhasil dimasukkan!'
                : 'Data gagal dimasukkan!'}
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#E8ECEF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#E8ECEF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#A9A9A9',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    borderRadius: 40,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 306,
    height: 404,
  },
});

export default InputData;