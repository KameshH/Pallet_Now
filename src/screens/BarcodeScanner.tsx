import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BarcodeScannerScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera access to scan barcodes',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true);
      }
    } catch (err) {
      console.error('Permission request error:', err);
      setHasPermission(false);
    }
  };

  const onBarcodeScan = (event: {
    nativeEvent: { codeStringValue: string };
  }) => {
    console.log('Barcode scan event received:', event);

    if (!scanned) {
      try {
        const code = event.nativeEvent.codeStringValue;
        console.log('Scanned barcode:', code);

        if (code && code.trim().length > 0) {
          setScanned(true);

          Alert.alert('Barcode Scanned!', `Code: ${code}`, [
            {
              text: 'View Product',
              onPress: () => {
                navigation.navigate('ProductDetails', {
                  product: {
                    id: code,
                    name: `Product ${code}`,
                    discounted_price: 0,
                    original_price: 0,
                    main_category: 'Scanned Product',
                    images: {},
                    discount_percent: 0,
                  },
                  scannedCode: code,
                });
              },
            },
            {
              text: 'Scan Another',
              onPress: () => setScanned(false),
              style: 'cancel',
            },
          ]);
        }
      } catch (error) {
        console.error('Error processing barcode:', error);
        Alert.alert('Error', 'Failed to process barcode. Please try again.');
        setScanned(false);
      }
    }
  };

  const onCameraError = (error: any) => {
    console.error('Camera error:', error);
    Alert.alert(
      'Camera Error',
      'Failed to access camera. Please check camera permissions.',
      [
        { text: 'OK', onPress: () => navigation.goBack() },
        {
          text: 'Retry',
          onPress: () => {
            setScanned(false);
            requestCameraPermission();
          },
        },
      ],
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="camera-alt" size={80} color="#ccc" />
          <Text style={styles.errorText}>Camera permission denied</Text>
          <Text style={styles.errorSubtext}>
            Please enable camera access in your device settings
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan Barcode</Text>
        <View style={{ width: 24 }} />
      </View>

      <Camera
        showFrame={true}
        scanBarcode={true}
        laserColor={'blue'}
        frameColor={'yellow'}
        onReadCode={onBarcodeScan}
        cameraType={CameraType.Back}
        style={styles.camera}
        onError={onCameraError}
      />

      {scanned && (
        <View style={styles.scanningOverlay}>
          <Text style={styles.scanningText}>Processing...</Text>
        </View>
      )}

      {!scanned && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Position the barcode within the frame
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanningOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructionsText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});

export default BarcodeScannerScreen;
