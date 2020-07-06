import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { Types } from '../ducks/prefeituraDuck';

export function* fetchPrefeituraSaga(action) {
    try {
        const response = yield call(api.get, '/wp-json/wp/v2/app-prefeitura');        
        const response2 = yield call(api.get, '/wp-json/wp/v2/app-prefeito-e-vice?per_page=100');

        let sexoPrefeito = 'Prefeito(a)';
        if (response2.data.length > 0) {
            for (let i = 0; i < response2.data.length; i++) {
                if ((response2.data[i].meta_box['sexo-prefeito'] === "Prefeito" || response2.data[i].meta_box['sexo-prefeito'] === "Prefeita") && !response2.data[i].meta_box['fim-mandato-prefeito']) {
                    sexoPrefeito = response2.data[i].meta_box['sexo-prefeito'];
                    break;
                }
            }
        }

        yield put({
            type: Types.FETCH_PREFEITURA_SUCCEEDED, payload: {
                prefeitura: response.data[0], // Pega apenas o primeiro elemento do retorno com os dados de prefeitura
                prefeitoEVice: response2.data,
                sexoPrefeito
            }
        });


    } catch (e) {
        yield put({ type: Types.FETCH_PREFEITURA_FAILED, message: e.message });
    }
}