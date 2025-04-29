import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../../../config/firebase'; // Adjust the path to your Firebase config

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Harap masukkan email dan kata sandi.');
      return;
    }
  
    setLoading(true);
    try {
      // Sign in with email and password
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Authenticated user UID:', user.uid);
  
      // Fetch the user's role from the 'roles' collection
      const roleDoc = await db.collection('roles').doc(user.uid).get();
      if (!roleDoc.exists) {
        throw new Error('Peran pengguna tidak ditemukan di database.');
      }
  
      const roleData = roleDoc.data();
      const role = roleData.roles ? roleData.roles.toLowerCase() : null; // Normalize to lowercase
      console.log('Fetched role data:', roleData);
      console.log('Role value:', role);
  
      // Validate role
      const validRoles = ['pemerintah', 'posyandu', 'puskesmas', 'admin'];
      if (!role || !validRoles.includes(role)) {
        throw new Error(`Peran pengguna tidak valid: ${role || 'tidak ada peran'}`);
      }
  
      // Navigate to Home screen with the role
      navigation.replace('Home', { userRole: role });
    } catch (error) {
      console.error('Error during login:', error);
      let errorMessage = 'Terjadi kesalahan saat masuk. Silakan coba lagi.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Kata sandi salah.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Pengguna tidak ditemukan.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Format email tidak valid.';
      } else {
        errorMessage = error.message; // Show the specific error message
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back" size={24} color="#0099CC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Masuk</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.welcomeTitle}>Selamat Datang</Text>
          <Text style={styles.welcomeDescription}>
            Masuk untuk mengelola dan memantau data stunting secara real-time. Aplikasi ini hanya dapat diakses oleh pengguna terdaftar: Pemerintah, Posyandu, Puskesmas, dan Admin
          </Text>
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Alamat Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />

            <Text style={styles.inputLabel}>Kata Sandi</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Memuat...' : 'Masuk'}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.fingerprintButton} disabled={loading}>
            <View style={styles.fingerprintCircle}>
              <Icon name="finger-print-outline" size={32} color="#0099CC" />
            </View>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0077B6',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 8,
  },
  welcomeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#E8F0FE',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8F0FE',
    borderRadius: 8,
    marginBottom: 4,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#999',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#0077B6',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  loginButtonDisabled: {
    backgroundColor: '#A9CCE3',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  fingerprintButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  fingerprintCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#0099CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;