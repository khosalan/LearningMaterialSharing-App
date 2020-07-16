import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import styles from './styles';
import {Card, CardBottom, HeaderButton, SearchBar} from '../../components';

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');

  const POSTS = useSelector(state => {
    const allPosts = state.posts.allPosts;
    if (search)
      return allPosts.filter(
        post =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase()),
      );
    return allPosts;
  });

  const onSelectPostHandler = (id, title) => {
    navigation.navigate('Description', {postID: id, postTitle: title});
  };

  const searchHandler = text => {
    setSearch(text);
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

  return (
    <View>
      <SearchBar value={search} onChangeText={searchHandler} />

      {POSTS.length === 0 ? (
        <View style={styles.centered}>
          <Text>No Posts Found !!!</Text>
        </View>
      ) : (
        <FlatList
          data={POSTS}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
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
          onPress={() => navigation.navigate('AddPost')}
        />
      </HeaderButtons>
    ),
  };
};

export default Home;
