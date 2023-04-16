import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

import {
  Stats
} from '../screens';

import * as Keychain from 'react-native-keychain';

function CupertinoFooter2(props) {

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity style={styles.btnWrapper1} onPress={() => props.props.navigation.navigate('Stats')}>

        <Image
          style={styles.image}
          source={{
            uri: `https://mc-heads.net/head/${props.props.head}`
          }}
        />
        <Text
          style={[
            styles.btn1Caption,
            {
              color: props.active ? "#007AFF" : "#9E9E9E"
            }
          ]}
        >
          Perfil
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper3} onPress={() => {
        props.props.navigation.navigate('Shop')
      }}>
        <Image
          style={styles.image}
          source={require('../assets/shopping.png')}
        />
        <Text style={styles.btn3Caption}>Loja</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnWrapper4}
        onPress={() => props.props.navigation.navigate('Dashboard')}
      >
        <Image
          style={styles.image}
          source={require('../assets/money.png')}
        />
        <Text style={styles.btn4Caption}>Assistir ads</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper2} onPress={() => {

        Keychain.resetGenericPassword();

        props.props.navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      }}>
        <Image
          style={styles.image}
          source={require('../assets/sair.png')}
        />
        <Text style={styles.btn2Caption}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "space-around"
  },
  btnWrapper1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    backgroundColor: "transparent",
    opacity: 0.8,
    fontSize: 24
  },
  btn1Caption: {
    backgroundColor: "transparent",
    paddingTop: 4,
    fontSize: 12
  },
  btnWrapper3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon2: {
    backgroundColor: "transparent",
    opacity: 0.8,
    fontSize: 24,
    color: "#616161"
  },
  btn3Caption: {
    backgroundColor: "transparent",
    paddingTop: 4,
    fontSize: 12,
    color: "#9E9E9E"
  },
  btnWrapper4: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon3: {
    backgroundColor: "transparent",
    opacity: 0.8,
    fontSize: 24,
    color: "#616161"
  },
  btn4Caption: {
    backgroundColor: "transparent",
    paddingTop: 4,
    fontSize: 12,
    color: "#9E9E9E"
  },
  btnWrapper2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon1: {
    backgroundColor: "transparent",
    opacity: 0.8,
    fontSize: 24,
    color: "#616161"
  },
  btn2Caption: {
    backgroundColor: "transparent",
    paddingTop: 4,
    fontSize: 12,
    color: "#9E9E9E"
  },
  btnWrapper5: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon4: {
    backgroundColor: "transparent",
    opacity: 0.8,
    fontSize: 24,
    color: "#616161"
  },
  btn5Caption: {
    backgroundColor: "transparent",
    paddingTop: 4,
    fontSize: 12,
    color: "#9E9E9E"
  }
});

export default CupertinoFooter2;
