import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  deleteContainer: {
    marginLeft: 10,
    marginBottom: 20,
  },

  deleteText: {
    color: Colors.red,
    fontSize: 15,
    marginTop: 5,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  advanced: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default styles;
