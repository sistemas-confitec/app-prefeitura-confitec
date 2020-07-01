export const Types = {
    FETCH_MUNICIPIO_SAGA: 'FETCH_MUNICIPIO_SAGA',
    FETCH_MUNICIPIO_SUCCEEDED: 'FETCH_MUNICIPIO_SUCCEEDED',
    FETCH_MUNICIPIO_FAILED: 'FETCH_MUNICIPIO_FAILED',
}

const Creators = {
    fetchMunicipio: () => {
        return {
            type: Types.FETCH_MUNICIPIO_SAGA,
        }
    },

}
export default Creators;


const initalState = {
    data: {},
    loading: true,
    error: false
};

export function municipioReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_MUNICIPIO_SAGA:
            console.log(`${Types.FETCH_MUNICIPIO_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_MUNICIPIO_SUCCEEDED:
            console.log(`${Types.FETCH_MUNICIPIO_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.municipio,
                loading: false, error: false
            };

        case Types.FETCH_MUNICIPIO_FAILED:
            console.log(`${Types.FETCH_MUNICIPIO_FAILED}`);
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

