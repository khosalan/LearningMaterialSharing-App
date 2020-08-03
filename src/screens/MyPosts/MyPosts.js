import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import styles from './styles';
import {HeaderButton, Card, CardBottom} from '../../components';
import {fetchMyPosts} from '../../store/actions/post';
import {Colors} from '../../utils/constant';

const MyPosts = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const loadPost = useCallback(async () => {
    try {
      await dispatch(fetchMyPosts());
    } catch (e) {
      setError(e.message);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadPost().then(() => {
      setError(null);
      setIsLoading(false);
    });
  }, [loadPost]);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error occured', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const posts = useSelector(state => state.posts.myPosts);

  const onSelectPostHandler = (id, title) => {
    navigation.navigate('Description', {
      postID: id,
      postTitle: title,
      editable: true,
    });
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
        avatar={item.avatar}
        onSelect={() => onSelectPostHandler(item.id, item.title)}>
        <CardBottom
          id={item.id}
          like={item.like}
          dislike={item.dislike}
          navigation={navigation}
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

  if (posts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>You haven't added any posts yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
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
