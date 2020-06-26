import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, Keyboard, Alert, AsyncStorage, ActivityIndicator, Linking } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Divider } from 'react-native-elements'
import { RadioButton } from 'react-native-paper';
import { colors, idContactForm7CND } from '../config/Constants';
import { AntDesign } from '@expo/vector-icons';
import { baseURL } from '../config/Constants';
import api from '../services/api';
import axios from 'axios';


export default function VerificarCNDScreen({ route, navigation }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [protocolo, setProtocolo] = useState({ value: '' });

	
	return (
		<View style={styles.container}>
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
				<Text style={styles.title}>EMISSÃO DE CERTIDÃO NEGATIVA DE DÉBITOS MUNICIPAIS</Text>
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

			</ScrollView>
			<TouchableOpacity
				onPress={async () => {
					//handleSubmit();
					setIsSubmitting(true)
					const resp = await api.get(`/wp-json/wp/v2/app-gerar-link-cnd?protocolo=${protocolo.value}`);
					console.log(resp.data)
					if(resp.data && resp.data.link){
						Linking.openURL(`${baseURL}${resp.data.link}`);
					}else{
						Alert.alert("Erro ao buscar CND", "Tivemos um problema ao verificar esta CND, verifique se o protocolo está correto e tente novamente")
					}
					setIsSubmitting(false)
				}}
				style={{
					width: Dimensions.get('window').width - 20,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1.5,
					height: 60,
					borderColor: colors.primary,
					margin: 10,
				}}
			>
				{!isSubmitting ? <Text
					style={{
						color: colors.primary,
						fontFamily: 'Montserrat_400Regular'
					}}
				>VERIFICAR AUTENTICIDADE</Text> : <ActivityIndicator />}
			</TouchableOpacity>
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
		textAlign:'center',
		height: 60,
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
