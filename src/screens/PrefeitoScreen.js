import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import api from '../services/api';
import { FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import CollapsibleList from "react-native-collapsible-list";
import { Entypo } from '@expo/vector-icons';

import { colors } from '../config/Constants';


export default function PrefeitoScreen() {
    const [prefeitoData, setPrefeitoData] = useState(null);
    const [vicePrefeitoData, setVicePrefeitoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prefeitoCollapsed, setPrefeitoCollapsed] = useState(false);
    const [vicePrefeitoCollapsed, setVicePrefeitoCollapsed] = useState(false);

    const formatDate = (date) => {
        const dateArray = date.split('-');

        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
    }

    const fetchPrefeitoData = async () => {
        setLoading(true);
        const resp = await api.get('/wp-json/wp/v2/app-prefeito-e-vice');
        if (resp.data) {
            resp.data.forEach(element => {
                if ((element.meta_box['sexo-prefeito'] === "Prefeito" || element.meta_box['sexo-prefeito'] === "Prefeita") && !element.meta_box['fim-mandato-prefeito']) {

                    return setPrefeitoData(element);
                }
                if ((element.meta_box['sexo-prefeito'] === "Vice Prefeito" || element.meta_box['sexo-prefeito'] === "Vice Prefeita") && !element.meta_box['fim-mandato-prefeito']) {

                    return setVicePrefeitoData(element);
                }
            });
        }
        setLoading(false);
    }
    useEffect(() => { fetchPrefeitoData() }, []);
    return (
        <View style={styles.container}>
            {loading ?
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ActivityIndicator size={40} color={colors.primary} />
                </View>
                :
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                >
                    {prefeitoData && <CollapsibleList
                        numberOfVisibleItems={0}
                        buttonPosition={'top'}
                        wrapperStyle={styles.itemContainer}
                        onToggle={(collap) => {
                            setPrefeitoCollapsed(collap);
                        }}
                        buttonContent={
                            <View>
                                <View
                                    style={{
                                        width: Dimensions.get('window').width - 20 - 40,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ImageBackground
                                        source={{ uri: prefeitoData.meta_box['foto-prefeito'].sizes.medium.url }}
                                        resizeMode={'stretch'}
                                        style={{
                                            height: 150,
                                            width: undefined,
                                            aspectRatio: 3 / 4,
                                            marginRight: 10,
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                    </ImageBackground>

                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Text
                                            style={{ ...styles.title, fontWeight: 'normal', fontSize: 16 }}
                                            selectable={true}
                                        >{prefeitoData.meta_box['sexo-prefeito']}:</Text>
                                        <Text
                                            style={styles.title}
                                            selectable={true}
                                        >{prefeitoData.title.rendered}</Text>

                                        <View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5' }} />

                                        <Text
                                            style={styles.text}
                                            selectable={true}
                                        >Nascimento:</Text>
                                        <Text
                                            style={{ ...styles.text, fontWeight: 'bold' }}
                                            selectable={true}
                                        >{formatDate(prefeitoData.meta_box.nascimento)}</Text>
                                        <Text
                                            selectable={true}
                                            style={styles.text}
                                        >Período:</Text>
                                        <Text
                                            style={{ ...styles.text, fontWeight: 'bold' }}
                                            selectable={true}
                                        >{formatDate(prefeitoData.meta_box['inicio-mandato-prefeito'])} até a atualidade</Text>
                                    </View>
                                </View>

                                <View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 20 }} />
                                {!prefeitoCollapsed ? <Entypo
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
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    textAlign: 'center',
                                    marginTop: 20,
                                    fontWeight: 'bold'
                                }}
                            >Biografia</Text>
                            <HTML html={prefeitoData.meta_box['biografia-prefeito']} imagesMaxWidth={Dimensions.get('window').width} />
                        </View>

                    </CollapsibleList>}

                    {vicePrefeitoData && <CollapsibleList
                        numberOfVisibleItems={0}
                        buttonPosition={'top'}
                        wrapperStyle={styles.itemContainer}
                        onToggle={(collap) => {
                            setVicePrefeitoCollapsed(collap);
                        }}
                        buttonContent={
                            <View>
                                <View
                                    style={{
                                        width: Dimensions.get('window').width - 20 - 40,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ImageBackground
                                        source={{ uri: vicePrefeitoData.meta_box['foto-prefeito'].sizes.medium.url }}
                                        resizeMode={'stretch'}
                                        style={{
                                            height: 150,
                                            width: undefined,
                                            aspectRatio: 3 / 4,
                                            marginRight: 10,
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                    </ImageBackground>

                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Text
                                            style={{ ...styles.title, fontWeight: 'normal', fontSize: 16 }}
                                            selectable={true}
                                        >{vicePrefeitoData.meta_box['sexo-prefeito']}:</Text>
                                        <Text
                                            style={styles.title}
                                            selectable={true}
                                        >{vicePrefeitoData.title.rendered}</Text>

                                        <View style={{ width: '100%', height: 2, backgroundColor: '#F5F5F5' }} />

                                        <Text
                                            style={styles.text}
                                            selectable={true}
                                        >Nascimento:</Text>
                                        <Text
                                            style={{ ...styles.text, fontWeight: 'bold' }}
                                            selectable={true}
                                        >{formatDate(vicePrefeitoData.meta_box.nascimento)}</Text>
                                        <Text
                                            selectable={true}
                                            style={styles.text}
                                        >Período:</Text>
                                        <Text
                                            style={{ ...styles.text, fontWeight: 'bold' }}
                                            selectable={true}
                                        >{formatDate(vicePrefeitoData.meta_box['inicio-mandato-prefeito'])} até a atualidade</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 20 }} />
                                {!vicePrefeitoCollapsed ? <Entypo
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
                        <Text
                            style={{
                                flex: 1,
                                fontSize: 16,
                                textAlign: 'left',
                                marginTop: 20
                            }}
                        >Biografia</Text>
                        <HTML html={vicePrefeitoData.meta_box['biografia-prefeito']} imagesMaxWidth={Dimensions.get('window').width} />

                    </CollapsibleList>}

                </ScrollView >}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroudColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: "bold",
        width: '100%',
    },
    text: {
        flex: 1,
        fontSize: 16,
        textAlign: 'left',
    },
    itemContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        borderBottomWidth: 5,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 20,
        backgroundColor: '#FFF',
        marginBottom: 10
    }
});
