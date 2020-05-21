import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Text } from 'react-native';

import api from '../services/api';
import LRFTypeButton from '../components/LRFTypeButton';
import { colors, strings } from '../config/Constants';


export default function LRFDetailsScreen({ route }) {
    const LRFsData = route.params?.LRFsData;
    const relatorio = route.params?.relatorio;

    return (
        <View style={styles.container}>
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
                        {LRFsData.map((LRF) => {
                            <Text>{LRF.meta_box.ano}</Text>
                        })}
                        {LRFsData.map((LRF) => {
                            if (LRF.meta_box.relatorio.split('-')[0].trim() === relatorio) {
                                return <View
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#DDD',
                                        marginBottom: 10
                                    }}
                                    key={LRF.id}
                                >
                                    <Text>{LRF.meta_box.relatorio} - {LRF.meta_box.ano}</Text>
                                    <Text>Periodicidade - {LRF.meta_box.periodicidade}</Text>
                                    {LRF.meta_box.bimestre.map((competencia, idx) => {
                                        return(<View
                                            key={idx}
                                        >
                                            <Text>Competência: {competencia.number_bimestre}</Text>
                                            <Text>Publicado: {competencia.publicacao}</Text>
                                        </View>)
                                    })}
                                </View>
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
});
