import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { Types } from '../ducks/noticiasDuck';

export function* fetchNoticiasSaga() {
    try {
        const response = yield call(api.get, '/wp-json/wp/v2/posts?per_page=100&_embed');        

        yield put({
            type: Types.FETCH_NOTICIAS_SUCCEEDED, 
            payload: {
                noticias: response.data
            }
        });


    } catch (e) {
        yield put({ type: Types.FETCH_NOTICIAS_FAILED, message: e.message });
    }
}