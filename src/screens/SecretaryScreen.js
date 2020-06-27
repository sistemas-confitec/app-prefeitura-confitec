import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Linking, TouchableOpacity, ImageBackground } from 'react-native';
import CollapsibleList from "react-native-collapsible-list";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

import api from '../services/api';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';


export default function SecretaryScreen({ navigation }) {
	const [secretaryData, setSecretaryData] = useState(null);
	const [loadingSecretaryData, setLoadingSecretaryData] = useState(false);
	const [townHallCollapsed, setTownHallCollapsed] = useState(false);
	const [collapsed, setCollapsed] = useState([]);
	const fetchSecretary = async () => {
		setLoadingSecretaryData(true);
		const resp = await api.get('/wp-json/wp/v2/app-estrutura-organizacional');
		setSecretaryData(resp.data);
		setLoadingSecretaryData(false);
	}
	useEffect(() => { fetchSecretary() }, []);
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
							navigation.goBack();
						}}
					/>
					<ScrollView
						showsVerticalScrollIndicator={false}
						refreshControl={<RefreshControl refreshing={loadingSecretaryData} onRefresh={fetchSecretary} />}
						contentContainerStyle={globalStyles.contentContainerScrollView}
						style={globalStyles.scrollView}
					>
						{secretaryData && secretaryData?.secretarias?.map((sec, idx) => {
							return <CollapsibleList
								key={idx}
								numberOfVisibleItems={0}
								buttonPosition={'top'}
								wrapperStyle={{...globalStyles.itemContainer, width: undefined, alignItems: undefined}}
								onToggle={(collap) => {
									if (collap) {
										setCollapsed([...collapsed, idx]);
									} else {
										setCollapsed(collapsed.filter((c) => c !== idx));
									}
								}}
								buttonContent={
									<View>
										<Text
											style={{ ...globalStyles.title, color: colors.primary }}
											selectable={true}
										>{sec.secretaria}</Text>
										<View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} />
										{!collapsed.includes(idx) ? <View
												/* onPress={() => {
													//handleSubmit();
												}} */
												style={{ ...globalStyles.button, width: '100%' }}
											>
												<Text
													style={{
														color: colors.primary,
														fontFamily: 'Montserrat_400Regular'
													}}
												>ABRIR DETALHES</Text>
											</View> : <View
												/* onPress={() => {
													//handleSubmit();
												}} */
												style={{ ...globalStyles.button, width: '100%' }}
											>
												<Text
													style={{
														color: colors.primary,
														fontFamily: 'Montserrat_400Regular'
													}}
												>FECHAR DETALHES</Text>
											</View>}
									</View>
								}
							>
								{sec.gestor_atual && <Text
									style={{ ...globalStyles.text, textAlign: 'left', marginBottom: 10 }}
									selectable={true}
								><Text
									style={{ ...globalStyles.title, textAlign: 'left', marginBottom: 10, color: colors.primary }}
									selectable={true}
								>GESTOR:</Text> {sec.gestor_atual}</Text>}
								{sec.ordenador_atual && <Text
									style={{ ...globalStyles.text, textAlign: 'left', marginBottom: 10 }}
									selectable={true}
								><Text
									style={{ ...globalStyles.title, textAlign: 'left', marginBottom: 10, color: colors.primary }}
									selectable={true}
								>ORDENADOR:</Text> {sec.ordenador_atual}</Text>}
								{sec.horario && <Text
									style={{ ...globalStyles.text, textAlign: 'left', marginBottom: 10 }}
									selectable={true}
								><Text
									style={{ ...globalStyles.title, textAlign: 'left', marginBottom: 10, color: colors.primary }}
									selectable={true}
								>HORÁRIO:</Text> {sec.horario}</Text>}
								{sec.cnpj && <Text
									style={{ ...globalStyles.text, textAlign: 'left', marginBottom: 10 }}
									selectable={true}
								><Text
									style={{ ...globalStyles.title, textAlign: 'left', marginBottom: 10, color: colors.primary }}
									selectable={true}
								>CNPJ:</Text> {sec.cnpj}</Text>}
								{sec.endereco && <Text
									style={{ ...globalStyles.text, textAlign: 'left', marginBottom: 10 }}
									selectable={true}
								><Text
									style={{ ...globalStyles.title, textAlign: 'left', marginBottom: 10, color: colors.primary }}
									selectable={true}
								>ENDEREÇO:</Text> {sec.endereco}</Text>}

								{sec.telefone && <Text
									style={{ ...globalStyles.text, textAlign: 'left', marginBottom: 10 }}
									selectable={true}
								><Text
									style={{ ...globalStyles.title, textAlign: 'left', marginBottom: 10, color: colors.primary }}
									selectable={true}
								>TELEFONE:</Text> {sec.telefone}</Text>}


								{sec.email ? <Text
									style={{ ...globalStyles.text, textAlign: 'left', marginBottom: 10 }}
									selectable={true}
								>
									<Text
										style={{ ...globalStyles.title, textAlign: 'left', marginBottom: 10, color: colors.primary }}
										selectable={true}
									>EMAIL:
                                </Text> {sec.email}
								</Text> : <></>}
								{!!sec.whatsapp &&
									<TouchableOpacity
										activeOpacity={0.85}
										onPress={() => { Linking.openURL(`whatsapp://send?phone=+55${sec.whatsapp}`) }}
										style={{ ...globalStyles.button, flexDirection: 'row', alignSelf: 'center', width: '100%' }}
									>
										<FontAwesome5 name="whatsapp" size={24} color={colors.primary} />
										<Text
											style={{ ...globalStyles.text, textAlign: 'center', color: colors.primary, marginTop: 0, marginLeft: 10 }}
										>FALE PELO WHATSAPP</Text>
									</TouchableOpacity>
								}
							</CollapsibleList>
						})}
					</ScrollView>
				</View>
			</ImageBackground>
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
		borderWidth:1,
		borderColor:colors.secondary,
		padding: 30,
		marginBottom: 10
	}
});
