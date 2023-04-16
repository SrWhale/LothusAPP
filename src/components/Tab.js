import React from 'react'
import { StyleSheet } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';

import ProfileScreen from '../screens/Stats';
import ShopScreen from '../screens/Dashboard';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function TabNav({ children }) {

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Profile"
                tabBarOptions={{
                    activeTintColor: '#e91e63',
                    style: styles.tabBar,
                }}>
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Perfil',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="user" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Shop"
                    component={ShopScreen}
                    options={{
                        tabBarLabel: 'Loja',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="shopping-bag" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.5,
        elevation: 5,
    }
})
