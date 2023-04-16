import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import CupertinoFooter2 from "../components/Navigation";

import Background from "../components/Background";

import * as Keychain from "react-native-keychain";
import { Text } from "react-native";

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
                <View style={styles.content}>
                </View>

                <View style={styles.navigationBar}>
                    <CupertinoFooter2 style={styles.cupertinoFooter2} props={{ navigation, head }}></CupertinoFooter2>
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cupertinoFooter2: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    navigationBar: {
        flex: 0.1
    },
    image: {
        width: 92,
        height: 81,
        marginTop: -734,
        marginLeft: 257
    }
});

export default Untitled;