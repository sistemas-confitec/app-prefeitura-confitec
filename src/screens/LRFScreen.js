import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Text } from 'react-native';

import api from '../services/api';
import LRFTypeButton from '../components/LRFTypeButton';
import { colors, strings } from '../config/Constants';


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
                            title={"CMED"}
                            subtitle={"Cronograma Mensal da Execução de Desembolso"}
                        />
                        <LRFTypeButton
                            title={"RGF"}
                            subtitle={"Relatório de Gestão Fiscal"}
                        />
                        <LRFTypeButton
                            title={"PCPE"}
                            subtitle={"Procedimentos Contábeis Patrimoniais e Específicos"}
                        />
                        <LRFTypeButton
                            title={"RREO"}
                            subtitle={"Relatório Resumido da Execução Orçamentária"}
                        />
                        <LRFTypeButton
                            title={"LOA"}
                            subtitle={"Lei Oramentária Anual"}
                        />
                        <LRFTypeButton
                            title={"LDO"}
                            subtitle={"Lei de Diretrizes Orçamentárias"}
                        />
                        <LRFTypeButton
                            title={"PPA"}
                            subtitle={"Plano Plurianual"}
                        />
                        <LRFTypeButton
                            title={"PCG"}
                            subtitle={"Prestação de Contas de Governo"}
                        />
                        <LRFTypeButton
                            title={"PCS"}
                            subtitle={"Prestação de Contas de Gestão"}
                        />
                        <LRFTypeButton
                            title={"PRGFIN"}
                            subtitle={"Programação Financeira"}
                             />
                    </View>
                </View>
                {/* {LRFsData.map((LRF) => {
                    return LRF.meta_box.relatorio=== 'CMED - CRONOGRAMA DA EXECUÇÃO MENSAL DE DESEMBOLSO'?<View
                        key={LRF.id}
                    >
                    <Text>{LRF.meta_box.relatorio}</Text>
                    </View>:<></>
                })} */}
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
