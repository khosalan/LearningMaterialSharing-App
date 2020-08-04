import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 15,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadDocument: {
    marginBottom: 25,
  },

  chooseButton: {
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
    backgroundColor: Colors.darkGray,
  },
});

export default styles;
