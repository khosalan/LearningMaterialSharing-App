import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import {Colors} from '../../utils/constant';
import {authenticate, tryAutoLogin} from '../../store/actions/auth';

const StartUpScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(tryAutoLogin());
        return;
      }
      const transformedData = JSON.parse(userData);
      const {
        token,
        userID,
        firstName,
        lastName,
        regNo,
        email,
      } = transformedData;

      if (!token || !userID || !firstName || !lastName || !regNo || !email) {
        dispatch(tryAutoLogin());
        return;
      }

      dispatch(authenticate(userID, token, firstName, lastName, regNo, email));
    };

    tryLogin();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartUpScreen;
