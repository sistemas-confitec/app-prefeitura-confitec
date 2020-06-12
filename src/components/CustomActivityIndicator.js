import React from 'react';
import { ActivityIndicator } from 'react-native';


export default function CustomActivityIndicator() {

    return (
        <ActivityIndicator style={{alignSelf:'center', flex:1}} size={40} />
    );
}

