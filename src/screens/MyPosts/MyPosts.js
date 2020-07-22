import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import styles from './styles';
import {HeaderButton, Card, CardBottom} from '../../components';

const MyPosts = ({navigation}) => {
  const myPosts = useSelector(state => state.posts.myPosts);

  const onSelectPostHandler = (id, title) => {
    navigation.navigate('Description', {
      postID: id,
      postTitle: title,
      editable: true,
    });
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

  if (myPosts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>You haven't added any posts yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={myPosts}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export const screenOptions = ({navigation}) => {
  return {
    headerTitle: 'My Posts',

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
          onPress={() => navigation.navigate('AddPost')}
        />
      </HeaderButtons>
    ),
  };
};

export default MyPosts;
