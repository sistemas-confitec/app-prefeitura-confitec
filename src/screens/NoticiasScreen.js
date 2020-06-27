import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Linking, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import noticiasActions from '../store/ducks/noticiasDuck';
import globalStyles from './globalStyles';


export default function NoticiasScreen(props) {
	const noticias = useSelector(state => state.noticias.data);
	const loading = useSelector(state => state.noticias.loading);

	const dispatch = useDispatch();

	useEffect(() => { dispatch(noticiasActions.fetchNoticias()) }, []);
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
						showsVerticalScrollIndicator={false}
						style={{ width: '100%' }}
						contentContainerStyle={{
							justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1,
							paddingHorizontal: 15
						}}
					>
						<View style={{ width: '100%', paddingTop: 10 }}>
							{noticias.map((noticia) => <TouchableOpacity
								activeOpacity={0.8}
								key={noticia.id}
								onPress={() => {
									props.navigation.navigate('NoticiasDetailsScreen', { noticia })
								}}
								style={{ ...globalStyles.itemContainer, padding: 0, borderWidth: 0 }}
							>
								<ImageBackground
									source={{ uri: noticia._embedded['wp:featuredmedia'][0].source_url }}
									resizeMode={'cover'}
									style={{
										height: 200,
										width: '100%',
										justifyContent: 'flex-end'
									}}
								>
								</ImageBackground>
								<View
									style={{
										width: '100%',
										flexDirection: 'row',
										backgroundColor: colors.primary,
										padding: 5,
										marginTop: 3
									}}
								>
									<Text
										numberOfLines={1}
										style={{ ...globalStyles.title, textAlign: 'left', fontSize: 20, color: '#FFF' }}
									>{noticia.title.rendered}</Text>
								</View>
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
