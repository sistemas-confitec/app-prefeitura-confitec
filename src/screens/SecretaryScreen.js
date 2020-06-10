import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Linking, TouchableOpacity } from 'react-native';
import CollapsibleList from "react-native-collapsible-list";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

import api from '../services/api';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';


export default function SecretaryScreen({ navigation }) {
    const [secretaryData, setSecretaryData] = useState(null);
    const [loadingSecretaryData, setLoadingSecretaryData] = useState(false);
    const [townHallCollapsed, setTownHallCollapsed] = useState(false);
    const [collapsed, setCollapsed] = useState([]);
    const fetchSecretary = async () => {
        setLoadingSecretaryData(true);
        const resp = await api.get('/wp-json/wp/v2/app-estrutura-organizacional');
        setSecretaryData(resp.data);
        setLoadingSecretaryData(false);
    }
    useEffect(() => { fetchSecretary() }, []);
    return (
        <View style={styles.container}>
            <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={loadingSecretaryData} onRefresh={fetchSecretary} />}
                contentContainerStyle={{ flexGrow: 1, padding: 10 }}
                style={{ width: '100%' }}
            >
                {secretaryData && secretaryData.secretarias.map((sec, idx) => {
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
                                >{sec.secretaria}</Text>
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
                        {sec.gestor_atual && <Text
                            style={styles.text}
                            selectable={true}
                        ><Text
                            style={{ ...styles.text, fontWeight: "bold" }}
                            selectable={true}
                        >GESTOR:</Text> {sec.gestor_atual}</Text>}
                        {sec.ordenador_atual && <Text
                            style={styles.text}
                            selectable={true}
                        ><Text
                            style={{ ...styles.text, fontWeight: "bold" }}
                            selectable={true}
                        >ORDENADOR:</Text> {sec.ordenador_atual}</Text>}
                        {sec.horario && <Text
                            style={styles.text}
                            selectable={true}
                        ><Text
                            style={{ ...styles.text, fontWeight: "bold" }}
                            selectable={true}
                        >HORÁRIO:</Text> {sec.horario}</Text>}
                        {sec.cnpj && <Text
                            style={styles.text}
                            selectable={true}
                        ><Text
                            style={{ ...styles.text, fontWeight: "bold" }}
                            selectable={true}
                        >CNPJ:</Text> {sec.cnpj}</Text>}
                        {sec.endereco && <Text
                            style={styles.text}
                            selectable={true}
                        ><Text
                            style={{ ...styles.text, fontWeight: "bold" }}
                            selectable={true}
                        >ENDEREÇO:</Text> {sec.endereco}</Text>}

                        {sec.telefone && <Text
                            style={styles.text}
                            selectable={true}
                        ><Text
                            style={{ ...styles.text, fontWeight: "bold" }}
                            selectable={true}
                        >TELEFONE:</Text> {sec.telefone}</Text>}


                        {sec.email ? <Text
                            style={styles.text}
                            selectable={true}
                        >
                            <Text
                                style={{ ...styles.text, fontWeight: "bold" }}
                                selectable={true}
                            >EMAIL:
                                </Text> {sec.email}
                        </Text> : <></>}
                        {!!sec.whatsapp &&
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => { Linking.openURL(`whatsapp://send?phone=+55${sec.whatsapp}`) }}
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
                                <FontAwesome5 name="whatsapp" size={24} color={"#FFF"} />
                                <Text
                                    style={{ ...styles.text, fontWeight: "bold", textAlign: 'center', color: '#FFF', marginTop: 0, marginLeft: 10 }}
                                >Fale pelo WhatsApp</Text>
                            </TouchableOpacity>
                        }
                    </CollapsibleList>
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
