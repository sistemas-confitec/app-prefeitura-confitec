import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Icons from '@expo/vector-icons';

import { colors } from '../config/Constants';

export default function MenuItem({ title, iconName, bgColor, iconSource }) {
    const icon = () => {
        switch (iconSource) {
            case 'FontAwesome':
                return <Icons.FontAwesome name={iconName} size={35} color={colors.menuText} />;
            case 'FontAwesome5':
                return <Icons.FontAwesome5 name={iconName} size={35} color={colors.menuText} />;
            case 'Foundation':
                return <Icons.Foundation name={iconName} size={35} color={colors.menuText} />;
            case 'MaterialCommunityIcons':
                return <Icons.MaterialCommunityIcons name={iconName} size={35} color={colors.menuText} />;
            case 'Ionicons':
                return <Icons.Ionicons name={iconName} size={35} color={colors.menuText} />;
            case 'Entypo':
                return <Icons.Entypo name={iconName} size={35} color={colors.menuText} />;
        }
    }
    return (
        <TouchableOpacity
            style={{ ...styles.menuItem, backgroundColor: bgColor ? bgColor : colors.lightPrimary }}
        >
            {icon()}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        flex: 1,
        aspectRatio: 1.3,
        backgroundColor: colors.lightPrimary,
        padding: 5,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    text: {
        color: colors.menuText,
        textAlign: 'center'
    }
});
