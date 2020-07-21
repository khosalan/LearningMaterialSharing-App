import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import moment from 'moment';
import {Avatar} from 'react-native-paper';

import styles from './styles';

const CardFullView = props => {
  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Avatar.Image
          size={50}
          source={require('../../../assets/avatar.jpeg')}
          style={styles.icon}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.time}>
            {moment(
              moment(props.time * 1000).format('YYYYMMDDkkmmss'),
              'YYYYMMDDkkmmss',
            ).fromNow()}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {props.imageUrl ? (
          <Image
            source={{
              uri: props.imageUrl,
            }}
            style={styles.image}
          />
        ) : null}
        <Text style={styles.title}>{props.title}</Text>

        <Text style={styles.description}>{props.description}</Text>

        <View style={styles.linkContainer}>
          {console.log(props.links)}
          {props.links.length !== 0 && props.links[0] !== '' && (
            <Text style={styles.linkTitle}>Usefull Links</Text>
          )}
          {props.links.length !== 0 && props.links[0] !== ''
            ? props.links.map(link => (
                <Text
                  key={link}
                  style={styles.link}
                  onPress={() => Linking.openURL(link)}>
                  {link}
                </Text>
              ))
            : null}
        </View>
      </View>

      <View>{props.children}</View>
    </View>
  );
};

export default CardFullView;
