import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, Picker, View, TextInput, Alert, Keyboard, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

import { colors, esicURL } from '../config/Constants';

export default function ManifestacoesScreen(props) {
    const [protocolo, setProtocolo] = useState('');
    const [manifestacoes, setManifestacoes] = useState([]);

    async function fetchManifestacoes() {
        const protocolsArray = await AsyncStorage.getItem('protocols');
        const protocols = JSON.parse(protocolsArray);
        const manifestacoesArray = [];

        for (let i = 0; i < protocols.length; i++) {

            const resp = await axios.get(`${esicURL}/wp-json/wp/v2/app-feedback?slug=protocolo-${protocols[i]}`);
            if (resp.data) {
                manifestacoesArray.push(resp.data[0]);
            }
        }
        setManifestacoes(manifestacoesArray)
        console.log(manifestacoesArray[0].title.rendered)
    }

    useEffect(() => { fetchManifestacoes() }, []);

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
                {manifestacoes.map((manifestacao) => {
                    return (<View
                        key={manifestacao.id}
                        style={{ width: '100%', marginVertical: 10, backgroundColor: '#DDD', padding: 5 }}
                    >
                        <Text>{manifestacao.title.rendered}</Text>
                    </View>)
                })}
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