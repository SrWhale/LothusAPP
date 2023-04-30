
import { StyleSheet, Text, View } from 'react-native'

import React, { useState, useEffect } from 'react';

import Background from '../components/Background';

import * as Keychain from "react-native-keychain";

export default function Shop({ navigation }) {

    const [head, setHead] = useState('Steve');
    console.log(head)
    useEffect(() => {
        async function loadNickname() {
            const { username } = await Keychain.getGenericPassword();
            setHead(username);
        };

        loadNickname();
    }, []);

    return (
        <Background navigation={navigation}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Em desenvolvimento :p</Text>
            </View>
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