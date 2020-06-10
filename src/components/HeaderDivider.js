import React from 'react';
import {Text} from 'react-native';

export default function HeaderDivider() {
    return (
        <Text
            style={{ color: '#23A455', textAlign: 'justify', alignSelf: 'center', marginBottom: 20 }}
            numberOfLines={1}
            ellipsizeMode={'clip'}
        >/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /</Text>
    )
}