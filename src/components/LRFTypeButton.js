import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Icons from '@expo/vector-icons';

import { colors } from '../config/Constants';
import globalStyles from '../screens/globalStyles';

export default function LRFTypeButton({ title, subtitle, onPress }) {
    return (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Text style={{ ...globalStyles.title, color: colors.primary, fontSize:18 }}>{title}</Text>
            <Text style={{...globalStyles.text, color:colors.primary}}>{subtitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    text: {
        color: colors.primary,
        textAlign: 'center'
    }
});
