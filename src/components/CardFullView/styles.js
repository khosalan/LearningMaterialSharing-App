import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.darkGray,
    backgroundColor: Colors.white,
    elevation: 8,
    marginBottom: 20,
  },

  icon: {
    margin: 6,
  },

  authorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  nameContainer: {
    marginTop: 10,
    marginLeft: 5,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  time: {
    fontSize: 14,
    color: Colors.lightGray,
  },

  content: {
    marginBottom: 10,
  },

  image: {
    height: 250,
    width: '100%',
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 5,
  },

  description: {
    width: '100%',
    paddingHorizontal: 10,
    fontSize: 16,
  },

  linkContainer: {
    marginHorizontal: 10,
    marginTop: 5,
  },

  linkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  link: {
    color: Colors.blue,
    fontSize: 15,
    marginBottom: 5,
  },
});

export default styles;
