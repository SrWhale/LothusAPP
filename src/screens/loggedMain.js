import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import CupertinoFooter2 from "../components/Navigation";

import Background from "../components/Background";

import * as Keychain from "react-native-keychain";

function Untitled({ navigation }) {

    const [head, setHead] = useState('Steve');

    useEffect(() => {
        async function loadNickname() {
            const { username } = await Keychain.getGenericPassword();
            setHead(username);
        };

        loadNickname();
    }, [])
    return (
        <Background>
            <View style={styles.container}>
                <CupertinoFooter2 style={styles.cupertinoFooter2} props={{ navigation, head }}></CupertinoFooter2>
                <Image
                    source={{
                        uri: `https://mc-heads.net/head/${head}`
                    }}
                    resizeMode="contain"
                    style={styles.image}
                ></Image>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cupertinoFooter2: {
        height: 75,
        width: 390,
        marginTop: Dimensions.get('screen').height - 110
    },
    image: {
        width: 92,
        height: 81,
        marginTop: -734,
        marginLeft: 257
    }
});

export default Untitled;