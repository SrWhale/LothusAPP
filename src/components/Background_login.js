import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, StatusBar, View } from 'react-native'
import { theme } from '../core/theme'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Background({ children }) {

  return (

    <ImageBackground
      style={styles.background}
      source={require("../assets/login/background.png")}
      blurRadius={3}
    >
      <StatusBar translucent backgroundColor={"transparent"} />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    shadowOffset: { width: 5, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.5,
    elevation: 7,
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#90ee90',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
})
