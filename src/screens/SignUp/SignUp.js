import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import {Colors} from '../../utils/constant';

const SignUp = ({navigation}) => {
  const [secure, setSecure] = useState(true);

  const handleEyeClick = () => {
    if (secure) {
      setSecure(false);
    } else {
      setSecure(true);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={10}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Input
            placeholder="First Name"
            label="First Name"
            leftIcon={<Icon name="account" size={24} color="black" />}
            autoCorrect={false}
          />
          <Input
            placeholder="Last Name"
            label="Last Name"
            leftIcon={<Icon name="account" size={24} color="black" />}
            autoCorrect={false}
          />

          <Input
            placeholder="Registration Number"
            label="Registration Number"
            leftIcon={<Icon name="pencil" size={24} color="black" />}
            autoCorrect={false}
          />

          <Input
            placeholder="Email address"
            label="Email Address"
            leftIcon={<Icon name="email" size={24} color="black" />}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            placeholder="Password"
            label="Password"
            leftIcon={<Icon name="lock" size={24} color="black" />}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={secure}
            rightIcon={
              <TouchableOpacity onPress={handleEyeClick}>
                <Icon
                  name={secure ? 'eye-off' : 'eye'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            }
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="SIGN UP"
            buttonStyle={{backgroundColor: Colors.blue}}
          />

          <View style={styles.createButton}>
            <Button
              title="ALREADY HAVE AN ACCOUNT"
              buttonStyle={{backgroundColor: Colors.lightRed}}
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
