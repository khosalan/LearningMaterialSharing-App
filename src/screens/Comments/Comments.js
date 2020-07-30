import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {CommentCard} from '../../components';
import styles from './styles';
import {Colors} from '../../utils/constant';
import {addComments, fetchComments} from '../../store/actions/comment';

const Comments = ({route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const postID = route.params.postID;

  const dispatch = useDispatch();

  const loadComment = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchComments(postID));
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error occured', error, [{text: 'Okay'}]);
    }
  }, [error]);

  useEffect(() => {
    loadComment();
  }, [loadComment, dispatch]);

  const postHandler = () => {
    try {
      dispatch(addComments(postID, 'Some comments'));
    } catch (e) {}
  };

  const comments = useSelector(state => state.comment.comments);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  const rednerItem = ({item}) => {
    return (
      <CommentCard
        owner={item.owner}
        ownerName={item.ownerName}
        comment={item.comment}
        time={item.time}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.comments}>
        {comments.length === 0 ? (
          <View style={styles.centered}>
            <Text>No Comments Yet</Text>
          </View>
        ) : (
          <FlatList data={comments} renderItem={rednerItem} />
        )}
      </View>

      <View style={styles.commentInput}>
        <TextInput
          placeholder="Leave your commets here...."
          multiline
          autoCorrect={false}
          style={styles.input}
        />

        <TouchableOpacity onPress={postHandler}>
          <Text style={styles.post}>POST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
