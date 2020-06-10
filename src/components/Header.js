import React, { useEffect, useState } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';

export default function Header({ title, subtitle, assetName, titleColor }) {
    const [logoUri, setLogoUri] = useState('apagar_e_usar_redux');
    const getLogo = async ()=>{
        const logoUriAux = await AsyncStorage.getItem('logoUri');
        setLogoUri(logoUriAux);
    };

    useEffect(()=>{
        getLogo();
    },[]);

    return (
        <View
            style={{
                width: '100%',
                flexDirection: 'row',
                backgroundColor: '#FFF',
                elevation: 4,
                paddingHorizontal: 40
            }}
        >
            <Image
                source={assetName === 'logo_ouvidoria' ?
                    require(`../../assets/logo_ouvidoria.png`) :
                    assetName === 'logo_e_sic' ?
                        require(`../../assets/logo_e_sic.png`) :
                        {uri: logoUri}//require(`../../assets/icon.png`)
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
        </View>
    )
}