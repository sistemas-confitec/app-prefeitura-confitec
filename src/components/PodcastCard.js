import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import { Menu, ProgressBar } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { stopAudio } from '../services/audioPlayer';
import podcastsActions from '../store/ducks/podcastDuck';
import { colors } from '../config/Constants';
import { pad } from '../util/Functions';
import globalStyles from '../screens/globalStyles';

export default function PodcastCard({ title, description, onPress, id, podcastUri, localUri, date }) {
	const dispatch = useDispatch();
	const prefeitura = useSelector(state => state.prefeitura.data);
	const playingPodcast = useSelector(state => state.podcasts.playingPodcast);
	const playingPodcastStatus = useSelector(state => state.podcasts.playingPodcastStatus);
	const [downloadProgress, setDownloadProgress] = useState(0);
	const [menuVisible, setMenuVisible] = useState(false);

	const downloadCallback = downloadProgress => {
		const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
		console.log(progress)
		setDownloadProgress(progress);
	};

	return (
		<TouchableOpacity
			/* onPress={onPress} */
			activeOpacity={0.85}
			disabled={true}
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
					<View style={{ flex: 1, alignItems: 'flex-end' }}>
						<Menu
							visible={menuVisible}
							onDismiss={() => setMenuVisible(false)}
							anchor={
								<TouchableOpacity
									style={{ alignSelf: 'flex-end', paddingLeft: 15 }}
									onPress={() => setMenuVisible(true)}
								>
									<Entypo name="dots-three-vertical" size={18} color="black" />
								</TouchableOpacity>
							}>
							<Menu.Item
								onPress={async () => {
									if (id === playingPodcast) {
										stopAudio();
									}
									await FileSystem.deleteAsync(FileSystem.documentDirectory + `podcast-${id}.mp3`)
									dispatch(podcastsActions.fetchPodcasts());
									setMenuVisible(false);
								}}
								disabled={!localUri}
								title="Excluir da memória"
							/>
							{/* <Menu.Item onPress={async () => {
								if (id === playingPodcast) {
									stopAudio();
								}
								setMenuVisible(false);
							}} title="Parar" /> */}
						</Menu>
						<Text
							style={{ ...globalStyles.title, textAlign: 'left', marginBottom: 5, alignSelf: 'flex-start' }}
						>{title}</Text>
						<Text
							numberOfLines={3}
							style={{ ...globalStyles.text, textAlign: 'left', alignSelf: 'flex-start' }}
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
						{id === playingPodcast && !!playingPodcastStatus.positionMillis &&
							playingPodcastStatus.isPlaying ?
							<AntDesign name="pausecircle" size={35} color={colors.secondary} /> :
							<AntDesign name="play" size={35} color={colors.secondary} />
						}
					</TouchableOpacity> : downloadProgress === 0 ? < TouchableOpacity
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
								dispatch(podcastsActions.fetchPodcasts());
								setTimeout(() => setDownloadProgress(0), 2500)
							} catch (e) {
								console.error(e);
							}
						}}
					>
						{
							<AntDesign name="download" size={35} color={colors.secondary} />
						}
					</TouchableOpacity> : <AnimatedCircularProgress
						size={35}
						width={2}
						fill={downloadProgress * 100}
						tintColor={colors.secondary}
						backgroundColor={colors.primary}>
								{
									(fill) => (
										<Text style={{ fontSize: 10 }}>
											{Math.round(downloadProgress * 100)}%
										</Text>
									)
								}
							</AnimatedCircularProgress>}
					<Text
						style={{ ...globalStyles.text, marginLeft: 10 }}
					>{date}</Text>
					<View
						style={{
							flex: 1,
							padding: 5,
							alignItems: 'flex-end'
						}}
					>
						{(playingPodcast === id && !!playingPodcastStatus.positionMillis) &&
							<Text style={{ ...globalStyles.text, textAlign: 'left' }}>
								{pad(Math.floor(playingPodcastStatus.positionMillis / (1000 * 60)))}:{pad(Math.floor((playingPodcastStatus.positionMillis / 1000) % 60))}/{pad(Math.floor(playingPodcastStatus.durationMillis / (1000 * 60)))}:{pad(Math.floor((playingPodcastStatus.durationMillis / 1000) % 60))}
							</Text>
						}
					</View>
				</View>
			</View>
			{playingPodcast === id && !!playingPodcastStatus.positionMillis &&
				<ProgressBar
					style={{ height: 8 }}
					progress={playingPodcastStatus.positionMillis / playingPodcastStatus.durationMillis}
					color={colors.secondary} />}

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
