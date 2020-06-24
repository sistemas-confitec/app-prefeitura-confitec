import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, Keyboard, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Divider } from 'react-native-elements'
import { Modal, Portal } from 'react-native-paper';
import { AntDesign, Feather } from '@expo/vector-icons';

import { colors, idContactForm7CND } from '../config/Constants';
import api from '../services/api';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import { splitDate, pad } from '../util/Functions';


export default function CNDsScreen({ route, navigation }) {
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [CNDs, setCNDs] = useState([]);


	async function fetchStoredCNDs() {
		const protocolsArray = await AsyncStorage.getItem('CND_protocols');
		const protocols = JSON.parse(protocolsArray);
		const CNDsArray = [];

		setLoading(true)
		if (protocols && protocols.length > 0) {
			for (let i = 0; i < protocols.length; i++) {

				const resp = await api.get(`/wp-json/wp/v2/app-emissao-de-cnd?slug=protocolo-${protocols[i]}`);
				if (resp.data[0]) {
					CNDsArray.push(resp.data[0]);
				}
			}
		}
		setCNDs(CNDsArray.reverse())
		setLoading(false)
	}

	useEffect(() => {
		fetchStoredCNDs();
	}, [])

	return (
		loading ? <CustomActivityIndicator /> : <View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					navigation.goBack();
				}}
				style={{
					alignSelf: 'flex-start',
					padding: 15
				}}
			>
				<AntDesign name="close" size={24} color="black" />
			</TouchableOpacity>
			<ScrollView
				style={{ width: '100%' }}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1, padding: 10 }}
			>
				<Text style={styles.title}>VERIFICAR STATUS DA CERTIDÃO NEGATIVA DE DÉBITOS MUNICIPAIS</Text>
				<Divider style={{ marginTop: 5, marginBottom: 15 }} />

				{
					CNDs.length > 0 ? CNDs.map((CND) => {
						return <View
							key={CND.id}
							style={{
								width: '100%',
								padding: 10,
								borderWidth: 0.5,
								borderColor: '#CCC',
								marginVertical: 5
							}}
						>
							<Text
								style={{ ...styles.text, fontFamily: 'Montserrat_600SemiBold_Italic' }}
							>Requisição de CND - {pad(splitDate(CND.date_gmt).day)}/{pad(splitDate(CND.date_gmt).month)}/{splitDate(CND.date_gmt).year} - {pad(splitDate(CND.date_gmt).hour)}:{pad(splitDate(CND.date_gmt).minute)}</Text>
							<Text
								style={styles.text}
							>Protocolo: {CND.meta_box.protocolo}
							</Text>
							<Text
								style={styles.text}
							>Nome do Requerente: {CND.meta_box.tipo === 'Pessoa Física' ? CND.meta_box.nome : CND.meta_box['razao-social']}
							</Text>
							{/* <Text
								style={styles.text}
							>Email do Requerente: {CND.meta_box.email.split('@')[0].substring(0,3)}****@{CND.meta_box.email.split('@')[1]}
							</Text> */}
							<Text
								style={styles.text}
							>Status: {CND.meta_box.status}
							</Text>

							{CND.meta_box.status === 'Aguardando pagamento' && <>
								<TouchableOpacity
									style={{
										width: '100%',
										padding: 15,
										borderWidth: 1,
										borderColor: colors.primary,
										justifyContent: 'center',
										alignItems: 'center',
										marginVertical: 10
									}}
								>
									<Text
										style={{ ...styles.text, color: colors.primary }}
									>BAIXAR BOLETO</Text>
								</TouchableOpacity>
								{CND.meta_box['codigo-boleto'] &&
									<>
										<Text
											style={{ ...styles.text, textAlign: 'center' }}
										>Código de barras:
										</Text>
										<Text
											selectable={true}
											style={{ ...styles.text, textAlign: 'center' }}
										>{CND.meta_box['codigo-boleto']}</Text>
										<TouchableOpacity
											onPress={() => {
												setVisible(true);
											}}
											style={{
												width: '100%',
												padding: 15,
												borderWidth: 1,
												borderColor: colors.primary,
												justifyContent: 'center',
												alignItems: 'center',
												marginVertical: 10
											}}
										>
											<Text
												style={{ ...styles.text, color: colors.primary }}
											>ENVIAR COMPROVANTE</Text>
										</TouchableOpacity>
									</>
								}
							</>}


						</View>
					}) : <View
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
					>
							<Feather name="alert-triangle" size={50} color="black" />
							<Text
								style={{ marginTop: 20 }}
							>Você ainda não realizou nenhuma manifestação.</Text>
						</View>
				}


			</ScrollView>
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
							flexDirection: 'row'
						}}>

						<TouchableOpacity
							//activeOpacity={0.85}
							onPress={async () => {
							}}
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#FFF',
								height: 70,
								borderRightWidth: 0.5,
								borderRightColor: colors.primary
							}}
						>
							<Text
								style={{ ...styles.text, textAlign: 'center', color: colors.primary }}
							>CÂMERA</Text>
						</TouchableOpacity>
						<TouchableOpacity
							//activeOpacity={0.85}
							onPress={async () => {
							}}
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#FFF',
								height: 70
							}}
						>
							<Text
								style={{ ...styles.text, textAlign: 'center', color: colors.primary }}
							>ANEXO</Text>
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
		backgroundColor: colors.backgroudColorContent,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	listItem: {
		width: '100%',
		height: 50,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	title: {
		fontSize: 16,
		textAlign: 'center',
		paddingHorizontal: 10,
		fontFamily: 'Montserrat_400Regular'
	},
	text: {
		fontSize: 14,
		textAlign: 'left',
		fontFamily: 'Montserrat_400Regular'
	},
	input: {
		width: '100%',
		height: 60,
		paddingLeft: 20,
		borderWidth: 1,
		borderColor: '#DDD',
		fontSize: 18,
		backgroundColor: '#FFF',
		fontFamily: 'Montserrat_400Regular'
	},
	errorMsg: {
		alignSelf: 'center',
		fontSize: 10,
		fontFamily: 'Montserrat_400Regular',
		color: 'red'
	},
});
