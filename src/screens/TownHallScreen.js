import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, ImageBackground } from 'react-native';
import api from '../services/api';
import { FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';

import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';


export default function TownHallScreen({ navigation }) {
	const [townHallData, setTownHallData] = useState(null);
	const [prefeito, setPrefeito] = useState('');
	const [vice, setVice] = useState('');
	const [loading, setLoading] = useState(true);

	const fetchTownHallData = async () => {
		setLoading(true);
		const resp = await api.get('/wp-json/wp/v2/app-prefeitura');
		setTownHallData(resp.data[0]);
		const resp2 = await api.get('/wp-json/wp/v2/app-prefeito-e-vice');

		if (resp2.data) {
			resp2.data.forEach(element => {
				if (element.id == resp.data[0].meta_box.id_prefeito) {

					setPrefeito(element.title.rendered)
				}
				if (element.id == resp.data[0].meta_box.id_vice) {

					setVice(element.title.rendered)
				}
			});
		}
		setLoading(false);

	}
	useEffect(() => { fetchTownHallData() }, []);
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
					{loading ?
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<ActivityIndicator size={40} color={colors.primary} />
						</View>
						:
						<ScrollView
							style={globalStyles.scrollView}
							contentContainerStyle={globalStyles.contentContainerScrollView}
							showsVerticalScrollIndicator={false}
						>
							<View
								style={{ ...globalStyles.itemContainer, alignItems: 'center' }}
							>
								<FontAwesome5 name="user-tie" size={40} color={colors.secondary} />
								<Text
									style={{ ...globalStyles.text, marginTop: 10 }}
									selectable={true}
								>Prefeito: {prefeito}</Text>
								<Text
									style={{ ...globalStyles.text, marginTop: 10 }}
									selectable={true}
								>Vice Prefeito: {vice}</Text>
							</View>

							<View
								style={{ ...globalStyles.itemContainer, alignItems: 'center' }}
							>
								<Feather name="map-pin" size={40} color={colors.secondary} />
								<Text
									selectable={true}
									style={{ ...globalStyles.text, marginTop: 10 }}
								>{townHallData?.meta_box.endereco}</Text>
								<Text
									selectable={true}
									style={{ ...globalStyles.text, marginTop: 10 }}
								>CNPJ: {townHallData?.meta_box.cnpj}</Text>
								<Text
									selectable={true}
									style={{ ...globalStyles.text, marginTop: 10 }}
								>{townHallData?.meta_box.horario}</Text>
							</View>

							<View
								style={{ ...globalStyles.itemContainer, alignItems: 'center' }}
							>
								<AntDesign name="contacts" size={40} color={colors.secondary} />
								<Text
									selectable={true}
									style={{ ...globalStyles.text, marginTop: 10 }}
								>{townHallData?.meta_box.email_prefeitura}</Text>
								<Text
									selectable={true}
									style={{ ...globalStyles.text, marginTop: 10 }}
								>{townHallData?.meta_box.telefone}</Text>
							</View>
						</ScrollView>}
				</View>
			</ImageBackground>
		</View>
	);
}
