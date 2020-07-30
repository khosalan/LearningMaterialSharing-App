import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  comments: {
    flex: 1,
    marginBottom: 10,
  },

  commentInput: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    marginRight: 5,
  },

  post: {
    color: Colors.blue,
    fontSize: 16,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
