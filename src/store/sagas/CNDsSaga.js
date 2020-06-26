import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import api from '../../services/api';
import { Types } from '../ducks/CNDsDuck';

export function* fetchCNDsSaga() {
	try {
		const protocolsArray = yield call(AsyncStorage.getItem, 'CND_protocols');
		const protocols = JSON.parse(protocolsArray);
		const newProtocols = [];
		const CNDsArray = [];

		if (protocols && protocols.length > 0) {
			for (let i = 0; i < protocols.length; i++) {

				const resp = yield call(api.get, `/wp-json/wp/v2/app-emissao-de-cnd?slug=protocolo-${protocols[i]}`);
				console.log(resp.status)
				if (resp.data[0]) {
					CNDsArray.push(resp.data[0]);
					newProtocols.push(protocols[i]);
				}

				/* Caso a resposta da última requisião seja 200 (OK), supôe-se que as outras tbm foram
				   e armazena apenas os protocolos que foram encontrados. Isso evita que fiquem vários 
				   protocolos inválidos salvos na memória do celular. */
				if (resp.status === 200 && i === protocols.length - 1) {
					yield call(AsyncStorage.setItem, 'CND_protocols', JSON.stringify(newProtocols));
				}
			}
		}

		yield put({
			type: Types.FETCH_CNDs_SUCCEEDED,
			payload: {
				CNDs: CNDsArray.reverse()
			}
		});


	} catch (e) {
		yield put({ type: Types.FETCH_CNDs_FAILED, message: e.message });
	}
}