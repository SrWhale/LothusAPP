import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from "react-native";

import Background from "../components/Background";

import * as Keychain from "react-native-keychain";

import Header from "../components/Header";

import axios from "axios";

import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = TestIds.REWARDED // "ca-app-pub-9579887747665373/2252841163"

function Untitled({ navigation }) {

    let rewarded = RewardedAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
    });

    let [waiting, setWaiting] = useState({ waiting: false });

    let [loading, setLoading] = useState({ loading: false });

    let [number, setNumber] = useState(0);

    let [interval, newSetInterval] = useState(false);

    let [timeout, newSetTimeout] = useState(false);

    let [head, setHead] = useState('Steve');

    let [LTC, setLTC] = useState(0);

    const [hasShow, setHasShow] = useState(false);

    useEffect(() => {
        async function loadNickname() {
            const { username } = await Keychain.getGenericPassword();
            setHead(username);
        };

        async function loadLTC() {

            const parse = new URLSearchParams({
                username: await Keychain.getGenericPassword().then(res => res.username)
            });

            axios.get(`http://api.mc-lothus.com:25565/getUserData?${parse.toString()}`).then(res => {
                setLTC(res.data.data.profile.cash);
            })
        }
        
        async function checkTime() {
            const parse = new URLSearchParams({
                user: await Keychain.getGenericPassword().then(res => res.username),
            });

            axios.get(`http://api.mc-lothus.com:25565/check_time?${parse.toString()}`)
                .then(res => {
                    console.log(res.data.status)
                    if (res.data.status === true) {
                        const remainTime = res.data.data;

                        setNumber(prevNumber => prevNumber + remainTime);

                        setWaiting({ waiting: true });

                        setNumber(remainTime)
                        console.log(remainTime)
                        const int = setInterval(() => {
                            setWaiting({ waiting: true });

                            setNumber(prevNumber => {
                                if (prevNumber - 1 === 1) {
                                    clearInterval(int);
                                    console.log("CLEARED!")
                                }

                                return prevNumber - 1
                            })
                        }, 1000);

                        const set = setTimeout(() => {
                            clearInterval(int);
                            console.log("ENDED")
                            setTimeout(() => {
                                setWaiting({ waiting: false });

                                setNumber(0);
                            }, 1500);
                        }, remainTime * 1000)

                        newSetTimeout(set);

                        newSetInterval(int);
                    }
                })
        };

        checkTime();

        loadNickname();

        loadLTC();
    }, []);

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        if (hasShow === true) return;
        setHasShow(true);
        rewarded.show();
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        async reward => {
            console.log("REWARDED!")
            setHasShow(false);
            unsubscribeEarned();
            unsubscribeLoaded();
            const parse = new URLSearchParams({ reward: reward.amount, user: await Keychain.getGenericPassword().then(res => res.username), Date: Date.now() });

            axios.get(`https://api.mc-lothus.com:25565/new_ads_rewarded?${parse.toString()}`)

            setNumber(prevNumber => prevNumber + 120);

            setLoading({ loading: false });

            const int = setInterval(() => {

                setNumber(prevNumber => {
                    if (prevNumber - 1 === 1) {
                        clearInterval(int);
                        console.log("CLEARED!")
                    }

                    return prevNumber - 1
                })
            }, 1000)

            const set = setTimeout(() => {
                setWaiting({ waiting: false });

                console.log("ENDED");

                clearInterval(int);
                setNumber(0)
            }, 60000 * 2);

            newSetInterval(int);
            newSetTimeout(set);
        },
    );

    function showReward() {
        console.log("STARTING SHOW KAKAPAKAPKAPK")
        setLoading({ loading: true });
        setWaiting({ waiting: true });

        rewarded.load();
    }

    return (
        <Background
            navigation={navigation}
        >
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
                    flex: 0.12
                }}>

                </View>
                <View style={{
                    flex: 0.35,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            width: "55%",
                            height: "85%",
                            padding: 1,
                        }}
                        source={require("../assets/icon.png")}
                    />
                </View>

                <TouchableOpacity
                    style={{
                        flex: 0.09,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}
                    disabled={waiting.waiting}
                    loading={loading.loading}
                    onPress={() => showReward()}
                >
                    <View style={{
                        backgroundColor: "rgb(52, 52, 52)",
                        width: "70%",
                        height: "75%",
                        borderRadius: 40,
                        flexDirection: "row",
                        paddingStart: "0%",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}>

                        <View style={{
                            backgroundColor: "rgb(52, 52, 52)",
                            width: Dimensions.get('window').width * 0.165,
                            height: Dimensions.get('window').width * 0.165,
                            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "center",
                        }}>

                            <Image
                                style={{
                                    width: "55%",
                                    height: "85%",
                                }}
                                source={require("../assets/anuncios/esmeralda.png")}
                            />

                        </View>
                        <Header customStyle={{
                            fontSize: number === 0 ? 16 : 12,
                        }}>
                            {number === 0 ? `ASSISTIR ANÚNCIOS` : `AGUARDE ${number} SEGUNDOS`}
                        </Header>

                    </View>
                </TouchableOpacity>
                <View style={{
                    flex: 0.03,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    paddingTop: "4%"
                }}>
                    <Header customStyle={{
                        fontSize: 14
                    }}>ASSITA ANÚNCIOS PARA GANHAR</Header>
                </View>

                <View style={{
                    flex: 0.03,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",

                }}>
                    <Header customStyle={{
                        fontSize: 14,
                        color: "#17DD62"
                    }}>LTC - LOTHUS COINS</Header>
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    quadrado: {
        flex: 0.44,
        backgroundColor: "blue",
        width: "100%",
        height: "90%",
    },
    author: {
        flex: 0.1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        paddingStart: "3%",
        paddingTop: "4%",
    },
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    content: {
        flex: 0.1,
    },
});

export default Untitled;