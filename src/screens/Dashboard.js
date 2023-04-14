import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

// import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-9579887747665373/2252841163';

// const rewarded = RewardedAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing'],
// });

export default function Dashboard({ navigation }) {

  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //     setLoaded(true);
  //   });
  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       console.log('User earned reward of ', reward);
  //     },
  //   );

  //   // Start loading the rewarded ad straight away
  //   rewarded.load();

  //   // Unsubscribe from events on unmount
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, []);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <Background>
      <Logo />
      <Header>Painel de Stats</Header>
      <Paragraph>
        BATATA FRITAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }}
      >
        Sair baby
      </Button>
    </Background>
  )
}
