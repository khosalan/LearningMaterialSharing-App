import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgGray,
  },

  noPost: {
    alignItems: 'center',
    marginTop: 20,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
