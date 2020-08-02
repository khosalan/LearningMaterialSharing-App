import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
  },

  commentContainer: {
    flexDirection: 'row',
  },

  textContainer: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: Colors.commentGray,
    padding: 8,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  time: {
    marginLeft: 60,
    color: Colors.black,
  },
});

export default styles;
