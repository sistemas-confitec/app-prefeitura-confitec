export const Types = {
    FETCH_CNDs_SAGA: 'FETCH_CNDs_SAGA',
    FETCH_CNDs_SUCCEEDED: 'FETCH_CNDs_SUCCEEDED',
    FETCH_CNDs_FAILED: 'FETCH_CNDs_FAILED',
}

const Creators = {
    fetchCNDs: () => {
        return {
            type: Types.FETCH_CNDs_SAGA,
        }
    },

}
export default Creators;


const initalState = {
    data: {},
    loading: true,
    error: false
};

export function CNDsReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_CNDs_SAGA:
            console.log(`${Types.FETCH_CNDs_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_CNDs_SUCCEEDED:
            console.log(`${Types.FETCH_CNDs_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.CNDs,
                loading: false, error: false
            };

        case Types.FETCH_CNDs_FAILED:
            console.log(`${Types.FETCH_CNDs_FAILED}`);
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

