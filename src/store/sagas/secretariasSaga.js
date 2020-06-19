import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { Types } from '../ducks/secretariasDuck';

export function* fetchSecretariasSaga() {
    try {
        const response = yield call(api.get, '/wp-json/wp/v2/app-secretaria?per_page=100');        

        yield put({
            type: Types.FETCH_SECRETARIAS_SUCCEEDED, 
            payload: {
                secretarias: response.data
            }
        });


    } catch (e) {
        yield put({ type: Types.FETCH_SECRETARIAS_FAILED, message: e.message });
    }
}