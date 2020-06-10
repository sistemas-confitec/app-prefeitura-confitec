import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Picker, View, TextInput, Alert, Keyboard, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import axios from 'axios';
import CollapsibleList from "react-native-collapsible-list";
import { Entypo, FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

import { colors, esicURL, strings } from '../config/Constants';
import Header from '../components/Header';
import { splitDate, pad } from '../util/Functions';

export default function ManifestacoesScreen(props) {
    const [manifestacoes, setManifestacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [collapsed, setCollapsed] = useState([]);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [secretarias, setSecretarias] = useState([]);

    const ouvidor = props.route.params?.ouvidor;

    const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
    };

    async function fetchSecretarias() {
        const resp = await axios.get(`${esicURL}/wp-json/wp/v2/app-secretaria`);
        if (resp.data) {
            setSecretarias(resp.data);
        }
    }

    function download(uri) {
        const splitedUri = uri.split('/');

        return FileSystem.createDownloadResumable(
            `${uri}`,
            FileSystem.documentDirectory + splitedUri[splitedUri.length - 1],
            {},
            callback
        );
    }

    async function fetchManifestacoes() {
        const protocolsArray = await AsyncStorage.getItem('protocols');
        const protocols = JSON.parse(protocolsArray);
        const manifestacoesArray = [];

        setLoading(true)
        for (let i = 0; i < protocols.length; i++) {

            const resp = await axios.get(`${esicURL}/wp-json/wp/v2/app-feedback?slug=protocolo-${protocols[i]}`);
            if (resp.data[0]) {
                manifestacoesArray.push(resp.data[0]);
            }
        }
        setManifestacoes(manifestacoesArray.reverse())
        console.log(manifestacoesArray[0].date)
        setLoading(false)
    }

    useEffect(() => { fetchManifestacoes() }, []);
    useEffect(() => { fetchSecretarias() }, []);

    return (
        <View style={styles.container}>
            <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            />
            {!loading ? <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, padding: 20 }}
                style={{ width: '100%' }}
            >
                {manifestacoes.length > 0 ? manifestacoes.map((manifestacao, idx) => {
                    return (
                        <CollapsibleList
                            key={idx}
                            numberOfVisibleItems={0}
                            buttonPosition={'top'}
                            wrapperStyle={styles.itemContainer}
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
                                        style={styles.title}
                                        selectable={true}
                                    >{manifestacao.meta_box.subject}</Text>
                                    <Text
                                        style={styles.title}
                                        selectable={true}
                                    >{pad(splitDate(manifestacao.date_gmt).day)}/{pad(splitDate(manifestacao.date_gmt).month)}/{splitDate(manifestacao.date_gmt).year} - {pad(splitDate(manifestacao.date_gmt).hour)}:{pad(splitDate(manifestacao.date_gmt).minute)}</Text>
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
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{ ...styles.text, fontWeight: 'bold' }}
                                >Autor: </Text>
                                <Text
                                    style={styles.text}
                                >{manifestacao.meta_box.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{ ...styles.text, fontWeight: 'bold' }}
                                >Assunto: </Text>
                                <Text
                                    style={styles.text}
                                >{manifestacao.meta_box.subject}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{ ...styles.text, fontWeight: 'bold' }}
                                >Protocolo: </Text>
                                <Text
                                    style={styles.text}
                                >{manifestacao.meta_box.protocolo}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{ ...styles.text, fontWeight: 'bold' }}
                                >Status: </Text>
                                <Text
                                    style={styles.text}
                                >{manifestacao.meta_box.status}</Text>
                            </View>

                            <Text
                                style={{ ...styles.text, fontWeight: 'bold' }}
                            >Secretaria: </Text>
                            <Text
                                style={styles.text}
                            >{secretarias.length > 0 ? secretarias.find((item) => item.id == manifestacao.meta_box.secretaria)?.title?.rendered : ''}</Text>
                            <Text
                                style={{ ...styles.text, fontWeight: 'bold' }}
                            >Minha mensagem: </Text>
                            <Text
                                style={styles.text}
                            >{manifestacao.meta_box.message}</Text>
                            {manifestacao.meta_box.anexo.length > 0 && <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={async () => {
                                    try {
                                        const { uri } = await download(manifestacao.meta_box.anexo[0].url).downloadAsync();
                                        console.log('Finished downloading to ', uri);
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }}
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    backgroundColor: colors.secondary,
                                    marginTop: 15,
                                    marginBottom: 10,
                                    padding: 10,
                                    borderRadius: 8,
                                    elevation: 4
                                }}
                            >
                                <FontAwesome name="paperclip" size={24} color={"#FFF"} />
                                <Text
                                    style={{ ...styles.text, fontWeight: "bold", textAlign: 'center', color: '#FFF', marginTop: 0, marginLeft: 10 }}
                                >Baixar Anexo {downloadProgress * 100}%</Text>
                            </TouchableOpacity>}



                            <Text
                                style={styles.title}
                            >Hitórico de Atendimentos</Text>
                            <Text
                                style={styles.title}
                            >Ouvidor: {ouvidor}</Text>
                            {manifestacao.meta_box.atendimentos.length > 0 ?
                                <>
                                    {manifestacao.meta_box.atendimentos.map((atendimento, idx) => {
                                        return <View key={idx}>
                                            {/* <View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} /> */}
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: colors.primary,
                                                marginTop: 20,
                                                borderRadius: 8
                                            }}>
                                                <FontAwesome name="calendar-o" size={20} color="#FFF"
                                                    style={{ marginRight: 10 }}
                                                />
                                                <Text
                                                    style={{ ...styles.text, fontWeight: 'bold', color: '#FFF', marginBottom: 10 }}
                                                >Data: </Text>
                                                <Text
                                                    style={{ ...styles.text, fontWeight: 'bold', color: '#FFF', marginBottom: 10 }}
                                                >{atendimento.atendimento_data}</Text>
                                            </View>
                                            <Text
                                                style={{ ...styles.text, fontWeight: 'bold' }}
                                            >Resposta: </Text>
                                            <Text
                                                style={styles.text}
                                            >{atendimento.atendimento_historico}</Text>
                                            <View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} />
                                        </View>
                                    }
                                    )}
                                </>
                                : <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: colors.primary,
                                    marginTop: 20,
                                    borderRadius: 8
                                }}>
                                    <MaterialCommunityIcons name="timer-sand" size={20} color="#FFF"
                                        style={{ marginRight: 10 }}
                                    />
                                    <Text
                                        style={{ ...styles.text, fontWeight: 'bold', color: '#FFF', marginBottom: 10 }}
                                    >Aguarde resposta do ouvidor.</Text>
                                </View>
                            }
                        </CollapsibleList>
                    )
                }) : <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                        <Feather name="alert-triangle" size={50} color="black" />
                        <Text
                            style={{ marginTop: 20 }}
                        >Você ainda não realizou nenhuma manifestação.</Text>
                    </View>}
            </ScrollView> : <ActivityIndicator style={{alignSelf:'center', flex:1}} size={40} />}
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