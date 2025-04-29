/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LineChart } from 'react-native-chart-kit';
import { db } from '../../../config/firebase'; // Adjust the path to your Firebase config

const timePeriods = [
  { label: '7 Hari', value: 7 },
  { label: '1 Bulan', value: 30 },
  { label: '1 Tahun', value: 365 },
];

const Statistik = () => {
  const [selectedTime, setSelectedTime] = useState(7); // Default to 7 days
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0]); // Initialize counts for each region

  // Fetch and process Firestore data in real-time
  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(
      snapshot => {
        const regionCounts = {
          Airmadidi: 0,
          Kalawat: 0,
          Dimembe: 0,
          Kauditan: 0,
          Kema: 0,
          Likupang: 0,
        };

        // Calculate the cutoff date based on the selected time period
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - selectedTime);

        snapshot.forEach(doc => {
          const userData = doc.data();

          // Check if the document falls within the selected time period
          const createdAt = userData.createdAt?.toDate(); // Convert Firestore timestamp to JS Date
          if (!createdAt || createdAt < cutoffDate) {
            return; // Skip documents outside the time range
          }

          // Use the daerah field if available, otherwise fall back to address parsing
          const region = userData.daerah || '';
          if (regionCounts.hasOwnProperty(region)) {
            regionCounts[region]++;
          } else {
            // Fallback for older documents without daerah field
            const address = userData.address || userData.tempatTinggal || '';
            const addressLower = address.toLowerCase();
            if (addressLower.includes('airmadidi')) {
              regionCounts.Airmadidi++;
            } else if (addressLower.includes('kalawat')) {
              regionCounts.Kalawat++;
            } else if (addressLower.includes('dimembe')) {
              regionCounts.Dimembe++;
            } else if (addressLower.includes('kauditan')) {
              regionCounts.Kauditan++;
            } else if (addressLower.includes('kema')) {
              regionCounts.Kema++;
            } else if (addressLower.includes('likupang')) {
              regionCounts.Likupang++;
            }
          }
        });

        // Update chart data with the counts
        const updatedChartData = [
          regionCounts.Airmadidi,
          regionCounts.Kalawat,
          regionCounts.Dimembe,
          regionCounts.Kauditan,
          regionCounts.Kema,
          regionCounts.Likupang,
        ];
        setChartData(updatedChartData);
      },
      error => {
        console.error('Error fetching stunting data:', error);
      }
    );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [selectedTime]); // Re-run effect when selectedTime changes

  return (
    <View>
      <Text style={styles.title}>View Statistik</Text>
      <View style={styles.container1}>
        <Text style={styles.text}>
          {timePeriods.find(period => period.value === selectedTime)?.label || '7 Hari'}
        </Text>
        {/* Dropdown for Time Period */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={timePeriods}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Pilih Periode"
          value={selectedTime}
          onChange={item => setSelectedTime(item.value)}
          renderRightIcon={() => (
            <AntDesign style={styles.icon} color="#A9A9A9" name="down" size={18} />
          )}
        />
      </View>
      <Text style={styles.text2}>Jumlah Kasus Per Daerah</Text>
      <LineChart
        data={{
          labels: ['Airmadidi', 'Kalawat', 'Dimembe', 'Kauditan', 'Kema', 'Likupang'],
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={Dimensions.get('window').width - 20}
        height={260}
        chartConfig={{
          backgroundColor: '#0077B6',
          backgroundGradientFrom: '#0077B6',
          backgroundGradientTo: '#2A9D8F',
          decimalPlaces: 0,
          color: (opacity = 1) => `white`,
          labelColor: (opacity = 1) => `white`,
          propsForHorizontalLabels: {
            fontSize: 10,
            translateX: -10,
          },
          propsForVerticalLabels: {
            fontSize: 10,
            translateY: 5,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 8,
          alignSelf: 'center',
          top: 20,
        }}
      />
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
  placeholderStyle: {
    fontSize: 16,
    color: '#A9A9A9',
    textAlignVertical: 'center',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    textAlignVertical: 'center',
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