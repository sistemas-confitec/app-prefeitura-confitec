import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Image, Linking } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';


export default function ServicesDetailsScreen({ route, navigation }) {
	const service = route.params?.service;
	const secData = route.params?.secData.find((sec) => sec.id == service.meta_box.secretaria);
	const infoArray = [];
	return (
		<View style={styles.container}>
			<Header
				title={strings.townHallName}
				subtitle={strings.headerSubtitle}
				titleColor={colors.primary}
			/>
			<ImageBackground
				style={globalStyles.elevatedContent}
				source={require('../../assets/background_image.png')}
			>
				<View
					style={globalStyles.backgroundImageTransparency}
				>
					<CloseSubheader
						onPress={() => {
							navigation.goBack();
						}}
					/>
					<ScrollView
						style={{ width: '100%', padding: 10, paddingTop: 0 }}
						contentContainerStyle={{ flexGrow: 1 }}
					>

						<Text
							numberOfLines={4}
							style={{ ...globalStyles.title, color: colors.primary, marginBottom: 10 }}
						>{service.meta_box.servico_nome}</Text>

						<Text
							style={styles.title}
						>Descrição</Text>
						<Text
							style={styles.text}
						>{service.meta_box.descricao}</Text>

						<Text
							style={styles.title}
						>Categorias: </Text>
						{service?.meta_box?.categoria?.map((item, idx) => {
							return <Text
								style={styles.text}
								key={idx}>{'\u2022'} {item}</Text>
						})}

						<Text
							style={styles.title}
						>Local</Text>

						{(!!secData?.title?.rendered || !!service?.meta_box?.orgao_executor) &&
							<>
								<Text
									style={styles.textTitle}
								>Setor responsável: </Text>
								<Text
									style={styles.text}
								>{!service.meta_box.orgao_executor ? secData?.title?.rendered : service.meta_box.orgao_executor}</Text>
							</>}
						<Text
							style={styles.textTitle}
						>Público alvo: </Text>
						{service?.meta_box?.publico_alvo?.map((item, idx) => {
							return <Text
								style={styles.text}
								key={idx}>{'\u2022'} {item}</Text>
						})}

						<Text
							style={styles.textTitle}
						>O serviço é presencial ou pela Internet? </Text>
						<Text
							style={styles.text}
						>{service.meta_box.tipo_atendimento}</Text>


						{service.meta_box.digital == 'SIM' ?
							<>
								<Text
									style={styles.textTitle}
								>Acesse o serviço:</Text>
								<TouchableOpacity
									onPress={() => {
										Linking.openURL(service.meta_box.link_digital)
									}}
									style={{ ...globalStyles.button, marginVertical: 10, backgroundColor: colors.secondary }}
								>
									<Feather name="external-link" size={24} color="#FFF" />
								</TouchableOpacity>
							</> :
							<>
								<Text
									style={styles.textTitle}
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
							style={styles.textTitle}
						>Horário de atendimento:</Text>
						<Text
							style={styles.text}
						>{service.meta_box.horario}</Text>
						<Text
							style={styles.textTitle}
						>Tempo médio para atendimento:</Text>
						{service.meta_box.tipo_atendimento == "Presencial" ? <Text
							style={styles.text}
						>{service.meta_box.atendimento_presencial}</Text> :
							<Text
								style={styles.text}
							>{service.meta_box.atendimento_internet}</Text>}

						<Text
							style={styles.textTitle}
						>O serviço é gratuito?</Text>
						<Text
							style={styles.text}
						>{service.meta_box.gratuito}</Text>
						{service.meta_box.gratuito == "Não" &&
							<><Text
								style={styles.textTitle}
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
								key={idx}
								style={{ ...globalStyles.button, flexDirection: 'row', marginTop: 10 }}
							>
								<FontAwesome5 name="file-pdf" size={24} color={globalStyles.buttonText.color} />
								<Text
									style={{ ...globalStyles.buttonText, marginLeft: 10 }}
								>BAIXAR</Text>
							</TouchableOpacity>
						})}
						<View
							style={{ marginBottom: 30 }}
						></View>

					</ScrollView>
				</View>
			</ImageBackground>
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
		color: colors.primary
	},
	title: {
		...globalStyles.title,
		marginVertical: 5,
		borderWidth: 1,
		borderColor: colors.primary,
		padding: 10,
		color: colors.primary
	},
	text: {
		...globalStyles.text,
		textAlign: 'left',
		paddingHorizontal: 10
	},
	textTitle: {
		...globalStyles.title,
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
