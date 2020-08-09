import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper';

import styles from './styles';
import {Colors} from '../../utils/constant';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.about}>
          <Image source={require('../../../assets/logo.png')} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.title}>Share Your Knowledge...</Text>
        <Text style={styles.text}>Sign in with your account</Text>

        <TouchableOpacity
          style={styles.getStart}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.textStart}>Get Started</Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color={Colors.blue}
          />
        </TouchableOpacity>

        <Text style={styles.label}>Project By:</Text>

        <Text style={styles.me}>Ganesan Khosalan</Text>
        <Text style={styles.me}>17000858</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
