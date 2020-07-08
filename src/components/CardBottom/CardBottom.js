import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const CardBottom = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton}>
        <AntDesign name="like2" size={20} />
        <Text style={styles.count}>20</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <AntDesign name="dislike2" size={20} />
        <Text style={styles.count}>4</Text>
      </TouchableOpacity>

      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.commentContainer}>
          <MaterialCommunityIcons name="comment-text-outline" size={20} />
          <View style={styles.comment}>
            <Text>Comment</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favButton}>
          <Ionicons name="md-star" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardBottom;
