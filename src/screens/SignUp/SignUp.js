import React, {useState, useReducer, useEffect, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {Input} from '../../components';
import {Colors} from '../../utils/constant';
import {signUp} from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {...state.inputValues, [action.input]: action.value};

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;

    if (
      (action.input === 'firstName' ||
        action.input === 'lastName' ||
        action.input === 'regNo') &&
      action.value.trim().length === 0
    ) {
      isValid = false;
    }

    if (
      action.input === 'email' &&
      !emailRegex.test(action.value.toLowerCase())
    ) {
      isValid = false;
    }

    if (action.input === 'password' && action.value.length < 6) {
      isValid = false;
    }

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

const SignUp = ({navigation}) => {
  const [secure, setSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error occured', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstName: '',
      lastName: '',
      regNo: '',
      email: '',
      password: '',
    },

    inputValidities: {
      firstName: false,
      lastName: false,
      regNo: false,
      email: false,
      password: false,
    },

    formIsValid: false,
  });

  const inputChangeHandler = (inputID, text) => {
    dispatchFormState({type: FORM_INPUT_UPDATE, value: text, input: inputID});
  };

  const handleSinUp = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form', [
        {text: 'Okay'},
      ]);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await dispatch(
        signUp(
          formState.inputValues.firstName,
          formState.inputValues.lastName,
          formState.inputValues.regNo,
          formState.inputValues.email,
          formState.inputValues.password,
        ),
      );
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  const handleEyeClick = () => {
    if (secure) {
      setSecure(false);
    } else {
      setSecure(true);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Please Wait</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={10}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Input
            placeholder="First Name"
            label="First Name"
            icon="account"
            autoCorrect={false}
            error="Please enter your first name"
            value={formState.inputValues.firstName}
            onChangeText={inputChangeHandler.bind(this, 'firstName')}
            isError={formState.inputValidities.firstName}
          />
          <Input
            placeholder="Last Name"
            label="Last Name"
            icon="account"
            autoCorrect={false}
            error="Please enter your last name"
            value={formState.inputValues.lastName}
            onChangeText={inputChangeHandler.bind(this, 'lastName')}
            isError={formState.inputValidities.lastName}
          />

          <Input
            placeholder="Registration Number"
            label="Registration Number"
            icon="pencil"
            autoCorrect={false}
            error="Please enter your registration number"
            value={formState.inputValues.regNo}
            onChangeText={inputChangeHandler.bind(this, 'regNo')}
            isError={formState.inputValidities.regNo}
          />

          <Input
            placeholder="Email address"
            label="Email Address"
            icon="email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error="Please enter a valid email address"
            value={formState.inputValues.email}
            onChangeText={inputChangeHandler.bind(this, 'email')}
            isError={formState.inputValidities.email}
          />

          <Input
            placeholder="Password"
            label="Password"
            icon="lock"
            rightIcon={secure ? 'eye-off' : 'eye'}
            clickRight={handleEyeClick}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={secure}
            error="Please enter a password with atleast 6 characters"
            value={formState.inputValues.password}
            onChangeText={inputChangeHandler.bind(this, 'password')}
            isError={formState.inputValidities.password}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="SIGN UP" color={Colors.blue} onPress={handleSinUp} />

          <View style={styles.alreadyButton}>
            <Button
              title="ALREADY HAVE AN ACCOUNT"
              color={Colors.lightRed}
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
