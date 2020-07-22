import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../utils/constant';
import styles from './styles';

const Input = props => {
  //console.log(props);
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
        {props.rightIcon && (
          <TouchableOpacity onPress={props.clickRight}>
            <Icon name={props.rightIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
      {!props.isError && <Text style={styles.error}>{props.error}</Text>}
    </View>
  );
};

export default Input;
