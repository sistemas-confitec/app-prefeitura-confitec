import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Linking, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import diarioOficialActions from '../store/ducks/diarioOficialDuck';
import globalStyles from './globalStyles';


export default function DiarioOficialScreen(props) {
	const diariosOficiais = useSelector(state => state.diarioOficial.data);
	const total = useSelector(state => state.diarioOficial.total);
	const totalPages = useSelector(state => state.diarioOficial.totalPages);
	const currentPage = useSelector(state => state.diarioOficial.currentPage);
	const loading = useSelector(state => state.diarioOficial.loading);

	const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

	const dispatch = useDispatch();

	useEffect(() => { dispatch(diarioOficialActions.fetchDiarioOficial(1)) }, []);
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
							{diariosOficiais.map((diarioOficial) => <TouchableOpacity
								activeOpacity={0.8}
								key={diarioOficial.id}
								onPress={() => {
									//props.navigation.navigate('DiarioOficialDetailsScreen', { diarioOficial })
								}}
								style={globalStyles.itemContainer}
							>
								<View
									style={{
										width: '100%',
										flexDirection: 'row',
										backgroundColor: 'rgba(255,255,255,0.9)',
										padding: 5
									}}
								>
									<Text
										style={{ ...globalStyles.title, textAlign: 'left', color: colors.primary }}
									>{diarioOficial.title.rendered.replace('&#8211;', '-').replace('&#8211;', '-')}</Text>
								</View>
							</TouchableOpacity>)}
							{totalPages > 1 && <>
								<View
									style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}
								>
									{pages.map((page) => <TouchableOpacity
										style={{
											flexDirection: 'row',
											width: 50,
											height: 50,
											alignItems: 'center',
											justifyContent: 'center',
											elevation: 2,
											backgroundColor: page == currentPage ? colors.primary : colors.secondary,
										}}
										onPress={() => {
											dispatch(diarioOficialActions.fetchDiarioOficial(page))
										}}
									>
										<Text
											style={globalStyles.buttonText}
										>{page}</Text>
									</TouchableOpacity>)}
								</View>
								<View
									style={{
										flex: 1,
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
										paddingVertical: 10
									}}
								>
									<Text
										style={globalStyles.text}
									>Nº de páginas: {totalPages}</Text>
									<Text
										style={globalStyles.text}
									>Nº de diários: {total}</Text>
								</View>
							</>}
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
