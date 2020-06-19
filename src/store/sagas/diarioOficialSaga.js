import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { Types } from '../ducks/diarioOficialDuck';

export function* fetchDiarioOficialSaga(action) {
    try {
        const response = yield call(api.get, `/wp-json/wp/v2/app-diario-oficial?per_page=25&page=${action.payload.page}`);

        yield put({
            type: Types.FETCH_DIARIO_OFICIAL_SUCCEEDED,
            payload: {
                diarioOficial: response.data,
                currentPage: action.payload.page,
                total: response.headers["x-wp-total"],
                totalPages: response.headers["x-wp-totalpages"]
            }
        });


    } catch (e) {
        yield put({ type: Types.FETCH_DIARIO_OFICIAL_FAILED, message: e.message });
    }
}