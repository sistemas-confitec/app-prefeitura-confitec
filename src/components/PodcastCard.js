import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';

import { colors } from '../config/Constants';
import PodcastPlayer from '../components/PodcastPlayer'

export default function PodcastCard({ title, description, onPress, url }) {
    const [paused, setPaused] = useState(true);
    const [showPlayer, setShowPlayer] = useState(false);


    /* const getPermision = async () => {
        const { status } = await Audio.getPermissionsAsync();
        console.log(status)
        if(status !== 'granted'){
            await Audio.requestPermissionsAsync();
        }
    } */

    /* useEffect(getPermision(), []); */

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={styles.podcastCardContainer}
        >
            <View
                style={{ padding: 10 }}
            >
                <Text
                    style={styles.title}
                >{title}</Text>
                <Text
                    numberOfLines={3}
                    style={styles.description}
                >{description}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setShowPlayer(true);
                        }}
                    >
                        {paused ?
                            <AntDesign name="play" size={35} color={colors.secundary} /> :
                            <AntDesign name="pausecircle" size={35} color={colors.secundary} />
                        }
                    </TouchableOpacity>
                    <Text
                        style={{ marginLeft: 10 }}
                    >15 Mai 2020</Text>
                </View>
            </View>
            <PodcastPlayer
                visible={showPlayer}
                title={title}
                description={description}
                url={url}
            />
            <ProgressBar style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }} color={colors.secundary} />
        </TouchableOpacity>
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
        borderRadius: 8,
        elevation: 5,
        marginBottom: 20
    }
});
