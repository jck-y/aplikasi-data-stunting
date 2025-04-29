import firestore from '@react-native-firebase/firestore';

export const fetchStatisticsData = async (region: string, days: number = 7) => {
  try {
    // Mendapatkan tanggal untuk periode yang diminta
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (days - 1));

    // Mengambil data dari Firestore
    const statisticsDoc = await firestore()
      .collection('statistics')
      .doc(region)
      .get();

    const formattedData = {
      labels: [],
      data: [],
    };

    // Jika dokumen tidak ada, kembalikan array kosong dengan label tanggal
    if (!statisticsDoc.exists) {
      for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateLabel = currentDate.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
        });
        formattedData.labels.push(dateLabel);
        formattedData.data.push(0); // Default ke 0 jika tidak ada data
      }
      return formattedData;
    }

    const regionData = statisticsDoc.data();

    // Mengisi label dan data
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dateLabel = currentDate.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
      });
      const dateKey = dateLabel;

      formattedData.labels.push(dateLabel);
      // Pastikan nilai adalah angka, default ke 0 jika tidak valid
      const value = regionData?.[dateKey];
      formattedData.data.push(
        typeof value === 'number' && !isNaN(value) ? value : 0
      );
    }

    return formattedData;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return {
      labels: Array(days).fill('').map((_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' });
      }),
      data: Array(days).fill(0), // Default ke array nol jika error
    };
  }
};