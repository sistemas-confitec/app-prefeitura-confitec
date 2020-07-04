export const Types = {
    FETCH_OUVIDORIA_SAGA: 'FETCH_OUVIDORIA_SAGA',
    FETCH_OUVIDORIA_SUCCEEDED: 'FETCH_OUVIDORIA_SUCCEEDED',
    FETCH_OUVIDORIA_FAILED: 'FETCH_OUVIDORIA_FAILED',
}

const Creators = {
    fetchOuvidoria: () => {
        return {
            type: Types.FETCH_OUVIDORIA_SAGA,
        }
    },

}
export default Creators;


const initalState = {
    data: {},
    loading: true,
    error: false
};

export function ouvidoriaReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_OUVIDORIA_SAGA:
            console.log(`${Types.FETCH_OUVIDORIA_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_OUVIDORIA_SUCCEEDED:
            console.log(`${Types.FETCH_OUVIDORIA_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.ouvidoria,
                loading: false, error: false
            };

        case Types.FETCH_OUVIDORIA_FAILED:
            console.log(`${Types.FETCH_OUVIDORIA_FAILED}`);
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

