import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';


import { colors } from '../config/Constants';
import { pad } from '../util/Functions';

export default function PodcastCard({ title, description, onPress, id, currentPodcast, onPressPlay, playBackStatus }) {

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
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
                    <TouchableOpacity
                        onPress={() => { onPressPlay() }}
                    >
                        {id===currentPodcast && playBackStatus.isPlaying ?
                            <AntDesign name="pausecircle" size={35} color={colors.secondary} />:
                            <AntDesign name="play" size={35} color={colors.secondary} />
                        }
                    </TouchableOpacity>
                    <Text
                        style={{ marginLeft: 10 }}
                    >15 Mai 2020</Text>
                </View>
            </View>
            <View
            style={{
                padding:10
            }}
            >
                {(!!playBackStatus && !!playBackStatus.positionMillis) ? <Text>
                    {pad(Math.floor(playBackStatus.positionMillis / (1000 * 60)))}:{pad(Math.floor(playBackStatus.positionMillis / 1000 % 60))}/{pad(Math.floor(playBackStatus.durationMillis / (1000 * 60)))}:{pad(Math.floor(playBackStatus.durationMillis / (1000 * 60)))}</Text>
                    : <Text>00:00/00:00</Text>}
            </View>
            {!!playBackStatus && !!playBackStatus.positionMillis ?
                <ProgressBar
                    style={{ height: 8 }}
                    progress={playBackStatus.positionMillis / playBackStatus.durationMillis}
                    color={colors.secondary} /> :
                <ProgressBar
                    style={{ height: 8 }}
                    progress={0} color={colors.secondary} />}
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
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        elevation: 5,
        marginBottom: 20
    }
});
