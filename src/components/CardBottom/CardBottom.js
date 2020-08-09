import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {toggleFavourite} from '../../store/actions/post';

import styles from './styles';

const CardBottom = props => {
  const dispatch = useDispatch();

  const {id} = props;

  const handleFavourite = () => {
    dispatch(toggleFavourite(id));
  };

  const isFav = useSelector(state =>
    state.posts.favouritePosts.some(post => post.id === id),
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={props.onClick}>
          <MaterialCommunityIcons name="comment-text-outline" size={20} />
          <View style={styles.comment}>
            <Text>Comment</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favButton} onPress={handleFavourite}>
          <Ionicons name={isFav ? 'md-star' : 'md-star-outline'} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardBottom;
