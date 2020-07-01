import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Alert, Keyboard, ImageBackground, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'react-native-paper';

import { colors, strings, baseURL } from '../config/Constants';
import CloseSubheader from '../components/CloseSubheader';
import Header from '../components/Header';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import globalStyles from './globalStyles';
import acoesActions from '../store/ducks/acoesDuck';
import { getAcaoIcon } from '../util/Functions';

export default function AcoesScreen(props) {
	const acoes = useSelector(state => state.acoes.data);
	const votos = useSelector(state => state.acoes.votos);
	const loading = useSelector(state => state.acoes.loading);
	const location = props.route.params?.location;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(acoesActions.fetchAcoes());
		dispatch(acoesActions.getVotos());
	}, []);

	return (
		<View style={globalStyles.container}>
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
							props.navigation.goBack();
						}}
					/>
					{!loading ? <ScrollView
						style={{ width: '100%' }}
						contentContainerStyle={{
							justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1,
							paddingHorizontal: 15
						}}
						showsVerticalScrollIndicator={false}
					>
						<View style={{ width: '100%', paddingTop: 10 }}>

							{acoes.map((acao) => <TouchableOpacity
								activeOpacity={0.8}
								key={acao.id}
								onPress={() => {
									props.navigation.navigate('AcoesDetailsScreen', { acao, location })
								}}
								style={{ ...globalStyles.itemContainer, padding: 5 }}
							>
								<View
									style={{ width: '100%', flexDirection: 'row' }}
								>
									<View
										style={{ width: 150 }}
									>
										<Image
											source={{ uri: acao.meta_box.imagem[0]?.sizes.medium.url }}
											resizeMode={'cover'}
											style={{
												height: 150,
												marginRight: 10,
												justifyContent: 'flex-end'
											}}
										/>
									</View>
									<View
										style={{ flex: 1 }}
									>
										<Text
											numberOfLines={2}
											style={{ ...globalStyles.title, textAlign: 'left' }}
										>{acao.title.rendered}</Text>
										<Text
											style={{ ...globalStyles.text, textAlign: 'left', flex: 1 }}
											numberOfLines={3}
										>{acao.meta_box["descricao"]}</Text>
										<Text
											style={{ ...globalStyles.title, textAlign: 'left' }}
										>{acao.meta_box["data-acao"]}</Text>
									</View>
								</View>
								{votos[acao.id] &&
									<>
										<Divider style={{ marginVertical: 10 }} />
										<View
											style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
										>
											<Text
												style={{ ...globalStyles.text, color: colors.secondary, marginRight: 5 }}
											>Minha avaliação:</Text>
											{getAcaoIcon(acao.meta_box["tipo-pergunta-acoes"], votos[acao.id])}
										</View>
									</>}
							</TouchableOpacity>)}
						</View>
					</ScrollView> : <CustomActivityIndicator />}
				</View>
			</ImageBackground>
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
		//paddingHorizontal: 15
	},
	input: {
		width: '100%',
		height: 40,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderTopWidth: 1,
		borderColor: '#DDD',
		fontSize: 14,
		backgroundColor: '#FFF',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	textForm: {
		color: '#666',
		alignSelf: 'flex-start',
		fontSize: 14,
		marginTop: 5,
		marginBottom: 0,
		fontWeight: 'bold'
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