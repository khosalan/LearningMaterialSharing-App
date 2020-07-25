import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import AuthNavigation from '../Navigations/AuthNavigation';
import MainNavigation from '../Navigations/ManiNavigation';

const Root = () => {
  const isAuth = useSelector(state => !!state.auth.token);

  return (
    <NavigationContainer>
      {isAuth && <MainNavigation />}
      {!isAuth && <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Root;
