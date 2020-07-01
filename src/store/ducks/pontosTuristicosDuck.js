export const Types = {
    FETCH_PONTOS_TURISTICOS_SAGA: 'FETCH_PONTOS_TURISTICOS_SAGA',
    FETCH_PONTOS_TURISTICOS_SUCCEEDED: 'FETCH_PONTOS_TURISTICOS_SUCCEEDED',
    FETCH_PONTOS_TURISTICOS_FAILED: 'FETCH_PONTOS_TURISTICOS_FAILED',
}

const Creators = {
    fetchPontosTuristicos: () => {
        return {
            type: Types.FETCH_PONTOS_TURISTICOS_SAGA,
        }
    },

}
export default Creators;


const initalState = {
    data: [],
    loading: true,
    error: false
};

export function pontosTuristicosReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_PONTOS_TURISTICOS_SAGA:
            console.log(`${Types.FETCH_PONTOS_TURISTICOS_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_PONTOS_TURISTICOS_SUCCEEDED:
            console.log(`${Types.FETCH_PONTOS_TURISTICOS_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.pontosTuristicos,
                loading: false, error: false
            };

        case Types.FETCH_PONTOS_TURISTICOS_FAILED:
            console.log(`${Types.FETCH_PONTOS_TURISTICOS_FAILED}`);
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

