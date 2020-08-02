import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import {Colors} from '../../utils/constant';
import HomeNavigation from './HomeNavigation';
import FavouritesNavigation from './FavouritesNavigation';
import MyPostsNavigation from './MyPostsNavigation';
import {Profile, screenOptions as profileScreenOptions} from '../Profile';
import PasswordConfirm from '../PasswordConfirm';
import {logout} from '../../store/actions/auth';
import {View} from 'react-native';
import {Divider, Avatar, Text} from 'react-native-paper';

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

      <Stack.Screen
        name="Password"
        component={PasswordConfirm}
        options={{headerTitle: 'Delete Account'}}
      />
    </Stack.Navigator>
  );
};

const MainNavigation = () => {
  const avatar = useSelector(state => state.auth.profilePic);
  const userName =
    useSelector(state => state.auth.firstName) +
    ' ' +
    useSelector(state => state.auth.lastName);

  const dispatch = useDispatch();
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContentOptions={{activeTintColor: Colors.red}}
      initialRouteName="Home"
      drawerContent={props => (
        <DrawerContentScrollView contentContainerStyle={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image
                source={
                  avatar
                    ? {uri: avatar}
                    : require('../../../assets/profile.png')
                }
                size={70}
                style={{margin: 15}}
              />
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>{userName}</Text>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
              <DrawerItemList {...props} />
            </View>
            <View style={{marginVertical: 20, justifyContent: 'center'}}>
              <Divider />
              <DrawerItem
                label="Log Out"
                onPress={() => dispatch(logout())}
                icon={props => (
                  <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color={props.color}
                  />
                )}
              />
              <Divider />
            </View>
          </View>
        </DrawerContentScrollView>
      )}>
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
