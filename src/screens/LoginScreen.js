import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { validateLogin } from '../helpers/loginValidator'

import * as Keychain from "react-native-keychain";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {

    async function tryLogin() {
      try {
        const credentials = await Keychain.getGenericPassword();
        console.log(credentials);

        if (credentials) {
          const { username, password } = credentials;
          const validate = await validateLogin(username, password);
          if (validate.status === true) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            })
          }
        }
      } catch (err_suamae) {

      }
    }
    tryLogin()
  }, [])
  const onLoginPressed = async () => {

    const validate = await validateLogin(email.value, password.value);

    if (validate.status === false) {
      setEmail({ value: email.value, error: 'Nickname ou senha incorretos' });

      setPassword({ value: password.value, error: 'Nickname ou senha incorretos' });

      return;
    }

    Keychain.setGenericPassword(email.value, password.value);

    setUserDetails({ username: email.value, password: password.value});
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Página de Login.</Header>
      <TextInput
        label="Nickname"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Senha"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
