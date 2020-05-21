import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { Audio } from 'expo-av';

import api from '../services/api';
import { colors } from '../config/Constants';
import PodcastCard from '../components/PodcastCard';
const soundObject = new Audio.Sound();


export default function PodcastScreen() {
    const [podcastData, setPodcastData] = useState([]);
    const [loadingPodcastData, setLoadingPodcastData] = useState(false);
    const [progress, setProgress] = useState(0);
    //const [playBackStatus, setPlayBackStatus] = useState(0);

    const fetchPodcasts = async () => {
        setLoadingPodcastData(true);
        const resp = await api.get('/wp-json/wp/v2/app-podcast');
        setPodcastData(resp.data);
        setLoadingPodcastData(false);
    }

    /* const _onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state

            if (playbackStatus.isPlaying) {
                // Update your UI for the playing state
                setProgress(playbackStatus.positionMillis/playbackStatus.durationMillis)
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
        }
    };
    soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate); */

    /* const playAudio = async (url) => {
        try {
            const status = await soundObject.getStatusAsync();
            console.log('status', status);
            if (!status.isLoaded && !status.isBuffering) {
                console.log('aqui')
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
    } */

    useEffect(() => { fetchPodcasts() }, []);
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={loadingPodcastData} onRefresh={fetchPodcasts} />}
                contentContainerStyle={{ flexGrow: 1, padding: 10 }}
            >
                {podcastData.map((podcast) => {
                    if (podcast.meta_box?.audio_podcast[0]?.url) {
                        return <PodcastCard
                            key={podcast.id}
                            progress={progress}
                            //onPressPlay={() => { playAudio(podcast.meta_box?.audio_podcast[0]?.url) }}
                            url={podcast.meta_box?.audio_podcast[0]?.url}
                            title={podcast.meta_box.titulo_podcast}
                            description={podcast.meta_box.descricao_podcast} />
                    }
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroudColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
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
