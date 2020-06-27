import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Divider } from 'react-native-elements'
import { List } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';


export default function ServicosScreen({ route, navigation }) {
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

						<List.Section
						>
							<List.Accordion
								title="EMISSÃO DE CND"
								theme={{
									fonts: {
										regular: 'Montserrat_400Regular',
										light: 'Montserrat_400Regular',
										medium: 'Montserrat_400Regular',
										thin: 'Montserrat_400Regular'
									}
								}}
							>
								<View
									style={{ paddingLeft: 30 }}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate("RequisitarCNDScreen")
										}}
										style={styles.listItem}
									>
										<Text style={styles.text}>REQUISITAR</Text>
									</TouchableOpacity>
									<Divider />
								</View>
								<View
									style={{ paddingLeft: 30 }}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate("CNDsScreen")
										}}
										style={styles.listItem}
									>
										<Text style={styles.text}>VERIFICAR STATUS</Text>
									</TouchableOpacity>
									<Divider />
								</View>
								<View
									style={{ paddingLeft: 30 }}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate("VerificarCNDScreen")
										}}
										style={styles.listItem}
									>
										<Text style={styles.text}>VERIFICAR AUTENTICIDADE</Text>
									</TouchableOpacity>
									<Divider />
								</View>
							</List.Accordion>
							<Divider />

						</List.Section>
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>DENÚNCIAS/RECLAMAÇÕES</Text>
						</TouchableOpacity>
						<Divider />
						<TouchableOpacity
							style={styles.listItem}
						>
							<Text style={styles.text}>QUALQUER BESTEIRA</Text>
						</TouchableOpacity>
						<Divider />
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
