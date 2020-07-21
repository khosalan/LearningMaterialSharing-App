import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import {Card, CardBottom, HeaderButton, SearchBar} from '../../components';
import {Colors} from '../../utils/constant';
import * as postActions from '../../store/actions/post';

const Home = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  const loadPost = useCallback(async () => {
    try {
      await dispatch(postActions.fetchPosts());
    } catch (e) {}
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadPost().then(() => {
      setIsLoading(false);
    });
  }, [loadPost]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <View>
      <SearchBar value={search} onChangeText={searchHandler} />

      {POSTS.length === 0 ? (
        <View style={styles.noPost}>
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
