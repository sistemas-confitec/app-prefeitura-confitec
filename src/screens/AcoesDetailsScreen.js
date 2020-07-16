import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, AsyncStorage, Alert, BackHandler, ImageBackground, Picker } from 'react-native';
import { Entypo, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Modal, Portal, ToggleButton } from 'react-native-paper';
import { AirbnbRating, Input } from 'react-native-elements';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Gallery from 'react-native-image-gallery';

import { colors, strings, idContactForm7Acoes } from '../config/Constants';
import { getAcaoIcon } from '../util/Functions';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import api from '../services/api';
//import Done from '../animations/Done';
import globalStyles from './globalStyles';
import municipioActions from '../store/ducks/municipioDuck';
import acoesActions from '../store/ducks/acoesDuck';

export default function AcoesDetailsScreen(props) {
	const municipio = useSelector(state => state.municipio.data);
	const votos = useSelector(state => state.acoes.votos);
	//const [animationDone, setAnimationDone] = useState(false);
	const [visible, setVisible] = useState(false);
	const [identificationScreen, setIdentificationScreen] = useState(false);
	const [sexo, setSexo] = useState('Não informado');
	const [idade, setIdade] = useState('Não informado');
	const [local, setLocal] = useState('Não informado');
	const [distrito, setDistrito] = useState('Não informado');
	const [bairro, setBairro] = useState('Não informado');
	const [response, setResponse] = useState(null);
	//const [votos, setVotos] = useState(null);
	const acao = props.route.params?.acao;
	const location = props.route.params?.location;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(municipioActions.fetchMunicipio())
		dispatch(acoesActions.getVotos());
	}, []);

	/* useEffect(() => {
		(async () => {
			const vot = await AsyncStorage.getItem('votos');
			props.navigation.setParams({ setVisible, votos: JSON.parse(vot) })
			setVotos(JSON.parse(vot));
		})();
	}, []) */

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				if ((!votos || !votos[acao.id]) && !!acao.meta_box.pergunta) {
					setVisible(true);
				} else {
					props.navigation.goBack();
				}
				return true;
			};

			BackHandler.addEventListener('hardwareBackPress', onBackPress);

			return () =>
				BackHandler.removeEventListener('hardwareBackPress', onBackPress);
		}, [votos, setVisible])
	);

	return (
		<View style={globalStyles.container}>
			<Header
				title={strings.townHallName}
				subtitle={strings.headerSubtitle}
				titleColor={colors.primary}
			/>
			<ImageBackground
				style={globalStyles.elevatedContent}
				source={require('../../assets/background_image.png')}
			>
				<View
					style={globalStyles.backgroundImageTransparency}
				>
					<CloseSubheader
						onPress={() => {
							if ((!votos || !votos[acao.id]) && !!acao.meta_box.pergunta) {
								setVisible(true);
							} else {
								props.navigation.goBack();
							}
						}}
					/>
					<ScrollView
						style={{ width: '100%' }}
						contentContainerStyle={{
							justifyContent: 'flex-start',
							alignItems: 'center',
							flexGrow: 1,
							paddingHorizontal: 15
						}}
						showsVerticalScrollIndicator={false}
					>
						<View style={{ width: '100%', paddingTop: 10 }}>
							<View
								activeOpacity={0.8}
								style={{ ...globalStyles.itemContainer, padding: 0, borderWidth: 0 }}
							>
								<ScrollView
									style={{
										flexDirection: 'row',
										height: 200,
									}}
									horizontal={true}
									contentContainerStyle={{ flexGrow: 1 }}
								>
									{acao.meta_box.imagem.map((image, idx) => <TouchableOpacity
										key={idx}
										onPress={() => {
											props.navigation.navigate("imageGalleryScreen", {
												images: acao.meta_box.imagem.map((image, idx) => {
													return {
														source: { uri: image.sizes.medium.url },
													}
												}),
												initialPage: idx
											})
										}}
									>
										<Image
											source={{ uri: image.sizes.medium.url }}
											resizeMode={'cover'}
											style={{
												height: 200,
												aspectRatio: image.sizes.medium.width / image.sizes.medium.height,
												marginRight: 10,
											}}
										/>
									</TouchableOpacity>
									)}
								</ScrollView>
							</View>
							<View
								activeOpacity={0.8}
								style={globalStyles.itemContainer}
							>
								<Text
									style={{ ...globalStyles.title, color: colors.primary, textAlign: 'left' }}
								>{acao.title.rendered}</Text>
							</View>
							<View
								activeOpacity={0.8}
								style={globalStyles.itemContainer}
							>
								<Text
									style={{ ...globalStyles.text, flex: 1, textAlign: 'justify' }}
								>{acao.meta_box["descricao"]}</Text>
							</View>
						</View>
					</ScrollView>
				</View>
			</ImageBackground>
			<Portal>
				<Modal
					visible={visible}
					contentContainerStyle={{ position: 'absolute', bottom: 0, width: '100%' }}
					onDismiss={() => {
						//Alert.alert("Atenção", "Por favor, avalie.", [{ text: "Ok", onPress: () => { setVisible(true) } }])
						setVisible(false)
						setIdentificationScreen(false)
					}}
				>
					<View
						style={{
							width: '100%',
							backgroundColor: '#FFF',
							marginBottom: -1,
							alignItems: 'center',
							padding: 10
						}}>
						{identificationScreen && <TouchableOpacity
							style={{ alignSelf: 'flex-start', padding: 5, marginTop: 10 }}
							onPress={() => {
								setIdentificationScreen(false);
							}}
						>
							<Ionicons name="ios-arrow-back" size={24} color="black" />
						</TouchableOpacity>}
						<View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5', marginVertical: 20 }} />
						{identificationScreen ? <Text
							style={{ ...globalStyles.text, color: colors.primary, fontSize: 20 }}
						>Suas informações contribuem com a tomada de decisões.</Text> : <Text
							style={{ ...globalStyles.text, color: colors.primary, fontSize: 20 }}
						>Colabore com a tomada de decisões da gestão municipal.</Text>}
						<View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5', marginVertical: 20 }} />
						<Entypo
							name="quote"
							size={60}
							color={colors.secondary} />
						{!identificationScreen && <><Text
							style={{ ...globalStyles.text, color: colors.secondary, fontSize: 20 }}
						>{acao.meta_box.pergunta}</Text>
							{acao.meta_box["tipo-pergunta-acoes"] === "Tipo - Ótimo Bom Regular Ruim" &&
								<ToggleButton.Group
									onValueChange={value => { setResponse(value) }}
									value={response}
								>
									<ScrollView
										style={{
											flexDirection: 'row',
											marginTop: 20
										}}
										contentContainerStyle={{
											alignItems: 'center',
											justifyContent: 'center',
										}}
										horizontal={true}
									>
										<ToggleButton icon={() => <MaterialIcons name="sentiment-very-satisfied" size={30} color={colors.secondary} />}
											value="Ótimo" />
										<ToggleButton icon={() => <MaterialIcons name="sentiment-satisfied" size={30} color={colors.secondary} />}
											value="Bom" />
										<ToggleButton icon={() => <MaterialIcons name="sentiment-neutral" size={30} color={colors.secondary} />}
											value="Regular" />
										<ToggleButton icon={() => <MaterialIcons name="sentiment-very-dissatisfied" size={30} color={colors.secondary} />}
											value="Ruim" />
									</ScrollView>
								</ToggleButton.Group>}
							{acao.meta_box["tipo-pergunta-acoes"] === "Tipo - Curti ou Não Curti" &&
								<ToggleButton.Group
									onValueChange={value => { setResponse(value) }}
									value={response}
								>
									<ScrollView
										style={{
											flexDirection: 'row',
											marginTop: 20
										}}
										contentContainerStyle={{
											alignItems: 'center',
											justifyContent: 'center',
										}}
										horizontal={true}
									>
										<ToggleButton icon={() => <AntDesign name="like2" size={40} color={colors.secondary} />}
											style={{ marginRight: 60 }}
											color={colors.secondary}
											value="Curti" />
										<ToggleButton icon={() => <AntDesign name="dislike2" size={40} color={colors.secondary} />}
											color={colors.secondary}
											value="Não Curti" />
									</ScrollView>
								</ToggleButton.Group>}
							{acao.meta_box["tipo-pergunta-acoes"] === "Tipo - 1 a 5 estrelas" &&
								<AirbnbRating
									count={5}
									showRating={false}
									starStyle={{ marginTop: 20 }}
									defaultRating={0}
									size={30}
									onFinishRating={(rating) => setResponse(rating > 1 ? rating + " estrelas" : rating + " estrela")}
								/>
							}
							{acao.meta_box["tipo-pergunta-acoes"] === "Tipo - Nota de 1 a 10" &&
								<ToggleButton.Group
									onValueChange={value => { setResponse(value) }}
									value={response}
								>
									<View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

										<ScrollView
											style={{
												flexDirection: 'row',
												marginTop: 20
											}}
											contentContainerStyle={{
												alignItems: 'center',
												justifyContent: 'center',
											}}
											horizontal={true}
										>
											<ToggleButton icon={() => <Text style={styles.number}>1</Text>}
												color={colors.secondary}
												value="1" />
											<ToggleButton icon={() => <Text style={styles.number}>2</Text>}
												color={colors.secondary}
												value="2" />
											<ToggleButton icon={() => <Text style={styles.number}>3</Text>}
												color={colors.secondary}
												value="3" />
											<ToggleButton icon={() => <Text style={styles.number}>4</Text>}
												color={colors.secondary}
												value="4" />
											<ToggleButton icon={() => <Text style={styles.number}>5</Text>}
												color={colors.secondary}
												value="5" />
										</ScrollView>
										<ScrollView
											style={{
												flexDirection: 'row',
												marginTop: 20
											}}
											contentContainerStyle={{
												alignItems: 'center',
												justifyContent: 'center',
											}}
											horizontal={true}
										>
											<ToggleButton icon={() => <Text style={styles.number}>6</Text>}
												color={colors.secondary}
												value="6" />
											<ToggleButton icon={() => <Text style={styles.number}>7</Text>}
												color={colors.secondary}
												value="7" />
											<ToggleButton icon={() => <Text style={styles.number}>8</Text>}
												color={colors.secondary}
												value="8" />
											<ToggleButton icon={() => <Text style={styles.number}>9</Text>}
												color={colors.secondary}
												value="9" />
											<ToggleButton icon={() => <Text style={styles.number}>10</Text>}
												color={colors.secondary}
												value="10" />
										</ScrollView>
									</View>
								</ToggleButton.Group>}
						</>}
						{identificationScreen &&
							<>
								<View
									style={{ ...globalStyles.input, marginBottom: 10 }}
								>
									<Picker
										selectedValue={sexo}
										//style={globalStyles.input}
										mode={"dropdown"}
										onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}
									>
										<Picker.Item label="Informe seu sexo" value="Não informado" />
										<Picker.Item label="Masculino" value="M" />
										<Picker.Item label="Feminino" value="F" />
									</Picker>
								</View>
								<View
									style={{ ...globalStyles.input, marginBottom: 10 }}
								>
									<Picker
										selectedValue={idade}
										//style={globalStyles.input}
										mode={"dropdown"}
										onValueChange={(itemValue, itemIndex) => setIdade(itemValue)}
									>
										<Picker.Item label="Faixa etária" value="Não informado" />
										<Picker.Item label="Até 19 anos" value="Até 19 anos" />
										<Picker.Item label="De 20 a 39 anos" value="De 20 a 39 anos" />
										<Picker.Item label="De 40 a 59 anos" value="De 40 a 59 anos" />
										<Picker.Item label="60 anos ou mais" value="60 anos ou mais" />
									</Picker>
								</View>
								<View
									style={{ ...globalStyles.input, marginBottom: 10 }}
								>
									<Picker
										selectedValue={local}
										//style={globalStyles.input}
										mode={"dropdown"}
										onValueChange={(itemValue, itemIndex) => setLocal(itemValue)}
									>
										<Picker.Item label="Local" value="Não informado" />
										<Picker.Item label="Sede" value="Sede" />
										<Picker.Item label="Distrito" value="Distrito" />
										<Picker.Item label="Zona Rural" value="Zona Rural" />
									</Picker>
								</View>

								{local === 'Sede' && <View
									style={{ ...globalStyles.input, marginBottom: 10 }}
								>
									<Picker
										selectedValue={bairro}
										//style={globalStyles.input}
										mode={"dropdown"}
										onValueChange={(itemValue, itemIndex) => setBairro(itemValue)}
									>
										<Picker.Item label="Bairro" value="Não informado" />
										{municipio.meta_box['gr-municipio']?.bairros.map((bairro) =>
											<Picker.Item key={bairro} label={`${bairro}`} value={`${bairro}`} />)}
									</Picker>
								</View>}

								{local === 'Distrito' && <View
									style={{ ...globalStyles.input, marginBottom: 10 }}
								>
									<Picker
										selectedValue={distrito}
										//style={globalStyles.input}
										mode={"dropdown"}
										onValueChange={(itemValue, itemIndex) => setDistrito(itemValue)}
									>
										<Picker.Item label="Nome do distrito" value="Não informado" />
										{municipio.meta_box['gr-municipio']?.distritos.map((distrito) =>
											<Picker.Item key={distrito} label={`${distrito}`} value={`${distrito}`} />)}
									</Picker>
								</View>}
							</>
						}

						<View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5', marginVertical: 20 }} />
						{identificationScreen ? <TouchableOpacity
							activeOpacity={0.85}
							onPress={async () => {
								if (!response) {
									Alert.alert("Responda a pergunta", "Por favor, avalie a ação antes de enviar.")
								} else {
									setVisible(false);
									//setAnimationDone(true);
									const data = new FormData;
									data.append('identificador', 'respostas-acoes');
									//data.append('email', 'email@email.com');
									data.append('sexo', sexo);
									data.append('faixa-etaria', idade);
									data.append('local', local);
									data.append('bairro', bairro);
									data.append('distrito', distrito);
									data.append('acao_promovida', acao.id);
									data.append('secretaria', acao.meta_box.secretaria);
									data.append('pergunta', acao.meta_box.pergunta);
									data.append('resposta', response);
									data.append('lat', !location ? 'indisponível' : location.coords.latitude);
									data.append('long', !location ? 'indisponível' : location.coords.longitude);
									const resp = await api.post(`/wp-json/contact-form-7/v1/contact-forms/${idContactForm7Acoes}/feedback`, data);
									const newVotos = !votos ? {} : votos;
									newVotos[acao.id] = response;
									await AsyncStorage.setItem('votos', JSON.stringify(newVotos));
									//setVotos(newVotos);
									dispatch(acoesActions.getVotos());
								}
							}}
							style={globalStyles.button}
						>
							<Text
								style={globalStyles.buttonText}
							>ENVIAR</Text>
						</TouchableOpacity> :
							<TouchableOpacity
								activeOpacity={0.85}
								onPress={async () => {
									if (response) {
										setIdentificationScreen(true);
									} else {
										Alert.alert("Pergunta não respondida", "Por favor, responda a pergunta antes de continuar.")
									}
								}}
								style={globalStyles.button}
							>
								<Text
									style={globalStyles.buttonText}
								>CONTINUAR</Text>
							</TouchableOpacity>}
					</View>
				</Modal>
			</Portal>
			{votos && votos[acao.id] && <View
				style={{
					width: '100%',
					height: 60,
					position: 'absolute',
					bottom: 0,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#FFF',
					elevation: 18
				}}
			>
				<Text
					/* style={{
						color: '#FFF',
						fontSize: 18,
						textAlign: 'center',
						textAlignVertical: 'center',
						marginRight: 5
					}} */
					style={{ ...globalStyles.text, color: colors.secondary, marginRight: 5 }}
				>Minha avaliação:</Text>
				{getAcaoIcon(acao.meta_box["tipo-pergunta-acoes"], votos[acao.id])}
			</View>}
			{/* animationDone && <Done setAnimation={setAnimationDone} /> */}
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
	title: {
		fontWeight: 'bold',
		fontSize: 18,
		color: colors.primary
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
		marginBottom: 10,
	},
	number: {
		width: 30,
		height: 30,
		borderWidth: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		borderRadius: 4,
		color: colors.secondary,
		borderColor: colors.secondary
	}
});