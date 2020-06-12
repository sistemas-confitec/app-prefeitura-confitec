import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, AsyncStorage, Image, Picker, View, TextInput, Alert, Keyboard, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome } from '@expo/vector-icons';

import { colors, esicURL } from '../config/Constants';
import { pad } from '../util/Functions';
import HeaderDivider from '../components/HeaderDivider';
import Header from '../components/Header';

export default function OuvidoriaScreen(props) {
    const title = props.route.params?.title;

    /* const [animationAccountSuccess, setAnimationAccountSuccess] = useState(false); */
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [anonimo, setAnonimo] = useState('NÃO');
    const [name, setName] = useState({ value: '' });
    const [sexo, setSexo] = useState({ value: '---' });
    const [instrucao, setInstrucao] = useState({ value: '---' });
    const [nascimento, setNascimento] = useState({ value: null });
    const [showNascimento, setShowNascimento] = useState(false);
    const [secretaria, setSecretaria] = useState({ value: '---' });
    const [subject, setSubject] = useState({ value: '---' });
    const [email, setEmail] = useState({ value: '' });
    const [telefone, setTelefone] = useState({ value: '' });
    const [message, setMessage] = useState({ value: '' });
    const [document, setDocument] = useState(null);
    const [categories, setCategories] = useState([]);

    async function fetchCategories() {
        const resp = await axios.get(`${esicURL}/wp-json/wp/v2/app-secretaria`);
        if (resp.data) {
            setCategories(resp.data);
        }
    }

    async function storeProtocol(protocol) {

        const protocols = await AsyncStorage.getItem('protocols');
        let protocolsArray;
        if (!protocols) {
            protocolsArray = [];
            protocolsArray.push(protocol)
        } else {
            protocolsArray = JSON.parse(protocols);
            protocolsArray.push(protocol);
        }
        await AsyncStorage.setItem('protocols', JSON.stringify(protocolsArray));
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});

        if (result.type !== 'cancel') {
            setDocument({ ...result, type: '*/*' });
            //setDocument(result);
        }
    }

    function formatDate(date) {
        const datetime = new Date(date);
        return pad(datetime.getDate()) + '/' + pad(datetime.getMonth() + 1) + '/' + datetime.getFullYear();
    }

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
    function validateEmail() {
        if (!email.value) {
            setEmail({ ...email, error: "Campo obrigatório" })
        } else {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email.value).toLowerCase())) {
                setEmail({ ...email, error: "O email é inválido" })
            } else {
                setEmail({ ...email, error: undefined });
                return true;
            }
        }
    }

    function validateTelefone() {
        if (!telefone.value) {
            setTelefone({ ...telefone, error: "Campo obrigatório" })
        } else {
            if (telefone.value.length !== 14 && telefone.value.length !== 15) {
                setTelefone({ ...telefone, error: "Telefone inválido (digite DDD+telefone)" })
            } else {
                setTelefone({ ...telefone, error: undefined });
                return true;
            }
        }
    }

    function validateSexo() {
        if (sexo.value === '---') {
            setSexo({ ...sexo, error: "Campo obrigatório" })
        } else {
            setSexo({ ...sexo, error: undefined });
            return true;
        }
    }

    function validateNascimento() {
        if (!nascimento.value) {
            setNascimento({ ...nascimento, error: "Campo obrigatório" })
        } else {
            setNascimento({ ...nascimento, error: undefined });
            return true;
        }
    }

    function validateInstrucao() {
        if (instrucao.value === '---') {
            setInstrucao({ ...instrucao, error: "Campo obrigatório" })
        } else {
            setInstrucao({ ...instrucao, error: undefined });
            return true;
        }
    }

    function validateSecretaria() {
        if (secretaria.value === '---') {
            setSecretaria({ ...secretaria, error: "Campo obrigatório" })
        } else {
            setSecretaria({ ...secretaria, error: undefined });
            return true;
        }
    }

    function validateSubject() {
        if (subject.value === '---') {
            setSubject({ ...subject, error: "Campo obrigatório" })
        } else {
            setSubject({ ...subject, error: undefined });
            return true;
        }
    }

    function validateMessage() {
        if (!message.value) {
            setMessage({ ...message, error: "Campo obrigatório" })
        } else {
            if (message.value.length < 10) {
                setMessage({ ...message, error: "A mensagem deve conter no mínimo 10 caracteres" })
            } else {
                setMessage({ ...message, error: undefined });
                return true;
            }
        }
    }

    function validate() {
        if (anonimo === 'NÃO') {
            return validateName() & validateEmail() & validateTelefone() & validateSexo()
                & validateInstrucao() & validateNascimento() & validateSecretaria()
                & validateMessage() & validateSubject();
        } else {
            setName({ value: '', error: undefined });
            setEmail({ value: '', error: undefined });
            setTelefone({ value: '', error: undefined });
            return validateSexo() & validateInstrucao() & validateNascimento() & validateSecretaria()
                & validateMessage() & validateSubject();

        }
    }


    async function handleSubmit() {
        const valid = validate();
        Keyboard.dismiss();
        if (valid) {
            try {
                const birth = new Date(nascimento.value);
                const nasc = birth.getFullYear() + '-' + pad(birth.getMonth() + 1) + '-' + pad(birth.getDate())
                const data = new FormData();
                data.append('anonimo', anonimo);
                data.append('instrucao', instrucao.value);
                data.append('message', message.value);
                data.append('nome', anonimo === 'NÃO' ? name.value : 'Anonimo');
                data.append('nascimento', nasc);
                data.append('secretaria', secretaria.value);
                data.append('sexo', sexo.value);
                data.append('subject', subject.value);
                if (document) {
                    data.append('anexo', document);
                }
                data.append('telefone', anonimo === 'NÃO' ? telefone.value : 'Anonimo');
                data.append('email', anonimo === 'NÃO' ? email.value : 'Anonimo@anonimo.com');
                setIsSubmitting(true);
                const response = await axios.post(`${esicURL}/wp-json/contact-form-7/v1/contact-forms/418/feedback`, data);
                console.log(response.data);
                if (response.data.status === 'mail_sent') {
                    Alert.alert('Enviado com sucesso', `${response.data.message}`, [{ text: 'ok', onPress: () => props.navigation.goBack() }]);
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
            <Header
                title="Ouvidoria"
                subtitle={!title ? '' : title}
                assetName={"logo_ouvidoria"}
                titleColor={"#2B5489"}
            />
            <KeyboardAwareScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}
                extraScrollHeight={100}
                keyboardShouldPersistTaps={'handled'}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
            >
                <View style={{ width: '100%' }}>
                    <View style={styles.formContainer} >

                        <View
                            style={styles.itemContainer}
                        >

                            <Text
                                style={{ textAlign: 'justify' }}
                            >A ouvidoria é um canal para você apresentar sugestões, elogios, solicitações, reclamações, denúncias, entre outros. No serviço público, a ouvidoria é uma espécie de “ponte” entre você e a Administração Pública.</Text>

                            <Text
                                style={{ textAlign: 'justify', fontWeight: 'bold' }}
                            >A ouvidoria recebe as manifestações dos cidadãos, analisa, orienta, encaminha às áreas responsáveis pelo tratamento ou apuração, responde ao manifestante e conclui a manifestação.</Text>
                        </View>

                        <HeaderDivider />

                        <Text style={styles.textForm}>Você deseja se manter em anonimato?</Text>
                        <Picker
                            selectedValue={anonimo}
                            mode={'dropdown'}
                            style={styles.input}
                            //style={{ height: 50, width: 150, alignSelf:'flex-start' }}
                            onValueChange={(itemValue, itemIndex) => setAnonimo(itemValue)}
                        >
                            <Picker.Item label="Não" value="NÃO" />
                            <Picker.Item label="Sim" value="SIM" />
                        </Picker>

                        {anonimo === 'NÃO' && <>
                            <Text style={styles.textForm}>Seu nome*</Text>
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

                            <Text style={styles.textForm}>Seu e-mail*</Text>
                            <TextInput
                                value={email.value}
                                style={styles.input}
                                placeholder={'Seu e-mail'}
                                placeholderTextColor={'#CCC'}
                                maxLength={50}
                                textContentType={"emailAddress"}
                                keyboardType={"email-address"}
                                autoCapitalize={'none'}
                                onEndEditing={validateEmail}
                                onChangeText={(text) => { setEmail({ ...email, value: text }) }}
                            />
                            <Text style={styles.errorMsg}>{email.error}</Text>

                            <Text style={styles.textForm}>Seu telefone*</Text>
                            <TextInputMask
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                value={telefone.value}
                                style={styles.input}
                                placeholder={'Seu Telefone'}
                                placeholderTextColor={'#CCC'}
                                maxLength={15}
                                onEndEditing={validateTelefone}
                                onChangeText={(text) => { setTelefone({ ...telefone, value: text }) }}
                            />
                            <Text style={styles.errorMsg}>{telefone.error}</Text>
                        </>}
                        <Text style={styles.textForm}>Sexo*</Text>
                        <Picker
                            selectedValue={sexo.value}
                            mode={'dropdown'}
                            style={styles.input}
                            onValueChange={(itemValue, itemIndex) => setSexo({ ...sexo, value: itemValue })}
                        >
                            <Picker.Item label="---" value="---" />
                            <Picker.Item label="Masculino" value="MASCULINO" />
                            <Picker.Item label="Feminino" value="FEMININO" />
                        </Picker>
                        <Text style={styles.errorMsg}>{sexo.error}</Text>

                        <Text style={styles.textForm}>Grau de Instrução*</Text>
                        <Picker
                            selectedValue={instrucao.value}
                            mode={'dropdown'}
                            style={styles.input}
                            //style={{ height: 50, width: 150, alignSelf:'flex-start' }}
                            onValueChange={(itemValue, itemIndex) => setInstrucao({ ...instrucao, value: itemValue })}
                        >
                            <Picker.Item label="---" value="---" />
                            <Picker.Item label="ANALFABETO, INCLUSIVE O QUE, EMBORA TENHA RECEBIDO INSTRUÇÃO, NÃO SE ALFABETIZOU"
                                value="ANALFABETO, INCLUSIVE O QUE, EMBORA TENHA RECEBIDO INSTRUÇÃO, NÃO SE ALFABETIZOU" />
                            <Picker.Item label="ATÉ O 5º ANO INCOMPLETO DO ENSINO FUNDAMENTAL (ANTIGA 4ª SÉRIE) QUE SE TENHA ALFABETIZADO SEM TER FREQÜENTADO ESCOLA REGULAR"
                                value="ATÉ O 5º ANO INCOMPLETO DO ENSINO FUNDAMENTAL (ANTIGA 4ª SÉRIE) QUE SE TENHA ALFABETIZADO SEM TER FREQÜENTADO ESCOLA REGULAR" />
                            <Picker.Item label="5º ANO COMPLETO DO ENSINO FUNDAMENTAL"
                                value="5º ANO COMPLETO DO ENSINO FUNDAMENTAL" />
                            <Picker.Item label="DO 6º AO 9º ANO DO ENSINO FUNDAMENTAL INCOMPLETO (ANTIGA 5ª À 8ª SÉRIE)"
                                value="DO 6º AO 9º ANO DO ENSINO FUNDAMENTAL INCOMPLETO (ANTIGA 5ª À 8ª SÉRIE)" />
                            <Picker.Item label="ENSINO FUNDAMENTAL COMPLETO"
                                value="ENSINO FUNDAMENTAL COMPLETO" />
                            <Picker.Item label="ENSINO MÉDIO INCOMPLETO"
                                value="ENSINO MÉDIO INCOMPLETO" />
                            <Picker.Item label="ENSINO MÉDIO COMPLETO"
                                value="ENSINO MÉDIO COMPLETO" />
                            <Picker.Item label="EDUCAÇÃO SUPERIOR INCOMPLETA"
                                value="EDUCAÇÃO SUPERIOR INCOMPLETA" />
                            <Picker.Item label="EDUCAÇÃO SUPERIOR COMPLETA"
                                value="EDUCAÇÃO SUPERIOR COMPLETA" />
                            <Picker.Item label="PÓS GRADUAÇÃO INCOMPLETA"
                                value="PÓS GRADUAÇÃO INCOMPLETA" />
                            <Picker.Item label="PÓS GRADUAÇÃO COMPLETA"
                                value="PÓS GRADUAÇÃO COMPLETA" />
                            <Picker.Item label="MESTRADO COMPLETO"
                                value="MESTRADO COMPLETO" />
                            <Picker.Item label="DOUTORADO COMPLETO"
                                value="DOUTORADO COMPLETO" />
                        </Picker>
                        <Text style={styles.errorMsg}>{instrucao.error}</Text>

                        <Text style={styles.textForm}>Data de Nascimento*</Text>
                        {showNascimento && <DateTimePicker
                            //testID="dateTimePicker"
                            timeZoneOffsetInMinutes={180}
                            value={nascimento.value || new Date}
                            mode={'date'}
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || nascimento.value;
                                setShowNascimento(Platform.OS === 'ios');
                                setNascimento({ ...nascimento, value: currentDate, error: undefined });
                            }}
                        />}
                        <TouchableOpacity
                            style={{ ...styles.input, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                setShowNascimento(true);
                            }}
                        >
                            <Text
                            >{!nascimento.value ? 'dd/mm/aaaa' : formatDate(nascimento.value)}</Text>
                        </TouchableOpacity>
                        <Text style={styles.errorMsg}>{nascimento.error}</Text>


                        <Text style={styles.textForm}>Secretaria*</Text>
                        <Picker
                            selectedValue={secretaria.value}
                            mode={'dropdown'}
                            style={styles.input}
                            //style={{ height: 50, width: 150, alignSelf:'flex-start' }}
                            onValueChange={(itemValue, itemIndex) => setSecretaria({ ...secretaria, value: itemValue })}
                        >
                            <Picker.Item label="---" value="---" />
                            {categories?.map((item) => <Picker.Item key={item.id} label={item.title.rendered} value={item.id} />)}
                        </Picker>
                        <Text style={styles.errorMsg}>{secretaria.error}</Text>


                        <Text style={styles.textForm}>Assunto*</Text>
                        <Picker
                            selectedValue={subject.value}
                            mode={'dropdown'}
                            style={styles.input}
                            //style={{ height: 50, width: 150, alignSelf:'flex-start' }}
                            onValueChange={(itemValue, itemIndex) => setSubject({ ...subject, value: itemValue })}
                        >
                            <Picker.Item label="---" value="---" />
                            <Picker.Item label="Críticas" value="Críticas" />
                            <Picker.Item label="Denúncias" value="Denúncias" />
                            <Picker.Item label="Direito do Consumidor" value="Direito do Consumidor" />
                            <Picker.Item label="Dúvidas" value="Dúvidas" />
                            <Picker.Item label="Elogios" value="Elogios" />
                            <Picker.Item label="Reclamações" value="Reclamações" />
                            <Picker.Item label="Solicitação de Documentos" value="Solicitação de Documentos" />
                            <Picker.Item label="Sugestões" value="Sugestões" />
                            <Picker.Item label="Urgências" value="Urgências" />
                        </Picker>
                        <Text style={styles.errorMsg}>{subject.error}</Text>

                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 40,
                                paddingLeft: 10,
                                borderColor: '#DDD',
                                fontSize: 14,
                                backgroundColor: colors.secondary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                            onPress={pickDocument}
                        >
                            {!document ? <>
                                <FontAwesome name="paperclip" size={24} color='#FFF' />
                                <Text
                                    style={{ alignSelf: 'center', marginLeft: 10, color: '#FFF' }}
                                >Anexar Arquivo</Text>
                            </> : <Text>{document.name}</Text>}
                        </TouchableOpacity>
                        <Text
                            style={{ color: '#AAA' }}
                        >Arquivos permitidos: .doc, .docx, .txt, .pdf, .odt, .jpg, .png</Text>

                        <Text style={styles.textForm}>Sua mensagem*</Text>
                        <TextInput
                            value={message.value}
                            style={{ ...styles.input, height: 120, alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            multiline={true}
                            numberOfLines={5}
                            autoCapitalize={'sentences'}
                            onEndEditing={validateMessage}
                            onChangeText={(text) => { setMessage({ ...message, value: text }) }}
                        />
                        <Text style={styles.errorMsg}>{message.error}</Text>


                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.primary,
                                textAlign: 'center',
                                color: '#663E1D',
                                padding: 10,
                                width: '100%',
                                marginTop: 20,
                            }}
                            onPress={handleSubmit}
                        >
                            {!isSubmitting ? <Text
                                style={{ alignSelf: 'center', color: '#FFF' }}
                            >Enviar</Text> : <ActivityIndicator />}
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
        alignSelf: 'center',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        //elevation: 4,
        //borderRadius: 15,
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
    buttonForm: {
        backgroundColor: colors.secondary,
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
        marginBottom: 10
    }
});