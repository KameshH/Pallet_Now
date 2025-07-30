import React from 'react';
import { Text, View } from 'react-native';
import Barcode from '@kichiyaki/react-native-barcode-generator';

type Props = {
  gtin?: string;
};

export const BarcodeGenerator = ({ gtin }: Props) => {
  const cleanedGTIN = String(gtin).trim();
  if (!cleanedGTIN || cleanedGTIN.length !== 13) {
    return <Text>No valid GTIN</Text>;
  }

  return (
    <View>
      <Barcode
        value={cleanedGTIN}
        format="EAN13"
        width={1}
        maxWidth={300}
        height={100}
        background="#ffffff"
      />
    </View>
  );
};
