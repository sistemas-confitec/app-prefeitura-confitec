import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, StatusBar } from 'react-native';
import Constants from 'expo-constants';

import { colors, strings } from '../config/Constants';
import MenuItem from '../components/MenuItem';
import api from '../services/api';

export default function MainMenuScreen({ navigation }) {
    const [townHall, setTownHall] = useState(null);
    const municipio = async () => {
        const resp = await api.get('/wp-json/wp/v2/app-prefeitura');
        setTownHall(resp.data[0]);
    }
    useEffect(() => { municipio() }, []);
    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} translucent={true} backgroundColor={'rgba(0,0,0,0.2)'} />
            {/* <ImageBackground
                source={require('../../assets/praca_hidro.png')}
                resizeMode={'cover'}
                style={{
                    width: '100%',
                    //aspectRatio: 640 / 426,
                    height: 150,
                }}
            >
                <View style={{
                    width: '100%',
                    height: '100%',
                    //backgroundColor: 'rgba(0,0,0,0.7)',
                    backgroundColor: '#FFF',
                }}>
                </View>
            </ImageBackground> */}
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


            {/* <View style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#FFF',
                position: "absolute",
                top: 90,
                elevation: 5
            }}> 
        </View>
            */}

            {/* <View
                style={{
                    marginTop: 70,
                }}
            >

                <Text
                    style={{
                        color: colors.menuText,
                        fontSize: 14,
                        marginBottom: -10,
                        textAlign: 'center',
                    }}
                >Prefeitura Municipal de </Text>
                <Text
                    style={{
                        color: colors.menuText,
                        fontSize: 40,
                        textAlign: 'center',
                    }}
                >{strings.townHallName}</Text>
            </View> */}
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
                        title={"Prefeitura"}
                        iconSource={"FontAwesome"}
                        iconName={"building-o"}
                    />
                    <MenuItem
                        iconName={"user-tie"}
                        iconSource={"FontAwesome5"}
                        title={"Prefeito"} />
                    <MenuItem
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
                        iconName={"hammer"}
                        iconSource={"FontAwesome5"}
                        title={"LRF"} />
                    <MenuItem
                        iconName={"newsletter"}
                        iconSource={"Entypo"}
                        title={"Publicações"} />
                </View>
                <View style={styles.menuContainer}>
                    <MenuItem
                        onPress={()=>{ navigation.navigate('ServicesScreen')  }}
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
