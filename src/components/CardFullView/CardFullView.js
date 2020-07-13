import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
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
          <Text style={styles.time}>{props.time}</Text>
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
          {props.links && <Text style={styles.linkTitle}>Usefull Links</Text>}
          {props.links
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
