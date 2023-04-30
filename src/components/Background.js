import React from 'react'
import { StyleSheet, KeyboardAvoidingView, StatusBar, View, Image, TouchableOpacity, Dimensions } from 'react-native'

import Header from '../components/Header'

import * as Keychain from "react-native-keychain";

export default function Background({ children, navigation }) {

    return (
        <View style={styles.background}>
            <StatusBar backgroundColor={"rgb(28, 28, 28)"} />
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                {children}
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={styles.movimentationBar} behavior="position" enabled>
                <View style={styles.barView}>

                    <TouchableOpacity
                        style={styles.barViewItem}
                        onPress={() => navigation.navigate('Shop')}
                    >
                        <Image
                            source={require("../assets/carrinho.png")}
                            style={{
                                width: "50%",
                                height: "80%",
                            }}
                        />
                        <Header
                            customStyle={{
                                fontSize: 14.5,
                            }}
                        >
                            LOJA
                        </Header>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.moneyBarViewItem}
                        onPress={() => navigation.navigate('Anuncio')}
                    >
                        <Image
                            source={require("../assets/saco_de_dinheiro.png")}
                            style={{
                                width: "70%",
                                height: "92%",
                            }}
                        />

                        <Header
                            customStyle={{
                                fontSize: 14.5,
                            }}
                        >
                            ANÚNCIOS
                        </Header>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.barViewItem}
                        onPress={async () => {
                            Keychain.resetGenericPassword();

                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'LoginScreen' }],
                            });
                        }}
                    >
                        <Image
                            source={require("../assets/porta.png")}
                            style={{
                                width: "50%",
                                height: "90%",
                            }}
                        />

                        <Header
                            customStyle={{
                                fontSize: 14.5,
                            }}
                        >
                            SAIR
                        </Header>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'rgb(28, 28, 28)',
        shadowColor: '#000',
        shadowOpacity: 0.5,
    },
    background: {
        flex: 1,
        backgroundColor: "rgb(28, 28, 28)",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    container: {
        flex: 0.90,
        width: "100%",
        height: "100%",
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    movimentationBar: {
        flex: 0.10,
        width: '100%',
        height: "100%",
        backgroundColor: "rgb(52, 52, 52)",
    },
    barView: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%",
    },
    barViewItem: {
        flex: 0.33,
        alignItems: "center",
        backgroundColor: "rgb(52, 52, 52)",
        height: "80%"
    },
    moneyBarViewItem: {
        flex: 0.33,
        alignItems: "center",
        height: "80%"
    }
})
