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
import { useNavigation, useRoute } from '@react-navigation/native';

const daerahData = [
  { label: 'Airmadidi', value: 'Airmadidi' },
  { label: 'Kalawat', value: 'Kalawat' },
  { label: 'Dimembe', value: 'Dimembe' },
  { label: 'Kauditan', value: 'Kauditan' },
  { label: 'Kema', value: 'Kema' },
  { label: 'Likupang Barat', value: 'Likupang_barat' },
  { label: 'Likupang Selatan', value: 'Likupang_selatan' },
  { label: 'Likupang Timur', value: 'Likupang_timur' },
  { label: 'Talawaan', value: 'Talawaan' },
  { label: 'Wori', value: 'Wori' },
];

const yesNoOptions = [
  { label: 'Ya', value: 'Ya' },
  { label: 'Tidak', value: 'Tidak' },
];

const layakOptions = [
  { label: 'Layak', value: 'Layak' },
  { label: 'Tidak Layak', value: 'Tidak Layak' },
];

const usiaIbuOptions = [
  { label: 'Usia sesuai', value: 'Usia sesuai' },
  { label: 'Terlalu muda <21 tahun', value: 'Terlalu muda <21 tahun' },
  { label: 'Terlalu Tua >35 tahun', value: 'Terlalu Tua >35 tahun' },
];

const jumlahAnakOptions = [
  { label: 'Anak pertama', value: 'Anak pertama' },
  { label: 'Sesuai', value: 'Sesuai' },
  { label: 'Terlalu banyak >4 anak', value: 'Terlalu banyak >4 anak' },
];

const jarakKelahiranOptions = [
  { label: 'Anak Pertama', value: 'Anak Pertama' },
  { label: '<2 tahun', value: '<2 tahun' },
  { label: '>2 tahun', value: '>2 tahun' },
];

const intervensiOptions = [
  { label: 'PMT', value: 'PMT' },
  { label: 'BAAS', value: 'BAAS' },
];

