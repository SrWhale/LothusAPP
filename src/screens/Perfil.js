import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from "react-native";

import Background from "../components/Background";

import * as Keychain from "react-native-keychain";

import Header from "../components/Header";

import axios from "axios";

function Untitled({ navigation }) {

    let [head, setHead] = useState('Steve');

    let [data, setData] = useState({
        group: {
            rank: "Membro"
        },
        discordTag: {
            username: "Desconhecido",
            discriminator: "0000"
        }
    });

    useEffect(() => {
        async function loadNickname() {
            const { username } = await Keychain.getGenericPassword();
            setHead(username);
        };

        async function loadData() {

            const parse = new URLSearchParams({
                username: await Keychain.getGenericPassword().then(res => res.username)
            });

            axios.get(`http://api.mc-lothus.com:25565/getUserData?${parse.toString()}`).then(res => {
                setData(res.data.data.profile);
            })
        }

        loadNickname();

        loadData()
    }, []);

    return (
        <Background
            navigation={navigation}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.author}>
                    <View style={{
                        flex: 0.15,
                        width: "80%",
                        height: "90%",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center"
                    }}>

                        <Image
                            style={{
                                width: "90%",
                                height: "85%",
                            }}
                            source={require("../assets/perfil/seta.png")}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.content}>
                    <View style={styles.quadrado}>
                        <View style={{
                            flex: 0.15,
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                        }}>
                            <Header customStyle={{
                                color: "#17DD62",
                                fontSize: 18
                            }}>
                                NICK:
                            </Header>
                            <Header customStyle={{
                                fontSize: 18
                            }}>
                                { } {head.toUpperCase()}
                            </Header>
                        </View>

                        <View style={{
                            flex: 0.15,
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                        }}>
                            <Header customStyle={{
                                color: "#17DD62",
                                fontSize: 18
                            }}>
                                CARGO:
                            </Header>
                            <Header customStyle={{
                                fontSize: 18
                            }}>
                                { } {data.group.rank}
                            </Header>
                        </View>
                    </View>

                    <View style={styles.quadrado_2}>
                        <Image
                            style={{
                                width: "45%",
                                height: "80%",
                            }}
                            source={{
                                uri: `https://mc-heads.net/body/${head}`
                            }}
                        />
                    </View>
                </View>

                <View style={styles.modules}>
                    <View style={styles.module}>
                        <View style={{
                            flex: 0.7,
                            backgroundColor: "rgb(52, 52, 52)",
                            width: "80%",
                            height: "90%",
                            borderRadius: 40,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>

                            <Image
                                style={{
                                    width: "50%",
                                    height: "70%",
                                    flex: 0.6
                                }}
                                source={require('../assets/perfil/discord.png')}
                            />

                            <Header customStyle={{
                                fontSize: 17
                            }} >
                                {data.discordTag ? data.discordTag.username.toUpperCase() : "Não vinculado"}
                            </Header>
                            <Header customStyle={{
                                fontSize: 17,
                                color: "#17DD62"
                            }} >
                                #{data.discordTag ? data.discordTag.discriminator : "0000"}
                            </Header>

                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Stats")}
                        style={styles.module}>
                        <View style={{
                            flex: 0.8,
                            backgroundColor: "rgb(52, 52, 52)",
                            width: "80%",
                            height: "90%",
                            borderRadius: 40,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>

                            <Image
                                style={{
                                    width: "15%",
                                    height: "80%",
                                    alignSelf: "flex-end"
                                }}
                                source={require('../assets/perfil/prancheta.png')}
                            />

                            <Header customStyle={{
                                fontSize: 17
                            }} >
                                ESTATIS
                            </Header>
                            <Header customStyle={{
                                fontSize: 17,
                                color: "#17DD62"
                            }} >
                                TICAS
                            </Header>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    modules: {
        flex: 0.5,
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },
    module: {
        flex: 0.23,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    quadrado: {
        flex: 0.65,
        width: "100%",
        height: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    quadrado_2: {
        flex: 0.35,
        width: "100%",
        height: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
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
        flex: 0.25,
        width: "100%",
        height: "100%",
        flexDirection: "row",
    },
});

export default Untitled;