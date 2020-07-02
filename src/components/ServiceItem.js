import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { colors } from '../config/Constants';
import globalStyles from '../screens/globalStyles';

export default function MenuItem({ title, iconURL, onPress }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.85}
			style={{ ...globalStyles.itemContainer, padding: 0 }}
		>
			<View
				style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
			>
				<Image
					source={{ uri: 'https:' + iconURL }}
					resizeMode={'contain'}
					style={{
						width: 40,
						height: 40,
						marginHorizontal: 10
					}}
				/>
				<View
					style={{
						flex: 1,
						padding: 10
					}}
				>
					<Text
						numberOfLines={2}
						style={{ ...globalStyles.title, textAlign: 'left', marginVertical: 5, color: colors.primary }}
					>{title}</Text>
					<Text
						style={{ ...globalStyles.text, textAlign: 'left', color: colors.secondary, fontSize:14 }}
					>Veja os detalhes</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	title: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 14,
		marginVertical: 5,
		color: colors.primary
	},
	serviceCardContainer: {
		width: '100%',
		backgroundColor: '#FFF',
		borderRadius: 8,
		elevation: 5,
		marginBottom: 20
	}
});
