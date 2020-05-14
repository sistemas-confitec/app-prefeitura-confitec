import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenuScreen from '../screens/MainMenuScreen';
import CityScreen from '../screens/CityScreen';
import { colors } from '../config/Constants';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: false
                })}
                name="Menu" component={MainMenuScreen} />

            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="Município" component={CityScreen} />
        </Stack.Navigator>
    );
}