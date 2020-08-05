import React, {useState, useReducer, useCallback, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';

import styles from './styles';
import {Colors, RegularExp} from '../../utils/constant';
import {Input} from '../../components';
import {signIn} from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {...state.inputValues, [action.input]: action.value};

    let isValid = true;

    if (
      action.input === 'email' &&
      !RegularExp.emailRegex.test(action.value.toLowerCase())
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

const SignIn = ({navigation}) => {
  const [secure, setSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error occured', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },

    inputValidities: {
      email: false,
      password: false,
    },

    formIsValid: false,
  });

  const inputChangeHandler = (inputID, text) => {
    dispatchFormState({type: FORM_INPUT_UPDATE, value: text, input: inputID});
  };

  const handleSinIn = useCallback(async () => {
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
        signIn(formState.inputValues.email, formState.inputValues.password),
      );
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Please Wait</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  const handleEyeClick = () => {
    if (secure) {
      setSecure(false);
    } else {
      setSecure(true);
    }
  };

  return (
    <ScrollView>
      <View style={styles.inputContainer}>
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

        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => {
            navigation.navigate('Forgot');
          }}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" color={Colors.blue} onPress={handleSinIn}>
          SIGN IN
        </Button>

        <View style={styles.createButton}>
          <Button
            mode="contained"
            color={Colors.lightRed}
            onPress={() => navigation.navigate('SignUp')}>
            CREATE AN ACCOUNT
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
