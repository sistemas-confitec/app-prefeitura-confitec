import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as Icons from '@expo/vector-icons';

import { colors } from '../config/Constants';

export default function MenuItem({ title, iconName, onPress, iconSource }) {
    const icon = () => {
        switch (iconSource) {
            case 'FontAwesome':
                return <Icons.FontAwesome name={iconName} size={35} color={colors.primary} />;
            case 'FontAwesome5':
                return <Icons.FontAwesome5 name={iconName} size={35} color={colors.primary} />;
            case 'Foundation':
                return <Icons.Foundation name={iconName} size={35} color={colors.primary} />;
            case 'MaterialCommunityIcons':
                return <Icons.MaterialCommunityIcons name={iconName} size={35} color={colors.primary} />;
            case 'Ionicons':
                return <Icons.Ionicons name={iconName} size={35} color={colors.primary} />;
            case 'Entypo':
                return <Icons.Entypo name={iconName} size={35} color={colors.primary} />;
        }
    }
    return (
        <TouchableOpacity
            style={ styles.menuItem}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <>
                {icon()}
                <Text style={styles.text}>{title}</Text>
            </>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        flex: 1,
        aspectRatio: 1.3,
        backgroundColor: '#FFF',
        padding: 5,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    text: {
        color: colors.primary,
        textAlign: 'center'
    }
});
