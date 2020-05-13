import React from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native';

import { colors, strings } from '../config/Constants';
import MenuItem from '../components/MenuItem';

export default function MainMenuScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/praca_hidro.png')}
                resizeMode={'cover'}
                style={{
                    width: '100%',
                    //aspectRatio: 640 / 426,
                    height: 150,
                }}
            >
                <StatusBar barStyle={"light-content"} translucent={true} backgroundColor={'rgba(0,0,0,0.2)'} />
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                }}>
                </View>
            </ImageBackground>
            <View
                style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: colors.dividerColor
                    //elevation: 5
                }}
            >
            </View>
            <View style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#FFF',
                position: "absolute",
                top: 90,
                elevation: 5
            }}>

            </View>
            <View
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
                        //color:'#1D5B2D'
                    }}
                >Prefeitura Municipal de </Text>
                <Text
                    style={{
                        color: colors.menuText,
                        fontSize: 40,
                        textAlign: 'center',
                        //color:'#1D5B2D'
                    }}
                >{strings.townHallName}</Text>
            </View>
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal:12
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
                        iconName={"email-newsletter"}
                        iconSource={"MaterialCommunityIcons"}
                        title={"Carta de Serviços"} />
                    <MenuItem
                        iconName={"ios-chatbubbles"}
                        iconSource={"Ionicons"}
                        title={"Ouvidoria"} />
                    <MenuItem
                        iconName={"ios-mic"}
                        iconSource={"Ionicons"}
                        title={"Rádio Prefeitura"} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 0,

    },
    menuContainer: {
        flexDirection: 'row',
        width: '100%',
    }
});
