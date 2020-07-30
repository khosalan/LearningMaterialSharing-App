import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import {CommentCard} from '../../components';
import styles from './styles';

const Comments = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.comments}>
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </View>

      <View style={styles.commentInput}>
        <TextInput
          placeholder="Leave your commets here...."
          multiline
          autoCorrect={false}
          style={styles.input}
        />

        <TouchableOpacity>
          <Text style={styles.post}>POST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
