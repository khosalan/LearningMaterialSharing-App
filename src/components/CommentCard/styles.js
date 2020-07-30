import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 5,
  },

  textContainer: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: Colors.commentGray,
    padding: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default styles;
