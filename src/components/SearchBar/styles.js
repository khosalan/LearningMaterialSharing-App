import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    //marginHorizontal: 15,
    marginBottom: 5,
    //borderWidth: 1,
    //borderRadius: 10,
    backgroundColor: Colors.bgGray,
    elevation: 8,
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
