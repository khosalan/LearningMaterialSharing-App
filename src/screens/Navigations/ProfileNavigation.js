import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from '../../utils/constant';
import {Profile, screenOptions as profileScreenOptions} from '../Profile';
import PasswordConfirm from '../PasswordConfirm';
import ChangePassword from '../ChangePassword';

const ProfileNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blue,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={profileScreenOptions}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerTitle: 'Change Password'}}
      />

      <Stack.Screen
        name="Delete"
        component={PasswordConfirm}
        options={{headerTitle: 'Delete Account'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
