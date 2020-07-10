import React from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import {Card} from '../../components';
import POSTS from '../../data/dummy-data';

const Home = ({navigation}) => {
  return (
    <FlatList
      data={POSTS}
      renderItem={({item}) => (
        <Card
          name={item.ownerName}
          time={item.time}
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
          like={item.like}
          dislike={item.dislike}
        />
      )}
    />
  );
};

export default Home;
