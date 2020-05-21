import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { Audio } from 'expo-av';
import { Overlay } from 'react-native-elements';

const soundObject = new Audio.Sound();

import { colors } from '../config/Constants';

export default function PodcastPlayer({ title, description, visible, url }) {
    const [progress, setProgress] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [playBackStatus, setPlayBackStatus] = useState(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);


    /* const getPermision = async () => {
        const { status } = await Audio.getPermissionsAsync();
        console.log(status)
        if(status !== 'granted'){
            await Audio.requestPermissionsAsync();
        }
    } */

    /* useEffect(getPermision(), []); */


    const _onPlaybackStatusUpdate = playbackStatus => {
        setPlayBackStatus(playbackStatus)
        /* if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state
            if (playbackStatus.isPlaying) {
                // Update your UI for the playing state
                setProgress(playbackStatus.positionMillis / playbackStatus.durationMillis)
                //console.log(playbackStatus.positionMillis / playbackStatus.playableDurationMillis)
            } else {
                // Update your UI for the paused state

            }

            if (playbackStatus.isBuffering) {
                // Update your UI for the buffering state
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing and will stop. Maybe you want to play something else?
            }
        } */
    };
    soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);

    const playAudio = async () => {
        try {
            const status = await soundObject.getStatusAsync();
            console.log('status', status);
            if (!status.isLoaded && !status.isBuffering) {
                console.log('aqui')
                await soundObject.loadAsync({ uri: url });
                await soundObject.playAsync();
                await soundObject.setProgressUpdateIntervalAsync(10000);
                setPaused(false)
            }
            if (!status.isPlaying) {
                await soundObject.playAsync();
                setPaused(false)
            } else {
                await soundObject.pauseAsync();
                setPaused(true);
            }
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    };

    return (
        <Overlay
            overlayStyle={
                {
                    width: '95%',
                    backgroundColor: '#FFF',
                    borderRadius: 8,
                    marginBottom: 20
                }
            }
            isVisible={visible}
            onBackdropPress={() => { }}>
            <>
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
                            //onPress={onPressPlay}
                            onPress={() => { playAudio() }}
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
                {!!playBackStatus && !!playBackStatus.positionMillis && <Text>{Math.floor(playBackStatus.positionMillis / (1000*60))}:{Math.floor(playBackStatus.positionMillis/1000 % 60)}{Math.floor(playBackStatus.positionMillis/1000 % 60)}/{Math.floor(playBackStatus.durationMillis / (1000*60))}:{Math.floor(playBackStatus.durationMillis / (1000*60))}:{Math.floor(playBackStatus.durationMillis/1000 % 60)}{Math.floor(playBackStatus.durationMillis/1000 % 60)}</Text>}
                {!!playBackStatus && !!playBackStatus.positionMillis ?
                    <ProgressBar
                        style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                        progress={playBackStatus.positionMillis / playBackStatus.durationMillis}
                        color={colors.secundary} /> :
                    <ProgressBar
                        style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                        progress={0} color={colors.secundary} />}
            </>
        </Overlay>
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
