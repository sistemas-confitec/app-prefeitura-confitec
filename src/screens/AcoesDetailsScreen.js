import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Portal, ToggleButton } from 'react-native-paper';

import { colors, strings, baseURL } from '../config/Constants';
import Header from '../components/Header';

export default function AcoesDetailsScreen(props) {
    const [visible, setVisible] = useState(false);
    const [like, setLike] = useState("like");
    const acao = props.route.params?.acao;

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
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexGrow: 1,
                    paddingHorizontal: 15
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ width: '100%', paddingTop: 10 }}>
                    <View
                        activeOpacity={0.8}
                        style={{ ...styles.itemContainer, borderBottomWidth: 0 }}
                    >
                        <ScrollView
                            style={{
                                flexDirection: 'row',
                                height: 200,
                                //width: '100%'
                            }}
                            horizontal={true}
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            {acao.meta_box.imagem.map((image, idx) => <Image
                                key={idx}
                                source={{ uri: image.sizes.medium.url }}
                                resizeMode={'cover'}
                                style={{
                                    height: 200,
                                    aspectRatio: image.sizes.medium.width / image.sizes.medium.height,
                                    //width:400,
                                    marginRight: 10,
                                }}
                            />)}
                        </ScrollView>
                        <Text
                            style={{ alignSelf: 'flex-end', marginTop: 10 }}
                        >{acao.meta_box["data-acao"]}</Text>
                    </View>
                    <View
                        activeOpacity={0.8}
                        style={styles.itemContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => { setVisible(true) }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                backgroundColor: colors.secondary,
                                marginBottom: 10,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 8,
                                elevation:4
                            }}
                        >
                            <MaterialCommunityIcons name="frequently-asked-questions" size={24} color={"#FFF"} />
                            <Text
                            style={{
                                color:'#FFF',
                                marginLeft:10
                            }}
                            >Dê sua opnião</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.title}
                        >{acao.title.rendered}</Text>
                    </View>
                    <View
                        activeOpacity={0.8}
                        style={styles.itemContainer}
                    >
                        <Text
                            style={{ flex: 1 }}
                        >{acao.meta_box["descricao"]}</Text>
                    </View>

                </View>
            </ScrollView>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={() => { setVisible(false) }}
                >
                    <View
                        style={{
                            width: '90%',
                            backgroundColor: '#FFF',
                            alignSelf: 'center',
                            borderRadius: 4,
                            padding: 20,
                            alignItems: 'center'
                        }}>
                        <MaterialCommunityIcons
                            name="frequently-asked-questions"
                            size={60}
                            color={colors.primary} />
                        <Text
                            style={{
                                fontSize: 22,
                                color: colors.primary,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >{acao.meta_box.pergunta}</Text>
                        {acao.meta_box["tipo-pergunta-acoes"] === "Tipo - Ótimo Bom Regular Ruim" && <ToggleButton.Group
                            onValueChange={value => { setLike(value) }}
                            value={like}
                        >
                            <View
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
                            >
                                <ToggleButton icon="heart" color={colors.secondary} value="like" />
                                <ToggleButton icon="heart-broken" color={colors.secondary} value="dislike" />
                            </View>
                        </ToggleButton.Group>}

                        <View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5', marginVertical:20 }} />
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => { }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                backgroundColor: colors.secondary,
                                marginBottom: 10,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 8,
                            }}
                        >
                            <Text
                                style={{ ...styles.text, fontWeight: "bold", textAlign: 'center', color: '#FFF', marginTop: 0 }}
                            >Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
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
        color: colors.primary
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
        marginBottom: 10,
    }
});