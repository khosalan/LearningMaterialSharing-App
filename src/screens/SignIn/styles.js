import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  inputContainer: {
    margin: 20,
  },

  textInput: {
    borderBottomWidth: 1,
  },

  forgotContainer: {
    alignSelf: 'flex-end',
    marginHorizontal: 15,
  },

  forgotText: {
    fontSize: 17,
    color: Colors.orange,
    fontWeight: 'bold',
  },

  buttonContainer: {
    marginHorizontal: 15,
    marginTop: 20,
  },

  createButton: {
    marginTop: 25,
  },
});

export default styles;
