import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import api from '../services/api';
import { parse } from 'himalaya';

import { colors, strings } from '../config/Constants';


export default function MainMenuScreen() {
    const [cityInfo, setCityInfo] = useState([]);
    const [cityName, setCityName] = useState('');
    const infoArray = [];
    const municipio = async () => {
        const resp = await api.get('/wp-json/wp/v2/app-municipio');
        setCityName(resp.data[0].title.rendered);
        setCityInfo(parse((resp.data[0].meta_box['gr-municipio'].municipio_historia)));
    }
    useEffect(() => { municipio() }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>{cityName}</Text>
                {cityInfo.map((city1, idx1) => {
                    if (city1.type === 'text') {
                        infoArray.push(<Text style={styles.text} key={'city1-' + idx1}>{city1.content.replace(/^\s+|\s+$/g, '')}</Text>)
                    }
                    if (!!city1.children && city1.children[0].type==='text') {
                        infoArray.push(<Text style={styles.title} key={'city1-' + idx1}>{city1.children[0].content.replace(/^\s+|\s+$/g, '')}</Text>)
                    }
                })}
                {
                    infoArray.map((item) => item)
                }
            </ScrollView>
        </View>
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
    menuContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    text: {
        textAlign: 'justify'
    },
    title: {
        fontWeight:'bold',
        fontSize:14,
        marginVertical:10
    }
});
