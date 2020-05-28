import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import api from '../services/api';
import { colors } from '../config/Constants';

export default function OuvidoriaScreen(props) {
    const [animationAccountSuccess, setAnimationAccountSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [anonimo, setAnonimo] = useState({ value: 'NÃO' });
    const [name, setName] = useState({ value: '' });
    const [sexo, setSexo] = useState({ value: '' });
    const [instrucao, setInstrucao] = useState({ value: '' });
    const [nascimento, setNascimento] = useState({ value: '' });
    const [secretaria, setSecretaria] = useState({ value: '' });
    const [subject, setSubject] = useState({ value: '' });
    const [email, setEmail] = useState({ value: '' });
    const [telefones, setTelefones] = useState({ value: '' });
    const [message, setMessage] = useState({ value: '' });

    function validateName() {
        if (!name.value) {
            setName({ ...name, error: "Campo obrigatório" })
        } else {
            if (name.value.length < 3) {
                setName({ ...name, error: "O nome deve conter no mínimo 3 caracteres" })
            } else {
                setName({ ...name, error: undefined });
                return true;
            }
        }
    }
/*     function validatePhoneNumber() {
        if (!phoneNumber.value) {
            setPhoneNumber({ ...phoneNumber, error: "Campo obrigatório" })
        } else {
            if (phoneNumber.value.length !== 15) {
                setPhoneNumber({ ...phoneNumber, error: "Número inválido (certifique-se de digitar o 9 adicional)" })
            } else {
                setPhoneNumber({ ...phoneNumber, error: undefined });
                return true;
            }
        }
    }
    function validatePassword() {
        if (!password.value) {
            setPassword({ ...password, error: "Campo obrigatório" })
        } else {
            if (password.value.length < 4) {
                setPassword({ ...password, error: "A senha deve conter no mínimo 4 caracteres" })
            } else {
                setPassword({ ...password, error: undefined });
                return true;
            }
        }
    }
    function validateConfirmPassword() {
        if (!confirmPassword.value) {
            setConfirmPassword({ ...confirmPassword, error: "Campo obrigatório" })
        } else {
            if (confirmPassword.value !== password.value) {
                setConfirmPassword({ ...confirmPassword, error: "As senhas devem ser iguais" })
            } else {
                setConfirmPassword({ ...confirmPassword, error: undefined });
                return true;
            }
        }
    } */

    function validate() {
        return validateName(); //&& validatePhoneNumber() && validatePassword() && validateConfirmPassword();
    }


    async function handleSubmit() {
        const valid = validate();
        Keyboard.dismiss();
        if (valid) {
            try {
                setIsSubmitting(true);
                const response = await api.post('/customer/signup', {
                    name: name.value,
                });
                if (response.data.success) {
                    //setAnimationAccountSuccess(true);
                } else {

                    Alert.alert('Erro ao cadastrar', 'Parece que o número fornecido já possui um cadastro no nosso sistema.');
                    setIsSubmitting(false);
                }
            } catch (error) {
                console.log(error)
                Alert.alert('Falha na comunicação com o servidor, verifique sua conexão com a Internet.');
                setIsSubmitting(false);
            }
        }
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}
                extraScrollHeight={100}
                keyboardShouldPersistTaps={'handled'}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
            >
                <View style={{width:'100%'}}>
                    <View style={styles.formContainer} >
                        <Text style={styles.textForm}>NOME</Text>
                        <TextInput
                            value={name.value}
                            style={styles.input}
                            placeholder={'Seu nome'}
                            placeholderTextColor={'#CCC'}
                            maxLength={50}
                            autoCapitalize={'words'}
                            onEndEditing={validateName}
                            onChangeText={(text) => { setName({ ...name, value: text }) }}
                        />

                        <Text style={styles.errorMsg}>{name.error}</Text>


                        {/* <StyledButton
                            title={'Cadastrar'}
                            //disabled={!isValid || isSubmitting}
                            loading={isSubmitting}
                            onPress={handleSubmit}
                        /> */}
                        <TouchableOpacity
                            style={{ width: '100%', heigth:40, backgroundColor: colors.primary }}
                            onPress={handleSubmit}
                        >
                            {isSubmitting ? <Text>Enviar</Text> : <ActivityIndicator />}
                        </TouchableOpacity>

                    </View>
                </View>
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
    },
    formContainer: {
        //backgroundColor: '#FFF',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        //elevation: 4,
        //borderRadius: 15,
    },
    input: {
        width: '100%',
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderColor: '#DDD',
        fontSize: 14,
    },
    textForm: {
        fontFamily: 'segoe-print-bold',
        color: '#666',
        alignSelf: 'flex-start',
        fontSize: 14,
        marginTop: 5,
        marginBottom: 0,
    },
    buttonForm: {
        backgroundColor: colors.secundary,
        textAlign: 'center',
        color: '#663E1D',
        borderRadius: 25,
        padding: 10,
        width: 120,
        marginTop: 20,
    },
    errorMsg: {
        alignSelf: 'flex-start',
        fontSize: 10,
        color: 'red'
    }
});