import React, {useCallback, useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {CardFullView, CardBottom} from '../../components';
import {toggleFavourite} from '../../store/actions/post';

const PostDescription = ({navigation, route}) => {
  const postID = route.params.postID;
  const post = useSelector(state =>
    state.posts.allPosts.find(post => post.id === postID),
  );

  const dispatch = useDispatch();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CardFullView
        name={post.ownerName}
        time={post.time}
        title={post.title}
        description={post.description}
        imageUrl={post.imageUrl}
        links={post.links}>
        <CardBottom id={post.id} like={post.like} dislike={post.dislike} />
      </CardFullView>
    </ScrollView>
  );
};

export const screenOptions = ({route}) => {
  return {
    headerTitle: route.params.postTitle,
  };
};

export default PostDescription;
