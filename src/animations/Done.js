import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";
import { colors } from '../config/Constants';

export default class App extends React.Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <View
                style={styles.animationContainer}
                >
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        resizeMode={'cover'}
                        loop={false}
                        style={{ width: 250 }}
                        onAnimationFinish={() => { this.props.setAnimation(false); this.props.goBack ? this.props.goBack() : {} }}
                        source={require('../../assets/lottie/done.json')}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height:'100%',
        width:'100%'
    },
    buttonContainer: {
        paddingTop: 20,
    },
});