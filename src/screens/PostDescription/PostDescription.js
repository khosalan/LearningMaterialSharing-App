import React, {useCallback, useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import {CardFullView, CardBottom, HeaderButton} from '../../components';
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
        <CardBottom
          id={post.id}
          like={post.like}
          dislike={post.dislike}
          navigation={navigation}
        />
      </CardFullView>
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
