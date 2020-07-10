import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
} from 'react-native';
import {Avatar} from 'react-native-paper';

import styles from './styles';
import CardBottom from '../CardBottom';

const Card = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Avatar.Image
          size={50}
          source={require('../../../assets/avatar.jpeg')}
          style={styles.icon}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.time}>{props.time}</Text>
        </View>
      </View>

      <View style={styles.touchable}>
        <TouchableCmp
          //onPress={() => props.navigation.navigate('Description')}
          useForeground>
          <View style={styles.content}>
            {props.imageUrl ? (
              <Image
                source={{
                  uri: props.imageUrl,
                }}
                style={styles.image}
              />
            ) : null}
            <Text style={styles.title}>{props.title}</Text>

            <Text numberOfLines={4} style={styles.description}>
              {props.description}
            </Text>
          </View>
        </TouchableCmp>
      </View>

      <CardBottom like={props.like} dislike={props.dislike} />
    </View>
  );
};

export default Card;
