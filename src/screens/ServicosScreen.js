import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Divider } from 'react-native-elements'
import { List } from 'react-native-paper';
import CollapsibleList from "react-native-collapsible-list";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';


export default function ServicosScreen({ route, navigation }) {
	const [CNDCollapsed, setCNDCollapsed] = useState(false);

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
					<ScrollView
						style={globalStyles.scrollView}
						contentContainerStyle={globalStyles.contentContainerScrollView}
					>

						<CollapsibleList
							numberOfVisibleItems={0}
							buttonPosition={'top'}
							wrapperStyle={globalStyles.itemContainer}
							onToggle={(collap) => {
								setCNDCollapsed(collap);
							}}
							buttonContent={
								<View>
									<Text
										style={{ ...globalStyles.title, color: colors.primary }}
										selectable={true}
									>Emissão de CND</Text>
									<View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} />
									{!CNDCollapsed ? <Entypo
										name="chevron-small-down"
										style={{ alignSelf: 'center' }}
										size={35}
										color={colors.primary} /> : <Entypo
											name="chevron-small-up"
											style={{ alignSelf: 'center' }}
											size={35}
											color={colors.primary} />}
								</View>
							}
						>
							<View>
								<TouchableOpacity
									activeOpacity={0.85}
									onPress={() => {
										navigation.navigate("RequisitarCNDScreen")
									}}
									style={{ ...globalStyles.button, marginTop: 10 }}
								>
									<Text
										style={{ ...globalStyles.buttonText, marginLeft: 10 }}
									>REQUISITAR CND</Text>
								</TouchableOpacity>
								<TouchableOpacity
									activeOpacity={0.85}
									onPress={() => {
										navigation.navigate("CNDsScreen")
									}}
									style={{ ...globalStyles.button, marginTop: 10 }}
								>
									<Text
										style={{ ...globalStyles.buttonText, marginLeft: 10 }}
									>CERTIDÕES REQUISITADAS</Text>
								</TouchableOpacity>
								<TouchableOpacity
									activeOpacity={0.85}
									onPress={() => {
										navigation.navigate("VerificarCNDScreen")
									}}
									style={{ ...globalStyles.button, marginTop: 10, backgroundColor: colors.secondary }}
								>
									<Text
										style={{ ...globalStyles.buttonText, marginLeft: 10 }}
									>VERIFICAR AUTENTICIDADE</Text>
								</TouchableOpacity>
								<View style={{ width: '100%', height: 1, backgroundColor: '#F5F5F5', marginTop: 10 }} />
							</View>
						</CollapsibleList>
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
	listItem: {
		width: '100%',
		height: 50,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	text: {
		fontSize: 16,
		textAlign: 'left',
		paddingHorizontal: 10,
		fontFamily: 'Montserrat_400Regular'
	},
});
