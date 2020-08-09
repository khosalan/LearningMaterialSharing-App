import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import ForgotPassword from '../ForgotPassword';
import {Colors} from '../../utils/constant';
import WelcomeScreen from '../WelcomeScreen';

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
        },
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          title: 'SIGN IN',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'SIGN IN',
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'SIGN UP',
          headerLeft: null,
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
