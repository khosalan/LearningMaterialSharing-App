import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {Card} from '../../components';

const Home = () => {
  return (
    <View style={styles.screen}>
      <Card />
      <Card />
    </View>
  );
};

export default Home;
