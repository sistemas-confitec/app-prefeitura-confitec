import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import CollapsibleList from "react-native-collapsible-list";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

import api from '../services/api';
import LRFTypeButton from '../components/LRFTypeButton';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';

export default function LRFDetailsScreen({ route, navigation }) {
    const LRFsData = route.params?.LRFsData;
    const relatorio = route.params?.relatorio;
    const [collapsed, setCollapsed] = useState([]);

    return (
        <View style={styles.container}>
            <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, padding: 10 }}
                style={{ width: '100%' }}
            >
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
                        {LRFsData.map((LRF, idx) => {
                            if (LRF.meta_box.relatorio.split('-')[0].trim() === relatorio) {
                                return <CollapsibleList
                                    key={idx}
                                    numberOfVisibleItems={0}
                                    buttonPosition={'top'}
                                    wrapperStyle={styles.itemContainer}
                                    onToggle={(collap) => {
                                        if (collap) {
                                            setCollapsed([...collapsed, idx]);
                                        } else {
                                            setCollapsed(collapsed.filter((c) => c !== idx));
                                        }
                                    }}
                                    buttonContent={
                                        <View>
                                            <Text
                                                style={styles.title}
                                                selectable={true}
                                            >{LRF.meta_box.relatorio} - {LRF.meta_box.ano}</Text>
                                            <View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} />
                                            {!collapsed.includes(idx) ? <Entypo
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
                                    {LRF.meta_box.bimestre.map((competencia, idx) => {
                                        return (<View
                                            key={idx}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text
                                                    style={{ ...styles.text, fontWeight: 'bold' }}
                                                >Competência: </Text>
                                                <Text
                                                    style={styles.text}
                                                >{competencia.number_bimestre}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text
                                                    style={{ ...styles.text, fontWeight: 'bold' }}
                                                >Publicado: </Text>
                                                <Text
                                                    style={styles.text}
                                                >{competencia.publicacao}</Text>
                                            </View>
                                            {!!LRF._links['wp:attachment'][0].href && <TouchableOpacity
                                                activeOpacity={0.85}
                                                onPress={async () => {
                                                    const resp = await axios.get(`${LRF._links['wp:attachment'][0].href}`);
                                                    if (resp.data) {
                                                        const pdfFile = resp.data.find(item => item.id === competencia.pdf[0]);
                                                        if (pdfFile) {
                                                            console.log(pdfFile.guid.rendered)
                                                            return navigation.navigate('PDFViewer', { url: pdfFile.guid.rendered });
                                                        }
                                                    }
                                                    Alert.alert('Erro ao abrir arquivo')
                                                }}
                                                style={{
                                                    flexDirection: 'row',
                                                    width: '100%',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    backgroundColor: colors.secondary,
                                                    marginTop: 15,
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    borderRadius: 8,
                                                    elevation: 4
                                                }}
                                            >
                                                <FontAwesome5 name="file-pdf" size={24} color={"#FFF"} />
                                                <Text
                                                    style={{ ...styles.text, fontWeight: "bold", textAlign: 'center', color: '#FFF', marginTop: 0, marginLeft: 10 }}
                                                >Baixar</Text>
                                            </TouchableOpacity>}
                                            <View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} />
                                            {/* <Text>Link: {LRF._links['wp:attachment'][0].href}</Text> */}
                                        </View>)
                                    })}


                                </CollapsibleList>
                            }
                        })}
                    </View>
                </View>
            </ScrollView>
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
    },
    menuContainer: {
        width: '100%',
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        color: colors.primary
    },
    text: {
        fontSize: 16,
        textAlign: 'left',
        marginTop: 10,
    },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 8,
        padding: 30,
        backgroundColor: '#FFF',
        marginBottom: 10
    }
});
