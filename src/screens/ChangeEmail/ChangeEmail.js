import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, ActivityIndicator, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';

import {changeEmail} from '../../store/actions/auth';
import {Colors, RegularExp} from '../../utils/constant';
import {PasswordInput} from '../../components';
import styles from './styles';

const ChangeEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const submitHandler = async () => {
    setError(null);

    try {
      setIsLoading(true);
      await dispatch(changeEmail(password, email));
      Toast.show(
        'Email changed successfully. Please login again',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{text: 'Okay'}]);
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Please Wait</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  const emailInputHandler = text => {
    RegularExp.emailRegex.test(text.toLowerCase())
      ? setEmailIsValid(true)
      : setEmailIsValid(false);

    setEmail(text);
  };

  const passwordChangeHandler = text => {
    password.trim().length < 6
      ? setPasswordIsValid(false)
      : setPasswordIsValid(true);

    setPassword(text);
  };

  return (
    <View style={styles.screen}>
      <PasswordInput
        label="Confirm Your password"
        placeholder="Enter your Password"
        onChangeText={passwordChangeHandler}
        value={password}
      />
      {!passwordIsValid && (
        <Text style={styles.error}>
          Please enter a password with atleast 6 characters{' '}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <Text>New Email Address</Text>

        <TextInput
          style={styles.email}
          placeholder="Enter new email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={emailInputHandler}
        />
        {!emailIsValid && (
          <Text style={styles.error}>Please enter a valid email address</Text>
        )}
      </View>

      <Button
        mode="contained"
        color={Colors.lightRed}
        style={styles.button}
        onPress={submitHandler}
        disabled={passwordIsValid && emailIsValid ? false : true}>
        Confirm
      </Button>
    </View>
  );
};

export default ChangeEmail;
