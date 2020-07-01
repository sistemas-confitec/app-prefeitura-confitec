import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { Types } from '../ducks/municipioDuck';

export function* fetchMunicipioSaga() {
    try {
        const response = yield call(api.get, '/wp-json/wp/v2/app-municipio');        
		if(response.data[0]){
			yield put({
				type: Types.FETCH_MUNICIPIO_SUCCEEDED, 
				payload: {
					municipio: response.data[0]
				}
			});
		}else{
			throw new Error('Municipio não cadastrado');
		}
    } catch (e) {
        yield put({ type: Types.FETCH_MUNICIPIO_FAILED, message: e.message });
    }
}