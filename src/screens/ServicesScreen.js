import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';

import api from '../services/api';
import { colors } from '../config/Constants';
import ServiceItem from '../components/ServiceItem';


export default function ServicesScreen({navigation}) {
    const [servicesData, setServicesData] = useState([]);
    const [loadingServicesData, setLoadingServicesData] = useState(false);
    const [secData, setSecData] = useState([]);
    const fetchServices = async () => {
        setLoadingServicesData(true);
        const resp = await api.get('/wp-json/wp/v2/app-servico');
        const resp2 = await api.get('/wp-json/wp/v2/app-secretaria');
        setServicesData(resp.data);
        setSecData(resp2.data);
        setLoadingServicesData(false);
    }
    useEffect(() => { fetchServices() }, []);
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={loadingServicesData} onRefresh={fetchServices} />}
                contentContainerStyle={{ flexGrow: 1, padding: 10}}
                style={{width:'100%'}}
            >
                {servicesData.map((service) => {
                    return <ServiceItem
                        key={service.id}
                        onPress={()=>{
                            navigation.navigate("ServicesDetailsScreen",{ service, secData })
                        }}
                        iconURL={service.meta_box.icone}
                        title={service.meta_box.servico_nome}
                    />
                })}
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
});
