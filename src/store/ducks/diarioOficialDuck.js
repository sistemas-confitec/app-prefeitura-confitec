export const Types = {
    FETCH_DIARIO_OFICIAL_SAGA: 'FETCH_DIARIO_OFICIAL_SAGA',
    FETCH_DIARIO_OFICIAL_SUCCEEDED: 'FETCH_DIARIO_OFICIAL_SUCCEEDED',
    FETCH_DIARIO_OFICIAL_FAILED: 'FETCH_DIARIO_OFICIAL_FAILED',
}

const Creators = {
    fetchDiarioOficial: (page) => {
        return {
            type: Types.FETCH_DIARIO_OFICIAL_SAGA,
            payload: { page }
        }
    },

}
export default Creators;


const initalState = {
    data: [],
    total: 0,
    currentPage: 0,
    totalPages: 0,
    loading: false,
    error: false
};

export function diarioOficialReducer(state = initalState, action) {
    switch (action.type) {
        case Types.FETCH_DIARIO_OFICIAL_SAGA:
            console.log(`${Types.FETCH_DIARIO_OFICIAL_SAGA}`);
            return { ...state, loading: true };

        case Types.FETCH_DIARIO_OFICIAL_SUCCEEDED:
            console.log(`${Types.FETCH_DIARIO_OFICIAL_SUCCEEDED}`);
            return {
                ...state,
                data: action.payload.diarioOficial,
                total: action.payload.total,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                loading: false, error: false
            };

        case Types.FETCH_DIARIO_OFICIAL_FAILED:
            console.log(`${Types.FETCH_DIARIO_OFICIAL_FAILED}`);
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

