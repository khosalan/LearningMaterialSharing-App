import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from '../../utils/constant';
import {Profile, screenOptions as profileScreenOptions} from '../Profile';
import DeleteAccount from '../DeleteAccount';
import ChangePassword from '../ChangePassword';
import ChangeEmail from '../ChangeEmail';

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
        name="ChangeEmail"
        component={ChangeEmail}
        options={{headerTitle: 'Change Email'}}
      />

      <Stack.Screen
        name="Delete"
        component={DeleteAccount}
        options={{headerTitle: 'Delete Account'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
