/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LineChart} from "react-native-chart-kit";

const data = [
  { label: '7 Hari Terakhir', value: '7' },
  { label: '30 Hari Terakhir', value: '30' },
  { label: '1 Tahun Terakhir', value: '365' },
];

const dataDaerah = [
  { label: 'Airmadidi', value: 'Airmadidi' },
  { label: 'Kalawat', value: 'Kalawat' },
  { label: 'Dimembe', value: 'Dimembe' },
  { label: 'Kauditan', value: 'Kauditan' },
  { label: 'Kema', value: 'Kema' },
  { label: 'Likupang', value: 'Likupang' },
];

const Statistik = () => {
  const [value, setValue] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  return (
    <View>
        <Text style={styles.title}>View Statistik</Text>
      <View style={styles.container1}>
        <Text style={styles.text}>Airmadidi</Text>
        {/* Dropdown Daerah */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={dataDaerah}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Pilih Daerah"
          value={value}
          onChange={item => setValue(item.value)}
          renderRightIcon={() => (
            <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />
          )}
        />
      </View>
      <Text style={styles.text2}>Jumlah Kasus Pada Daerah Ini</Text>
      <LineChart
          data={{
          labels: ["Airmadidi", "Kalawat", "Dimembe", "Kauditan", "Kema", "Likupang"],
          datasets: [
              {
              data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
              ]
              }
          ]
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={260}
          chartConfig={{
          backgroundColor: "#0077B6",
          backgroundGradientFrom: "#0077B6",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `white`,
          labelColor: (opacity = 1) => `white`,
          propsForHorizontalLabels: {
            fontSize: 10, // Reduce font size for horizontal labels
            translateX: -10,
        },propsForVerticalLabels: {
          fontSize: 10, // Reduce font size for vertical labels
          translateY: 5,
      },
          }}
          bezier
          style={{
          marginVertical: 8,
          borderRadius: 8,
          alignSelf: 'center',
          top: 20,
          }}
      />
      {/* Dropdown Waktu */}
      <View style={styles.container2}>
        <Dropdown
          style={styles.dropdownTime}
          placeholderStyle={styles.timePlaceholderStyle}
          selectedTextStyle={styles.selectedTextStyletime}
          data={data}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="7 Hari Terakhir"
          value={selectedTime}
          onChange={item => setSelectedTime(item.value)}
          renderRightIcon={() => (
            <AntDesign style={styles.icon} color="black" name="down" size={24} />
          )}
        />
      </View>
    </View>
  );
};

export default Statistik;
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  container1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 20,
    paddingHorizontal: 10,
  },
  container2: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0077B6',
    paddingVertical: 10,
  },
  dropdown: {
    width: '60%',
    height: 46,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  dropdownTime: {
    width: 220,
    height: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    top: 40,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#A9A9A9',
    textAlignVertical: 'center',
  },
  timePlaceholderStyle: {

    fontSize: 24,
    fontWeight: 'bold',
    color: '#051532',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    textAlignVertical: 'center',
  },
  selectedTextStyletime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051532',
  },

  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '40%',
  },
  text2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(42, 42, 42, 0.52)',
    width: 180,
    marginTop: 40,
    marginLeft: 20,
  },

});