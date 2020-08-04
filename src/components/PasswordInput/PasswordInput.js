import React from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './styles';

const PasswordInput = props => {
  return (
    <View>
      <Text>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.inputContainer}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default PasswordInput;
