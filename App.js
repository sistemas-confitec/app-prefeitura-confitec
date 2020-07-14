import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider } from 'react-redux';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold_Italic, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

import store from './src/store';
import { createPlayer } from './src/services/audioPlayer';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import CustomActivityIndicator from './src/components/CustomActivityIndicator';
import { colors } from './src/config/Constants';

createPlayer();


export default function App() {
	let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_600SemiBold_Italic
	});

	if (!fontsLoaded) {
		return <CustomActivityIndicator />;
	}

	const theme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: colors.primary,
			accent: colors.secondary,
		},
		/* fonts:{
			regular: 'Montserrat_400Regular',
			medium: 'Montserrat_400Regular',
			light: 'Montserrat_400Regular',
			thin: 'Montserrat_400Regular'
		} */
	};

	return (
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<NavigationContainer>
					<MainStackNavigator />
				</NavigationContainer>
			</PaperProvider>
		</Provider>
	);
}