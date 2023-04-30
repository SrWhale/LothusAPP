import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  LoginScreen,
  Dashboard,
  Stats,
  Anuncio,
  Shop,
  Perfil,
  Skywars
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {

  return (
    <Provider theme={theme}>
      <NavigationContainer
        theme={theme}>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'rgb(28, 28, 28)' },
            detachPreviousScreen: true, 
            presentation: 'transparentModal'
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} headerShown={true} />
          <Stack.Screen name="Dashboard" component={Dashboard} headerShown={true} />
          <Stack.Screen name="Stats" component={Stats} headerShown={true} />
          <Stack.Screen name="Anuncio" component={Anuncio} headerShown={true} />
          <Stack.Screen name="Shop" component={Shop} headerShown={true} />
          <Stack.Screen name="Perfil" component={Perfil} headerShown={true} />
          <Stack.Screen name="Skywars" component={Skywars} headerShown={true} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
