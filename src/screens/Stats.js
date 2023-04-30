import React, { useState, useEffect } from 'react'
import Background from '../components/Background'

import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import { RewardedAd, TestIds } from 'react-native-google-mobile-ads';

import * as Keychain from "react-native-keychain";

import Header from "../components/Header";

import axios from "axios";

const adUnitId = TestIds.REWARDED // "ca-app-pub-9579887747665373/2252841163"

let rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

let waiting = false;

export default function Stats({ navigation }) {

    const [userData, setUserData] = useState({
        profile: {
            username: "Desconhecido",
            rank: "Membro",
        },
        skywars: {
            profile: {
                coins: 0,
                level: 0,
                xp: 0
            },
            solo: {
                vitorias: 0,
                derrotas: 0,
                partidasTotais: 0,
                kills: 0,
                winStreak: 0
            },
            team: {
                vitorias: 0,
                derrotas: 0,
                partidasTotais: 0,
                kills: 0,
                winStreak: 0
            }
        }
    });

    const [LTC, setLTC] = useState(0);

    const [head, setHead] = useState("Steve");

    useEffect(() => {
        async function getStats() {
            const parse = new URLSearchParams({
                username: await Keychain.getGenericPassword().then(res => res.username),
            });

            const { username } = await Keychain.getGenericPassword();

            setHead(username);

            axios.get(`http://api.mc-lothus.com:25565/getUserData?${parse.toString()}`).then(res => {
                setLTC(res.data.data.profile.cash);
            })
        };

        getStats()
    }, [])

    return (
        <Background navigation={navigation}>
            <View style={styles.container}>
                <View style={styles.author}>
                    <View style={{
                        flex: 0.47,
                        backgroundColor: "rgb(52, 52, 52)",
                        width: "80%",
                        height: "90%",
                        borderRadius: 40,
                        flexDirection: "row",
                        paddingStart: "3%",
                        alignContent: "center",
                        alignItems: "center"
                    }}>

                        <Image
                            style={{
                                width: "30%",
                                height: "97%",
                                padding: 1
                            }}
                            source={{
                                uri: `https://mc-heads.net/head/${head}`
                            }}
                        />

                        <Header customStyle={{
                            fontSize: 18,
                            paddingStart: "4%"
                        }}>
                            {LTC}
                        </Header>

                        <Header customStyle={{
                            fontSize: 18,
                            paddingStart: "5%",
                            color: "#17DD62"
                        }}>
                            LTC
                        </Header>
                    </View>

                    <View style={{
                        flex: 0.35,
                        width: "100%",
                        height: "90%",
                        paddingRight: 5,

                    }}>
                    </View>

                    <View style={{
                        flex: 0.15,
                        width: "100%",
                        height: "90%",
                        alignContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgb(52, 52, 52)",
                        borderRadius: 40,
                    }}>
                        <TouchableOpacity
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            onPress={() => navigation.navigate('Perfil')}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    padding: 1
                                }}
                                source={require("../assets/login/perfil.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flex: 0.15
                }}></View>

                <View style={{
                    flex: 0.75,
                    justifyContent: "space-between"
                }}>
                    <View style={styles.modes}>
                        <TouchableOpacity style={[styles.mode, {
                            backgroundColor: "rgb(52, 52, 52)",
                            width: "80%",
                            height: "50%",
                            borderRadius: 40,
                            flexDirection: "row"
                        }]} onPress={() => navigation.navigate('Shop')}>

                            <Image
                                style={{
                                    height: "60%",
                                    width: "25%",
                                }}
                                source={require("../assets/Stats/cama.png")}
                            />

                            <Header customStyle={{
                                fontSize: 24,
                                color: "red",
                                paddingStart: "5%",
                                letterSpacing: 1
                            }}>BED</Header>
                            <Header customStyle={{
                                fontSize: 24,
                                letterSpacing: 1
                            }}>WARS</Header>

                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.mode, {
                            backgroundColor: "rgb(52, 52, 52)",
                            width: "80%",
                            height: "50%",
                            borderRadius: 40,
                            flexDirection: "row"
                        }]} onPress={() => navigation.navigate('Skywars')}>

                            <Image
                                style={{
                                    height: "70%",
                                    width: "20%",
                                }}
                                source={require("../assets/Stats/espada.png")}
                            />

                            <Header customStyle={{
                                fontSize: 24,
                                color: "#17DD62",
                                paddingStart: "5%",
                                letterSpacing: 1
                            }}>SKY</Header>
                            <Header customStyle={{
                                fontSize: 24,
                                letterSpacing: 1
                            }}>WARS</Header>

                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.mode, {
                            backgroundColor: "rgb(52, 52, 52)",
                            width: "80%",
                            height: "50%",
                            borderRadius: 40,
                            flexDirection: "row"
                        }]} onPress={() => navigation.navigate('Shop')}>

                            <Image
                                style={{
                                    height: "55%",
                                    width: "15%",
                                }}
                                source={require("../assets/Stats/vara.png")}
                            />

                            <Header customStyle={{
                                fontSize: 24,
                                color: "yellow",
                                paddingStart: "5%",
                                letterSpacing: 1
                            }}>MANUTENÇÃO</Header>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    mode: {
        flex: 0.20,
        alignItems: "center",
        alignSelf: "center",
        paddingStart: "4%",
    },
    modes: {
        flex: 0.8,
        justifyContent: "space-around",
        alignItems: "center",
    },
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    content: {
        flex: 0.25,
        width: "100%",
        height: "100%",
        flexDirection: "row"
    },
    author: {
        flex: 0.1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        paddingStart: "3%",
        paddingTop: "4%",
    }
});