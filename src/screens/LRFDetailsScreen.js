import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native';
import CollapsibleList from "react-native-collapsible-list";
import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Portal } from 'react-native-paper';
import axios from 'axios';

import api from '../services/api';
import LRFTypeButton from '../components/LRFTypeButton';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';
import {getLRFInformation} from '../util/Functions';

export default function LRFDetailsScreen({ route, navigation }) {
	const LRFsData = route.params?.LRFsData;
	const relatorio = route.params?.relatorio;
	const [collapsed, setCollapsed] = useState([]);
	const [visible, setVisible] = useState(false);

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
					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}>
						<CloseSubheader
							onPress={() => {
								navigation.goBack();
							}}
						/>
						<TouchableOpacity
							onPress={() => {
								setVisible(true);
							}}
						>
							<Entypo
								style={{ padding: 15 }}
								name="info-with-circle" size={30} color={colors.primary} />
						</TouchableOpacity>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1, padding: 10 }}
						style={{ width: '100%' }}
					>
						<View
							style={{
								flex: 1,
								width: '100%',
								alignItems: 'center',
								justifyContent: 'flex-start',
								paddingHorizontal: 12
							}}
						>
							<View style={styles.menuContainer}>
								{LRFsData?.map((LRF, idx) => {
									if (LRF.meta_box.relatorio.split('-')[0].trim() === relatorio) {
										return <CollapsibleList
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
													<Text
														style={{ ...globalStyles.title, color: colors.primary }}
														selectable={true}
													>{LRF.meta_box.relatorio} - {LRF.meta_box.ano}</Text>
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
											{LRF?.meta_box?.bimestre?.map((competencia, idx) => {
												return (<View
													key={idx}
												>
													<View style={{ flexDirection: 'row' }}>
														<Text
															style={{ ...styles.text, fontWeight: 'bold' }}
														>Competência: </Text>
														<Text
															style={styles.text}
														>{competencia.number_bimestre}</Text>
													</View>
													<View style={{ flexDirection: 'row' }}>
														<Text
															style={{ ...styles.text, fontWeight: 'bold' }}
														>Publicado: </Text>
														<Text
															style={styles.text}
														>{competencia.publicacao}</Text>
													</View>
													{!!LRF._links['wp:attachment'][0].href && <TouchableOpacity
														activeOpacity={0.85}
														onPress={async () => {
															const resp = await axios.get(`${LRF._links['wp:attachment'][0].href}`);
															if (resp.data) {
																const pdfFile = resp.data.find(item => item.id === competencia.pdf[0]);
																if (pdfFile) {
																	console.log(pdfFile.guid.rendered)
																	return navigation.navigate('PDFViewer', { url: pdfFile.guid.rendered });
																}
															}
															Alert.alert('Erro ao abrir arquivo')
														}}
														style={{ ...globalStyles.button, flexDirection: 'row', marginTop: 10 }}
													>
														<FontAwesome5 name="file-pdf" size={24} color={globalStyles.buttonText.color} />
														<Text
															style={{ ...globalStyles.buttonText, marginLeft: 10 }}
														>BAIXAR</Text>
													</TouchableOpacity>}
													<View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} />
													{/* <Text>Link: {LRF._links['wp:attachment'][0].href}</Text> */}
												</View>)
											})}


										</CollapsibleList>
									}
								})}
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
						<Entypo
							style={{ padding: 10 }}
							name="info-with-circle" size={30} color={colors.primary} />
						<View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5', marginVertical: 20 }} />
						<Text
							style={{ ...globalStyles.title, color: colors.primary, textAlign: 'justify', marginBottom: 10 }}
						>{getLRFInformation(relatorio).title}</Text>
						<Text
							style={{ ...globalStyles.text, color: colors.primary, textAlign: 'justify' }}
						>{getLRFInformation(relatorio).info}</Text>
						<View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5', marginVertical: 20 }} />
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
	},
	menuContainer: {
		width: '100%',
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
	}
});
