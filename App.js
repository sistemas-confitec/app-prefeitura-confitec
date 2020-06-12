import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';

import MainStackNavigator from './src/navigation/MainStackNavigator';



export default function App() {
    return (
        <Provider>
            <NavigationContainer>
                <MainStackNavigator />
            </NavigationContainer>
        </Provider>
    );
}