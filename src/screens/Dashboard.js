import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import { StyleSheet, Dimensions, Text, View, Image } from 'react-native'
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

import MaterialButtonPrimary from '../components/MaterialButtonPrimary';

import CupertinoFooter2 from "../components/Navigation";

import * as Keychain from "react-native-keychain";

import axios from "axios";

const adUnitId = TestIds.REWARDED // "ca-app-pub-9579887747665373/2252841163"

export default function Dashboard({ navigation }) {

  let rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });
  
  let [waiting, setWaiting] = useState({ waiting: false });

  let [loading, setLoading] = useState({ loading: false });

  let [number, setNumber] = useState(0);

  let [interval, newSetInterval] = useState(false);

  let [timeout, newSetTimeout] = useState(false);

  const [head, setHead] = useState("Steve");

  const [hasShow, setHasShow] = useState(false);

  useEffect(() => {

    async function loadNickname() {
      const { username } = await Keychain.getGenericPassword();
      setHead(username);
    };

    loadNickname();
    async function checkTime() {
      const parse = new URLSearchParams({
        user: await Keychain.getGenericPassword().then(res => res.username),
      });

      axios.get(`http://191.241.144.59:25565/check_time?${parse.toString()}`)
        .then(res => {
          console.log(res.data.status)
          if (res.data.status === true) {
            const remainTime = res.data.data;

            setNumber(prevNumber => prevNumber + remainTime);

            setWaiting({ waiting: true });

            setNumber(remainTime)
            console.log(remainTime)
            const int = setInterval(() => {
              setWaiting({ waiting: true });

              setNumber(prevNumber => {
                if (prevNumber - 1 === 1) {
                  clearInterval(int);
                  console.log("CLEARED!")
                }

                return prevNumber - 1
              })
            }, 1000);

            const set = setTimeout(() => {
              clearInterval(int);
              console.log("ENDED")
              setTimeout(() => {
                setWaiting({ waiting: false });

                setNumber(0);
              }, 1500);
            }, remainTime * 1000)

            newSetTimeout(set);

            newSetInterval(int);
          }
        })
    };

    checkTime()
  }, []);

  const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
    if (hasShow === true) return;
    setHasShow(true);
    rewarded.show();
  });

  const unsubscribeEarned = rewarded.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    async reward => {
      console.log("REWARDED!")
      setHasShow(false);
      unsubscribeEarned();
      unsubscribeLoaded();
      const parse = new URLSearchParams({ reward: reward.amount, user: await Keychain.getGenericPassword().then(res => res.username), Date: Date.now() });

      axios.get(`http://191.241.144.59:25565/new_ads_rewarded?${parse.toString()}`)

      setNumber(prevNumber => prevNumber + 120);

      setLoading({ loading: false });

      const int = setInterval(() => {

        setNumber(prevNumber => {
          if (prevNumber - 1 === 1) {
            clearInterval(int);
            console.log("CLEARED!")
          }

          return prevNumber - 1
        })
      }, 1000)

      const set = setTimeout(() => {
        setWaiting({ waiting: false });

        console.log("ENDED");

        clearInterval(int);
        setNumber(0)
      }, 60000 * 2);

      newSetInterval(int);
      newSetTimeout(set);
    },
  );

  function showReward() {
    console.log("STARTING SHOW KAKAPAKAPKAPK")
    setLoading({ loading: true });
    setWaiting({ waiting: true });

    rewarded.load();
  }

  return (
    <Background>
      <View style={styles.container}>
        <Logo />
        <Header>Assistir anúncios</Header>
        <Button
          mode="Assistir anúncio"
          loading={loading.loading}
          disabled={waiting.waiting}
          onPress={() => showReward()}
        >
          {number === 0 ? `Assistir anúncio` : `Aguarde ${number} segundos`}
        </Button>

        <Button
          mode="outlined"
          onPress={() => {
            Keychain.resetGenericPassword();

            if (interval) clearInterval(interval);

            if (timeout) clearTimeout(timeout);

            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            });
          }}
        >
          Deslogar
        </Button>
      </View>

      <CupertinoFooter2 style={styles.cupertinoFooter2} props={{ navigation, head }}>

      </CupertinoFooter2>
    </Background >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  cupertinoFooter2: {
    height: 75,
    width: 400,
    position: 'absolute', bottom: 0, left: -26, right: 0,
    padding: 0,
    alignSelf: null,
    alignItems: null,
    justifyContent: null
  },
  image: {
    width: 92,
    height: 81,
    marginTop: -597,
    marginLeft: 134
  },
  materialButtonPrimary: {
    height: 54,
    width: 140,
    marginTop: 82,
    marginLeft: 113
  },
  loremIpsum: {
    fontFamily: "comic-sans-ms-regular",
    color: "#121212",
    height: 89,
    width: 312,
    fontSize: 20,
    marginTop: 39,
    marginLeft: 28
  },
  assistirAnuncios: {
    fontFamily: "comic-sans-ms-regular",
    color: "#121212",
    height: 48,
    width: 232,
    fontSize: 25,
    marginTop: -240,
    marginLeft: 77
  }
});
