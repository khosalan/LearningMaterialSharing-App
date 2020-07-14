import React, {useState, useReducer} from 'react';
import {ScrollView, View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {HeaderButton, Input} from '../../components';
import styles from './styles';
import * as postActions from '../../store/actions/post';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {...state.inputValues, [action.input]: action.value};

    return {
      inputValues: updatedValues,
    };
  }
  return state;
};

const AddPost = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: '',
      description: '',
      imageUrl: '',
    },

    inputValidities: {
      title: false,
      description: false,
      imageUrl: true,
      links: true,
    },

    formIsValid: false,
  });

  const inputChangeHandler = (inputID, text) => {
    dispatchFormState({type: FORM_INPUT_UPDATE, value: text, input: inputID});
  };

  return (
    <ScrollView style={styles.screen}>
      <Input
        label="Title"
        error="Please enter a title"
        placeholder="Enter a title"
        icon="pencil"
        onChangeText={inputChangeHandler.bind(this, 'title')}
      />

      <Input
        label="Description"
        error="Please enter desctiption"
        placeholder="Enter desctiption"
        multiline
        onChangeText={inputChangeHandler.bind(this, 'description')}
      />

      <Input
        label="Cover Image"
        placeholder="Image url, will be displayed in the post"
        icon="image"
        onChangeText={inputChangeHandler.bind(this, 'imageUrl')}
      />

      <Input
        label="Usefull Links (Place every links in a new line)"
        placeholder="Enter every links in a new line "
        multiline
        onChangeText={text => setInput(text.split(/\n/))}
      />

      <Button
        title="submit"
        onPress={() =>
          dispatch(
            postActions.createPost(
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              input,
            ),
          )
        }
      />
      {console.log(formState)}
    </ScrollView>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: 'Create a Post',

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="md-checkmark-circle"
          onPress={() => console.log('Pressed')}
        />
      </HeaderButtons>
    ),
  };
};

export default AddPost;
