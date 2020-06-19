import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Linking, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import diarioOficialActions from '../store/ducks/diarioOficialDuck';


export default function DiarioOficialScreen(props) {
    const diariosOficiais = useSelector(state => state.diarioOficial.data);
    const total = useSelector(state => state.diarioOficial.total);
    const totalPages = useSelector(state => state.diarioOficial.totalPages);
    const currentPage = useSelector(state => state.diarioOficial.currentPage);
    const loading = useSelector(state => state.diarioOficial.loading);

    const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

    const dispatch = useDispatch();

    useEffect(() => { dispatch(diarioOficialActions.fetchDiarioOficial(1)) }, []);
    return (
        <View style={styles.container}>
            <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            />
            {!loading ? <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: '100%' }}
                contentContainerStyle={{
                    justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1,
                    paddingHorizontal: 15
                }}
            >
                <View style={{ width: '100%', paddingTop: 10 }}>
                    {diariosOficiais.map((diarioOficial) => <TouchableOpacity
                        activeOpacity={0.8}
                        key={diarioOficial.id}
                        onPress={() => {
                            //props.navigation.navigate('DiarioOficialDetailsScreen', { diarioOficial })
                        }}
                        style={styles.itemContainer}
                    >
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                padding: 5
                            }}
                        >
                            <Text
                                style={styles.title}
                            >{diarioOficial.title.rendered.replace('&#8211;', '-').replace('&#8211;', '-')}</Text>
                        </View>
                    </TouchableOpacity>)}
                    <View
                        style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}
                    >
                        {pages.map((page) => <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: page == currentPage ? '#DDD' : undefined,
                                borderWidth: 1,
                            }}
                            onPress={() => {
                                dispatch(diarioOficialActions.fetchDiarioOficial(page))
                            }}
                        >
                            <Text>{page}</Text>
                        </TouchableOpacity>)}
                    </View>
                    <Text>Número de páginas: {totalPages}</Text>
                    <Text>Número de diários: {total}</Text>
                </View>
            </ScrollView> : <CustomActivityIndicator />}
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
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.primary,
    },
    itemContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomWidth: 5,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#FFF',
        marginBottom: 10,
        elevation: 2
    }
});
