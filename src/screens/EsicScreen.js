import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, Picker, View, TextInput, Alert, Keyboard, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

import { colors, esicURL } from '../config/Constants';

export default function EsicScreen(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [protocolo, setProtocolo] = useState('');
    const [atendimento, setAtendimento] = useState('');

    async function fetchAtendimento() {
        const resp = await axios.get(`${esicURL}/wp-json/wp/v2/app-ouvidoria`);
        if (resp.data) {
            setAtendimento(resp.data);
        }
    }

    useEffect(() => { fetchAtendimento() }, []);

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1 }}
                extraScrollHeight={100}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
            >
                <View style={{ width: '100%' }}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row'
                        }}
                    >
                        <Image
                            source={require('../../assets/logo_e_sic.png')}
                            resizeMode={'contain'}
                            style={{
                                width: 90,
                                height: 90,
                                marginVertical: 20
                            }}
                        />
                        <View
                            style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}
                        >
                            <Text
                                style={{
                                    fontSize: 28,
                                    color: '#23A455',
                                    fontWeight: 'bold'
                                }}
                            >E-SIC</Text>
                            <Text>Sistema Eletrônico do Serviço de Informações ao Cidadão</Text>
                        </View>
                    </View>
                    <Text>BEM VINDO</Text>
                    <Text>O Sistema Eletrônico do Serviço de Informações ao Cidadão (e-SIC) permite que qualquer pessoa, física ou jurídica, encaminhe pedidos de acesso à informação, acompanhe o prazo e receba a resposta da solicitação realizada para órgãos e entidades do Executivo Federal.</Text>
                    <Text>O cidadão ainda pode entrar com recursos e apresentar reclamações sem burocracia.</Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            marginVertical: 10,
                            textAlign: 'center',
                            color: '#27A1D4'
                        }}
                    >ATENDIMENTO PRESENCIAL AO CIDADÃO</Text>
                    <View>
                        <Text
                            style={{
                                fontWeight: 'bold'
                            }}
                        >Endereço: </Text>
                        <Text>{!atendimento ? '' : atendimento[0].meta_box['end-presencial']}</Text>
                    </View>
                    <View >
                        <Text
                            style={{
                                fontWeight: 'bold'
                            }}
                        >Telefone: </Text>
                        <Text>{!atendimento ? '' : atendimento[0].meta_box['telefone']}</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontWeight: 'bold'
                            }}
                        >E-mail: </Text>
                        <Text>{!atendimento ? '' : atendimento[0].meta_box['email']}</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontWeight: 'bold'
                            }}
                        >Horário de atendimento: </Text>
                        <Text>{!atendimento ? '' : atendimento[0].meta_box['horario']}</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontWeight: 'bold'
                            }}
                        >Ouvidor(a): </Text>
                        <Text>{!atendimento ? '' : atendimento[0].meta_box['nome']}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#007BFF',
                            textAlign: 'center',
                            color: '#663E1D',
                            padding: 10,
                            width: '100%',
                            marginTop: 20,
                        }}
                        onPress={() => { props.navigation.navigate('OuvidoriaScreen') }}
                    >
                        <Text
                            style={{ alignSelf: 'center', color: '#FFF' }}
                        >Realizar manifestação</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#5BC0DE',
                            textAlign: 'center',
                            color: '#663E1D',
                            padding: 10,
                            width: '100%',
                            marginTop: 20,
                        }}
                        onPress={() => {
                            props.navigation.navigate('ManifestacoesScreen');
                        }}
                    >
                        <Text
                            style={{ alignSelf: 'center', color: '#FFF' }}
                        >Acompanhar manifestações anteriores</Text>
                    </TouchableOpacity>

                    <Text style={styles.textForm}>Você já realizou alguma manifestação? Digite o número do seu Protocolo:</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TextInput
                            value={protocolo}
                            style={{...styles.input, width:undefined, flex:1}}
                            placeholder={'Número do Protocolo'}
                            placeholderTextColor={'#CCC'}
                            onChangeText={(text) => { setProtocolo(text) }}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#23A455',
                                textAlign: 'center',
                                color: '#663E1D',
                                padding: 10,
                                marginVertical: 10,
                            }}
                            onPress={() => { props.navigation.navigate('OuvidoriaScreen') }}
                        >
                            <Text
                                style={{ alignSelf: 'center', color: '#FFF' }}
                            >Buscar</Text>
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
        paddingHorizontal: 15
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
});