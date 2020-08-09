import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.darkGray,
    marginTop: 8,
    paddingVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },

  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  count: {
    marginLeft: 10,
    padding: 5,
  },

  comment: {
    marginLeft: 5,
  },

  favButton: {},
});

export default styles;
