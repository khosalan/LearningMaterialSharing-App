import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Avatar, Text, Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {HeaderButton} from '../../components';
import styles from './styles';

const Profile = () => {
  return (
    <ScrollView>
      <TouchableOpacity style={styles.image}>
        <Avatar.Image
          source={require('../../../assets/profile.png')}
          size={100}
        />
      </TouchableOpacity>
      <Divider />
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>First name</Text>
          <Text style={styles.info}>Khosalan</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Last name</Text>
          <Text style={styles.info}>Ganesan</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Registration No</Text>
          <Text style={styles.info}>2017cs085</Text>
        </View>
      </View>

      <View style={styles.editable}>
        <TouchableOpacity style={styles.editableContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.editableLabel}>Email</Text>
            <Text style={styles.editableInfo}>khosalan18@gmail.com</Text>
          </View>
          <MaterialCommunityIcons name="pencil" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.editableContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.editableLabel}>Password</Text>
            <Text style={styles.editableInfo}>.......</Text>
          </View>
          <MaterialCommunityIcons name="pencil" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export const screenOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="md-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default Profile;
