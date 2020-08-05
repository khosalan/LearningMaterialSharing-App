import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import ForgotPassword from '../ForgotPassword';
import {Colors} from '../../utils/constant';

const AuthNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blue,
          height: 60,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'SIGN IN',
          headerRight: () => (
            <MaterialCommunityIcons
              name="login"
              style={{fontSize: 26, color: Colors.white, marginRight: 15}}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'SIGN UP',
          headerLeft: null,
          headerRight: () => (
            <MaterialCommunityIcons
              name="account-plus"
              style={{fontSize: 26, color: Colors.white, marginRight: 15}}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Forgot"
        component={ForgotPassword}
        options={{title: 'Forgot Password', headerTitleStyle: {fontSize: 22}}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
