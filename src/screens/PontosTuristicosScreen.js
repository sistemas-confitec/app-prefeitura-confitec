import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Linking, Alert } from 'react-native';
import HTML from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import pontosTuristicosActions from '../store/ducks/pontosTuristicosDuck';


export default function PontosTuristicosScreen(props) {
	const pontosTuristicos = useSelector(state => state.pontosTuristicos.data);
	const loading = useSelector(state => state.pontosTuristicos.loading);

	const dispatch = useDispatch();

	useEffect(() => { dispatch(pontosTuristicosActions.fetchPontosTuristicos()) }, []);
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
					{!loading ? <ScrollView
						showsVerticalScrollIndicator={false}
						style={{ width: '100%' }}
						contentContainerStyle={{
							justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1,
							paddingHorizontal: 15
						}}
					>
						<View style={{ width: '100%', paddingTop: 10 }}>
							{pontosTuristicos.map((pontoTuristico) => <TouchableOpacity
								activeOpacity={0.8}
								key={pontoTuristico.id}
								onPress={() => {
									props.navigation.navigate('PontosTuristicosDetailsScreen', { pontoTuristico })
								}}
								style={{...globalStyles.itemContainer, padding: 0, borderWidth:0}}
							>
								<ImageBackground
									source={{ uri: pontoTuristico._embedded['wp:featuredmedia'][0].source_url }}
									resizeMode={'cover'}
									style={{
										height: 200,
										width: '100%',
										justifyContent: 'flex-end'
									}}
								>
									<View
										style={{
											width: '100%',
											flexDirection: 'row',
											backgroundColor: colors.primary+'77',
											padding: 5,
											borderTopColor:'#FFF',
											borderTopWidth:5
										}}
									>
										<Text
											numberOfLines={1}
											style={{...globalStyles.title, color: '#FFF', fontSize:20}}
										>{pontoTuristico.title.rendered}</Text>
									</View>
								</ImageBackground>
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
