import React, { useState, useEffect } from 'react'

import Background from '../components/Background'

import { StyleSheet, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'

import * as Keychain from "react-native-keychain";

import Header from "../components/Header";

import axios from "axios";
import { SafeAreaView } from 'react-native';

export default function SkyWars({ navigation }) {

    const [userData, setUserData] = useState(false);

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
                setUserData(res.data.data)
            })
        };

        getStats()
    }, []);

    if (!userData) {
        return null;
    }

    return (
        <Background navigation={navigation}>
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

                    <View style={{
                        flex: 0.75,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"

                    }}>
                        <Header customStyle={{
                            color: "#17DD62",
                        }}>
                            SKY
                        </Header>
                        <Header>
                            WARS
                        </Header>
                    </View>

                    <View style={{
                        flex: 0.1
                    }}>
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
                                { } {userData.profile.group.rank}
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

                <SafeAreaView style={{
                    flex: 0.65,
                }}>
                    <ScrollView style={{
                        height: "100%",
                    }}>
                        {/* SOLO */}
                        <View style={{
                            paddingBottom: 20
                        }}>
                            <View style={{
                                backgroundColor: "white",
                                width: "50%",
                                height: 70,
                                borderBottomEndRadius: 40,
                                borderTopEndRadius: 40,
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <View style={{
                                    backgroundColor: "rgb(48, 48, 48)",
                                    width: "99%",
                                    height: 67,
                                    borderBottomEndRadius: 40,
                                    borderTopEndRadius: 40,
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Header customStyle={{
                                        color: "#17DD62",
                                        fontSize: 35
                                    }}>
                                        SOLO
                                    </Header>

                                </View>
                            </View>

                            <View style={{
                                width: "85%",
                                height: 130,
                                flexDirection: "row"
                            }}>
                                <View style={{
                                    backgroundColor: "rgb(48, 48, 48)",
                                    width: "100%",
                                    height: "90%",
                                    alignSelf: "center",
                                    flexDirection: "row",
                                }}>

                                    <View style={{
                                        flex: 0.5,
                                        flexDirection: "column",
                                    }}>
                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/vitorias.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                VITÓRIAS: {userData.skywars.solo.wins}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/derrota.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                DERROTAS: {userData.skywars.solo.loses}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/kills.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                KILLS: {userData.skywars.solo.kills}
                                            </Header>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 0.5,
                                        flexDirection: "column",
                                    }}>
                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/partida.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                PARTIDAS: {userData.skywars.solo.wins + userData.skywars.solo.loses}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/killstreak.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                WINSTREAK: {userData.skywars.solo.bestWinstreak}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/mortes.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                MORTES: {userData.skywars.solo.loses}
                                            </Header>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    paddingTop: 10,
                                    backgroundColor: "white",
                                    width: "2%",
                                    height: "90%",
                                    alignSelf: "center"
                                }}>
                                </View>
                            </View>
                        </View>

                        {/* DUPLA */}
                        <View style={{
                            paddingBottom: 20
                        }}>
                            <View style={{
                                backgroundColor: "white",
                                width: "50%",
                                height: 70,
                                borderBottomEndRadius: 40,
                                borderTopEndRadius: 40,
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <View style={{
                                    backgroundColor: "rgb(48, 48, 48)",
                                    width: "99%",
                                    height: 67,
                                    borderBottomEndRadius: 40,
                                    borderTopEndRadius: 40,
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Header customStyle={{
                                        color: "#17DD62",
                                        fontSize: 35
                                    }}>
                                        DUPLA
                                    </Header>

                                </View>
                            </View>

                            <View style={{
                                width: "85%",
                                height: 130,
                                flexDirection: "row"
                            }}>
                                <View style={{
                                    backgroundColor: "rgb(48, 48, 48)",
                                    width: "100%",
                                    height: "90%",
                                    alignSelf: "center",
                                    flexDirection: "row",
                                }}>

                                    <View style={{
                                        flex: 0.5,
                                        flexDirection: "column",
                                    }}>
                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/vitorias.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                VITÓRIAS: {userData.skywars.dupla?.wins || 0}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/derrota.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                DERROTAS: {userData.skywars.dupla?.loses || 0}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/kills.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                KILLS: {userData.skywars.dupla?.kills || 0}
                                            </Header>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 0.5,
                                        flexDirection: "column",
                                    }}>
                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/partida.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                PARTIDAS: {(userData.skywars.dupla?.wins || 0) + (userData.skywars.dupla?.loses || 0)}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/killstreak.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                WINSTREAK: {userData.skywars.dupla?.bestWinstreak || 0}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/mortes.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                MORTES: {userData.skywars.dupla?.loses || 0}
                                            </Header>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    paddingTop: 10,
                                    backgroundColor: "white",
                                    width: "2%",
                                    height: "90%",
                                    alignSelf: "center"
                                }}>
                                </View>
                            </View>
                        </View>

                        {/* TRIO */}
                        <View style={{
                            paddingBottom: 20
                        }}>
                            <View style={{
                                backgroundColor: "white",
                                width: "50%",
                                height: 70,
                                borderBottomEndRadius: 40,
                                borderTopEndRadius: 40,
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <View style={{
                                    backgroundColor: "rgb(48, 48, 48)",
                                    width: "99%",
                                    height: 67,
                                    borderBottomEndRadius: 40,
                                    borderTopEndRadius: 40,
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Header customStyle={{
                                        color: "#17DD62",
                                        fontSize: 35
                                    }}>
                                        TRIO
                                    </Header>

                                </View>
                            </View>

                            <View style={{
                                width: "85%",
                                height: 130,
                                flexDirection: "row"
                            }}>
                                <View style={{
                                    backgroundColor: "rgb(48, 48, 48)",
                                    width: "100%",
                                    height: "90%",
                                    alignSelf: "center",
                                    flexDirection: "row",
                                }}>

                                    <View style={{
                                        flex: 0.5,
                                        flexDirection: "column",
                                    }}>
                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/vitorias.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                VITÓRIAS: {userData.skywars.trio?.wins || 0}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/derrota.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                DERROTAS: {userData.skywars.trio?.loses || 0}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/kills.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                KILLS: {userData.skywars.trio?.kills || 0}
                                            </Header>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 0.5,
                                        flexDirection: "column",
                                    }}>
                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/partida.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                PARTIDAS: {(userData.skywars.trio?.wins || 0) + (userData.skywars.trio?.loses || 0)}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/killstreak.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                WINSTREAK: {userData.skywars.trio?.bestWinstreak || 0}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/mortes.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                MORTES: {userData.skywars.trio?.loses || 0}
                                            </Header>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    paddingTop: 10,
                                    backgroundColor: "white",
                                    width: "2%",
                                    height: "90%",
                                    alignSelf: "center"
                                }}>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            paddingBottom: 20
                        }}>
                            <View style={{
                                backgroundColor: "white",
                                width: "50%",
                                height: 70,
                                borderBottomEndRadius: 40,
                                borderTopEndRadius: 40,
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <View style={{
                                    backgroundColor: "rgb(48, 48, 48)",
                                    width: "99%",
                                    height: 67,
                                    borderBottomEndRadius: 40,
                                    borderTopEndRadius: 40,
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Header customStyle={{
                                        color: "#17DD62",
                                        fontSize: 30
                                    }}>
                                        QUARTETO
                                    </Header>

                                </View>
                            </View>

                            <View style={{
                                width: "85%",
                                height: 130,
                                flexDirection: "row"
                            }}>
                                <View style={{
                                    backgroundColor: "rgb(48, 48, 48)",
                                    width: "100%",
                                    height: "90%",
                                    alignSelf: "center",
                                    flexDirection: "row",
                                }}>

                                    <View style={{
                                        flex: 0.5,
                                        flexDirection: "column",
                                    }}>
                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/vitorias.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                VITÓRIAS: {userData.skywars.quarteto?.wins || 0}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/derrota.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                DERROTAS: {userData.skywars.quarteto?.loses || 0}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/kills.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                KILLS: {userData.skywars.quarteto?.kills || 0}
                                            </Header>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 0.5,
                                        flexDirection: "column",
                                    }}>
                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/partida.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                PARTIDAS: {(userData.skywars.quarteto?.wins || 0) + (userData.skywars.quarteto?.loses || 0)}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/killstreak.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                WINSTREAK: {userData.skywars.quarteto?.bestWinstreak || 0}
                                            </Header>
                                        </View>

                                        <View style={{
                                            flex: 0.33,
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: "20%",
                                                    height: "80%",
                                                    alignSelf: "center"
                                                }}
                                                source={require("../assets/StatsDetalhados/mortes.png")}
                                            />

                                            <Header customStyle={{
                                                fontSize: 15,
                                                alignSelf: "center"
                                            }}>
                                                MORTES: {userData.skywars.quarteto?.loses || 0}
                                            </Header>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    paddingTop: 10,
                                    backgroundColor: "white",
                                    width: "2%",
                                    height: "90%",
                                    alignSelf: "center"
                                }}>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </SafeAreaView>
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
        justifyContent: "space-around",
        alignItems: "center",
    },
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    author: {
        flex: 0.1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        paddingStart: "3%",
        paddingTop: "4%",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    content: {
        flex: 0.25,
        width: "100%",
        height: "100%",
        flexDirection: "row",
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
});