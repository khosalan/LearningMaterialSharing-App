import React from 'react';
import {View, ScrollView} from 'react-native';

import styles from './styles';
import {Card} from '../../components';

const Home = ({navigation}) => {
  return (
    <ScrollView style={styles.screen}>
      <Card navigation={navigation} />
      <Card />
    </ScrollView>
  );
};

export default Home;
