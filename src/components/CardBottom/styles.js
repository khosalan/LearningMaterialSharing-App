import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.darkGray,
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },

  iconButton: {
    marginRight: 25,
    flexDirection: 'row',
  },

  count: {
    marginLeft: 10,
  },

  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  commentContainer: {
    marginLeft: 20,
    flexDirection: 'row',
  },

  comment: {
    marginLeft: 5,
  },

  favButton: {},
});

export default styles;
