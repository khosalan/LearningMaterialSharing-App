import React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-paper';

import styles from './styles';
import CardBottom from '../CardBottom';

const Card = () => {
  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Avatar.Image
          size={50}
          source={require('../../../assets/avatar.jpeg')}
          style={styles.icon}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Khosalan Ganesan</Text>
          <Text style={styles.time}>2h ago</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Nano Technology</Text>
        <Text numberOfLines={3} style={styles.description}>
          This is the description. This is the description. This is the
          description. This is the description. This is the description. This is
          the description. This is the description. This is the description.
          This is the description. This is the description.
        </Text>
      </View>

      <CardBottom />
    </View>
  );
};

export default Card;
