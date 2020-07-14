import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';

import podcastsActions from '../store/ducks/podcastDuck';
import { colors, strings } from '../config/Constants';
import Header from '../components/Header';
import CloseSubheader from '../components/CloseSubheader';
import globalStyles from './globalStyles';
import PodcastCard from '../components/PodcastCard';
const soundObject = new Audio.Sound();


export default function PodcastScreen({ navigation }) {
	const dispatch = useDispatch();
	const podcasts = useSelector(state => state.podcasts.data);
	const loading = useSelector(state => state.podcasts.loading);
	const downloadedPodcasts = useSelector(state => state.podcasts.downloadedPodcasts);
	const [playingPodcastId, setPlayingPodcastId] = useState(null);

	const fetchPodcasts = () => {
		dispatch(podcastsActions.fetchPodcasts());
	}

	const _onPlaybackStatusUpdate = playbackStatus => {
		dispatch(podcastsActions.setPlaybackStatus(playingPodcastId, playbackStatus));
	};
	soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);

	const playAudio = async (id) => {
		try {
			const status = await soundObject.getStatusAsync();
			console.log('status', status);
			if ((!status.isLoaded && !status.isBuffering) || playingPodcast !== id) {
				console.log('aqui')
				await soundObject.loadAsync({ uri: FileSystem.documentDirectory + `podcast-${id}.mp3` });
				await soundObject.playAsync();
				await soundObject.setProgressUpdateIntervalAsync(1000);
				setPlayingPodcastId(id);
			}
			if (playingPodcast === id) {
				if (!status.isPlaying) {
					await soundObject.playAsync();
				} else {
					await soundObject.pauseAsync();
				}
			}
			// Your sound is playing!
		} catch (error) {
			// An error occurred!
		}
	};


	useEffect(() => { fetchPodcasts() }, []);
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
						refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchPodcasts} />}
						contentContainerStyle={{ flexGrow: 1, padding: 10 }}
					>
						{podcasts?.map((podcast) => {
							if (podcast.meta_box?.audio_podcast[0]?.url) {
								return <PodcastCard
									key={podcast.id}
									id={podcast.id}
									onPress={()=>{
										playAudio(podcast.id)
									}}
									navigation={navigation}
									localUri={downloadedPodcasts && downloadedPodcasts[podcast.id]}
									podcastUri={podcast.meta_box?.audio_podcast[podcast.meta_box?.audio_podcast.length - 1]?.url}
									title={podcast.meta_box.titulo_podcast}
									description={podcast.meta_box.descricao_podcast} />
							}
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
		backgroundColor: colors.backgroudColor,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
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
		borderRadius: 8,
		elevation: 5,
		marginBottom: 20
	}
});
