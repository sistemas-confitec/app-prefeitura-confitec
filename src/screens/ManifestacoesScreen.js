import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, ImageBackground, View, TextInput, Alert, Keyboard, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage, Linking } from 'react-native';
import axios from 'axios';
import CollapsibleList from "react-native-collapsible-list";
import { Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Modal, Portal } from 'react-native-paper';

import { colors, esicURL, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import { splitDate, pad } from '../util/Functions';
import globalStyles from './globalStyles';

export default function ManifestacoesScreen(props) {
	const [manifestacoes, setManifestacoes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [collapsed, setCollapsed] = useState([]);
	const [downloadProgress, setDownloadProgress] = useState(0);
	const [secretarias, setSecretarias] = useState([]);
	const [visible, setVisible] = useState(false);
	const [selectedProtocol, setSelectedProtocol] = useState('');

	const ouvidor = props.route.params?.ouvidor;
	const title = props.route.params?.title;

	const callback = downloadProgress => {
		const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
		setDownloadProgress(progress);
	};

	async function fetchSecretarias() {
		const resp = await axios.get(`${esicURL}/wp-json/wp/v2/app-secretaria`);
		if (resp.data) {
			setSecretarias(resp.data);
		}
	}

	function download(uri) {
		const splitedUri = uri.split('/');

		return FileSystem.createDownloadResumable(
			`${uri}`,
			FileSystem.documentDirectory + splitedUri[splitedUri.length - 1],
			{},
			callback
		);
	}

	async function fetchManifestacoes() {
		const protocolsAux = await AsyncStorage.getItem('protocols');
		const protocolsObj = JSON.parse(protocolsAux);
		const manifestacoesArray = [];

		setLoading(true)
		if (protocolsObj) {
			const protocols = Object.keys(protocolsObj); //Cria um vetor com as keys de protocolsObj
			for (let i = 0; i < protocols.length; i++) {
				const resp = await axios.get(`${esicURL}/wp-json/wp/v2/app-feedback?slug=protocolo-${protocols[i]}`);
				if (resp.data[0]) {
					manifestacoesArray.push({ ...resp.data[0], buscado: protocolsObj[`${protocols[i]}`] === 'buscado' });
				} else {
					delete protocolsObj[`${protocols[i]}`];
				}
			}
			if (protocolsObj) {
				await AsyncStorage.setItem('protocols', JSON.stringify(protocolsObj));
			} else {
				await AsyncStorage.setItem('protocols', JSON.stringify({}));
			}
		}
		setManifestacoes(manifestacoesArray.reverse())
		setLoading(false)
	}

	useEffect(() => { fetchManifestacoes() }, []);
	useEffect(() => { fetchSecretarias() }, []);

	return (
		<View style={styles.container}>
			<Header
				title="Ouvidoria"
				subtitle={!title ? '' : title}
				assetName={"logo_ouvidoria"}
				titleColor={"#2B5489"}
			/>
			<View
				style={{ ...globalStyles.elevatedContent, backgroundColor: colors.backgroudColor, elevation: 0 }}
			>
				<CloseSubheader
					onPress={() => {
						props.navigation.goBack();
					}}
				/>
				{!loading ? <ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1, padding: 20, paddingTop: 0 }}
					style={{ width: '100%' }}
				>
					{manifestacoes.length > 0 ? manifestacoes?.map((manifestacao, idx) => {
						return (
							<CollapsibleList
								key={idx}
								numberOfVisibleItems={0}
								buttonPosition={'top'}
								wrapperStyle={globalStyles.itemContainer}
								onToggle={(collap) => {
									if (collap) {
										setCollapsed([...collapsed, idx]);
									} else {
										setCollapsed(collapsed.filter((c) => c !== idx));
									}
								}}
								buttonContent={
									<View>
										<View
											style={{
												flexDirection: 'row',
												width: '100%',
												justifyContent: 'space-between',
												alignItems: 'center'
											}}
										>
											{manifestacao.buscado ?
												<View
													style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
												>
													<AntDesign style={{ transform: [{ rotateY: '180deg' }] }} name="search1" size={20} color={"black"} />
													<Text
														style={{ ...globalStyles.text, fontSize: 12, textAlign: 'left', marginLeft: 5, flex: 1 }}
													>Manifestação pesquisada na tela e-SIC</Text>
												</View>
												:
												<View
												style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
												>
													<AntDesign name="download" size={20} color={"black"} />
													<Text
														style={{ ...globalStyles.text, fontSize: 12, textAlign: 'left', marginLeft: 5, flex: 1 }}
													>Manifestação realizada no dispositivo</Text>
												</View>

											}

											<TouchableOpacity
												onPress={() => {
													setVisible(true);
													setSelectedProtocol(manifestacao.meta_box.protocolo)
												}}
											>
												<FontAwesome style={{ alignSelf: 'flex-end', paddingHorizontal: 10, }} name="trash-o" size={24} color={colors.secondary} />
											</TouchableOpacity>
										</View>
										<View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginVertical: 10 }} />

										<Text
											style={{ ...globalStyles.title, color: colors.primary, textAlign: 'left' }}
											selectable={true}
										>{manifestacao.meta_box.subject}</Text>
										<Text
											style={{ ...globalStyles.title, color: colors.primary, textAlign: 'left' }}
											selectable={true}
										>{pad(splitDate(manifestacao.date_gmt).day)}/{pad(splitDate(manifestacao.date_gmt).month)}/{splitDate(manifestacao.date_gmt).year} - {pad(splitDate(manifestacao.date_gmt).hour)}:{pad(splitDate(manifestacao.date_gmt).minute)}</Text>
										<Text
											style={{ ...globalStyles.title, color: colors.primary, textAlign: 'left' }}
											selectable={true}
										>Protocolo: {manifestacao.meta_box.protocolo}</Text>
										<View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} />
										{!collapsed.includes(idx) ? <Entypo
											name="chevron-small-down"
											style={{ alignSelf: 'center' }}
											size={35}
											color={colors.primary} /> : <Entypo
												name="chevron-small-up"
												style={{ alignSelf: 'center' }}
												size={35}
												color={colors.primary} />}
									</View>
								}
							>
								<View style={styles.textContainer}>
									<Text
										style={{ ...globalStyles.title, fontSize: 14, textAlign: 'left' }}
									>Autor: </Text>
									<Text
										style={{ ...globalStyles.text, fontSize: 14, textAlign: 'left' }}
									>{manifestacao.meta_box.name}</Text>
								</View>
								<View style={styles.textContainer}>
									<Text
										style={{ ...globalStyles.title, fontSize: 14, textAlign: 'left' }}
									>Assunto: </Text>
									<Text
										style={{ ...globalStyles.text, fontSize: 14, textAlign: 'left' }}
									>{manifestacao.meta_box.subject}</Text>
								</View>
								<View style={styles.textContainer}>
									<Text
										style={{ ...globalStyles.title, fontSize: 14, textAlign: 'left' }}
									>Protocolo: </Text>
									<Text
										style={{ ...globalStyles.text, fontSize: 14, textAlign: 'left' }}
									>{manifestacao.meta_box.protocolo}</Text>
								</View>
								<View style={styles.textContainer}>
									<Text
										style={{ ...globalStyles.title, fontSize: 14, textAlign: 'left' }}
									>Status: </Text>
									<Text
										style={{ ...globalStyles.text, fontSize: 14, textAlign: 'left' }}
									>{manifestacao.meta_box.status}</Text>
								</View>

								<View style={{ ...styles.textContainer, flexDirection: 'column', alignItems: "flex-start", justifyContent: 'center' }}>
									<Text
										style={{ ...globalStyles.title, fontSize: 14, textAlign: 'left' }}
									>Secretaria: </Text>
									<Text
										style={{ ...globalStyles.text, fontSize: 14, textAlign: 'left' }}
									>{secretarias.length > 0 ? secretarias.find((item) => item.id == manifestacao.meta_box.secretaria)?.title?.rendered : ''}</Text>
								</View>
								<View style={{ ...styles.textContainer, flexDirection: 'column', alignItems: "flex-start", justifyContent: 'center' }}>
									<Text
										style={{ ...globalStyles.title, fontSize: 14, textAlign: 'left' }}
									>Minha mensagem: </Text>
									<Text
										style={{ ...globalStyles.text, fontSize: 14, textAlign: 'left' }}
									>{manifestacao.meta_box.message}</Text>
								</View>
								{manifestacao.meta_box.anexo.length > 0 && <TouchableOpacity
									activeOpacity={0.85}
									onPress={async () => {
										try {
											const { uri } = await download(manifestacao.meta_box.anexo[0].url).downloadAsync();
											console.log('Finished downloading to ', uri);
										} catch (e) {
											console.error(e);
										}
									}}
									style={{ ...globalStyles.button, flexDirection: 'row', backgroundColor: colors.secondary, marginTop: 20 }}
								>
									<FontAwesome name="paperclip" size={24} color={"#FFF"} />
									<Text
										style={{ ...globalStyles.buttonText, color: '#FFF', marginLeft: 10 }}
									>MEU ANEXO {downloadProgress * 100}%</Text>
								</TouchableOpacity>}


								<Text
									style={{ ...globalStyles.title, color: colors.primary, marginTop: 20 }}
								>Histórico de Atendimentos</Text>
								<Text
									style={{ ...globalStyles.title, color: colors.primary, marginTop: 20 }}
								>Ouvidor: {ouvidor}</Text>
								{manifestacao.meta_box.atendimentos.length > 0 ?
									<>
										{manifestacao?.meta_box?.atendimentos?.map((atendimento, idx) => {
											return <View key={idx}>
												{/* <View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} /> */}
												<View
													style={{ ...globalStyles.button, flexDirection: 'row', backgroundColor: undefined, borderColor: colors.primary, borderWidth: 1, elevation: undefined, marginTop: 20, marginBottom: 2 }}
												>
													<FontAwesome name="calendar-o" size={20} color={colors.primary}
														style={{ marginRight: 10 }}
													/>
													<Text
														style={{ ...globalStyles.text, color: colors.primary }}
													>Data: </Text>
													<Text
														style={{ ...globalStyles.text, color: colors.primary }}
													>{atendimento.atendimento_data}</Text>
												</View>
												<View style={{ ...styles.textContainer, flexDirection: 'column', alignItems: "flex-start", justifyContent: 'center' }}>
													<Text
														style={{ ...globalStyles.title, fontSize: 14, textAlign: 'left' }}
													>Resposta: </Text>
													<Text
														style={{ ...globalStyles.text, fontSize: 14, textAlign: 'left' }}
													>{atendimento.atendimento_historico}</Text>
												</View>
												{manifestacao.meta_box['anexo-resposta'][0] && manifestacao.meta_box.status === 'Respondido' &&
													<View style={{ ...styles.textContainer, flexDirection: 'column', alignItems: "flex-start", justifyContent: 'center', marginBottom: 5 }}>
														<TouchableOpacity
															onPress={() => {
																if (manifestacao.meta_box['anexo-resposta'][0]) {
																	Linking.openURL(manifestacao.meta_box['anexo-resposta'][0].url);
																}
															}}
															style={{ ...globalStyles.button, flexDirection: 'row', marginTop: 10 }}
														>
															<FontAwesome5 name="file-pdf" size={24} color={globalStyles.buttonText.color} />
															<Text
																style={{ ...globalStyles.buttonText, marginLeft: 10 }}
															>DOCUMENTO SOLICITADO</Text>
														</TouchableOpacity>
													</View>}
											</View>
										}
										)}
									</>
									: <View
										style={{ ...globalStyles.button, flexDirection: 'row', backgroundColor: undefined, borderColor: colors.primary, borderWidth: 1, elevation: undefined, marginTop: 20, marginBottom: 2 }}
									>
										<MaterialCommunityIcons name="clock-alert-outline" size={20} color={colors.primary}
											style={{ marginRight: 10 }}
										/>
										<Text
											style={{ ...globalStyles.text, color: colors.primary }}
										>AGUARDANDO RESPOSTA</Text>
									</View>
								}
							</CollapsibleList>
						)
					}) : <View
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
					>
							<MaterialCommunityIcons name="alert-box-outline" size={50} color="black" />
							<Text
								style={{ ...globalStyles.text, marginTop: 20 }}
							>Você ainda não realizou nenhuma manifestação.</Text>
						</View>}
				</ScrollView> : <CustomActivityIndicator />}
			</View>
			<Portal>
				<Modal
					visible={visible}
					contentContainerStyle={{ position: 'absolute', bottom: 0, width: '100%' }}
					onDismiss={() => {
						setVisible(false)
					}}
				>
					<View
						style={{
							width: '100%',
							backgroundColor: '#FFF',
							marginBottom: -1,
							alignItems: 'center',
							padding: 20
						}}>
						<Text
							style={{ ...globalStyles.title, color: colors.secondary, textAlign: 'justify', marginBottom: 10 }}
						>Deseja realmente apagar?</Text>
						<TouchableOpacity
							onPress={async () => {
								const protocolsAux = await AsyncStorage.getItem('protocols');
								const protocolsObj = JSON.parse(protocolsAux);

								delete protocolsObj[`${selectedProtocol}`];

								await AsyncStorage.setItem('protocols', JSON.stringify(protocolsObj));

								setVisible(false);
								fetchManifestacoes();
							}}
						>
							<FontAwesome
								style={{ padding: 10 }}
								name="trash-o" size={30} color={colors.secondary} />
						</TouchableOpacity>
					</View>
				</Modal>
			</Portal>
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
	title: {
		fontSize: 16,
		textAlign: 'center',
		marginTop: 10,
		fontWeight: 'bold',
		color: colors.primary
	},
	text: {
		fontSize: 16,
		textAlign: 'left',
		marginTop: 10,
	},
	itemContainer: {
		justifyContent: 'center',
		borderRadius: 8,
		elevation: 8,
		padding: 30,
		backgroundColor: '#FFF',
		marginBottom: 10
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10
	}
});