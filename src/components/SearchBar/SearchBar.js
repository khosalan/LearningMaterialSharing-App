import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {Colors} from '../../utils/constant';

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <Icon name="md-search" style={styles.icon} />
      <TextInput
        {...props}
        placeholder="Search"
        style={styles.input}
        autoCorrect={false}
        placeholderTextColor={Colors.darkGray}
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;
