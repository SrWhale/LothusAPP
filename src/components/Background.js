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
      >
        <StatusBar translucent backgroundColor={"#90ee90"} />
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>

  )
  // return (
  //   <ImageBackground
  //     source={require('../assets/background_dot.png')}
  //     resizeMode="repeat"
  //     style={styles.background}
  //   >
  //     <KeyboardAvoidingView style={styles.container} behavior="padding">
  //       {children}
  //     </KeyboardAvoidingView>
  //   </ImageBackground>
  // )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
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
    justifyContent: 'center',
  },
})
