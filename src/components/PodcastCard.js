import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';

import { colors } from '../config/Constants';

export default function MenuItem({ title, description, progress, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.podcastCardContainer}
        >
            <View
                style={{ padding: 10 }}
            >
                <Text
                    style={styles.title}
                >{title}</Text>
                <Text
                    numberOfLines={3}
                    style={styles.description}
                >{description}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10
                    }}
                >
                    <AntDesign name="play" size={35} color={colors.primary} />
                    <Text
                        style={{ marginLeft: 10 }}
                    >15 Mai 2020</Text>
                </View>
            </View>
            <ProgressBar style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }} progress={progress} color={colors.primary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    description: {
        textAlign: 'justify'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginVertical: 10
    },
    podcastCardContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 5,
        marginBottom: 20
    }
});
