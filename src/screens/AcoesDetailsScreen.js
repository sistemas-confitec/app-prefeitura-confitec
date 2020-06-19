import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, AsyncStorage, Alert, BackHandler } from 'react-native';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Modal, Portal, ToggleButton } from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import { colors, strings, idContactForm7Acoes } from '../config/Constants';
import Header from '../components/Header';
import api from '../services/api';
import Done from '../animations/Done';

export default function AcoesDetailsScreen(props) {
    const [animationDone, setAnimationDone] = useState(false);
    const [visible, setVisible] = useState(false);
    const [response, setResponse] = useState(null);
    const [votos, setVotos] = useState(null);
    const acao = props.route.params?.acao;
    const location = props.route.params?.location;

    useEffect(() => {
        (async () => {
            const vot = await AsyncStorage.getItem('votos');
            props.navigation.setParams({ setVisible, votos: JSON.parse(vot) })
            setVotos(JSON.parse(vot));
        })();
    }, [])

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if ((!votos || !votos[acao.id]) && !!acao.meta_box.pergunta) {
                    setVisible(true);
                } else {
                    props.navigation.goBack();
                }
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [votos, setVisible])
    );

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
                    <TouchableOpacity
                        onPress={() => {
                            setAnimationDone(true);
                        }}
                    >
                        <Text>Funciona desgraça</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Portal>
                <Modal
                    visible={visible}
                    contentContainerStyle={{ position: 'absolute', bottom: 0, width: '100%' }}
                    onDismiss={() => {
                        //Alert.alert("Atenção", "Por favor, avalie.", [{ text: "Ok", onPress: () => { setVisible(true) } }])
                        setVisible(false)
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            backgroundColor: '#FFF',
                            marginBottom: -1,
                            alignItems: 'center'
                        }}>
                        <View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5', marginVertical: 20 }} />
                        <MaterialCommunityIcons
                            name="frequently-asked-questions"
                            size={60}
                            color={colors.secondary} />
                        <Text
                            style={{
                                fontSize: 22,
                                color: colors.secondary,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >{acao.meta_box.pergunta}</Text>
                        {acao.meta_box["tipo-pergunta-acoes"] === "Tipo - Ótimo Bom Regular Ruim" &&
                            <ToggleButton.Group
                                onValueChange={value => { setResponse(value) }}
                                value={response}
                            >
                                <ScrollView
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 20
                                    }}
                                    contentContainerStyle={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    horizontal={true}
                                >
                                    <ToggleButton icon={() => <MaterialIcons name="sentiment-very-satisfied" size={30} color={colors.secondary} />}
                                        value="Ótimo" />
                                    <ToggleButton icon={() => <MaterialIcons name="sentiment-satisfied" size={30} color={colors.secondary} />}
                                        value="Bom" />
                                    <ToggleButton icon={() => <MaterialIcons name="sentiment-neutral" size={30} color={colors.secondary} />}
                                        value="Regular" />
                                    <ToggleButton icon={() => <MaterialIcons name="sentiment-very-dissatisfied" size={30} color={colors.secondary} />}
                                        value="Ruim" />
                                </ScrollView>
                            </ToggleButton.Group>}
                        {acao.meta_box["tipo-pergunta-acoes"] === "Tipo - Curti ou Não Curti" &&
                            <ToggleButton.Group
                                onValueChange={value => { setResponse(value) }}
                                value={response}
                            >
                                <ScrollView
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 20
                                    }}
                                    contentContainerStyle={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    horizontal={true}
                                >
                                    <ToggleButton icon={() => <AntDesign name="like2" size={24} color={colors.secondary} />}
                                        color={colors.secondary}
                                        value="Curti" />
                                    <ToggleButton icon={() => <AntDesign name="dislike2" size={24} color={colors.secondary} />}
                                        color={colors.secondary}
                                        value="Não Curti" />
                                </ScrollView>
                            </ToggleButton.Group>}
                        {acao.meta_box["tipo-pergunta-acoes"] === "Tipo - 1 a 5 estrelas" &&
                            <AirbnbRating
                                count={5}
                                showRating={false}
                                starStyle={{ marginTop: 20 }}
                                defaultRating={0}
                                size={30}
                                onFinishRating={(rating) => setResponse(rating > 1 ? rating + " estrelas" : rating + " estrela")}
                            />
                        }
                        {acao.meta_box["tipo-pergunta-acoes"] === "Tipo - Nota de 1 a 10" &&
                            <ToggleButton.Group
                                onValueChange={value => { setResponse(value) }}
                                value={response}
                            >
                                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                                    <ScrollView
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 20
                                        }}
                                        contentContainerStyle={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        horizontal={true}
                                    >
                                        <ToggleButton icon={() => <Text style={styles.number}>1</Text>}
                                            color={colors.secondary}
                                            value="1" />
                                        <ToggleButton icon={() => <Text style={styles.number}>2</Text>}
                                            color={colors.secondary}
                                            value="2" />
                                        <ToggleButton icon={() => <Text style={styles.number}>3</Text>}
                                            color={colors.secondary}
                                            value="3" />
                                        <ToggleButton icon={() => <Text style={styles.number}>4</Text>}
                                            color={colors.secondary}
                                            value="4" />
                                        <ToggleButton icon={() => <Text style={styles.number}>5</Text>}
                                            color={colors.secondary}
                                            value="5" />
                                    </ScrollView>
                                    <ScrollView
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 20
                                        }}
                                        contentContainerStyle={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        horizontal={true}
                                    >
                                        <ToggleButton icon={() => <Text style={styles.number}>6</Text>}
                                            color={colors.secondary}
                                            value="6" />
                                        <ToggleButton icon={() => <Text style={styles.number}>7</Text>}
                                            color={colors.secondary}
                                            value="7" />
                                        <ToggleButton icon={() => <Text style={styles.number}>8</Text>}
                                            color={colors.secondary}
                                            value="8" />
                                        <ToggleButton icon={() => <Text style={styles.number}>9</Text>}
                                            color={colors.secondary}
                                            value="9" />
                                        <ToggleButton icon={() => <Text style={styles.number}>10</Text>}
                                            color={colors.secondary}
                                            value="10" />
                                    </ScrollView>
                                </View>
                            </ToggleButton.Group>}

                        <View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5', marginVertical: 20 }} />
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={async () => {
                                if (!response) {
                                    Alert.alert("Responda a pergunta", "Por favor, avalie a ação antes de enviar.")
                                } else {
                                    setVisible(false);
                                    setAnimationDone(true);
                                    const data = new FormData;
                                    data.append('identificador', 'respostas-acoes');
                                    data.append('email', 'email@email.com');
                                    data.append('acao_promovida', acao.id);
                                    data.append('secretaria', acao.meta_box.secretaria);
                                    data.append('pergunta', acao.meta_box.pergunta);
                                    data.append('resposta', response);
                                    data.append('lat', !location ? 'indisponível' : location.coords.latitude);
                                    data.append('long', !location ? 'indisponível' : location.coords.longitude);
                                    const resp = await api.post(`/wp-json/contact-form-7/v1/contact-forms/${idContactForm7Acoes}/feedback`, data);
                                    const newVotos = !votos ? {} : votos;
                                    newVotos[acao.id] = response;
                                    setVotos(newVotos);
                                    await AsyncStorage.setItem('votos', JSON.stringify(newVotos));
                                }
                            }}
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.secondary,
                                height: 50
                            }}
                        >
                            <Text
                                style={{ ...styles.text, fontWeight: "bold", textAlign: 'center', color: '#FFF' }}
                            >ENVIAR</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
            {votos && votos[acao.id] && <View
                style={{
                    width: '100%',
                    height: 60,
                    position: 'absolute',
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.primary,
                    elevation: 8
                }}
            >
                <Text
                    style={{
                        color: '#FFF',
                        fontSize: 18
                    }}
                >Minha avaliação: {votos[acao.id]}</Text>
            </View>}
            {animationDone && <Done setAnimation={setAnimationDone} />}
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
    },
    number: {
        width: 30,
        height: 30,
        borderWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 4,
        color: colors.secondary,
        borderColor: colors.secondary
    }
});