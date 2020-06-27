import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import api from '../services/api';
import { FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import CollapsibleList from "react-native-collapsible-list";
import { Entypo } from '@expo/vector-icons';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';


export default function PrefeitoScreen({ navigation }) {
	const [prefeitoData, setPrefeitoData] = useState(null);
	const [vicePrefeitoData, setVicePrefeitoData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [prefeitoCollapsed, setPrefeitoCollapsed] = useState(false);
	const [vicePrefeitoCollapsed, setVicePrefeitoCollapsed] = useState(false);

	const formatDate = (date) => {
		const dateArray = date.split('-');

		return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
	}

	const fetchPrefeitoData = async () => {
		setLoading(true);
		const resp = await api.get('/wp-json/wp/v2/app-prefeito-e-vice');
		if (resp.data) {
			resp.data.forEach(element => {
				if ((element.meta_box['sexo-prefeito'] === "Prefeito" || element.meta_box['sexo-prefeito'] === "Prefeita") && !element.meta_box['fim-mandato-prefeito']) {

					return setPrefeitoData(element);
				}
				if ((element.meta_box['sexo-prefeito'] === "Vice Prefeito" || element.meta_box['sexo-prefeito'] === "Vice Prefeita") && !element.meta_box['fim-mandato-prefeito']) {

					return setVicePrefeitoData(element);
				}
			});
		}
		setLoading(false);
	}
	useEffect(() => { fetchPrefeitoData() }, []);
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
					{loading ?
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<ActivityIndicator size={40} color={colors.primary} />
						</View>
						:
						<ScrollView
							style={globalStyles.scrollView}
							contentContainerStyle={globalStyles.contentContainerScrollView}
							showsVerticalScrollIndicator={false}
						>
							{prefeitoData && <CollapsibleList
								numberOfVisibleItems={0}
								buttonPosition={'top'}
								wrapperStyle={globalStyles.itemContainer}
								onToggle={(collap) => {
									setPrefeitoCollapsed(collap);
								}}
								buttonContent={
									<View>
										<View
											style={{
												width: Dimensions.get('window').width - 20 - 40,
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<ImageBackground
												source={{ uri: prefeitoData.meta_box['foto-prefeito'].sizes.medium.url }}
												resizeMode={'stretch'}
												style={{
													height: 150,
													width: undefined,
													aspectRatio: 3 / 4,
													marginRight: 10,
													justifyContent: 'flex-end'
												}}
											>
											</ImageBackground>

											<View
												style={{
													flex: 1,
													alignItems: 'flex-start',
												}}
											>
												<Text
													style={globalStyles.text}
													selectable={true}
												>{prefeitoData.meta_box['sexo-prefeito']}:</Text>
												<Text
													style={{ ...globalStyles.text, fontFamily: 'Montserrat_600SemiBold_Italic', textAlign: 'left', fontSize: 20 }}
													selectable={true}
												>{prefeitoData.title.rendered}</Text>

												<View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5' }} />

												<Text
													style={globalStyles.text}
													selectable={true}
												>Nascimento:</Text>
												<Text
													style={{ ...globalStyles.text, fontFamily: 'Montserrat_600SemiBold_Italic', textAlign: 'left' }}
													selectable={true}
												>{formatDate(prefeitoData.meta_box.nascimento)}</Text>
												<Text
													selectable={true}
													style={globalStyles.text}
												>Período:</Text>
												<Text
													style={{ ...globalStyles.text, fontFamily: 'Montserrat_600SemiBold_Italic', textAlign: 'left' }}
													selectable={true}
												>{formatDate(prefeitoData.meta_box['inicio-mandato-prefeito'])} até a atualidade</Text>
											</View>
										</View>

										<View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 20 }} />
										{!prefeitoCollapsed ?
											<View
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
												>ABRIR BIOGRAFIA</Text>
											</View>
											: <View
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
												>FECHAR BIOGRAFIA</Text>
											</View>
										}
									</View>
								}
							>
								<View
									style={{
										flex: 1
									}}
								>
									<Text
										style={{ ...globalStyles.text, fontFamily: 'Montserrat_600SemiBold_Italic', fontSize: 18 }}
									>Biografia</Text>
									<HTML
										tagsStyles={{
											p: { fontFamily: 'Montserrat_400Regular', textAlign: 'justify', marginBottom: 10 },
											i: { fontFamily: 'Montserrat_600SemiBold_Italic' },
										}}
										html={prefeitoData.meta_box['biografia-prefeito']}
										imagesMaxWidth={Dimensions.get('window').width}
									/>
								</View>

							</CollapsibleList>}

							{vicePrefeitoData && <CollapsibleList
								numberOfVisibleItems={0}
								buttonPosition={'top'}
								wrapperStyle={{ ...globalStyles.itemContainer, justifyContent: 'flex-start', alignItems: undefined }}
								onToggle={(collap) => {
									setVicePrefeitoCollapsed(collap);
								}}
								buttonContent={
									<View>
										<View
											style={{
												width: Dimensions.get('window').width - 20 - 40,
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<ImageBackground
												source={{ uri: vicePrefeitoData.meta_box['foto-prefeito'].sizes.medium.url }}
												resizeMode={'stretch'}
												style={{
													height: 150,
													width: undefined,
													aspectRatio: 3 / 4,
													marginRight: 10,
													justifyContent: 'flex-end'
												}}
											>
											</ImageBackground>

											<View
												style={{
													flex: 1,
													alignItems: 'flex-start',
												}}
											>
												<Text
													style={globalStyles.text}
													selectable={true}
												>{vicePrefeitoData.meta_box['sexo-prefeito']}:</Text>
												<Text
													style={{ ...globalStyles.text, fontFamily: 'Montserrat_600SemiBold_Italic', textAlign: 'left', fontSize: 20 }}
													selectable={true}
												>{vicePrefeitoData.title.rendered}</Text>

												<View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5' }} />

												<Text
													style={globalStyles.text}
													selectable={true}
												>Nascimento:</Text>
												<Text
													style={{ ...globalStyles.text, fontFamily: 'Montserrat_600SemiBold_Italic', textAlign: 'left' }}
													selectable={true}
												>{formatDate(vicePrefeitoData.meta_box.nascimento)}</Text>
												<Text
													selectable={true}
													style={globalStyles.text}
												>Período:</Text>
												<Text
													style={{ ...globalStyles.text, fontFamily: 'Montserrat_600SemiBold_Italic', textAlign: 'left' }}
													selectable={true}
												>{formatDate(vicePrefeitoData.meta_box['inicio-mandato-prefeito'])} até a atualidade</Text>
											</View>
										</View>
										<View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 20 }} />
										{!vicePrefeitoCollapsed ? <View
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
											>ABRIR BIOGRAFIA</Text>
										</View>
											: <View
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
												>FECHAR BIOGRAFIA</Text>
											</View>}
									</View>
								}
							>
								<Text
									style={{ ...globalStyles.text, fontFamily: 'Montserrat_600SemiBold_Italic', fontSize: 18 }}
								>Biografia</Text>
								<HTML
									tagsStyles={{
										p: { fontFamily: 'Montserrat_400Regular', textAlign: 'justify', marginBottom: 10 },
										i: { fontFamily: 'Montserrat_600SemiBold_Italic' },
									}}
									html={vicePrefeitoData.meta_box['biografia-prefeito']} imagesMaxWidth={Dimensions.get('window').width} />

							</CollapsibleList>}

						</ScrollView >}
				</View >
			</ImageBackground>
		</View >
	);
}

