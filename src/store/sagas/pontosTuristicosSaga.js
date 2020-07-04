import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { Types } from '../ducks/pontosTuristicosDuck';

export function* fetchPontosTuristicosSaga(action) {
    try {
        const response = yield call(api.get, '/wp-json/wp/v2/app-ponto-turistico?per_page=100&_embed');        

        yield put({
            type: Types.FETCH_PONTOS_TURISTICOS_SUCCEEDED, payload: {
                pontosTuristicos: response.data
            }
        });


    } catch (e) {
        yield put({ type: Types.FETCH_PONTOS_TURISTICOS_FAILED, message: e.message });
    }
}