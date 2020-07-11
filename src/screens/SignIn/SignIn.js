import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import {Colors} from '../../utils/constant';

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
              <Icon name={secure ? 'eye-off' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          }
        />

        <TouchableOpacity style={styles.forgotContainer} onPress={() => {}}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="SIGN IN"
          buttonStyle={{backgroundColor: Colors.blue}}
          onPress={() => {}}
        />

        <View style={styles.createButton}>
          <Button
            title="CREATE AN ACCOUNT"
            buttonStyle={{backgroundColor: Colors.lightRed}}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
