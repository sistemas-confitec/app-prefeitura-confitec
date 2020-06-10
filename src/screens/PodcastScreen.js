import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { Audio } from 'expo-av';

import api from '../services/api';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import PodcastCard from '../components/PodcastCard';
const soundObject = new Audio.Sound();


export default function PodcastScreen() {
    const [podcastData, setPodcastData] = useState([]);
    const [loadingPodcastData, setLoadingPodcastData] = useState(false);
    const [playBackStatus, setPlayBackStatus] = useState(null);
    const [currentPodcast, setCurrentPodcast] = useState(null);

    const fetchPodcasts = async () => {
        setLoadingPodcastData(true);
        const resp = await api.get('/wp-json/wp/v2/app-podcast');
        setPodcastData(resp.data);
        setLoadingPodcastData(false);
    }

    const _onPlaybackStatusUpdate = playbackStatus => {
        setPlayBackStatus(playbackStatus);
    };
    soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);

    const playAudio = async (url,id) => {
        try {
            const status = await soundObject.getStatusAsync();
            console.log('status', status);
            if ((!status.isLoaded && !status.isBuffering) || currentPodcast!==id) {
                console.log('aqui')
                await soundObject.loadAsync({ uri: url });
                await soundObject.playAsync();
                await soundObject.setProgressUpdateIntervalAsync(10000);
                setCurrentPodcast(id);
            }
            if(currentPodcast===id){
                if (!status.isPlaying) {
                    await soundObject.playAsync();
                } else {
                    await soundObject.pauseAsync();
                }
            }
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    };

    useEffect(() => { fetchPodcasts() }, []);
    return (
        <View style={styles.container}>
            <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={loadingPodcastData} onRefresh={fetchPodcasts} />}
                contentContainerStyle={{ flexGrow: 1, padding: 10 }}
            >
                {podcastData.map((podcast) => {
                    if (podcast.meta_box?.audio_podcast[0]?.url) {
                        return <PodcastCard
                            key={podcast.id}
                            playBackStatus={playBackStatus}
                            currentPodcast={currentPodcast}
                            id={podcast.id}
                            onPressPlay={() => { playAudio(podcast.meta_box?.audio_podcast[podcast.meta_box?.audio_podcast.length-1]?.url, podcast.id)}}
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
