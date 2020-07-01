import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import api from '../../services/api';
import { Types } from '../ducks/acoesDuck';

export function* fetchAcoesSaga() {
	try {
		const response = yield call(api.get, '/wp-json/wp/v2/app-acoes-gov');
		yield put({
			type: Types.FETCH_ACOES_SUCCEEDED,
			payload: {
				acoes: response.data
			}
		});
	} catch (e) {
		yield put({ type: Types.FETCH_ACOES_FAILED, message: e.message });
	}
}

export function* getVotosSaga() {
	try {
		const votos = yield call(AsyncStorage.getItem, 'votos');
		yield put({
			type: Types.GET_VOTOS_SUCCEEDED,
			payload: {
				votos: votos ? JSON.parse(votos) : {}
			}
		});
	} catch (e) {
		yield put({ type: Types.GET_VOTOS_FAILED, message: e.message });
	}
}