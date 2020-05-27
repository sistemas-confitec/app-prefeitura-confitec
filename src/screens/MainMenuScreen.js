import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, StatusBar } from 'react-native';
import Constants from 'expo-constants';

import { colors, strings } from '../config/Constants';
import MenuItem from '../components/MenuItem';
import api from '../services/api';

export default function MainMenuScreen({ navigation }) {
    const [townHall, setTownHall] = useState(null);
    const [sexoPrefeito, setSexoPrefeito] = useState(null);
    const municipio = async () => {
        const resp1 = await api.get('/wp-json/wp/v2/app-prefeitura');
        setTownHall(resp1.data[0]);
        const resp = await api.get('/wp-json/wp/v2/app-prefeito-e-vice');
        if (resp.data) {
            resp.data.forEach(element => {
                if ((element.meta_box['sexo-prefeito'] === "Prefeito" || element.meta_box['sexo-prefeito'] === "Prefeita") && !element.meta_box['fim-mandato-prefeito']) {

                    return setSexoPrefeito(element.meta_box['sexo-prefeito']);
                }
            });
        }
    }
    useEffect(() => { municipio() }, []);
    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} translucent={true} backgroundColor={'rgba(0,0,0,0.2)'} />
            <Image
                source={require('../../assets/brasao-app-confitec.png')}
                resizeMode={'contain'}
                style={{
                    width: '60%',
                    aspectRatio: 2628 / 882,
                    height: undefined,
                    marginTop: Constants.statusBarHeight + 40,
                    marginBottom: 40,
                }}
            />
            <View
                style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: colors.dividerColor,
                    //elevation: 5
                }}
            >
            </View>

            <View
                style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: 12
                }}
            >
                <View style={styles.menuContainer}>
                    <MenuItem
                        onPress={() => { navigation.navigate('TownHallScreen') }}
                        title={"Prefeitura"}
                        iconSource={"FontAwesome5"}
                        iconName={"building"}
                        />
                    <MenuItem
                        onPress={() => { navigation.navigate('PrefeitoScreen') }}
                        iconName={sexoPrefeito ==="Prefeita" ?  "user-female": "user-tie" }
                        iconSource={sexoPrefeito ==="Prefeita" ? "SimpleLineIcons" : "FontAwesome5"}
                        title={sexoPrefeito ? sexoPrefeito : "Prefeito(a)"} />
                    <MenuItem
                        onPress={() => {
                            navigation.navigate('SecretaryScreen')
                        }}
                        iconName={"sitemap"}
                        iconSource={"FontAwesome"}
                        title={"Secretarias"} />
                </View>
                <View style={styles.menuContainer}>
                    <MenuItem
                        iconName={"map-marked-alt"}
                        iconSource={"FontAwesome5"}
                        title={"Município"}
                        onPress={() => {
                            navigation.navigate("CityScreen")
                        }}
                    />
                    <MenuItem
                        iconName={"map"}
                        iconSource={"Foundation"}
                        title={"Turismo"} />
                    <MenuItem
                        iconName={"newspaper-o"}
                        iconSource={"FontAwesome"}
                        title={"Notícias"} />
                </View>
                <View style={styles.menuContainer}>
                    <MenuItem
                        iconName={"graph-pie"}
                        iconSource={"Foundation"}
                        title={"Transparência"} />
                    <MenuItem
                        onPress={() => { navigation.navigate('LRFScreen') }}
                        iconName={"hammer"}
                        iconSource={"FontAwesome5"}
                        title={"LRF"} />
                    <MenuItem
                        iconName={"newsletter"}
                        iconSource={"Entypo"}
                        title={"Diário Oficial"} />
                </View>
                <View style={styles.menuContainer}>
                    <MenuItem
                        onPress={() => { navigation.navigate('ServicesScreen') }}
                        iconName={"email-newsletter"}
                        iconSource={"MaterialCommunityIcons"}
                        title={"Carta de Serviços"} />
                    <MenuItem
                        iconName={"ios-chatbubbles"}
                        iconSource={"Ionicons"}
                        title={"Ouvidoria"} />
                    <MenuItem
                        onPress={() => { navigation.navigate('PodcastScreen') }}
                        iconName={"ios-mic"}
                        iconSource={"Ionicons"}
                        title={`Podcast ${strings.townHallName}`} />
                </View>
            </View>
            <View
                style={{
                    width: '100%',
                    padding: 10
                }}
            >
                <Text
                    style={{ ...styles.footerText, fontWeight: 'bold' }}
                >{townHall && townHall?.title?.rendered}</Text>
                <Text
                    style={styles.footerText}
                >{townHall && townHall.meta_box?.endereco}</Text>
                <Text
                    style={styles.footerText}
                >{townHall && townHall.meta_box?.horario}</Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroudColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 0,

    },
    menuContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    footerText: {
        textAlign: 'center'
    }
});
