import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {SignUp, SignIn} from '..';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

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
        options={{title: 'SIGN IN'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: 'SIGN UP', headerLeft: null}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;