const InputData = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params || { category: 'Balita' };
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stuntingRisk, setStuntingRisk] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Updated state for Balita to include ASI Eksklusif
  const [balitaData, setBalitaData] = useState({
    namaBalita: '', namaOrangtua: '', desaKelurahan: '', jagaLingkungan: '',
    usiaBulan: '', beratBadan: '', panjangTinggi: '', lila: '', lingkarKepala: '',
    daerah: '', latitude: '', longitude: '', asiEksklusif: ''
  });
  const [ibuBalitaData, setIbuBalitaData] = useState({
    namaBalita: '', namaOrangtua: '', desaKelurahan: '', jagaLingkungan: '',
    usiaIbu: '', jumlahAnak: '', jarakKelahiran: '', beratLahir: '', panjangLahir: '',
    aksesAir: '', jambanLayak: '', bpjs: '', ktp: '', akteKelahiran: '', intervensi: '',
    daerah: '', latitude: '', longitude: ''
  });
  const [ibuHamilData, setIbuHamilData] = useState({
    namaIbu: '', namaSuami: '', usiaIbu: '', beratBadan: '', tinggiBadan: '',
    lila: '', jumlahAnak: '', jarakKelahiran: '', konsumsiFe: '', aksesAir: '',
    jambanLayak: '', bpjs: '', ktp: '', akteKelahiran: '',
    daerah: '', latitude: '', longitude: ''
  });
  const [remajaCatinData, setRemajaCatinData] = useState({
    nama: '', usia: '', beratBadan: '', tinggiBadan: '', lila: '',
    konsumsiFe: '', aksesAir: '', jambanLayak: '', bpjs: '', ktp: '',
    akteKelahiran: '', daerah: '', latitude: '', longitude: ''
  });

  const handleNumericInput = (text, setter, field) => {
    const numericValue = text.replace(/[^0-9.-]/g, '') || '';
    setter(prev => ({ ...prev, [field]: numericValue || '' }));
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = parseFloat(height) / 100 || 0;
    const weightInKg = parseFloat(weight) || 0;
    return heightInMeters > 0 ? weightInKg / (heightInMeters * heightInMeters) : 0;
  };

  const checkStuntingRisk = (category, data) => {
    let riskPoints = 0;

    switch (category) {
      case 'Balita': {
        const lila = parseFloat(data.lila) || 0;
        const beratBadan = parseFloat(data.beratBadan) || 0;
        const panjangTinggi = parseFloat(data.panjangTinggi) || 0;
        const usiaBulan = parseFloat(data.usiaBulan) || 0;

        if (lila < 12.5) riskPoints++;
        if (usiaBulan <= 24 && beratBadan < 7) riskPoints++;
        else if (usiaBulan > 24 && usiaBulan <= 60 && beratBadan < 10) riskPoints++;
        if (usiaBulan <= 24 && panjangTinggi < 65) riskPoints++;
        else if (usiaBulan > 24 && usiaBulan <= 60 && panjangTinggi < 80) riskPoints++;
        // Add risk point if ASI Eksklusif is 'Tidak'
        if (data.asiEksklusif === 'Tidak') riskPoints++;
        break;
      }
      case 'Ibu Balita': {
        const beratLahir = parseFloat(data.beratLahir) || 0;
        if (data.usiaIbu === 'Terlalu muda <21 tahun' || data.usiaIbu === 'Terlalu Tua >35 tahun') riskPoints++;
        if (data.jarakKelahiran === '<2 tahun') riskPoints++;
        if (data.jumlahAnak === 'Terlalu banyak >4 anak') riskPoints++;
        if (beratLahir < 2.5) riskPoints++;
        if (data.aksesAir === 'Tidak Layak') riskPoints++;
        if (data.jambanLayak === 'Tidak Layak') riskPoints++;
        break;
      }
      case 'Ibu Hamil': {
        const lila = parseFloat(data.lila) || 0;
        const bmi = calculateBMI(data.beratBadan, data.tinggiBadan);
        if (data.usiaIbu === 'Terlalu muda <21 tahun' || data.usiaIbu === 'Terlalu Tua >35 tahun') riskPoints++;
        if (lila < 23.5) riskPoints++;
        if (bmi < 18.5) riskPoints++;
        if (data.konsumsiFe === 'Tidak') riskPoints++;
        if (data.aksesAir === 'Tidak Layak') riskPoints++;
        if (data.jambanLayak === 'Tidak Layak') riskPoints++;
        break;
      }
      case 'Remaja/Catin': {
        const lila = parseFloat(data.lila) || 0;
        const bmi = calculateBMI(data.beratBadan, data.tinggiBadan);
        const usia = parseFloat(data.usia) || 0;
        if (usia < 21) riskPoints++;
        if (lila < 23.5) riskPoints++;
        if (bmi < 18.5) riskPoints++;
        if (data.konsumsiFe === 'Tidak') riskPoints++;
        if (data.aksesAir === 'Tidak Layak') riskPoints++;
        if (data.jambanLayak === 'Tidak Layak') riskPoints++;
        break;
      }
    }

    return riskPoints >= 2;
  };

  const isFormFilled = () => {
    switch (category) {
      case 'Balita':
        const isBalitaFilled = (
          balitaData.namaBalita.trim() !== '' &&
          balitaData.namaOrangtua.trim() !== '' &&
          balitaData.desaKelurahan.trim() !== '' &&
          balitaData.jagaLingkungan.trim() !== '' &&
          balitaData.usiaBulan.trim() !== '' &&
          balitaData.beratBadan.trim() !== '' &&
          balitaData.panjangTinggi.trim() !== '' &&
          balitaData.lila.trim() !== '' &&
          balitaData.lingkarKepala.trim() !== '' &&
          balitaData.daerah.trim() !== '' &&
          balitaData.latitude.trim() !== '' &&
          balitaData.longitude.trim() !== '' &&
          balitaData.asiEksklusif.trim() !== '' // Add ASI Eksklusif to form validation
        );
        console.log('Is Balita Form Filled:', isBalitaFilled, balitaData);
        return isBalitaFilled;
      case 'Ibu Balita':
        const isIbuBalitaFilled = (
          ibuBalitaData.namaBalita.trim() !== '' &&
          ibuBalitaData.namaOrangtua.trim() !== '' &&
          ibuBalitaData.desaKelurahan.trim() !== '' &&
          ibuBalitaData.jagaLingkungan.trim() !== '' &&
          ibuBalitaData.usiaIbu.trim() !== '' &&
          ibuBalitaData.jumlahAnak.trim() !== '' &&
          ibuBalitaData.jarakKelahiran.trim() !== '' &&
          ibuBalitaData.beratLahir.trim() !== '' &&
          ibuBalitaData.panjangLahir.trim() !== '' &&
          ibuBalitaData.aksesAir.trim() !== '' &&
          ibuBalitaData.jambanLayak.trim() !== '' &&
          ibuBalitaData.bpjs.trim() !== '' &&
          ibuBalitaData.ktp.trim() !== '' &&
          ibuBalitaData.akteKelahiran.trim() !== '' &&
          ibuBalitaData.intervensi.trim() !== '' &&
          ibuBalitaData.daerah.trim() !== '' &&
          ibuBalitaData.latitude.trim() !== '' &&
          ibuBalitaData.longitude.trim() !== ''
        );
        console.log('Is Ibu Balita Form Filled:', isIbuBalitaFilled, ibuBalitaData);
        return isIbuBalitaFilled;
      case 'Ibu Hamil':
        const isIbuHamilFilled = (
          ibuHamilData.namaIbu.trim() !== '' &&
          ibuHamilData.namaSuami.trim() !== '' &&
          ibuHamilData.usiaIbu.trim() !== '' &&
          ibuHamilData.beratBadan.trim() !== '' &&
          ibuHamilData.tinggiBadan.trim() !== '' &&
          ibuHamilData.lila.trim() !== '' &&
          ibuHamilData.jumlahAnak.trim() !== '' &&
          ibuHamilData.jarakKelahiran.trim() !== '' &&
          ibuHamilData.konsumsiFe.trim() !== '' &&
          ibuHamilData.aksesAir.trim() !== '' &&
          ibuHamilData.jambanLayak.trim() !== '' &&
          ibuHamilData.bpjs.trim() !== '' &&
          ibuHamilData.ktp.trim() !== '' &&
          ibuHamilData.akteKelahiran.trim() !== '' &&
          ibuHamilData.daerah.trim() !== '' &&
          ibuHamilData.latitude.trim() !== '' &&
          ibuHamilData.longitude.trim() !== ''
        );
        console.log('Is Ibu Hamil Form Filled:', isIbuHamilFilled, ibuHamilData);
        return isIbuHamilFilled;
      case 'Remaja/Catin':
        const isRemajaCatinFilled = (
          remajaCatinData.nama.trim() !== '' &&
          remajaCatinData.usia.trim() !== '' &&
          remajaCatinData.beratBadan.trim() !== '' &&
          remajaCatinData.tinggiBadan.trim() !== '' &&
          remajaCatinData.lila.trim() !== '' &&
          remajaCatinData.konsumsiFe.trim() !== '' &&
          remajaCatinData.aksesAir.trim() !== '' &&
          remajaCatinData.jambanLayak.trim() !== '' &&
          remajaCatinData.bpjs.trim() !== '' &&
          remajaCatinData.ktp.trim() !== '' &&
          remajaCatinData.akteKelahiran.trim() !== '' &&
          remajaCatinData.daerah.trim() !== '' &&
          remajaCatinData.latitude.trim() !== '' &&
          remajaCatinData.longitude.trim() !== ''
        );
        console.log('Is Remaja/Catin Form Filled:', isRemajaCatinFilled, remajaCatinData);
        return isRemajaCatinFilled;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    console.log('Handle Submit triggered');
    if (isFormFilled()) {
      setIsLoading(true);
      let userData;
      let isAtRisk = false;

      switch (category) {
        case 'Balita':
          isAtRisk = checkStuntingRisk('Balita', balitaData);
          userData = {
            ...balitaData,
            tempatTinggal: `${balitaData.desaKelurahan}, ${balitaData.jagaLingkungan}`,
            kategori: 'Balita',
            stuntingRisk: isAtRisk ? 'Berisiko' : 'Tidak Berisiko',
          };
          break;
        case 'Ibu Balita':
          isAtRisk = checkStuntingRisk('Ibu Balita', ibuBalitaData);
          userData = {
            ...ibuBalitaData,
            tempatTinggal: `${ibuBalitaData.desaKelurahan}, ${ibuBalitaData.jagaLingkungan}`,
            kategori: 'Ibu Balita',
            stuntingRisk: isAtRisk ? 'Berisiko' : 'Tidak Berisiko',
          };
          break;
        case 'Ibu Hamil':
          isAtRisk = checkStuntingRisk('Ibu Hamil', ibuHamilData);
          userData = {
            ...ibuHamilData,
            tempatTinggal: `${ibuHamilData.daerah}`,
            kategori: 'Ibu Hamil',
            stuntingRisk: isAtRisk ? 'Berisiko' : 'Tidak Berisiko',
          };
          break;
        case 'Remaja/Catin':
          isAtRisk = checkStuntingRisk('Remaja/Catin', remajaCatinData);
          userData = {
            ...remajaCatinData,
            tempatTinggal: `${remajaCatinData.daerah}`,
            kategori: 'Remaja/Catin',
            stuntingRisk: isAtRisk ? 'Berisiko' : 'Tidak Berisiko',
          };
          break;
      }

      console.log('Submitting data:', userData);

      try {
        const result = await registerUser(userData);
        setIsSuccess(result.success);
      } catch (error) {
        console.error('Error in handleSubmit:', error);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }

      setStuntingRisk(isAtRisk ? 'Berisiko Stunting' : 'Tidak Berisiko Stunting');
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        if (isSuccess) {
          switch (category) {
            case 'Balita':
              setBalitaData({
                namaBalita: '', namaOrangtua: '', desaKelurahan: '', jagaLingkungan: '',
                usiaBulan: '', beratBadan: '', panjangTinggi: '', lila: '', lingkarKepala: '',
                daerah: '', latitude: '', longitude: '', asiEksklusif: ''
              });
              break;
            case 'Ibu Balita':
              setIbuBalitaData({
                namaBalita: '', namaOrangtua: '', desaKelurahan: '', jagaLingkungan: '',
                usiaIbu: '', jumlahAnak: '', jarakKelahiran: '', beratLahir: '', panjangLahir: '',
                aksesAir: '', jambanLayak: '', bpjs: '', ktp: '', akteKelahiran: '', intervensi: '',
                daerah: '', latitude: '', longitude: ''
              });
              break;
            case 'Ibu Hamil':
              setIbuHamilData({
                namaIbu: '', namaSuami: '', usiaIbu: '', beratBadan: '', tinggiBadan: '',
                lila: '', jumlahAnak: '', jarakKelahiran: '', konsumsiFe: '', aksesAir: '',
                jambanLayak: '', bpjs: '', ktp: '', akteKelahiran: '', daerah: '', latitude: '', longitude: ''
              });
              break;
            case 'Remaja/Catin':
              setRemajaCatinData({
                nama: '', usia: '', beratBadan: '', tinggiBadan: '', lila: '',
                konsumsiFe: '', aksesAir: '', jambanLayak: '', bpjs: '', ktp: '',
                akteKelahiran: '', daerah: '', latitude: '', longitude: ''
              });
              break;
          }
          navigation.navigate('Home');
        }
      }, 2500);
    } else {
      console.log('Form not filled');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{`Masukkan Data ${category}`}</Text>
      {category === 'Balita' && (
        <>
          <Text>Nama Balita</Text><Gap height={8} /><TextInput style={styles.input} value={balitaData.namaBalita} onChangeText={text => setBalitaData({ ...balitaData, namaBalita: text })} />
          <Text>Nama Orangtua</Text><Gap height={8} /><TextInput style={styles.input} value={balitaData.namaOrangtua} onChangeText={text => setBalitaData({ ...balitaData, namaOrangtua: text })} />
          <Text>Desa/Kelurahan</Text><Gap height={8} /><TextInput style={styles.input} value={balitaData.desaKelurahan} onChangeText={text => setBalitaData({ ...balitaData, desaKelurahan: text })} />
          <Text>Jaga/Lingkungan/RT/RW</Text><Gap height={8} /><TextInput style={styles.input} value={balitaData.jagaLingkungan} onChangeText={text => setBalitaData({ ...balitaData, jagaLingkungan: text })} />
          <Text>Usia dalam bulan</Text><Gap height={8} /><TextInput style={styles.input} value={balitaData.usiaBulan} onChangeText={text => handleNumericInput(text, setBalitaData, 'usiaBulan')} keyboardType="numeric" />
          <Text>Berat Badan (kg)</Text><Gap height={8} /><TextInput style={styles.input} value={balitaData.beratBadan} onChangeText={text => handleNumericInput(text, setBalitaData, 'beratBadan')} keyboardType="numeric" />
          <Text>Panjang/Tinggi Badan (cm)</Text><Gap height={8} /><TextInput style={styles.input} value={balitaData.panjangTinggi} onChangeText={text => handleNumericInput(text, setBalitaData, 'panjangTinggi')} keyboardType="numeric" />
          <Text>LILA (cm)</Text><Gap height={8} /><TextInput style={styles.input} value={balitaData.lila} onChangeText={text => handleNumericInput(text, setBalitaData, 'lila')} keyboardType="numeric" />
          <Text>Lingkar Kepala (cm)</Text><Gap height={8} /><TextInput style={styles.input} value={balitaData.lingkarKepala} onChangeText={text => handleNumericInput(text, setBalitaData, 'lingkarKepala')} keyboardType="numeric" />
          <Text>ASI Eksklusif</Text><Gap height={8} /><Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={yesNoOptions}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Pilih ASI Eksklusif"
            value={balitaData.asiEksklusif}
            onChange={item => setBalitaData({ ...balitaData, asiEksklusif: item.value })}
            renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />}
          />
        </>
      )}
      {category === 'Ibu Balita' && (
        <>
          <Text>Nama Balita</Text><Gap height={8} /><TextInput style={styles.input} value={ibuBalitaData.namaBalita} onChangeText={text => setIbuBalitaData({ ...ibuBalitaData, namaBalita: text })} />
          <Text>Nama Orangtua</Text><Gap height={8} /><TextInput style={styles.input} value={ibuBalitaData.namaOrangtua} onChangeText={text => setIbuBalitaData({ ...ibuBalitaData, namaOrangtua: text })} />
          <Text>Desa/Kelurahan</Text><Gap height={8} /><TextInput style={styles.input} value={ibuBalitaData.desaKelurahan} onChangeText={text => setIbuBalitaData({ ...ibuBalitaData, desaKelurahan: text })} />
          <Text>Jaga/Lingkungan/RT/RW</Text><Gap height={8} /><TextInput style={styles.input} value={ibuBalitaData.jagaLingkungan} onChangeText={text => setIbuBalitaData({ ...ibuBalitaData, jagaLingkungan: text })} />
          <Text>Usia Ibu</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={usiaIbuOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih usia ibu" value={ibuBalitaData.usiaIbu} onChange={item => setIbuBalitaData({ ...ibuBalitaData, usiaIbu: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Jumlah Anak</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={jumlahAnakOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih jumlah anak" value={ibuBalitaData.jumlahAnak} onChange={item => setIbuBalitaData({ ...ibuBalitaData, jumlahAnak: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Jarak Kelahiran</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={jarakKelahiranOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih jarak kelahiran" value={ibuBalitaData.jarakKelahiran} onChange={item => setIbuBalitaData({ ...ibuBalitaData, jarakKelahiran: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Berat Badan saat Lahir (kg)</Text><Gap height={8} /><TextInput style={styles.input} value={ibuBalitaData.beratLahir} onChangeText={text => handleNumericInput(text, setIbuBalitaData, 'beratLahir')} keyboardType="numeric" />
          <Text>Panjang Badan saat Lahir (cm)</Text><Gap height={8} /><TextInput style={styles.input} value={ibuBalitaData.panjangLahir} onChangeText={text => handleNumericInput(text, setIbuBalitaData, 'panjangLahir')} keyboardType="numeric" />
          <Text>Akses Air Minum</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={layakOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih akses air" value={ibuBalitaData.aksesAir} onChange={item => setIbuBalitaData({ ...ibuBalitaData, aksesAir: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Jamban Layak</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={layakOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih jamban layak" value={ibuBalitaData.jambanLayak} onChange={item => setIbuBalitaData({ ...ibuBalitaData, jambanLayak: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>BPJS</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih BPJS" value={ibuBalitaData.bpjs} onChange={item => setIbuBalitaData({ ...ibuBalitaData, bpjs: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>KTP</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih KTP" value={ibuBalitaData.ktp} onChange={item => setIbuBalitaData({ ...ibuBalitaData, ktp: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Akte Kelahiran</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih akte kelahiran" value={ibuBalitaData.akteKelahiran} onChange={item => setIbuBalitaData({ ...ibuBalitaData, akteKelahiran: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Intervensi</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={intervensiOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih intervensi" value={ibuBalitaData.intervensi} onChange={item => setIbuBalitaData({ ...ibuBalitaData, intervensi: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
        </>
      )}
      {category === 'Ibu Hamil' && (
        <>
          <Text>Nama Ibu</Text><Gap height={8} /><TextInput style={styles.input} value={ibuHamilData.namaIbu} onChangeText={text => setIbuHamilData({ ...ibuHamilData, namaIbu: text })} />
          <Text>Nama Suami</Text><Gap height={8} /><TextInput style={styles.input} value={ibuHamilData.namaSuami} onChangeText={text => setIbuHamilData({ ...ibuHamilData, namaSuami: text })} />
          <Text>Usia Ibu</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={usiaIbuOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih usia ibu" value={ibuHamilData.usiaIbu} onChange={item => setIbuHamilData({ ...ibuHamilData, usiaIbu: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Berat Badan (kg)</Text><Gap height={8} /><TextInput style={styles.input} value={ibuHamilData.beratBadan} onChangeText={text => handleNumericInput(text, setIbuHamilData, 'beratBadan')} keyboardType="numeric" />
          <Text>Tinggi Badan (cm)</Text><Gap height={8} /><TextInput style={styles.input} value={ibuHamilData.tinggiBadan} onChangeText={text => handleNumericInput(text, setIbuHamilData, 'tinggiBadan')} keyboardType="numeric" />
          <Text>LILA (cm)</Text><Gap height={8} /><TextInput style={styles.input} value={ibuHamilData.lila} onChangeText={text => handleNumericInput(text, setIbuHamilData, 'lila')} keyboardType="numeric" />
          <Text>Jumlah Anak</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={jumlahAnakOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih jumlah anak" value={ibuHamilData.jumlahAnak} onChange={item => setIbuHamilData({ ...ibuHamilData, jumlahAnak: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Jarak Kelahiran</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={jarakKelahiranOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih jarak kelahiran" value={ibuHamilData.jarakKelahiran} onChange={item => setIbuHamilData({ ...ibuHamilData, jarakKelahiran: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Konsumsi Tablet Fe</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih konsumsi Fe" value={ibuHamilData.konsumsiFe} onChange={item => setIbuHamilData({ ...ibuHamilData, konsumsiFe: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Akses Air Minum</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={layakOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih akses air" value={ibuHamilData.aksesAir} onChange={item => setIbuHamilData({ ...ibuHamilData, aksesAir: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Jamban Layak</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={layakOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih jamban layak" value={ibuHamilData.jambanLayak} onChange={item => setIbuHamilData({ ...ibuHamilData, jambanLayak: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>BPJS</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih BPJS" value={ibuHamilData.bpjs} onChange={item => setIbuHamilData({ ...ibuHamilData, bpjs: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>KTP</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih KTP" value={ibuHamilData.ktp} onChange={item => setIbuHamilData({ ...ibuHamilData, ktp: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Akte Kelahiran</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih akte kelahiran" value={ibuHamilData.akteKelahiran} onChange={item => setIbuHamilData({ ...ibuHamilData, akteKelahiran: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
        </>
      )}
      {category === 'Remaja/Catin' && (
        <>
          <Text>Nama</Text><Gap height={8} /><TextInput style={styles.input} value={remajaCatinData.nama} onChangeText={text => setRemajaCatinData({ ...remajaCatinData, nama: text })} />
          <Text>Usia</Text><Gap height={8} /><TextInput style={styles.input} value={remajaCatinData.usia} onChangeText={text => handleNumericInput(text, setRemajaCatinData, 'usia')} keyboardType="numeric" />
          <Text>Berat Badan (kg)</Text><Gap height={8} /><TextInput style={styles.input} value={remajaCatinData.beratBadan} onChangeText={text => handleNumericInput(text, setRemajaCatinData, 'beratBadan')} keyboardType="numeric" />
          <Text>Tinggi Badan (cm)</Text><Gap height={8} /><TextInput style={styles.input} value={remajaCatinData.tinggiBadan} onChangeText={text => handleNumericInput(text, setRemajaCatinData, 'tinggiBadan')} keyboardType="numeric" />
          <Text>LILA (cm)</Text><Gap height={8} /><TextInput style={styles.input} value={remajaCatinData.lila} onChangeText={text => handleNumericInput(text, setRemajaCatinData, 'lila')} keyboardType="numeric" />
          <Text>Konsumsi Tablet Fe</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih konsumsi Fe" value={remajaCatinData.konsumsiFe} onChange={item => setRemajaCatinData({ ...remajaCatinData, konsumsiFe: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Akses Air Minum</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={layakOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih akses air" value={remajaCatinData.aksesAir} onChange={item => setRemajaCatinData({ ...remajaCatinData, aksesAir: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Jamban Layak</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={layakOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih jamban layak" value={remajaCatinData.jambanLayak} onChange={item => setRemajaCatinData({ ...remajaCatinData, jambanLayak: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>BPJS</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih BPJS" value={remajaCatinData.bpjs} onChange={item => setRemajaCatinData({ ...remajaCatinData, bpjs: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>KTP</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih KTP" value={remajaCatinData.ktp} onChange={item => setRemajaCatinData({ ...remajaCatinData, ktp: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
          <Text>Akte Kelahiran</Text><Gap height={8} /><Dropdown style={styles.dropdown} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} data={yesNoOptions} maxHeight={200} labelField="label" valueField="value" placeholder="Pilih akte kelahiran" value={remajaCatinData.akteKelahiran} onChange={item => setRemajaCatinData({ ...remajaCatinData, akteKelahiran: item.value })} renderRightIcon={() => <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />} />
        </>
      )}
      {/* Common Fields */}
      <Text>Kecamatan</Text>
      <Gap height={8} />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={daerahData}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder="Pilih kecamatan"
        value={category === 'Balita' ? balitaData.daerah : category === 'Ibu Balita' ? ibuBalitaData.daerah : category === 'Ibu Hamil' ? ibuHamilData.daerah : remajaCatinData.daerah}
        onChange={item => {
          if (category === 'Balita') setBalitaData({ ...balitaData, daerah: item.value });
          else if (category === 'Ibu Balita') setIbuBalitaData({ ...ibuBalitaData, daerah: item.value });
          else if (category === 'Ibu Hamil') setIbuHamilData({ ...ibuHamilData, daerah: item.value });
          else setRemajaCatinData({ ...remajaCatinData, daerah: item.value });
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />
        )}
      />
      <Text>Latitude (Koordinat Kiri)</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan koordinat kiri"
        value={category === 'Balita' ? balitaData.latitude : category === 'Ibu Balita' ? ibuBalitaData.latitude : category === 'Ibu Hamil' ? ibuHamilData.latitude : remajaCatinData.latitude}
        onChangeText={text => {
          if (category === 'Balita') handleNumericInput(text, setBalitaData, 'latitude');
          else if (category === 'Ibu Balita') handleNumericInput(text, setIbuBalitaData, 'latitude');
          else if (category === 'Ibu Hamil') handleNumericInput(text, setIbuHamilData, 'latitude');
          else handleNumericInput(text, setRemajaCatinData, 'latitude');
        }}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
      />
      <Text>Longitude (Koordinat Kanan)</Text>
      <Gap height={8} />
      <TextInput
        style={styles.input}
        placeholder="Masukkan koordinat kanan"
        value={category === 'Balita' ? balitaData.longitude : category === 'Ibu Balita' ? ibuBalitaData.longitude : category === 'Ibu Hamil' ? ibuHamilData.longitude : remajaCatinData.longitude}
        onChangeText={text => {
          if (category === 'Balita') handleNumericInput(text, setBalitaData, 'longitude');
          else if (category === 'Ibu Balita') handleNumericInput(text, setIbuBalitaData, 'longitude');
          else if (category === 'Ibu Hamil') handleNumericInput(text, setIbuHamilData, 'longitude');
          else handleNumericInput(text, setRemajaCatinData, 'longitude');
        }}
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
        disabled={!isFormFilled() || isLoading}>
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
            <Text style={{ fontSize: 25, marginTop: 43, textAlign: 'center', fontWeight: '500' }}>
              {isSuccess ? 'Data berhasil dimasukkan!' : 'Data gagal dimasukkan!'}
            </Text>
            {isSuccess && stuntingRisk && (
              <Text style={{ fontSize: 20, marginTop: 20, textAlign: 'center', color: stuntingRisk === 'Berisiko Stunting' ? 'red' : 'green' }}>
                Status: {stuntingRisk}
              </Text>
            )}
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