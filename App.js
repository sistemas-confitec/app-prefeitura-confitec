import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainStackNavigator from './src/navigation/MainStackNavigator';



export default function App() {
  return (
    <NavigationContainer>
        <MainStackNavigator />
    </NavigationContainer>
  );
}