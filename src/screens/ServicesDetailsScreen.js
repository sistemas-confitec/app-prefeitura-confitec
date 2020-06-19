import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { parse } from 'himalaya';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';


export default function ServicesDetailsScreen({ route, navigation }) {
    const service = route.params?.service;
    const secData = route.params?.secData.find((sec) => sec.id == service.meta_box.secretaria);
    const infoArray = [];
    return (
        <View style={styles.container}>
            {/* <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            /> */}
            <View
                style={{
                    width: '100%',
                    height: 100,
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                    elevation: 4
                }}
            >
                <Image
                    source={{ uri: 'https:' + service.meta_box.icone }}
                    resizeMode={'contain'}
                    style={{
                        width: 40,
                        height: 40,
                        marginHorizontal: 10
                    }}
                />
                <Text
                    numberOfLines={4}
                    style={styles.header}
                >{service.meta_box.servico_nome}</Text>
            </View>
            <ScrollView
                style={{ width: '100%', padding: 10 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Text
                    style={styles.title}
                >Descrição</Text>
                <Text
                    style={styles.text}
                >{service.meta_box.descricao}</Text>

                <Text
                    style={styles.title}
                >Local</Text>

                <Text
                    style={{ ...styles.text, fontWeight: 'bold' }}
                >Setor responsável: </Text>
                <Text
                    style={styles.text}
                >{!service.meta_box.orgao_executor ? secData.title.rendered : service.meta_box.orgao_executor}</Text>
                <Text
                    style={{ ...styles.text, fontWeight: 'bold' }}
                >Público alvo: </Text>
                {service?.meta_box?.publico_alvo?.map((item, idx) => {
                    return <Text
                        style={styles.text}
                        key={idx}>{'\u2022'} {item}</Text>
                })}

                <Text
                    style={{ ...styles.text, fontWeight: 'bold' }}
                >O serviço é presencial ou pela Internet? </Text>
                <Text
                    style={styles.text}
                >{service.meta_box.tipo_atendimento}</Text>


                {service.meta_box.digital == 'SIM' ?
                    <>
                        <Text
                            style={{ ...styles.text, fontWeight: 'bold' }}
                        >Link do serviço:</Text>
                        <Text
                            style={styles.text}
                        >{service.meta_box.link_digital}</Text>
                    </> :
                    <>
                        <Text
                            style={{ ...styles.text, fontWeight: 'bold' }}
                        >Endereço do serviço:</Text>
                        <Text
                            style={styles.text}
                        >{service.meta_box.endereco_servico}</Text>
                    </>
                }

                <Text
                    style={styles.title}
                >Atendimento</Text>
                <Text
                    style={{ ...styles.text, fontWeight: 'bold' }}
                >Horário de atendimento:</Text>
                <Text
                    style={styles.text}
                >{service.meta_box.horario}</Text>
                <Text
                    style={{ ...styles.text, fontWeight: 'bold' }}
                >Tempo médio para atendimento:</Text>
                {service.meta_box.tipo_atendimento == "Presencial" ? <Text
                    style={styles.text}
                >{service.meta_box.atendimento_presencial}</Text> :
                    <Text
                        style={styles.text}
                    >{service.meta_box.atendimento_internet}</Text>}

                <Text
                    style={{ ...styles.text, fontWeight: 'bold' }}
                >O serviço é gratuito?</Text>
                <Text
                    style={styles.text}
                >{service.meta_box.gratuito}</Text>
                {service.meta_box.gratuito == "Não" &&
                    <><Text
                        style={{ ...styles.text, fontWeight: 'bold' }}
                    >Quanto custa?</Text>
                        <Text
                            style={styles.text}
                        >R$ {Number(service.meta_box.valor_servico.replace(',', '.')).toFixed(2).replace('.', ',')}</Text>
                    </>}

                <Text
                    style={styles.title}
                >Requisitos</Text>
                {service?.meta_box?.requisitos?.map((item, idx) => {
                    return <Text
                        style={styles.text}
                        key={idx}>{'\u2022'} {item}</Text>
                })}
                <Text
                    style={styles.title}
                >Etapas</Text>
                {service?.meta_box?.etapas?.map((item, idx) => {
                    return <Text
                        style={styles.text}
                        key={idx}>{'\u2022'} {item}</Text>
                })}

                <Text
                    style={styles.title}
                >Anexos</Text>

                {service?.meta_box?.anexo?.map((item, idx) => {
                    return <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('PDFViewer', { url: item.url });
                        }}
                        style={styles.attachment}
                        key={idx}>
                        <Text
                            style={{ color: '#FFF' }}
                        >{item.name}</Text>
                    </TouchableOpacity>
                })}
                <View
                    style={{ marginBottom: 30 }}
                ></View>

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
    },
    header: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 14,
        marginVertical: 5,
        color:colors.primary
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5,
        borderWidth: 1,
        backgroundColor: '#FAFAFA',
        borderColor: '#CCC',
        padding: 10
    },
    text: {
        fontSize: 16,
        textAlign: 'left',
        paddingHorizontal: 10
    },
    attachment: {
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
        elevation: 4,
        borderRadius: 5,
        marginVertical: 10
    },
});
