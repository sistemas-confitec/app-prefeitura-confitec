export const Types = {
    FETCH_ACOES_SAGA: 'FETCH_ACOES_SAGA',
    FETCH_ACOES_SUCCEEDED: 'FETCH_ACOES_SUCCEEDED',
    FETCH_ACOES_FAILED: 'FETCH_ACOES_FAILED',
    GET_VOTOS_SAGA: 'GET_VOTOS_SAGA',
    GET_VOTOS_SUCCEEDED: 'GET_VOTOS_SUCCEEDED',
    GET_VOTOS_FAILED: 'GET_VOTOS_FAILED',
}

const Creators = {
    fetchAcoes: () => {
        return {
            type: Types.FETCH_ACOES_SAGA,
        }
    },
    getVotos: () => {
        return {
            type: Types.GET_VOTOS_SAGA,
        }
    },
}
export default Creators;


const initalState = {
    data: [],
    votos: {},
    loading: true,
    error: false
};

export function acoesReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_ACOES_SAGA:
            console.log(`${Types.FETCH_ACOES_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_ACOES_SUCCEEDED:
            console.log(`${Types.FETCH_ACOES_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.acoes,
                loading: false, error: false
            };

        case Types.FETCH_ACOES_FAILED:
            console.log(`${Types.FETCH_ACOES_FAILED}`);
			return { ...state, loading: false, error: true };
			


        case Types.GET_VOTOS_SAGA:
            console.log(`${Types.GET_VOTOS_SAGA}`);
            return { ...state, loading: true };

        case Types.GET_VOTOS_SUCCEEDED:
            console.log(`${Types.GET_VOTOS_SUCCEEDED}`);
            return {
                ...state,
                votos: action.payload.votos,
                loading: false, error: false
            };

        case Types.GET_VOTOS_FAILED:
            console.log(`${Types.GET_VOTOS_FAILED}`);
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

