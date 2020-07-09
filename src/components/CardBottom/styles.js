import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.darkGray,
    marginTop: 8,
    paddingVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },

  leftContainer: {
    flex: 2,
    flexDirection: 'row',
  },

  iconButton: {
    marginRight: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },

  count: {
    marginLeft: 10,
  },

  rightContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  commentContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  comment: {
    marginLeft: 5,
  },

  favButton: {},
});

export default styles;
