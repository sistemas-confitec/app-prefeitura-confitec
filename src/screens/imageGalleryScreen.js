import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Gallery from 'react-native-image-gallery';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';


export default function imageGalleryScreen(props) {
    const images = props.route.params?.images;
    const initialPage = props.route.params?.initialPage;

    return (
        <View style={{ flex: 1, backgroundColor: '#696969', paddingTop: Constants.statusBarHeight }}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.goBack();
                }}
                style={{
                    padding: 15,
                }}
            >
                <AntDesign name="close" size={24} color={'#FFF'} />
            </TouchableOpacity>
            <Gallery
                style={{ flex: 1, backgroundColor: '#696969' }}
                images={images}
                //errorComponent={this.renderError}
                //onPageSelected={this.onChangeImage}
                initialPage={initialPage ? initialPage : 0}
            />
        </View>
    );
}

