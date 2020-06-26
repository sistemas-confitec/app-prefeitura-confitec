import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, Keyboard, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Divider } from 'react-native-elements'
import { RadioButton } from 'react-native-paper';
import { colors, idContactForm7CND } from '../config/Constants';
import { AntDesign } from '@expo/vector-icons';
import api from '../services/api';


export default function CNDScreen({ route, navigation }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [nome, setNome] = useState({ value: '' });
	const [razaoSocial, setRazaoSocial] = useState({ value: '' });
	const [pessoa, setPessoa] = useState('fisica');
	const [CPF, setCPF] = useState({ value: '' });
	const [CNPJ, setCNPJ] = useState({ value: '' });
	const [insc, setInsc] = useState({ value: '' });
	const CPFInput = useRef(null);
	const CNPJInput = useRef(null);
	const [email, setEmail] = useState({ value: '' });
	const [endereco, setEndereco] = useState({ value: '' });
	const [bairro, setBairro] = useState({ value: '' });
	const [cidade, setCidade] = useState({ value: '' });

	function validateNome() {
		if (!nome.value) {
			setNome({ ...nome, error: "Campo obrigatório" })
		} else {
			if (nome.value.length < 3) {
				setNome({ ...nome, error: "O nome deve conter no mínimo 3 caracteres" })
			} else {
				setNome({ ...nome, error: undefined });
				return true;
			}
		}
	}

	function validateRazaoSocial() {
		if (!razaoSocial.value) {
			setRazaoSocial({ ...razaoSocial, error: "Campo obrigatório" })
		} else {
			if (razaoSocial.value.length < 3) {
				setRazaoSocial({ ...razaoSocial, error: "A razão social deve conter no mínimo 3 caracteres" })
			} else {
				setRazaoSocial({ ...razaoSocial, error: undefined });
				return true;
			}
		}
	}
	function validateCPF() {
		if (!CPF.value) {
			setCPF({ ...CPF, error: "Campo obrigatório" })
		} else {
			if (CPF.value.length < 14) {
				setCPF({ ...CPF, error: "CPF incompleto" })
			} else if (!CPFInput.current.isValid()) {
				setCPF({ ...CPF, error: "CPF inválido" })
			} else {
				setCPF({ ...CPF, error: undefined });
				return true;
			}
		}
	}

	function validateCNPJ() {
		if (!CNPJ.value) {
			setCNPJ({ ...CNPJ, error: "Campo obrigatório" })
		} else {
			if (CNPJ.value.length < 18) {
				setCNPJ({ ...CNPJ, error: "CNPJ incompleto" })
			} else if (!CNPJInput.current.isValid()) {
				setCNPJ({ ...CNPJ, error: "CNPJ inválido" })
			} else {
				setCNPJ({ ...CNPJ, error: undefined });
				return true;
			}
		}
	}
	function validateEndereco() {
		if (!endereco.value) {
			setEndereco({ ...endereco, error: "Campo obrigatório" })
		} else {
			if (endereco.value.length < 6) {
				setEndereco({ ...endereco, error: "O endereo deve conter no mínimo 6 caracteres" })
			} else {
				setEndereco({ ...endereco, error: undefined });
				return true;
			}
		}
	}

	function validateBairro() {
		if (!bairro.value) {
			setBairro({ ...bairro, error: "Campo obrigatório" })
		} else {
			if (bairro.value.length < 3) {
				setBairro({ ...bairro, error: "O bairro deve conter no mínimo 3 caracteres" })
			} else {
				setBairro({ ...bairro, error: undefined });
				return true;
			}
		}
	}
	function validateCidade() {
		if (!cidade.value) {
			setCidade({ ...cidade, error: "Campo obrigatório" })
		} else {
			if (cidade.value.length < 3) {
				setCidade({ ...cidade, error: "A cidade deve conter no mínimo 3 caracteres" })
			} else {
				setCidade({ ...cidade, error: undefined });
				return true;
			}
		}
	}
	function validateEmail() {
		if (!email.value) {
			setEmail({ ...email, error: "Campo obrigatório*" })
		} else {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!re.test(String(email.value).toLowerCase())) {
				setEmail({ ...email, error: "O email é inválido*" })
			} else {
				setEmail({ ...email, error: undefined });
				return true;
			}
		}
	}

	function validate() {
		if (pessoa === 'fisica') {
			setCNPJ({ value: '', error: undefined });
			setRazaoSocial({ value: '', error: undefined });
			setInsc({ value: '', error: undefined });
			return validateNome() & validateCPF() & validateEmail() & validateEndereco()
				& validateBairro() & validateCidade();
		} else {
			setNome({ value: '', error: undefined });
			setCPF({ value: '', error: undefined });
			return validateRazaoSocial() & validateCNPJ() & validateEmail() & validateEndereco()
				& validateBairro() & validateCidade();

		}
	}

	async function storeProtocol(protocol) {

        const protocols = await AsyncStorage.getItem('CND_protocols');
        let protocolsArray;
        if (!protocols) {
            protocolsArray = [];
            protocolsArray.push(protocol)
        } else {
            protocolsArray = JSON.parse(protocols);
            protocolsArray.push(protocol);
        }
        await AsyncStorage.setItem('CND_protocols', JSON.stringify(protocolsArray));
    }

	async function handleSubmit() {
		const valid = validate();
		Keyboard.dismiss();
		if (valid) {
			try {
				const data = new FormData();
				data.append('identificador', 'requisitar-CND');
				data.append('tipo', pessoa === 'fisica' ? 'Pessoa Física' : 'Pessoa Jurídica');
				data.append('nome', pessoa === 'fisica' ? nome.value : '*');
				data.append('cpf', pessoa === 'fisica' ? CPF.value : '*');
				data.append('razao-social', pessoa === 'juridica' ? razaoSocial.value : '*');
				data.append('cnpj', pessoa === 'juridica' ? CNPJ.value : '*');
				if (insc) {
					data.append('insc', pessoa === 'juridica' ? insc.value : '');
				}
				data.append('your-email', email.value);
				data.append('endereco', endereco.value);
				data.append('cidade', cidade.value);
				data.append('bairro', bairro.value);
				setIsSubmitting(true);
				const response = await api.post(`/wp-json/contact-form-7/v1/contact-forms/${idContactForm7CND}/feedback`, data);
				console.log(response.data);
				if (response.data.status === 'mail_sent') {
					Alert.alert('Enviado com sucesso', `Verificar status da sua CND`, [{ text: 'ok', onPress: () => navigation.navigate('CNDsScreen') }]);
					//console.log(response.data.message.split(':')[1].trim())
					storeProtocol(response.data.message.split(':')[1].trim())
				} else {
					Alert.alert('Erro ao cadastrar', 'Tivemos um problema no envio do formulário');
				}
				setIsSubmitting(false);
			} catch (error) {
				console.log(error)
				Alert.alert('Falha na comunicação com o servidor, verifique sua conexão com a Internet.');
				setIsSubmitting(false);
			}
		}
	}

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

				<View
					style={{ width: '100%', flexDirection: 'row', marginBottom: 15 }}
				>
					<TouchableOpacity
						onPress={() => { setPessoa('fisica') }}
						style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
						<RadioButton
							value="fisica"
							color={colors.primary}
							status={pessoa === 'fisica' ? 'checked' : 'unchecked'}
							onPress={() => { setPessoa('fisica') }}
						/>
						<Text
							style={{ fontFamily: 'Montserrat_400Regular', fontSize: 16 }}
						>PESSOA FÍSICA</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setPessoa('juridica')
						}}
						style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
						<RadioButton
							value="juridica"
							color={colors.primary}
							status={pessoa === 'juridica' ? 'checked' : 'unchecked'}
							onPress={() => { setPessoa('juridica') }}
						/>
						<Text
							style={{ fontFamily: 'Montserrat_400Regular', fontSize: 16 }}
						>PESSOA JURÍDICA</Text>
					</TouchableOpacity>
				</View>


				{pessoa === 'fisica' && <>
					<TextInput
						value={nome.value}
						style={styles.input}
						placeholder={'NOME'}
						placeholderTextColor={'#CCC'}
						maxLength={50}
						autoCapitalize={'words'}
						onEndEditing={validateNome}
						onChangeText={(text) => { setNome({ ...nome, value: text }) }}
					/>
					<Text style={styles.errorMsg}>{nome.error}</Text>

					<TextInputMask
						type={'cpf'}
						ref={CPFInput}
						value={CPF.value}
						style={styles.input}
						placeholder={'CPF'}
						placeholderTextColor={'#CCC'}
						maxLength={14}
						autoCapitalize={'none'}
						onEndEditing={validateCPF}
						onChangeText={(text) => { setCPF({ ...CPF, value: text }) }}
					/>
					<Text style={styles.errorMsg}>{CPF.error}</Text></>}

				{pessoa === 'juridica' && <>
					<TextInput
						value={razaoSocial.value}
						style={styles.input}
						placeholder={'RAZÃO SOCIAL'}
						placeholderTextColor={'#CCC'}
						maxLength={50}
						onEndEditing={validateRazaoSocial}
						onChangeText={(text) => { setRazaoSocial({ ...razaoSocial, value: text }) }}
					/>
					<Text style={styles.errorMsg}>{razaoSocial.error}</Text>

					<TextInputMask
						type={'cnpj'}
						ref={CNPJInput}
						value={CNPJ.value}
						style={styles.input}
						placeholder={'CNPJ'}
						placeholderTextColor={'#CCC'}
						maxLength={18}
						onEndEditing={validateCNPJ}
						onChangeText={(text) => { setCNPJ({ ...CNPJ, value: text }) }}
					/>
					<Text style={styles.errorMsg}>{CNPJ.error}</Text>

					<TextInputMask
						type={'only-numbers'}
						value={insc.value}
						style={styles.input}
						placeholder={'INSC. MUNICIPAL (SE POSSUIR)'}
						placeholderTextColor={'#CCC'}
						maxLength={30}
						onChangeText={(text) => { setInsc({ ...insc, value: text }) }}
					/>
					<Text style={styles.errorMsg}>{insc.error}</Text>

				</>}


				<TextInput
					value={email.value}
					style={styles.input}
					placeholder={'E-MAIL'}
					placeholderTextColor={'#CCC'}
					maxLength={50}
					textContentType={"emailAddress"}
					keyboardType={"email-address"}
					autoCapitalize={'none'}
					onEndEditing={validateEmail}
					onChangeText={(text) => { setEmail({ ...email, value: text }) }}
				/>
				<Text style={styles.errorMsg}>{email.error}</Text>

				<TextInput
					value={endereco.value}
					style={styles.input}
					placeholder={'ENDEREÇO, NÚMERO'}
					placeholderTextColor={'#CCC'}
					maxLength={50}
					autoCapitalize={'sentences'}
					onEndEditing={validateEndereco}
					onChangeText={(text) => { setEndereco({ ...endereco, value: text }) }}
				/>
				<Text style={styles.errorMsg}>{endereco.error}</Text>

				<TextInput
					value={bairro.value}
					style={styles.input}
					placeholder={'BAIRRO'}
					placeholderTextColor={'#CCC'}
					maxLength={50}
					autoCapitalize={'sentences'}
					onEndEditing={validateBairro}
					onChangeText={(text) => { setBairro({ ...bairro, value: text }) }}
				/>
				<Text style={styles.errorMsg}>{bairro.error}</Text>

				<TextInput
					value={cidade.value}
					style={styles.input}
					placeholder={'CIDADE'}
					placeholderTextColor={'#CCC'}
					maxLength={50}
					autoCapitalize={'sentences'}
					onEndEditing={validateCidade}
					onChangeText={(text) => { setCidade({ ...cidade, value: text }) }}
				/>
				<Text style={styles.errorMsg}>{cidade.error}</Text>

			</ScrollView>
			<TouchableOpacity
				onPress={() => {
					handleSubmit();
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
				>REQUISITAR CND</Text> : <ActivityIndicator />}
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
