import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold_Italic } from '@expo-google-fonts/montserrat';

import rootSaga from './src/store/sagas';
import { prefeituraReducer } from './src/store/ducks/prefeituraDuck';
import { pontosTuristicosReducer } from './src/store/ducks/pontosTuristicosDuck';
import { noticiasReducer } from './src/store/ducks/noticiasDuck';
import { secretariasReducer } from './src/store/ducks/secretariasDuck';
import { diarioOficialReducer } from './src/store/ducks/diarioOficialDuck';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import CustomActivityIndicator from './src/components/CustomActivityIndicator';



const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    prefeitura: prefeituraReducer,
    pontosTuristicos: pontosTuristicosReducer,
    noticias: noticiasReducer,
    secretarias: secretariasReducer,
    diarioOficial: diarioOficialReducer,
});


const store = createStore(rootReducer,
    applyMiddleware(
        sagaMiddleware
    )
);

sagaMiddleware.run(rootSaga);

export default function App() {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_600SemiBold_Italic
    });

    if (!fontsLoaded) {
        return <CustomActivityIndicator />;
    }

    return (
        <Provider store={store}>
            <PaperProvider>
                <NavigationContainer>
                    <MainStackNavigator />
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    );
}