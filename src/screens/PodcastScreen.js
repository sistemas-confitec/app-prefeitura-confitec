import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';

import api from '../services/api';
import { colors } from '../config/Constants';
import PodcastCard from '../components/PodcastCard';


export default function PodcastScreen() {
    const [podcastData, setPodcastData] = useState([]);
    const [loadingPodcastData, setLoadingPodcastData] = useState(false);
    const fetchPodcasts = async () => {
        setLoadingPodcastData(true);
        const resp = await api.get('/wp-json/wp/v2/app-podcast');
        setPodcastData(resp.data);
        setLoadingPodcastData(false);
    }
    useEffect(() => { fetchPodcasts() }, []);
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={loadingPodcastData} onRefresh={fetchPodcasts} />}
                contentContainerStyle={{ flexGrow: 1, padding: 10 }}
            >
                {podcastData.map((podcast) => {
                    return <PodcastCard
                        key={podcast.id}
                        progress={0.3}
                        title={podcast.meta_box.titulo_podcast}
                        description={podcast.meta_box.descricao_podcast} />
                })}
            </ScrollView>
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
