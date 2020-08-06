import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, ImageBackground, Alert, ActivityIndicator, Linking } from 'react-native';
import { Divider } from 'react-native-elements'

import api from '../services/api';
import globalStyles from './globalStyles';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import { baseURL, colors, strings } from '../config/Constants';


export default function VerificarCNDScreen({ route, navigation }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [protocolo, setProtocolo] = useState({ value: '' });


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
						style={{ width: '100%' }}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1, padding: 10 }}
					>
						<Text style={globalStyles.title}>EMISSÃO DE CERTIDÃO NEGATIVA DE DÉBITOS MUNICIPAIS</Text>
						<Divider style={{ marginTop: 5, marginBottom: 15 }} />


						<TextInput
							value={protocolo.value}
							style={styles.input}
							placeholder={'PROTOCOLO'}
							placeholderTextColor={'#CCC'}
							maxLength={14}
							keyboardType={"numeric"}
							autoCapitalize={'sentences'}
							//onEndEditing={validateProtocolo}
							onChangeText={(text) => { setProtocolo({ ...protocolo, value: text }) }}
						/>
						<Text style={styles.errorMsg}>{protocolo.error}</Text>

						<View
							style={{
								width: '100%',
								backgroundColor: '#FFF',
								padding:10
							}}
						>
							<Text
								style={{ ...globalStyles.title, color: colors.primary, marginBottom: 10 }}
							>Certidão com validade Eletrônica!</Text>
							<Text
								style={{ ...globalStyles.text, color: colors.primary, textAlign: 'justify', marginBottom: 5 }}
							>A CND Municipal é um documento que declara que a pessoa física ou jurídica está com pagamentos referentes a impostos municipais quitados.</Text>
							<Text
								style={{ ...globalStyles.text, color: colors.primary, textAlign: 'justify', marginBottom: 5 }}
							>Portanto, qualquer pessoa, de direito público ou privado, pode verificar a autenticidade desta certidão, desde que possua o número do protocolo.</Text>
							<Text
								style={{ ...globalStyles.title, color: colors.primary, textAlign: 'justify' }}
							>Atenção, sempre verifique a data de validade da certidão.</Text>
						</View>

					</ScrollView>
					<View
						style={{
							width: '100%',
							padding: 10,
							backgroundColor: '#FFF'
						}}
					>
						<TouchableOpacity
							onPress={async () => {
								setIsSubmitting(true)
								const resp = await api.get(`/wp-json/wp/v2/app-gerar-link-cnd?protocolo=${protocolo.value}`);
								console.log(resp.data)
								if (resp.data && resp.data.link) {
									Linking.openURL(`${baseURL}${resp.data.link}`);
								} else {
									Alert.alert("Erro ao buscar CND", "Tivemos um problema ao verificar esta CND, verifique se o protocolo está correto e tente novamente")
								}
								setIsSubmitting(false)
							}}
							style={{ ...globalStyles.button, backgroundColor: colors.secondary }}
						>
							{!isSubmitting ? <Text
								style={globalStyles.buttonText}
							>VERIFICAR AUTENTICIDADE</Text> : <ActivityIndicator />}
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
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
		paddingHorizontal: 10,
		fontFamily: 'Montserrat_400Regular'
	},
	input: {
		width: '100%',
		height: 60,
		paddingLeft: 20,
		borderLeftWidth: 1,
		borderTopWidth: 1,
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
