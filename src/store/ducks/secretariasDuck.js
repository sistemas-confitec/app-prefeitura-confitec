export const Types = {
    FETCH_SECRETARIAS_SAGA: 'FETCH_SECRETARIAS_SAGA',
    FETCH_SECRETARIAS_SUCCEEDED: 'FETCH_SECRETARIAS_SUCCEEDED',
    FETCH_SECRETARIAS_FAILED: 'FETCH_SECRETARIAS_FAILED',
}

const Creators = {
    fetchSecretarias: () => {
        return {
            type: Types.FETCH_SECRETARIAS_SAGA,
        }
    },

}
export default Creators;


const initalState = {
    data: [],
    loading: false,
    error: false
};

export function secretariasReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_SECRETARIAS_SAGA:
            console.log(`${Types.FETCH_SECRETARIAS_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_SECRETARIAS_SUCCEEDED:
            console.log(`${Types.FETCH_SECRETARIAS_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.secretarias,
                loading: false, error: false
            };

        case Types.FETCH_SECRETARIAS_FAILED:
            console.log(`${Types.FETCH_SECRETARIAS_FAILED}`);
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

