export const Types = {
    FETCH_NOTICIAS_SAGA: 'FETCH_NOTICIAS_SAGA',
    FETCH_NOTICIAS_SUCCEEDED: 'FETCH_NOTICIAS_SUCCEEDED',
    FETCH_NOTICIAS_FAILED: 'FETCH_NOTICIAS_FAILED',
}

const Creators = {
    fetchNoticias: () => {
        return {
            type: Types.FETCH_NOTICIAS_SAGA,
        }
    },

}
export default Creators;


const initalState = {
    data: [],
    loading: false,
    error: false
};

export function noticiasReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_NOTICIAS_SAGA:
            console.log(`${Types.FETCH_NOTICIAS_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_NOTICIAS_SUCCEEDED:
            console.log(`${Types.FETCH_NOTICIAS_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.noticias,
                loading: false, error: false
            };

        case Types.FETCH_NOTICIAS_FAILED:
            console.log(`${Types.FETCH_NOTICIAS_FAILED}`);
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

