import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../utils/constant';
import styles from './styles';

const Input = props => {
  return (
    <View style={styles.inputContainer}>
      <Text>{props.label}</Text>
      <View style={styles.row}>
        {props.icon && <Icon name={props.icon} style={styles.icon} />}
        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor={Colors.darkGray}
        />
      </View>
      <Text style={styles.error}>{props.error}</Text>
    </View>
  );
};

export default Input;
