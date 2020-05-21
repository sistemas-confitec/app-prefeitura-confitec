import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import api from '../services/api';
import { FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';

import { colors } from '../config/Constants';


export default function TownHallScreen() {
    const [townHallData, setTownHallData] = useState(null);
    const [prefeito, setPrefeito] = useState('');
    const [vice, setVice] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchTownHallData = async () => {
        setLoading(true);
        const resp = await api.get('/wp-json/wp/v2/app-prefeitura');
        setTownHallData(resp.data[0]);
        const resp2 = await api.get('/wp-json/wp/v2/app-prefeito-e-vice');

        if (resp2.data) {
            resp2.data.forEach(element => {
                if (element.id == resp.data[0].meta_box.id_prefeito) {

                    return setPrefeito(element.title.rendered)
                }
                if (element.id == resp.data[0].meta_box.id_vice) {

                    return setVice(element.title.rendered)
                }
            });
        }
        setLoading(false);

    }
    useEffect(() => { fetchTownHallData() }, []);
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
                    {/* <View
                    style={styles.itemContainer}
                >
                    <FontAwesome5 name="building" size={40} color={colors.primary} />
                    <Text
                        style={styles.title}
                    >{townHallData?.title.rendered}</Text>
                </View> */}
                    <Image
                        source={require('../../assets/brasao-app-confitec.png')}
                        resizeMode={'contain'}
                        style={{
                            width: '60%',
                            aspectRatio: 2628 / 882,
                            height: undefined,
                            marginVertical: 20,
                            alignSelf: 'center'
                        }}
                    />
                    <View
                        style={styles.itemContainer}
                    >
                        <FontAwesome5 name="user-tie" size={40} color={colors.primary} />
                        <Text
                            style={styles.text}
                            selectable={true}
                        >Prefeito: {prefeito}</Text>
                        <Text
                            style={styles.text}
                            selectable={true}
                        >Vice Prefeito: {vice}</Text>
                    </View>

                    <View
                        style={styles.itemContainer}
                    >
                        <Feather name="map-pin" size={40} color={colors.primary} />
                        <Text
                            selectable={true}
                            style={styles.text}
                        >{townHallData?.meta_box.endereco}</Text>
                        <Text
                            selectable={true}
                            style={styles.text}
                        >CNPJ: {townHallData?.meta_box.cnpj}</Text>
                        <Text
                            selectable={true}
                            style={styles.text}
                        >{townHallData?.meta_box.horario}</Text>
                    </View>

                    <View
                        style={styles.itemContainer}
                    >
                        <AntDesign name="contacts" size={40} color={colors.primary} />
                        <Text
                            selectable={true}
                            style={styles.text}
                        >{townHallData?.meta_box.email_prefeitura}</Text>
                        <Text
                            selectable={true}
                            style={styles.text}
                        >{townHallData?.meta_box.telefone}</Text>
                    </View>
                </ScrollView>}
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
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10
    },
    itemContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 5,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 30,
        backgroundColor: '#FFF',
        marginBottom: 10
    }
});
