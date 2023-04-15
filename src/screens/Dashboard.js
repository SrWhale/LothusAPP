import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

import * as Keychain from "react-native-keychain";

import axios from "axios";

const adUnitId = TestIds.REWARDED // "ca-app-pub-9579887747665373/2252841163"

let rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

let waiting = false;

export default function Dashboard({ navigation }) {

  let [waiting, setWaiting] = useState({ waiting: false });

  let [loading, setLoading] = useState({ loading: false });

  let [number, setNumber] = useState(0);

  let [interval, newSetInterval] = useState(false);

  let [timeout, newSetTimeout] = useState(false);

  useEffect(() => {
    async function checkTime() {
      const parse = new URLSearchParams({
        user: await Keychain.getGenericPassword().then(res => res.username),
      });

      axios.get(`http://20.206.200.239:25565/check_time?${parse.toString()}`)
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
  }, [])
  function showReward() {
    console.log("STARTING SHOW KAKAPAKAPKAPK")
    setLoading({ loading: true });
    setWaiting({ waiting: true });

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log(rewarded);
      rewarded.show();
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      async reward => {

        const parse = new URLSearchParams({ reward: reward.amount, user: await Keychain.getGenericPassword().then(res => res.username), Date: Date.now() });

        axios.get(`http://20.206.200.239:25565/new_ads_rewarded?${parse.toString()}`)

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

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }

  return (
    <Background>
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
    </Background >
  )
}
