import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.darkGray,
    borderBottomColor: Colors.darkGray,
  },

  icon: {
    margin: 6,
  },

  authorContainer: {
    flexDirection: 'row',
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
    marginLeft: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  description: {
    width: '100%',
  },
});

export default styles;
