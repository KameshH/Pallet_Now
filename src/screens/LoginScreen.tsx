import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '951591786258-b7pk5epluaq68qu5c3f9f2niothurbop.apps.googleusercontent.com',
    });
  }, []);

  const handleLogin = async () => {
    if (email === 'test@gmail.com' && password === 'Test@123') {
      const user = { email };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.reset({ index: 0, routes: [{ name: 'ProductList' }] });
    } else {
      Alert.alert(
        'Invalid credentials',
        'Try email: test@gmail.com | Test@123',
      );
    }
  };

  async function onGoogleButtonPress() {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;
      if (!idToken) throw new Error('No ID token found');
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(getAuth(), googleCredential);
      const user = { email: signInResult.data?.user?.email };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: 'ProductList' }] });
    } catch (e) {
      setLoading(false);
      Alert.alert('Google Sign-In failed', e.message);
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        navigation.reset({ index: 0, routes: [{ name: 'Product' }] });
      }
    };
    checkUser();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pallet.png')}
        style={styles.palletImage}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginTop: -60,
          marginBottom: 80,
        }}
      >
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonBlue} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonBlueOutline}
          onPress={onGoogleButtonPress}
        >
          <Text style={styles.buttonTextBlue}>Sign in with Google</Text>
        </TouchableOpacity>
        <Modal visible={loading} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.loaderBox}>
              <ActivityIndicator size="large" color="#1976D2" />
              <Text
                style={{ marginTop: 12, color: '#1976D2', fontWeight: 'bold' }}
              >
                Signing in...
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  palletImage: {
    width: '90%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 20,
  },
  buttonBlue: {
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonBlueOutline: {
    borderColor: '#1976D2',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextBlue: {
    color: '#1976D2',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
});
