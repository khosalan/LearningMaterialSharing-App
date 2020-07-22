import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Button} from 'react-native';

import styles from './styles';
import {Colors} from '../../utils/constant';
import {Input} from '../../components';

const SignIn = ({navigation}) => {
  const [secure, setSecure] = useState(true);

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
        />

        <TouchableOpacity style={styles.forgotContainer} onPress={() => {}}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="SIGN IN" color={Colors.blue} onPress={() => {}} />

        <View style={styles.createButton}>
          <Button
            title="CREATE AN ACCOUNT"
            color={Colors.lightRed}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
