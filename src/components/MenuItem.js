import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as Icons from '@expo/vector-icons';

import { colors } from '../config/Constants';

export default function MenuItem({ title, iconName, onPress, iconSource }) {
	const icon = () => {
		switch (iconSource) {
			case 'FontAwesome':
				return <Icons.FontAwesome name={iconName} size={35} color={'#FFF'} />;
			case 'FontAwesome5':
				return <Icons.FontAwesome5 name={iconName} size={35} color={'#FFF'} />;
			case 'Foundation':
				return <Icons.Foundation name={iconName} size={35} color={'#FFF'} />;
			case 'MaterialCommunityIcons':
				return <Icons.MaterialCommunityIcons name={iconName} size={35} color={'#FFF'} />;
			case 'Ionicons':
				return <Icons.Ionicons name={iconName} size={35} color={'#FFF'} />;
			case 'Entypo':
				return <Icons.Entypo name={iconName} size={35} color={'#FFF'} />;
			case 'SimpleLineIcons':
				return <Icons.SimpleLineIcons name={iconName} size={35} color={'#FFF'} />;
		}
	}
	return (
		<TouchableOpacity
			style={styles.menuItem}
			onPress={onPress}
			activeOpacity={0.6}
		>
			<>
				{icon()}
				<Text style={styles.text}>{title}</Text>
			</>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	menuItem: {
		flex: 1,
		aspectRatio: 1.3,
		//backgroundColor: '#FFF',
		padding: 5,
		margin: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#FFF',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: '#FFF',
		textAlign: 'center',
		fontFamily:'Montserrat_400Regular',
		fontSize:16
	}
});
