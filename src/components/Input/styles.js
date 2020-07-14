import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  icon: {
    fontSize: 24,
    marginRight: 5,
  },

  input: {
    flex: 1,
  },

  error: {
    color: Colors.red,
    marginTop: 2,
    fontSize: 13,
  },
});

export default styles;
