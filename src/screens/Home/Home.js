import React from 'react';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './styles';
import {Card, CardBottom} from '../../components';

const Home = ({navigation}) => {
  const posts = useSelector(state => state.posts.allPosts);

  const onSelectPostHandler = id => {
    navigation.navigate('Description', {postID: id});
  };

  const renderItem = ({item}) => (
    <Card
      name={item.ownerName}
      time={item.time}
      title={item.title}
      description={item.description}
      imageUrl={item.imageUrl}
      onSelect={() => onSelectPostHandler(item.id)}>
      <CardBottom like={item.like} dislike={item.dislike} />
    </Card>
  );

  return <FlatList data={posts} renderItem={renderItem} />;
};

export default Home;
