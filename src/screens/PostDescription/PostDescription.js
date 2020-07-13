import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useSelector} from 'react-redux';

import {CardFullView, CardBottom} from '../../components';

const PostDescription = ({route}) => {
  const postID = route.params.postID;
  const post = useSelector(state =>
    state.posts.allPosts.find(post => post.id === postID),
  );
  console.log(post);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CardFullView
        name={post.ownerName}
        time={post.time}
        title={post.title}
        description={post.description}
        imageUrl={post.imageUrl}
        links={post.links}>
        <CardBottom like={post.like} dislike={post.dislike} />
      </CardFullView>
    </ScrollView>
  );
};

export default PostDescription;
