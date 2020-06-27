import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, StatusBar, AsyncStorage, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import prefeituraActions from '../store/ducks/prefeituraDuck';
import secretariasActions from '../store/ducks/secretariasDuck';
import { colors, strings } from '../config/Constants';
import MenuItem from '../components/MenuItem';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import { ScrollView } from 'react-native-gesture-handler';


export default function MainMenuScreen({ navigation }) {
	const prefeitura = useSelector(state => state.prefeitura.data);
	const sexoPrefeito = useSelector(state => state.prefeitura.sexoPrefeito);
	const loading = useSelector(state => state.prefeitura.loading);

	const dispatch = useDispatch();


	const [location, setLocation] = useState(null);

	useEffect(() => {
		dispatch(prefeituraActions.fetchPrefeitura())
		dispatch(secretariasActions.fetchSecretarias())
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
				<StatusBar barStyle={"light-content"} translucent={true} backgroundColor={'rgba(0,0,0,0.2)'} />
				<Image
					source={{
						uri: prefeitura?.meta_box['logo-gestao']?.url
					}}
					resizeMode={'contain'}
					style={{
						width: 150,
						height: 150,
						marginTop: Constants.statusBarHeight + 40,
						marginBottom: 40,
					}}
				/>
				<Text
					style={{
						fontFamily: 'Montserrat_400Regular',
						color: '#FFF',
						fontSize: 35,
						textAlign: 'center'
					}}
				>{prefeitura && prefeitura?.title?.rendered}</Text>
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
					<View style={styles.menuContainer}>
						<ScrollView
							horizontal={true}
						>
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
							<MenuItem
								onPress={() => { navigation.navigate('ServicosScreen') }}
								iconName={"email-newsletter"}
								iconSource={"MaterialCommunityIcons"}
								title={"Serviços"} />
							<MenuItem
								onPress={() => { navigation.navigate('ServicesScreen') }}
								iconName={"email-newsletter"}
								iconSource={"MaterialCommunityIcons"}
								title={"Carta de Serviços"} />
							<MenuItem
								onPress={() => { navigation.navigate('EsicScreen') }}
								iconName={"ios-chatbubbles"}
								iconSource={"Ionicons"}
								title={"e-SIC"} />
							<MenuItem
								onPress={() => { navigation.navigate('PodcastScreen') }}
								iconName={"ios-mic"}
								iconSource={"Ionicons"}
								title={`Podcast ${strings.townHallName}`} />
						</ScrollView>
					</View>
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
