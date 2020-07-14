import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useSelector, useDispatch } from 'react-redux';

import podcastsActions from '../store/ducks/podcastDuck';

const soundObject = new Audio.Sound();



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


