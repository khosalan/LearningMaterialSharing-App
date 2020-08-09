import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Divider, Avatar, Text} from 'react-native-paper';
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
import ProfileNavigation from './ProfileNavigation';

import {logout} from '../../store/actions/auth';

const HomeNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.red,
        keyboardHidesTabBar: true,
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

const MainNavigation = () => {
  const avatar = useSelector(state => state.auth.profilePic);
  const userName =
    useSelector(state => state.auth.firstName) +
    ' ' +
    useSelector(state => state.auth.lastName);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const Drawer = createDrawerNavigator();

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(logout());
    } catch (e) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Please wait</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

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
              <Divider />
            </View>
            <View style={{marginVertical: 20, justifyContent: 'center'}}>
              <Divider />
              <DrawerItem
                label="Log Out"
                onPress={logoutHandler}
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
        component={ProfileNavigation}
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
