import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, PostDescription} from '..';

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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Description" component={PostDescription} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
