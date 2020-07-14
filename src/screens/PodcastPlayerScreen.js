/* import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useSelector, useDispatch } from 'react-redux';

import podcastsActions from '../store/ducks/podcastDuck';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';
const soundObject = new Audio.Sound();


export default function PodcastScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const playingPodcast = useSelector(state=> state.podcasts.playingPodcast)
    const title = route.params?.title;
    const description = route.params?.description;
    const id = route.params?.id;
    const podcastUrl = route.params?.podcastUrl;


    const _onPlaybackStatusUpdate = playbackStatus => {
        dispatch(podcastsActions.setPlaybackStatus(id, playbackStatus));
    };
    soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);

    const playAudio = async (id) => {
        try {
            const status = await soundObject.getStatusAsync();
            console.log('status', status);
            if ((!status.isLoaded && !status.isBuffering) || playingPodcast !== id) {
                console.log('aqui')
                await soundObject.loadAsync({ uri: FileSystem.documentDirectory + `podcast-${id}.mp3` });
                await soundObject.playAsync();
                await soundObject.setProgressUpdateIntervalAsync(1000);
            }
            if (playingPodcast === id) {
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

    return (
        <View style={globalStyles.container}>
            <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            />
            <ImageBackground
                style={globalStyles.elevatedContent}
                source={require('../../assets/background_image.png')}
            >
                <View
                    style={globalStyles.backgroundImageTransparency}
                >
                    <CloseSubheader
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                playAudio(id)
                            }}
                        >
                            <Text>Play Audio</Text>
                        </TouchableOpacity>
                         <PodcastCard
                            key={podcast.id}
                            playBackStatus={playBackStatus}
                            currentPodcast={currentPodcast}
                            id={podcast.id}
                            navigation={navigation}
                            onPressPlay={() => { playAudio(podcastUrl, podcast.id) }}
                            podcastUrl={podcast.meta_box?.audio_podcast[podcast.meta_box?.audio_podcast.length - 1]?.url}
                            title={podcast.meta_box.titulo_podcast}
                            description={podcast.meta_box.descricao_podcast} />
                    </ScrollView>
                </View>
            </ImageBackground>
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
 */