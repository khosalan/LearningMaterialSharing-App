import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <Icon name="md-search" style={styles.icon} />
      <TextInput
        {...props}
        placeholder="Search"
        style={styles.input}
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;
