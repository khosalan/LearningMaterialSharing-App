import React, {useState, useReducer, useCallback, useEffect} from 'react';
import {ScrollView, View, Text, Alert, ActivityIndicator} from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';

import {Input} from '../../components';
import styles from './styles';
import {Colors} from '../../utils/constant';
import * as postActions from '../../store/actions/post';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {...state.inputValues, [action.input]: action.value};

    let isValid = action.value.trim().length !== 0 ? true : false;

    if (action.input === 'imageUrl') isValid = true;

    const updateValidities = {
      ...state.inputValidities,
      [action.input]: isValid,
    };

    let updatedFormIsValid = true;

    for (let key in updateValidities) {
      updatedFormIsValid = updatedFormIsValid && updateValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updateValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const AddPost = ({navigation, route}) => {
  const postID = route.params ? route.params.postID : null;
  const editPost = useSelector(state =>
    state.posts.myPosts.find(post => post.id === postID),
  );

  const [input, setInput] = useState(
    editPost ? editPost.links.toString().replace(/,/, `\n`) : '',
  );

  var [documentPath, setDocumentPath] = useState();
  var [documentName, setDocumentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error occured', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editPost ? editPost.title : '',
      description: editPost ? editPost.description : '',
      imageUrl: editPost ? editPost.imageUrl : '',
    },

    inputValidities: {
      title: editPost ? true : false,
      description: editPost ? true : false,
      imageUrl: true,
    },

    formIsValid: editPost ? true : false,
  });

  const inputChangeHandler = (inputID, text) => {
    dispatchFormState({type: FORM_INPUT_UPDATE, value: text, input: inputID});
  };

  const documentPickHandler = () => {
    FilePickerManager.showFilePicker(response => {
      if (response.didCancel) {
        Toast.show('Cancelled the File Selection');
      } else if (response.error) {
        Toast.show('Something went wrong');
      } else {
        setDocumentPath(response.path);
        setDocumentName(response.fileName);
      }
    });
  };

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form', [
        {text: 'Okay'},
      ]);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (editPost) {
        await dispatch(
          postActions.updatePost(
            postID,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            input.split(/\n/),
          ),
        );
      } else {
        await dispatch(
          postActions.createPost(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            input.split(/\n/),
            documentPath,
          ),
        );
      }
      navigation.goBack();
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, [dispatch, postID, formState, input, documentPath]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        {editPost ? (
          <Text>Saving your Post</Text>
        ) : (
          <Text>Creating a new Post</Text>
        )}
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <Input
        label="Title"
        error="Please enter a title"
        isError={formState.inputValidities.title}
        placeholder="Enter a title"
        icon="pencil"
        value={formState.inputValues.title}
        onChangeText={inputChangeHandler.bind(this, 'title')}
        autocorrect={false}
      />

      <Input
        label="Description"
        error="Please enter desctiption"
        isError={formState.inputValidities.description}
        placeholder="Enter description"
        multiline
        value={formState.inputValues.description}
        onChangeText={inputChangeHandler.bind(this, 'description')}
        autocorrect={false}
      />

      <Input
        label="Cover Image"
        placeholder="Image url, will be displayed in the post"
        icon="image"
        value={formState.inputValues.imageUrl}
        onChangeText={inputChangeHandler.bind(this, 'imageUrl')}
        autocorrect={false}
        autoCapitalize="none"
      />

      <Input
        label="Useful Links (Place every links in a new line)"
        placeholder="Enter every links in a new line "
        multiline
        value={input}
        onChangeText={text => setInput(text)}
        autocorrect={false}
        autoCapitalize="none"
      />

      {!editPost && (
        <View style={styles.uploadDocument}>
          <Text>Upload a Document</Text>
          <Button
            mode="contained"
            style={styles.chooseButton}
            onPress={documentPickHandler}>
            {documentName ? documentName : 'Choose a file'}
          </Button>
        </View>
      )}

      <Button
        mode="contained"
        onPress={submitHandler}
        color={Colors.blue}
        disabled={!formState.formIsValid}>
        {editPost ? 'Edit post' : 'Add post'}
      </Button>
    </ScrollView>
  );
};

export const screenOptions = ({route}) => {
  const postID = route.params ? route.params.postID : null;
  return {
    headerTitle: postID ? 'Edit a Post' : 'Create a Post',
  };
};

export default AddPost;
