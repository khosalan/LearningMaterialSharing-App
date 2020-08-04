import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {PasswordInput} from '../../components';
import {Colors} from '../../utils/constant';
import styles from './styles';
import {changePassword} from '../../store/actions/auth';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    setError(null);
    if (
      password.length < 6 ||
      newPassword.length < 6 ||
      confirmPassword.length < 6
    ) {
      setError('Invalid Password length');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Password does not match');
      return;
    }
    try {
      setIsLoading(true);
      await dispatch(changePassword(password, newPassword));
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{text: 'Okay'}]);
      setError(null);
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Please wait</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <PasswordInput
          label="Old Password"
          placeholder="Enter Your Old Password"
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.spacer} />

        <PasswordInput
          label="New Password"
          placeholder="Enter New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <View style={styles.spacer} />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Your New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.spacer} />

        <Button mode="contained" color={Colors.blue} onPress={submitHandler}>
          Submit
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ChangePassword;
