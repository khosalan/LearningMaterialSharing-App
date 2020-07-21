import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  View,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import {CardFullView, CardBottom, HeaderButton} from '../../components';
import {Colors} from '../../utils/constant';
import * as postActions from '../../store/actions/post';

const PostDescription = ({navigation, route}) => {
  const postID = route.params.postID;
  const post = useSelector(state =>
    state.posts.allPosts.find(post => post.id === postID),
  );

  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHandler = () => {
    Alert.alert('Are you sure', 'Do you really want to delete this post?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsDeleting(true);
            await dispatch(postActions.deletePost(postID));
            navigation.goBack();
          } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG);
          }
          setIsDeleting(false);
        },
      },
    ]);
  };

  if (isDeleting) {
    return (
      <View style={styles.centered}>
        <Text>Deleting</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {post && (
        <CardFullView
          name={post.ownerName}
          time={post.time}
          title={post.title}
          description={post.description}
          imageUrl={post.imageUrl}
          links={post.links}>
          <CardBottom
            id={post.id}
            like={post.like}
            dislike={post.dislike}
            navigation={navigation}
          />
        </CardFullView>
      )}

      {route.params.editable && (
        <TouchableOpacity
          style={styles.deleteContainer}
          onPress={deleteHandler}>
          <Text style={styles.deleteText}>Delete Post</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export const screenOptions = ({navigation, route}) => {
  const editable = route.params.editable;
  const postID = route.params.postID;

  return {
    headerTitle: route.params.postTitle,

    headerRight: () =>
      editable ? (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Edit"
            iconName="md-create"
            onPress={() => navigation.navigate('AddPost', {postID})}
          />
        </HeaderButtons>
      ) : null,
  };
};

export default PostDescription;
