import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, Picker, View, TextInput, Alert, Keyboard, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { MaterialIcons, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';

import { colors, esicURL } from '../config/Constants';
import HeaderDivider from '../components/HeaderDivider';
import Header from '../components/Header';

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
            <Header
                title="e-SIC"
                subtitle={'Sistema Eletrônico do Serviço de Informações ao Cidadão'}
                assetName={"logo_e_sic"}
                titleColor={"#008608"}
            />
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
                <View style={{ width: '100%', paddingTop: 10 }}>

                    <View
                        style={styles.itemContainer}
                    >
                        <Text
                            style={{ textAlign: 'justify' }}
                        >O e-SIC permite que qualquer pessoa, física ou jurídica, encaminhe pedidos de acesso à informação, acompanhe o prazo e receba a resposta da solicitação realizada.</Text>
                        <Text
                            style={{ fontWeight: 'bold', textAlign: 'justify' }}
                        >O cidadão ainda pode entrar com recursos e apresentar reclamações, sem burocracia, apenas adicionando o número do protocolo no corpo mensagem.</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.primary,
                                color: '#663E1D',
                                padding: 10,
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                elevation: 4,
                                borderTopLeftRadius: 8,
                                borderBottomLeftRadius: 8,
                            }}
                            onPress={() => {
                                props.navigation.navigate('ManifestacoesScreen', { ouvidor: atendimento[0].meta_box['nome'] });
                            }}
                        >
                            <MaterialIcons style={{ marginRight: 10 }} name="history" size={24} color="#FFF" />
                            <Text
                                style={{ textAlign: 'center', color: '#FFF' }}
                            >MANIFESTAÇÕES SALVAS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: colors.secondary,
                                color: '#663E1D',
                                padding: 10,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                elevation: 4,
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                            }}
                            onPress={() => { props.navigation.navigate('OuvidoriaScreen', { title: atendimento[0].title.rendered }) }}
                        >
                            <Entypo style={{ marginRight: 10 }} name="megaphone" size={24} color="#FFF" />
                            <Text
                                style={{ textAlign: 'center', color: '#FFF' }}
                            >NOVA MANIFESTAÇÃO</Text>
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
                                backgroundColor: '#008608',
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
                            fontSize: 18,
                            marginVertical: 10,
                            textAlign: 'center',
                            color: colors.primary
                        }}
                    >ATENDIMENTO PRESENCIAL AO CIDADÃO</Text>

                    <HeaderDivider />

                    <View
                        style={styles.itemContainer}
                    >
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <FontAwesome5 name="map" size={20} color={colors.primary} />
                            </View>
                            <View
                                style={{ marginLeft: 10 }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >Endereço: </Text>
                                <Text
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >{!atendimento ? '' : atendimento[0].meta_box['end-presencial']}</Text>
                            </View>
                        </View>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <FontAwesome5 name="clock" size={20} color={colors.primary} />
                            </View>
                            <View
                                style={{ marginLeft: 10 }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >Horário de atendimento: </Text>
                                <Text
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >{!atendimento ? '' : atendimento[0].meta_box['horario']}</Text>
                            </View>
                        </View>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <FontAwesome5 name="phone-volume" size={20} color={colors.primary} />
                            </View>
                            <View
                                style={{ marginLeft: 10 }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >Telefone: </Text>
                                <Text
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >{!atendimento ? '' : atendimento[0].meta_box['telefone']}</Text>
                            </View>
                        </View>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <FontAwesome5 name="mail-bulk" size={20} color={colors.primary} />
                            </View>
                            <View
                                style={{ marginLeft: 10 }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >E-mail: </Text>
                                <Text
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >{!atendimento ? '' : atendimento[0].meta_box['email']}</Text>
                            </View>
                        </View>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <FontAwesome5 name="user-tie" size={20} color={colors.primary} />
                            </View>
                            <View
                                style={{ marginLeft: 10 }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >Ouvidor(a): </Text>
                                <Text
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >{!atendimento ? '' : atendimento[0].meta_box['nome']}</Text>
                            </View>
                        </View>
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