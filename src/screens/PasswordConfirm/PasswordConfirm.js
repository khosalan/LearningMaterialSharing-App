import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, ActivityIndicator, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {deleteAccount} from '../../store/actions/auth';
import {Colors} from '../../utils/constant';
import {PasswordInput} from '../../components';
import styles from './styles';

const PasswordConfirm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const deleteAccountHandler = async () => {
    setError(null);

    try {
      setIsLoading(true);
      await dispatch(deleteAccount(password));
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  const deleteHandler = () => {
    Alert.alert(
      'Important !!!',
      'By clicking yes all your user data and the posts posted by you will be completelly removed. Are you sure about your decision',
      [
        {text: 'Yes', style: 'destructive', onPress: deleteAccountHandler},
        {text: 'No', style: 'cancel'},
      ],
    );
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

  return (
    <View style={styles.screen}>
      <PasswordInput
        label="Confirm Your password"
        placeholder="Enter your Password"
        onChangeText={setPassword}
        value={password}
      />
      <Button
        mode="contained"
        color={Colors.lightRed}
        style={styles.button}
        onPress={deleteHandler}
        disabled={password ? false : true}>
        Confirm
      </Button>
    </View>
  );
};

export default PasswordConfirm;
