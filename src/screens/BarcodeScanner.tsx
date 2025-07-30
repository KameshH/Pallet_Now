import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';

import { useNavigation } from '@react-navigation/native';

const BarcodeScannerScreen = () => {
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const onBarcodeScan = (event: {
    nativeEvent: { codeStringValue: string };
  }) => {
    if (!scanned) {
      const code = event.nativeEvent.codeStringValue;
      setScanned(true);
      navigation.navigate('ProductDetails', { scannedCode: code });
      setTimeout(() => setScanned(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        showFrame={true}
        scanBarcode={true}
        laserColor={'blue'}
        frameColor={'yellow'}
        onReadCode={onBarcodeScan}
        cameraType={CameraType.Back}
        style={styles.camera}
      />
    </View>
  );
};

export default BarcodeScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
