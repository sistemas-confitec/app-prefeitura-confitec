import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { colors } from '../config/Constants';

export default function CloseSubheader({ onPress }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				alignSelf: 'flex-start',
				padding: 15
			}}
		>
			<AntDesign name="close" size={24} color={'black'} />
		</TouchableOpacity>
	);
}


