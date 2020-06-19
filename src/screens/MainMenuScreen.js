import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, StatusBar, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';

import prefeituraActions from '../store/ducks/prefeituraDuck';
import secretariasActions from '../store/ducks/secretariasDuck';
import { colors, strings } from '../config/Constants';
import MenuItem from '../components/MenuItem';
import CustomActivityIndicator from '../components/CustomActivityIndicator';


export default function MainMenuScreen({ navigation }) {
    const prefeitura = useSelector(state => state.prefeitura.data);
    const sexoPrefeito = useSelector(state => state.prefeitura.sexoPrefeito);
    const loading = useSelector(state => state.prefeitura.loading);

    const dispatch = useDispatch();


    const [location, setLocation] = useState(null);

    useEffect(() => {
        dispatch(prefeituraActions.fetchPrefeitura())
        dispatch(secretariasActions.fetchSecretarias())
    }, []);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permissão requerida", "Precisamos de acesso à sua localização.")
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            //console.log(location)
        })();
    }, []);
    return (
        loading ? <CustomActivityIndicator /> : <View style={styles.container}>
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
                        iconName={sexoPrefeito === "Prefeita" ? "user-female" : "user-tie"}
                        iconSource={sexoPrefeito === "Prefeita" ? "SimpleLineIcons" : "FontAwesome5"}
                        title={sexoPrefeito} />
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
                        onPress={() => { navigation.navigate('PontosTuristicosScreen') }}
                        iconName={"map"}
                        iconSource={"Foundation"}
                        title={"Turismo"} />
                    <MenuItem
                        onPress={() => { navigation.navigate('NoticiasScreen') }}
                        iconName={"newspaper-o"}
                        iconSource={"FontAwesome"}
                        title={"Notícias"} />
                </View>
                <View style={styles.menuContainer}>
                    <MenuItem
                        onPress={() => { navigation.navigate('AcoesScreen', { location }) }}
                        iconName={"worker"}
                        iconSource={"MaterialCommunityIcons"}
                        title={"Ações Gov"} />
                    <MenuItem
                        onPress={() => { navigation.navigate('LRFScreen') }}
                        iconName={"hammer"}
                        iconSource={"FontAwesome5"}
                        title={"LRF"} />
                    <MenuItem
                        onPress={() => { navigation.navigate('DiarioOficialScreen') }}
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
                        onPress={() => { navigation.navigate('EsicScreen') }}
                        iconName={"ios-chatbubbles"}
                        iconSource={"Ionicons"}
                        title={"e-SIC"} />
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
                >{prefeitura && prefeitura?.title?.rendered}</Text>
                <Text
                    style={styles.footerText}
                >{prefeitura && prefeitura.meta_box?.endereco}</Text>
                <Text
                    style={styles.footerText}
                >{prefeitura && prefeitura.meta_box?.horario}</Text>
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
