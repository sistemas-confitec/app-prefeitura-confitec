import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenuScreen from '../screens/MainMenuScreen';
import CityScreen from '../screens/CityScreen';
import PodcastScreen from '../screens/PodcastScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ServicesDetailsScreen from '../screens/ServicesDetailsScreen';
import TownHallScreen from '../screens/TownHallScreen';
import SecretaryScreen from '../screens/SecretaryScreen';
import PrefeitoScreen from '../screens/PrefeitoScreen';
import LRFDetailsScreen from '../screens/LRFDetailsScreen';
import LRFScreen from '../screens/LRFScreen';
import PDFViewer from '../screens/PDFViewer';
import { colors } from '../config/Constants';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={({ navigation }) => ({
                    //headerShown: false
                    headerTintColor: '#FFF',
                    headerTitle: 'App Confitec Gov',
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="MainMenuScreen" component={MainMenuScreen} />

            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: "Município",
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="CityScreen" component={CityScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: "Podcast",
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="PodcastScreen" component={PodcastScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: "Carta de Serviços",
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="ServicesScreen" component={ServicesScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: "Carta de Serviços",
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="ServicesDetailsScreen" component={ServicesDetailsScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: "Carta de Serviços",
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="PDFViewer" component={PDFViewer} />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: "Prefeitura",
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="TownHallScreen" component={TownHallScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: "LRF",
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="LRFScreen" component={LRFScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: "Secretarias",
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="SecretaryScreen" component={SecretaryScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: "Gestores Atuais",
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="PrefeitoScreen" component={PrefeitoScreen} />
            <Stack.Screen
                options={({ route }) => ({
                    headerTintColor: '#FFF',
                    headerTitle: route.params?.relatorio,
                    headerStyle:{
                        backgroundColor: colors.primary
                    }
                })}
                name="LRFDetailsScreen" component={LRFDetailsScreen} />
        </Stack.Navigator>
    );
}