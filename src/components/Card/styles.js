import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderTopColor: Colors.darkGray,
    borderBottomColor: Colors.darkGray,
    backgroundColor: Colors.white,
    elevation: 3,
    borderRadius: 15,
    marginHorizontal: 10,
  },

  icon: {
    margin: 6,
    marginLeft: 0,
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
    height: 200,
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
  },

  touchable: {
    overflow: 'hidden',
  },
});

export default styles;
