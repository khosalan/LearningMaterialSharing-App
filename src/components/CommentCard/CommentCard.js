import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import moment from 'moment';

import styles from './styles';

const CommentCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <Avatar.Image
          source={require('../../../assets/profile2.png')}
          size={50}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{props.ownerName}</Text>
          <Text>{props.comment}</Text>
        </View>
      </View>
      <Text style={styles.time}>
        {moment(
          moment(props.time * 1000).format('YYYYMMDDkkmmss'),
          'YYYYMMDDkkmmss',
        ).fromNow()}
      </Text>
    </View>
  );
};

export default CommentCard;
