import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {Home, Favourites} from '..';

const Root = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="md-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({color, size}) => (
            <Icon name="md-star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Root;
