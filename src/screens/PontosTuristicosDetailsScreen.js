import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Dimensions, Alert, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import HTML from 'react-native-render-html';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';

export default function PontosTuristicosDetailsScreen(props) {
    const pontoTuristico = props.route.params?.pontoTuristico;
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
                        <Image
                            source={{ uri: pontoTuristico._embedded['wp:featuredmedia'][0].source_url }}
                            resizeMode={'cover'}
                            style={{
                                width: '100%',
                                height: 200,
                                marginRight: 10,
                            }}
                        />
                    </View>
                    <View
                        activeOpacity={0.8}
                        style={styles.itemContainer}
                    >
                        <Text
                            style={styles.title}
                        >{pontoTuristico.title.rendered}</Text>
                    </View>
                    <View
                        activeOpacity={0.8}
                        style={styles.itemContainer}
                    >
                        <HTML
                            tagsStyles={{
                                p: { fontFamily: 'Montserrat_400Regular' },
                            }}
                            //containerStyle={{fontFamily:'Montserrat_400Regular'}}
                            html={pontoTuristico.content.rendered} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    width: '100%',
                    height: 50,
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: colors.secondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
                onPress={async () => {
                    try {
                        const supported = await Linking.canOpenURL(pontoTuristico.meta_box["gr-ponto-turistico"].googlemaps);
                        if (supported) {
                            await Linking.openURL(pontoTuristico.meta_box["gr-ponto-turistico"].googlemaps);
                        } else {
                            Alert.alert("Erro ao abrir", "Tivemos um problema ao abrir o mapa.")
                        }
                    } catch (err) {
                        console.log(err.message)
                    }
                }}
            >
                <Entypo name="location" size={24} color={"#FFF"} />

            </TouchableOpacity>
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
    title: {
        //fontWeight: 'bold',
        fontFamily: 'Montserrat_400Regular',
        fontSize: 18,
        color: colors.primary
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