import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {Input} from '../../components';
import {RegularExp, Colors} from '../../utils/constant';
import styles from './styles';
import {resetPassword} from '../../store/actions/auth';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const textHandler = text => {
    RegularExp.emailRegex.test(text.toLowerCase())
      ? setIsValid(true)
      : setIsValid(false);

    setEmail(text);
  };

  const sumitHandler = async () => {
    setError(null);
    try {
      setIsLoading(true);
      await dispatch(resetPassword(email));
      setIsLoading(false);
      Alert.alert('Success', 'Password reset email sent successfully', [
        {text: 'Okay', onPress: () => navigation.navigate('SignIn')},
      ]);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{text: 'Okay'}]);
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <Input
        placeholder="Email address"
        label="Email Address"
        icon="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error="Please enter a valid email address"
        onChangeText={textHandler}
        value={email}
        isError={isValid}
      />

      {!isLoading ? (
        <Button
          mode="contained"
          style={styles.button}
          color={Colors.lightRed}
          disabled={!isValid}
          onPress={sumitHandler}>
          Send email
        </Button>
      ) : (
        <ActivityIndicator size="large" color={Colors.lightRed} />
      )}
    </View>
  );
};

export default ForgotPassword;
