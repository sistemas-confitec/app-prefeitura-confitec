import React from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator, HeaderBackButton, TransitionPresets } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

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
import OuvidoriaScreen from '../screens/OuvidoriaScreen';
import PDFViewer from '../screens/PDFViewer';
import EsicScreen from '../screens/EsicScreen';
import ManifestacoesScreen from '../screens/ManifestacoesScreen';
import AcoesScreen from '../screens/AcoesScreen';
import AcoesDetailsScreen from '../screens/AcoesDetailsScreen';
import PontosTuristicosScreen from '../screens/PontosTuristicosScreen';
import PontosTuristicosDetailsScreen from '../screens/PontosTuristicosDetailsScreen';
import NoticiasScreen from '../screens/NoticiasScreen';
import NoticiasDetailsScreen from '../screens/NoticiasDetailsScreen';
import DiarioOficialScreen from '../screens/DiarioOficialScreen';
import ServicosScreen from '../screens/ServicosScreen';
import RequisitarCNDScreen from '../screens/RequisitarCNDScreen';
import VerificarCNDScreen from '../screens/VerificarCNDScreen';
import CNDsScreen from '../screens/CNDsScreen';
import imageGalleryScreen from '../screens/imageGalleryScreen';
import { colors } from '../config/Constants';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: 'App Confitec Gov'
				})}
				name="MainMenuScreen" component={MainMenuScreen} />

			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: "Município",
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="CityScreen" component={CityScreen} />
			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: "Podcast",
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="PodcastScreen" component={PodcastScreen} />
			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: "Carta de Serviços",
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="ServicesScreen" component={ServicesScreen} />
			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: "Carta de Serviços",
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="ServicesDetailsScreen" component={ServicesDetailsScreen} />
			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: "Carta de Serviços",
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="PDFViewer" component={PDFViewer} />
			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: "Prefeitura",
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="TownHallScreen" component={TownHallScreen} />
			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: "LRF",
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="LRFScreen" component={LRFScreen} />
			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: "Secretarias",
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="SecretaryScreen" component={SecretaryScreen} />
			<Stack.Screen
				options={({ navigation }) => ({
					headerTintColor: '#FFF',
					headerTitle: "Gestores Atuais",
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="PrefeitoScreen" component={PrefeitoScreen} />
			<Stack.Screen
				options={({ route }) => ({
					headerTintColor: '#FFF',
					headerTitle: route.params?.relatorio,
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="LRFDetailsScreen" component={LRFDetailsScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'Ouvidoria',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="OuvidoriaScreen" component={OuvidoriaScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'e-SIC',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="EsicScreen" component={EsicScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'Manifestações',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="ManifestacoesScreen" component={ManifestacoesScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'Ações Gov',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="AcoesScreen" component={AcoesScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'Pontos Turísticos',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="PontosTuristicosScreen" component={PontosTuristicosScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'Pontos Turísticos',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="PontosTuristicosDetailsScreen" component={PontosTuristicosDetailsScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'Notícias',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="NoticiasScreen" component={NoticiasScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'Notícias',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="NoticiasDetailsScreen" component={NoticiasDetailsScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'Diário Oficial',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="DiarioOficialScreen" component={DiarioOficialScreen} />
			<Stack.Screen
				options={() => ({
					headerTintColor: '#FFF',
					headerTitle: 'Serviços',
					headerStyle: {
						backgroundColor: colors.primary
					}
				})}
				name="ServicosScreen" component={ServicosScreen} />
			<Stack.Screen
				options={({ route, navigation }) => {
					/* const acao = route.params?.acao;
					const votos = route.params?.votos;
					const setVisible = route.params?.setVisible; */
					return ({
						headerTintColor: '#FFF',
						headerTitle: 'Ações Gov',
						headerStyle: {
							backgroundColor: colors.primary
						},
						/* headerLeft: (props) => <HeaderBackButton
							{...props}
							onPress={() => {
								if (!votos || !votos[acao.id] && !!acao.meta_box.pergunta) {
									setVisible(true);
									console.log('Mostra pesquisa')
								} else {
									navigation.goBack();
								}
							}} /> */
					})
				}}
				name="AcoesDetailsScreen" component={AcoesDetailsScreen} />
			<Stack.Screen
				options={({ route, navigation }) => {
					return ({
						headerTintColor: '#FFF',
						headerTitle: 'Emissão de CND',
						headerStyle: {
							backgroundColor: colors.primary
						},
						gestureEnabled: false,
						headerLeft: null,
						cardOverlayEnabled: true,
						...TransitionPresets.ModalSlideFromBottomIOS
					})
				}}
				name="RequisitarCNDScreen" component={RequisitarCNDScreen} />
			<Stack.Screen
				options={({ route, navigation }) => {
					return ({
						headerTintColor: '#FFF',
						headerTitle: 'Emissão de CND',
						headerStyle: {
							backgroundColor: colors.primary
						},
						gestureEnabled: false,
						headerLeft: null,
						cardOverlayEnabled: true,
						...TransitionPresets.ModalSlideFromBottomIOS
					})
				}}
				name="VerificarCNDScreen" component={VerificarCNDScreen} />
			<Stack.Screen
				options={({ route, navigation }) => {
					return ({
						headerTintColor: '#FFF',
						headerTitle: 'Status da CND',
						headerStyle: {
							backgroundColor: colors.primary
						},
						headerLeft: null,
						cardOverlayEnabled: true,
						...TransitionPresets.ModalSlideFromBottomIOS
					})
				}}
				name="CNDsScreen" component={CNDsScreen} />
			<Stack.Screen
				options={({ route, navigation }) => {
					return ({
						headerTintColor: '#FFF',
						headerTitle: 'Status da CND',
						headerStyle: {
							backgroundColor: colors.primary
						},
						headerLeft: null,
						cardOverlayEnabled: true,
						...TransitionPresets.ModalSlideFromBottomIOS
					})
				}}
				name="imageGalleryScreen" component={imageGalleryScreen} />
		</Stack.Navigator>
	);
}