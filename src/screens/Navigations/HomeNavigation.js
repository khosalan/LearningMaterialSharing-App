import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, screenOptions as homeScreenOptions} from '../Home';
import {
  PostDescription,
  screenOptions as postScreenOptions,
} from '../PostDescription';

import {Colors} from '../../utils/constant';

const HomeNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blue,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Home" component={Home} options={homeScreenOptions} />
      <Stack.Screen
        name="Description"
        component={PostDescription}
        options={postScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
