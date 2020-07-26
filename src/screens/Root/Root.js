import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import StartUpScreen from '../../screens/StartUpScreen';
import AuthNavigation from '../Navigations/AuthNavigation';
import MainNavigation from '../Navigations/ManiNavigation';

const Root = () => {
  const isAuth = useSelector(state => !!state.auth.token);
  const tryAutoLogin = useSelector(state => !!state.auth.tryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <MainNavigation />}
      {!isAuth && tryAutoLogin && <AuthNavigation />}
      {!isAuth && !tryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  );
};

export default Root;
