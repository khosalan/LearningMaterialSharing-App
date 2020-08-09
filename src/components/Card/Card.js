import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
} from 'react-native';
import moment from 'moment';
import {Avatar} from 'react-native-paper';

import styles from './styles';

const Card = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Avatar.Image
          size={50}
          source={
            props.avatar
              ? {uri: props.avatar}
              : require('../../../assets/profile2.png')
          }
          style={styles.icon}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.time}>
            {moment(
              moment(props.time * 1000).format('YYYYMMDDkkmmss'),
              'YYYYMMDDkkmmss',
            ).fromNow()}
          </Text>
        </View>
      </View>

      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={styles.content}>
            {props.imageUrl ? (
              <Image
                source={{
                  uri: props.imageUrl,
                }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : null}
            <Text style={styles.title}>{props.title}</Text>

            <Text numberOfLines={4} style={styles.description}>
              {props.description}
            </Text>
          </View>
        </TouchableCmp>
      </View>

      <View>{props.children}</View>
    </View>
  );
};

export default Card;
