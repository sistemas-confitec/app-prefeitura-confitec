import React, { useCallback } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import { useSelector } from 'react-redux';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';

export default function NoticiasDetailsScreen(props) {
	const secretarias = useSelector(state => state.secretarias.data);
	const noticia = props.route.params?.noticia;

	const getSecretariaName = useCallback(
		(secId) =>
			secretarias.find(sec => sec.id === secId)?.title?.rendered,
		[secretarias]);

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
								source={{ uri: noticia._embedded['wp:featuredmedia'][0].source_url }}
								resizeMode={'cover'}
								style={{
									width: '100%',
									height: 200,
									marginBottom: 10,
								}}
							/>
							<View
								activeOpacity={0.8}
								style={globalStyles.itemContainer}
							>
								<Text
									style={{ ...globalStyles.title, textAlign: 'left', fontSize: 20, color: colors.primary }}
								>{noticia.title.rendered}</Text>
							</View>
							<View
								activeOpacity={0.8}
								style={globalStyles.itemContainer}
							>
								{noticia.meta_box.id_secretaria.map((secId) => <Text
									key={secId}
									style={{ ...globalStyles.title, textAlign: 'left', fontSize: 14 }}
								>
									{getSecretariaName(secId)}
								</Text>)}
							</View>
							<View
								activeOpacity={0.8}
								style={globalStyles.itemContainer}
							>
								<HTML
									tagsStyles={{
										p: { fontFamily: 'Montserrat_400Regular', textAlign:'justify' },
									}}
									//containerStyle={{fontFamily:'Montserrat_400Regular'}}
									html={noticia.content.rendered} imagesMaxWidth={Dimensions.get('window').width} />
							</View>
						</View>
					</ScrollView>
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
	},
	title: {
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