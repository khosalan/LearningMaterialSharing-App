import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// import {Favourites} from '..';
import {Colors} from '../../utils/constant';
import HomeNavigation from '../Navigations/HomeNavigation';
import Favourites from '../Favourites';

const Root = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.red,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
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
