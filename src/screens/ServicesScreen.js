import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, ImageBackground } from 'react-native';

import api from '../services/api';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import ServiceItem from '../components/ServiceItem';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';


export default function ServicesScreen({ navigation }) {
	const [servicesData, setServicesData] = useState([]);
	const [loadingServicesData, setLoadingServicesData] = useState(false);
	const [secData, setSecData] = useState([]);
	const fetchServices = async () => {
		setLoadingServicesData(true);
		const resp = await api.get('/wp-json/wp/v2/app-servico?per_page=100');
		const resp2 = await api.get('/wp-json/wp/v2/app-secretaria?per_page=100');
		setServicesData(resp.data);
		setSecData(resp2.data);
		setLoadingServicesData(false);
	}
	useEffect(() => { fetchServices() }, []);
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
						showsVerticalScrollIndicator={false}
						refreshControl={<RefreshControl refreshing={loadingServicesData} onRefresh={fetchServices} />}
						contentContainerStyle={{ flexGrow: 1, padding: 10, paddingTop:0 }}
						style={{ width: '100%' }}
					>
						{servicesData?.map((service) => {
							return <ServiceItem
								key={service.id}
								onPress={() => {
									navigation.navigate("ServicesDetailsScreen", { service, secData })
								}}
								iconURL={service.meta_box.icone}
								title={service.meta_box.servico_nome}
							/>
						})}
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
});
