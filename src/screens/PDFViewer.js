import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import PDFReader from 'rn-pdf-reader-js'

export default function PDFViewer({ route }) {
    const uri = route.params?.url;

    return (
        <PDFReader
            source={{
                uri: uri,
            }}
            useGoogleReader={true}
        />
    )
}
