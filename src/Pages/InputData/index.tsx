import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { V, X } from '../../Assets';
import { Gap } from '../../Components';

const InputData = () => {
  const [namaDepan, setNamaDepan] = useState('');
  const [namaBelakang, setNamaBelakang] = useState('');
  const [tempatTinggal, setTempatTinggal] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [umur, setUmur] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isFormFilled = () => {
    return (
      namaDepan.trim() !== '' &&
      namaBelakang.trim() !== '' &&
      tempatTinggal.trim() !== '' &&
      tinggiBadan.trim() !== '' &&
      beratBadan.trim() !== '' &&
      umur.trim() !== '' &&
      jenisKelamin.trim() !== ''
    );
  };

  const handleSubmit = () => {
    if (isFormFilled()) {
      const umurNum = parseInt(umur);
      if (!isNaN(umurNum) && umurNum > 0) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }

      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masukan Data</Text>
      <Text>Nama Depan</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="masukan nama depan"
        value={namaDepan}
        onChangeText={setNamaDepan}
      />
      <Text>Nama Belakang</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="masukan marga"
        value={namaBelakang}
        onChangeText={setNamaBelakang}
      />
      <Text>Tempat Tinggal</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="masukan lokasi tempat tinggal"
        value={tempatTinggal}
        onChangeText={setTempatTinggal}
      />
      <Text>Tinggi Badan</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="masukan tinggi badan"
        value={tinggiBadan}
        onChangeText={setTinggiBadan}
        keyboardType="numeric"
      />
      <Text>Berat Badan</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="masukan berat badan"
        value={beratBadan}
        onChangeText={setBeratBadan}
        keyboardType="numeric"
      />
      <Text>Umur</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="masukan usia"
        value={umur}
        onChangeText={setUmur}
        keyboardType="numeric"
      />
      <Text>Jenis Kelamin</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="masukan jenis kelamin anda"
        value={jenisKelamin}
        onChangeText={setJenisKelamin}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isFormFilled() ? '#0077B6' : '#D3D3D3' }]}
        onPress={handleSubmit}
        disabled={!isFormFilled()}
      >
        <Text style={styles.buttonText}>Masukan Data</Text>
      </TouchableOpacity>


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {isSuccess ? <V /> : <X />}
            <Text style={{ fontSize: 25, marginTop: 43, textAlign: 'center', fontWeight: '500' }}>
              {isSuccess ? 'Data berhasil dimasukkan!' : 'Data gagal dimasukkan!'}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
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