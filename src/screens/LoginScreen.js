import React, { useState, useEffect } from 'react'
import { StyleSheet, View} from 'react-native'
import Background from '../components/Background_login'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { validateLogin } from '../helpers/loginValidator'
import * as Keychain from "react-native-keychain";
import { CheckBox } from 'react-native-elements'

import { AdEventType, AppOpenAd, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = TestIds.APP_OPEN // "ca-app-pub-9579887747665373/2751975552"

let appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const [checked, setChecked] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

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
              routes: [{ name: 'Anuncio' }],
            })
          }
        } else {
          console.log("STARTING LOAD")

          const unsubscribeLoaded = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
            console.log("LOADED")
            //appOpenAd.show();
          });

          appOpenAd.load();

          return () => {
            unsubscribeLoaded();
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

    if (checked) {
      Keychain.setGenericPassword(email.value, password.value);

      setUserDetails({ username: email.value, password: password.value });
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Anuncio' }],
    })
  }

  return (
    <Background navigation={navigation}>
      <View style={{ flex: 0.3 }}>

      </View>
      <View style={styles.logo}>
      </View>
      <Logo />
      <TextInput
        label={email.error}
        leftIcon={{ type: 'font-awesome', name: 'user', color: "white" }}
        keyboardType="email-address"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        autoCapitalize="none"
      />
      <TextInput
        label={email.error}
        leftIcon={{ type: 'font-awesome', color: "white", name: 'lock' }}
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        secureTextEntry
      />
      <CheckBox
        title="MANTENHA-ME CONECTADO"
        checked={checked}
        containerStyle={{ backgroundColor: "transparent", borderColor: "transparent" }}
        textStyle={{ color: "white", fontSize: 15 }}
        uncheckedColor='white'
        checkedColor='white'
        checkedIcon="check-square"
        uncheckedIcon="square"
        onPress={() => setChecked(!checked)}
      />
      <Button mode="contained" onPress={onLoginPressed} style={{
        maxWidth: "40%",
      }}>
        Conectar
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  icon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  logo: {
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "blue"
  },
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
