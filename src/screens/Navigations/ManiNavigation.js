import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../utils/constant';
import HomeNavigation from '../Navigations/HomeNavigation';
import FavouritesNavigation from '../Navigations/FavouritesNavigation';
import MyPostsNavigation from '../Navigations/MyPostsNavigation';
import {Profile, screenOptions as profileScreenOptions} from '../Profile';

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
        component={FavouritesNavigation}
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

const ProfileNavigator = () => {
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
    </Stack.Navigator>
  );
};

const MainNavigation = () => {
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
      <Drawer.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          drawerIcon: props => (
            <MaterialCommunityIcons
              name="account-outline"
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="MyPosts"
        component={MyPostsNavigation}
        options={{
          drawerIcon: props => (
            <MaterialCommunityIcons
              name="book-open-outline"
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigation;
