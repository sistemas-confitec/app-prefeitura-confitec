import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import prefeituraActions from '../store/ducks/prefeituraDuck';
import secretariasActions from '../store/ducks/secretariasDuck';
import ouvidoriaActions from '../store/ducks/ouvidoriaDuck';
import { colors, strings } from '../config/Constants';
import MenuItem from '../components/MenuItem';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import globalStyles from './globalStyles';



export default function MainMenuScreen({ navigation }) {
	const prefeitura = useSelector(state => state.prefeitura.data);
	const ouvidoria = useSelector(state => state.ouvidoria.data);
	const sexoPrefeito = useSelector(state => state.prefeitura.sexoPrefeito);
	const loading = useSelector(state => state.prefeitura.loading);

	const dispatch = useDispatch();


	const [location, setLocation] = useState(null);

	useEffect(() => {
		dispatch(prefeituraActions.fetchPrefeitura())
		dispatch(secretariasActions.fetchSecretarias())
		dispatch(ouvidoriaActions.fetchOuvidoria())
	}, []);
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert("Permissão requerida", "Precisamos de acesso à sua localização.")
			}

			let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
			setLocation(location);
			//console.log(location)
		})();
	}, []);
	return (
		loading ? <CustomActivityIndicator /> : <ImageBackground
			source={require('../../assets/background_image.png')}
			style={styles.container}
		>
			<LinearGradient
				style={{ ...styles.container, backgroundColor: undefined }}
				colors={[colors.primary + 'EE', colors.darkPrimary + 'EE']}
				start={{ x: 0, y: 1 }}
				end={{ x: 1, y: 1 }}
			>

				<View
					style={{
						flexDirection: 'row',
						width: Dimensions.get('window').width,
						paddingTop: Constants.statusBarHeight,
						height: Constants.statusBarHeight + 60,
						backgroundColor: colors.primary,
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingHorizontal: 15,
						elevation: 4
					}}
				>
					<TouchableOpacity
						onPress={() => { navigation.navigate('EsicScreen') }}
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Ionicons name="md-information-circle" size={30} color="#FFF" />
						<Text
							style={{ ...globalStyles.text, textAlign: 'left', marginLeft: 10, color: '#FFF' }}
						>e-SIC</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => { navigation.navigate('OuvidoriaScreen', { title: ouvidoria.title?.rendered }) }}
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Ionicons name="ios-chatbubbles" size={30} color="#FFF" />
						<Text
							style={{ ...globalStyles.text, textAlign: 'left', marginLeft: 10, color: '#FFF' }}
						>Ouvidoria</Text>
					</TouchableOpacity>
				</View>
				<Image
					source={{
						uri: prefeitura?.meta_box['logo-gestao']?.url
					}}
					resizeMode={'contain'}
					style={{
						width: 80,
						height: 80,
						marginTop: 20,
						marginBottom: 10,
					}}
				/>
				<Text
					style={{
						fontFamily: 'Montserrat_400Regular',
						color: '#FFF',
						fontSize: 18,
						paddingHorizontal: 5,
						textAlign: 'center'
					}}
				>{strings.headerSubtitle}</Text>
				<Text
					style={{
						fontFamily: 'Montserrat_600SemiBold_Italic',
						color: '#FFF',
						fontSize: 30,
						paddingHorizontal: 0,
						textAlign: 'center',
					}}
				>{strings.townHallName}</Text>
				<View
					style={{
						width: '100%',
						height: 10,
						backgroundColor: colors.dividerColor,
						//elevation: 5
					}}
				>
				</View>

				<View
					style={{
						flex: 1,
						width: '100%',
						alignItems: 'center',
						justifyContent: 'flex-end',
						paddingHorizontal: 12
					}}
				>
					<ScrollView
						//style={{width:'100%'}}
						contentContainerStyle={{ width: '100%' }}
					>
						<View style={styles.menuContainer}>
							<View style={styles.rowContainer}>
								<MenuItem
									onPress={() => { navigation.navigate('TownHallScreen') }}
									title={"Prefeitura"}
									iconSource={"FontAwesome5"}
									iconName={"building"}
								/>
								<MenuItem
									onPress={() => { navigation.navigate('PrefeitoScreen') }}
									iconName={sexoPrefeito === "Prefeita" ? "user-female" : "user-tie"}
									iconSource={sexoPrefeito === "Prefeita" ? "SimpleLineIcons" : "FontAwesome5"}
									title={sexoPrefeito} />
								<MenuItem
									onPress={() => {
										navigation.navigate('SecretaryScreen')
									}}
									iconName={"sitemap"}
									iconSource={"FontAwesome"}
									title={"Secretarias"} />
							</View>
							<View style={styles.rowContainer}>
								<MenuItem
									iconName={"map-marked-alt"}
									iconSource={"FontAwesome5"}
									title={"Município"}
									onPress={() => {
										navigation.navigate("CityScreen")
									}}
								/>
								<MenuItem
									onPress={() => { navigation.navigate('PontosTuristicosScreen') }}
									iconName={"map"}
									iconSource={"Foundation"}
									title={"Turismo"} />
								<MenuItem
									onPress={() => { navigation.navigate('NoticiasScreen') }}
									iconName={"newspaper-o"}
									iconSource={"FontAwesome"}
									title={"Notícias"} />
							</View>
							<View style={styles.rowContainer}>

								<MenuItem
									onPress={() => { navigation.navigate('AcoesScreen', { location }) }}
									iconName={"worker"}
									iconSource={"MaterialCommunityIcons"}
									title={"Ações Gov"} />
								<MenuItem
									onPress={() => { navigation.navigate('LRFScreen') }}
									iconName={"hammer"}
									iconSource={"FontAwesome5"}
									title={"LRF"} />
								<MenuItem
									onPress={() => { navigation.navigate('DiarioOficialScreen') }}
									iconName={"newsletter"}
									iconSource={"Entypo"}
									title={"Diário Oficial"} />
							</View>
							<View style={styles.rowContainer}>
								<MenuItem
									onPress={() => { navigation.navigate('ServicosScreen') }}
									iconName={"colours"}
									iconSource={"Entypo"}
									title={"Serviços"} />
								<MenuItem
									onPress={() => { navigation.navigate('ServicesScreen') }}
									iconName={"email-newsletter"}
									iconSource={"MaterialCommunityIcons"}
									title={"Carta de Serviços"} />
								<MenuItem
									onPress={() => { navigation.navigate('PodcastScreen') }}
									iconName={"ios-mic"}
									iconSource={"Ionicons"}
									title={`Podcast ${strings.townHallName}`} />
							</View>
						</View>

					</ScrollView>
				</View>
				<View
					style={{
						width: '100%',
						padding: 10
					}}
				>
					<Text
						style={{ ...styles.footerText, fontFamily: 'Montserrat_600SemiBold_Italic' }}
					>{prefeitura && prefeitura?.title?.rendered}</Text>
					<Text
						style={styles.footerText}
					>{prefeitura && prefeitura.meta_box?.endereco}</Text>
					<Text
						style={styles.footerText}
					>{prefeitura && prefeitura.meta_box?.horario}</Text>
				</View>
			</LinearGradient>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroudColor,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 0,

	},
	menuContainer: {
		flex: 1,
		width: '100%',
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'row',
		width: '100%',
		//backgroundColor: '#CCC'
	},
	footerText: {
		textAlign: 'center',
		color: '#FFF',
		fontFamily: 'Montserrat_400Regular'
	}
});
