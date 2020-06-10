import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import api from '../services/api';
//import { parse } from 'himalaya';
import HTML from 'react-native-render-html';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';


export default function MainMenuScreen() {
    const [cityInfo, setCityInfo] = useState('');
    const [cityName, setCityName] = useState('');
    const infoArray = [];
    const municipio = async () => {
        const resp = await api.get('/wp-json/wp/v2/app-municipio');
        setCityName(resp.data[0].title.rendered);
        setCityInfo(resp.data[0].meta_box['gr-municipio'].municipio_historia);
    }
    useEffect(() => { municipio() }, []);
    return (
        <View style={styles.container}>
            <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, padding:10 }}
            >
                <Text
                    style={styles.cityName}
                >{cityName}</Text>

                {!!cityInfo && <HTML
                    //containerStyle={{alignItems:'center'}}
                    html={cityInfo} imagesMaxWidth={Dimensions.get('window').width} />}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroudColorContent,
        alignItems: 'center',
        justifyContent: 'flex-start',
        //padding: 10,
    },
    menuContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    text: {
        textAlign: 'justify'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginVertical: 10
    },
    cityName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center'
    }
});
