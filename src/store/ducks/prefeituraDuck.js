export const Types = {
    FETCH_PREFEITURA_SAGA: 'FETCH_PREFEITURA_SAGA',
    FETCH_PREFEITURA_SUCCEEDED: 'FETCH_PREFEITURA_SUCCEEDED',
    FETCH_PREFEITURA_FAILED: 'FETCH_PREFEITURA_FAILED',
}

const Creators = {
    fetchPrefeitura: () => {
        return {
            type: Types.FETCH_PREFEITURA_SAGA,
        }
    },

}
export default Creators;


const initalState = {
    data: {},
    prefeitoEVice: [],
    sexoPrefeito: 'Prefeito(a)',
    loading: true,
    error: false
};

export function prefeituraReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_PREFEITURA_SAGA:
            console.log(`${Types.FETCH_PREFEITURA_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_PREFEITURA_SUCCEEDED:
            console.log(`${Types.FETCH_PREFEITURA_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.prefeitura,
                prefeitoEVice: action.payload.prefeitoEVice,
                sexoPrefeito: action.payload.sexoPrefeito,
                loading: false, error: false
            };

        case Types.FETCH_PREFEITURA_FAILED:
            console.log(`${Types.FETCH_PREFEITURA_FAILED}`);
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

