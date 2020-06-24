import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements'
import { List } from 'react-native-paper';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';



export default function ServicosScreen({ route, navigation }) {
	return (
		<View style={styles.container}>
			{/* <Header
                title={strings.townHallName}
                subtitle={strings.headerSubtitle}
                titleColor={colors.primary}
            /> */}
			<ScrollView
				style={{ width: '100%', padding: 10 }}
				contentContainerStyle={{ flexGrow: 1 }}
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
									navigation.navigate("CNDScreen")
								}}
								style={styles.listItem}
							>
								<Text style={styles.text}>REQUISITAR CND</Text>
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
								<Text style={styles.text}>VERIFICAR STATUS DA CND</Text>
							</TouchableOpacity>
							<Divider />
						</View>
						<View
							style={{ paddingLeft: 30 }}
						>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("CNDScreen")
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
			</ScrollView>
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
