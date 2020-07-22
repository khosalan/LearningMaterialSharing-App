import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import styles from './styles';
import {Card, CardBottom, HeaderButton} from '../../components';

const Favourites = ({navigation}) => {
  const favPosts = useSelector(state => state.posts.favouritePosts);

  const onSelectPostHandler = (id, title) => {
    navigation.navigate('Description', {postID: id, postTitle: title});
  };

  const renderItem = ({item}) => {
    return (
      <Card
        name={item.ownerName}
        time={item.time}
        title={item.title}
        description={item.description}
        imageUrl={item.imageUrl}
        onSelect={() => onSelectPostHandler(item.id, item.title)}>
        <CardBottom
          id={item.id}
          like={item.like}
          dislike={item.dislike}
          navigation={navigation}
        />
      </Card>
    );
  };

  if (favPosts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Posts Found !!!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favPosts}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export const screenOptions = ({navigation}) => {
  return {
    headerTitle: 'Favourites',

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="md-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default Favourites;
