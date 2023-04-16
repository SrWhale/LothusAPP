import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Tab from '../components/Tab';
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import { StyleSheet, View, Text, Dimensions, Image } from 'react-native'
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

import CupertinoFooter2 from "../components/Navigation";

import * as Keychain from "react-native-keychain";

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

    const [loaded, setLoaded] = useState(false);

    const [head, setHead] = useState("Steve");

    useEffect(() => {
        async function getStats() {
            const parse = new URLSearchParams({
                username: await Keychain.getGenericPassword().then(res => res.username),
            });

            const { username } = await Keychain.getGenericPassword();

            setHead(username);

            axios.get(`http://191.241.144.59:25565/getUserData?${parse.toString()}`).then(res => {

                if (res.data.status === true) {
                    const data = res.data.data;

                    const trabalhado = {
                        profile: {
                            username: data.profile.name,
                            rank: data.profile.group.rank
                        },
                        skywars: {
                            profile: {
                                coins: data.skywars.profile.coins,
                                level: data.skywars.profile.level,
                                xp: data.skywars.profile.xp
                            },
                            solo: {
                                vitorias: data.skywars.solo.wins,
                                derrotas: data.skywars.solo.loses,
                                partidasTotais: data.skywars.solo.games,
                                kills: data.skywars.solo.kills,
                                winStreak: data.skywars.solo.bestWinstreak
                            },
                            team: {
                                vitorias: data.skywars.team.wins,
                                derrotas: data.skywars.team.loses,
                                partidasTotais: data.skywars.team.games,
                                kills: data.skywars.team.kills,
                                winStreak: data.skywars.team.bestWinstreak
                            }
                        }
                    };

                    setUserData(trabalhado);

                    setLoaded(true);
                }
            })
        };

        getStats()
    }, [])

    return (
        <Background> 
            <View style={styles.container}>
                <CupertinoFooter2 style={styles.cupertinoFooter2} props={{ navigation, head }}></CupertinoFooter2>
                <Image
                    source={{
                        uri: `https://mc-heads.net/head/${head}`,
                    }}
                    resizeMode="contain"
                    style={styles.image}
                ></Image>
                <View style={styles.rectRow}>
                    <View style={styles.rect}>
                        <Text style={styles.loremIpsum}>
                            Vitórias: {userData.skywars.solo.vitorias}{"\n"}Derrotas: {userData.skywars.solo.derrotas}{"\n"}Kills: {userData.skywars.solo.kills}{"\n"}Mortes: {userData.skywars.solo.derrotas}{"\n"}
                            WinStreak: {userData.skywars.solo.winStreak}{"\n"}Partidas: {userData.skywars.solo.partidasTotais}
                        </Text>
                    </View>
                    <View style={styles.rect2}>
                        <Text style={styles.loremIpsum1}>
                            Vitórias: {userData.skywars.team.vitorias}{"\n"}Derrotas: {userData.skywars.team.derrotas}{"\n"}Kills: {userData.skywars.team.kills}{"\n"}Mortes: {userData.skywars.team.derrotas}{"\n"}
                            WinStreak: {userData.skywars.team.winStreak}{"\n"}Partidas: {userData.skywars.team.partidasTotais}
                        </Text>
                    </View>
                </View>
                <View style={styles.soloRow}>
                    <Text style={styles.solo}>Solo</Text>
                    <Text style={styles.dupla}>Dupla</Text>
                </View>
                <View style={styles.rect3}>
                    <Text style={styles.loremIpsum2}>
                        Nickname: {userData.profile.username}{"\n"}Cargo: {userData.profile.rank}
                    </Text>
                </View>
            </View>
        </Background>
    )
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
        marginTop: -713,
        marginLeft: 134
    },
    rect: {
        width: 160,
        height: 230,
        backgroundColor: "rgba(230,230,230,0.67)"
    },
    loremIpsum: {
        fontFamily: "comic-sans-ms-regular",
        color: "#121212",
        height: 270,
        width: 126,
        fontSize: 20,
        marginTop: 12,
        marginLeft: 10
    },
    rect2: {
        width: 160,
        height: 230,
        backgroundColor: "rgba(230,230,230,0.67)",
        marginLeft: 21
    },
    loremIpsum1: {
        fontFamily: "comic-sans-ms-regular",
        color: "#121212",
        height: 270,
        width: 126,
        fontSize: 20,
        marginTop: 12,
        marginLeft: 14
    },
    rectRow: {
        height: 294,
        flexDirection: "row",
        marginTop: 170,
        marginLeft: 14,
        marginRight: 26
    },
    solo: {
        fontFamily: "comic-sans-ms-regular",
        color: "#121212",
        height: 60,
        width: 170,
        fontSize: 40
    },
    dupla: {
        fontFamily: "comic-sans-ms-regular",
        color: "#121212",
        height: 60,
        width: 145,
        fontSize: 40
    },
    soloRow: {
        height: 27,
        flexDirection: "row",
        marginTop: -351,
        marginLeft: 44,
        marginRight: 26
    },
    rect3: {
        width: 310,
        height: 80,
        backgroundColor: "rgba(230,230,230,0.67)",
        marginTop: -111,
        marginLeft: 24
    },
    loremIpsum2: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 65,
        width: 286,
        fontSize: 20,
        marginTop: 11,
        marginLeft: 10
    }
});