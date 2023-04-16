import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import { StyleSheet, Dimensions, Text, View, Image } from 'react-native'
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

import MaterialButtonPrimary from '../components/MaterialButtonPrimary';

import CupertinoFooter2 from "../components/Navigation";

import * as Keychain from "react-native-keychain";

import axios from "axios";

const adUnitId = TestIds.REWARDED // "ca-app-pub-9579887747665373/2252841163"

let rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

let waiting = false;

export default function Shop({ navigation }) {

    const [head, setHead] = useState('Steve');

    useEffect(() => {
        async function loadNickname() {
            const { username } = await Keychain.getGenericPassword();
            setHead(username);
        };

        loadNickname();
    }, []);

    return (
        <Background>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Em desenvolvimento :p</Text>
            </View>
            <CupertinoFooter2 style={styles.cupertinoFooter2} props={{ navigation, head }}>
            </CupertinoFooter2>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    cupertinoFooter2: {
        height: 75,
        width: 400,
        position: 'absolute', bottom: 0, left: -26, right: 0,
        padding: 0,
        alignSelf: null,
        alignItems: null,
        justifyContent: null
    },
    image: {
        width: 92,
        height: 81,
        marginTop: -597,
        marginLeft: 134
    },
    materialButtonPrimary: {
        height: 54,
        width: 140,
        marginTop: 82,
        marginLeft: 113
    },
    loremIpsum: {
        fontFamily: "comic-sans-ms-regular",
        color: "#121212",
        height: 89,
        width: 312,
        fontSize: 20,
        marginTop: 39,
        marginLeft: 28
    },
    assistirAnuncios: {
        fontFamily: "comic-sans-ms-regular",
        color: "#121212",
        height: 48,
        width: 232,
        fontSize: 25,
        marginTop: -240,
        marginLeft: 77
    }
});