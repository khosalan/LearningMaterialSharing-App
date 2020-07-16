import React from 'react';
import {View, Text} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {HeaderButton} from '../../components';

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export const screenOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="md-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default Profile;
