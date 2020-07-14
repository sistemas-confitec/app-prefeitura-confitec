import { all, takeEvery, takeLatest, fork, spawn } from 'redux-saga/effects';
import { Types as prefeituraTypes } from '../ducks/prefeituraDuck';
import { Types as pontosTuristicosTypes } from '../ducks/pontosTuristicosDuck';
import { Types as noticiasTypes } from '../ducks/noticiasDuck';
import { Types as secretariasTypes } from '../ducks/secretariasDuck';
import { Types as diarioOficialTypes } from '../ducks/diarioOficialDuck';
import { Types as CNDsTypes } from '../ducks/CNDsDuck';
import { Types as municipioTypes } from '../ducks/municipioDuck';
import { Types as acoesTypes } from '../ducks/acoesDuck';
import { Types as ouvidoriaTypes } from '../ducks/ouvidoriaDuck';
import { Types as podcastsTypes } from '../ducks/podcastDuck';

import { fetchPrefeituraSaga } from '../sagas/prefeituraSaga';
import { fetchPontosTuristicosSaga } from '../sagas/pontosTuristicosSaga';
import { fetchNoticiasSaga } from '../sagas/noticiasSaga';
import { fetchSecretariasSaga } from '../sagas/secretariasSaga';
import { fetchDiarioOficialSaga } from '../sagas/diarioOficialSaga';
import { fetchCNDsSaga } from '../sagas/CNDsSaga';
import { fetchMunicipioSaga } from '../sagas/municipioSaga';
import { fetchAcoesSaga, getVotosSaga } from '../sagas/acoesSaga';
import { fetchOuvidoriaSaga } from '../sagas/ouvidoriaSaga';
import { fetchPodcastsSaga } from '../sagas/podcastsSaga';



export default function* root() {
    yield all([
        takeLatest(prefeituraTypes.FETCH_PREFEITURA_SAGA, fetchPrefeituraSaga),
        takeLatest(pontosTuristicosTypes.FETCH_PONTOS_TURISTICOS_SAGA, fetchPontosTuristicosSaga),
        takeLatest(noticiasTypes.FETCH_NOTICIAS_SAGA, fetchNoticiasSaga),
        takeLatest(secretariasTypes.FETCH_SECRETARIAS_SAGA, fetchSecretariasSaga),
        takeLatest(diarioOficialTypes.FETCH_DIARIO_OFICIAL_SAGA, fetchDiarioOficialSaga),
        takeLatest(CNDsTypes.FETCH_CNDs_SAGA, fetchCNDsSaga),
        takeLatest(municipioTypes.FETCH_MUNICIPIO_SAGA, fetchMunicipioSaga),
        takeLatest(acoesTypes.FETCH_ACOES_SAGA, fetchAcoesSaga),
        takeLatest(acoesTypes.GET_VOTOS_SAGA, getVotosSaga),
        takeLatest(ouvidoriaTypes.FETCH_OUVIDORIA_SAGA, fetchOuvidoriaSaga),
        takeLatest(podcastsTypes.FETCH_PODCASTS_SAGA, fetchPodcastsSaga),
    ]);
}