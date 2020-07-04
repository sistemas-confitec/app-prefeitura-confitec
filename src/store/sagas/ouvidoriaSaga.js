import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { Types } from '../ducks/ouvidoriaDuck';
import { esicURL } from '../../config/Constants';

export function* fetchOuvidoriaSaga() {
    try {
        const response = yield call(api.get, `${esicURL}/wp-json/wp/v2/app-ouvidoria`);        

        yield put({
            type: Types.FETCH_OUVIDORIA_SUCCEEDED, 
            payload: {
                ouvidoria: response.data[0]
            }
        });


    } catch (e) {
        yield put({ type: Types.FETCH_OUVIDORIA_FAILED, message: e.message });
    }
}