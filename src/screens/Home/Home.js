import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, Text, ActivityIndicator, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import {Card, CardBottom, HeaderButton, SearchBar} from '../../components';
import {Colors} from '../../utils/constant';
import * as postActions from '../../store/actions/post';

const Home = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  const loadPost = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(postActions.fetchPosts());
      await dispatch(postActions.fetchFavourites());
    } catch (e) {
      setError(e.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error occured', error, [{text: 'Okay'}]);
    }
  }, [error]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', loadPost);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [loadPost]);

  useEffect(() => {
    setIsLoading(true);
    loadPost().then(() => {
      setError(null);
      setIsLoading(false);
    });
  }, [loadPost, dispatch]);

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

  const commentsHandler = postID => {
    navigation.navigate('Comments', {postID});
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
          onClick={() => commentsHandler(item.id)}
        />
      </Card>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <SearchBar value={search} onChangeText={searchHandler} />

      {POSTS.length === 0 ? (
        <View style={styles.noPost}>
          <Text>No Posts Found !!!</Text>
        </View>
      ) : (
        <FlatList
          onRefresh={loadPost}
          refreshing={isRefreshing}
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
