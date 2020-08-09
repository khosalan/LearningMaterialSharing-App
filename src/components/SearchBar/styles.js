import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 8,
    height: 50,
  },

  icon: {
    fontSize: 24,
    paddingHorizontal: 5,
  },

  input: {
    flex: 1,
    fontSize: 15,
  },
});

export default styles;
