import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import store from '../store';
import podcastsActions from '../store/ducks/podcastDuck';

const audioPlayer = {
    id: null
};

export async function createPlayer() {
    await Audio.setAudioModeAsync({ staysActiveInBackground: true })
    const soundObject = new Audio.Sound();

    const _onPlaybackStatusUpdate = playbackStatus => {
        store.dispatch(podcastsActions.setPlaybackStatus(audioPlayer.id, playbackStatus));
    };
    soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);

    audioPlayer.sound = soundObject;
}



export async function playAudio(id) {
    try {
        if (audioPlayer.sound) {
            const status = await audioPlayer.sound.getStatusAsync();
            console.log('status', status);
            if (audioPlayer.id !== id) {
                console.log('aqui')
                await audioPlayer.sound.unloadAsync();
                await audioPlayer.sound.loadAsync({ uri: FileSystem.documentDirectory + `podcast-${id}.mp3` });
                await audioPlayer.sound.setProgressUpdateIntervalAsync(1000);
                await audioPlayer.sound.playAsync();
                audioPlayer.id = id;
            } else {
                if (!status.isPlaying) {
                    await audioPlayer.sound.playAsync();
                } else {
                    await audioPlayer.sound.pauseAsync();
                }
            }
        }
    } catch (error) {
        // An error occurred!
    }
};

export async function stopAudio() {
    try {
        if (audioPlayer.sound) {
            //const status = await audioPlayer.sound.getStatusAsync();
            //console.log('status', status);

            await audioPlayer.sound.stopAsync();
            audioPlayer.id = null;
        }
    } catch (error) {
        // An error occurred!
    }
};

export default audioPlayer;


