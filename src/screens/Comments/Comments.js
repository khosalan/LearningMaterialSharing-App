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
  const [comment, setComment] = useState('');

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

  const commentHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(addComments(postID, comment));
      setComment('');
    } catch (e) {}
    setIsLoading(false);
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

  const renderItem = ({item}) => {
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
          <FlatList data={comments} renderItem={renderItem} />
        )}
      </View>

      <View style={styles.commentInput}>
        <TextInput
          placeholder="Leave your comments here...."
          multiline
          autoCorrect={false}
          style={styles.input}
          onChangeText={setComment}
          value={comment}
        />

        <TouchableOpacity
          onPress={commentHandler}
          disabled={comment.trim().length === 0 ? true : false}>
          <Text
            style={{
              ...styles.post,
              color:
                comment.trim().length === 0 ? Colors.darkGray : Colors.blue,
            }}>
            POST
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
