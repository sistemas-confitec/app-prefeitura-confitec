import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, Picker, View, TextInput, Alert, Keyboard, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

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
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: '#FFF',
                    elevation: 4,
                    paddingHorizontal: 40
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
                            fontWeight: 'bold',
                            //textAlign:'right'
                        }}
                    >E-SIC</Text>
                    <Text
                    //style={{textAlign:'right'}}
                    >Sistema Eletrônico do Serviço de Informações ao Cidadão</Text>
                </View>
            </View>
            <KeyboardAwareScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{
                    justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1,
                    paddingHorizontal: 15
                }}
                extraScrollHeight={100}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
            >
                <View style={{ width: '100%' }}>
                    <Text>BEM VINDO</Text>
                    <Text>O Sistema Eletrônico do Serviço de Informações ao Cidadão (e-SIC) permite que qualquer pessoa, física ou jurídica, encaminhe pedidos de acesso à informação, acompanhe o prazo e receba a resposta da solicitação realizada.</Text>
                    <Text
                        style={{ fontWeight: 'bold' }}
                    >O cidadão ainda pode entrar com recursos e apresentar reclamações, sem burocracia, apenas adicionando o número do protocolo no corpo mensagem.</Text>

                    <View
                    style={{
                        flexDirection:'row'
                    }}
                    >
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#5BC0DE',
                            color: '#663E1D',
                            padding: 10,
                            flex:1,
                            marginTop: 20,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        onPress={() => {
                            props.navigation.navigate('ManifestacoesScreen', { ouvidor: atendimento[0].meta_box['nome'] });
                        }}
                    >
                        <MaterialIcons style={{marginRight:10}} name="history" size={24} color="#FFF" />
                        <Text
                            style={{ textAlign: 'center', color: '#FFF' }}
                        >MANIFESTAÇÕES SALVAS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flex:1,
                            backgroundColor: '#007BFF',
                            color: '#663E1D',
                            padding: 10,
                            width: '100%',
                            marginTop: 20,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        onPress={() => { props.navigation.navigate('OuvidoriaScreen') }}
                    >
                        <Entypo style={{marginRight:10}} name="megaphone" size={24} color="#FFF" />
                        <Text
                            style={{ textAlign: 'center', color: '#FFF' }}
                        >REALIZAR MANIFESTAÇÃO</Text>
                    </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TextInput
                            value={protocolo}
                            style={{ ...styles.input, width: undefined, flex: 1 }}
                            placeholder={'Buscar por número do protocolo'}
                            placeholderTextColor={'#CCC'}
                            keyboardType={'numeric'}
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
                            onPress={() => { }}
                        >
                            <Text
                                style={{ alignSelf: 'center', color: '#FFF' }}
                            >Buscar</Text>
                        </TouchableOpacity>
                    </View>

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

                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.backgroudColorContent,
        alignItems: 'center',
        justifyContent: 'flex-start',
        //paddingHorizontal: 15
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