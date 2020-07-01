import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, Linking, TouchableOpacity } from 'react-native';
import api from '../services/api';
import HTML from 'react-native-render-html';
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import globalStyles from './globalStyles';
import municipioActions from '../store/ducks/municipioDuck';


export default function MainMenuScreen({ navigation }) {
	const municipio = useSelector(state => state.municipio.data);
	const loading = useSelector(state => state.municipio.loading);
	const error = useSelector(state => state.municipio.error);
	const dispatch = useDispatch();

	
	useEffect(() => { dispatch(municipioActions.fetchMunicipio()) }, []);
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
							navigation.goBack();
						}}
					/>
					{!loading ? <ScrollView
						showsVerticalScrollIndicator={false}
						style={{ flex: 1, padding: 10 }}
					>
						{!error && <View
							style={globalStyles.itemContainer}
						>
							<Text
								style={{ ...globalStyles.title, fontSize: 20 }}
							>{municipio?.title?.rendered}</Text>

							<TouchableOpacity
								onPress={() => {
									if(municipio?.meta_box['gr-municipio'].googlemaps){
										Linking.openURL(municipio?.meta_box['gr-municipio'].googlemaps)
									}
								}}
								style={{ ...globalStyles.button, marginTop: 15 }}
							>
								<Entypo name="location" size={24} color={globalStyles.buttonText.color} />
							</TouchableOpacity>

							{!!municipio?.meta_box['gr-municipio'].municipio_historia && <HTML
								tagsStyles={{
									p: { fontFamily: 'Montserrat_400Regular', textAlign: 'justify', marginBottom: 10 },
									b: { fontFamily: 'Montserrat_600SemiBold_Italic' },
								}}
								html={municipio?.meta_box['gr-municipio'].municipio_historia}
								imagesMaxWidth={Dimensions.get('window').width} />}
						</View>}
					</ScrollView> : <CustomActivityIndicator />}
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroudColor,
		alignItems: 'center',
		justifyContent: 'flex-start',
		//padding: 10,
	},
	menuContainer: {
		flexDirection: 'row',
		width: '100%',
	},
	text: {
		textAlign: 'justify'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 14,
		marginVertical: 10
	},
	cityName: {
		fontWeight: 'bold',
		fontSize: 16,
		marginVertical: 10,
		textAlign: 'center'
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
		marginBottom: 20
	}
});
