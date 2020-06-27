import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../config/Constants';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroudColorContent,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	elevatedContent: {
		flex: 1,
		width: '100%',
		elevation: 15,
		backgroundColor: '#FFF',
	},
	backgroundImageTransparency: {
		flex: 1,
		backgroundColor: '#FFFFFFF5'
	},
	itemContainer: {
		width: '100%',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: colors.secondary,
		padding: 20,
		marginBottom: 10
	},
	title: {
		fontSize: 16,
		textAlign: 'center',
		fontFamily: 'Montserrat_600SemiBold_Italic'
	},
	text: {
		fontSize: 16,
		textAlign: 'center',
		fontFamily: 'Montserrat_400Regular'
	},
	scrollView: {
		flex: 1,
		width: '100%',
		paddingHorizontal: 10
	},
	contentContainerScrollView: {
		flexGrow: 1,
		paddingBottom: 10
	},
	button: {
		//width: Dimensions.get('window').width - 20,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1.5,
		height: 60,
		borderColor: colors.primary
	}
});