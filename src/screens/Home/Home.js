import React from 'react';
import {View, FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import styles from './styles';
import {Card, CardBottom, HeaderButton} from '../../components';

const Home = ({navigation}) => {
  const posts = useSelector(state => state.posts.allPosts);

  const onSelectPostHandler = (id, title) => {
    navigation.navigate('Description', {postID: id, postTitle: title});
  };

  const renderItem = ({item}) => (
    <Card
      name={item.ownerName}
      time={item.time}
      title={item.title}
      description={item.description}
      imageUrl={item.imageUrl}
      onSelect={() => onSelectPostHandler(item.id, item.title)}>
      <CardBottom like={item.like} dislike={item.dislike} />
    </Card>
  );

  return <FlatList data={posts} renderItem={renderItem} />;
};

export const screenOptions = ({navigation}) => {
  return {
    headerTitle: 'E-Learn Share',

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="md-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="md-add-circle"
          onPress={() => console.log('Pressed')}
        />
      </HeaderButtons>
    ),
  };
};

export default Home;
