import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, Picker, View, TextInput, Alert, Keyboard, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { colors, esicURL } from '../config/Constants';
import HeaderDivider from '../components/HeaderDivider';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import globalStyles from './globalStyles';
import ouvidoriaActions from '../store/ducks/ouvidoriaDuck';

export default function EsicScreen(props) {
	const [protocolo, setProtocolo] = useState('');
	const ouvidoria = useSelector(state => state.ouvidoria.data);
	const loading = useSelector(state => state.ouvidoria.loading);

	const dispatch = useDispatch();

	async function fetchOuvidoriaInfo() {
		dispatch(ouvidoriaActions.fetchOuvidoria())
	}

	/* useEffect(() => {
		(async () =>{
			await AsyncStorage.setItem('protocols', JSON.stringify({}))
		})();
	}, []) */

	async function storeProtocol(protocol) {
		const protocols = await AsyncStorage.getItem('protocols');
		let protocolsAux;
		if (!protocols) {
			protocolsAux = {};
			protocolsAux[`${protocol}`] = "buscado";
		} else {
			protocolsAux = JSON.parse(protocols);
			protocolsAux[`${protocol}`] = "buscado";
		}
		await AsyncStorage.setItem('protocols', JSON.stringify(protocolsAux));
	}

	useEffect(() => { fetchOuvidoriaInfo() }, []);

	return (
		<View style={styles.container}>
			<Header
				title="e-SIC"
				subtitle={'Sistema Eletrônico do Serviço de Informações ao Cidadão'}
				assetName={"logo_e_sic"}
				titleColor={"#008608"}
			/>
			<CloseSubheader
				onPress={() => {
					props.navigation.goBack();
				}}
			/>
			<KeyboardAwareScrollView
				style={{ width: '100%' }}
				contentContainerStyle={{
					justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1,
					paddingHorizontal: 15
				}}
				extraScrollHeight={100}
				keyboardShouldPersistTaps={'handled'}
				showsVerticalScrollIndicator={false}
				enableOnAndroid={true}
				enableAutomaticScroll={true}
			>
				{loading ? <CustomActivityIndicator /> : <View style={{ width: '100%' }}>

					<View
						style={globalStyles.itemContainer}
					>
						<Text
							style={{ ...globalStyles.text, textAlign: 'justify', fontSize: 14 }}
						>O e-SIC permite que qualquer pessoa, física ou jurídica, encaminhe pedidos de acesso à informação, acompanhe o prazo e receba a resposta da solicitação realizada.</Text>
						<Text
							style={{ ...globalStyles.title, textAlign: 'justify', fontSize: 14 }}
						>O cidadão ainda pode entrar com recursos e apresentar reclamações, sem burocracia, apenas adicionando o número do protocolo no corpo mensagem.</Text>
					</View>

					<View
						style={{
							flexDirection: 'row'
						}}
					>
						<TouchableOpacity
							activeOpacity={0.7}
							style={{
								backgroundColor: colors.primary,
								color: '#663E1D',
								padding: 10,
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								elevation: 4,
							}}
							onPress={() => {
								props.navigation.navigate('ManifestacoesScreen', { ouvidor: ouvidoria.meta_box['nome'], title: ouvidoria.title.rendered });
							}}
						>
							<MaterialIcons style={{ marginRight: 10 }} name="history" size={24} color="#FFF" />
							<Text
								style={globalStyles.buttonText}
							>MANIFESTAÇÕES SALVAS</Text>
						</TouchableOpacity>

						<TouchableOpacity
							activeOpacity={0.7}
							style={{
								flex: 1,
								backgroundColor: colors.secondary,
								color: '#663E1D',
								padding: 10,
								width: '100%',
								alignItems: 'center',
								justifyContent: 'center',
								elevation: 4
							}}
							onPress={() => { props.navigation.navigate('OuvidoriaScreen', { title: ouvidoria.title.rendered }) }}
						>
							<AntDesign style={{ marginRight: 10, transform: [{ rotateY: '180deg' }] }} name="notification" size={24} color="#FFF" />
							<Text
								style={globalStyles.buttonText}
							>NOVA MANIFESTAÇÃO</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<TextInput
							value={protocolo}
							style={{ ...styles.input, width: undefined, flex: 1, fontFamily: 'Montserrat_400Regular' }}
							placeholder={'Buscar por número do protocolo'}
							maxLength={10}
							placeholderTextColor={'#CCC'}
							keyboardType={'numeric'}
							onChangeText={(text) => { setProtocolo(text) }}
						/>
						<TouchableOpacity
							activeOpacity={0.7}
							style={{
								backgroundColor: '#008608',
								textAlign: 'center',
								color: '#663E1D',
								padding: 10,
								marginVertical: 10,
							}}
							onPress={async () => {
								const resp = await axios.get(`${esicURL}/wp-json/wp/v2/app-feedback?slug=protocolo-${protocolo}`)
								if (resp.data[0]) {
									console.log(resp.data[0].meta_box.protocolo + '')
									await storeProtocol(resp.data[0].meta_box.protocolo + '');
									props.navigation.navigate('ManifestacoesScreen', { ouvidor: ouvidoria.meta_box['nome'], title: ouvidoria.title.rendered });
									setProtocolo('')
								} else {
									Alert.alert("Manifestação não encontrada", "Verifique o número do protocolo e tente novamente.")
								}
							}}
						>
							<AntDesign style={{ transform: [{ rotateY: '180deg' }] }} name="search1" size={20} color="#FFF" />
						</TouchableOpacity>
					</View>

					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 18,
							marginVertical: 10,
							textAlign: 'center',
							color: colors.primary
						}}
						style={{ ...globalStyles.title, marginVertical: 10, color: colors.primary }}
					>ATENDIMENTO PRESENCIAL AO CIDADÃO</Text>

					<HeaderDivider />

					<View
						style={{ ...globalStyles.itemContainer, padding: 10 }}
					>
						<View
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<View
								style={{
									width: 40,
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<FontAwesome5 name="map" size={20} color={colors.primary} />
							</View>
							<View
								style={{ marginLeft: 10, flex: 1 }}
							>
								<Text
									style={{ ...globalStyles.title, textAlign: 'left', fontSize: 14 }}
								>Endereço: </Text>
								<Text
									style={{ ...globalStyles.text, textAlign: 'left', fontSize: 14 }}
								>{ouvidoria.meta_box['end-presencial']}</Text>
							</View>
						</View>
						<View
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<View
								style={{
									width: 40,
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<FontAwesome5 name="clock" size={20} color={colors.primary} />
							</View>
							<View
								style={{ marginLeft: 10, flex: 1 }}
							>
								<Text
									style={{ ...globalStyles.title, textAlign: 'left', fontSize: 14 }}
								>Horário de atendimento: </Text>
								<Text
									style={{ ...globalStyles.text, textAlign: 'left', fontSize: 14 }}
								>{ouvidoria.meta_box['horario']}</Text>
							</View>
						</View>
						<View
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<View
								style={{
									width: 40,
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<FontAwesome5 name="phone-volume" size={20} color={colors.primary} />
							</View>
							<View
								style={{ marginLeft: 10, flex: 1 }}
							>
								<Text
									style={{ ...globalStyles.title, textAlign: 'left', fontSize: 14 }}
								>Telefone: </Text>
								<Text
									style={{ ...globalStyles.text, textAlign: 'left', fontSize: 14 }}
								>{ouvidoria.meta_box['telefone']}</Text>
							</View>
						</View>
						<View
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<View
								style={{
									width: 40,
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<FontAwesome5 name="mail-bulk" size={20} color={colors.primary} />
							</View>
							<View
								style={{ marginLeft: 10, flex: 1 }}
							>
								<Text
									style={{ ...globalStyles.title, textAlign: 'left', fontSize: 14 }}
								>E-mail: </Text>
								<Text
									style={{ ...globalStyles.text, textAlign: 'left', fontSize: 14 }}
								>{ouvidoria.meta_box['email']}</Text>
							</View>
						</View>
						<View
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<View
								style={{
									width: 40,
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<FontAwesome5 name="user-tie" size={20} color={colors.primary} />
							</View>
							<View
								style={{ marginLeft: 10, flex: 1 }}
							>
								<Text
									style={{ ...globalStyles.title, textAlign: 'left', fontSize: 14 }}
								>Ouvidor(a): </Text>
								<Text
									style={{ ...globalStyles.text, textAlign: 'left', fontSize: 14 }}
								>{ouvidoria.meta_box['nome']}</Text>
							</View>
						</View>
					</View>

				</View>}
			</KeyboardAwareScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: colors.backgroudColor,
		alignItems: 'center',
		justifyContent: 'flex-start',
		//paddingHorizontal: 15
	},
	input: {
		width: '100%',
		height: 40,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderTopWidth: 1,
		borderColor: '#DDD',
		fontSize: 14,
		backgroundColor: '#FFF',
	},
	textForm: {
		color: '#666',
		alignSelf: 'flex-start',
		fontSize: 14,
		marginTop: 5,
		marginBottom: 0,
		fontWeight: 'bold'
	},
	itemContainer: {
		width: '100%',
		alignItems: 'flex-start',
		justifyContent: 'center',
		borderBottomWidth: 5,
		borderColor: '#DDD',
		borderRadius: 8,
		padding: 10,
		backgroundColor: '#FFF',
		marginBottom: 10
	}
});