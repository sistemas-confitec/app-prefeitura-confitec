import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, Linking } from 'react-native';
import api from '../services/api';
import HTML from 'react-native-render-html';
import { Entypo } from '@expo/vector-icons';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import globalStyles from './globalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function MainMenuScreen({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [cityInfo, setCityInfo] = useState('');
	const [cityName, setCityName] = useState('');
	const [cityLocation, setCityLocation] = useState(null);
	const infoArray = [];
	const municipio = async () => {
		setLoading(true);
		const resp = await api.get('/wp-json/wp/v2/app-municipio');
		setCityName(resp.data[0].title.rendered);
		setCityInfo(resp.data[0].meta_box['gr-municipio'].municipio_historia);
		setCityLocation(resp.data[0].meta_box['gr-municipio'].googlemaps);
		setLoading(false);
	}
	useEffect(() => { municipio() }, []);
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
						<View
							style={globalStyles.itemContainer}
						>
							<Text
								style={{ ...globalStyles.title, fontSize: 20 }}
							>{cityName}</Text>

							<TouchableOpacity
								onPress={() => {
									if(cityLocation){
										Linking.openURL(cityLocation)
									}
								}}
								style={{ ...globalStyles.button, marginTop: 15 }}
							>
								<Entypo name="location" size={24} color={colors.primary} />
							</TouchableOpacity>

							{!!cityInfo && <HTML
								tagsStyles={{
									p: { fontFamily: 'Montserrat_400Regular', textAlign: 'justify', marginBottom: 10 },
									b: { fontFamily: 'Montserrat_600SemiBold_Italic' },
								}}
								html={cityInfo}
								imagesMaxWidth={Dimensions.get('window').width} />}
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
