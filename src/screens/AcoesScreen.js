import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Alert, Keyboard, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { MaterialIcons, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';

import { colors, strings, baseURL } from '../config/Constants';
import HeaderDivider from '../components/HeaderDivider';
import Header from '../components/Header';

export default function AcoesScreen(props) {
    const [acoes, setAcoes] = useState([]);

    async function fetchAcoes() {
        const resp = await axios.get(`${baseURL}/wp-json/wp/v2/app-acoes-gov`);
        if (resp.data) {
            setAcoes(resp.data);
        }
    }

    useEffect(() => { fetchAcoes() }, []);

    return (
        <View style={styles.container}>
            <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            />
            <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{
                    justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1,
                    paddingHorizontal: 15
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ width: '100%', paddingTop: 10 }}>

                    {acoes.map((acao) => <TouchableOpacity
                        activeOpacity={0.8}
                        key={acao.id}
                        onPress={()=>{
                            props.navigation.navigate('AcoesDetailsScreen', {acao})
                        }}
                        style={styles.itemContainer}
                    >
                        <View
                            style={{ width: 150 }}
                        >
                            <Image
                                source={{ uri: acao.meta_box.imagem[0]?.sizes.medium.url }}
                                resizeMode={'cover'}
                                style={{
                                    height: 150,
                                    marginRight: 10,
                                    justifyContent: 'flex-end'
                                }}
                            />
                        </View>
                        <View
                            style={{ flex: 1 }}
                        >
                            <Text
                                numberOfLines={3}
                                style={styles.title}
                            >{acao.title.rendered}</Text>
                            <Text
                                style={{ flex: 1 }}
                                numberOfLines={2}
                            >{acao.meta_box["descricao"]}</Text>
                            <Text
                                style={{ fontWeight: 'bold' }}
                            >{acao.meta_box["data-acao"]}</Text>
                        </View>
                    </TouchableOpacity>)}
                </View>
            </ScrollView>
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
    title: {
        fontWeight: 'bold',
        fontSize: 18,
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
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomWidth: 5,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#FFF',
        marginBottom: 10,
        elevation: 2
    }
});