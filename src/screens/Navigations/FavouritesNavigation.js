import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Favourites, screenOptions as favScreenOptions} from '../Favourites';
import {
  PostDescription,
  screenOptions as postScreenOptions,
} from '../PostDescription';
import Comments from '../Comments';

import {Colors} from '../../utils/constant';

const FavouritesNavigation = () => {
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
        name="Favourite"
        component={Favourites}
        options={favScreenOptions}
      />
      <Stack.Screen
        name="Description"
        component={PostDescription}
        options={postScreenOptions}
      />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

export default FavouritesNavigation;
