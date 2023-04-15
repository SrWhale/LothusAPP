import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import { StyleSheet } from 'react-native'
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

import * as Keychain from "react-native-keychain";

import axios from "axios";

const adUnitId = TestIds.REWARDED // "ca-app-pub-9579887747665373/2252841163"

let rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

let waiting = false;

export default function Dashboard({ navigation }) {

    const [vitorias, setVitorias] = useState(0);
    const [derrotas, setDerrotas] = useState(0);
    const [partidasTotais, setPartidasTotais] = useState(0);
    const [coins, setCoins] = useState(0);
    const [mortes, setMortes] = useState(0);

    useEffect(() => {
        async function getStats() {
            const parse = new URLSearchParams({
                user: await Keychain.getGenericPassword().then(res => res.username),
            });

            axios.get(`http://123`)
        };

        getStats()
    }, [])

    return (
        <Background>
            <Logo />
            <View style={styles.container}>
                <Text style={styles.title}>Perfil do Jogador</Text>
                <Text style={styles.stat}>Vitórias: {vitorias}</Text>
                <Text style={styles.stat}>Derrotas: {derrotas}</Text>
                <Text style={styles.stat}>Partidas Totais: {partidasTotais}</Text>
                <Text style={styles.stat}>Coins: {coins}</Text>
                <Text style={styles.stat}>Mortes: {mortes}</Text>
            </View>
        </Background >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stat: {
        fontSize: 18,
        marginBottom: 10,
    },
});
