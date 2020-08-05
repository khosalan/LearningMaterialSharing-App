import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
        {!props.isFav ? (
          <View style={styles.iconButton}>
            <TouchableOpacity>
              <AntDesign name="like2" size={20} />
            </TouchableOpacity>

            <Text style={styles.count}>20</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.iconButton} onPress={props.onClick}>
          <MaterialCommunityIcons name="comment-text-outline" size={20} />
          <View style={styles.comment}>
            <Text>Comment</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favButton} onPress={handleFavourite}>
          <Ionicons name={isFav ? 'md-star' : 'md-star-outline'} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardBottom;
