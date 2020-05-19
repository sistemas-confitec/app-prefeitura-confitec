import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Icons from '@expo/vector-icons';

import { colors } from '../config/Constants';

export default function LRFTypeButton({ title, subtitle, onPress }) {
    return (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Text style={{ ...styles.text, fontWeight: 'bold' }}>{title}</Text>
            <Text style={styles.text}>{subtitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 5,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    text: {
        color: colors.secundary,
        textAlign: 'center'
    }
});
