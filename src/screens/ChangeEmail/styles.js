import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 10,
    paddingTop: 20,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: 20,
  },

  inputContainer: {
    marginTop: 25,
  },

  email: {
    borderWidth: 1,
    marginTop: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  error: {
    color: Colors.red,
    marginLeft: 5,
    fontSize: 13,
  },
});

export default styles;
