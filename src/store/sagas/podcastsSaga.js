import { call, put } from 'redux-saga/effects';
import * as FileSystem from 'expo-file-system';

import api from '../../services/api';
import { Types } from '../ducks/podcastDuck';

export function* fetchPodcastsSaga() {
    try {
        const response = yield call(api.get, '/wp-json/wp/v2/app-podcast?per_page=100');

        const downloadedPodcasts = {};
        for (const podcast of response.data) {
            const fileInfo = yield call(FileSystem.getInfoAsync, FileSystem.documentDirectory + `podcast-${podcast.id}.mp3`);
            if (fileInfo.exists) {
                downloadedPodcasts[podcast.id] = FileSystem.documentDirectory + `podcast-${podcast.id}.mp3`;
            }
        }

        yield put({
            type: Types.FETCH_PODCASTS_SUCCEEDED,
            payload: {
                podcasts: response.data,
                downloadedPodcasts
            }
        });


    } catch (e) {
        yield put({ type: Types.FETCH_PODCASTS_FAILED, message: e.message });
    }
}