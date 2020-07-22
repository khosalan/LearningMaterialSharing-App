import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  deleteContainer: {
    alignSelf: 'center',
  },

  deleteText: {
    color: Colors.red,
    fontSize: 18,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
