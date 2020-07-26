import React from 'react';
import {View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Avatar, Text, Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import {HeaderButton} from '../../components';
import styles from './styles';

const Profile = () => {
  const firstName = useSelector(state => state.auth.firstName);
  const lastName = useSelector(state => state.auth.lastName);
  const regNo = useSelector(state => state.auth.regNo);

  const deleteHandler = () => {
    Alert.alert('Are your sure', 'Do you really want to delte your account?', [
      {text: 'Yes'},
      {text: 'No', style: 'cancel'},
    ]);
  };

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
          <Text style={styles.info}>{firstName}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Last name</Text>
          <Text style={styles.info}>{lastName}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Registration No</Text>
          <Text style={styles.info}>{regNo}</Text>
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

        <Divider />

        <View style={styles.deleteContainer}>
          <Text style={styles.editableLabel}>Advanced</Text>
          <Text style={styles.deleteText} onPress={deleteHandler}>
            Delete account
          </Text>
        </View>
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
