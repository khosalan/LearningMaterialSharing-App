import React from 'react';
import {View, Text, Image, Linking, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {Avatar} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';

import styles from './styles';

const CardFullView = props => {
  const downloadFile = (url, title) => {
    let dir = RNFetchBlob.fs.dirs.DownloadDir;
    const options = {
      //fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        path: dir + `/${title}`, // this is the path where your downloaded file will live in
        description: 'Downloading doc',
      },
    };

    RNFetchBlob.config({...options})
      .fetch('GET', url)
      .then(res => {
        Toast.show('Downloaded success', Toast.LONG, Toast.BOTTOM);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Avatar.Image
          size={50}
          source={
            props.avatar
              ? {uri: props.avatar}
              : require('../../../assets/profile2.png')
          }
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
            resizeMode="contain"
          />
        ) : null}
        <Text style={styles.title}>{props.title}</Text>

        <Text style={styles.description}>{props.description}</Text>

        <View style={styles.linkContainer}>
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

        {props.document !== '' && props.document ? (
          <View style={styles.linkContainer}>
            <Text style={styles.linkTitle}>Useful Document</Text>
            <TouchableOpacity
              onPress={() => downloadFile(props.document, props.title)}>
              <Text style={styles.link}>Download the Material</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <View>{props.children}</View>
    </View>
  );
};

export default CardFullView;
