import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import { prefeituraReducer } from './ducks/prefeituraDuck';
import { pontosTuristicosReducer } from './ducks/pontosTuristicosDuck';
import { noticiasReducer } from './ducks/noticiasDuck';
import { secretariasReducer } from './ducks/secretariasDuck';
import { diarioOficialReducer } from './ducks/diarioOficialDuck';
import { CNDsReducer } from './ducks/CNDsDuck';
import { municipioReducer } from './ducks/municipioDuck';
import { acoesReducer } from './ducks/acoesDuck';
import { ouvidoriaReducer } from './ducks/ouvidoriaDuck';
import { podcastsReducer } from './ducks/podcastDuck';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    prefeitura: prefeituraReducer,
    pontosTuristicos: pontosTuristicosReducer,
    noticias: noticiasReducer,
    secretarias: secretariasReducer,
    diarioOficial: diarioOficialReducer,
    CNDs: CNDsReducer,
    municipio: municipioReducer,
    acoes: acoesReducer,
    ouvidoria: ouvidoriaReducer,
    podcasts: podcastsReducer,
});

export default store = createStore(rootReducer,
    applyMiddleware(
        sagaMiddleware
    )
);

sagaMiddleware.run(rootSaga);
