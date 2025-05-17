/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { db } from '../../../config/firebase'; // Adjust the path to your Firebase config

const Statistik = () => {
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // Initialize counts for each region
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

  // Fetch and process Firestore data in real-time (only risky cases)
  useEffect(() => {
    const unsubscribe = db.collection('users')
      .where('stuntingRisk', '==', 'Berisiko') // Filter only risky cases
      .onSnapshot(
        snapshot => {
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

            // Use the daerah field if available
            const region = userData.daerah || '';
            if (counts.hasOwnProperty(region)) {
              counts[region]++;
            } else {
              // Fallback for older documents without daerah field
              const address = userData.address || userData.tempatTinggal || '';
              const addressLower = address.toLowerCase();
              if (addressLower.includes('airmadidi')) {
                counts.Airmadidi++;
              } else if (addressLower.includes('kalawat')) {
                counts.Kalawat++;
              } else if (addressLower.includes('dimembe')) {
                counts.Dimembe++;
              } else if (addressLower.includes('kauditan')) {
                counts.Kauditan++;
              } else if (addressLower.includes('kema')) {
                counts.Kema++;
              } else if (addressLower.includes('likupang barat')) {
                counts.Likupang_barat++;
              } else if (addressLower.includes('likupang selatan')) {
                counts.Likupang_selatan++;
              } else if (addressLower.includes('likupang timur')) {
                counts.Likupang_timur++;
              } else if (addressLower.includes('talawaan')) {
                counts.Talawaan++;
              } else if (addressLower.includes('wori')) {
                counts.Wori++;
              }
            }
          });

          // Update chart data and region counts
          const updatedChartData = [
            counts.Airmadidi,
            counts.Kalawat,
            counts.Dimembe,
            counts.Kauditan,
            counts.Kema,
            counts.Likupang_barat,
            counts.Likupang_selatan,
            counts.Likupang_timur,
            counts.Talawaan,
            counts.Wori,
          ];
          setChartData(updatedChartData);
          setRegionCounts(counts);
        },
        error => {
          console.error('Error fetching stunting data:', error);
        }
      );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Array singkatan untuk label chart
  const shortLabels = [
    'Air',
    'Kal',
    'Dim',
    'Kaud',
    'Kema',
    'Lik.B',
    'Lik.S',
    'Lik.T',
    'Tal',
    'Wori',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Statistik</Text>
      <Text style={styles.headline}>Jumlah Kasus Per Kecamatan</Text>
      <LineChart
        data={{
          labels: shortLabels, // Menggunakan singkatan
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
            fontSize: 8, // Mengurangi ukuran font
            translateX: -5,
            rotation: 60, // Meningkatkan rotasi untuk lebih banyak ruang
          },
          propsForVerticalLabels: {
            fontSize: 10,
            translateY: 5,
          },
        }}
        style={styles.chart}
      />
      {/* Region Counts Summary Section */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Jumlah Kasus Per Kecamatan</Text>
        <View style={styles.regionGrid}>
          {Object.entries(regionCounts).map(([region, count]) => (
            <View key={region} style={styles.regionItem}>
              <Text style={styles.regionText}>{`${region}: ${count} kasus`}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Statistik;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0077B6',
    paddingVertical: 10,
  },
  headline: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A2A2A',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 28,
    borderRadius: 8,
    alignSelf: 'center',
  },
  summaryContainer: {
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
    width: (Dimensions.get('window').width - 70) / 2,
    marginBottom: 10,
  },
  regionText: {
    fontSize: 14,
    color: '#333',
  },
});