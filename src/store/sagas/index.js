import { all, takeEvery, takeLatest, fork, spawn } from 'redux-saga/effects';
import { Types as prefeituraTypes } from '../ducks/prefeituraDuck';
import { Types as pontosTuristicosTypes } from '../ducks/pontosTuristicosDuck';
import { Types as noticiasTypes } from '../ducks/noticiasDuck';
import { Types as secretariasTypes } from '../ducks/secretariasDuck';
import { Types as diarioOficialTypes } from '../ducks/diarioOficialDuck';
import { Types as CNDsTypes } from '../ducks/CNDsDuck';

import { fetchPrefeituraSaga } from '../sagas/prefeituraSaga';
import { fetchPontosTuristicosSaga } from '../sagas/pontosTuristicosSaga';
import { fetchNoticiasSaga } from '../sagas/noticiasSaga';
import { fetchSecretariasSaga } from '../sagas/secretariasSaga';
import { fetchDiarioOficialSaga } from '../sagas/diarioOficialSaga';
import { fetchCNDsSaga } from '../sagas/CNDsSaga';



export default function* root() {
    yield all([
        takeLatest(prefeituraTypes.FETCH_PREFEITURA_SAGA, fetchPrefeituraSaga),
        takeLatest(pontosTuristicosTypes.FETCH_PONTOS_TURISTICOS_SAGA, fetchPontosTuristicosSaga),
        takeLatest(noticiasTypes.FETCH_NOTICIAS_SAGA, fetchNoticiasSaga),
        takeLatest(secretariasTypes.FETCH_SECRETARIAS_SAGA, fetchSecretariasSaga),
        takeLatest(diarioOficialTypes.FETCH_DIARIO_OFICIAL_SAGA, fetchDiarioOficialSaga),
        takeLatest(CNDsTypes.FETCH_CNDs_SAGA, fetchCNDsSaga),
    ]);
}