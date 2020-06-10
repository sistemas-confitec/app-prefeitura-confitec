import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Text } from 'react-native';

import api from '../services/api';
import LRFTypeButton from '../components/LRFTypeButton';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';

export default function LRFScreen({ navigation }) {
    const [LRFsData, setLRFsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchLRFs = async () => {
        setLoading(true);
        const resp = await api.get('/wp-json/wp/v2/app-lrf?per_page=100&page=1');
        setLRFsData(resp.data);
        setLoading(false);
    }
    useEffect(() => { fetchLRFs() }, []);
    return (
        <View style={styles.container}>
            <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchLRFs} />}
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
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'CMED',
                                    LRFsData
                                })
                            }}
                            title={"CMED"}
                            subtitle={"Cronograma Mensal da Execução de Desembolso"}
                        />
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'RGF',
                                    LRFsData
                                })
                            }}
                            title={"RGF"}
                            subtitle={"Relatório de Gestão Fiscal"}
                        />
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'PCPE',
                                    LRFsData
                                })
                            }}
                            title={"PCPE"}
                            subtitle={"Procedimentos Contábeis Patrimoniais e Específicos"}
                        />
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'RREO',
                                    LRFsData
                                })
                            }}
                            title={"RREO"}
                            subtitle={"Relatório Resumido da Execução Orçamentária"}
                        />
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'LOA',
                                    LRFsData
                                })
                            }}
                            title={"LOA"}
                            subtitle={"Lei Oramentária Anual"}
                        />
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'LDO',
                                    LRFsData
                                })
                            }}
                            title={"LDO"}
                            subtitle={"Lei de Diretrizes Orçamentárias"}
                        />
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'PPA',
                                    LRFsData
                                })
                            }}
                            title={"PPA"}
                            subtitle={"Plano Plurianual"}
                        />
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'PCG',
                                    LRFsData
                                })
                            }}
                            title={"PCG"}
                            subtitle={"Prestação de Contas de Governo"}
                        />
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'PCS',
                                    LRFsData
                                })
                            }}
                            title={"PCS"}
                            subtitle={"Prestação de Contas de Gestão"}
                        />
                        <LRFTypeButton
                            onPress={() => {
                                navigation.navigate('LRFDetailsScreen', {
                                    relatorio: 'PRGFIN',
                                    LRFsData
                                })
                            }}
                            title={"PRGFIN"}
                            subtitle={"Programação Financeira"}
                        />
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
