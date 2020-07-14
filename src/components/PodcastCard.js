import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system';

import { colors } from '../config/Constants';
import { pad } from '../util/Functions';
import globalStyles from '../screens/globalStyles';

export default function PodcastCard({ title, description, onPress, id, navigation, currentPodcast, podcastUri, localUri }) {
	const prefeitura = useSelector(state => state.prefeitura.data);
	const playingPodcast = useSelector(state=> state.podcasts.playingPodcast);
	const playingPodcastStatus = useSelector(state=> state.podcasts.playingPodcastStatus);
	const [downloadProgress, setDownloadProgress] = useState(0);

	const downloadCallback = downloadProgress => {
		const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
		console.log(progress)
		setDownloadProgress(progress);
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.85}
			style={{ ...globalStyles.itemContainer, padding: 0 }}
		>
			<View
				style={{ padding: 10 }}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							//borderWidth: 1,
							marginRight: 10,
							borderRadius: 8,
							backgroundColor: '#FFF',
							elevation: 2
						}}
					>
						<Image
							source={{ uri: prefeitura?.meta_box['logo-gestao']?.url }}
							resizeMode={'contain'}
							style={{
								width: 70,
								height: 70,
								margin: 5
							}}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Text
							style={{ ...globalStyles.title, textAlign: 'left', marginBottom: 5 }}
						>{title}</Text>
						<Text
							numberOfLines={3}
							style={{ ...globalStyles.text, textAlign: 'left' }}
						>{description}</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: 10
					}}
				>
					{localUri ? <TouchableOpacity
						onPress={onPress}
					>
						{id === playingPodcast && playingPodcastStatus.isPlaying ?
							<AntDesign name="pausecircle" size={35} color={colors.secondary} /> :
							<AntDesign name="play" size={35} color={colors.secondary} />
						}
					</TouchableOpacity> : < TouchableOpacity
						onPress={async () => {
							const downloadResumable = FileSystem.createDownloadResumable(
								podcastUri,
								FileSystem.documentDirectory + `podcast-${id}.mp3`,
								{},
								downloadCallback
							);
							try {
								const { uri } = await downloadResumable.downloadAsync();
								console.log('Finished downloading to ', uri);
							} catch (e) {
								console.error(e);
							}
						}}
					>
							{
								<AntDesign name="download" size={35} color={colors.secondary} />
							}
						</TouchableOpacity>}
					<Text
						style={{ ...globalStyles.text, marginLeft: 10 }}
					>15 Mai 2020</Text>
					<View
						style={{
							flex: 1,
							padding: 5,
							alignItems: 'flex-end'
						}}
					>
						{(playingPodcast===id && !!playingPodcastStatus.positionMillis) && <Text style={{ ...globalStyles.text, textAlign: 'left' }}>
							{pad(Math.floor(playingPodcastStatus.positionMillis / (1000 * 60)))}:{pad(Math.floor(playingPodcastStatus.positionMillis / 1000 % 60))}/{pad(Math.floor(playingPodcastStatus.durationMillis / (1000 * 60)))}:{pad(Math.floor(playingPodcastStatus.durationMillis / (1000 * 60)))}</Text>
							}
					</View>
				</View>
			</View>
			{playingPodcast===id  && !!playingPodcastStatus.positionMillis &&
				<ProgressBar
					style={{ height: 8 }}
					progress={playingPodcastStatus.positionMillis / playingPodcastStatus.durationMillis}
			color={colors.secondary} /> }
			{/* <ProgressBar
				style={{ height: 8 }}
				progress={downloadProgress} color={colors.secondary} /> */}

		</TouchableOpacity >
	);
}

const styles = StyleSheet.create({
	description: {
		textAlign: 'justify'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 14,
		marginVertical: 10
	},
	podcastCardContainer: {
		width: '100%',
		backgroundColor: '#FFF',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		elevation: 5,
		marginBottom: 20
	}
});
