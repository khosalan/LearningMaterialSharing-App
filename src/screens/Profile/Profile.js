import React, {createRef, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Avatar, Text, Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';

import {HeaderButton} from '../../components';
import styles from './styles';
import {
  uploadProfilePicture,
  deleteProfilePicture,
} from '../../store/actions/auth';
import {Colors} from '../../utils/constant';

const Profile = ({navigation}) => {
  const firstName = useSelector(state => state.auth.firstName);
  const lastName = useSelector(state => state.auth.lastName);
  const regNo = useSelector(state => state.auth.regNo);
  const email = useSelector(state => state.auth.email);
  const profilePic = useSelector(state => state.auth.profilePic);

  const dispatch = useDispatch();

  const [image, setImage] = useState(profilePic);
  const [isLoading, setIsLoading] = useState(false);

  const bs = createRef();
  const fall = new Animated.Value(1);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
        dispatch(uploadProfilePicture(image.path));
      })
      .catch(e => {
        console.log(e);
      });
    bs.current.snapTo(1);
  };

  const chooseFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
        dispatch(uploadProfilePicture(image.path));
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
      });

    bs.current.snapTo(1);
  };

  const removePicture = () => {
    setIsLoading(true);
    dispatch(deleteProfilePicture())
      .then(() => {
        setImage(null);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        alert(e.message);
      });
  };

  const renderContent = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.panelButton} onPress={chooseFromGallery}>
        <Text style={styles.panelButtonTitle}>Choose From Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.panelButton,
          backgroundColor: image ? Colors.lightRed : Colors.darkGray,
        }}
        onPress={removePicture}
        disabled={image ? false : true}>
        <Text style={styles.panelButtonTitle}>Remove Profile Picture</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Please Wait</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{opacity: Animated.add(0.4, Animated.multiply(fall, 1.0))}}>
        <TouchableOpacity
          style={styles.image}
          onPress={() => bs.current.snapTo(0)}>
          <Avatar.Image
            source={
              image ? {uri: image} : require('../../../assets/profile2.png')
            }
            size={120}
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
              <Text style={styles.editableInfo}>{email}</Text>
            </View>
            <MaterialCommunityIcons name="pencil" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.editableContainer}>
            <View style={styles.infoContainer}>
              <Text style={{...styles.editableLabel, marginBottom: 0}}>
                Password
              </Text>
              <Text style={styles.password}>.......</Text>
            </View>
            <MaterialCommunityIcons name="pencil" style={styles.icon} />
          </TouchableOpacity>

          <Divider />

          <View style={styles.deleteContainer}>
            <Text style={styles.editableLabel}>Advanced</Text>
            <Text
              style={styles.deleteText}
              onPress={() =>
                navigation.navigate('Password', {title: 'Delete Account'})
              }>
              Delete account
            </Text>
          </View>
        </View>
      </Animated.View>
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
