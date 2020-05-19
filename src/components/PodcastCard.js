import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { Audio } from 'expo-av';

import { colors } from '../config/Constants';

export default function MenuItem({ title, description, onPress, url }) {
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(true);

    const soundObject = new Audio.Sound();

    /* const getPermision = async () => {
        const { status } = await Audio.getPermissionsAsync();
        console.log(status)
        if(status !== 'granted'){
            await Audio.requestPermissionsAsync();
        }
    } */

    /* useEffect(getPermision(), []); */

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
                        onPress={async () => {
                            try {
                                /* const playbackObject = await Audio.Sound.createAsync(
                                    { uri: url },
                                    { shouldPlay: true }
                                ); */
                                //console.log('entrou', url)
                                const status = await soundObject.getStatusAsync();
                                console.log('status', status);
                                if (!status.isLoaded && !status.isBuffering) {
                                    await soundObject.loadAsync({ uri: url });
                                    await soundObject.playAsync();
                                    setPaused(false)
                                }
                                if (!status.isPlaying) {
                                    await soundObject.playAsync();
                                    setPaused(false)
                                } else {
                                    await soundObject.pauseAsync();
                                    setPaused(true);
                                }
                                if (status.positionMillis && status.playableDurationMillis) {
                                    setProgress(status.positionMillis / status.playableDurationMillis)
                                }
                                // Your sound is playing!
                            } catch (error) {
                                // An error occurred!
                            }
                        }}
                    >
                        {paused ?
                            <AntDesign name="play" size={35} color={colors.secundary} /> :
                            <AntDesign name="pausecircle" size={35} color={colors.secundary} />
                        }
                    </TouchableOpacity>
                    <Text
                        style={{ marginLeft: 10 }}
                    >15 Mai 2020</Text>
                </View>
            </View>
            <ProgressBar style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }} progress={progress} color={colors.secundary} />
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
