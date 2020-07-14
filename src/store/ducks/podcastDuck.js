export const Types = {
    FETCH_PODCASTS_SAGA: 'FETCH_PODCASTS_SAGA',
    FETCH_PODCASTS_SUCCEEDED: 'FETCH_PODCASTS_SUCCEEDED',
    FETCH_PODCASTS_FAILED: 'FETCH_PODCASTS_FAILED',

    SET_PLAYBACK_STATUS: 'SET_PLAYBACK_STATUS',
}

const Creators = {
    fetchPodcasts: () => {
        return {
            type: Types.FETCH_PODCASTS_SAGA,
        }
    },
    setPlaybackStatus: (id, status) => {
        return {
            type: Types.SET_PLAYBACK_STATUS,
            payload: { id, status }
        }
    },
}
export default Creators;


const initalState = {
    data: [],
    playingPodcast: null,
    playingPodcastStatus: null,
    loading: true,
    error: false
};

export function podcastsReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_PODCASTS_SAGA:
            console.log(`${Types.FETCH_PODCASTS_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_PODCASTS_SUCCEEDED:
            console.log(`${Types.FETCH_PODCASTS_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.podcasts,
                downloadedPodcasts: action.payload.downloadedPodcasts,
                loading: false, error: false
            };

        case Types.FETCH_PODCASTS_FAILED:
            console.log(`${Types.FETCH_PODCASTS_FAILED}`);
            return { ...state, loading: false, error: true };

        case Types.SET_PLAYBACK_STATUS:
            console.log(`${Types.SET_PLAYBACK_STATUS}`);
            return {
                ...state,
                playingPodcast: action.payload.id,
                playingPodcastStatus: action.payload.status
            };

        default:
            return state;
    }
};

