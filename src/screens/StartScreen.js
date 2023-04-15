import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

import { validateLogin } from '../helpers/loginValidator'

import config from '../../config.json';

import { AdEventType, AppOpenAd, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = TestIds.APP_OPEN // "ca-app-pub-9579887747665373/2751975552"
console.log(adUnitId)
let appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function StartScreen({ navigation }) {

  useEffect(() => {
    console.log("STARTING LOAD")

    const unsubscribeLoaded = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      console.log("LOADED")
      appOpenAd.show();
    });

    appOpenAd.load();

    return () => {
      unsubscribeLoaded();
    }
  }, [])
  return (
    <Background>
      <Logo />
      <Header>LothusMC</Header>
      <Paragraph>
        Bem vindo! Clique no botão abaixo para se direcionar à página de login
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>

      {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}

    </Background>
  )
};
