import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import {Favourites} from '..';
import {Colors} from '../../utils/constant';
import HomeNavigation from '../Navigations/HomeNavigation';
import Favourites from '../Favourites';

const HomeNavigator = () => {
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
            <Ionicons name="md-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Root = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContentOptions={{activeTintColor: Colors.red}}>
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          drawerIcon: props => (
            <MaterialCommunityIcons
              name="home-outline"
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Root;
