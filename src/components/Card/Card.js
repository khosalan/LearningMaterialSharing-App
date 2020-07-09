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
          <Text style={styles.name}>Khosalan Ganesan</Text>
          <Text style={styles.time}>2h ago</Text>
        </View>
      </View>

      <View style={styles.touchable}>
        <TouchableCmp
          onPress={() => props.navigation.navigate('Description')}
          useForeground>
          <View style={styles.content}>
            <Image
              source={{
                uri:
                  'https://www.nanotechmag.com/wp-content/uploads/2020/04/dreamstime_xxl_162140282-702x336.jpg',
              }}
              style={styles.image}
            />
            <Text style={styles.title}>Nano Technology</Text>

            <Text numberOfLines={3} style={styles.description}>
              This is the description. This is the description. This is the
              description. This is the description. This is the description.
              This is the description. This is the description. This is the
              description. This is the description. This is the description.
            </Text>
          </View>
        </TouchableCmp>
      </View>

      <CardBottom />
    </View>
  );
};

export default Card;
