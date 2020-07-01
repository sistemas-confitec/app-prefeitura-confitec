import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Dimensions, Alert, Linking, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import HTML from 'react-native-render-html';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';

export default function PontosTuristicosDetailsScreen(props) {
	const pontoTuristico = props.route.params?.pontoTuristico;
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
							props.navigation.goBack();
						}}
					/>
					<ScrollView
						style={{ width: '100%' }}
						contentContainerStyle={{
							justifyContent: 'flex-start',
							alignItems: 'center',
							flexGrow: 1,
							paddingHorizontal: 15
						}}
						showsVerticalScrollIndicator={false}
					>
						<View style={{ width: '100%', paddingTop: 10 }}>
							<Image
								source={{ uri: pontoTuristico._embedded['wp:featuredmedia'][0].source_url }}
								resizeMode={'cover'}
								style={{
									width: '100%',
									height: 200,
									marginBottom: 10
								}}
							/>
							<View
								activeOpacity={0.8}
								style={globalStyles.itemContainer}
							>
								<Text
									style={{ ...globalStyles.title, textAlign: 'left', fontSize: 20, color: colors.primary }}
								>{pontoTuristico.title.rendered}</Text>
							</View>
							<View
								activeOpacity={0.8}
								style={globalStyles.itemContainer}
							>
								<HTML
									tagsStyles={{
										p: { fontFamily: 'Montserrat_400Regular' },
									}}
									//containerStyle={{fontFamily:'Montserrat_400Regular'}}
									html={pontoTuristico.content.rendered} imagesMaxWidth={Dimensions.get('window').width} />
							</View>
						</View>
					</ScrollView>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{
							...globalStyles.button,
							width: Dimensions.get('window').width - 20,
							margin: 10,
						}}
						onPress={async () => {
							try {
								const supported = await Linking.canOpenURL(pontoTuristico.meta_box["gr-ponto-turistico"].googlemaps);
								if (supported) {
									await Linking.openURL(pontoTuristico.meta_box["gr-ponto-turistico"].googlemaps);
								} else {
									Alert.alert("Erro ao abrir", "Tivemos um problema ao abrir o mapa.")
								}
							} catch (err) {
								console.log(err.message)
							}
						}}
					>
						<Entypo name="location" size={24} color={globalStyles.buttonText.color} />
					</TouchableOpacity>
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
	title: {
		//fontWeight: 'bold',
		fontFamily: 'Montserrat_400Regular',
		fontSize: 18,
		color: colors.primary
	},
	itemContainer: {
		width: '100%',
		alignItems: 'flex-start',
		justifyContent: 'center',
		borderBottomWidth: 5,
		borderColor: '#DDD',
		borderRadius: 8,
		padding: 10,
		backgroundColor: '#FFF',
		marginBottom: 10,
	}
});