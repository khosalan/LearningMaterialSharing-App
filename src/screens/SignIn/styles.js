import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  inputContainer: {
    margin: 20,
    marginBottom: 15,
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
    marginTop: 10,
  },

  createButton: {
    marginTop: 25,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
