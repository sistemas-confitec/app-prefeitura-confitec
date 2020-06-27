import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../config/Constants';

export default function Header({ title, subtitle, assetName, titleColor }) {
	const prefeitura = useSelector(state => state.prefeitura.data);

	return (
		<LinearGradient
			style={{
				width: '100%',
				flexDirection: 'row',
				//backgroundColor: colors.primary,
				//elevation: 4,
				paddingHorizontal: 40,
				paddingTop: Constants.statusBarHeight
			}}
			//colors={[colors.primary, colors.darkPrimary]}
			colors={['#FFF', '#FFF']}
			start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 1 }}
		>
			<Image
				source={assetName === 'logo_ouvidoria' ?
					require(`../../assets/logo_ouvidoria.png`) :
					assetName === 'logo_e_sic' ?
						require(`../../assets/logo_e_sic.png`) :
						{ uri: prefeitura?.meta_box ? prefeitura?.meta_box['logo-gestao']?.url : 'fallback' }
				}
				resizeMode={'contain'}
				style={{
					width: 70,
					height: 70,
					marginVertical: 20
				}}
			/>
			<View
				style={{ flex: 1, justifyContent: 'center', marginLeft: 30 }}
			>
				<Text
					style={{
						fontSize: 28,
						color: titleColor,
						fontWeight: 'bold'
					}}
				>{title}</Text>
				<Text
				>{subtitle}</Text>
			</View>
		</LinearGradient>
	)
}