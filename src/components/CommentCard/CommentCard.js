import React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-paper';

import styles from './styles';

const CommentCard = () => {
  return (
    <View style={styles.container}>
      <Avatar.Image
        source={{
          uri:
            'https://images.theconversation.com/files/304864/original/file-20191203-67028-qfiw3k.jpeg?ixlib=rb-1.1.0&rect=638%2C2%2C795%2C745&q=45&auto=format&w=496&fit=clip',
        }}
        size={50}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>Khosalan</Text>
        <Text>Hi there </Text>
      </View>
    </View>
  );
};

export default CommentCard;
